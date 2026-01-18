import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, Collection } from "mongodb";
import nodemailer from "nodemailer";
import twilio from "twilio";

dotenv.config();

// Optional: see what Twilio envs are loaded
console.log("Runtime TWILIO envs:", {
  sid: process.env.TWILIO_ACCOUNT_SID,
  token: process.env.TWILIO_AUTH_TOKEN ? "***" : null,
  smsFrom: process.env.TWILIO_SMS_FROM,
  smsTo: process.env.TWILIO_SMS_TO,
});

const app = express();

const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:8080";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = process.env.MONGODB_DB as string;

if (!MONGODB_URI || !MONGODB_DB) {
  console.error("Missing MONGODB_URI or MONGODB_DB in .env");
  process.exit(1);
}

// ---------- MongoDB ----------

interface ContactMessage {
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt: Date;
}

const client = new MongoClient(MONGODB_URI);
let messagesCollection: Collection<ContactMessage>;

async function connectDb() {
  try {
    await client.connect();
    const db = client.db(MONGODB_DB);
    messagesCollection = db.collection<ContactMessage>("contact_messages");
    console.log("Connected to MongoDB:", MONGODB_DB);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}
connectDb();

// ---------- Nodemailer ----------

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ---------- Twilio SMS ----------

const twilioClient =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;

async function sendSmsNotification(text: string) {
  console.log("Twilio SMS config:", {
    hasClient: !!twilioClient,
    from: process.env.TWILIO_SMS_FROM,
    to: process.env.TWILIO_SMS_TO,
  });

  if (
    !twilioClient ||
    !process.env.TWILIO_SMS_FROM ||
    !process.env.TWILIO_SMS_TO
  ) {
    console.warn("Twilio SMS not fully configured, skipping SMS notify");
    return;
  }

  try {
    const message = await twilioClient.messages.create({
      from: process.env.TWILIO_SMS_FROM,
      to: process.env.TWILIO_SMS_TO,
      body: text,
    });
    console.log("SMS notification sent:", message.sid);
  } catch (err) {
    console.error("Error sending SMS notification:", err);
  }
}

// ---------- Middleware ----------

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);
app.use(express.json());

// ---------- Health route ----------

app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

// ---------- Contact route ----------

app.post("/contact", async (req, res) => {
  console.log("Received /contact request:", req.body);

  const { name, email, projectType, message } = req.body || {};

  if (!name || !email || !projectType || !message) {
    console.warn("Validation failed for /contact:", req.body);
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save to MongoDB
    const result = await messagesCollection.insertOne({
      name,
      email,
      projectType,
      message,
      createdAt: new Date(),
    });
    console.log("Mongo insert result:", result.insertedId);

    // Email to you
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.EMAIL_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `New contact from ${name} – ${projectType}`,
      text: `New contact message:

Name: ${name}
Email: ${email}
Project Type: ${projectType}

Message:
${message}
`,
    });
    console.log("Email sent successfully");

    // SMS notification to you
    const smsSummary = `New portfolio inquiry from ${name} (${email}) – ${projectType}.`;
    await sendSmsNotification(smsSummary);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error in /contact:", err);
    return res.status(500).json({ error: "Failed to send message" });
  }
});

// ---------- Start server ----------

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

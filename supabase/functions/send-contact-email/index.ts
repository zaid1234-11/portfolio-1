import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-contact-email function");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, projectType, message }: ContactFormRequest = await req.json();

    console.log("Processing contact form submission from:", email);

    // Validate required fields
    if (!name || !email || !message) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send confirmation email to the sender using Resend
    const emailResponse = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [email],
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 12px;">
          <h1 style="color: #ffffff; margin-bottom: 16px;">Thank you, ${name}!</h1>
          
          <p style="color: #aaa; font-size: 16px; line-height: 1.8; margin-bottom: 24px;">
            I've received your message about <strong style="color: #fff;">${projectType || "your project"}</strong> and will get back to you within 24-48 hours.
          </p>
          
          <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <p style="color: #888; margin: 0 0 8px 0; font-size: 14px;">Your message:</p>
            <p style="color: #ccc; margin: 0; font-size: 15px; line-height: 1.6;">${message}</p>
          </div>
          
          <p style="color: #aaa; font-size: 16px; line-height: 1.8; margin-bottom: 24px;">
            In the meantime, feel free to check out more of my work or connect with me on social media.
          </p>
          
          <p style="color: #666; font-size: 14px; margin: 24px 0 0 0;">Best regards,<br>Zaid Saifi</p>
        </div>
      `,
    });

    console.log("Email response:", emailResponse);

    if (emailResponse.error) {
      console.error("Failed to send email:", emailResponse.error);
      throw new Error(emailResponse.error.message || "Failed to send email");
    }

    console.log("Email sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

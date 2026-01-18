// src/config/contactLinks.ts
export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: "mail" | "instagram" | "whatsapp";
  external?: boolean;
};

export const getContactLinks = (): ContactLink[] => [
  {
    label: "Email",
    value: "zaidsaifi.work@gmail.com",
    href: "mailto:zaidsaifi.work@gmail.com",
    icon: "mail",
  },
  {
    label: "Instagram",
    value: "@your_instagram",
    href: "https://instagram.com/your_instagram",
    icon: "instagram",
    external: true,
  },
  {
    label: "WhatsApp",
    value: "+91-00000-00000",
    href: "https://wa.me/910000000000",
    icon: "whatsapp",
    external: true,
  },
];

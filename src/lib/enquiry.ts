import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d\s-]{7,20}$/, "Please enter a valid phone number"),
  service: z.string().trim().min(1, "Please select a service").max(100),
  message: z
    .string()
    .trim()
    .min(10, "Please describe your project (at least 10 characters)")
    .max(2000),
});
export type EnquiryData = z.infer<typeof enquirySchema>;

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

type EmailJsConfig = {
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
};

const emailJsConfig: EmailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export async function submitEnquiry(
  data: EnquiryData,
  config: EmailJsConfig = emailJsConfig,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { serviceId, templateId, publicKey } = config;
  if (!serviceId || !templateId || !publicKey) {
    return {
      ok: false,
      error: "The email service is not configured. Please contact us by phone or email.",
    };
  }

  let response: Response;
  try {
    response = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service,
          message: data.message,
          subject: `New KPC enquiry: ${data.service}`,
        },
      }),
    });
  } catch {
    return { ok: false, error: "Network error — we couldn't send your enquiry." };
  }

  if (response.ok) return { ok: true };

  const detail = await response.text().catch(() => "");
  return {
    ok: false,
    error: detail
      ? `We couldn't send your enquiry (${detail}).`
      : `We couldn't send your enquiry (EmailJS returned ${response.status}).`,
  };
}

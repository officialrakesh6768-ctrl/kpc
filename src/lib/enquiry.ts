import { z } from "zod";
import { company } from "@/data/site";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().regex(/^[+()\d\s-]{7,20}$/, "Please enter a valid phone number"),
  service: z.string().trim().min(1, "Please select a service").max(100),
  message: z.string().trim().min(10, "Please describe your project (at least 10 characters)").max(2000),
});
export type EnquiryData = z.infer<typeof enquirySchema>;

// Delivered by FormSubmit (formsubmit.co) to the company inbox.
// The FIRST submission triggers an activation email to the inbox; click "Activate" once.
const ENDPOINT = `https://formsubmit.co/ajax/${company.email}`;

export async function submitEnquiry(data: EnquiryData): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...data, _subject: `New KPC enquiry: ${data.service}`, _template: "table", _captcha: "false" }),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
    if (res.ok && String(json.success) === "true") return { ok: true };
    return { ok: false, error: json.message ? `We couldn't send your enquiry (${json.message}).` : "We couldn't send your enquiry." };
  } catch {
    return { ok: false, error: "Network error — we couldn't send your enquiry." };
  }
}

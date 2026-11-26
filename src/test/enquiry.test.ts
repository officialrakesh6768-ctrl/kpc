import { afterEach, describe, expect, it, vi } from "vitest";
import { submitEnquiry } from "@/lib/enquiry";

const enquiry = {
  name: "Jo Smith",
  email: "jo@example.com",
  phone: "2045996969",
  service: "Decks",
  message: "I would like a new deck built.",
};

const emailJsConfig = {
  serviceId: "service_test",
  templateId: "template_test",
  publicKey: "public_test",
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("submitEnquiry", () => {
  it("reports missing EmailJS configuration without claiming the enquiry was sent", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitEnquiry(enquiry, {});

    expect(result).toEqual({
      ok: false,
      error: "The email service is not configured. Please contact us by phone or email.",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends the enquiry to EmailJS and reports confirmed success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitEnquiry(enquiry, emailJsConfig);

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.emailjs.com/api/v1.0/email/send",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          service_id: emailJsConfig.serviceId,
          template_id: emailJsConfig.templateId,
          user_id: emailJsConfig.publicKey,
          template_params: {
            ...enquiry,
            subject: "New KPC enquiry: Decks",
          },
        }),
      }),
    );
  });

  it("surfaces EmailJS API errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        text: vi.fn().mockResolvedValue("Template not found"),
      }),
    );

    const result = await submitEnquiry(enquiry, emailJsConfig);

    expect(result).toEqual({
      ok: false,
      error: "We couldn't send your enquiry (Template not found).",
    });
  });
});

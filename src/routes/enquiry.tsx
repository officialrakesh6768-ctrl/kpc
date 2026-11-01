import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Phone, Mail, MessageCircle, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { company, images, services } from "@/data/site";
import { PageHero } from "@/components/ui-kpc";
import { seo } from "@/lib/seo";
import { enquirySchema, submitEnquiry } from "@/lib/enquiry";

export const Route = createFileRoute("/enquiry")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: () => seo("Enquiry – Get a Free Quote", "Contact KPC for a free construction quote. Call +1 204-599-6969, email or send an enquiry online."),
  component: Enquiry,
});

type Errors = Partial<Record<"name" | "email" | "phone" | "service" | "message", string>>;
const field = "mt-1 w-full rounded-sm border border-input bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";

function Enquiry() {
  const { service } = Route.useSearch();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = enquirySchema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as keyof Errors] ??= i.message; });
      setErrors(errs);
      return;
    }
    setErrors({}); setStatus("sending");
    const res = await submitEnquiry(parsed.data);
    if (res.ok) { setStatus("ok"); form.reset(); }
    else { setStatus("error"); setMsg(res.error); }
  }

  const err = (k: keyof Errors) => errors[k] && <p id={`${k}-err`} className="mt-1 text-sm text-destructive">{errors[k]}</p>;

  return (
    <>
      <PageHero eyebrow="Enquiry" title="Get a free quote" intro="Tell us about your project and we'll get back to you." image={images.hero} />
      <section className="py-20">
        <div className="container-kpc grid gap-12 lg:grid-cols-5">
          <aside className="space-y-4 lg:col-span-2">
            <h2 className="text-4xl">Contact us directly</h2>
            <p className="text-muted-foreground">Prefer to talk? Call, email or message us on WhatsApp.</p>
            {[
              { href: company.tel, icon: Phone, label: "Call", value: company.phone },
              { href: company.mailto, icon: Mail, label: "Email", value: company.email },
              { href: company.whatsapp, icon: MessageCircle, label: "WhatsApp", value: "Chat with us", ext: true },
            ].map((c) => (
              <a key={c.label} href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex items-center gap-4 rounded-md border p-5 transition-all hover:border-primary hover:shadow-card">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-primary text-primary-foreground"><c.icon className="h-5 w-5" /></span>
                <span><span className="eyebrow block">{c.label}</span><span className="break-all font-semibold">{c.value}</span></span>
              </a>
            ))}
          </aside>

          <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-md bg-secondary p-6 md:p-10 lg:col-span-3">
            <h2 className="text-3xl">Send an enquiry</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div><label htmlFor="name" className="font-semibold">Full name *</label><input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby="name-err" />{err("name")}</div>
              <div><label htmlFor="email" className="font-semibold">Email address *</label><input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby="email-err" />{err("email")}</div>
              <div><label htmlFor="phone" className="font-semibold">Phone number *</label><input id="phone" name="phone" type="tel" autoComplete="tel" className={field} aria-invalid={!!errors.phone} aria-describedby="phone-err" />{err("phone")}</div>
              <div><label htmlFor="service" className="font-semibold">Service *</label>
                <select id="service" name="service" defaultValue={service ?? ""} className={field} aria-invalid={!!errors.service} aria-describedby="service-err">
                  <option value="">Select a service</option>
                  {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                  <option value="Other">Other</option>
                </select>{err("service")}</div>
            </div>
            <div><label htmlFor="message" className="font-semibold">Project details *</label><textarea id="message" name="message" rows={6} className={field} aria-invalid={!!errors.message} aria-describedby="message-err" />{err("message")}</div>
            <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60 md:w-auto">
              {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Send Enquiry"}
            </button>
            {status === "ok" && <p role="status" className="flex items-center gap-2 rounded-sm bg-card p-4 text-success"><CheckCircle2 className="h-5 w-5" /> Thank you! Your enquiry has been sent. We'll be in touch soon.</p>}
            {status === "error" && <p role="alert" className="flex items-start gap-2 rounded-sm bg-card p-4 text-destructive"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0" /> {msg} Please call {company.phone} or email {company.email}.</p>}
          </form>
        </div>
      </section>
      <section className="pb-20">
        <div className="container-kpc">
          <p className="mb-3 flex items-center gap-2 font-semibold"><MapPin className="h-5 w-5 text-primary" /> Location placeholder — business address to be confirmed</p>
          <iframe title="Map placeholder – Winnipeg, Manitoba area" src="https://www.google.com/maps?q=Winnipeg,+Manitoba&output=embed" className="h-96 w-full rounded-md border" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </>
  );
}

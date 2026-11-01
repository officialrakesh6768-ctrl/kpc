import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle, Quote, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { company, type Service } from "@/data/site";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, intro, center }: { eyebrow: string; title: string; intro?: string; center?: boolean }) {
  return (
    <Reveal className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-4xl md:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro: string; image: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal text-charcoal-foreground">
      <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" width={1600} height={900} />
      <div className="overlay-hero absolute inset-0 -z-10" />
      <div className="container-kpc py-24 md:py-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <p className="eyebrow !text-charcoal-foreground/80">{eyebrow}</p>
          <h1 className="mt-4 text-5xl md:text-7xl">{title}</h1>
          <p className="mt-6 max-w-xl text-lg opacity-85">{intro}</p>
        </motion.div>
      </div>
    </section>
  );
}

export function ServiceCard({ service, i = 0 }: { service: Service; i?: number }) {
  const Icon = service.icon;
  return (
    <Reveal delay={(i % 4) * 0.08}>
      <Link to="/services" hash={service.slug} className="group block h-full overflow-hidden rounded-md border bg-card transition-all hover:-translate-y-1 hover:shadow-card">
        <div className="aspect-[4/3] overflow-hidden"><img src={service.image} alt={service.title} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
        <div className="p-6">
          <span className="-mt-12 mb-4 grid h-12 w-12 place-items-center rounded-sm bg-primary text-primary-foreground shadow-card relative"><Icon className="h-6 w-6" /></span>
          <h3 className="text-2xl">{service.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{service.short}</p>
          <span className="mt-4 inline-flex items-center gap-1 font-display text-sm font-semibold uppercase tracking-wider text-primary">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
        </div>
      </Link>
    </Reveal>
  );
}

export function CTASection({ title = "Ready to start your project?", text = "Tell us about your project and we'll get back to you to discuss the details and a free quote." }: { title?: string; text?: string }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-kpc flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
        <div className="max-w-2xl"><h2 className="text-4xl md:text-5xl">{title}</h2><p className="mt-3 text-lg opacity-85">{text}</p></div>
        <div className="flex flex-wrap gap-3">
          <Link to="/enquiry" className="btn-light">Get a Free Quote <ArrowRight className="h-4 w-4" /></Link>
          <a href={company.tel} className="btn-light"><Phone className="h-4 w-4" /> Call Now</a>
        </div>
      </div>
    </section>
  );
}

export function TestimonialSection() {
  return (
    <section className="bg-secondary py-24">
      <div className="container-kpc">
        <SectionHeading eyebrow="Testimonials" title="What Our Clients Say" center />
        <Reveal className="mx-auto max-w-2xl rounded-md border-2 border-dashed border-primary/30 bg-card p-10 text-center">
          <Quote className="mx-auto h-10 w-10 text-primary" />
          <p className="mt-4 text-lg">Genuine customer reviews will be featured here soon.</p>
          <p className="mt-2 text-sm text-muted-foreground">Worked with KPC? We'd love to hear about your experience.</p>
          <Link to="/enquiry" className="btn-dark mt-6">Share Your Feedback</Link>
        </Reveal>
      </div>
    </section>
  );
}

export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="grid h-14 w-14 place-items-center rounded-full bg-success text-primary-foreground shadow-card transition-transform hover:scale-110"><MessageCircle /></a>
      <a href={company.tel} aria-label="Call KPC" className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-card transition-transform hover:scale-110"><Phone /></a>
    </div>
  );
}

export function Check({ children }: { children: ReactNode }) {
  return <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{children}</span></li>;
}

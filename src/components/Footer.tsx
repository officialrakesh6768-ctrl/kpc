import { Link } from "@tanstack/react-router";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { company, nav, services } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-charcoal text-charcoal-foreground">
      <div className="container-kpc grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm opacity-70">{company.name} — quality residential and commercial construction since {company.established}.</p>
        </div>
        <div>
          <h3 className="mb-4 text-lg">Pages</h3>
          <ul className="space-y-2 text-sm opacity-80">{nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-primary-foreground hover:underline">{n.label}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg">Services</h3>
          <ul className="space-y-2 text-sm opacity-80">{services.map((s) => <li key={s.slug}><Link to="/services" hash={s.slug} className="hover:underline">{s.title}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li><a href={company.tel} className="flex items-center gap-2 hover:underline"><Phone className="h-4 w-4" />{company.phone}</a></li>
            <li><a href={company.mailto} className="flex items-center gap-2 break-all hover:underline"><Mail className="h-4 w-4" />{company.email}</a></li>
            <li><a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline"><MessageCircle className="h-4 w-4" />WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-charcoal-foreground/10 py-6 text-center text-xs opacity-60">© {new Date().getFullYear()} {company.name}. All rights reserved.</div>
    </footer>
  );
}

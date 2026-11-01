import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { nav, company } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container-kpc flex h-20 items-center justify-between gap-4">
        <Link to="/" onClick={() => setOpen(false)}><Logo /></Link>
        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/80 transition-colors hover:text-primary data-[status=active]:text-primary">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={company.tel} className="hidden items-center gap-2 text-sm font-semibold xl:flex"><Phone className="h-4 w-4 text-primary" />{company.phone}</a>
          <Link to="/enquiry" className="btn-primary hidden !py-2.5 sm:inline-flex">Get a Quote</Link>
          <button className="p-2 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t bg-background lg:hidden">
          <div className="container-kpc flex flex-col py-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: true }} onClick={() => setOpen(false)}
                className="border-b py-3 font-display font-semibold uppercase tracking-wider data-[status=active]:text-primary">
                {n.label}
              </Link>
            ))}
            <Link to="/enquiry" onClick={() => setOpen(false)} className="btn-primary mt-4">Get a Quote</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

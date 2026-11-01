import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { images, services } from "@/data/site";
import { CTASection, PageHero, Reveal, Check } from "@/components/ui-kpc";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => seo("Services", "Decks, fences, basement flooring, renovations, roof installation, inspection, repairs and residential & commercial construction by KPC."),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Our Services" title="Complete construction services" intro="Eight specialised services for homes and businesses — all delivered with quality workmanship." image={images.roofing} />
      <nav aria-label="Services" className="sticky top-20 z-30 border-b bg-background/95 backdrop-blur">
        <div className="container-kpc flex gap-5 overflow-x-auto py-3">
          {services.map((s) => <a key={s.slug} href={`#${s.slug}`} className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary">{s.title}</a>)}
        </div>
      </nav>
      <div className="py-12">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} className="scroll-mt-36 py-12">
            <div className={`container-kpc grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal><img src={s.image} alt={s.title} loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full rounded-md object-cover shadow-card" /></Reveal>
              <Reveal delay={0.1}>
                <span className="grid h-14 w-14 place-items-center rounded-sm bg-primary text-primary-foreground"><s.icon className="h-7 w-7" /></span>
                <p className="eyebrow mt-6">Service {String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-4xl md:text-5xl">{s.title}</h2>
                <p className="mt-4 text-lg text-muted-foreground">{s.description}</p>
                <h3 className="mt-6 text-xl">Key Benefits</h3>
                <ul className="mt-3 space-y-2">{s.benefits.map((b) => <Check key={b}>{b}</Check>)}</ul>
                <Link to="/enquiry" search={{ service: s.title }} className="btn-primary mt-8">Enquire About {s.title.split(" ")[0]} <ArrowRight className="h-4 w-4" /></Link>
              </Reveal>
            </div>
          </section>
        ))}
      </div>
      <CTASection />
    </>
  );
}

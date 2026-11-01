import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Users, MessageSquare, Ruler } from "lucide-react";
import { company, images, services } from "@/data/site";
import { CTASection, Reveal, SectionHeading, ServiceCard, TestimonialSection, Check } from "@/components/ui-kpc";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Building Quality. Creating Lasting Value.", "KPC builds decks, fences, roofs, basement floors and renovations for homes and businesses. Established 2018. Get a free quote."),
  component: Home,
});

const highlights = [
  { icon: ShieldCheck, title: "Quality Workmanship", text: "Careful, durable work on every project." },
  { icon: Users, title: "Experienced Team", text: "Skilled trades across residential and commercial work." },
  { icon: MessageSquare, title: "Clear Communication", text: "You'll know what's happening at every stage." },
  { icon: Ruler, title: "Attention to Detail", text: "The finishing touches that make the difference." },
];

function Home() {
  return (
    <>
      <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-charcoal text-charcoal-foreground">
        <img src={images.hero} alt="Timber-framed home under construction at sunset" className="absolute inset-0 -z-10 h-full w-full object-cover" width={1600} height={912} />
        <div className="overlay-hero absolute inset-0 -z-10" />
        <div className="container-kpc py-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <p className="eyebrow !text-charcoal-foreground/80">Karanpratap Construction Ltd. · Since {company.established}</p>
            <h1 className="mt-5 text-6xl md:text-8xl">Building Quality. <span className="block text-primary-foreground/70">Creating Lasting Value.</span></h1>
            <p className="mt-6 max-w-xl text-lg opacity-85">From decks and fences to roofing, renovations and full construction projects, KPC delivers dependable workmanship for homes and businesses.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/enquiry" className="btn-primary">Get a Free Quote <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/services" className="btn-light">Explore Our Services</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-kpc grid items-center gap-12 lg:grid-cols-2">
          <Reveal><img src={images.renovation} alt="Renovated kitchen interior" loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full rounded-md object-cover shadow-card" /></Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Who We Are</p>
            <h2 className="mt-3 text-4xl md:text-5xl">A construction partner you can rely on</h2>
            <p className="mt-5 text-lg text-muted-foreground">Established in {company.established}, Karanpratap Construction Ltd. (KPC) provides residential and commercial construction services built on quality, honesty and respect for your property.</p>
            <ul className="mt-6 space-y-3"><Check>Residential & commercial projects</Check><Check>Roofing, decks, fences, flooring & renovations</Check><Check>Free quotes and clear communication</Check></ul>
            <Link to="/about" className="btn-dark mt-8">About KPC</Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-kpc">
          <SectionHeading eyebrow="Our Services" title="What We Build" intro="Eight core services covering everything from the roof to the basement." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{services.map((s, i) => <ServiceCard key={s.slug} service={s} i={i} />)}</div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-kpc">
          <SectionHeading eyebrow="Why Choose KPC" title="Built on trust and craftsmanship" center />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08} className="rounded-md border p-8 transition-colors hover:border-primary">
                <h.icon className="h-10 w-10 text-primary" /><h3 className="mt-5 text-2xl">{h.title}</h3><p className="mt-2 text-muted-foreground">{h.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center"><Link to="/why-choose-us" className="btn-dark">Why Choose Us</Link></div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-charcoal py-24 text-charcoal-foreground">
        <img src={images.commercial} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
        <div className="container-kpc grid items-center gap-10 md:grid-cols-2">
          <Reveal><p className="font-display text-[8rem] font-bold leading-none text-primary-foreground/90 md:text-[11rem]">{company.established}</p><p className="eyebrow !text-charcoal-foreground/70">The year we started building</p></Reveal>
          <Reveal delay={0.1}><h2 className="text-4xl md:text-5xl">Experience across homes and businesses</h2><p className="mt-5 text-lg opacity-80">Since {company.established}, KPC has worked on residential and commercial projects, from outdoor living spaces to roofing and full construction builds.</p><Link to="/gallery" className="btn-light mt-8">View Gallery</Link></Reveal>
        </div>
      </section>

      <TestimonialSection />
      <CTASection />
    </>
  );
}

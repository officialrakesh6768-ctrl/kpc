import { createFileRoute } from "@tanstack/react-router";
import { Target, Gem, HeartHandshake, ShieldCheck } from "lucide-react";
import { company, images } from "@/data/site";
import { CTASection, PageHero, Reveal, SectionHeading, Check } from "@/components/ui-kpc";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About Us", "Learn about Karanpratap Construction Ltd. (KPC), established in 2018, delivering residential and commercial construction with a commitment to quality."),
  component: About,
});

const values = [
  { icon: Gem, title: "Quality", text: "We take pride in doing the job right." },
  { icon: HeartHandshake, title: "Integrity", text: "Honest advice and transparent quotes." },
  { icon: ShieldCheck, title: "Reliability", text: "We show up and follow through." },
  { icon: Target, title: "Respect", text: "For your property, time and budget." },
];

function About() {
  return (
    <>
      <PageHero eyebrow="About KPC" title="Building with purpose since 2018" intro={`${company.name} provides residential and commercial construction services with a focus on quality and lasting value.`} image={images.commercial} />
      <section className="py-24">
        <div className="container-kpc grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Established in {company.established}</h2>
            <p className="mt-5 text-lg text-muted-foreground">KPC was established in {company.established} to offer property owners a construction company they can count on. Today we provide decks, fences, basement flooring, renovations, roofing and residential and commercial construction.</p>
            <p className="mt-4 text-lg text-muted-foreground">Every project — large or small — receives the same care, clear communication and commitment to quality.</p>
          </Reveal>
          <Reveal delay={0.1}><img src={images.deck} alt="Backyard cedar deck" loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full rounded-md object-cover shadow-card" /></Reveal>
        </div>
      </section>
      <section className="bg-secondary py-24">
        <div className="container-kpc">
          <SectionHeading eyebrow="Mission & Values" title="What drives us" intro="Our mission is to build quality spaces that create lasting value for our clients, delivered with honesty and professionalism." center />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => <Reveal key={v.title} delay={i * 0.08} className="rounded-md bg-card p-8 shadow-card"><v.icon className="h-10 w-10 text-primary" /><h3 className="mt-5 text-2xl">{v.title}</h3><p className="mt-2 text-muted-foreground">{v.text}</p></Reveal>)}
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="container-kpc grid items-center gap-12 lg:grid-cols-2">
          <Reveal><img src={images.roofing} alt="Roofer installing shingles" loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full rounded-md object-cover shadow-card" /></Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Commitment to Quality</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Residential & commercial expertise</h2>
            <p className="mt-5 text-lg text-muted-foreground">Whether it's a family home or a commercial property, we plan carefully, use quality materials and keep work sites safe and tidy.</p>
            <ul className="mt-6 space-y-3"><Check>Homes: decks, fences, basements, renovations, roofing</Check><Check>Businesses: commercial construction and roofing</Check><Check>Careful planning and clean, safe job sites</Check></ul>
          </Reveal>
        </div>
      </section>
      <CTASection />
    </>
  );
}

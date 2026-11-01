import { createFileRoute } from "@tanstack/react-router";
import { Award, HardHat, Smile, ScanSearch, Building2, MessagesSquare, CalendarCheck } from "lucide-react";
import { images } from "@/data/site";
import { CTASection, PageHero, Reveal, SectionHeading } from "@/components/ui-kpc";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/why-choose-us")({
  head: () => seo("Why Choose Us", "Quality workmanship, an experienced team, attention to detail and reliable project execution — why clients choose KPC."),
  component: Why,
});

const reasons = [
  { icon: Award, title: "Quality Workmanship", text: "We build to last, using sound methods and quality materials." },
  { icon: HardHat, title: "Experienced Construction Team", text: "Skilled people who know their trades and take pride in their work." },
  { icon: Smile, title: "Customer-Focused Approach", text: "Your goals, budget and schedule guide every decision." },
  { icon: ScanSearch, title: "Attention to Detail", text: "From layout to final finish, the details matter to us." },
  { icon: Building2, title: "Residential & Commercial Expertise", text: "Capable of handling projects for homes and businesses alike." },
  { icon: MessagesSquare, title: "Professional Communication", text: "Prompt replies, clear quotes and regular updates." },
  { icon: CalendarCheck, title: "Reliable Project Execution", text: "Organised planning so your project runs smoothly." },
];

function Why() {
  return (
    <>
      <PageHero eyebrow="Why Choose KPC" title="The KPC difference" intro="We combine skilled craftsmanship with honest, professional service." image={images.inspection} />
      <section className="py-24">
        <div className="container-kpc">
          <SectionHeading eyebrow="Our Strengths" title="Seven reasons to build with us" center />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={(i % 3) * 0.08} className="group rounded-md border p-8 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-card">
                <span className="grid h-14 w-14 place-items-center rounded-sm bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><r.icon className="h-7 w-7" /></span>
                <h3 className="mt-6 text-2xl">{r.title}</h3><p className="mt-2 text-muted-foreground">{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-3">
        {[images.fence, images.flooring, images.deck].map((src, i) => <img key={i} src={src} alt="Illustrative construction work" loading="lazy" className="aspect-[4/3] w-full object-cover" />)}
      </section>
      <CTASection />
    </>
  );
}

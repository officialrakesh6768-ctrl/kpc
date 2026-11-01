import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { images } from "@/data/site";
import { CTASection, PageHero } from "@/components/ui-kpc";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => seo("Gallery", "Illustrative imagery of roofing, decks, fences, flooring and renovation work offered by KPC."),
  component: Gallery,
});

const items = [
  { src: images.roofing, cat: "Roofing", alt: "Roof shingle installation" },
  { src: images.inspection, cat: "Roofing", alt: "Roof and gutter inspection" },
  { src: images.deck, cat: "Decks", alt: "Cedar backyard deck" },
  { src: images.fence, cat: "Fences", alt: "Horizontal cedar privacy fence" },
  { src: images.flooring, cat: "Flooring", alt: "Finished basement flooring" },
  { src: images.renovation, cat: "Renovations", alt: "Renovated kitchen" },
  { src: images.hero, cat: "Renovations", alt: "Timber-framed home construction" },
  { src: images.commercial, cat: "Renovations", alt: "Commercial steel-frame construction" },
];
const cats = ["All", "Roofing", "Decks", "Fences", "Flooring", "Renovations"];

function Gallery() {
  const [cat, setCat] = useState("All");
  const [idx, setIdx] = useState<number | null>(null);
  const list = cat === "All" ? items : items.filter((i) => i.cat === cat);
  const go = (d: number) => setIdx((i) => (i === null ? i : (i + d + list.length) % list.length));

  useEffect(() => {
    if (idx === null) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setIdx(null); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  return (
    <>
      <PageHero eyebrow="Gallery" title="Our type of work" intro="A look at the kinds of projects KPC delivers." image={images.deck} />
      <section className="py-16">
        <div className="container-kpc">
          <p className="mb-8 flex items-start gap-2 rounded-md bg-accent p-4 text-sm text-accent-foreground"><Info className="mt-0.5 h-4 w-4 shrink-0" />Images shown are illustrative construction imagery, not completed KPC projects. Real project photos will be added soon.</p>
          <div className="mb-8 flex flex-wrap gap-2" role="tablist">
            {cats.map((c) => <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`rounded-sm px-4 py-2 font-display text-sm font-semibold uppercase tracking-wider transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent"}`}>{c}</button>)}
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {list.map((it, i) => (
              <button key={it.alt} onClick={() => setIdx(i)} className="group relative aspect-square overflow-hidden rounded-md" aria-label={`Open ${it.alt}`}>
                <img src={it.src} alt={it.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute inset-x-0 bottom-0 bg-charcoal/80 p-3 text-left text-sm text-charcoal-foreground opacity-0 transition-opacity group-hover:opacity-100"><span className="eyebrow !text-charcoal-foreground/70 block">{it.cat}</span>{it.alt}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <AnimatePresence>
        {idx !== null && list[idx] && (
          <motion.div role="dialog" aria-modal="true" aria-label="Image viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95 p-4" onClick={() => setIdx(null)}>
            <button aria-label="Close" className="absolute right-4 top-4 p-2 text-charcoal-foreground" onClick={() => setIdx(null)}><X className="h-8 w-8" /></button>
            <button aria-label="Previous" className="absolute left-2 p-2 text-charcoal-foreground md:left-6" onClick={(e) => { e.stopPropagation(); go(-1); }}><ChevronLeft className="h-10 w-10" /></button>
            <figure onClick={(e) => e.stopPropagation()} className="max-w-5xl">
              <img src={list[idx].src} alt={list[idx].alt} className="max-h-[80vh] w-auto rounded-md" />
              <figcaption className="mt-3 text-center text-charcoal-foreground">{list[idx].alt} · <span className="opacity-60">Illustrative image</span></figcaption>
            </figure>
            <button aria-label="Next" className="absolute right-2 p-2 text-charcoal-foreground md:right-6" onClick={(e) => { e.stopPropagation(); go(1); }}><ChevronRight className="h-10 w-10" /></button>
          </motion.div>
        )}
      </AnimatePresence>
      <CTASection />
    </>
  );
}

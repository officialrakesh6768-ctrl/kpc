import hero from "@/assets/hero.jpg";
import roofing from "@/assets/roofing.jpg";
import deck from "@/assets/deck.jpg";
import renovation from "@/assets/renovation.jpg";
import fence from "@/assets/fence.jpg";
import flooring from "@/assets/flooring.jpg";
import commercial from "@/assets/commercial.jpg";
import inspection from "@/assets/inspection.jpg";
import { Hammer, Fence, Layers, PaintRoller, Home, Search, Wrench, Building2, type LucideIcon } from "lucide-react";

export const company = {
  name: "Karanpratap Construction Ltd.",
  brand: "KPC",
  established: 2018,
  email: "amangholia@gmail.com",
  phone: "+1 204-599-6969",
  tel: "tel:+12045996969",
  mailto: "mailto:amangholia@gmail.com",
  whatsapp: "https://wa.me/12045996969",
};

export const images = { hero, roofing, deck, renovation, fence, flooring, commercial, inspection };

export type Service = { slug: string; title: string; icon: LucideIcon; image: string; short: string; description: string; benefits: string[] };

export const services: Service[] = [
  { slug: "decks", title: "Decks", icon: Hammer, image: deck, short: "Custom-built decks designed for outdoor living.", description: "We design and build sturdy, good-looking decks that extend your living space outdoors — from simple platforms to multi-level designs with railings and stairs, built with quality materials suited to the local climate.", benefits: ["Custom layouts to fit your yard", "Durable, weather-suited materials", "Clean, safe railings and stairs"] },
  { slug: "fences", title: "Fences", icon: Fence, image: fence, short: "Privacy, security and curb appeal.", description: "From privacy fences to decorative boundaries, we install fences that are straight, solid and built to last, with careful post setting and clean finishing.", benefits: ["Privacy and security", "Properly set, level posts", "Styles to match your home"] },
  { slug: "basement-flooring", title: "Basement Flooring", icon: Layers, image: flooring, short: "Comfortable, durable flooring for lower levels.", description: "We install basement flooring suited to below-grade spaces, with attention to subfloor preparation so your finished floor looks great and performs well.", benefits: ["Proper subfloor preparation", "Options suited to basements", "Neat, professional finishing"] },
  { slug: "renovations", title: "Renovations", icon: PaintRoller, image: renovation, short: "Transform kitchens, bathrooms and living spaces.", description: "Whether it's a kitchen, bathroom or full interior update, we manage renovations with clear communication, tidy work sites and quality craftsmanship from start to finish.", benefits: ["Clear scope and communication", "Tidy, respectful work sites", "Quality finishes throughout"] },
  { slug: "roof-installation", title: "Roof Installation", icon: Home, image: roofing, short: "New roofs installed with care and precision.", description: "We install new roofs with careful attention to underlayment, flashing and ventilation, giving your property dependable protection from the elements.", benefits: ["Attention to flashing and ventilation", "Quality roofing materials", "Thorough site clean-up"] },
  { slug: "roof-inspection", title: "Roof Inspection", icon: Search, image: inspection, short: "Know the true condition of your roof.", description: "Our roof inspections look at shingles, flashing, gutters and visible structure, so you understand your roof's condition and can plan repairs before small issues grow.", benefits: ["Clear explanation of findings", "Spot problems early", "Helpful for planning and budgeting"] },
  { slug: "roof-repairs", title: "Roof Repairs", icon: Wrench, image: roofing, short: "Fix leaks and damage before they spread.", description: "From missing shingles to leaks and damaged flashing, we repair roofs properly to restore protection and extend the life of your roof.", benefits: ["Targeted, lasting repairs", "Helps prevent water damage", "Extends roof lifespan"] },
  { slug: "construction", title: "Residential & Commercial Construction", icon: Building2, image: commercial, short: "Building projects for homes and businesses.", description: "We take on residential and commercial construction projects, coordinating the work carefully and keeping you informed so your project is delivered with quality and reliability.", benefits: ["Residential and commercial capability", "Organised project coordination", "Focus on quality and reliability"] },
];

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/why-choose-us", label: "Why Choose Us" },
  { to: "/gallery", label: "Gallery" },
  { to: "/enquiry", label: "Enquiry" },
] as const;

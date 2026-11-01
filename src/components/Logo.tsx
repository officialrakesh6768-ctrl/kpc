import kpcLogo from "@/assets/kpc logo.png";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <img
      src={kpcLogo}
      alt="KPC - Karanpratap Construction Ltd."
      className={`h-16 w-auto object-contain ${light ? "brightness-110" : ""}`}
    />
  );
}

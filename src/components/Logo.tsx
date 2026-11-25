import kpcLogo from "@/assets/new logo.png";

export function Logo({ size = "default" }: { size?: "default" | "large" }) {
  return (
    <img
      src={kpcLogo}
      alt="KPC - Karanpratap Construction Ltd."
      className={`${size === "large" ? "h-[4.75rem]" : "h-16"} w-auto object-contain`}
    />
  );
}

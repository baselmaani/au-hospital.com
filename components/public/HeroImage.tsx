import { cn } from "@/lib/utils";

interface Props {
  image?: string | null;
  eyebrow?: string | null;
  subtext?: string | null;
}

export function HeroImage({ image, eyebrow, subtext }: Props) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-navy-900",
        "h-[78vh] min-h-[520px] md:h-[86vh]"
      )}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,144,59,0.10),transparent_60%),linear-gradient(180deg,#02132C_0%,#081E3B_55%,#02132C_100%)]" />
      )}
      {/* Subtle bottom-only scrim so text stays legible without dimming the image */}
      {!image && (
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-900/20 to-navy-900/60" />
      )}

      <div className="relative z-10 flex h-full items-end">
        <div className="container-wide pb-16 md:pb-24">
          <div className="max-w-2xl animate-fade-in">
            <p className="eyebrow text-gold-300">
              {eyebrow ?? "Project Under Development · Aleppo"}
            </p>
            <span className="gold-divider-left" />
            <p className="mt-6 text-sm font-medium uppercase tracking-[0.22em] text-white/80">
              {subtext ?? "Academic Healthcare · Investment Opportunity"}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative bottom gold hairline */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
    </section>
  );
}

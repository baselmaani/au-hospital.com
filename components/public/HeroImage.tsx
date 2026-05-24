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
        "h-[70vh] min-h-[480px] md:h-[80vh]"
      )}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent),linear-gradient(180deg,#0f1a30_0%,#1a2a49_60%,#0f1a30_100%)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/55" />
      <div className="relative z-10 flex h-full items-end">
        <div className="container-wide pb-12 md:pb-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">
              {eyebrow ?? "Hospital Project Under Development"}
            </p>
            <p className="mt-4 text-sm font-medium uppercase tracking-widest text-white/70">
              {subtext ?? "Future Healthcare Destination · Investment Opportunity"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

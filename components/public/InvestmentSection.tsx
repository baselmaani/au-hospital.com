import Link from "next/link";
import { Button } from "@/components/ui/button";

interface StatItem {
  label: string;
  value: string;
}

interface Props {
  title?: string | null;
  description?: string | null;
  btnText?: string | null;
  btnLink?: string | null;
  stats?: StatItem[] | null;
}

const DEFAULT_STATS: StatItem[] = [
  { label: "Project Stage", value: "Development Phase" },
  { label: "Sector", value: "Private Healthcare" },
  { label: "Model", value: "Multi-Specialty" },
  { label: "Horizon", value: "Long-Term" },
];

export function InvestmentSection({ title, description, btnText, btnLink, stats }: Props) {
  const items = stats?.length ? stats : DEFAULT_STATS;
  return (
    <section id="investment" className="relative overflow-hidden bg-navy-900 py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(230,177,52,0.18),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(95,127,182,0.18),transparent_55%)]" />
      <div className="container-wide relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold-300">Investment Opportunity</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
              {title ?? "A Long-Term Healthcare Investment Opportunity"}
            </h2>
            {description ? (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                {description}
              </p>
            ) : null}
            {btnText && btnLink ? (
              <div className="mt-8">
                <Button asChild size="lg" variant="accent">
                  <Link href={btnLink}>{btnText}</Link>
                </Button>
              </div>
            ) : null}
          </div>

          <dl className="grid grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <dt className="text-xs uppercase tracking-widest text-gold-300">
                  {item.label}
                </dt>
                <dd className="mt-2 text-lg font-semibold">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

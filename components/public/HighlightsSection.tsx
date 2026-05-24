import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PublicHighlight {
  id: string;
  title: string;
  description?: string | null;
  icon?: string | null;
}

function resolveIcon(name?: string | null): LucideIcon {
  if (!name) return Icons.Sparkles;
  const lib = Icons as unknown as Record<string, LucideIcon>;
  return lib[name] ?? Icons.Sparkles;
}

interface Props {
  highlights: PublicHighlight[];
  eyebrow?: string | null;
  heading?: string | null;
}

export function HighlightsSection({ highlights, eyebrow, heading }: Props) {
  if (!highlights.length) return null;
  return (
    <section className="section bg-white">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{eyebrow ?? "Project Highlights"}</p>
          <h2 className="mt-3 text-3xl font-semibold text-navy-900 md:text-4xl">
            {heading ?? "Why this project stands out"}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => {
            const Icon = resolveIcon(h.icon);
            return (
              <div
                key={h.id}
                className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:border-gold-300 hover:shadow-md"
              >
                <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-xl bg-navy-50 text-navy-800 transition group-hover:bg-gold-50 group-hover:text-gold-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900">{h.title}</h3>
                {h.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {h.description}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

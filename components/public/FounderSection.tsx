import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

export interface FounderData {
  name: string;
  title?: string | null;
  photo?: string | null;
  shortBio?: string | null;
  message?: string | null;
  signatureImage?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
}

export function FounderSection({ founder }: { founder: FounderData }) {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* Subtle background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(230,177,52,0.06),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(15,26,48,0.05),transparent_50%)]"
      />

      <div className="container-wide relative">
        {/* Section label */}
        <div className="mb-14 text-center">
          <p className="eyebrow">Message from the Founder</p>
          <h2 className="mt-3 text-3xl font-semibold text-navy-900 md:text-4xl">
            The Vision Behind the Project
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[340px_1fr] lg:gap-20">
          {/* ── Left: portrait + identity ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Photo */}
            <div className="relative mb-8">
              {/* Gold ring accent */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-200 opacity-70" />
              <div className="relative h-56 w-56 overflow-hidden rounded-full bg-navy-100 ring-4 ring-white">
                {founder.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  /* Placeholder monogram */
                  <div className="flex h-full w-full items-center justify-center bg-navy-900 text-5xl font-semibold text-gold-400">
                    {founder.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
              </div>
            </div>

            {/* Name + title */}
            <h3 className="text-2xl font-semibold text-navy-900">{founder.name}</h3>
            {founder.title && (
              <p className="mt-1 text-sm font-medium uppercase tracking-widest text-gold-600">
                {founder.title}
              </p>
            )}

            {/* Short bio */}
            {founder.shortBio && (
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {founder.shortBio}
              </p>
            )}

            {/* CTA */}
            {founder.buttonText && founder.buttonLink && (
              <div className="mt-8">
                <Button asChild variant="accent" size="lg" className="w-full lg:w-auto">
                  <Link href={founder.buttonLink}>{founder.buttonText}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* ── Right: message ── */}
          <div className="relative">
            {/* Decorative left bar */}
            <div
              aria-hidden
              className="absolute -left-6 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-gold-300 to-transparent lg:block"
            />

            {/* Opening quote icon */}
            <Quote
              className="mb-5 h-10 w-10 text-gold-400 opacity-80"
              strokeWidth={1.5}
            />

            {founder.message && (
              <blockquote className="space-y-5">
                {founder.message.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="font-serif text-lg leading-relaxed text-navy-800 md:text-xl"
                  >
                    {para}
                  </p>
                ))}
              </blockquote>
            )}

            {/* Signature */}
            {founder.signatureImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={founder.signatureImage}
                alt={`${founder.name} signature`}
                className="mt-10 h-14 w-auto object-contain opacity-80"
              />
            )}

            {/* Attribution line under quote */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                {founder.name}
                {founder.title ? ` · ${founder.title}` : ""}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

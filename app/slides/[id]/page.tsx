import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { ChevronLeft } from "lucide-react";

export const dynamic = "force-dynamic";

const DEFAULT_SETTINGS = {
  projectName: "AU Hospital",
  logo: null,
  contactEmail: null,
  contactPhone: null,
  whatsapp: null,
  footerText: null,
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slide = await prisma.slide.findUnique({ where: { id } });
  if (!slide) return {};
  return {
    title: slide.title,
    description: slide.description ?? undefined,
  };
}

export default async function SlideDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [slide, settings, allSlides] = await Promise.all([
    prisma.slide.findUnique({ where: { id, isActive: true } }),
    prisma.siteSettings.findFirst({ orderBy: { createdAt: "asc" } }),
    prisma.slide.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, title: true, image: true },
    }),
  ]);

  if (!slide) notFound();

  const s = settings ?? DEFAULT_SETTINGS;

  // Siblings for navigation (previous / next)
  const idx = allSlides.findIndex((sl) => sl.id === id);
  const prev = idx > 0 ? allSlides[idx - 1] : null;
  const next = idx < allSlides.length - 1 ? allSlides[idx + 1] : null;

  return (
    <>
      <Header projectName={s.projectName} logo={s.logo} />

      <main>
        {/* Hero image */}
        {slide.image && (
          <div className="relative h-72 w-full overflow-hidden bg-navy-900 md:h-[480px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="container-wide">
                <p className="eyebrow mb-2 text-gold-300">Project Overview</p>
                <h1 className="text-3xl font-bold text-white md:text-5xl">{slide.title}</h1>
              </div>
            </div>
          </div>
        )}

        <section className="py-12 md:py-20">
          <div className="container-wide max-w-3xl">
            {/* Back link */}
            <Link
              href="/#project"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-navy-800"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to project overview
            </Link>

            {/* Title when no hero image */}
            {!slide.image && (
              <>
                <p className="eyebrow mb-3">Project Overview</p>
                <h1 className="text-3xl font-bold text-navy-900 md:text-4xl">{slide.title}</h1>
              </>
            )}

            {/* Short description */}
            {slide.description && (
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {slide.description}
              </p>
            )}

            {/* Full description */}
            {slide.fullDescription && (
              <div className="mt-8 space-y-4 text-base leading-relaxed text-navy-800">
                {slide.fullDescription.split(/\n\n+/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            {/* External CTA button if set */}
            {slide.buttonLink && slide.buttonText && (
              <div className="mt-10">
                <Link
                  href={slide.buttonLink}
                  className="inline-flex items-center rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gold-600"
                >
                  {slide.buttonText}
                </Link>
              </div>
            )}

            {/* Slide navigation */}
            {(prev || next) && (
              <nav className="mt-14 flex gap-4 border-t border-border pt-8">
                {prev && (
                  <Link
                    href={`/slides/${prev.id}`}
                    className="group flex flex-1 items-center gap-3 rounded-xl border border-border p-4 transition hover:border-navy-300 hover:bg-muted/50"
                  >
                    <ChevronLeft className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-navy-700" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Previous</p>
                      <p className="mt-0.5 truncate text-sm font-medium text-navy-900">
                        {prev.title}
                      </p>
                    </div>
                  </Link>
                )}
                {next && (
                  <Link
                    href={`/slides/${next.id}`}
                    className="group flex flex-1 flex-row-reverse items-center gap-3 rounded-xl border border-border p-4 text-right transition hover:border-navy-300 hover:bg-muted/50"
                  >
                    <ChevronLeft className="h-5 w-5 shrink-0 rotate-180 text-muted-foreground group-hover:text-navy-700" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Next</p>
                      <p className="mt-0.5 truncate text-sm font-medium text-navy-900">
                        {next.title}
                      </p>
                    </div>
                  </Link>
                )}
              </nav>
            )}
          </div>
        </section>
      </main>

      <Footer
        projectName={s.projectName}
        contactEmail={s.contactEmail}
        contactPhone={s.contactPhone}
        whatsapp={s.whatsapp}
        footerText={s.footerText}
      />
    </>
  );
}

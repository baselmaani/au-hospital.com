"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface PublicSlide {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
}

export function ProjectSlider({
  slides,
  eyebrow,
  heading,
}: {
  slides: PublicSlide[];
  eyebrow?: string | null;
  heading?: string | null;
}) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5500, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!embla) return;
    setSnaps(embla.scrollSnapList());
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  if (!slides.length) return null;

  return (
    <section className="bg-muted/40 py-16 md:py-24">
      <div className="container-wide">
        <div className="mb-10 flex items-end justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">{eyebrow ?? "Project Overview"}</p>
            <h2 className="mt-3 text-3xl font-semibold text-navy-900 md:text-4xl">
              {heading ?? "A Closer Look at the Project"}
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => embla?.scrollPrev()}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => embla?.scrollNext()}
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide) => {
              const href = slide.buttonLink ?? `/slides/${slide.id}`;

              return (
                <div
                  key={slide.id}
                  className="relative min-w-0 flex-[0_0_100%] md:flex-[0_0_70%] lg:flex-[0_0_60%] pr-4"
                >
                  <Link href={href} className="block group">
                    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border transition-shadow group-hover:shadow-md group-hover:ring-navy-300">
                      <div className="relative aspect-[16/9] w-full bg-navy-100 overflow-hidden">
                        {slide.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-navy-700 to-navy-900" />
                        )}
                      </div>
                      <div className="p-6 md:p-8">
                        <h3 className="text-xl font-semibold text-navy-900 md:text-2xl">
                          {slide.title}
                        </h3>
                        {slide.description ? (
                          <p className="mt-3 text-muted-foreground">
                            {slide.description}
                          </p>
                        ) : null}
                        <p className="mt-4 text-sm font-medium text-gold-700 group-hover:text-gold-600">
                          {slide.buttonText ? `${slide.buttonText} →` : "Learn more →"}
                        </p>
                      </div>
                    </article>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => embla?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                selected === i ? "w-8 bg-gold-500" : "w-2 bg-navy-200"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

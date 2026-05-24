"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PublicGalleryImage {
  id: string;
  title?: string | null;
  description?: string | null;
  image: string;
}

interface Props {
  images: PublicGalleryImage[];
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
}

export function GallerySection({ images, eyebrow, heading, description }: Props) {
  if (!images.length) return null;

  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 4500, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!embla) return;
    setSnaps(embla.scrollSnapList());
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
    return () => { embla.off("select", onSelect); };
  }, [embla]);

  return (
    <section id="gallery" className="bg-navy-950 py-16 md:py-24">
      <div className="container-wide">
        {/* Section header */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="eyebrow text-gold-400">{eyebrow ?? "Project Visuals"}</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            {heading ?? "Project Gallery"}
          </h2>
          <p className="mt-4 text-white/60">
            {description ?? "Concept renders and visual references of the planned medical facility."}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  className="relative min-w-0 flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_70%] px-2"
                >
                  <figure className="group relative overflow-hidden rounded-2xl bg-navy-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.image}
                      alt={img.title ?? `Gallery image ${idx + 1}`}
                      className="aspect-[16/9] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

                    {/* Caption */}
                    {(img.title || img.description) && (
                      <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-8 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {img.title && (
                          <p className="text-base font-semibold text-white">{img.title}</p>
                        )}
                        {img.description && (
                          <p className="mt-1 text-sm text-white/75">{img.description}</p>
                        )}
                      </figcaption>
                    )}
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 md:left-4 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={() => embla?.scrollNext()}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 md:right-4 md:h-12 md:w-12"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => embla?.scrollTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                selected === i ? "w-8 bg-gold-400" : "w-1.5 bg-white/30"
              )}
            />
          ))}
        </div>

        {/* Image count */}
        <p className="mt-4 text-center text-xs text-white/40 tabular-nums">
          {selected + 1} / {images.length}
        </p>
      </div>
    </section>
  );
}

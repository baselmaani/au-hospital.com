import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description?: string | null;
  eyebrow?: string | null;
  primaryBtnText?: string | null;
  primaryBtnLink?: string | null;
  secondaryBtnText?: string | null;
  secondaryBtnLink?: string | null;
}

export function IntroSection({
  title,
  description,
  eyebrow,
  primaryBtnText,
  primaryBtnLink,
  secondaryBtnText,
  secondaryBtnLink,
}: Props) {
  return (
    <section id="project" className="section">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{eyebrow ?? "Project Development Phase"}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-navy-900 md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}

          {(primaryBtnText || secondaryBtnText) && (
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {primaryBtnText && primaryBtnLink ? (
                <Button asChild size="lg" variant="accent">
                  <Link href={primaryBtnLink}>{primaryBtnText}</Link>
                </Button>
              ) : null}
              {secondaryBtnText && secondaryBtnLink ? (
                <Button asChild size="lg" variant="outline">
                  <Link href={secondaryBtnLink}>{secondaryBtnText}</Link>
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

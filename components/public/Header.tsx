"use client";

import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";

interface Props {
  projectName: string;
  logo?: string | null;
}

const NAV = [
  { href: "#project", label: "Project" },
  { href: "#founder", label: "Vision" },
  { href: "#investment", label: "Investment" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function Header({ projectName, logo }: Props) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-beige bg-ivory/95 backdrop-blur-md shadow-premium"
          : "bg-transparent"
      )}
    >
      <div className="container-wide flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt={projectName} className="h-10 w-auto" />
          ) : (
            <span
              className={cn(
                "grid h-10 w-10 place-items-center rounded-md border text-sm font-bold transition-colors",
                scrolled
                  ? "border-gold-500 bg-navy-900 text-gold-500"
                  : "border-gold-300 bg-navy-900/40 text-gold-200 backdrop-blur"
              )}
            >
              AU
            </span>
          )}
          <span
            className={cn(
              "font-serif text-lg font-semibold leading-tight transition-colors",
              scrolled ? "text-navy-900" : "text-white"
            )}
          >
            {projectName}
          </span>
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-8 text-sm font-medium md:flex",
            scrolled ? "text-ink" : "text-white/90"
          )}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative py-1 transition-colors hover:text-gold-500",
                "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:scale-x-0 after:bg-gold-500 after:transition-transform hover:after:scale-x-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block" />
      </div>
    </header>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  projectName: string;
  logo?: string | null;
}

export function Header({ projectName, logo }: Props) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-white/85 backdrop-blur-md">
      <div className="container-wide flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt={projectName} className="h-10 w-auto" />
          ) : (
            <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
              AU
            </span>
          )}
          <span className="font-serif text-lg font-semibold text-navy-900">
            {projectName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-navy-800 md:flex">
          <Link href="#project" className="transition hover:text-gold-600">
            Project
          </Link>
          <Link href="#investment" className="transition hover:text-gold-600">
            Investment
          </Link>
          <Link href="#gallery" className="transition hover:text-gold-600">
            Gallery
          </Link>
        </nav>

        <div className="hidden md:block" />
      </div>
    </header>
  );
}

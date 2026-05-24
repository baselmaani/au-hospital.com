interface Props {
  projectName: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  whatsapp?: string | null;
  footerText?: string | null;
}

export function Footer({ projectName, contactEmail, contactPhone, whatsapp, footerText }: Props) {
  const year = new Date().getFullYear();

  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}`
    : null;

  return (
    <footer className="relative bg-navy-900 text-white">
      {/* Gold top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      <div className="container-wide grid gap-6 py-10 md:grid-cols-2 md:items-start">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md border border-gold-500 bg-navy-950 text-sm font-bold text-gold-500">
              AU
            </span>
            <span className="font-serif text-lg font-semibold">{projectName}</span>
          </div>
          <p className="mt-3 max-w-md text-sm text-white/70">
            {footerText ??
              "A planned premium academic medical institution currently in the project development phase."}
          </p>
        </div>
        <div className="md:text-right">
          <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
            Contact
          </h4>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/85 md:justify-end">
            {contactEmail ? (
              <li>
                <a href={`mailto:${contactEmail}`} className="transition hover:text-gold-300">
                  {contactEmail}
                </a>
              </li>
            ) : null}
            {contactPhone ? (
              <li>
                <a href={`tel:${contactPhone}`} className="transition hover:text-gold-300">
                  {contactPhone}
                </a>
              </li>
            ) : null}
            {whatsappHref ? (
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-gold-300"
                >
                  WhatsApp
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-wide py-3 text-xs text-white/55">
          © {year} {projectName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

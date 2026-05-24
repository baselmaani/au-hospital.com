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
    <footer className="border-t border-border bg-navy-950 text-white">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="font-serif text-xl font-semibold">{projectName}</div>
          <p className="mt-3 max-w-sm text-sm text-white/70">
            {footerText ??
              "A planned medical facility currently in the project development phase."}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-300">
            Contact
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            {contactEmail ? (
              <li>
                <a href={`mailto:${contactEmail}`} className="hover:text-gold-300">
                  {contactEmail}
                </a>
              </li>
            ) : null}
            {contactPhone ? (
              <li>
                <a href={`tel:${contactPhone}`} className="hover:text-gold-300">
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
                  className="hover:text-gold-300"
                >
                  WhatsApp
                </a>
              </li>
            ) : null}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-300">
            Notice
          </h4>
          <p className="mt-3 text-sm text-white/70">
            This website is intended for investor relations purposes only. No clinical
            services are currently offered.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-start justify-between gap-2 py-5 text-xs text-white/60 md:flex-row md:items-center">
          <div>© {year} {projectName}. All rights reserved.</div>
          <div>Project Development Phase</div>
        </div>
      </div>
    </footer>
  );
}

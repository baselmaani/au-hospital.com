import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const metadata: Metadata = {
  title: {
    default: "AU Hospital — Investor Relations",
    template: "%s | AU Hospital",
  },
  description:
    "An investor-facing presentation of a planned modern hospital project currently in the development phase.",
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  openGraph: {
    type: "website",
    siteName: "AU Hospital",
    title: "AU Hospital — Investor Relations",
    description:
      "A planned modern hospital project designed to meet the growing demand for quality healthcare services.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "AU Hospital — Investor Relations",
    description:
      "A planned modern hospital project designed to meet the growing demand for quality healthcare services.",
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}


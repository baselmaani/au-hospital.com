import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const metadata: Metadata = {
  title: {
    default: "The American University Hospital — Aleppo",
    template: "%s | AU Hospital Aleppo",
  },
  description:
    "An investor-facing presentation of The American University Hospital – Aleppo, a planned premium academic medical institution currently in the project development phase.",
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  openGraph: {
    type: "website",
    siteName: "AU Hospital Aleppo",
    title: "The American University Hospital — Aleppo",
    description:
      "A planned premium academic medical institution combining medical trust, university prestige, and investor confidence.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "The American University Hospital — Aleppo",
    description:
      "A planned premium academic medical institution combining medical trust, university prestige, and investor confidence.",
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}


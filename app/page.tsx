import { prisma } from "@/lib/prisma";
import { Header } from "@/components/public/Header";
import { HeroImage } from "@/components/public/HeroImage";
import { IntroSection } from "@/components/public/IntroSection";
import { FounderSection } from "@/components/public/FounderSection";
import { ProjectSlider } from "@/components/public/ProjectSlider";
import { HighlightsSection } from "@/components/public/HighlightsSection";
import { InvestmentSection } from "@/components/public/InvestmentSection";
import { GallerySection } from "@/components/public/GallerySection";
import { Footer } from "@/components/public/Footer";

export const dynamic = "force-dynamic";

const DEFAULT_HOME = {
  heroImage: null,
  title: "A Modern Hospital Project Under Development",
  description:
    "A healthcare investment project designed to create a modern medical facility serving the growing demand for quality healthcare services in the region.",
  primaryBtnText: "Request Investor Deck",
  primaryBtnLink: "#contact",
  secondaryBtnText: "Contact Project Team",
  secondaryBtnLink: "#contact",
  investmentTitle: "A Long-Term Healthcare Investment Opportunity",
  investmentDescription:
    "Our planned multi-specialty facility is positioned to meet rising regional demand for quality healthcare.",
  investmentBtnText: "Request Investor Deck",
  investmentBtnLink: "#contact",
  documentsTitle: "Investor Documents",
  documentsDescription:
    "Detailed project documentation is available to qualified investors upon request.",
  documentsBtnText: "Request Investor Documents",
};

const DEFAULT_SETTINGS = {
  projectName: "AU Hospital",
  logo: null,
  contactEmail: null,
  contactPhone: null,
  whatsapp: null,
  footerText: null,
};

export default async function HomePage() {
  const [home, settings, slides, highlights, galleryImages, founder] = await Promise.all([
    prisma.homePage.findFirst({ orderBy: { createdAt: "asc" } }),
    prisma.siteSettings.findFirst({ orderBy: { createdAt: "asc" } }),
    prisma.slide.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.highlight.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.galleryImage.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.founder.findFirst({ where: { isActive: true }, orderBy: { createdAt: "asc" } }),
  ]);

  const h = home ?? DEFAULT_HOME;
  const s = settings ?? DEFAULT_SETTINGS;
  return (
    <>
      <Header projectName={s.projectName} logo={s.logo} />
      <main>
        <HeroImage image={h.heroImage} eyebrow={home?.heroEyebrow} subtext={home?.heroSubtext} />
        <IntroSection
          title={h.title}
          description={h.description}
          eyebrow={home?.introEyebrow}
          primaryBtnText={h.primaryBtnText}
          primaryBtnLink={h.primaryBtnLink}
          secondaryBtnText={h.secondaryBtnText}
          secondaryBtnLink={h.secondaryBtnLink}
        />
        {founder && <FounderSection founder={founder} />}
        <ProjectSlider
          slides={slides}
          eyebrow={home?.sliderEyebrow}
          heading={home?.sliderHeading}
        />
        <HighlightsSection
          highlights={highlights}
          eyebrow={home?.highlightsEyebrow}
          heading={home?.highlightsHeading}
        />
        <InvestmentSection
          title={h.investmentTitle}
          description={h.investmentDescription}
          btnText={h.investmentBtnText}
          btnLink={h.investmentBtnLink}
          stats={[
            { label: home?.stat1Label ?? "Project Stage", value: home?.stat1Value ?? "Development Phase" },
            { label: home?.stat2Label ?? "Sector", value: home?.stat2Value ?? "Private Healthcare" },
            { label: home?.stat3Label ?? "Model", value: home?.stat3Value ?? "Multi-Specialty" },
            { label: home?.stat4Label ?? "Horizon", value: home?.stat4Value ?? "Long-Term" },
          ]}
        />
        <GallerySection
          images={galleryImages}
          eyebrow={home?.galleryEyebrow}
          heading={home?.galleryHeading}
          description={home?.galleryDescription}
        />
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

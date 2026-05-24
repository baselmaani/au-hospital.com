import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@au-hospital.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const adminName = process.env.ADMIN_NAME || "Project Admin";

  // 1. Admin user
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      password: passwordHash,
      role: "ADMIN",
    },
  });
  console.log(`✓ Admin user ensured: ${adminEmail}`);

  // 2. Site settings (single row)
  const existingSettings = await prisma.siteSettings.findFirst();
  if (!existingSettings) {
    await prisma.siteSettings.create({
      data: {
        projectName: "AU Hospital",
        contactEmail: "investors@au-hospital.com",
        contactPhone: "+000 000 0000",
        whatsapp: "+000 000 0000",
        footerText:
          "A planned medical facility currently in the project development phase. This website is intended for investor relations purposes only.",
      },
    });
    console.log("✓ Site settings seeded");
  }

  // 3. Home page (single row)
  const existingHome = await prisma.homePage.findFirst();
  if (!existingHome) {
    await prisma.homePage.create({
      data: {
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
          "Our planned multi-specialty facility is positioned to meet rising regional demand for quality healthcare. We are actively engaging strategic investors who share our vision of building a scalable, future-ready medical destination.",
        investmentBtnText: "Request Investor Deck",
        investmentBtnLink: "#contact",
        documentsTitle: "Investor Documents",
        documentsDescription:
          "Detailed project documentation including the executive summary, financial model and master plan is available to qualified investors upon request.",
        documentsBtnText: "Request Investor Documents",
      },
    });
    console.log("✓ Home page content seeded");
  }

  // 4. Slides
  const slideCount = await prisma.slide.count();
  if (slideCount === 0) {
    await prisma.slide.createMany({
      data: [
        {
          title: "Modern Hospital Concept",
          description:
            "A contemporary architectural design built around patient experience, clinical efficiency and operational scalability.",
          sortOrder: 1,
        },
        {
          title: "Strategic Location",
          description:
            "Positioned within a high-growth catchment area with strong demographics and limited existing capacity.",
          sortOrder: 2,
        },
        {
          title: "Planned Medical Departments",
          description:
            "A balanced multi-specialty model covering core inpatient, outpatient, diagnostic and surgical services.",
          sortOrder: 3,
        },
        {
          title: "Investment Opportunity",
          description:
            "A structured equity opportunity for long-term partners aligned with the healthcare growth thesis.",
          sortOrder: 4,
        },
        {
          title: "Project Development Phases",
          description:
            "A staged delivery roadmap covering design, construction, commissioning and clinical activation.",
          sortOrder: 5,
        },
      ],
    });
    console.log("✓ Slides seeded");
  }

  // 5. Highlights
  const hlCount = await prisma.highlight.count();
  if (hlCount === 0) {
    await prisma.highlight.createMany({
      data: [
        {
          title: "Strategic Location",
          description:
            "Sited in a high-demand catchment with strong demographic tailwinds and limited competing capacity.",
          icon: "MapPin",
          sortOrder: 1,
        },
        {
          title: "Modern Medical Facility",
          description:
            "Designed around current international standards for clinical workflow, safety and patient experience.",
          icon: "Building2",
          sortOrder: 2,
        },
        {
          title: "Multi-Specialty Model",
          description:
            "A balanced service mix across inpatient, outpatient, diagnostics and key specialty lines.",
          icon: "Stethoscope",
          sortOrder: 3,
        },
        {
          title: "Investor-Focused Opportunity",
          description:
            "Structured for long-term partners seeking exposure to defensive, growth-oriented healthcare assets.",
          icon: "TrendingUp",
          sortOrder: 4,
        },
        {
          title: "Scalable Development Plan",
          description:
            "Phased build-out enabling controlled capital deployment and progressive capacity expansion.",
          icon: "Layers",
          sortOrder: 5,
        },
        {
          title: "Long-Term Healthcare Demand",
          description:
            "Underpinned by demographic, regulatory and macro drivers supporting durable, recurring demand.",
          icon: "LineChart",
          sortOrder: 6,
        },
      ],
    });
    console.log("✓ Highlights seeded");
  }

  console.log("\nSeed completed.");

  // 6. Founder
  const founderCount = await prisma.founder.count();
  if (founderCount === 0) {
    await prisma.founder.create({
      data: {
        name: "Ahmed Al-Mansouri",
        title: "Founder & Project Visionary",
        shortBio:
          "A seasoned entrepreneur with over two decades of experience in real estate development and private equity, Ahmed Al-Mansouri identified a critical gap in regional healthcare infrastructure and committed to closing it through this project.",
        message:
          "I have always believed that great healthcare is not a privilege — it is the foundation of a thriving community. This hospital is not simply a building; it is a commitment to the region's future. We are inviting partners who share that conviction to join us on a journey that will define healthcare delivery for the next generation.",
        buttonText: "Request a Private Meeting",
        buttonLink: "#contact",
        isActive: true,
      },
    });
    console.log("✓ Founder seeded");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

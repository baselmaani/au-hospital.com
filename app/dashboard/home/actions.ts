"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resolveFileField } from "@/lib/uploads";
import { revalidatePath } from "next/cache";

function s(v: FormDataEntryValue | null): string | null {
  if (v === null) return null;
  const str = v.toString().trim();
  return str.length ? str : null;
}

export async function saveHomePageAction(formData: FormData) {
  await requireAdmin();

  const existing = await prisma.homePage.findFirst({ orderBy: { createdAt: "asc" } });

  const heroImage = await resolveFileField(formData, "heroImage", existing?.heroImage, "image");

  const data = {
    heroImage,
    heroEyebrow: s(formData.get("heroEyebrow")),
    heroSubtext: s(formData.get("heroSubtext")),
    title: s(formData.get("title")) ?? "Hospital Project Under Development",
    description: s(formData.get("description")),
    introEyebrow: s(formData.get("introEyebrow")),
    primaryBtnText: s(formData.get("primaryBtnText")),
    primaryBtnLink: s(formData.get("primaryBtnLink")),
    secondaryBtnText: s(formData.get("secondaryBtnText")),
    secondaryBtnLink: s(formData.get("secondaryBtnLink")),
    sliderEyebrow: s(formData.get("sliderEyebrow")),
    sliderHeading: s(formData.get("sliderHeading")),
    highlightsEyebrow: s(formData.get("highlightsEyebrow")),
    highlightsHeading: s(formData.get("highlightsHeading")),
    investmentTitle: s(formData.get("investmentTitle")),
    investmentDescription: s(formData.get("investmentDescription")),
    investmentBtnText: s(formData.get("investmentBtnText")),
    investmentBtnLink: s(formData.get("investmentBtnLink")),
    stat1Label: s(formData.get("stat1Label")),
    stat1Value: s(formData.get("stat1Value")),
    stat2Label: s(formData.get("stat2Label")),
    stat2Value: s(formData.get("stat2Value")),
    stat3Label: s(formData.get("stat3Label")),
    stat3Value: s(formData.get("stat3Value")),
    stat4Label: s(formData.get("stat4Label")),
    stat4Value: s(formData.get("stat4Value")),
    galleryEyebrow: s(formData.get("galleryEyebrow")),
    galleryHeading: s(formData.get("galleryHeading")),
    galleryDescription: s(formData.get("galleryDescription")),
    documentsTitle: s(formData.get("documentsTitle")),
    documentsDescription: s(formData.get("documentsDescription")),
    documentsBtnText: s(formData.get("documentsBtnText")),
  };

  if (existing) {
    await prisma.homePage.update({ where: { id: existing.id }, data });
  } else {
    await prisma.homePage.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/dashboard/home");
}

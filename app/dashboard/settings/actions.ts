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

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();
  const existing = await prisma.siteSettings.findFirst({ orderBy: { createdAt: "asc" } });

  const logo = await resolveFileField(formData, "logo", existing?.logo, "image");

  const data = {
    projectName: s(formData.get("projectName")) ?? "AU Hospital",
    logo,
    contactEmail: s(formData.get("contactEmail")),
    contactPhone: s(formData.get("contactPhone")),
    whatsapp: s(formData.get("whatsapp")),
    footerText: s(formData.get("footerText")),
  };

  if (existing) {
    await prisma.siteSettings.update({ where: { id: existing.id }, data });
  } else {
    await prisma.siteSettings.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/dashboard/settings");
}

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

export async function saveFounderAction(formData: FormData) {
  await requireAdmin();

  const existing = await prisma.founder.findFirst({ orderBy: { createdAt: "asc" } });

  const photo = await resolveFileField(formData, "photo", existing?.photo, "image");
  const signatureImage = await resolveFileField(formData, "signatureImage", existing?.signatureImage, "image");

  const data = {
    name: s(formData.get("name")) ?? "Founder",
    title: s(formData.get("title")),
    photo,
    shortBio: s(formData.get("shortBio")),
    message: s(formData.get("message")),
    signatureImage,
    buttonText: s(formData.get("buttonText")),
    buttonLink: s(formData.get("buttonLink")),
    isActive: formData.get("isActive") === "1",
  };

  if (existing) {
    await prisma.founder.update({ where: { id: existing.id }, data });
  } else {
    await prisma.founder.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/dashboard/founder");
}

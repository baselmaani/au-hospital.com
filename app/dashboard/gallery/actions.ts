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
function n(v: FormDataEntryValue | null, fallback = 0): number {
  const num = Number(v?.toString() ?? "");
  return Number.isFinite(num) ? num : fallback;
}

export async function createGalleryImageAction(formData: FormData) {
  await requireAdmin();
  const image = await resolveFileField(formData, "image", null, "image");
  if (!image) throw new Error("Image is required");
  await prisma.galleryImage.create({
    data: {
      image,
      title: s(formData.get("title")),
      description: s(formData.get("description")),
      sortOrder: n(formData.get("sortOrder"), 0),
      isActive: formData.get("isActive") === "on",
    },
  });
  revalidatePath("/");
  revalidatePath("/dashboard/gallery");
}

export async function updateGalleryImageAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  const existing = await prisma.galleryImage.findUnique({ where: { id } });
  if (!existing) return;

  await prisma.galleryImage.update({
    where: { id },
    data: {
      title: s(formData.get("title")),
      description: s(formData.get("description")),
      sortOrder: n(formData.get("sortOrder"), existing.sortOrder),
    },
  });
  revalidatePath("/");
  revalidatePath("/dashboard/gallery");
}

export async function toggleGalleryImageAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  const item = await prisma.galleryImage.findUnique({ where: { id } });
  if (!item) return;
  await prisma.galleryImage.update({
    where: { id },
    data: { isActive: !item.isActive },
  });
  revalidatePath("/");
  revalidatePath("/dashboard/gallery");
}

export async function deleteGalleryImageAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard/gallery");
}

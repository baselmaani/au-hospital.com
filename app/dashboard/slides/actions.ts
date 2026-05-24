"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resolveFileField } from "@/lib/uploads";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function s(v: FormDataEntryValue | null): string | null {
  if (v === null) return null;
  const str = v.toString().trim();
  return str.length ? str : null;
}
function n(v: FormDataEntryValue | null, fallback = 0): number {
  const num = Number(v?.toString() ?? "");
  return Number.isFinite(num) ? num : fallback;
}

export async function createSlideAction(formData: FormData) {
  await requireAdmin();
  const image = await resolveFileField(formData, "image", null, "image");
  await prisma.slide.create({
    data: {
      title: s(formData.get("title")) ?? "Untitled slide",
      description: s(formData.get("description")),
      fullDescription: s(formData.get("fullDescription")),
      image,
      buttonText: s(formData.get("buttonText")),
      buttonLink: s(formData.get("buttonLink")),
      sortOrder: n(formData.get("sortOrder"), 0),
      isActive: formData.get("isActive") === "on",
    },
  });
  revalidatePath("/");
  revalidatePath("/dashboard/slides");
  redirect("/dashboard/slides");
}

export async function updateSlideAction(id: string, formData: FormData) {
  await requireAdmin();
  const existing = await prisma.slide.findUnique({ where: { id } });
  if (!existing) return;

  const image = await resolveFileField(formData, "image", existing.image, "image");

  await prisma.slide.update({
    where: { id },
    data: {
      title: s(formData.get("title")) ?? existing.title,
      description: s(formData.get("description")),
      fullDescription: s(formData.get("fullDescription")),
      image,
      buttonText: s(formData.get("buttonText")),
      buttonLink: s(formData.get("buttonLink")),
      sortOrder: n(formData.get("sortOrder"), existing.sortOrder),
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/slides");
  redirect("/dashboard/slides");
}

export async function deleteSlideAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.slide.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard/slides");
}

export async function toggleSlideAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  const slide = await prisma.slide.findUnique({ where: { id } });
  if (!slide) return;
  await prisma.slide.update({ where: { id }, data: { isActive: !slide.isActive } });
  revalidatePath("/");
  revalidatePath("/dashboard/slides");
}

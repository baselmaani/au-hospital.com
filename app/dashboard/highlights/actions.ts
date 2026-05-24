"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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

export async function createHighlightAction(formData: FormData) {
  await requireAdmin();
  await prisma.highlight.create({
    data: {
      title: s(formData.get("title")) ?? "Untitled",
      description: s(formData.get("description")),
      icon: s(formData.get("icon")) ?? "Sparkles",
      sortOrder: n(formData.get("sortOrder"), 0),
      isActive: formData.get("isActive") === "on",
    },
  });
  revalidatePath("/");
  revalidatePath("/dashboard/highlights");
  redirect("/dashboard/highlights");
}

export async function updateHighlightAction(id: string, formData: FormData) {
  await requireAdmin();
  const existing = await prisma.highlight.findUnique({ where: { id } });
  if (!existing) return;
  await prisma.highlight.update({
    where: { id },
    data: {
      title: s(formData.get("title")) ?? existing.title,
      description: s(formData.get("description")),
      icon: s(formData.get("icon")) ?? existing.icon,
      sortOrder: n(formData.get("sortOrder"), existing.sortOrder),
      isActive: formData.get("isActive") === "on",
    },
  });
  revalidatePath("/");
  revalidatePath("/dashboard/highlights");
  redirect("/dashboard/highlights");
}

export async function deleteHighlightAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.highlight.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard/highlights");
}

export async function toggleHighlightAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  const h = await prisma.highlight.findUnique({ where: { id } });
  if (!h) return;
  await prisma.highlight.update({ where: { id }, data: { isActive: !h.isActive } });
  revalidatePath("/");
  revalidatePath("/dashboard/highlights");
}

"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUpload } from "@/lib/uploads";
import { revalidatePath } from "next/cache";

function s(v: FormDataEntryValue | null): string | null {
  if (v === null) return null;
  const str = v.toString().trim();
  return str.length ? str : null;
}

export async function createDocumentAction(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) throw new Error("PDF file is required");
  const fileUrl = await saveUpload(file, "document");
  await prisma.document.create({
    data: {
      title: s(formData.get("title")) ?? "Untitled document",
      description: s(formData.get("description")),
      fileUrl,
      isPrivate: formData.get("isPrivate") === "on",
    },
  });
  revalidatePath("/");
  revalidatePath("/dashboard/documents");
}

export async function updateDocumentAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  const existing = await prisma.document.findUnique({ where: { id } });
  if (!existing) return;
  await prisma.document.update({
    where: { id },
    data: {
      title: s(formData.get("title")) ?? existing.title,
      description: s(formData.get("description")),
      isPrivate: formData.get("isPrivate") === "on",
    },
  });
  revalidatePath("/");
  revalidatePath("/dashboard/documents");
}

export async function deleteDocumentAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.document.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard/documents");
}

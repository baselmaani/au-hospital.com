"use server";

import { requireAdmin } from "@/lib/auth";
import { saveUpload, deleteMedia } from "@/lib/uploads";
import { revalidatePath } from "next/cache";

export async function uploadMediaAction(formData: FormData) {
  await requireAdmin();
  const files = formData.getAll("file") as File[];
  const valid = files.filter((f) => f && f.size > 0);
  if (!valid.length) return;

  await Promise.all(
    valid.map((file) => {
      const kind = file.type === "application/pdf" ? "document" : "image";
      return saveUpload(file, kind);
    })
  );
  revalidatePath("/dashboard/media");
}

export async function deleteMediaAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  const url = formData.get("url")?.toString();
  if (!id || !url) return;
  await deleteMedia(id, url);
  revalidatePath("/dashboard/media");
}

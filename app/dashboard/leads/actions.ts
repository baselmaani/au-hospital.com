"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function updateLeadStatusAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString() as LeadStatus | undefined;
  if (!id || !status || !LEAD_STATUSES.includes(status)) return;
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/dashboard/leads");
}

export async function updateLeadNotesAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  const notes = formData.get("notes")?.toString().trim() ?? "";
  if (!id) return;
  await prisma.lead.update({ where: { id }, data: { notes: notes || null } });
  revalidatePath("/dashboard/leads");
}

export async function deleteLeadAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/dashboard/leads");
}


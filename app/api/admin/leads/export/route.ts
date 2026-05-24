import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";

export async function GET() {
  await requireAdmin();

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  const header = [
    "Date",
    "Name",
    "Email",
    "Phone",
    "Company",
    "Status",
    "Requested Document",
    "Message",
    "Notes",
  ];

  const escape = (v: string | null | undefined) => {
    if (!v) return "";
    const s = v.replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = leads.map((l) =>
    [
      escape(formatDateTime(l.createdAt)),
      escape(l.name),
      escape(l.email),
      escape(l.phone),
      escape(l.company),
      escape(l.status),
      escape(l.requestedDocument),
      escape(l.message),
      escape(l.notes),
    ].join(",")
  );

  const csv = [header.join(","), ...rows].join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

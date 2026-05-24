import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendNewLeadNotification } from "@/lib/email";

// ── Simple in-memory rate limiter (3 submissions per 10 min per IP) ──────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}
// ─────────────────────────────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional().or(z.literal("")),
  company: z.string().max(200).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  requestedDocument: z.string().max(200).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const v = parsed.data;
  try {
    const lead = await prisma.lead.create({
      data: {
        name: v.name.trim(),
        email: v.email.trim().toLowerCase(),
        phone: v.phone?.trim() || null,
        company: v.company?.trim() || null,
        message: v.message?.trim() || null,
        requestedDocument: v.requestedDocument?.trim() || null,
        status: "New",
      },
    });

    // Fire-and-forget — don't fail the response if email fails
    sendNewLeadNotification(lead).catch((err) =>
      console.error("Email notification failed:", err)
    );

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (e) {
    console.error("Lead create failed", e);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }
}


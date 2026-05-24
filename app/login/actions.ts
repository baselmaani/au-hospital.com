"use server";

import { signIn } from "@/lib/auth";

export async function loginAction(input: { email: string; password: string }) {
  if (!input?.email || !input?.password) {
    return { ok: false as const, error: "Email and password required" };
  }
  const res = await signIn(input.email, input.password);
  if (!res.ok) return res;
  return { ok: true as const };
}

import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const COOKIE_NAME = "au_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "AUTH_SECRET environment variable is missing or too short. Set it in .env"
    );
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayload extends JWTPayload {
  uid: string;
  email: string;
  role: string;
}

export async function createSessionToken(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }
  return session;
}

export async function signIn(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!user) return { ok: false as const, error: "Invalid email or password" };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { ok: false as const, error: "Invalid email or password" };

  const token = await createSessionToken({
    uid: user.id,
    email: user.email,
    role: user.role,
  });

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return { ok: true as const, user };
}

export async function signOut() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;

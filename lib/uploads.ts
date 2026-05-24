import "server-only";
import { put, del } from "@vercel/blob";
import path from "path";
import { randomUUID } from "crypto";
import { prisma } from "./prisma";

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const ALLOWED_DOC_TYPES = new Set(["application/pdf"]);

const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB
const MAX_DOC_BYTES = 20 * 1024 * 1024; // 20MB

export type UploadKind = "image" | "document";

export async function saveUpload(file: File, kind: UploadKind): Promise<string> {
  if (!file || typeof file === "string") {
    throw new Error("No file provided");
  }

  const allowed = kind === "image" ? ALLOWED_IMAGE_TYPES : ALLOWED_DOC_TYPES;
  if (!allowed.has(file.type)) {
    throw new Error(
      `Invalid file type "${file.type}". Allowed: ${[...allowed].join(", ")}`
    );
  }

  const maxBytes = kind === "image" ? MAX_IMAGE_BYTES : MAX_DOC_BYTES;
  if (file.size > maxBytes) {
    throw new Error(`File too large. Max ${Math.round(maxBytes / 1024 / 1024)}MB.`);
  }

  const ext = getExtension(file.name, file.type);
  const filename = `${Date.now()}-${randomUUID()}${ext}`;

  const { url } = await put(filename, file, {
    access: "public",
    contentType: file.type,
  });

  // Track in media library (non-blocking)
  prisma.media
    .create({ data: { url, filename: file.name, mimeType: file.type, size: file.size } })
    .catch(() => {});

  return url;
}

export async function deleteMedia(id: string, url: string): Promise<void> {
  await del(url);
  await prisma.media.delete({ where: { id } });
}

/**
 * Resolves a file field from FormData that may come from:
 * 1. A newly uploaded file (the `name` field)
 * 2. A library URL selected from the media picker (`name__libraryUrl`)
 * 3. A clear flag (`name__clear`) → returns null
 * 4. No change → returns `existing`
 */
export async function resolveFileField(
  formData: FormData,
  name: string,
  existing: string | null | undefined,
  kind: UploadKind = "image"
): Promise<string | null> {
  const file = formData.get(name) as File | null;
  const cleared = formData.get(`${name}__clear`) === "1";
  const libraryUrl = formData.get(`${name}__libraryUrl`)?.toString().trim() || null;

  if (file && file.size > 0) return await saveUpload(file, kind);
  if (libraryUrl) return libraryUrl;
  if (cleared) return null;
  return existing ?? null;
}

function getExtension(name: string, mime: string): string {
  const fromName = path.extname(name).toLowerCase();
  if (fromName) return fromName;
  const map: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/svg+xml": ".svg",
    "application/pdf": ".pdf",
  };
  return map[mime] ?? "";
}

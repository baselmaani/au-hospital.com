import { defineConfig } from "prisma/config";
import { loadEnvFile } from "node:process";

try {
  loadEnvFile(".env");
} catch {
  // .env not present (e.g. Vercel production — vars injected by platform)
}

export default defineConfig({
  schema: "prisma/schema.prisma",
});

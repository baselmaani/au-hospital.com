# AU Hospital — Investor Project Website

A full-stack Next.js application presenting a pre-construction hospital project to investors. Includes a public investor-facing site and a protected CMS dashboard for managing all content.

> **Important:** This site is intentionally not designed for patients, doctor listings, or appointments. It is for investor relations during the project development phase.

## Tech stack

- **Next.js 15** (App Router, Server Components, Server Actions)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui-style** primitives (Radix UI)
- **Prisma** ORM + **PostgreSQL**
- **Custom JWT cookie auth** (jose + bcryptjs)
- **embla-carousel** for the homepage slider
- **lucide-react** icons
- **react-hook-form** + **zod** validation
- **sonner** for toasts
- Local file uploads (`/public/uploads/`)

## Project structure

```
app/
  layout.tsx, globals.css
  page.tsx                          # Public home page
  login/                            # Admin sign-in
  logout/                           # Sign-out route
  api/
    leads/route.ts                  # Public lead submission
  dashboard/                        # Protected CMS
    layout.tsx, page.tsx
    home/   (page.tsx + actions.ts)
    slides/ (list, new, [id]/edit)
    highlights/
    gallery/
    documents/
    leads/
    settings/
components/
  ui/                               # Button, Input, Card, Switch, Select, Dialog…
  public/                           # Public site sections
  dashboard/                        # Sidebar, header, upload field, etc.
lib/
  prisma.ts, auth.ts, uploads.ts, utils.ts
prisma/
  schema.prisma
  seed.ts
middleware.ts                       # Protects /dashboard/*
public/uploads/                     # Runtime upload storage
```

## Prerequisites

- Node.js 20+
- PostgreSQL 14+ (local or hosted)
- npm or pnpm

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
copy .env.example .env        # (PowerShell: Copy-Item .env.example .env)
# Edit .env and set:
#   DATABASE_URL         -> your PostgreSQL connection string
#   AUTH_SECRET          -> long random string (>=32 chars)
#   ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME

# 3. Create the database schema
npx prisma migrate dev --name init

# 4. Seed initial content + admin user
npm run db:seed

# 5. Run the dev server
npm run dev
```

Open:

- Public site: <http://localhost:3000>
- Admin sign-in: <http://localhost:3000/login>
- Dashboard: <http://localhost:3000/dashboard>

Sign in with the email/password from `.env`.

## Production build

```bash
npm run build
npm start
```

`prisma generate` runs automatically via `postinstall` and `build`.

## Useful scripts

| Script               | Purpose                              |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Start dev server                     |
| `npm run build`      | Build for production                 |
| `npm start`          | Start production server              |
| `npm run db:push`    | Sync schema without creating migration |
| `npm run db:migrate` | Create and apply migration           |
| `npm run db:seed`    | Seed home/slides/highlights/admin    |
| `npm run db:studio`  | Open Prisma Studio                   |

## Content model

| Model         | Purpose                                          |
| ------------- | ------------------------------------------------ |
| `User`        | Admin login                                      |
| `SiteSettings`| Project name, logo, contact, footer text         |
| `HomePage`    | Hero + intro + investment + documents blocks     |
| `Slide`       | Homepage carousel items                          |
| `Highlight`   | Project highlight cards                          |
| `GalleryImage`| Public gallery                                   |
| `Document`    | Investor PDFs (public/private)                   |
| `Lead`        | Contact form submissions                         |

All public homepage content is dynamic — edit it from `/dashboard/home`, `/dashboard/slides`, `/dashboard/highlights`, `/dashboard/gallery`, `/dashboard/documents`, and `/dashboard/settings`.

## Uploads

Files uploaded from the dashboard are stored in `public/uploads/` and served at `/uploads/<filename>`. The folder is git-ignored. Limits:

- Images: 8 MB, jpeg/png/webp/gif/svg
- Documents: 20 MB, application/pdf

For multi-server / serverless deployments swap `lib/uploads.ts` for S3/R2/Cloudinary.

## Security notes

- Dashboard routes are protected by `middleware.ts` (cookie presence) plus a server-side `requireAdmin()` check in the layout and every server action.
- Session is a signed JWT (HS256) in an HTTP-only cookie. Set a strong `AUTH_SECRET`.
- Passwords are hashed with bcryptjs (cost 12).
- Lead submissions are validated with zod.

## Customizing the look

- Brand palette: `tailwind.config.ts` (`navy`, `gold`) and `app/globals.css` HSL tokens.
- Section components live in `components/public/`.

## What is intentionally **not** included

- No patient booking / appointment flow
- No doctor listings
- No emergency or active-hospital wording
- No public SEO indexing (`robots: noindex` is set in `app/layout.tsx`)

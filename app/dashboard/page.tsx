import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Inbox,
  Images,
  Sparkles,
  GalleryHorizontal,
  FileText,
  Home,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default async function DashboardIndexPage() {
  const [leadCount, newLeadCount, slideCount, highlightCount, galleryCount, docCount, recentLeads] =
    await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "New" } }),
      prisma.slide.count(),
      prisma.highlight.count(),
      prisma.galleryImage.count(),
      prisma.document.count(),
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "New leads", value: newLeadCount, total: leadCount, href: "/dashboard/leads", icon: Inbox },
    { label: "Slides", value: slideCount, href: "/dashboard/slides", icon: Images },
    { label: "Highlights", value: highlightCount, href: "/dashboard/highlights", icon: Sparkles },
    { label: "Gallery", value: galleryCount, href: "/dashboard/gallery", icon: GalleryHorizontal },
    { label: "Documents", value: docCount, href: "/dashboard/documents", icon: FileText },
    { label: "Home page", value: "Edit", href: "/dashboard/home", icon: Home },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Manage all investor-facing content from one place."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} href={s.href}>
              <Card className="h-full">
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </p>
                    <div className="mt-2 text-3xl font-semibold text-navy-900">
                      {s.value}
                      {s.total !== undefined && (
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          / {s.total} total
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy-50 text-navy-700">
                    <Icon className="h-5 w-5" />
                  </span>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center text-sm font-medium text-gold-700">
                    Manage <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Recent leads</CardTitle>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <p className="text-sm text-muted-foreground">No leads yet.</p>
            ) : (
              <ul className="divide-y divide-border">
                {recentLeads.map((l) => (
                  <li key={l.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <div>
                      <div className="font-medium text-navy-900">{l.name}</div>
                      <div className="text-muted-foreground">{l.email}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs text-navy-800">
                        {l.status}
                      </span>
                      <Link
                        href="/dashboard/leads"
                        className="text-sm font-medium text-gold-700 hover:underline"
                      >
                        View
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

import * as React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LEAD_STATUSES } from "@/lib/utils";
import { formatDateTime } from "@/lib/utils";
import { LeadActions } from "./LeadActions";
import { Download } from "lucide-react";

export default async function LeadsAdmin() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  const byStatus = LEAD_STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = leads.filter((l) => l.status === s).length;
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        title="Leads"
        description="Investor contact form submissions."
        actions={
          leads.length > 0 ? (
            <Button asChild variant="outline" size="sm">
              <Link href="/api/admin/leads/export">
                <Download className="mr-1.5 h-4 w-4" />
                Export CSV
              </Link>
            </Button>
          ) : null
        }
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {LEAD_STATUSES.map((s) => (
          <span
            key={s}
            className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-navy-800"
          >
            {s}: <strong className="ml-1">{byStatus[s] ?? 0}</strong>
          </span>
        ))}
      </div>

      {leads.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No leads yet. Submissions from the public contact form will appear here.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Submitted</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Requested</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leads.map((l) => (
                    <React.Fragment key={l.id}>
                      <tr className="align-top">
                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                          {formatDateTime(l.createdAt)}
                        </td>
                        <td className="px-4 py-3 font-medium text-navy-900">{l.name}</td>
                        <td className="px-4 py-3">
                          <a href={`mailto:${l.email}`} className="text-navy-800 hover:text-gold-700">
                            {l.email}
                          </a>
                        </td>
                        <td className="px-4 py-3">{l.company ?? "—"}</td>
                        <td className="px-4 py-3">{l.phone ?? "—"}</td>
                        <td className="px-4 py-3">{l.requestedDocument ?? "—"}</td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={
                              l.status === "New"
                                ? "info"
                                : l.status === "Interested"
                                ? "success"
                                : l.status === "Not Qualified"
                                ? "muted"
                                : "default"
                            }
                          >
                            {l.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <LeadActions
                            id={l.id}
                            currentStatus={l.status}
                            currentNotes={l.notes}
                          />
                        </td>
                      </tr>
                      {(l.message || l.notes) ? (
                        <tr className="bg-muted/20">
                          <td colSpan={8} className="space-y-1 px-4 py-3 text-sm text-muted-foreground">
                            {l.message ? (
                              <p>
                                <strong className="text-navy-800">Message:</strong> {l.message}
                              </p>
                            ) : null}
                            {l.notes ? (
                              <p>
                                <strong className="text-navy-800">Notes:</strong> {l.notes}
                              </p>
                            ) : null}
                          </td>
                        </tr>
                      ) : null}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

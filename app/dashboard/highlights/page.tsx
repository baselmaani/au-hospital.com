import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Eye, EyeOff, Trash2 } from "lucide-react";
import { deleteHighlightAction, toggleHighlightAction } from "./actions";

export default async function HighlightsAdmin() {
  const items = await prisma.highlight.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <>
      <PageHeader
        title="Highlights"
        description="Manage the project highlight cards on the homepage."
        actions={
          <Button asChild>
            <Link href="/dashboard/highlights/new">
              <Plus className="mr-1.5 h-4 w-4" /> New highlight
            </Link>
          </Button>
        }
      />
      {items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-muted-foreground">No highlights yet.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/highlights/new">Create your first highlight</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {items.map((h) => (
            <Card key={h.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-md bg-navy-50 text-xs font-medium text-navy-700">
                  {h.icon ?? "—"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-navy-900">{h.title}</h3>
                    {h.isActive ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="muted">Inactive</Badge>
                    )}
                    <Badge variant="info">Order {h.sortOrder}</Badge>
                  </div>
                  {h.description && (
                    <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                      {h.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/highlights/${h.id}`}>
                      <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                    </Link>
                  </Button>
                  <form action={toggleHighlightAction}>
                    <input type="hidden" name="id" value={h.id} />
                    <Button type="submit" variant="ghost" size="sm">
                      {h.isActive ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </form>
                  <form action={deleteHighlightAction}>
                    <input type="hidden" name="id" value={h.id} />
                    <Button type="submit" variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

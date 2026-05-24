import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Eye, EyeOff, Trash2, Link2 } from "lucide-react";
import { deleteSlideAction, toggleSlideAction } from "./actions";

export default async function SlidesAdmin() {
  const slides = await prisma.slide.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <PageHeader
        title="Slides"
        description="Manage the homepage carousel."
        actions={
          <Button asChild>
            <Link href="/dashboard/slides/new">
              <Plus className="mr-1.5 h-4 w-4" /> New slide
            </Link>
          </Button>
        }
      />

      {slides.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4">
          {slides.map((slide) => (
            <Card key={slide.id}>
              <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center">
                <div className="h-24 w-40 flex-shrink-0 overflow-hidden rounded-md bg-navy-100">
                  {slide.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={slide.image} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-navy-900">{slide.title}</h3>
                    {slide.isActive ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="muted">Inactive</Badge>
                    )}
                    <Badge variant="info">Order {slide.sortOrder}</Badge>
                    {slide.buttonLink ? (
                      <Badge variant="default" className="gap-1">
                        <Link2 className="h-3 w-3" /> Linked
                      </Badge>
                    ) : null}
                  </div>
                  {slide.description ? (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {slide.description}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/slides/${slide.id}`}>
                      <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                    </Link>
                  </Button>
                  <form action={toggleSlideAction}>
                    <input type="hidden" name="id" value={slide.id} />
                    <Button type="submit" variant="ghost" size="sm">
                      {slide.isActive ? (
                        <>
                          <EyeOff className="mr-1.5 h-3.5 w-3.5" /> Deactivate
                        </>
                      ) : (
                        <>
                          <Eye className="mr-1.5 h-3.5 w-3.5" /> Activate
                        </>
                      )}
                    </Button>
                  </form>
                  <form action={deleteSlideAction}>
                    <input type="hidden" name="id" value={slide.id} />
                    <Button type="submit" variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete
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

function EmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground">No slides yet.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/slides/new">Create your first slide</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

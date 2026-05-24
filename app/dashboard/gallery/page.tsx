import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadField } from "@/components/dashboard/UploadField";
import { SubmitButton } from "@/components/dashboard/SubmitButton";
import { Eye, EyeOff, Trash2, Save } from "lucide-react";
import {
  createGalleryImageAction,
  deleteGalleryImageAction,
  toggleGalleryImageAction,
  updateGalleryImageAction,
} from "./actions";

export default async function GalleryAdmin() {
  const items = await prisma.galleryImage.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <>
      <PageHeader
        title="Gallery"
        description="Upload and manage gallery images."
      />

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload new image</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createGalleryImageAction} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <UploadField name="image" label="Image *" variant="image" required />
            </div>
            <div>
              <Label htmlFor="title">Title (optional)</Label>
              <Input id="title" name="title" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="sortOrder">Sort order</Label>
              <Input id="sortOrder" name="sortOrder" type="number" defaultValue={0} className="mt-1.5" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Input id="description" name="description" className="mt-1.5" />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <Switch name="isActive" defaultChecked />
              <span className="text-sm">Active</span>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <SubmitButton>Upload image</SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>

      {items.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No gallery images yet. Upload one above.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((g) => (
            <Card key={g.id}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-navy-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.image} alt={g.title ?? ""} className="h-full w-full object-cover" />
                <div className="absolute left-3 top-3">
                  {g.isActive ? (
                    <Badge variant="success">Active</Badge>
                  ) : (
                    <Badge variant="muted">Inactive</Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <form action={updateGalleryImageAction} className="space-y-3">
                  <input type="hidden" name="id" value={g.id} />
                  <div>
                    <Label htmlFor={`title-${g.id}`} className="text-xs">Title</Label>
                    <Input id={`title-${g.id}`} name="title" defaultValue={g.title ?? ""} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor={`desc-${g.id}`} className="text-xs">Description</Label>
                    <Input id={`desc-${g.id}`} name="description" defaultValue={g.description ?? ""} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor={`order-${g.id}`} className="text-xs">Sort order</Label>
                    <Input id={`order-${g.id}`} name="sortOrder" type="number" defaultValue={g.sortOrder} className="mt-1" />
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <SubmitButton size="sm" variant="outline">
                      <Save className="mr-1.5 h-3.5 w-3.5" /> Save
                    </SubmitButton>
                  </div>
                </form>
                <div className="mt-3 flex items-center justify-between gap-2 border-t pt-3">
                  <form action={toggleGalleryImageAction}>
                    <input type="hidden" name="id" value={g.id} />
                    <Button type="submit" variant="ghost" size="sm">
                      {g.isActive ? (
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
                  <form action={deleteGalleryImageAction}>
                    <input type="hidden" name="id" value={g.id} />
                    <Button type="submit" variant="ghost" size="sm" className="text-destructive">
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

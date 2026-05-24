import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubmitButton } from "@/components/dashboard/SubmitButton";
import { MediaGrid } from "./MediaGrid";
import { uploadMediaAction } from "./actions";

export default async function MediaLibraryPage() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <PageHeader
        title="Media Library"
        description="All uploaded images and documents. Hover a file to copy its URL or delete it."
      />

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload new file</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={uploadMediaAction} className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground">
                Image or PDF
              </label>
              <input
                type="file"
                name="file"
                accept="image/*,application/pdf"
                required
                className="mt-1.5 block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-navy-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-navy-800 hover:file:bg-navy-100"
              />
            </div>
            <SubmitButton>Upload</SubmitButton>
          </form>
        </CardContent>
      </Card>

      <MediaGrid items={media} />
    </>
  );
}

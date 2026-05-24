import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadField } from "@/components/dashboard/UploadField";
import { SubmitButton } from "@/components/dashboard/SubmitButton";
import { FileText, Trash2, Save } from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  createDocumentAction,
  deleteDocumentAction,
  updateDocumentAction,
} from "./actions";

export default async function DocumentsAdmin() {
  const docs = await prisma.document.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <PageHeader
        title="Documents"
        description="Manage investor PDF documents."
      />

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload new document</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createDocumentAction} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <UploadField name="file" label="PDF file *" variant="document" required />
            </div>
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input id="title" name="title" required className="mt-1.5" />
            </div>
            <div className="flex items-end gap-3 pb-1">
              <label className="flex items-center gap-3">
                <Switch name="isPrivate" defaultChecked />
                <span className="text-sm font-medium">Private (request required)</span>
              </label>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={3} className="mt-1.5" />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <SubmitButton>Upload document</SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>

      {docs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No documents yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {docs.map((d) => (
            <Card key={d.id}>
              <CardContent className="grid gap-5 p-5 md:grid-cols-[1fr_auto]">
                <form action={updateDocumentAction} className="space-y-4">
                  <input type="hidden" name="id" value={d.id} />
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-navy-700" />
                    <div className="flex-1">
                      <Input name="title" defaultValue={d.title} className="font-semibold" />
                    </div>
                    {d.isPrivate ? (
                      <Badge variant="warning">Private</Badge>
                    ) : (
                      <Badge variant="success">Public</Badge>
                    )}
                  </div>
                  <Textarea name="description" defaultValue={d.description ?? ""} rows={2} />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3">
                      <Switch name="isPrivate" defaultChecked={d.isPrivate} />
                      <span className="text-sm">Private (request required)</span>
                    </label>
                    <div className="text-xs text-muted-foreground">
                      Uploaded {formatDate(d.createdAt)}
                    </div>
                  </div>
                  <div>
                    <SubmitButton size="sm" variant="outline">
                      <Save className="mr-1.5 h-3.5 w-3.5" /> Save
                    </SubmitButton>
                  </div>
                </form>
                <div className="flex flex-col items-end justify-between gap-3">
                  <Button asChild variant="outline" size="sm">
                    <Link href={d.fileUrl} target="_blank" rel="noreferrer">
                      Open PDF
                    </Link>
                  </Button>
                  <form action={deleteDocumentAction}>
                    <input type="hidden" name="id" value={d.id} />
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

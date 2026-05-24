"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Copy, Trash2, FileText } from "lucide-react";
import { deleteMediaAction } from "./actions";
import { useRouter } from "next/navigation";

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size?: number | null;
}

export function MediaGrid({ items }: { items: MediaItem[] }) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No media uploaded yet. Use the form above to upload your first file.
      </p>
    );
  }

  const copy = (url: string) => {
    navigator.clipboard.writeText(url).then(
      () => toast.success("URL copied to clipboard"),
      () => toast.error("Could not copy to clipboard")
    );
  };

  const remove = (id: string, url: string) => {
    if (!confirm("Delete this file? This cannot be undone.")) return;
    const fd = new FormData();
    fd.set("id", id);
    fd.set("url", url);
    startTransition(async () => {
      try {
        await deleteMediaAction(fd);
        toast.success("File deleted");
        router.refresh();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to delete file";
        toast.error(msg);
      }
    });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => {
        const isImage = item.mimeType.startsWith("image/");
        const kb = item.size ? Math.round(item.size / 1024) : null;

        return (
          <div
            key={item.id}
            className="group overflow-hidden rounded-xl border bg-card shadow-sm"
          >
            <div className="relative aspect-[4/3] bg-muted">
              {isImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt={item.filename}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  <FileText className="h-10 w-10" />
                  <span className="text-xs uppercase tracking-wide">PDF</span>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="secondary"
                  title="Copy URL"
                  onClick={() => copy(item.url)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  title="Delete"
                  disabled={pending}
                  onClick={() => remove(item.id, item.url)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-3">
              <p
                className="truncate text-xs font-medium text-navy-900"
                title={item.filename}
              >
                {item.filename}
              </p>
              {kb !== null && (
                <p className="mt-0.5 text-xs text-muted-foreground">{kb} KB</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

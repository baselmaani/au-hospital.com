"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Images, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
}

interface Props {
  onSelect: (url: string) => void;
}

export function MediaPickerDialog({ onSelect }: Props) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<MediaItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data: MediaItem[] = await res.json();
      setItems(data.filter((i) => i.mimeType.startsWith("image/")));
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (v) {
      setSelected(null);
      load();
    }
  };

  const confirm = () => {
    if (selected) {
      onSelect(selected);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="shrink-0">
          <Images className="mr-2 h-4 w-4" />
          Choose from Library
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            No images in the media library yet. Upload files via the Media Library page first.
          </p>
        ) : (
          <>
            <div className="grid max-h-[55vh] grid-cols-3 gap-3 overflow-y-auto p-1 sm:grid-cols-4">
              {items.map((item) => {
                const isSelected = selected === item.url;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelected(item.url)}
                    className={cn(
                      "group relative aspect-square overflow-hidden rounded-lg border-2 bg-muted transition",
                      isSelected
                        ? "border-gold-500 ring-2 ring-gold-300"
                        : "border-transparent hover:border-navy-300"
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.filename}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <CheckCircle2 className="h-8 w-8 text-white drop-shadow" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 border-t pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="accent"
                disabled={!selected}
                onClick={confirm}
              >
                Use selected image
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

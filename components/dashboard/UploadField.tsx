"use client";

import * as React from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MediaPickerDialog } from "./MediaPickerDialog";

interface Props {
  name: string;
  label?: string;
  accept?: string;
  currentUrl?: string | null;
  variant?: "image" | "document";
  required?: boolean;
}

/**
 * Self-contained file input used inside <form> server actions.
 * Supports direct upload OR selecting from the media library.
 */
export function UploadField({
  name,
  label,
  accept,
  currentUrl,
  variant = "image",
  required,
}: Props) {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(currentUrl ?? null);
  const [cleared, setCleared] = React.useState(false);
  const [libraryUrl, setLibraryUrl] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!file) return;
    if (variant === "image") {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file, variant]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setLibraryUrl(null);
    setCleared(false);
  };

  const onLibrarySelect = (url: string) => {
    setLibraryUrl(url);
    setPreviewUrl(url);
    setFile(null);
    setCleared(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const clear = () => {
    setFile(null);
    setPreviewUrl(null);
    setLibraryUrl(null);
    setCleared(true);
    if (inputRef.current) inputRef.current.value = "";
  };

  const acceptValue =
    accept ?? (variant === "image" ? "image/*" : "application/pdf");

  return (
    <div className="space-y-2">
      {label ? (
        <label className="text-sm font-medium text-foreground">{label}</label>
      ) : null}

      {/* Hidden flags read by server actions */}
      <input type="hidden" name={`${name}__clear`} value={cleared ? "1" : "0"} />
      <input type="hidden" name={`${name}__libraryUrl`} value={libraryUrl ?? ""} />

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={acceptValue}
          onChange={onChange}
          required={required && !currentUrl && !libraryUrl}
          className="block text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-navy-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-navy-800 hover:file:bg-navy-100"
        />
        {variant === "image" && (
          <MediaPickerDialog onSelect={onLibrarySelect} />
        )}
      </div>

      {previewUrl ? (
        <div
          className={cn(
            "relative mt-2 inline-flex items-center gap-3 rounded-md border bg-muted/30 p-2",
            variant === "image" ? "p-0" : ""
          )}
        >
          {variant === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="preview"
              className="h-28 w-44 rounded-md object-cover"
            />
          ) : (
            <div className="flex items-center gap-2 px-3 py-2 text-sm">
              <Upload className="h-4 w-4 text-navy-700" />
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="text-navy-800 underline-offset-2 hover:underline"
              >
                Current file
              </a>
            </div>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clear}
            className={cn(
              variant === "image"
                ? "absolute right-1 top-1 h-7 w-7 bg-white/90"
                : "h-7 w-7"
            )}
            aria-label="Remove file"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}


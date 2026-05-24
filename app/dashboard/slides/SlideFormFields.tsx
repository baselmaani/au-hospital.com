import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { UploadField } from "@/components/dashboard/UploadField";

export interface SlideFormValues {
  title?: string | null;
  description?: string | null;
  fullDescription?: string | null;
  image?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  sortOrder?: number;
  isActive?: boolean;
}

export function SlideFormFields({ values }: { values?: SlideFormValues }) {
  return (
    <Card>
      <CardContent className="grid gap-5 p-6">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={values?.title ?? ""}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="description">Short description (shown on card)</Label>
          <Textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={values?.description ?? ""}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="fullDescription">Full description (shown on slide detail page)</Label>
          <Textarea
            id="fullDescription"
            name="fullDescription"
            rows={6}
            defaultValue={values?.fullDescription ?? ""}
            className="mt-1.5"
            placeholder="Detailed content shown when visitors click this slide card…"
          />
        </div>

        <UploadField
          name="image"
          label="Slide image"
          currentUrl={values?.image ?? null}
          variant="image"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="buttonLink">Custom link URL (optional)</Label>
            <p className="mb-1.5 text-xs text-muted-foreground">Override the auto-generated slide page link. Leave blank to use the default detail page.</p>
            <Input
              id="buttonLink"
              name="buttonLink"
              placeholder="https://… or /page"
              defaultValue={values?.buttonLink ?? ""}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="buttonText">Link label (optional)</Label>
            <p className="mb-1.5 text-xs text-muted-foreground">Short call-to-action shown on the card</p>
            <Input
              id="buttonText"
              name="buttonText"
              placeholder="e.g. Learn more"
              defaultValue={values?.buttonText ?? ""}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="sortOrder">Sort order</Label>
            <Input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={values?.sortOrder ?? 0}
              className="mt-1.5"
            />
          </div>
          <div className="flex items-end gap-3">
            <label className="flex items-center gap-3">
              <Switch name="isActive" defaultChecked={values?.isActive ?? true} />
              <span className="text-sm font-medium">Active</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

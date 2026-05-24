import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

export interface HighlightFormValues {
  title?: string | null;
  description?: string | null;
  icon?: string | null;
  sortOrder?: number;
  isActive?: boolean;
}

const SUGGESTED_ICONS = [
  "MapPin", "Building2", "Stethoscope", "TrendingUp", "Layers", "LineChart",
  "Shield", "HeartPulse", "Activity", "Briefcase", "Users", "Award",
];

export function HighlightFormFields({ values }: { values?: HighlightFormValues }) {
  return (
    <Card>
      <CardContent className="grid gap-5 p-6">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" required defaultValue={values?.title ?? ""} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={3} defaultValue={values?.description ?? ""} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="icon">Icon (lucide-react name)</Label>
          <Input
            id="icon"
            name="icon"
            list="icon-suggestions"
            placeholder="e.g. MapPin"
            defaultValue={values?.icon ?? "Sparkles"}
            className="mt-1.5"
          />
          <datalist id="icon-suggestions">
            {SUGGESTED_ICONS.map((i) => (
              <option key={i} value={i} />
            ))}
          </datalist>
          <p className="mt-1 text-xs text-muted-foreground">
            Browse names at lucide.dev/icons. Use PascalCase.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="sortOrder">Sort order</Label>
            <Input id="sortOrder" name="sortOrder" type="number" defaultValue={values?.sortOrder ?? 0} className="mt-1.5" />
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

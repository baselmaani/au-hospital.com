import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "success" | "warning" | "info" | "muted";

const variantClasses: Record<Variant, string> = {
  default: "bg-navy-100 text-navy-800 border-navy-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  info: "bg-sky-50 text-sky-700 border-sky-200",
  muted: "bg-muted text-muted-foreground border-border",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

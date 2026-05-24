"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "@/components/ui/button";

export function SubmitButton({
  children = "Save changes",
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? "Saving…" : children}
    </Button>
  );
}

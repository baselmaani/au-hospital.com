"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "./actions";

const schema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password too short"),
});

type Values = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/dashboard";
  const [pending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = (v: Values) => {
    startTransition(async () => {
      const res = await loginAction(v);
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success("Welcome back");
      router.replace(from);
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" {...register("email")} className="mt-1.5" />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" autoComplete="current-password" {...register("password")} className="mt-1.5" />
        {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

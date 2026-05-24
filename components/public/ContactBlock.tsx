"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DocumentsSection, type PublicDocumentMeta } from "./DocumentsSection";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
  requestedDocument: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  documentsTitle?: string | null;
  documentsDescription?: string | null;
  documentsBtnText?: string | null;
  publicDocuments: PublicDocumentMeta[];
  privateCount: number;
  contactEmail?: string | null;
  contactPhone?: string | null;
  whatsapp?: string | null;
}

export function ContactBlock({
  documentsTitle,
  documentsDescription,
  documentsBtnText,
  publicDocuments,
  privateCount,
  contactEmail,
  contactPhone,
  whatsapp,
}: Props) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}`
    : null;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onRequest = () => {
    setValue("message", "I would like to request the investor documents.");
    setValue("requestedDocument", "Full Investor Package");
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Submission failed");
      }
      toast.success("Thank you. Our project team will be in touch shortly.");
      reset();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Submission failed");
    }
  };

  return (
    <>
      <DocumentsSection
        title={documentsTitle}
        description={documentsDescription}
        buttonText={documentsBtnText}
        publicDocuments={publicDocuments}
        privateCount={privateCount}
        onRequest={onRequest}
      />

      <section id="contact" className="section bg-navy-50/60">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 className="mt-3 text-3xl font-semibold text-navy-900 md:text-4xl">
                Speak with the project team
              </h2>
              <p className="mt-5 text-muted-foreground">
                Share your details and a member of the project team will follow up to
                provide additional information about the investment opportunity.
              </p>

              <dl className="mt-8 space-y-4 text-sm">
                {contactEmail ? (
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                      Email
                    </dt>
                    <dd className="mt-1 text-navy-900">
                      <a href={`mailto:${contactEmail}`} className="hover:text-gold-700">
                        {contactEmail}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {contactPhone ? (
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                      Phone
                    </dt>
                    <dd className="mt-1 text-navy-900">
                      <a href={`tel:${contactPhone}`} className="hover:text-gold-700">
                        {contactPhone}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {whatsappHref ? (
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                      WhatsApp
                    </dt>
                    <dd className="mt-1 text-navy-900">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold-700"
                      >
                        {whatsapp}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border bg-white p-6 shadow-sm md:p-8"
              noValidate
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" {...register("name")} className="mt-1.5" />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" {...register("email")} className="mt-1.5" />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" {...register("phone")} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" {...register("company")} className="mt-1.5" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="requestedDocument">Requested Document (optional)</Label>
                  <Input
                    id="requestedDocument"
                    placeholder="e.g. Executive Summary, Financial Model"
                    {...register("requestedDocument")}
                    className="mt-1.5"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} {...register("message")} className="mt-1.5" />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                variant="accent"
                className="mt-6 w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending…" : "Submit Request"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

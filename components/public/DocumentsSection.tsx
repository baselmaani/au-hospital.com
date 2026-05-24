"use client";

import Link from "next/link";
import { FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PublicDocumentMeta {
  id: string;
  title: string;
  description?: string | null;
  fileUrl: string;
  isPrivate: boolean;
}

interface Props {
  title?: string | null;
  description?: string | null;
  buttonText?: string | null;
  publicDocuments: PublicDocumentMeta[];
  privateCount: number;
  onRequest: () => void;
}

export function DocumentsSection({
  title,
  description,
  buttonText,
  publicDocuments,
  privateCount,
  onRequest,
}: Props) {
  return (
    <section className="section bg-white">
      <div className="container-wide">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">Investor Documents</p>
            <h2 className="mt-3 text-3xl font-semibold text-navy-900 md:text-4xl">
              {title ?? "Detailed Documentation Available to Qualified Investors"}
            </h2>
            {description ? (
              <p className="mt-5 text-muted-foreground">{description}</p>
            ) : null}
            <Button
              variant="accent"
              size="lg"
              className="mt-7"
              onClick={onRequest}
            >
              {buttonText ?? "Request Investor Documents"}
            </Button>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-navy-800">
              Documentation Index
            </h3>
            <ul className="mt-5 divide-y divide-border">
              {publicDocuments.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-5 w-5 text-navy-700" />
                    <div>
                      <div className="font-medium text-navy-900">{d.title}</div>
                      {d.description ? (
                        <div className="text-sm text-muted-foreground">
                          {d.description}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={d.fileUrl} target="_blank" rel="noopener noreferrer">
                      View
                    </Link>
                  </Button>
                </li>
              ))}

              {privateCount > 0 && (
                <li className="flex items-center justify-between gap-4 py-4">
                  <div className="flex items-start gap-3">
                    <Lock className="mt-0.5 h-5 w-5 text-gold-600" />
                    <div>
                      <div className="font-medium text-navy-900">
                        {privateCount} additional confidential document
                        {privateCount === 1 ? "" : "s"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Available to qualified investors upon request.
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="accent" onClick={onRequest}>
                    Request
                  </Button>
                </li>
              )}

              {publicDocuments.length === 0 && privateCount === 0 && (
                <li className="py-4 text-sm text-muted-foreground">
                  Documents will be made available to investors during project briefings.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

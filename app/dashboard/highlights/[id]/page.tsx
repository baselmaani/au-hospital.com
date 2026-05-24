import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/dashboard/SubmitButton";
import { HighlightFormFields } from "../HighlightFormFields";
import { updateHighlightAction } from "../actions";

export default async function EditHighlightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const h = await prisma.highlight.findUnique({ where: { id } });
  if (!h) notFound();
  const action = updateHighlightAction.bind(null, h.id);
  return (
    <>
      <PageHeader
        title="Edit highlight"
        actions={
          <Button asChild variant="outline">
            <Link href="/dashboard/highlights">Back</Link>
          </Button>
        }
      />
      <form action={action} className="space-y-5">
        <HighlightFormFields values={h} />
        <div className="flex justify-end">
          <SubmitButton>Save changes</SubmitButton>
        </div>
      </form>
    </>
  );
}

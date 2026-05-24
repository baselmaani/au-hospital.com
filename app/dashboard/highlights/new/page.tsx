import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/dashboard/SubmitButton";
import { HighlightFormFields } from "../HighlightFormFields";
import { createHighlightAction } from "../actions";

export default function NewHighlightPage() {
  return (
    <>
      <PageHeader
        title="New highlight"
        actions={
          <Button asChild variant="outline">
            <Link href="/dashboard/highlights">Back</Link>
          </Button>
        }
      />
      <form action={createHighlightAction} className="space-y-5">
        <HighlightFormFields />
        <div className="flex justify-end">
          <SubmitButton>Create highlight</SubmitButton>
        </div>
      </form>
    </>
  );
}

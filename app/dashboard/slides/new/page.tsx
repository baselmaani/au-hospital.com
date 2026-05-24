import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/dashboard/SubmitButton";
import { SlideFormFields } from "../SlideFormFields";
import { createSlideAction } from "../actions";

export default function NewSlidePage() {
  return (
    <>
      <PageHeader
        title="New slide"
        actions={
          <Button asChild variant="outline">
            <Link href="/dashboard/slides">Back</Link>
          </Button>
        }
      />
      <form action={createSlideAction} className="space-y-5">
        <SlideFormFields />
        <div className="flex justify-end">
          <SubmitButton>Create slide</SubmitButton>
        </div>
      </form>
    </>
  );
}

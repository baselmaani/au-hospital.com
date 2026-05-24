import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/dashboard/SubmitButton";
import { SlideFormFields } from "../SlideFormFields";
import { updateSlideAction } from "../actions";

export default async function EditSlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slide = await prisma.slide.findUnique({ where: { id } });
  if (!slide) notFound();

  const action = updateSlideAction.bind(null, slide.id);

  return (
    <>
      <PageHeader
        title="Edit slide"
        actions={
          <Button asChild variant="outline">
            <Link href="/dashboard/slides">Back</Link>
          </Button>
        }
      />
      <form action={action} className="space-y-5">
        <SlideFormFields values={slide} />
        <div className="flex justify-end">
          <SubmitButton>Save changes</SubmitButton>
        </div>
      </form>
    </>
  );
}

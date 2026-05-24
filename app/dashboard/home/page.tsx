import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { UploadField } from "@/components/dashboard/UploadField";
import { SubmitButton } from "@/components/dashboard/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveHomePageAction } from "./actions";

export default async function HomePageAdmin() {
  const home = await prisma.homePage.findFirst({ orderBy: { createdAt: "asc" } });

  return (
    <>
      <PageHeader
        title="Home Page"
        description="Edit the main content blocks of the public homepage."
      />

      <form action={saveHomePageAction} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Hero text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <UploadField
              name="heroImage"
              label="Hero image (recommended: 2560×1440)"
              currentUrl={home?.heroImage ?? null}
              variant="image"
            />
            <Field label="Eyebrow text" name="heroEyebrow" defaultValue={home?.heroEyebrow ?? ""} />
            <Field label="Subtext (below eyebrow)" name="heroSubtext" defaultValue={home?.heroSubtext ?? ""} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intro section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field label="Eyebrow text" name="introEyebrow" defaultValue={home?.introEyebrow ?? ""} />
            <Field label="Main title" name="title" defaultValue={home?.title ?? ""} required />
            <Field label="Main description" name="description" defaultValue={home?.description ?? ""} multiline />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Primary button text" name="primaryBtnText" defaultValue={home?.primaryBtnText ?? ""} />
              <Field label="Primary button link" name="primaryBtnLink" defaultValue={home?.primaryBtnLink ?? ""} />
              <Field label="Secondary button text" name="secondaryBtnText" defaultValue={home?.secondaryBtnText ?? ""} />
              <Field label="Secondary button link" name="secondaryBtnLink" defaultValue={home?.secondaryBtnLink ?? ""} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Slider section headings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field label="Eyebrow text" name="sliderEyebrow" defaultValue={home?.sliderEyebrow ?? ""} />
            <Field label="Heading" name="sliderHeading" defaultValue={home?.sliderHeading ?? ""} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Highlights section headings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field label="Eyebrow text" name="highlightsEyebrow" defaultValue={home?.highlightsEyebrow ?? ""} />
            <Field label="Heading" name="highlightsHeading" defaultValue={home?.highlightsHeading ?? ""} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investment section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field label="Title" name="investmentTitle" defaultValue={home?.investmentTitle ?? ""} />
            <Field label="Description" name="investmentDescription" defaultValue={home?.investmentDescription ?? ""} multiline />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="CTA button text" name="investmentBtnText" defaultValue={home?.investmentBtnText ?? ""} />
              <Field label="CTA button link" name="investmentBtnLink" defaultValue={home?.investmentBtnLink ?? ""} />
            </div>
            <p className="text-sm font-medium text-muted-foreground pt-2">Stat boxes</p>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Stat 1 label" name="stat1Label" defaultValue={home?.stat1Label ?? ""} />
              <Field label="Stat 1 value" name="stat1Value" defaultValue={home?.stat1Value ?? ""} />
              <Field label="Stat 2 label" name="stat2Label" defaultValue={home?.stat2Label ?? ""} />
              <Field label="Stat 2 value" name="stat2Value" defaultValue={home?.stat2Value ?? ""} />
              <Field label="Stat 3 label" name="stat3Label" defaultValue={home?.stat3Label ?? ""} />
              <Field label="Stat 3 value" name="stat3Value" defaultValue={home?.stat3Value ?? ""} />
              <Field label="Stat 4 label" name="stat4Label" defaultValue={home?.stat4Label ?? ""} />
              <Field label="Stat 4 value" name="stat4Value" defaultValue={home?.stat4Value ?? ""} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gallery section headings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field label="Eyebrow text" name="galleryEyebrow" defaultValue={home?.galleryEyebrow ?? ""} />
            <Field label="Heading" name="galleryHeading" defaultValue={home?.galleryHeading ?? ""} />
            <Field label="Description" name="galleryDescription" defaultValue={home?.galleryDescription ?? ""} multiline />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field label="Title" name="documentsTitle" defaultValue={home?.documentsTitle ?? ""} />
            <Field label="Description" name="documentsDescription" defaultValue={home?.documentsDescription ?? ""} multiline />
            <Field label="Button text" name="documentsBtnText" defaultValue={home?.documentsBtnText ?? ""} />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <SubmitButton>Save home page</SubmitButton>
        </div>
      </form>
    </>
  );
}

function Field({
  label,
  name,
  defaultValue,
  multiline,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  multiline?: boolean;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      {multiline ? (
        <Textarea id={name} name={name} defaultValue={defaultValue} rows={4} className="mt-1.5" />
      ) : (
        <Input id={name} name={name} defaultValue={defaultValue} required={required} className="mt-1.5" />
      )}
    </div>
  );
}

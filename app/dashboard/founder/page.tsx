import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { UploadField } from "@/components/dashboard/UploadField";
import { SubmitButton } from "@/components/dashboard/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { saveFounderAction } from "./actions";

export default async function FounderPage() {
  const founder = await prisma.founder.findFirst({ orderBy: { createdAt: "asc" } });

  return (
    <>
      <PageHeader
        title="Founder / Project Visionary"
        description="Edit the founder section that appears on the homepage between the intro and the project slider."
      />

      <form action={saveFounderAction} className="space-y-6">
        {/* Visibility toggle */}
        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="font-medium text-navy-900">Show founder section</p>
              <p className="text-sm text-muted-foreground">
                Toggle off to hide this section from the public homepage.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="isActive"
                name="isActive"
                value="1"
                defaultChecked={founder?.isActive ?? true}
              />
              <Label htmlFor="isActive" className="sr-only">
                Show founder section
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Identity */}
        <Card>
          <CardHeader>
            <CardTitle>Founder identity</CardTitle>
            <CardDescription>
              Name, title and profile photo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field label="Full name" name="name" defaultValue={founder?.name ?? ""} required />
            <Field label="Title / role" name="title" defaultValue={founder?.title ?? ""} placeholder="e.g. Founder & Project Visionary" />
            <UploadField
              name="photo"
              label="Founder photo (square crop recommended)"
              currentUrl={founder?.photo ?? null}
              variant="image"
            />
          </CardContent>
        </Card>

        {/* Bio + message */}
        <Card>
          <CardHeader>
            <CardTitle>Bio & message</CardTitle>
            <CardDescription>
              Short bio appears below the photo. Message is the main quote/statement (supports paragraph breaks).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field
              label="Short bio"
              name="shortBio"
              defaultValue={founder?.shortBio ?? ""}
              multiline
              rows={3}
              placeholder="A brief paragraph about the founder's background and motivation."
            />
            <Field
              label="Founder message / vision statement"
              name="message"
              defaultValue={founder?.message ?? ""}
              multiline
              rows={6}
              placeholder="The founder's direct statement to investors. Separate paragraphs with a blank line."
            />
          </CardContent>
        </Card>

        {/* Signature */}
        <Card>
          <CardHeader>
            <CardTitle>Signature image</CardTitle>
            <CardDescription>
              Optional handwritten signature displayed beneath the message. Use a transparent PNG.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UploadField
              name="signatureImage"
              label="Signature image (transparent PNG recommended)"
              currentUrl={founder?.signatureImage ?? null}
              variant="image"
            />
          </CardContent>
        </Card>

        {/* CTA */}
        <Card>
          <CardHeader>
            <CardTitle>Call-to-action button</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Button text" name="buttonText" defaultValue={founder?.buttonText ?? ""} placeholder="Request a Private Meeting" />
              <Field label="Button link" name="buttonLink" defaultValue={founder?.buttonLink ?? ""} placeholder="#contact" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <SubmitButton>Save founder section</SubmitButton>
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
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  multiline?: boolean;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      {multiline ? (
        <Textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={rows}
          className="mt-1.5"
        />
      ) : (
        <Input
          id={name}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          className="mt-1.5"
        />
      )}
    </div>
  );
}

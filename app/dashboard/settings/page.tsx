import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadField } from "@/components/dashboard/UploadField";
import { SubmitButton } from "@/components/dashboard/SubmitButton";
import { saveSettingsAction } from "./actions";

export default async function SettingsAdmin() {
  const settings = await prisma.siteSettings.findFirst({
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      <PageHeader
        title="Settings"
        description="Project identity, contact details and footer content."
      />

      <form action={saveSettingsAction} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project identity</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="projectName">Project name *</Label>
              <Input
                id="projectName"
                name="projectName"
                required
                defaultValue={settings?.projectName ?? "AU Hospital"}
                className="mt-1.5"
              />
            </div>
            <div className="md:col-span-2">
              <UploadField
                name="logo"
                label="Logo (transparent PNG/SVG recommended)"
                currentUrl={settings?.logo ?? null}
                variant="image"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="contactEmail">Contact email</Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                defaultValue={settings?.contactEmail ?? ""}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Contact phone</Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                defaultValue={settings?.contactPhone ?? ""}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp number</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                defaultValue={settings?.whatsapp ?? ""}
                className="mt-1.5"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Footer</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="footerText">Footer text</Label>
            <Textarea
              id="footerText"
              name="footerText"
              rows={3}
              defaultValue={settings?.footerText ?? ""}
              className="mt-1.5"
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <SubmitButton>Save settings</SubmitButton>
        </div>
      </form>
    </>
  );
}

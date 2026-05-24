import "server-only";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface NewLeadParams {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message?: string | null;
  requestedDocument?: string | null;
}

export async function sendNewLeadNotification(lead: NewLeadParams) {
  if (!resend) return; // graceful no-op when key not set
  const notifyEmail = process.env.NOTIFY_EMAIL;
  if (!notifyEmail) return;

  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const lines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.company ? `Company: ${lead.company}` : null,
    lead.requestedDocument ? `Requested Document: ${lead.requestedDocument}` : null,
    lead.message ? `\nMessage:\n${lead.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await resend.emails.send({
    from,
    to: notifyEmail,
    subject: `New investor inquiry — ${lead.name}`,
    text: `A new contact form submission was received.\n\n${lines}\n\nView in dashboard: ${siteUrl}/dashboard/leads`,
    html: `
      <h2 style="font-family:sans-serif;color:#0f1f3d">New investor inquiry</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td><strong>${lead.name}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
        ${lead.phone ? `<tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td>${lead.phone}</td></tr>` : ""}
        ${lead.company ? `<tr><td style="padding:4px 12px 4px 0;color:#666">Company</td><td>${lead.company}</td></tr>` : ""}
        ${lead.requestedDocument ? `<tr><td style="padding:4px 12px 4px 0;color:#666">Requested</td><td>${lead.requestedDocument}</td></tr>` : ""}
      </table>
      ${lead.message ? `<h4 style="font-family:sans-serif;margin-top:16px">Message</h4><p style="font-family:sans-serif;color:#333">${lead.message.replace(/\n/g, "<br>")}</p>` : ""}
      <p style="margin-top:24px"><a href="${siteUrl}/dashboard/leads" style="background:#0f1f3d;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-family:sans-serif">View in Dashboard</a></p>
    `,
  });
}

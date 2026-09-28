import nodemailer from "nodemailer";
import { Resend } from "resend";

/**
 * One way to send mail, whatever is configured.
 *
 * 1. Strato (or any) SMTP when SMTP_USER + SMTP_PASS are set.
 *    Strato only lets you send as the mailbox you log in with, so MAIL_FROM
 *    must use that same address, e.g. "AIGA <aiga@brandhumanizing.com>".
 * 2. Resend when RESEND_API_KEY is set (needs a verified sending domain).
 * 3. Otherwise nothing is sent and the caller carries on: a missing mail
 *    setup must never break a form.
 */

export type MailResult = { sent: boolean; via: "smtp" | "resend" | "none"; error?: string };

type Mail = { to: string; subject: string; html: string; text?: string; replyTo?: string };

const FROM = process.env.MAIL_FROM || "AIGA <ferry@brandhumanizing.com>";

/**
 * True when an email can actually go out: SMTP, or Resend with a sender set on
 * purpose (Resend refuses the default sender, its domain isn't verified there).
 */
export function mailConfigured(): boolean {
  return Boolean(
    (process.env.SMTP_USER && process.env.SMTP_PASS) || (process.env.RESEND_API_KEY && process.env.MAIL_FROM)
  );
}

export async function sendMail(mail: Mail): Promise<MailResult> {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const port = Number(process.env.SMTP_PORT || 465);
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.strato.de",
        port,
        secure: port === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({ from: FROM, ...mail });
      return { sent: true, via: "smtp" };
    } catch (err) {
      console.error("SMTP send failed:", err);
      return { sent: false, via: "smtp", error: String(err) };
    }
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({ from: FROM, ...mail });
      if (error) return { sent: false, via: "resend", error: JSON.stringify(error) };
      return { sent: true, via: "resend" };
    } catch (err) {
      console.error("Resend send failed:", err);
      return { sent: false, via: "resend", error: String(err) };
    }
  }

  return { sent: false, via: "none", error: "No mail transport configured" };
}

/**
 * Optional email copy of lead alerts (comma-separated). Leads already reach the
 * team in Slack via the notify-new-submission function, so this is off unless set.
 */
export const TEAM_INBOX = process.env.LEADS_NOTIFY_TO || "";

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .slice(0, 2000)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Plain internal alert to the team: who, how to reach them, where from. */
export function teamAlertHtml(title: string, rows: [string, unknown][]): string {
  const body = rows
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6B6459;font-size:14px;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0;color:#23201D;font-size:15px">${escapeHtml(v)}</td></tr>`
    )
    .join("");
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">
<p style="font-size:18px;font-weight:bold;color:#23201D;margin:0 0 4px">${escapeHtml(title)}</p>
<p style="font-size:14px;color:#6B6459;margin:0 0 16px">Belbelofte: binnen één werkdag.</p>
<table cellpadding="0" cellspacing="0" border="0">${body}</table></div>`;
}

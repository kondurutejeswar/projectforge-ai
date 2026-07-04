/**
 * ─────────────────────────────────────────────────────────────
 *  EMAILJS SETUP (no backend required)
 *  1. Create a free account at https://www.emailjs.com
 *  2. Add an Email Service (Gmail/Outlook) and note the Service ID
 *  3. Create an Email Template with variables matching the keys
 *     sent below (from_name, college, project_title, email,
 *     whatsapp, message) and note the Template ID
 *  4. Copy your Public Key from Account > API Keys
 *  5. Put all three values in .env.local (see .env.local.example)
 *
 *  This runs client-side only — no server or API route needed.
 *  If you prefer a server-side email (e.g. via Resend/Nodemailer),
 *  swap the body of sendInquiryEmail for a fetch() to your own
 *  /api/send-inquiry route instead.
 * ─────────────────────────────────────────────────────────────
 */

export interface InquiryEmailParams {
  from_name: string;
  college: string;
  project_title: string;
  email: string;
  whatsapp: string;
  message: string;
}

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '';

export const isEmailJsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export async function sendInquiryEmail(params: InquiryEmailParams) {
  if (!isEmailJsConfigured) {
    console.warn('EmailJS not configured — skipping email notification:', params);
    return { ok: false, skipped: true };
  }

  // Loaded lazily so the package is only pulled in when actually configured.
  const emailjs = (await import('@emailjs/browser')).default;

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...params }, { publicKey: PUBLIC_KEY });
    return { ok: true, skipped: false };
  } catch (err) {
    console.error('EmailJS send failed:', err);
    return { ok: false, skipped: false, error: err };
  }
}

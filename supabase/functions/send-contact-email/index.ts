import { Resend } from "npm:resend@4.0.0";
import { z } from "npm:zod@3.23.8";
import { corsHeaders, esc, json, oneLine, readJson, tooMany } from "../_shared/security.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const Schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(120).optional().default(""),
  projectType: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(1).max(3000),
  website: z.string().max(0).optional(), // honeypot: must stay empty
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ success: false, error: "Method not allowed" }, 405);
  if (tooMany(req)) return json({ success: false, error: "Too many messages, please wait a minute." }, 429);

  try {
    const parsed = Schema.safeParse(await readJson(req));
    if (!parsed.success) return json({ success: false, error: "Please check the form fields." }, 400);
    const { name, email, company, projectType, message } = parsed.data;

    const { error } = await resend.emails.send({
      from: "Sura Automations <onboarding@resend.dev>",
      to: ["infosuraautomations@gmail.com"],
      replyTo: email,
      subject: `New enquiry from ${oneLine(name)}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;padding:20px">
        <h2 style="color:#2d5a47">New website enquiry</h2>
        <p><b>Name:</b> ${esc(name)}</p>
        <p><b>Email:</b> ${esc(email)}</p>
        ${company ? `<p><b>Business:</b> ${esc(company)}</p>` : ""}
        ${projectType ? `<p><b>Project:</b> ${esc(projectType)}</p>` : ""}
        <p style="white-space:pre-wrap;background:#f4efe6;padding:14px;border-radius:8px">${esc(message)}</p>
      </div>`,
    });
    if (error) {
      console.error("Resend error:", error);
      return json({ success: false, error: "Email service failed" }, 502);
    }
    return json({ success: true });
  } catch (e) {
    console.error("contact error:", e);
    return json({ success: false, error: "Invalid request" }, 400);
  }
});

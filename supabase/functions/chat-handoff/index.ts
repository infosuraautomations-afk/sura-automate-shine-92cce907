import { Resend } from "npm:resend@4.0.0";
import { z } from "npm:zod@3.23.8";
import { corsHeaders, esc, json, oneLine, readJson, tooMany } from "../_shared/security.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const Schema = z.object({
  name: z.string().trim().min(1).max(100),
  contact: z.string().trim().min(5).max(150), // email or phone/WhatsApp number
  note: z.string().trim().max(1500).optional().default(""),
  transcript: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(4000) }))
    .max(40)
    .default([]),
  website: z.string().max(0).optional(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ success: false, error: "Method not allowed" }, 405);
  if (tooMany(req, 3)) return json({ success: false, error: "Please wait a minute before sending again." }, 429);

  try {
    const parsed = Schema.safeParse(await readJson(req, 60_000));
    if (!parsed.success) return json({ success: false, error: "Please add your name and an email or WhatsApp number." }, 400);
    const { name, contact, note, transcript } = parsed.data;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

    const rows = transcript
      .map((m) => `<p style="margin:6px 0"><b>${m.role === "user" ? "Visitor" : "Assistant"}:</b> <span style="white-space:pre-wrap">${esc(m.content)}</span></p>`)
      .join("");

    const { error } = await resend.emails.send({
      from: "Sura Automations <onboarding@resend.dev>",
      to: ["infosuraautomations@gmail.com"],
      replyTo: isEmail ? contact : undefined,
      subject: `Chat message from ${oneLine(name)}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;padding:20px">
        <h2 style="color:#2d5a47">Someone wants to talk to you</h2>
        <p><b>Name:</b> ${esc(name)}</p>
        <p><b>${isEmail ? "Email" : "Phone / WhatsApp"}:</b> ${esc(contact)}</p>
        ${note ? `<p style="white-space:pre-wrap;background:#f4efe6;padding:14px;border-radius:8px">${esc(note)}</p>` : ""}
        ${rows ? `<h3>Chat so far</h3>${rows}` : ""}
      </div>`,
    });
    if (error) {
      console.error("Resend error:", error);
      return json({ success: false, error: "Email service failed" }, 502);
    }
    return json({ success: true });
  } catch (e) {
    console.error("handoff error:", e);
    return json({ success: false, error: "Invalid request" }, 400);
  }
});

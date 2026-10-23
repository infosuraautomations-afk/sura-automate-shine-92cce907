import { Resend } from "npm:resend@4.0.0";
import { z } from "npm:zod@3.23.8";
import { corsHeaders, esc, json, oneLine, readJson, tooMany } from "../_shared/security.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const Schema = z.object({
  name: z.string().trim().min(1).max(100),
  role: z.string().trim().max(120).optional().default(""),
  email: z.union([z.string().trim().email().max(255), z.literal("")]).optional().default(""),
  rating: z.coerce.number().int().min(1).max(5),
  message: z.string().trim().min(1).max(1000),
  website: z.string().max(0).optional(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ success: false, error: "Method not allowed" }, 405);
  if (tooMany(req, 3)) return json({ success: false, error: "Too many reviews, please wait a minute." }, 429);

  try {
    const parsed = Schema.safeParse(await readJson(req));
    if (!parsed.success) return json({ success: false, error: "Please check the form fields." }, 400);
    const { name, role, email, rating, message } = parsed.data;
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

    const { error } = await resend.emails.send({
      from: "Sura Automations <onboarding@resend.dev>",
      to: ["infosuraautomations@gmail.com"],
      replyTo: email || undefined,
      subject: `New review (${rating}★) from ${oneLine(name)}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;padding:20px">
        <h2 style="color:#2d5a47">New customer review</h2>
        <div style="font-size:22px;color:#c0703a">${stars}</div>
        <p><b>Name:</b> ${esc(name)}</p>
        ${role ? `<p><b>Role:</b> ${esc(role)}</p>` : ""}
        ${email ? `<p><b>Email:</b> ${esc(email)}</p>` : ""}
        <p style="white-space:pre-wrap;background:#f4efe6;padding:14px;border-radius:8px">${esc(message)}</p>
      </div>`,
    });
    if (error) {
      console.error("Resend error:", error);
      return json({ success: false, error: "Email service failed" }, 502);
    }
    return json({ success: true });
  } catch (e) {
    console.error("review error:", e);
    return json({ success: false, error: "Invalid request" }, 400);
  }
});

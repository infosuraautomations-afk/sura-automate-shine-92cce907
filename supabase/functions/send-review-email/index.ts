import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReviewEmailRequest {
  name: string;
  role?: string;
  email?: string;
  rating: number;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, role, email, rating, message }: ReviewEmailRequest = await req.json();

    // Basic validation
    if (!name || !message || !rating) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (name.length > 100 || message.length > 1000) {
      return new Response(
        JSON.stringify({ success: false, error: "Input too long" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    const safeRating = Math.max(1, Math.min(5, Number(rating) || 0));

    const stars = "★".repeat(safeRating) + "☆".repeat(5 - safeRating);

    console.log("Sending review email from:", name);

    const emailResponse = await resend.emails.send({
      from: "Sura Automations <onboarding@resend.dev>",
      to: ["infosuraautomations@gmail.com"],
      replyTo: email || undefined,
      subject: `New Review (${safeRating}★) from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-bottom: 20px; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">
              New Customer Review
            </h2>

            <div style="font-size: 24px; color: #f59e0b; margin-bottom: 16px;">${stars}</div>

            <div style="margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong style="color: #374151;">Name:</strong> <span style="color: #6b7280;">${name}</span></p>
              ${role ? `<p style="margin: 5px 0;"><strong style="color: #374151;">Role:</strong> <span style="color: #6b7280;">${role}</span></p>` : ""}
              ${email ? `<p style="margin: 5px 0;"><strong style="color: #374151;">Email:</strong> <span style="color: #2563eb;">${email}</span></p>` : ""}
              <p style="margin: 5px 0;"><strong style="color: #374151;">Rating:</strong> <span style="color: #6b7280;">${safeRating} / 5</span></p>
            </div>

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; border-left: 4px solid #2563eb;">
              <h3 style="color: #374151; margin-top: 0;">Review:</h3>
              <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px;">
                Submitted via the Sura Automations website review form.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Review email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending review email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);

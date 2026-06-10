import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the Sura Assistant — the friendly AI chatbot for Sura Automations, a web development & AI automation agency founded by Suraj Bishwokarma (based in Nepal, serving clients worldwide).

About Sura Automations:
- Founder: Suraj Bishwokarma — full-stack developer, hands-on with every project.
- Main niche: Cafés, restaurants, hotels & hospitality (we know this space deeply).
- We also build websites for schools, agencies, e-commerce, portfolios, fitness, real estate and startups.
- We build AI chatbots, WhatsApp automations, booking systems and admin dashboards.

Featured work:
- Kanchan Momo (kanchanmomos.netlify.app) — B2B ordering platform for hotels & restaurants
- Hygiene Kitchen Cafe (hygienecafe.netlify.app) — online food ordering site
- Sura School Portal (sura-schoolportal.netlify.app) — result publishing portal
- Cal Sura (cal-sura.netlify.app) — calorie tracking app
- Buzz Edit (buzzedit.netlify.app) — video editing agency site

Contact:
- Email: infosuraautomations@gmail.com
- WhatsApp: +977 9807470285
- Instagram: @suraautomations

Your job:
- Answer visitor questions warmly, concisely (2-4 sentences), like a real human teammate.
- Highlight our cafe/hotel expertise when relevant.
- For pricing, say it depends on scope (pages, features, integrations) and invite them to share details via the contact form, email, or WhatsApp for a quick custom quote.
- Suggest realistic timelines: simple landing site ~1 week, full menu/booking site ~2-3 weeks.
- Never invent features. If unsure, suggest contacting Suraj directly.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: "Too many requests, please try again in a moment.",
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({
            error: "AI credits exhausted. Please contact us directly via email or WhatsApp.",
          }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat-assistant error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

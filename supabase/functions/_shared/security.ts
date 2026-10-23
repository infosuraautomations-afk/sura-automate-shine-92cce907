import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

export { corsHeaders };

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-store",
    },
  });

/** Escape user text before putting it into email HTML. */
export const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Strip control chars / newlines so text is safe for email subjects. */
export const oneLine = (v: string, max = 80) =>
  v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);

/** Basic per-instance throttle against spam bursts (best effort). */
const hits = new Map<string, number[]>();
export const tooMany = (req: Request, limit = 5, windowMs = 60_000) => {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > limit;
};

/** Read JSON safely with a size cap. */
export const readJson = async (req: Request, maxBytes = 20_000) => {
  const text = await req.text();
  if (text.length > maxBytes) throw new Error("too_large");
  return JSON.parse(text);
};

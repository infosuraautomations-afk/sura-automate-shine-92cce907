import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Only public, indexable routes; no timestamp without a page-specific source.
const baseUrl = "https://sura-automation.lovable.app";
const entries = ["/"];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((path) => `  <url><loc>${baseUrl}${path}</loc></url>`).join("\n")}
</urlset>
`;
writeFileSync(resolve("public/sitemap.xml"), xml);
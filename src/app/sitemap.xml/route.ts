import { NextResponse } from "next/server";

const locales = ["en", "es"];

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://npcstudio.xyz";

  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
      <url>
        <loc>${baseUrl}/</loc>
        ${locales
          .map(
            (locale) => `
          <xhtml:link rel="alternate" hreflang="${locale}" href="${baseUrl}/${locale}/" />
          `
          )
          .join("")}
        <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/"  />
      </url>

      <url>
        <loc>${baseUrl}/agent-index/</loc>
        ${locales
          .map(
            (locale) => `
          <xhtml:link rel="alternate" hreflang="${locale}" href="${baseUrl}/${locale}/agent-index/" />
          `
          )
          .join("")}
        <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/agent-index/"  />
      </url>

     
    </urlset>`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

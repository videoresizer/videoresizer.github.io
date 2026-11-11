import type { APIRoute } from 'astro';
import { LOCALE_LIST, getLocalePath } from '../i18n/ui';

export const prerender = true;

const SITE_ORIGIN = 'https://videoresizer.github.io';

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split('T')[0];

  const xhtmlLinks = [
    ...LOCALE_LIST.map(
      (code) =>
        `    <xhtml:link rel="alternate" hreflang="${code}" href="${SITE_ORIGIN}${getLocalePath(code)}" />`
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/" />`,
  ].join('\n');

  const urlEntries = LOCALE_LIST.map((code) => {
    const loc = `${SITE_ORIGIN}${getLocalePath(code)}`;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      '    <changefreq>weekly</changefreq>',
      '    <priority>1.0</priority>',
      xhtmlLinks,
      '  </url>',
    ].join('\n');
  }).join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urlEntries,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

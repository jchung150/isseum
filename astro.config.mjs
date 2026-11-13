// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
// Single source for the flag — keeps the sitemap in step with the nav, footer
// and noindex meta instead of duplicating the decision here.
import { showEventsPage } from './src/config/site.ts';
import { existsSync } from 'node:fs';
import { mkdir, rename, rmdir } from 'node:fs/promises';

/**
 * Cloudflare's `not_found_handling: "404-page"` serves the nearest `404.html`
 * up the path, so a miss under /en/ can get the English page. Astro only emits
 * the root 404 as a file; with `format: 'directory'` /en/404 lands at
 * en/404/index.html. Move it to en/404.html after the build.
 */
/** @type {import('astro').AstroIntegration} */
const localized404 = {
  name: 'localized-404',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const from = new URL('en/404/index.html', dir);
      if (!existsSync(from)) return;
      await mkdir(new URL('en/', dir), { recursive: true });
      await rename(from, new URL('en/404.html', dir));
      await rmdir(new URL('en/404/', dir));
    },
  },
};

// https://astro.build/config
export default defineConfig({
  // Canonical origin. Feeds canonical <link>, Open Graph URLs, JSON-LD and the
  // sitemap — if this is wrong, search engines index the wrong host.
  // www is the canonical host; isseum.com must 301 to it at the CDN.
  site: 'https://www.isseum.com',
  // Stays static: every content page is prerendered. Only the booking endpoint
  // opts out via `export const prerender = false`, so the site keeps shipping
  // plain HTML from the edge and one route runs on demand.
  output: 'static',
  // Nothing on this site uses sessions. Left on, the adapter provisions a
  // SESSION KV namespace and bundles the session runtime into the Worker.
  session: false,
  adapter: cloudflare({
    // Keep optimising images with sharp at build time. The adapter otherwise
    // switches to the runtime Cloudflare Images binding, which turns every
    // photo into an on-request transform — billable, slower, and pointless
    // when every page carrying an image is prerendered anyway.
    imageService: 'compile',
  }),
  // Pinned rather than 'ignore': /rules and /rules/ resolving separately would
  // create duplicate URLs for crawlers.
  trailingSlash: 'never',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [
    localized404,
    sitemap({
      // /events is hidden until there is real photography. 404 pages (one per
      // language) are not content.
      filter: (page) => !/\/404\/?$/.test(page) && (showEventsPage || !page.includes('/events')),
    }),
  ],
  image: {
    // Venue photography is the bulk of this site's payload.
    responsiveStyles: true,
    layout: 'constrained',
  },
});

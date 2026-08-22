// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
// Single source for the flag — keeps the sitemap in step with the nav, footer
// and noindex meta instead of duplicating the decision here.
import { showEventsPage } from './src/config/site.ts';

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
    sitemap({
      // /booking is noindex (it's a form, not content), and /events is hidden
      // until there is real photography. Everything else lives on one page.
      filter: (page) =>
        !page.includes('/booking') && (showEventsPage || !page.includes('/events')),
    }),
  ],
  image: {
    // Venue photography is the bulk of this site's payload.
    responsiveStyles: true,
    layout: 'constrained',
  },
});

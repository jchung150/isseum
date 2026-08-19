// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
// Single source for the flag — keeps the sitemap in step with the nav, footer
// and noindex meta instead of duplicating the decision here.
import { showEventsPage } from './src/config/site.ts';

// https://astro.build/config
export default defineConfig({
  // Canonical origin. Feeds canonical <link>, Open Graph URLs, JSON-LD and the
  // sitemap — if this is wrong, search engines index the wrong host.
  // www is the canonical host; isseum.com must 301 to it at the CDN.
  site: 'https://www.isseum.com',
  output: 'static',
  // Pinned rather than 'ignore': /rules and /rules/ resolving separately would
  // create duplicate URLs for crawlers.
  trailingSlash: 'never',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      filter: (page) => showEventsPage || !page.includes('/events'),
    }),
  ],
  image: {
    // Venue photography is the bulk of this site's payload.
    responsiveStyles: true,
    layout: 'constrained',
  },
});

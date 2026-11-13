// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
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
  // Plain static output. The one on-demand route (/api/booking) is gone, so
  // there is no adapter: the build is HTML and assets in ./dist, and images
  // are optimised with sharp at build time (Astro's default).
  output: 'static',
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
      // 404 pages (one per language) are not content.
      filter: (page) => !/\/404\/?$/.test(page),
    }),
  ],
  image: {
    // Venue photography is the bulk of this site's payload.
    responsiveStyles: true,
    layout: 'constrained',
  },
});

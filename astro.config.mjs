// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://isseum.space',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // Venue photography is the bulk of this site's payload.
    responsiveStyles: true,
    layout: 'constrained',
  },
});

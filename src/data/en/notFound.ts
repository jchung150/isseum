/** 404 copy in English. Same shape as ko/notFound.ts. */

import type { NotFound } from '../types';

export const notFound: NotFound = {
  title: 'Page not found',
  description: 'The page you requested could not be found.',
  eyebrow: '404 — NOT FOUND',
  heading: 'We couldn’t find that page',
  lead: 'The address may have changed or the page may no longer exist. Try one of these instead.',
  home: 'Go to home',
  linksLabel: 'Main pages',
  links: [
    { label: 'The space', path: '/#space' },
    { label: 'How to book', path: '/#process' },
    { label: 'FAQ', path: '/#faq' },
    { label: 'Rental terms', path: '/rules' },
  ],
};

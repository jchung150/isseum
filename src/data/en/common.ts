/**
 * Shared English copy. Same shape as ko/common.ts (types.ts → Common).
 *
 * Translated from the Korean. Facts come from facts.ts and config/site.ts, never
 * restated. The romanised name and address were confirmed by the owner (2026-11-12).
 */

import type { Common } from '../types';

export const common: Common = {
  site: {
    name: 'ISSEUM',
    description:
      'A flexible event space of about 198㎡ near Hongik Univ. Station in Seoul, for workshops, book talks, pop-up stores, fan meetings and every other kind of gathering.',
    tagline: 'Event space rental in Hongdae, Seoul',
  },
  skipLink: 'Skip to content',
  header: {
    homeLabel: 'ISSEUM home',
    navLabel: 'Main menu',
    menu: { space: 'The space', process: 'How to book', faq: 'FAQ' },
    program: { label: 'Programs', soon: 'Coming soon' },
    inquire: 'Inquire',
    langSwitch: { label: 'KOR', aria: '한국어 페이지' },
  },
  notice: {
    region: 'Notice',
    text: 'Welcome to ISSEUM.',
    link: 'Inquire →',
    close: 'Close notice',
  },
  channels: {
    naverTalk: 'Naver TalkTalk',
    kakao: 'KakaoTalk',
    newWindow: '(opens in a new window)',
  },
  footer: {
    heading: { hand: 'Every kind of story,', rest: 'told your way, right here' },
    cards: {
      naverTalk: { label: 'NAVER TALK', value: 'Naver TalkTalk →' },
      kakao: { label: 'KAKAOTALK', value: 'KakaoTalk channel →' },
      phone: 'PHONE',
      email: 'EMAIL',
    },
    business: {
      company: { term: 'Company', value: 'YOUNGJUN PMC' },
      representative: { term: 'Representative', value: 'YONG CHUL, CHUNG' },
      address: { term: 'Address', value: 'B1, 22 World Cup buk-ro, Mapo-gu, Seoul, Korea' },
      registration: { term: 'Business reg. no.' },
    },
  },
};

/** Site-wide constants ported from the `data-props` and `renderVals()` of design/*.dc.html. */

export const site = {
  name: '이씀',
  nameLatin: 'ISSEUM',
  tagline: 'PRIVATE MULTI CULTURE SPACE',
  description:
    '홍대입구역 인근 동교동에 위치한 약 68평 규모의 가변형 복합문화공간. 워크숍, 북토크, 팝업스토어, 팬미팅 등 모든 형태의 행사를 지원합니다.',
  locale: 'ko_KR',
  lang: 'ko',
} as const;

/**
 * 대관 예약 신청서. Single source for every booking CTA on the site.
 * Self-hosted since the Google Form required visitors to sign in to Google,
 * which lost most of them at the door.
 */
export const bookingUrl = '/booking';

/**
 * Cloudflare Turnstile site key. Public by design — it is visible in the HTML.
 * The matching secret is a Worker secret (TURNSTILE_SECRET) and must never be
 * committed here.
 *
 * The real key is bound to isseum.com / www.isseum.com / *.workers.dev and so
 * cannot work on localhost; dev falls back to Cloudflare's published test key,
 * which passes on any host.
 */
export const turnstileSiteKey = import.meta.env.DEV
  ? '1x00000000000000000000AA'
  : '0x4AAAAAAEWoGEkb4C3IUaVj';

export const business = {
  companyName: '영준피엠씨(YOUNGJUN PMC)',
  representative: '정용철',
  address: '서울특별시 마포구 월드컵북로 22, 지하 1층',
  phone: '010-6899-4417',
  email: 'isseumspace@gmail.com',
  registrationNumber: '105-04-11192',
} as const;

/** 네이버 지도 공유 링크. The footer map is a static image that opens this. */
export const naverMapUrl = 'https://naver.me/xuFnrHaN';

export const socialLinks = [
  { label: '인스타그램', href: '#', glyph: 'square' },
  { label: '네이버 블로그', href: '#', glyph: 'circle' },
] as const;


export type NavItem = {
  label: string;
  href: string;
  /** Matched against Astro.url.pathname to set the active state. */
  match: string;
};

/**
 * 지난 행사 page — off until there is real event photography (all 23 gallery
 * tiles are still placeholder hatches).
 *
 * While false the page is still BUILT, so you can review it at /events, but it
 * is unlinked from the nav and footer, dropped from the Rules page CTA, marked
 * noindex and excluded from the sitemap. Nobody can stumble onto a
 * half-finished archive, and search engines won't cache one.
 *
 * Flip to true to reopen — every one of those follows automatically.
 */
export const showEventsPage = false;

const allNav: NavItem[] = [
  { label: '공간 소개', href: '/', match: '/' },
  { label: '보유 장비', href: '/equipment', match: '/equipment' },
  { label: '대관 규정', href: '/rules', match: '/rules' },
  { label: '지난 행사', href: '/events', match: '/events' },
];

export const nav: NavItem[] = allNav.filter(
  (item) => showEventsPage || item.href !== '/events'
);

const allFooterLinks = [
  { label: '보유 장비 안내', href: '/equipment', external: false },
  { label: '대관 규정 및 이용 안내', href: '/rules', external: false },
  { label: '지난 행사 아카이브', href: '/events', external: false },
  { label: '대관 예약하기', href: bookingUrl, external: false },
];

export const footerLinks = allFooterLinks.filter(
  (link) => showEventsPage || link.href !== '/events'
);

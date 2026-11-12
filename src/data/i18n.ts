/**
 * 언어. 한국어가 기본이라 주소에 접두어가 없고(`/`), 영어는 `/en` 아래에 둔다.
 *
 * 언어 전환을 자바스크립트로 문구만 바꾸는 방식으로 하지 않은 이유는 검색이다.
 * 네이버와 구글은 정적 HTML을 읽으므로 언어마다 따로 색인되는 주소가 있어야 하고,
 * 두 주소는 BaseLayout의 hreflang으로 서로를 가리킨다.
 */

export const LANGS = ['ko', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const langMeta: Record<Lang, { html: string; ogLocale: string }> = {
  ko: { html: 'ko', ogLocale: 'ko_KR' },
  en: { html: 'en', ogLocale: 'en_US' },
};

/** 같은 페이지의 언어별 주소. `localePath('en', '/rules')` → `/en/rules`. */
export const localePath = (lang: Lang, path = '/') =>
  lang === 'ko' ? path : path === '/' ? '/en' : `/en${path}`;

/** 숫자에 천 단위 쉼표. 요금 표기에 쓴다. */
export const grouped = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/** 08 → '08' — 시간 표기용. */
export const pad2 = (n: number) => String(n).padStart(2, '0');

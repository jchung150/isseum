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

/** 대관 예약 신청서 (Google Form). Single source for every booking CTA on the site. */
export const bookingUrl = 'https://forms.gle/HCXGP9p7tJiJYrMX8';

export const business = {
  companyName: '영준피엠씨(YOUNGJUN PMC)',
  representative: '정용철',
  address: '서울특별시 마포구 월드컵북로 22, 지하 1층',
  phone: '010-6899-4417',
  email: 'isseumspace@gmail.com',
  registrationNumber: '105-04-11192',
} as const;

export const socialLinks = [
  { label: '인스타그램', href: '#', glyph: 'square' },
  { label: '네이버 블로그', href: '#', glyph: 'circle' },
] as const;

export const mapLinks = [
  { label: '네이버 지도', href: '#' },
  { label: '카카오맵', href: '#' },
] as const;

export type NavItem = {
  label: string;
  href: string;
  /** Matched against Astro.url.pathname to set the active state. */
  match: string;
};

export const nav: NavItem[] = [
  { label: '공간 소개', href: '/', match: '/' },
  { label: '보유 장비', href: '/equipment', match: '/equipment' },
  { label: '대관 규정', href: '/rules', match: '/rules' },
  { label: '지난 행사', href: '/events', match: '/events' },
];

export const footerLinks = [
  { label: '보유 장비 안내', href: '/equipment', external: false },
  { label: '대관 규정 및 이용 안내', href: '/rules', external: false },
  { label: '지난 행사 아카이브', href: '/events', external: false },
  { label: '대관 예약하기', href: bookingUrl, external: true },
] as const;

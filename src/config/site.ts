import { bookingCta, inquiryCta } from '../data/cta';

/*
 * 언어와 무관한 설정: 외부 링크, 사업자 정보, 키, 플래그. 화면에 보이는 문장은
 * src/data/(ko|en)/에 있다. 이름 · 설명 · 메뉴는 2026-11 리브랜딩 때 그리로 옮겼다.
 */

/**
 * 네이버 예약. Single source for every booking CTA on the site.
 *
 * Bookings moved here from the self-hosted /booking form so there is one
 * calendar. It is the booking page itself, not the place listing, so visitors
 * land on the calendar instead of having to find the 예약 tab.
 */
export const bookingUrl = 'https://booking.naver.com/booking/10/bizes/1734060';

/**
 * 네이버 톡톡. 예약 전 일정 문의를 받는 곳이고, 네이버 플레이스의 톡톡 버튼과 같은
 * 채널이다. 대화창으로 바로 연다 — 프로필 주소(`/profile/wxgdt7v`)는 채널 소개가
 * 먼저 열려 한 번 더 눌러야 한다.
 */
export const naverTalkUrl = 'https://talk.naver.com/ct/wxgdt7v';

/**
 * 카카오톡 채널 "이씀 복합문화공간". 톡톡처럼 대화창으로 바로 연다 — `/chat`을 떼면
 * 채널 소개(https://pf.kakao.com/_ZGxomX)가 먼저 열린다. null로 두면 대관 절차
 * 1단계와 푸터에서 카카오톡이 빠지고, 1단계 문구도 톡톡만 부른다.
 */
export const kakaoChannelUrl: string | null = 'https://pf.kakao.com/_ZGxomX/chat';

export const inquiryChannels = [
  { name: inquiryCta.channels.naverTalk, href: naverTalkUrl },
  ...(kakaoChannelUrl ? [{ name: inquiryCta.channels.kakao, href: kakaoChannelUrl }] : []),
];

/** 문장 안에서 채널을 부를 때 쓴다. 카카오톡을 끄면 문구에서도 함께 빠진다. */
export const inquiryChannelNames = inquiryChannels.map((channel) => channel.name).join(', ');

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

/**
 * 네이버 서치어드바이저 소유확인 토큰. Public by design — it ships in the HTML.
 *
 * HTML-tag verification rather than the file upload: Cloudflare's
 * `html_handling: "drop-trailing-slash"` 307s `/naverXXXX.html` to the
 * extensionless path, so the file method depends on Yeti following a redirect.
 */
export const naverSiteVerification = '0d865f9446089a0f3e0d0c314d6976e29c814b0a';

export const business = {
  companyName: '영준피엠씨(YOUNGJUN PMC)',
  representative: '정용철',
  address: '서울특별시 마포구 월드컵북로 22, 지하 1층',
  phone: '010-6899-4417',
  email: 'hello@isseum.com',
  registrationNumber: '105-04-11192',
} as const;

/** 네이버 지도 공유 링크. 구조화 데이터(BaseLayout의 hasMap)만 쓴다. */
export const naverMapUrl = 'https://naver.me/xRgs5iMX';


/**
 * 지난 행사 page — off until there is real event photography. The page still
 * builds (reviewable at /events) but is unlinked, noindexed and out of the
 * sitemap. astro.config.mjs imports this same flag for the sitemap filter.
 */
export const showEventsPage = false;

/*
 * 푸터의 '주요 안내' 링크 목록은 삭제됐다. 이용 안내 매뉴얼은 실제 대관하는
 * 사람에게 주는 문서라 불특정 다수에게 내걸 이유가 없고, 나머지 링크도 같은
 * 판단으로 함께 내렸다. 예약 CTA는 헤더 버튼에 남는다.
 *
 * 404는 다른 상황이다 — 없는 주소에 도착한 사람에게 갈 곳을 줘야 하므로 목록을
 * 남기되, 같은 이유로 /guide는 넣지 않는다.
 */
const allNotFoundLinks = [
  { label: '보유 장비 안내', href: '/#equipment', external: false },
  { label: '자주 묻는 질문', href: '/#faq', external: false },
  { label: '지난 행사 아카이브', href: '/events', external: false },
  ...inquiryChannels.map((channel) => ({ label: channel.name, href: channel.href, external: true })),
  { label: bookingCta.label, href: bookingUrl, external: true },
];

export const notFoundLinks = allNotFoundLinks.filter(
  (link) => showEventsPage || link.href !== '/events'
);

/**
 * Main page content. Ported from design/ISSEUM Main.dc.html renderVals().
 *
 * Ordered the way the page renders it:
 *   page → hero → stats → sections (the five headers) → steps
 *
 * The records each section iterates live in their own modules — spaces.ts,
 * equipment.ts, faq.ts — but every string index.astro renders itself is here.
 */

import type { ImageMetadata } from 'astro';

import { kakaoChannelUrl } from '../config/site';

import mainhall01 from '../assets/isseum_main-hall_01.jpg';
import mainhall02 from '../assets/isseum_main-hall_02.jpg';
import mainhall03 from '../assets/isseum_main-hall_03.jpg';
import mainhall04 from '../assets/isseum_main-hall_04.jpg';
import mainhall05 from '../assets/isseum_main-hall_05.jpg';

// Also in src/assets, unused so far — ready for the space cards:
//   isseum_project-room_01.jpg · isseum_project-room_02.jpg
//   isseum_bar_01.jpg · isseum_powder-room_01.jpg · isseum_control-room_01.jpg
// Import them here when we wire real photography into those sections.

export type HeroSlide = {
  src: ImageMetadata;
  alt: string;
  /**
   * CSS object-position. Source photos are 3:2 and the hero is 16/7.6, so ~29%
   * of the frame height is cropped — nudge this per slide if a shot loses its
   * subject ('center', 'center 40%', 'center bottom', …).
   */
  focus?: string;
};

/**
 * Hero slideshow. Swap, reorder, add or remove entries freely — the component
 * reads the length, so the counter, indicators and keyboard nav all follow.
 */
export const heroSlides: HeroSlide[] = [
  { src: mainhall01, alt: '테이블을 배치한 워크숍 형태의 메인 홀과 강연대' },
  { src: mainhall02, alt: '무대와 대형 TV를 갖춘 메인 홀 와이드 전경' },
  { src: mainhall03, alt: '메인 홀 한쪽에 마련된 바 카운터와 준비 공간' },
  { src: mainhall04, alt: '극장형으로 좌석을 배치한 메인 홀' },
  { src: mainhall05, alt: '소파와 라운지 체어를 배치한 메인 홀 라운지 구성' },
];

/** BaseLayout builds the full <title> from this; `isHome` supplies the rest. */
export const page = { title: '홈' };

export const hero = {
  eyebrow: 'PRIVATE MULTI CULTURE SPACE',
  /** One entry per line — index.astro renders each as its own block. */
  headline: ['이야기가 피어나는 곳에,', '너와 나 사이에,', '가장 반짝이는 하루에,', '이씀'],
  body: [
    '이씀은 홍대입구역 1번 출구에서 5분 거리에 위치한, 차분하고 프라이빗한 약 60평 규모의 가변형 복합문화공간입니다. 아이디어를 나누는 워크숍부터 작가와 독자가 교감하는 북토크, 브랜드와 팬이 만나는 팝업스토어와 팬미팅까지. 주최자가 원하는 모든 형태의 이야기를, 이곳에서 자유롭게 펼쳐보세요.',
  ],
  slot: 'HERO — 메인 홀 와이드 전경 (2400×1140)',
};

export const stats = [
  { value: '198㎡(약 60평)', label: '메인 홀 면적' },
  { value: '최대 90인', label: '동시 수용 인원' },
  { value: '4개 영역', label: '메인 홀 · 프로젝트 룸 · 분장실 · 바' },
  { value: '08–22시', label: '대관 가능 시간' },
];

/**
 * The five SectionHeader pairs, keyed by the section's anchor id. The Latin
 * eyebrows are decorative wide-tracked labels, not translations — see CLAUDE.md.
 */
export const sections = {
  space: { eyebrow: 'SPACE', title: '공간 안내' },
  equipment: { eyebrow: 'EQUIPMENT & PROPS', title: '보유 장비' },
  price: { eyebrow: 'PRICE', title: '대관 요금' },
  process: { eyebrow: 'RENTAL PROCESS', title: '대관 절차' },
  faq: { eyebrow: 'FAQ', title: '자주 묻는 질문' },
};

export type Step = {
  num: string;
  en: string;
  title: string;
  body: string;
  /** 카드 아래에 붙는 버튼. inquiry는 문의 채널 전부, booking은 네이버 예약. */
  cta?: 'inquiry' | 'booking';
};

export const steps: Step[] = [
  {
    num: '1',
    en: 'STEP 01',
    title: '일정 문의',
    // 카카오톡 채널이 열리기 전에는 닿지 않는 채널을 부르지 않는다.
    body: `${kakaoChannelUrl ? '네이버 톡톡이나 카카오톡으로' : '네이버 톡톡으로'} 희망 날짜와 시간, 인원, 행사 성격을 남겨 주세요. 담당자가 예약 가능 여부를 안내해 드립니다.`,
    cta: 'inquiry',
  },
  {
    num: '2',
    en: 'STEP 02',
    title: '네이버 예약 및 결제',
    body: '가능하다는 안내를 받으시면 네이버 예약에서 같은 날짜와 시간으로 예약하고 결제해 주세요.',
    cta: 'booking',
  },
  {
    num: '3',
    en: 'STEP 03',
    title: '이용 매뉴얼 전송',
    body: '이용 시작 1시간 전, 현관 비밀번호와 입퇴실 방법, 장비 사용 안내를 문자로 보내드립니다.',
  },
  {
    num: '4',
    en: 'STEP 04',
    title: '입실 및 이용',
    body: '공간을 이용하신 후 원상복구를 마치고 퇴실하시면 됩니다.',
  },
];

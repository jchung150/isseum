/** Main page content. Ported from design/ISSEUM Main.dc.html renderVals(). */

import type { ImageMetadata } from 'astro';

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

export const hero = {
  eyebrow: 'PRIVATE MULTI CULTURE SPACE',
  /** `brand` renders as the <em> treatment: italics suppressed, colour shifted one step. */
  headline: '오래 머무르고 싶은 공간.',
  brand: '“이씀”',
  body: [
    '이씀은 홍대입구역 1번 출구에서 5분 거리에 위치한, 차분하고 프라이빗한 약 60평 규모의 가변형 복합문화공간입니다. 기업의 비전을 쌓아 올리는 워크숍부터 작가와 독자가 교감하는 북토크, 브랜드의 팬덤을 형성하는 팝업스토어와 팬미팅까지. 주최자가 원하는 모든 형태의 이야기를 완벽한 무대로 구현해 드립니다.',
  ],
  slot: 'HERO — 메인 홀 와이드 전경 (2400×1140)',
};

export const stats = [
  { value: '198㎡(약 60평)', label: '메인 홀 면적' },
  { value: '최대 90인', label: '동시 수용 인원' },
  { value: '4개 영역', label: '메인 홀 · 프로젝트 룸 · 분장실 · 바' },
  { value: '08–22시', label: '대관 가능 시간' },
];


export const steps = [
  {
    num: '1',
    en: 'STEP 01',
    title: '예약 신청',
    body: '예약 신청서에 원하는 날짜와 일정, 행사 성격을 남겨 주세요.',
  },
  {
    num: '2',
    en: 'STEP 02',
    title: '승인 및 결제',
    body: '호스트가 일정을 확인한 뒤 대관을 확정하고 결제를 안내드립니다.',
  },
  {
    num: '3',
    en: 'STEP 03',
    title: '이용 매뉴얼 전송',
    body: '입·퇴실 방법과 출입 비밀번호, 장비 사용 안내를 전달드립니다.',
  },
  {
    num: '4',
    en: 'STEP 04',
    title: '입실 및 이용',
    body: '이씀 공간을 이용하신 후 원상복구를 마치고 퇴실하시면 됩니다.',
  },
];

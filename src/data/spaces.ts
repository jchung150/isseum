/** The four areas of the venue. Ported from design/ISSEUM Main.dc.html renderVals().spaces. */

import type { ImageMetadata } from 'astro';

import mainHall from '../assets/isseum_main-hall_01.jpg';
import projectRoom from '../assets/isseum_project-room_01.jpg';
import powderRoom from '../assets/isseum_powder-room_01.jpg';
import bar from '../assets/isseum_bar_01.jpg';

export type Space = {
  num: string;
  name: string;
  /** Intended shot, kept as documentation now that real photography is in. */
  slot: string;
  src: ImageMetadata;
  alt: string;
  /**
   * CSS object-position. Cards are 4/5 portrait and the source is 3:2 landscape,
   * so ~47% of the frame width is cropped — nudge per card if a room loses its
   * subject ('center', 'left center', '30% center', …).
   */
  focus?: string;
  desc: string;
  meta: string;
};

export const spaces: Space[] = [
  {
    num: '01',
    name: '메인 홀',
    slot: '메인 홀 (1200×1500)',
    src: mainHall,
    alt: '테이블과 의자를 배치하고 강연대를 세팅한 이씀 메인 홀',
    desc: '대형 TV와 자유로운 가구 배치가 가능한 메인 행사 공간. 공연, 상영, 브랜드 쇼케이스까지 폭넓게 소화합니다.',
    meta: '최대 90인 착석 · 독립 공조',
  },
  {
    num: '02',
    name: '프로젝트 룸',
    slot: '프로젝트 룸 (1200×1500)',
    src: projectRoom,
    alt: '회의용 타원 테이블과 소파, 벽걸이 TV가 있는 프로젝트 룸',
    desc: '미팅, 소모임, 출연자 대기실로 활용 가능한 프라이빗 룸. 독립 조명과 도어록으로 분리 운영됩니다.',
    meta: '최대 10인 착석 · 독립 공조',
  },
  {
    num: '03',
    name: '파우더 룸',
    slot: '분장실 (1200×1500)',
    src: powderRoom,
    alt: '조명이 둘러진 화장 거울과 의자가 놓인 파우더 룸',
    desc: '거울과 조명이 갖춰진 준비 공간. 연사와 출연자의 메이크업, 의상 교체, 리허설 대기 용도로 사용합니다.',
    meta: '화장대 · 행거 비치',
  },
  {
    num: '04',
    name: '바(Bar)',
    slot: '바 영역 (1200×1500)',
    src: bar,
    alt: '우드 카운터와 싱크대를 갖춘 오픈 바 영역',
    desc: '음료 제공 및 네트워킹을 위한 오픈 바 공간. 케이터링 반입과 간단한 조주 세팅이 가능합니다.',
    meta: '정수기 · 싱크대 · 냉장 설비',
  },
];

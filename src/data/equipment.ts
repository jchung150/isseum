/**
 * Equipment inventory. Ported from design/ISSEUM Equipment.dc.html renderVals().
 * `summary` is the shorter copy the Main page's preview list uses — kept alongside
 * the full record so the two can't drift apart.
 */

import type { ImageMetadata } from 'astro';

import jblSpeakers from '../assets/isseum_JBL_speakers.jpeg';
import smartTv from '../assets/isseum_100_tv.jpeg';
import chair from '../assets/isseum_chair.jpg';
import table from '../assets/isseum_table.jpg';
import sofa from '../assets/isseum_sofa.jpeg';

export const CATEGORIES = ['전체', '음향', '영상', '가구', '기타'] as const;
export type Category = (typeof CATEGORIES)[number];

/** '사전 요청' items are in storage and render with a filled badge. */
export type Requirement = '사전 요청' | '상시 세팅' | '상시 제공';

export type EquipmentItem = {
  category: Exclude<Category, '전체'>;
  name: string;
  req: Requirement;
  desc: string;
  spec: string;
  qty: string;
  place: string;
  /** Fallback caption — the Placeholder hatch renders when `src` is absent. */
  slot: string;
  src?: ImageMetadata;
  alt?: string;
  /**
   * 'contain' suits product cut-outs shot on a plain background: the whole
   * item stays visible instead of being cropped by the 3:2 frame. Switch to
   * 'cover' (the default) once real in-situ photography replaces these.
   */
  fit?: 'cover' | 'contain';
  summary: { name: string; spec: string };
};

export const equipment: EquipmentItem[] = [
  {
    category: '음향',
    name: 'JBL 6채널 입체 음향 시스템 & 슈어 무선 마이크',
    req: '상시 세팅',
    desc: 'JBL 6채널 스피커가 공간 전체에 고르게 소리를 채웁니다. SHURE 무선 마이크를 함께 운용해 강연·북토크처럼 진행자와 게스트가 함께 말하는 구성에 적합합니다.',
    spec: 'JBL 6채널 · 슈어 무선 마이크',
    qty: '무선 마이크 4채널',
    place: '메인 홀 (스피커 전 영역 분산)',
    slot: 'JBL 음향 시스템 & SHURE 마이크 (1800×1200)',
    src: jblSpeakers,
    alt: '벽걸이형 JBL 스피커 한 쌍',
    fit: 'contain',
    summary: { name: 'JBL 6채널 입체 음향 시스템', spec: 'SHURE 무선 마이크 포함' },
  },
  {
    category: '영상',
    name: '100인치 삼성 스마트 TV',
    req: '상시 세팅',
    desc: '메인 홀 벽면에 고정된 100인치 스마트 TV입니다. 무선 미러링과 HDMI 유선 입력을 모두 지원해 발표 자료와 브랜드 영상을 바로 띄울 수 있습니다.',
    spec: '100인치 TV · 미러링 · HDMI',
    qty: '1대',
    place: '메인 홀 정면 벽면 고정',
    slot: '100인치 삼성 스마트 TV (1800×1200)',
    src: smartTv,
    alt: '메인 홀 벽면에 설치된 100인치 스마트 TV',
    fit: 'contain',
    summary: { name: '100인치 삼성 4K 스마트 TV', spec: '미러링 & HDMI 지원' },
  },
  {
    category: '가구',
    name: '기본 의자',
    req: '상시 세팅',
    desc: '등판과 좌판에 패딩이 들어가 오래 앉아 있어도 불편하지 않은 기본 의자입니다. 극장형, U자형, 아일랜드형 등 원하는 레이아웃을 자유롭게 구성할 수 있습니다.',
    spec: '등·좌판 패딩 · 적층 보관',
    qty: '75개',
    place: '메인 홀 · 프로젝트 룸',
    slot: '기본 의자 (1800×1200)',
    src: chair,
    alt: '등판과 좌판에 패딩이 있는 기본 의자',
    fit: 'contain',
    summary: { name: '기본 의자', spec: '등·좌판 패딩 · 자유로운 레이아웃 구성' },
  },
  {
    category: '가구',
    name: '이동식 다목적 테이블',
    req: '사전 요청',
    desc: '바퀴가 달린 퍼시스 2인·3인용 이동식 테이블입니다. 필요할 때 바로 펼치고 행사 중에도 손쉽게 이동할 수 있어 워크숍, 접수처, 굿즈 판매대 등 다양한 용도로 활용됩니다.',
    spec: '2인·3인용 · 바퀴 · 접이식',
    qty: '25개',
    place: '메인 홀 · 프로젝트 룸 (창고 보관)',
    slot: '이동식 다목적 테이블 (1800×1200)',
    src: table,
    alt: '바퀴가 달린 흰색 접이식 다목적 테이블',
    fit: 'contain',
    summary: { name: '이동식 다목적 테이블', spec: '퍼시스 2인·3인용 접이식 · 바퀴 이동' },
  },
  {
    category: '가구',
    name: '3인용 소파 & 1인용 라운지 체어',
    req: '사전 요청',
    desc: '커버를 교체할 수 있어 행사 톤앤매너에 맞춘 연출이 가능합니다. 소파와 라운지 체어를 조합해 북토크나 인터뷰 촬영 구도로 배치할 수 있습니다.',
    spec: '3인용 소파 · 1인용 라운지 체어 · 커버 교체 가능',
    qty: '소파 1개 · 체어 3개',
    place: '메인 홀',
    slot: '3인용 소파 & 1인용 라운지 체어 (1800×1200)',
    src: sofa,
    alt: '원목 프레임의 3인용 패브릭 소파',
    fit: 'contain',
    summary: { name: '3인용 소파 & 1인용 라운지 체어', spec: '톤앤매너 맞춤 커버 교체 가능' },
  },
  {
    category: '가구',
    name: '이동식 강연대',
    req: '사전 요청',
    desc: '강연, 북토크, 시상식 진행에 사용하는 이동식 강연대입니다. 노트북과 대본을 올려두기 충분한 상판에 마이크를 함께 세팅해 드립니다.',
    spec: '이동식 · 노트북 거치 가능',
    qty: '2개',
    place: '메인 홀',
    slot: '강연대 (1800×1200)',
    summary: { name: '강연대', spec: '이동식 · 노트북 거치 가능' },
  },
  {
    category: '기타',
    name: '초고속 Wi-Fi',
    req: '상시 제공',
    desc: '참석자가 많은 행사에서도 끊김 없이 접속할 수 있으며, 접속 정보는 공간 내부와 안내 문자를 통해 확인하실 수 있습니다.',
    spec: '기가 인터넷',
    qty: '-',
    place: '전 영역',
    slot: '초고속 기가 Wi-Fi (1800×1200)',
    summary: { name: '초고속 기가 Wi-Fi', spec: '행사 전용 분리 회선' },
  },
];

export const equipmentNotes = [
  {
    label: '사전 요청 — ',
    text: "'사전 요청' 표기 장비는 창고에 보관 중입니다. 이용일 3일 전까지 알려 주시면 입실 전에 세팅해 드립니다.",
  },
  { label: '추가 비용 — ', text: '위 장비는 모두 대관료에 포함되어 있으며, 별도 사용료는 없습니다.' },
  {
    label: '조작 주의 — ',
    text: '믹서·TV 설정을 임의로 변경하거나 케이블을 분리하지 말아 주세요. 문제가 있을 경우 호스트에게 바로 연락 주시면 됩니다.',
  },
  {
    label: '파손 및 분실 — ',
    text: '장비 파손 또는 부속품 분실 시 수리비 또는 동일 제품 교체 비용이 청구될 수 있습니다.',
  },
  {
    label: '보유 내역 변동 — ',
    text: '가구와 소품은 상시 업데이트되어 수량이 변동될 수 있습니다. 정확한 수량이 필요한 경우 별도로 문의해 주세요.',
  },
];

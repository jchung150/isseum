/**
 * Equipment inventory. Ported from design/ISSEUM Equipment.dc.html renderVals().
 * `summary` is the shorter copy the Main page's preview list uses — kept alongside
 * the full record so the two can't drift apart.
 */

import type { ImageMetadata } from 'astro';

import jblSpeakers from '../assets/jbl_speakers.jpg';
import smartTv from '../assets/samsung_smart_tv.png';
import chair from '../assets/basic_chair.jpg';
import table from '../assets/portable_table.jpg';
import sofa from '../assets/sofa_and_lounge_chair.jpg';
import podium from '../assets/podium.jpg';
import mic from '../assets/shure_mic.jpg';
import portableTv from '../assets/portable_tv.png';
import standingLight from '../assets/standing_light.png';
import wifi from '../assets/wifi.svg';

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
  src?: ImageMetadata;
  alt?: string;
  /**
   * Defaults to 'cover', which is right for the current in-situ photography —
   * all shot 4000×3000, matching --ratio-equipment exactly, so nothing is
   * cropped. Only set 'contain' for a product cut-out on a plain background,
   * where letterboxing beats cropping.
   */
  fit?: 'cover' | 'contain';
};

export const equipment: EquipmentItem[] = [
  {
    category: '음향',
    name: 'JBL 6채널 입체 음향 시스템',
    req: '상시 세팅',
    desc: 'JBL 6채널 스피커가 공간 전체에 고르게 소리를 채웁니다. 메인 홀 전 영역에 분산 배치되어 어느 좌석에서도 음압이 균일합니다.',
    spec: 'JBL 6채널 · 전 영역 분산 배치',
    qty: '6채널',
    place: '메인 홀 (스피커 전 영역 분산)',
    src: jblSpeakers,
    alt: '벽걸이형 JBL 스피커 한 쌍',
  },
  {
    category: '음향',
    name: '슈어(SHURE) 무선 마이크',
    req: '상시 세팅',
    desc: '강연·북토크처럼 진행자와 게스트가 함께 말하는 구성에 적합합니다. 4채널을 동시에 운용할 수 있어 패널 토크나 Q&A 진행에도 여유가 있습니다.',
    spec: 'SHURE 무선 · 4채널 동시 운용',
    qty: '4채널',
    place: '메인 홀',
    src: mic,
    alt: '슈어 무선 핸드 마이크',
  },
  {
    category: '영상',
    name: '100인치 삼성 스마트 TV',
    req: '상시 세팅',
    desc: '메인 홀 벽면에 고정된 100인치 스마트 TV입니다. 무선 미러링과 HDMI 유선 입력을 모두 지원해 발표 자료와 브랜드 영상을 바로 띄울 수 있습니다.',
    spec: '100인치 TV · 미러링 · HDMI',
    qty: '1대',
    place: '메인 홀 정면 벽면 고정',
    src: smartTv,
    alt: '메인 홀 벽면에 설치된 100인치 스마트 TV',
  },
  {
    category: '영상',
    name: '이동형 TV',
    req: '사전 요청',
    desc: '바퀴가 달린 스탠드형 TV입니다. 필요한 위치로 옮겨 세울 수 있어 프로젝트 룸 미팅이나 메인 홀 보조 화면 등에 활용됩니다.',
    spec: '이동식 스탠드 · 바퀴 이동',
    qty: '1대',
    place: '메인 홀 · 프로젝트 룸',
    src: portableTv,
    alt: '바퀴가 달린 스탠드에 설치된 이동형 TV',
  },
  {
    category: '가구',
    name: '기본 의자',
    req: '상시 세팅',
    desc: '등판과 좌판에 패딩이 들어가 오래 앉아 있어도 불편하지 않은 기본 의자입니다. 극장형, U자형, 아일랜드형 등 원하는 레이아웃을 자유롭게 구성할 수 있습니다.',
    spec: '등·좌판 패딩 · 적층 보관',
    qty: '75개',
    place: '메인 홀 · 프로젝트 룸',
    src: chair,
    alt: '등판과 좌판에 패딩이 있는 기본 의자',
  },
  {
    category: '가구',
    name: '이동식 다목적 테이블',
    req: '사전 요청',
    desc: '바퀴가 달린 퍼시스 2인·3인용 이동식 테이블입니다. 필요할 때 바로 펼치고 행사 중에도 손쉽게 이동할 수 있어 워크숍, 접수처, 굿즈 판매대 등 다양한 용도로 활용됩니다.',
    spec: '2인·3인용 · 바퀴 · 접이식',
    qty: '25개',
    place: '메인 홀 · 프로젝트 룸 (창고 보관)',
    src: table,
    alt: '바퀴가 달린 흰색 접이식 다목적 테이블',
  },
  {
    category: '가구',
    name: '3인용 소파 & 1인용 라운지 체어',
    req: '사전 요청',
    desc: '커버를 교체할 수 있어 행사 톤앤매너에 맞춘 연출이 가능합니다. 소파와 라운지 체어를 조합해 북토크나 인터뷰 촬영 구도로 배치할 수 있습니다.',
    spec: '3인용 소파 · 1인용 라운지 체어 · 커버 교체 가능',
    qty: '소파 1개 · 체어 3개',
    place: '메인 홀',
    src: sofa,
    alt: '원목 프레임의 3인용 패브릭 소파',
  },
  {
    category: '가구',
    name: '이동식 강연대',
    req: '사전 요청',
    desc: '강연, 북토크, 시상식 진행에 사용하는 이동식 강연대입니다. 노트북과 대본을 올려두기 충분한 상판에 마이크를 함께 세팅해 드립니다.',
    spec: '이동식 · 노트북 거치 가능',
    qty: '2개',
    place: '메인 홀',
    src: podium,
    alt: '이동식 강연대',
  },
  {
    category: '가구',
    name: '스탠드 조명',
    req: '사전 요청',
    desc: '분위기 연출과 보조 조명으로 사용하는 이동식 스탠드 조명입니다. 필요한 위치에 세워 라운지 구성이나 촬영 보조광으로 활용할 수 있습니다.',
    spec: '이동식 · 플로어 스탠드',
    qty: '문의',
    place: '메인 홀 · 프로젝트 룸',
    src: standingLight,
    alt: '패브릭 갓이 달린 플로어 스탠드 조명',
  },
  {
    category: '기타',
    name: '초고속 Wi-Fi',
    req: '상시 제공',
    desc: '참석자가 많은 행사에서도 끊김 없이 접속할 수 있으며, 접속 정보는 공간 내부와 안내 문자를 통해 확인하실 수 있습니다.',
    spec: '기가 인터넷',
    qty: '-',
    place: '전 영역',
    src: wifi,
    alt: '와이파이 아이콘',
    // A flat vector mark, not a photo: cover would crop it to nothing.
    fit: 'contain',
  },
];

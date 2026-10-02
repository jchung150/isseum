/**
 * 이용 안내 매뉴얼 — `/guide`.
 *
 * 노션의 "이씀 이용 매뉴얼"을 옮긴 것이다. 원문의 이모지 제목은 뺐다. 이 사이트는
 * 이모지를 쓰지 않고 아이콘 글리프만 예외로 두기 때문이다(CLAUDE.md §규칙 1).
 *
 * **공개 페이지다.** 현관 비밀번호와 와이파이 비밀번호는 여기 적지 않는다. 지금처럼
 * 이용 1시간 전 문자·카카오톡으로만 전달한다 — booking.ts의 규정도 그렇게 약속한다.
 *
 * 사진은 `src/assets/guide/<slug>/NN.jpg`에 있고 명시적으로 import한다. 아직 받지
 * 못한 사진은 `src` 없이 `alt`만 둔다. 그 자리는 플레이스홀더 해칭으로 렌더되므로
 * 빠진 사진이 페이지에서 눈에 보인다.
 */

import type { ImageMetadata } from 'astro';

import route01 from '../assets/guide/route/01.jpg';
import route02 from '../assets/guide/route/02.jpg';
import route03 from '../assets/guide/route/03.jpg';
import route04 from '../assets/guide/route/04.jpg';
import route05 from '../assets/guide/route/05.jpg';
import entry01 from '../assets/guide/entry/01.jpg';
import parking01 from '../assets/guide/parking/01.jpg';
import parking02 from '../assets/guide/parking/02.jpg';
import parking03 from '../assets/guide/parking/03.jpg';
import parking04 from '../assets/guide/parking/04.jpg';
import parking05 from '../assets/guide/parking/05.jpg';
import parking06 from '../assets/guide/parking/06.jpg';
import parking07 from '../assets/guide/parking/07.jpg';
import parking08 from '../assets/guide/parking/08.jpg';
import parking10 from '../assets/guide/parking/10.jpg';

export type GuideShot = { src?: ImageMetadata; alt: string; caption?: string };

export type GuideLine = {
  /** 굵게 표시되는 앞머리. 저장소 관례대로 `— `로 끝낸다. */
  label?: string;
  text: string;
  /** 한 단계 들여쓴 보조 설명. */
  details?: string[];
  /** 그 줄에 딸린 사진. 조작 단계처럼 글과 사진이 1:1로 붙는 곳에 쓴다. */
  shots?: GuideShot[];
};

export type GuideBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'text'; body: string }
  | { kind: 'bullets'; items: GuideLine[] }
  | { kind: 'steps'; items: GuideLine[] }
  | { kind: 'note'; title?: string; body: string[] }
  | { kind: 'figure'; src?: ImageMetadata; alt: string; caption?: string }
  | { kind: 'link'; label: string; href: string; lines: GuideLine[] }
  /** 하위 페이지로 들어가는 카드. `to`는 현재 페이지 기준 한 토막. */
  | { kind: 'pagelink'; to: string; label: string; note: string };

export type GuidePage = {
  /** 부모 기준 한 토막. 전체 경로는 조상들을 이어 만든다. */
  slug: string;
  title: string;
  /** 목차 카드에 붙는 한 줄 설명. */
  summary: string;
  blocks: GuideBlock[];
  /** 한 단계 더 들어가는 하위 페이지. */
  children?: GuidePage[];
};

/** 트리를 평탄화해 경로와 조상 목록을 만든다. 라우트와 목차가 같은 함수를 쓴다. */
export type GuideEntry = {
  path: string;
  page: GuidePage;
  /** 루트(이용 안내)를 제외한 조상들. 빵부스러기가 이걸 읽는다. */
  trail: { path: string; title: string }[];
};

export function flatten(pages: GuidePage[], base = '/guide', trail: GuideEntry['trail'] = []): GuideEntry[] {
  return pages.flatMap((page) => {
    const path = `${base}/${page.slug}`;
    const entry: GuideEntry = { path, page, trail };
    const childTrail = [...trail, { path, title: page.title }];
    return [entry, ...flatten(page.children ?? [], path, childTrail)];
  });
}

export const page = {
  title: '이용 안내',
  description:
    '이씀 대관 이용 안내. 동선과 공간 배치, 출입 방법, 이용 수칙, 주차와 화물 반입을 사진과 함께 안내합니다.',
  eyebrow: 'GUIDE',
  heading: '이용 안내',
  lead: '공간에 비치된 기본 안내문보다 자세한 설명이 필요할 때 확인해 주세요.',
  /** 빵부스러기의 뿌리이자 목차 페이지의 이름. */
  rootLabel: '이용 안내',
  breadcrumbLabel: '현재 위치',
  /** 각 페이지 하단에서 목차로 돌아가는 링크. */
  backLabel: '목차로 돌아가기',
  /** 하위 페이지로 들어가는 카드의 화살표 대체 텍스트는 두지 않는다(aria-hidden). */
  tocLabel: '목차',
  /** 아직 사진이 들어오지 않은 자리에 붙는 캡션 접두어. */
  pendingPrefix: '사진 준비 중 — ',
};

export const guidePages: GuidePage[] = [
  /* ═══════════════  동선 및 공간 안내  ═══════════════ */
  {
    slug: 'route',
    title: '동선 및 공간 안내',
    summary: '주 출입문에 들어서면 어디에 무엇이 있는지, 화장실은 어느 쪽인지.',
    blocks: [
      { kind: 'heading', text: '공간 안내 (주 출입문 진입 시)' },
      {
        kind: 'bullets',
        items: [
          { label: '왼쪽 — ', text: '프로젝트룸 · 대기실 (독립된 회의 공간 또는 강연 대기 공간)' },
        ],
      },
      {
        kind: 'figure',
        src: route01,
        alt: '소파와 회의 테이블, 벽걸이 TV가 놓인 프로젝트룸 겸 대기실',
      },
      { kind: 'bullets', items: [{ label: '정면 — ', text: '메인 홀 (넓은 메인 공간)' }] },
      {
        kind: 'figure',
        src: route02,
        alt: '책상과 의자를 강의식으로 배치하고 정면에 대형 TV를 둔 메인 홀',
      },
      {
        kind: 'bullets',
        items: [{ label: '오른쪽 — ', text: '바(Bar) 공간, 안쪽으로 음향 · PC 컨트롤 존' }],
      },
      {
        kind: 'figure',
        src: route03,
        alt: '원목 카운터와 냉장고, 싱크대를 갖춘 바 공간',
      },
      {
        kind: 'bullets',
        items: [
          {
            label: '화장실 — ',
            text: '주 출입문 밖으로 나와 왼쪽 복도로 들어가면 있습니다. 복도를 따라 들어가면 여자 화장실이 먼저 나오고, 더 안쪽에 남자 화장실이 있습니다.',
          },
        ],
      },
      {
        kind: 'figure',
        src: route04,
        alt: '화장실로 이어지는 지하 복도와 벽에 걸린 층별 안내판',
      },
      { kind: 'heading', text: '동선 안내 (주 출입문 진입 시)' },
      {
        kind: 'figure',
        src: route05,
        alt: '주 출입문에서 메인 홀과 프로젝트룸으로 이어지는 동선을 화살표로 표시한 지하 1층 평면도',
      },
    ],
  },

  /* ═══════════════  출입 방법  ═══════════════ */
  {
    slug: 'entry',
    title: '출입 방법',
    summary: '도어락으로 문을 여는 순서와, 퇴실할 때 문을 잠그는 방법.',
    blocks: [
      {
        kind: 'note',
        body: ['다음 예약자를 위해 예약된 시간 정각 입·퇴실을 엄수해 주시기 바랍니다.'],
      },
      { kind: 'heading', text: '입실 방법' },
      {
        kind: 'figure',
        src: entry01,
        alt: '지하 1층 현관의 흰색 양개 방화문과 가운데 설치된 디지털 도어락',
      },
      {
        kind: 'steps',
        items: [
          { text: '지하 1층 현관 도어락 화면을 손바닥으로 터치합니다.' },
          { text: '전송받으신 비밀번호를 입력합니다.' },
          { text: '마지막으로 * (별표) 버튼을 누르면 문이 열립니다.' },
        ],
      },
      {
        kind: 'note',
        body: ['이용 시작 1시간 전에 문자 메시지로 현관 비밀번호가 발송됩니다.'],
      },
      { kind: 'heading', text: '퇴실 방법' },
      {
        kind: 'steps',
        items: [
          {
            text: '왼쪽 문을 오른쪽 문의 쇠 프레임 안쪽으로 완전히 들어가게 닫은 후, 양쪽 문을 밀착시켜 닫아 주세요.',
          },
          { text: '도어락 커버(화면)를 위로 올리면 잠금장치가 가동되어 문이 잠깁니다.' },
          { text: '문고리를 잡아당겨 문이 정상적으로 잠겼는지 최종 확인 후 퇴실해 주시기 바랍니다.' },
        ],
      },
    ],
  },

  /* ═══════════════  공간 이용 기본 수칙  ═══════════════ */
  {
    slug: 'conduct',
    title: '공간 이용 기본 수칙',
    summary: '벽면 · 음식물 · 금연 · 반려동물 · 원상복구 · 쓰레기 배출.',
    blocks: [
      { kind: 'heading', text: '공용 공간(복도 · 계단) 비우기' },
      {
        kind: 'text',
        body: '원활한 통행을 위해 복도나 계단에서의 대기 및 짐 보관은 피해 주세요. 모든 대기 인원과 짐은 공간 내부에 배치해 주세요.',
      },
      { kind: 'heading', text: '벽면 훼손 주의' },
      {
        kind: 'text',
        body: '벽면에 테이프, 접착제, 못, 핀 사용은 불가합니다. 부착물이 필요할 경우 사전 협의하시면 갤러리 와이어 및 전용 점착제(블루텍)를 제공해 드립니다.',
      },
      { kind: 'heading', text: '음식물 반입 (F&B)' },
      {
        kind: 'text',
        body: '완제품 형태의 음료 및 다과류 반입이 가능합니다. 공간 내 현장 조리 및 냄새가 심한 국물류 음식 반입은 삼가해 주세요.',
      },
      { kind: 'heading', text: '절대 금연 및 화기 사용 금지' },
      {
        kind: 'text',
        body: '건물 전체 및 지하 내부에서는 전자담배를 포함하여 절대 금연입니다. 화재 예방을 위해 촛불, 캔들, 가스버너 등 화기 및 연막 장비는 사용 불가합니다.',
      },
      { kind: 'heading', text: '미성년자 출입 규정' },
      {
        kind: 'text',
        body: '미성년자의 단독 이용은 제한되며 보호자 동반이 권장됩니다. 미성년자의 음주 및 흡연은 엄격히 금지되며, 주류가 제공되는 행사의 경우 미성년자 입장이 제한될 수 있습니다.',
      },
      { kind: 'heading', text: '반려동물 출입 안내' },
      {
        kind: 'text',
        body: '공간 위생 및 다음 이용객을 위해 시각장애인 안내견을 제외한 반려동물 동반 출입은 금지됩니다. 단, 사전 협의된 행사의 경우는 예외로 적용될 수 있으니 미리 문의해 주세요.',
      },
      { kind: 'heading', text: '원상 복구 및 정돈' },
      {
        kind: 'text',
        body: '퇴실 시 사용하신 모든 가구, 비품, 음향 및 조명 기기는 처음 상태 그대로 원상 복구해 주세요.',
      },
      { kind: 'heading', text: '퇴실 전 확인 사항 (소등 및 냉난방)' },
      {
        kind: 'text',
        body: '퇴실 시 내부 조명과 냉난방기 전원이 완전히 꺼져 있는지 확인해 주세요.',
      },
      { kind: 'heading', text: '쓰레기 배출 규정' },
      {
        kind: 'text',
        body: '퇴실 전 발생한 쓰레기는 엘리베이터 옆 쓰레기통에 일반 · 재활용 · 종이로 분리 배출해 주시기 바랍니다. 음식물 쓰레기는 음식물 쓰레기 전용 봉투에 넣어 1층 스타벅스 매장 옆에 비치된 음식물 쓰레기통에 배출해 주세요.',
      },
    ],
  },

  /* ═══════════════  주차 및 화물 반입 안내  ═══════════════ */
  {
    slug: 'parking',
    title: '주차 및 화물 반입 안내',
    summary: '기계식 주차장 규격과 이용 방법, 인근 주차장, 화물 하차 공간.',
    blocks: [
      { kind: 'heading', text: '주차 안내' },
      {
        kind: 'bullets',
        items: [
          {
            text: '대관 시 건물 뒷편 기계식 주차장에 기본 5대까지 주차 가능합니다.',
          },
          {
            text: '단, 규격 제한으로 인해 SUV 등 일부 대형 · RV 차량은 입고가 불가한 점 양해 부탁드립니다.',
            details: [
              '전장(길이) 5,100mm 이하',
              '전폭(타이어폭 기준) 2,100mm 이하',
              '전고(높이) 1,550mm 이하',
              '중량 1,850kg 이하',
            ],
          },
        ],
      },
      {
        kind: 'figure',
        src: parking01,
        alt: '제어반과 규격 제한 안내판이 붙어 있는 건물 뒷편 기계식 주차장 입구',
      },
      {
        kind: 'bullets',
        items: [
          {
            text: '야간(19:30 이후) 및 주말 · 공휴일에는 기계식 주차장 입고 대신 주차장의 빈 공간을 이용할 수 있습니다.',
          },
        ],
      },

      {
        kind: 'bullets',
        items: [
          {
            label: '기존 차량 출차 — ',
            text: '기계식 주차장에 이미 입고된 차량의 출차는 이용자가 직접 수동으로 조작하셔야 합니다.',
          },
        ],
      },
      {
        kind: 'pagelink',
        to: 'manual',
        label: '수동 출차 조작 방법',
        note: '제어반 조작을 사진과 함께 단계별로 안내합니다.',
      },
      { kind: 'heading', text: '인근 유료 주차장' },
      {
        kind: 'text',
        body: '방문객 차량이 많거나 만차일 경우 인근 주차장을 이용해 주시기 바랍니다.',
      },
      {
        kind: 'link',
        label: '경남1 노상 공영 주차장',
        href: 'https://map.naver.com/p/entry/place/37060270',
        lines: [
          { label: '주소 — ', text: '서울 마포구 서교동 418' },
          { label: '요금 — ', text: '5분당 250원 (1시간 3,000원)' },
          { label: '운영 시간 — ', text: '월–토 11:00–21:00 (일요일 정기휴무 · 카드 전용 결제)' },
          {
            label: '참고 — ',
            text: '노상 주차장 특성상 혼잡도가 높아 빈 자리가 없는 경우가 많으니, 이용 시 미리 현장 상황을 확인하시거나 인근 다른 유료 주차장도 함께 고려해 주시기 바랍니다.',
          },
        ],
      },
      { kind: 'heading', text: '화물 및 장비 반입' },
      {
        kind: 'bullets',
        items: [
          {
            text: '무거운 짐이나 대형 장비를 반입하실 경우, 건물 1층 정문 옆 임시 주차 공간에서 짐을 내리면 좀 더 원활하게 이동할 수 있습니다. 짐을 모두 내린 후 차량은 다른 곳으로 이동 부탁드립니다.',
          },
          { text: '바닥 스크래치 방지를 위해 무거운 짐은 끌지 말고 들어서 운반해 주시기를 부탁드립니다.' },
        ],
      },
      {
        kind: 'note',
        body: ['해당 공간은 짐을 내리기 위한 장소로 임시 정차는 가능하나 계속 주차는 어렵습니다.'],
      },
      {
        kind: 'figure',
        src: parking10,
        alt: '건물 1층 정문 옆, 붉은 타원으로 표시된 화물 하차용 임시 정차 공간',
      },
    ],
    children: [
      {
        slug: 'manual',
        title: '수동 출차 조작 방법',
        summary: '이미 입고된 차량을 직접 꺼낼 때의 제어반 조작 순서.',
        blocks: [
          {
            kind: 'figure',
            src: parking02,
            alt: '스테인리스 함체 안에 터치스크린과 비상정지 버튼이 달린 기계식 주차장 제어반',
          },
          {
            kind: 'steps',
            items: [
              {
                text: '제어반 키패드에서 [조작설명] 버튼을 누릅니다.',
                shots: [{ src: parking03, alt: '제어반 화면 오른쪽에 세로로 놓인 운전화면 · 이상화면 · 조작설명 버튼' }],
              },
              {
                label: '수동 모드 전환 — ',
                text: '화면 우측의 [게이트 닫힘대기 ON](파란색 버튼)을 5초 이상 길게 눌러 수동 조작 모드로 전환합니다.',
                shots: [
                  {
                    src: parking04,
                    alt: '조작설명을 눌러 열린 조작방법 안내 화면. 오른쪽에 파란색 게이트 닫힘대기 ON 버튼이 있다',
                  },
                  {
                    src: parking05,
                    alt: '붉은 원으로 표시된 파란색 게이트 닫힘대기 ON 버튼 확대',
                  },
                ],
              },
              {
                label: '출입문 열기 — ',
                text: '메인 화면으로 돌아와 하단의 [출입문 열림(상)] 버튼을 눌러 문을 엽니다.',
                shots: [{ src: parking06, alt: '붉은 원으로 표시된 출입문 열림(상) 버튼 확대' }],
              },
              {
                label: '출고 진행 — ',
                text: '[출고] 버튼을 누르고, 키패드(우측 숫자 버튼)로 출고할 차량의 번호 4자리를 입력한 뒤 [운전시작] 버튼을 누릅니다. 기계가 작동하며 차량이 출차구로 이동하니 안전하게 대기해 주세요.',
                shots: [{ src: parking07, alt: '입고 · 출고 · 취소 · 운전시작 버튼과 숫자 키패드가 있는 출고 화면' }],
              },
              {
                label: '출입문 닫기 — ',
                text: '하단의 [출입문 닫힘(하)] 버튼을 눌러 문을 닫습니다.',
                shots: [{ src: parking08, alt: '붉은 원으로 표시된 출입문 닫힘(하) 버튼 확대' }],
              },
            ],
          },
          {
            kind: 'note',
            title: '출고 시 주의사항',
            body: [
              '번호를 잘못 입력했을 경우 [취소] 또는 [CE] 버튼을 눌러 초기화하고 다시 입력하세요.',
              '출고 진행 중에는 안전을 위해 주차기 내부나 반입구 근처에 접근하지 않도록 주의해 주세요.',
            ],
          },
        ],
      },
    ],
  },
];

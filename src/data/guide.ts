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
import tv01 from '../assets/guide/tv/01.png';
import tv02 from '../assets/guide/tv/02.png';
import tv03 from '../assets/guide/tv/03.jpg';
import tv04 from '../assets/guide/tv/04.jpg';
import tv05 from '../assets/guide/tv/05.png';
import tv06 from '../assets/guide/tv/06.jpg';
import tv07 from '../assets/guide/tv/07.jpg';
import light01 from '../assets/guide/lighting/01.jpg';
import light02 from '../assets/guide/lighting/02.jpg';
import light03 from '../assets/guide/lighting/03.jpg';
import light04 from '../assets/guide/lighting/04.jpg';
import sound01 from '../assets/guide/sound/01.jpg';
import sound02 from '../assets/guide/sound/02.jpg';
import sound03 from '../assets/guide/sound/03.jpg';
import sound04 from '../assets/guide/sound/04.jpg';
import sound05 from '../assets/guide/sound/05.jpg';
import sound06 from '../assets/guide/sound/06.jpg';
import sound07 from '../assets/guide/sound/07.jpg';
import sound08 from '../assets/guide/sound/08.jpg';
import bar01 from '../assets/guide/bar/01.jpg';
import bar02 from '../assets/guide/bar/02.jpg';
import bar03 from '../assets/guide/bar/03.jpg';
import hvac01 from '../assets/guide/hvac/01.jpg';
import hvac02 from '../assets/guide/hvac/02.png';
import hvac03 from '../assets/guide/hvac/03.jpg';
import recycle01 from '../assets/guide/recycling/01.jpg';
import recycle02 from '../assets/guide/recycling/02.jpg';
import recycle03 from '../assets/guide/recycling/03.jpg';
import layout01 from '../assets/guide/layout/01.jpg';
import safety01 from '../assets/guide/safety/01.jpg';
import safety02 from '../assets/guide/safety/02.jpg';
import safety03 from '../assets/guide/safety/03.jpg';
import safety04 from '../assets/guide/safety/04.jpg';

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
  | { kind: 'pagelink'; to: string; label: string; note: string }
  /** 퇴실 전처럼 하나씩 짚어 가며 확인하는 목록. */
  | { kind: 'checklist'; items: string[] };

export type GuidePage = {
  /** 부모 기준 한 토막. 전체 경로는 조상들을 이어 만든다. */
  slug: string;
  title: string;
  /** 목차 카드에 붙는 한 줄 설명. */
  summary: string;
  blocks: GuideBlock[];
  /**
   * 목차와 페이지 머리에 '필독' 표시를 붙인다. 안 읽으면 당일에 문제가 되는
   * 것만 — 못 들어오거나, 공간이 상하거나, 퇴실이 끝나지 않는 경우. 표시가
   * 늘어나면 표시가 아니게 되므로 늘릴 때는 한 번 더 생각할 것.
   */
  required?: boolean;
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
  /** 꼭 읽어야 하는 섹션에 붙는 표시. */
  requiredLabel: '필독',
};

const spacePages: GuidePage[] = [
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
    required: true,
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
    required: true,
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

/* ═══════════════  기기 및 시설 사용법  ═══════════════ */

const devicePages: GuidePage[] = [
  {
    slug: 'wifi',
    title: '와이파이 연결',
    summary: '공간 전체에서 쓰는 무료 와이파이.',
    blocks: [
      {
        kind: 'text',
        body: '공간 내 무료 와이파이가 제공됩니다. 네트워크 이름과 비밀번호는 공간 내부 안내문과 이용 안내 문자에서 확인하실 수 있습니다.',
      },
    ],
  },

  {
    slug: 'tv',
    title: '스마트 TV 사용법',
    summary: '메인 홀 100인치 TV와 프로젝트룸 TV에 화면을 띄우는 방법.',
    blocks: [
      { kind: 'heading', text: '메인 홀 TV' },
      {
        kind: 'figure',
        src: tv01,
        alt: '메인 홀 무대 정면에 설치된 100인치 삼성 스마트 TV',
      },
      { kind: 'text', body: '메인 홀 TV에 화면을 띄우는 방법은 세 가지입니다.' },
      { kind: 'heading', text: '1. 음향실 PC 사용 (기본 세팅)' },
      {
        kind: 'steps',
        items: [
          {
            text: '음향실 PC에 접속합니다. 잠금 해제 비밀번호는 공간 내부 안내문에서 확인해 주세요.',
            shots: [{ src: tv02, alt: '음향 · PC 컨트롤 존 책상에 놓인 모니터와 본체, 키보드' }],
          },
          {
            text: '구비된 리모컨으로 TV를 켭니다.',
            shots: [{ src: tv03, alt: '메인 홀에 비치된 삼성 TV 리모컨' }],
          },
        ],
      },
      { kind: 'heading', text: '2. 강연대 앞에서 개인 노트북 연결' },
      {
        kind: 'bullets',
        items: [
          {
            label: '허브 위치 — ',
            text: '개인 노트북을 쓰시려면 메인 홀 TV를 왼쪽으로 살짝 돌려 주세요(옆으로 돌아갑니다). TV 우측 뒷편에 멀티 허브가 있습니다.',
          },
        ],
      },
      {
        kind: 'figure',
        src: tv04,
        alt: 'TV 뒷면에 연결된 멀티 허브와 HDMI 포트',
      },
      {
        kind: 'steps',
        items: [
          { label: '전원 켜기 — ', text: '구비된 리모컨으로 TV를 켭니다.' },
          {
            label: '노트북 연결 — ',
            text: 'TV 우측 뒷편 HDMI 허브의 포트에 케이블을 연결한 뒤, 리모컨에서 외부 입력을 변경해 주세요.',
          },
        ],
      },
      { kind: 'heading', text: '3. 음향실 안에서 개인 노트북 연결' },
      { kind: 'heading', text: '프로젝트룸 TV' },
      {
        kind: 'figure',
        src: tv05,
        alt: '프로젝트룸 벽면에 설치된 스마트 TV',
      },
      {
        kind: 'steps',
        items: [
          {
            label: '전원 켜기 — ',
            text: '구비된 리모컨으로 TV를 켭니다.',
            shots: [{ src: tv06, alt: '프로젝트룸에 비치된 TV 리모컨' }],
          },
          {
            label: '노트북 연결 — ',
            text: 'TV에 HDMI 선이 구비되어 있습니다. 개인 노트북에 연결한 뒤 리모컨에서 외부 입력을 변경해 주세요.',
            shots: [{ src: tv07, alt: 'TV 뒷면 HDMI 단자에 꽂혀 있는 케이블' }],
          },
        ],
      },
    ],
  },

  {
    slug: 'lighting',
    title: '조명 및 스위치 사용법',
    summary: '메인 홀 · 바 · 프로젝트 룸의 조명 스위치 위치와 기능.',
    blocks: [
      {
        kind: 'text',
        body: '공간별로 원하는 분위기를 연출하실 수 있도록 개별 조명 스위치가 설치되어 있습니다.',
      },
      { kind: 'heading', text: '메인 홀' },
      {
        kind: 'bullets',
        items: [
          {
            label: '조명 스위치 — ',
            text: '음향실 내부, PC 본체 왼쪽 벽면(문 옆)에 있습니다.',
          },
        ],
      },
      {
        kind: 'figure',
        src: light01,
        alt: '음향실 문 옆 벽면에 설치된 메인 홀 조명 스위치판',
      },
      {
        kind: 'figure',
        src: light02,
        alt: '음향 · 원통 · T7 · 무대 · 간접 · 흡기 · 배기로 이름이 붙은 스위치 열',
        caption: '스위치마다 이름이 붙어 있습니다.',
      },
      {
        kind: 'bullets',
        items: [
          { label: '음향 — ', text: '음향 부스 조명.' },
          { label: '원통 — ', text: '메인 홀 천장의 원통형 조명.' },
          { label: 'T7 — ', text: '메인 홀 천장의 긴 막대 형태 조명.' },
          { label: '무대 — ', text: 'TV 바로 위쪽 천장 조명과 노란빛 원통형 무드등.' },
          { label: '간접 — ', text: '무대보다 한 줄 앞에 있는 노란빛 원통형 무드등.' },
          { label: '흡기 · 배기 — ', text: '메인 홀 내부 공기 환기 팬.' },
        ],
      },
      { kind: 'heading', text: '바(Bar) 공간' },
      {
        kind: 'bullets',
        items: [{ label: '조명 스위치 — ', text: '싱크대 오른쪽 벽면에 있습니다.' }],
      },
      {
        kind: 'figure',
        src: light03,
        alt: '바 공간 싱크대 오른쪽 벽면의 조명 스위치',
      },
      { kind: 'heading', text: '프로젝트 룸' },
      {
        kind: 'bullets',
        items: [
          {
            label: '조명 스위치 — ',
            text: '프로젝트룸에 들어가 오른쪽 커튼을 걷고 들어가면(화장대 공간) 오른쪽 벽면에 있습니다.',
          },
        ],
      },
      {
        kind: 'figure',
        src: light04,
        alt: '프로젝트룸 화장대 공간 오른쪽 벽면의 조명 스위치',
      },
    ],
  },

  {
    slug: 'sound',
    title: '음향기기 사용법',
    summary: '마이크 · 스피커 · PC. 켜는 순서와 끄는 순서가 반대입니다.',
    blocks: [
      {
        kind: 'bullets',
        items: [{ label: '위치 — ', text: '음향 · PC 컨트롤 존 (바 공간 측면).' }],
      },
      { kind: 'figure', src: sound01, alt: '바 공간 측면에 마련된 음향 · PC 컨트롤 존' },
      { kind: 'figure', src: sound02, alt: '믹서와 무선 마이크 수신기, 파워 앰프가 들어 있는 음향 랙' },
      { kind: 'heading', text: '전원 켜기' },
      {
        kind: 'steps',
        items: [
          {
            label: 'PC 먼저 — ',
            text: '컨트롤 존의 메인 PC 전원을 가장 먼저 켭니다.',
            shots: [{ src: sound03, alt: '컨트롤 존 책상 아래 놓인 PC 본체의 전원 버튼' }],
          },
          {
            label: '상단 랙 장비 — ',
            text: '랙 상단의 믹서 전원과 중단의 무선 마이크 수신기 전원을 켭니다. 마이크와 음원 신호를 먼저 활성화하는 순서입니다.',
            shots: [
              { src: sound04, alt: '랙 상단에 설치된 야마하 MGP16X 믹서', caption: '상단 믹서 (YAMAHA MGP16X)' },
              {
                src: sound05,
                alt: '믹서 뒷면 오른쪽의 전원 스위치',
                caption: '믹서 전원 스위치 — 상단 랙 우측 후면',
              },
              {
                src: sound06,
                alt: '중단 랙 전면의 무선 마이크 수신기와 전원 버튼 두 개',
                caption: '무선 마이크 수신기 (EWI SRD3U) — 전원 버튼 2개',
              },
            ],
          },
          {
            label: '하단 앰프 마지막 — ',
            text: '하단의 파란색 프레임 파워 앰프 1, 2의 전원 버튼을 켭니다. 스피커 충격음과 고장을 막기 위해 가장 마지막입니다.',
            shots: [
              { src: sound07, alt: '랙 하단에 설치된 파란색 프레임의 파워 앰프 두 대' },
              {
                src: sound08,
                alt: '파워 앰프 전면의 전원 스위치',
                caption: '파워 앰프 1, 2 (YAMAHA PX3 / PX5) — 각 전원 스위치',
              },
            ],
          },
        ],
      },
      { kind: 'heading', text: '사용 및 음량 조절' },
      {
        kind: 'bullets',
        items: [
          {
            text: 'PC와 마이크 볼륨을 서서히 올려 주세요. 갑자기 높이면 하울링이나 큰 소리가 발생할 수 있습니다.',
          },
          { text: '메인 홀 스피커에서 소리가 적당한 크기로 나오는지 확인합니다.' },
        ],
      },
      { kind: 'heading', text: '퇴실 시 전원 끄기' },
      {
        kind: 'text',
        body: '켤 때와 반대 순서입니다.',
      },
      {
        kind: 'steps',
        items: [
          {
            label: '하단 앰프 먼저 — ',
            text: '파워 앰프 1, 2의 전원을 가장 먼저 끕니다. 스피커 출력을 먼저 차단하는 순서입니다.',
          },
          { label: '중단 · 상단 장비 — ', text: '마이크 수신기와 믹서 전원을 끕니다.' },
          { label: 'PC 마지막 — ', text: '메인 PC를 시스템 종료합니다.' },
        ],
      },
      {
        kind: 'note',
        title: '주의',
        body: [
          '앰프의 볼륨 조절 노브와 세부 설정 버튼은 이미 맞춰져 있습니다. 전원 버튼 외에는 임의로 변경하지 말아 주세요.',
        ],
      },
    ],
  },

  {
    slug: 'bar',
    title: '바 공간 비품 및 식기류',
    summary: '가전과 일회용품 위치, 사용 후 분리배출 방법.',
    blocks: [
      { kind: 'heading', text: '가전 및 일회용품 비치 장소' },
      {
        kind: 'bullets',
        items: [
          { label: '가전 — ', text: '냉장고, 정수기 등 비치된 가전은 자유롭게 이용하실 수 있습니다.' },
        ],
      },
      {
        kind: 'figure',
        src: route03,
        alt: '냉장고와 정수기, 싱크대를 갖춘 바 공간',
      },
      {
        kind: 'bullets',
        items: [
          {
            label: '일회용품 — ',
            text: '일회용 컵, 접시, 수저 등은 바 테이블 아래 수납장에 준비되어 있습니다. 필요하신 만큼 자유롭게 사용해 주세요.',
          },
        ],
      },
      {
        kind: 'figure',
        src: bar01,
        alt: '바 테이블 아래 수납장에 정리된 일회용 컵과 접시, 수저',
      },
      { kind: 'heading', text: '사용 후 정리 수칙' },
      {
        kind: 'bullets',
        items: [
          {
            text: '설거지는 하지 않으셔도 됩니다. 사용하신 일회용품은 남은 음식물과 내용물을 먼저 비워 주세요.',
          },
          {
            text: '내용물을 비운 일회용품은 엘리베이터 옆 쓰레기통에 재활용품 · 종이 · 일반 쓰레기로 분리배출해 주세요.',
          },
        ],
      },
      {
        kind: 'figure',
        src: bar02,
        alt: '엘리베이터 옆에 나란히 놓인 분리배출용 쓰레기통',
      },
      {
        kind: 'bullets',
        items: [
          {
            text: '남은 음식물은 음식물 쓰레기 전용 봉투에 담아 1층 스타벅스 매장 옆 음식물 쓰레기통에 배출해 주세요.',
          },
        ],
      },
      {
        kind: 'figure',
        src: bar03,
        alt: '건물 1층 스타벅스 매장 옆에 비치된 음식물 쓰레기통',
      },
    ],
  },

  {
    slug: 'hvac',
    title: '에어컨 및 제습기 사용법',
    summary: '리모컨 위치와 권장 온도. 제습기는 상시 가동 중입니다.',
    blocks: [
      { kind: 'heading', text: '위치' },
      {
        kind: 'bullets',
        items: [
          {
            label: '에어컨 — ',
            text: '메인 홀에 2대, 프로젝트룸에 1대 설치되어 있습니다. 리모컨은 바 공간에 1개 비치되어 있고, 이 하나로 전체 조작이 가능합니다.',
          },
        ],
      },
      { kind: 'figure', src: hvac01, alt: '천장에 매립된 시스템 에어컨 송풍구' },
      {
        kind: 'bullets',
        items: [
          {
            label: '제습기 — ',
            text: '메인 홀과 프로젝트룸에 각각 설치되어 있습니다. 쾌적한 환경을 위해 상시 가동과 물통 관리를 운영진이 진행하고 있으니, 별도 조작 없이 이용해 주시면 됩니다.',
          },
        ],
      },
      { kind: 'figure', src: hvac02, alt: '메인 홀 한쪽에 놓인 제습기' },
      { kind: 'heading', text: '에어컨 사용법' },
      { kind: 'figure', src: hvac03, alt: '바 공간에 비치된 시스템 에어컨 리모컨' },
      {
        kind: 'steps',
        items: [
          { label: '전원 켜기 — ', text: '바 공간에 구비된 리모컨으로 에어컨을 켭니다.' },
          { label: '권장 온도 — ', text: '냉방 24~26℃, 난방 20~22℃를 권장합니다.' },
          { label: '개별 조작 — ', text: '메인 홀과 프로젝트룸을 공간별로 따로 조작할 수 있습니다.' },
          { label: '퇴실 시 — ', text: '퇴실 전 반드시 전원을 꺼 주세요.' },
        ],
      },
      { kind: 'heading', text: '제습기 사용법' },
      {
        kind: 'steps',
        items: [
          { label: '가동 — ', text: '습도가 높은 날 쾌적한 환경을 위해 가동해 주세요.' },
          {
            label: '물통 비우기 — ',
            text: '물통이 가득 차 작동이 멈추면(만수 알림) 물통을 비워 주시면 다시 작동합니다.',
          },
        ],
      },
    ],
  },

  {
    slug: 'cctv',
    title: 'CCTV 보안',
    summary: '24시간 녹화되며, 임의 조작은 금지됩니다.',
    blocks: [
      {
        kind: 'bullets',
        items: [
          {
            label: 'CCTV 녹화 — ',
            text: '공간 내 안전, 화재 예방, 방범 및 시설물 훼손 방지를 위해 24시간 CCTV가 녹화되고 있습니다.',
          },
          {
            label: '임의 조작 금지 — ',
            text: '안전을 위한 필수 장치이므로, CCTV 방향을 임의로 돌리거나 가리는 행위는 엄격히 금지합니다.',
          },
        ],
      },
    ],
  },
];


/* ═══════════════  퇴실 안내  ═══════════════ */

const exitPages: GuidePage[] = [
  {
    slug: 'layout',
    title: '자리 배치 및 가구 원상 복구',
    summary: '퇴실 시 돌려놓아야 할 기본 배치.',
    blocks: [
      {
        kind: 'bullets',
        items: [
          {
            label: '원상 복구 — ',
            text: '퇴실 시 사용하신 책상, 의자, 소품 등은 입실 전 기본 배치(초기 세팅 상태)로 모두 돌려놓아 주셔야 합니다.',
          },
        ],
      },
      { kind: 'heading', text: '강의형 · 세미나형' },
      {
        kind: 'figure',
        src: route02,
        alt: '책상과 의자를 강의식으로 배치한 메인 홀 기본 세팅',
      },
      { kind: 'heading', text: '북토크 · 강연형' },
      {
        kind: 'figure',
        src: layout01,
        alt: '책상 없이 의자만 무대를 향해 배치한 북토크 형태의 메인 홀',
      },
    ],
  },

  {
    slug: 'recycling',
    title: '분리수거',
    summary: '쓰레기와 음식물을 어디에 어떻게 버리는지.',
    blocks: [
      { kind: 'heading', text: '엘리베이터 옆 쓰레기통' },
      {
        kind: 'bullets',
        items: [
          { text: '일반쓰레기와 재활용 쓰레기(플라스틱, 병, 종이류) 모두 배출 가능합니다.' },
          { text: '재활용 쓰레기는 플라스틱과 병을 따로 나누지 않고 함께 모아서 버려 주시면 됩니다.' },
        ],
      },
      {
        kind: 'figure',
        src: recycle01,
        alt: '엘리베이터 옆에 종류별로 놓인 쓰레기통',
      },
      { kind: 'heading', text: '실내 휴지통' },
      {
        kind: 'bullets',
        items: [{ text: '공간 실내 휴지통에는 일반쓰레기만 배출해 주세요.' }],
      },
      { kind: 'figure', src: recycle02, alt: '메인 홀에 비치된 실내 휴지통' },
      { kind: 'figure', src: recycle03, alt: '바 공간에 비치된 실내 휴지통' },
      { kind: 'heading', text: '대량 쓰레기' },
      {
        kind: 'bullets',
        items: [
          {
            text: '발생한 쓰레기가 많을 경우, 별도의 대형 쓰레기 봉투에 담아 엘리베이터 옆 쓰레기통 주변에 단정하게 모아 주시기 바랍니다.',
          },
        ],
      },
      { kind: 'heading', text: '음식물 정리' },
      {
        kind: 'bullets',
        items: [
          {
            text: '취식 후 남은 음식물 쓰레기와 잔여물은 직접 수거해 치워 주세요. 음식물 쓰레기는 전용 봉투에 넣어 1층 스타벅스 매장 옆 음식물 쓰레기통에 배출해 주세요.',
          },
        ],
      },
      {
        kind: 'figure',
        src: bar03,
        alt: '건물 1층 스타벅스 매장 옆에 비치된 음식물 쓰레기통',
      },
    ],
  },

  {
    slug: 'checklist',
    title: '퇴실 전 마무리 체크리스트',
    summary: '나가기 전에 하나씩 짚어 보세요.',
    required: true,
    blocks: [
      {
        kind: 'checklist',
        items: [
          '가구 및 소품이 원래 자리에 잘 정리되었나요?',
          '쓰레기 분리배출 및 음식물 정리가 완료되었나요?',
          '에어컨, 제습기, PC 전원을 끄셨나요?',
          '메인 홀 · 프로젝트 룸 · 바(Bar)의 조명 스위치를 모두 끄셨나요?',
          '나가실 때 출입문이 완전히 닫혔는지 밖에서 한 번 더 당겨 확인하셨나요?',
        ],
      },
    ],
  },
];

/* ═══════════════  안전 및 편의  ═══════════════ */

const extraPages: GuidePage[] = [
  {
    slug: 'safety',
    title: '긴급 연락처 및 안전 용품',
    summary: '호스트 연락처, 소화기와 구급상자 위치.',
    blocks: [
      { kind: 'heading', text: '호스트 긴급 연락처' },
      {
        kind: 'text',
        body: '공간 이용 중 기기 작동에 문제가 생기거나 긴급 상황이 발생하면 언제든 연락해 주세요.',
      },
      {
        kind: 'bullets',
        items: [
          { label: '카카오톡 채널 — ', text: '@이씀' },
          { label: '비상 연락처 — ', text: '운영 매니저 010-6899-4417' },
        ],
      },
      { kind: 'heading', text: '소화기' },
      {
        kind: 'bullets',
        items: [
          { text: '화재 대비용 소화기는 프로젝트룸 앞, 프로젝트룸 안, 화장실 복도 앞에 비치되어 있습니다.' },
        ],
      },
      { kind: 'figure', src: safety01, alt: '프로젝트룸 앞에 비치된 소화기' },
      { kind: 'figure', src: safety02, alt: '프로젝트룸 안에 비치된 소화기' },
      { kind: 'figure', src: safety03, alt: '화장실 복도 앞에 비치된 소화기' },
      { kind: 'heading', text: '구급상자' },
      {
        kind: 'bullets',
        items: [
          {
            text: '가벼운 찰과상 등을 위한 구급상자(밴드, 연고 등)는 바(Bar) 공간 오른쪽 수납장에 있습니다.',
          },
        ],
      },
      { kind: 'figure', src: safety04, alt: '바 공간 오른쪽 수납장에 보관된 구급상자' },
    ],
  },

  {
    slug: 'food',
    title: '주변 배달 맛집 및 편의점',
    summary: '호스트가 추천하는 가까운 곳.',
    blocks: [
      { kind: 'heading', text: '배달 맛집' },
      {
        kind: 'text',
        body: '공간에서 함께 먹기 좋은, 국물 없는 메뉴 위주로 골랐습니다.',
      },
      {
        kind: 'link',
        label: '더피자보이즈 홍대입구역점',
        href: 'https://maps.google.com/?cid=2356130181912528518',
        lines: [
          { label: '메뉴 — ', text: '피자' },
          {
            label: '추천 이유 — ',
            text: '홍대 로컬 피자 맛집. 네 가지 맛을 한 번에 나눠 먹기 좋은 사각 쿼터 피자와 푸짐한 토핑으로 모임 배달에 알맞습니다.',
          },
        ],
      },
      {
        kind: 'link',
        label: '비엔누아즈리 리에',
        href: 'https://map.naver.com/p/search/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98/place/1288026099',
        lines: [
          { label: '메뉴 — ', text: '핑거푸드 · 샌드위치' },
          {
            label: '추천 이유 — ',
            text: '매일 아침 구워내는 크로아상 샌드위치와 바삭한 파이지에 부드러운 필링이 들어간 에그타르트가 시그니처. 국물 없이 깔끔하게 나눠 먹기 좋은 페이스트리 맛집입니다.',
          },
        ],
      },
      {
        kind: 'note',
        body: [
          '국물류와 냄새가 심한 음식(마라탕, 찌개류 등)은 반입이 불가하니 배달 주문 시 참고해 주세요.',
        ],
      },
      { kind: 'heading', text: '가장 가까운 편의점' },
      {
        kind: 'link',
        label: '세븐일레븐 동교스텔라',
        href: 'https://map.naver.com/p/entry/place/2002886482',
        lines: [{ label: '위치 — ', text: '스타벅스 옆, 도보 1분 거리' }],
      },
    ],
  },
];


/** 목차에서 묶어 보여주는 단위. URL은 평평하게 유지한다(/guide/<slug>). */
export const guideGroups = [
  { title: '공간 안내 및 수칙', pages: spacePages },
  { title: '기기 및 시설 사용법', pages: devicePages },
  { title: '퇴실 안내', pages: exitPages },
  { title: '안전 및 편의', pages: extraPages },
];

export const guidePages: GuidePage[] = guideGroups.flatMap((group) => group.pages);

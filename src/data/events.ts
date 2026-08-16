/**
 * Past-event archive. Ported from design/ISSEUM Events.dc.html renderVals().
 * Events are authored; the gallery tiles are derived by flattening `shots`,
 * exactly as the export did — 6 events → 23 tiles.
 */

export const EVENT_CATEGORIES = ['전체', '공연', '브랜드 행사', '촬영', '강연 · 모임'] as const;
export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export type PastEvent = {
  date: string;
  category: Exclude<EventCategory, '전체'>;
  title: string;
  shots: string[];
  /** Indices into `shots` that are video rather than stills. */
  videos: number[];
};

export const events: PastEvent[] = [
  {
    date: '2026. 06. 14.',
    category: '공연',
    title: '심야 라이브 세션 〈이씀의 밤〉',
    shots: ['무대 전경', '관객석', '리허설', '바 영역', '조명 세팅'],
    videos: [0],
  },
  {
    date: '2026. 05. 02.',
    category: '브랜드 행사',
    title: '프래그런스 시즌 쇼케이스',
    shots: ['전경', '제품 디스플레이', '프레스 존', '웰컴 데스크'],
    videos: [],
  },
  {
    date: '2026. 03. 21.',
    category: '촬영',
    title: '패션 룩북 스튜디오 촬영',
    shots: ['촬영 세팅', '스타일링 룸', '자연광', '비하인드'],
    videos: [3],
  },
  {
    date: '2026. 02. 08.',
    category: '강연 · 모임',
    title: '크리에이터 라운드테이블 vol.4',
    shots: ['발표 장면', '좌석 배치', '다과 테이블', 'Q&A'],
    videos: [],
  },
  {
    date: '2025. 12. 13.',
    category: '브랜드 행사',
    title: '연말 팝업 스토어 오픈 나이트',
    shots: ['입구 사이니지', '팝업 진열', '네트워킹'],
    videos: [],
  },
  {
    date: '2025. 11. 09.',
    category: '공연',
    title: '어쿠스틱 살롱 콘서트',
    shots: ['공연 전경', '객석 반응', '무대 디테일'],
    videos: [1],
  },
];

export type Tile = {
  id: string;
  date: string;
  category: Exclude<EventCategory, '전체'>;
  title: string;
  shot: string;
  isVideo: boolean;
  slot: string;
  bigSlot: string;
  /** Row span drives masonry height; fixed by index so it is deterministic. */
  span: number;
  colSpan: number;
};

export const tiles: Tile[] = events.flatMap((event, ei) =>
  event.shots.map((shot, si) => {
    const isVideo = event.videos.includes(si);
    return {
      id: `${ei + 1}-${si + 1}`,
      date: event.date,
      category: event.category,
      title: event.title,
      shot,
      isVideo,
      slot: `${ei + 1}-${si + 1}${isVideo ? ' VIDEO' : ' PHOTO'}`,
      bigSlot: `${event.title} — ${shot}${isVideo ? ' (1920×1080, mp4)' : ' (2000×1330)'}`,
      span: si === 0 ? 22 : si % 3 === 1 ? 14 : 17,
      colSpan: si === 0 ? 2 : 1,
    };
  })
);

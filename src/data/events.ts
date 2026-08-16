/**
 * Past-event archive.
 *
 * Photos are DISCOVERED FROM DISK, not listed here. Drop files into
 *
 *     src/assets/events/<slug>/01.jpg, 02.jpg, …
 *
 * and they appear in the gallery, sorted by filename. Nothing to keep in sync.
 * This file holds only what a filename can't express: date, category, title.
 *
 * An event whose folder is empty (or missing) falls back to `shots` — the
 * placeholder hatch captions — so the page stays coherent before real
 * photography lands.
 */

import type { ImageMetadata } from 'astro';

export const EVENT_CATEGORIES = ['전체', '공연', '브랜드 행사', '촬영', '강연 · 모임'] as const;
export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export type PastEvent = {
  date: string;
  category: Exclude<EventCategory, '전체'>;
  title: string;
  /** Folder name under src/assets/events/. Photos are read from it. */
  slug: string;
  /** Optional per-file caption, keyed by filename: { '01.jpg': '무대 전경' }. */
  captions?: Record<string, string>;
  /** Placeholder captions used only while the folder has no real photos. */
  shots?: string[];
  /** Indices into `shots` that render a play badge. Placeholder mode only. */
  videos?: number[];
};

export const events: PastEvent[] = [
  {
    date: '2026. 06. 14.',
    category: '공연',
    title: '심야 라이브 세션 〈이씀의 밤〉',
    slug: '2026-06-14_이씀의밤',
    shots: ['무대 전경', '관객석', '리허설', '바 영역', '조명 세팅'],
    videos: [0],
  },
  {
    date: '2026. 05. 02.',
    category: '브랜드 행사',
    title: '프래그런스 시즌 쇼케이스',
    slug: '2026-05-02_프래그런스쇼케이스',
    shots: ['전경', '제품 디스플레이', '프레스 존', '웰컴 데스크'],
  },
  {
    date: '2026. 03. 21.',
    category: '촬영',
    title: '패션 룩북 스튜디오 촬영',
    slug: '2026-03-21_패션룩북촬영',
    shots: ['촬영 세팅', '스타일링 룸', '자연광', '비하인드'],
    videos: [3],
  },
  {
    date: '2026. 02. 08.',
    category: '강연 · 모임',
    title: '크리에이터 라운드테이블 vol.4',
    slug: '2026-02-08_크리에이터라운드테이블',
    shots: ['발표 장면', '좌석 배치', '다과 테이블', 'Q&A'],
  },
  {
    date: '2025. 12. 13.',
    category: '브랜드 행사',
    title: '연말 팝업 스토어 오픈 나이트',
    slug: '2025-12-13_연말팝업오픈나이트',
    shots: ['입구 사이니지', '팝업 진열', '네트워킹'],
  },
  {
    date: '2025. 11. 09.',
    category: '공연',
    title: '어쿠스틱 살롱 콘서트',
    slug: '2025-11-09_어쿠스틱살롱',
    shots: ['공연 전경', '객석 반응', '무대 디테일'],
    videos: [1],
  },
];

/* ------------------------------------------------------------------ */
/* Disk discovery                                                      */
/* ------------------------------------------------------------------ */

// Vite requires a literal pattern here, so the folder layout is fixed by
// convention rather than configurable.
const photoModules = import.meta.glob('../assets/events/*/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, ImageMetadata>;

type DiscoveredPhoto = { file: string; src: ImageMetadata };

const photosBySlug = new Map<string, DiscoveredPhoto[]>();

for (const [path, src] of Object.entries(photoModules)) {
  const match = path.match(/\/events\/([^/]+)\/([^/]+)$/);
  if (!match) continue;
  const [, slug, file] = match;
  const list = photosBySlug.get(slug) ?? [];
  list.push({ file, src });
  photosBySlug.set(slug, list);
}

// Numeric-aware so 10.jpg sorts after 9.jpg rather than after 1.jpg.
for (const list of photosBySlug.values()) {
  list.sort((a, b) => a.file.localeCompare(b.file, 'en', { numeric: true }));
}

/** '2026. 06. 14.' → 20260614, so dates sort without Date parsing. */
const dateKey = (date: string) => Number(date.replace(/\D/g, ''));

/**
 * Newest first, derived rather than assumed — add events in any order and the
 * gallery still leads with the most recent.
 */
export const eventsByNewest: PastEvent[] = [...events].sort(
  (a, b) => dateKey(b.date) - dateKey(a.date)
);

export type Tile = {
  id: string;
  date: string;
  category: Exclude<EventCategory, '전체'>;
  title: string;
  /** Caption / alt detail for this specific shot. */
  shot: string;
  src?: ImageMetadata;
  isVideo: boolean;
  /** Mono caption shown on the placeholder hatch when there's no photo. */
  slot: string;
  bigSlot: string;
  /** Row span drives masonry height; fixed by index so it stays deterministic. */
  span: number;
  colSpan: number;
};

/** First tile of each event is the feature: taller and double-width. */
const spanFor = (i: number) => (i === 0 ? 22 : i % 3 === 1 ? 14 : 17);

export const tiles: Tile[] = eventsByNewest.flatMap((event, ei) => {
  const found = photosBySlug.get(event.slug) ?? [];

  if (found.length > 0) {
    return found.map((photo, si) => ({
      id: `${ei + 1}-${si + 1}`,
      date: event.date,
      category: event.category,
      title: event.title,
      shot: event.captions?.[photo.file] ?? event.title,
      src: photo.src,
      isVideo: false,
      slot: `${ei + 1}-${si + 1} PHOTO`,
      bigSlot: `${event.title} — ${event.captions?.[photo.file] ?? photo.file}`,
      span: spanFor(si),
      colSpan: si === 0 ? 2 : 1,
    }));
  }

  // Placeholder mode — no folder yet.
  return (event.shots ?? []).map((shot, si) => {
    const isVideo = event.videos?.includes(si) ?? false;
    return {
      id: `${ei + 1}-${si + 1}`,
      date: event.date,
      category: event.category,
      title: event.title,
      shot,
      isVideo,
      slot: `${ei + 1}-${si + 1}${isVideo ? ' VIDEO' : ' PHOTO'}`,
      bigSlot: `${event.title} — ${shot}${isVideo ? ' (1920×1080, mp4)' : ' (2000×1330)'}`,
      span: spanFor(si),
      colSpan: si === 0 ? 2 : 1,
    };
  });
});

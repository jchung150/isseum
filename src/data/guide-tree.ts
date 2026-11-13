/**
 * 이용 안내의 뼈대: 블록 종류, 페이지 트리, 트리를 평탄화하는 함수.
 * 문장은 ko/guide.ts와 en/guide.ts가 같은 모양으로 가진다.
 *
 * 페이지는 트리에서 생성된다. 섹션을 더하는 일은 라우팅이 아니라 데이터다.
 * 깊이는 제한이 없고 URL은 평평하게 유지한다(/guide/<slug>/<child>).
 */

import type { ImageMetadata } from 'astro';

export type GuideShot = { src?: ImageMetadata; alt: string; caption?: string };

export type GuideLine = {
  /** 굵게 표시되는 앞머리. 저장소 관례대로 `— `로 끝낸다. */
  label?: string;
  text: string;
  /** 있으면 `text`가 새 창으로 여는 링크가 된다. */
  href?: string;
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
  /** 부모 기준 한 토막. 전체 경로는 조상들을 이어 만든다. 두 언어가 같아야 한다. */
  slug: string;
  title: string;
  /** 목차와 페이지 머리에 붙는 한 줄 설명. */
  summary: string;
  blocks: GuideBlock[];
  /** 한 단계 더 들어가는 하위 페이지. */
  children?: GuidePage[];
};

/** 목차에서 묶는 단위. 분류가 아니라 시점이다: 도착 → 이용 → 퇴실 → 안전. */
export type GuideGroup = { title: string; pages: GuidePage[] };

export type Guide = {
  page: {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    lead: string;
    breadcrumbLabel: string;
    /** 한 단계 위(부모)로 가는 링크. 목차에서는 홈으로 간다. */
    backLabel: string;
    /** 아직 사진이 들어오지 않은 자리에 붙는 캡션 접두어. */
    pendingPrefix: string;
    /** 아래쪽 이전 · 다음 링크 묶음의 이름. */
    pagerLabel: string;
  };
  groups: GuideGroup[];
};

export type GuideEntry = {
  /** `/guide` 아래의 경로. 언어 접두어(/en)는 붙이지 않는다. */
  path: string;
  page: GuidePage;
  /** 목차 번호(01–15). 하위 페이지는 부모 번호를 물려받는다. */
  num: string;
  /** 소속 그룹 제목. */
  group: string;
  /** 루트(이용 안내)를 제외한 조상들. 빵부스러기가 이걸 읽는다. */
  trail: { path: string; title: string }[];
};

/** 트리를 평탄화한다. 라우트와 목차와 이전 · 다음 링크가 같은 결과를 쓴다. */
export function flatten(guide: Guide): GuideEntry[] {
  let n = 0;
  const walk = (
    pages: GuidePage[],
    base: string,
    group: string,
    trail: GuideEntry['trail'],
    num?: string,
  ): GuideEntry[] =>
    pages.flatMap((page) => {
      const path = `${base}/${page.slug}`;
      const own = num ?? String(++n).padStart(2, '0');
      const entry: GuideEntry = { path, page, num: own, group, trail };
      return [entry, ...walk(page.children ?? [], path, group, [...trail, { path, title: page.title }], own)];
    });
  return guide.groups.flatMap((g) => walk(g.pages, '/guide', g.title, []));
}

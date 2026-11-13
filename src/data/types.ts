/**
 * 언어별 문구 모듈이 지켜야 할 모양. ko/와 en/의 같은 이름 모듈은 같은 타입을 가지므로,
 * 한쪽에만 문구를 더하면 빌드(astro check)가 다른 쪽이 빠졌다고 알려 준다.
 */

import type { Guide } from './guide-tree';
import type { PhotoId } from './media';

/** 모든 페이지에 걸리는 문구: 문서 정보, 헤더, 푸터, 문의 채널. */
export type Common = {
  site: {
    /** 브랜드 이름. 한국어는 '이씀', 영어는 'ISSEUM'. */
    name: string;
    /** 검색 결과와 공유 미리보기 설명. */
    description: string;
    /** 홈 <title>과 공유 이미지 alt에 붙는 한 줄. */
    tagline: string;
  };
  skipLink: string;
  header: {
    homeLabel: string;
    navLabel: string;
    menu: { space: string; process: string; faq: string };
    /** 아직 페이지가 없는 메뉴. 링크가 아니라 글자와 배지로 보인다. */
    program: { label: string; soon: string };
    inquire: string;
    /** 다른 언어 페이지로 가는 버튼. label은 화면에 보이는 짧은 글자. */
    langSwitch: { label: string; aria: string };
  };
  /** 홈 맨 위에서 흐르는 공지 한 줄. */
  notice: { region: string; text: string; link: string; close: string };
  channels: { naverTalk: string; kakao: string; newWindow: string };
  footer: {
    /** 손글씨로 쓰는 첫 줄과 굵은 둘째 줄. */
    heading: { hand: string; rest: string };
    cards: {
      naverTalk: { label: string; value: string };
      kakao: { label: string; value: string };
      phone: string;
      email: string;
    };
    business: {
      company: { term: string; value: string };
      representative: { term: string; value: string };
      address: { term: string; value: string };
      registration: { term: string };
    };
    rulesLink: string;
  };
};

export type FaqTable = { caption: string; rows: { label: string; value: string }[] };

export type FaqItem = {
  /** 다른 곳에서 링크로 바로 열 수 있게 붙이는 앵커. */
  id?: string;
  q: string;
  /** 표나 목록 앞의 문단. */
  a: string[];
  table?: FaqTable;
  /** 번호를 붙여 보여 주는 짧은 목록(보유 장비). */
  list?: string[];
  /** 표나 목록 뒤의 문단. */
  after?: string[];
};

export type Home = {
  title: string;
  hero: {
    eyebrow: string;
    /** 제목 첫 줄(손글씨)과 둘째 줄(굵은 고딕). */
    hand: string;
    rest: string;
    lead: string;
    primary: string;
    secondary: string;
    /** 바뀌는 사진 묶음 전체를 설명하는 말. 각 사진은 장식으로 처리한다. */
    photosLabel: string;
  };
  stats: { value: string; label: string }[];
  space: {
    title: string;
    desc: string;
    prev: string;
    next: string;
    prevLabel: string;
    nextLabel: string;
    /** 갤러리 사진의 대체 텍스트. media.ts의 id마다 하나씩. */
    alts: Record<PhotoId, string>;
  };
  process: {
    title: string;
    desc: string;
    /**
     * `{link}` in a body is replaced by an inline link (not a button), e.g. the
     * Naver Booking calendar in step 2.
     */
    steps: { title: string; body: string; link?: { text: string; href: string } }[];
  };
  faq: { title: string; desc: string; items: FaqItem[] };
};


/* ───────── 대관 규정 (/rules, 그리고 /booking 2단계) ───────── */

export type PolicyLine = { label: string; text: string };

export type PolicyItem = {
  title: string;
  lines?: PolicyLine[];
  body?: string;
  /** 이 자리에 환불 등급표와 예외 조항이 들어간다(Rules.refund). */
  refund?: boolean;
};

/** 번호는 저장하지 않는다. 배열 순서에서 계산하므로 항목을 더하거나 빼도 어긋나지 않는다. */
export type PolicyGroup = { id: string; title: string; items: PolicyItem[] };

export type RefundTier = { when: string; rate: string };

export type Rules = {
  page: {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    lead: string;
    /** '최종 개정 2026. 10. 24.' — 날짜는 facts.ts의 RULES_REVISED에서 만든다. */
    revised: string;
    tocLabel: string;
    inquire: { naverTalk: string; kakao: string };
    toTop: string;
  };
  groups: PolicyGroup[];
  refund: { id: string; title: string; tiers: RefundTier[]; exceptions: PolicyLine[] };
};

/** 404. The header menu already offers every way out, so the page only adds a home button. */
export type NotFound = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lead: string;
  home: string;
};

export type Content = { common: Common; home: Home; rules: Rules; guide: Guide; notFound: NotFound };

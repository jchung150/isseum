/**
 * 언어와 무관한 사실. 숫자 · 기간 · 비율처럼 한국어 페이지와 영어 페이지가 같은 값을
 * 써야 하는 것은 전부 여기 하나에만 둔다. 각 언어의 문구 모듈(ko/*, en/*)은 이 값을
 * 읽어 문장을 만들 뿐 숫자를 다시 적지 않는다 — 다시 적으면 한쪽만 고쳐지는 날이 온다.
 *
 * 소유자만 아는 값이다. 바꿀 때는 소유자에게 확인할 것.
 */

/** 최소 이용 시간. 폼 검증(api/booking.ts)도 이 값을 강제한다. */
export const MIN_HOURS = 3;

/** 메인 홀 최대 수용 인원. */
export const MAX_GUESTS = 90;

/** 프로젝트 룸 최대 인원. */
export const PROJECT_ROOM_MAX = 10;

/** 대관 가능 시간(시). */
export const OPEN_HOUR = 8;
export const CLOSE_HOUR = 22;

/** 이 일수 이상 연속 이용하면 장기 대관으로 따로 견적한다. */
export const LONG_TERM_DAYS = 14;

/** 이용 시간을 넘기면 이 단위로 추가 요금이 붙는다. 금액은 아직 정해지지 않았다(CLAUDE.md 남은 일 4). */
export const OVERTIME_STEP_MINUTES = 30;

/** 건물 기계식 주차장 대수. */
export const PARKING_SPACES = 5;

/** 이용 매뉴얼을 보내는 시점(이용 시작 몇 시간 전). */
export const MANUAL_LEAD_HOURS = 1;

/**
 * 공간 면적. 평은 소유자가 정한 홍보 기준(2026-11-16)이고, ㎡는 그 환산값(1평 = 3.3058㎡)이지
 * 실측이 아니다. 한국어 페이지는 평만, 영어 페이지는 ㎡만 보여준다.
 */
export const AREA = { sqm: 298, pyeong: 90 } as const;

/**
 * 시간당 요금(부가세 포함, 전체 대관). 금요일은 주말 요금이다 — 대관 수요가
 * 금요일 저녁부터 주말과 같아서다. 라벨은 언어 모듈이 붙인다.
 */
export const RATES = [
  { id: 'weekday', price: 140_000 },
  { id: 'weekend', price: 170_000 },
] as const;

export type RateId = (typeof RATES)[number]['id'];

/**
 * 취소 환불 등급. `daysBefore` 이상 남았을 때 `percent`만큼 돌려준다.
 * 마지막 등급(0%)은 "그 날짜부터 당일까지"를 뜻한다.
 */
export const REFUND_TIERS = [
  { daysBefore: 8, percent: 100 },
  { daysBefore: 7, percent: 70 },
  { daysBefore: 6, percent: 60 },
  { daysBefore: 5, percent: 50 },
  { daysBefore: 4, percent: 40 },
  { daysBefore: 3, percent: 30 },
  { daysBefore: 2, percent: 0 },
] as const;

export type RefundTierFact = (typeof REFUND_TIERS)[number];

/** 대관 규정 최종 개정일. 규정 문장을 고치면 함께 바꾼다. */
export const RULES_REVISED = { year: 2026, month: 10, day: 24 } as const;

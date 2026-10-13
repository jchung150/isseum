/**
 * 대관 요금.
 *
 * One module, three consumers: the #price table on the home page, the 대관료
 * answer in the FAQ, and the rate line under /booking's time picker. Nothing
 * copies a figure out of here — see CLAUDE.md §"One constant, never two
 * literals".
 *
 * Amounts are stored as numbers and formatted here, and the 최소 N시간 column
 * multiplies by MIN_HOURS from booking.ts, so the minimum-hours rule and the
 * total printed under it can never drift apart.
 *
 * 부가세: every figure here is VAT-inclusive, which is how the owner quotes.
 *
 * 할인율은 쓰지 않는다. 게시가가 정상가의 정확히 50%이긴 하지만(280,000 →
 * 140,000 · 340,000 → 170,000), 정상가로 돌아갈 때 '인상'으로 읽힐 여지를 남기지
 * 않으려고 정상가와 특가 두 숫자만 나란히 보여준다. 소유자 결정.
 */

import { business } from '../config/site';
import { LONG_TERM_DAYS, MIN_HOURS } from './booking';

/** 1234567 → '1,234,567원' */
const won = (n: number) => `${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;

const unit = '시간당';

type RateInput = {
  id: string;
  /** 표의 구분 열. */
  label: string;
  /** 한 줄 안에 들어가야 할 때 쓰는 짧은 형태 — 구분자 `·`와 부딪히지 않는다. */
  short: string;
  /** 적용 요일. */
  when: string;
  /** 정상가 (시간당) */
  list: number;
  /** 오픈 기념 특가 (시간당) */
  price: number;
};

/*
 * 금요일은 주말 요금이다. 대관 수요는 금요일 저녁부터 주말과 같아서, 흔히 쓰는
 * '평일 = 월–금'과 다르다. 그래서 라벨도 '평일' 대신 '주중'이라 쓰고, 요일이
 * 따라붙지 않는 /booking 한 줄(short)에는 요일 범위를 직접 넣는다.
 */
const rateInputs: RateInput[] = [
  {
    id: 'weekday',
    label: '주중',
    short: '주중(월–목)',
    when: '월요일 – 목요일',
    list: 280_000,
    price: 140_000,
  },
  {
    id: 'weekend',
    label: '주말 · 공휴일',
    short: '주말(금–일)·공휴일',
    when: '금요일 · 토요일 · 일요일 · 공휴일',
    list: 340_000,
    price: 170_000,
  },
];

export const rates = rateInputs.map((rate) => ({
  ...rate,
  listLabel: won(rate.list),
  priceLabel: won(rate.price),
  /** FAQ 한 줄 요약. 같은 숫자를 다시 쓰지 않으려고 여기서 만든다. */
  summary: `${unit} ${won(rate.price)}`,
}));

export const pricing = {
  /** 표 위 배너. */
  promo: '오픈 기념 특가',
  unit,
  /** 표의 열 제목. 모바일에서는 같은 문자열이 각 셀 앞 라벨로 붙는다. */
  columns: {
    kind: '구분',
    list: '정상가',
    now: '오픈 특가',
  },
  /** 표 설명 — 화면에는 보이지 않고 스크린 리더에만 읽힌다. */
  caption: '주중(월–목)과 주말(금–일)·공휴일의 시간당 대관 요금',
  /** BulletList가 그대로 받는 `label — text` 줄. 라벨 끝의 `— `는 이 저장소 관례. */
  notes: [
    {
      label: '부가세 — ',
      text: '표기된 금액은 부가세(VAT)가 포함된 시간당 요금입니다.',
    },
    {
      label: '최소 이용 — ',
      text: `대관은 최소 ${MIN_HOURS}시간부터 신청하실 수 있습니다.`,
    },
    {
      label: '전체 대관 — ',
      text: '메인 홀 · 프로젝트 룸 · 파우더 룸 · 바 전 영역과 보유 장비 전체를 함께 이용하시며, 프로젝트 룸 등 일부 공간만 단독으로 대관하지는 않습니다.',
    },
    {
      label: '이용 시간 — ',
      text: '대관 시간에는 준비와 철수(정리) 시간이 모두 포함되며, 이용 시간을 초과할 경우 30분 단위로 추가 요금이 부과됩니다.',
    },
    {
      label: '장기 대관 — ',
      text: `연속 ${LONG_TERM_DAYS}일 이상 이용은 별도로 안내해 드리니 전화(${business.phone}) 또는 이메일(${business.email})로 문의해 주세요.`,
    },
    {
      label: '특가 적용 — ',
      text: '오픈 기념 특가는 별도 공지 시까지 적용됩니다.',
    },
    {
      label: '결제 — ',
      text: '최종 금액과 결제 방법은 신청 내용을 확인한 뒤 호스트가 안내드립니다.',
    },
  ] as { label: string; text: string }[],
};

/** /booking 시간 선택 아래 한 줄. */
export const bookingRateNote = `${rates
  .map((rate) => `${rate.short} ${rate.summary}`)
  .join(' · ')} (부가세 포함)`;

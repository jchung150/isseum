/**
 * /booking — 대관 예약 신청서. Every string the page renders lives here.
 *
 * Ordered the way the visitor meets it:
 *   제약 → 페이지 → STEP 01 기본 정보 → STEP 02 이용 규정 동의 → STEP 03 추가 옵션
 *   → STEP 04 개인정보 동의 → STEP 05 신청 내용 확인 → 제출 · 완료 → 안내 문구
 *
 * The rental policy used to live in its own `rules.ts`. It was folded in here
 * because the booking form is the only page that renders it in full — the home
 * page FAQ takes nothing but `refundSection.tiers` — and splitting the copy for
 * one step across two files was the odd one out.
 *
 * Prices: only the add-on prices the owner authored are shown. The base hourly
 * rate is deliberately NOT on the site — it will be surfaced separately later —
 * so the form never computes a total. Final amounts are quoted on reply.
 */

/* ══════════════════════════  제약  ══════════════════════════ */

// 숫자는 facts.ts가 가진다. 영어 페이지도 같은 값을 읽어야 해서 옮겼고, 기존
// 소비처(api/booking.ts, faq, pricing)가 깨지지 않도록 여기서 다시 내보낸다.
import { MAX_GUESTS, MIN_HOURS } from './facts';
export { CLOSE_HOUR, LONG_TERM_DAYS, MAX_GUESTS, MIN_HOURS, OPEN_HOUR } from './facts';

/* ══════════════════════════  페이지  ══════════════════════════ */

export const page = {
  title: '대관 예약 신청',
  description:
    '이씀 대관 예약 신청서. 기본 정보와 이용 규정 동의, 추가 옵션을 작성해 주시면 영업일 기준 1일 내에 회신드립니다.',
  eyebrow: 'BOOKING REQUEST',
  lead: '아래 내용을 작성해 주시면 영업일 기준 1일 내에 담당자가 연락드립니다. 최종 금액과 예약 확정은 확인 후 안내됩니다.',
};

/** Turnstile requires JS, so the form as a whole does. Shown in `<noscript>`. */
export const noscript = {
  title: '이 신청서는 자바스크립트가 필요합니다.',
  body: '브라우저에서 자바스크립트를 허용하시거나, 아래로 직접 연락해 주시면 동일하게 접수해 드립니다.',
};

export const steps = [
  { id: 'basic', label: '기본 정보' },
  { id: 'rules', label: '이용 규정 동의' },
  { id: 'options', label: '추가 옵션' },
  { id: 'privacy', label: '개인정보 동의' },
  { id: 'review', label: '신청 내용 확인' },
] as const;

/* ═══════════════════  STEP 01 · 기본 정보  ═══════════════════ */

export const basicStep = {
  eyebrow: 'STEP 01',
  title: '대관 예약자 기본 정보',
  hint: '예약하시는 분의 기본 정보를 입력해 주세요.',
};

export type BasicField = {
  id: string;
  label: string;
  type: 'text' | 'tel' | 'email' | 'date' | 'number';
  required?: boolean;
  autocomplete?: string;
  inputmode?: 'tel' | 'numeric';
  placeholder?: string;
  /**
   * Compiled with the regex `v` flag, where a bare `-` inside a character class
   * throws and the whole attribute is then ignored *silently* — every value
   * validates. Written with String.raw because '\d' in a normal TS string
   * collapses to 'd', which fails the same silent way.
   */
  pattern?: string;
  min?: string;
  max?: number;
};

export const basicFields: BasicField[] = [
  {
    id: 'name',
    label: '성함',
    type: 'text',
    required: true,
    autocomplete: 'name',
    placeholder: '홍길동',
  },
  {
    id: 'org',
    label: '소속',
    type: 'text',
    autocomplete: 'organization',
    placeholder: '소속 단체 (선택)',
  },
  {
    id: 'phone',
    label: '전화번호',
    type: 'tel',
    required: true,
    autocomplete: 'tel',
    inputmode: 'tel',
    pattern: String.raw`0\d{1,2}[\-\s]?\d{3,4}[\-\s]?\d{4}`,
    placeholder: '010-0000-0000',
  },
  {
    id: 'email',
    label: '이메일',
    type: 'email',
    required: true,
    autocomplete: 'email',
    placeholder: 'example@email.com',
  },
  { id: 'date', label: '대관 날짜', type: 'date', required: true },
  {
    id: 'guests',
    label: '총 사용 인원',
    type: 'number',
    required: true,
    inputmode: 'numeric',
    min: '1',
    max: MAX_GUESTS,
    placeholder: '명',
  },
];

export const timeField = {
  label: '대관 시간',
  note: `최소 ${MIN_HOURS}시간`,
  /** Visually hidden — the visible label belongs to the pair, not each select. */
  startLabel: '시작 시간',
  startEmpty: '시작',
  endLabel: '종료 시간',
  endEmpty: '종료',
};

export const purposeField = {
  label: '대관 설명',
  placeholder: '예) 연말 모임, 워크숍, 팝업스토어, NGO 행사, 크리스마스 파티 등',
};

export const referralField = {
  label: '유입 경로',
  note: '복수 선택 가능',
};

export const referralSources = [
  '스페이스클라우드',
  '아워플레이스',
  '구글',
  '네이버',
  '인스타',
  '지인 추천',
  '기타',
] as const;

/* ═════════════════  STEP 02 · 이용 규정 동의  ═════════════════ */

// 규정 본문(번호 붙은 12개 항목, 환불 등급, 벽면 부착 문장)은 ko/rules.ts가 가진다.
// /rules 페이지와 이 폼의 2단계가 같은 데이터를 렌더해야 동의한 내용과 공개된 내용이
// 갈라지지 않는다. 기존 소비처를 위해 여기서 다시 내보낸다.
import { lastRevised, policyGroups, refundSection, wallMounting } from './ko/rules';
export { lastRevised, policyGroups, refundSection, wallMounting };
export type { PolicyGroup, PolicyItem, PolicyLine, RefundTier } from './types';

export const rulesStep = {
  eyebrow: 'STEP 02',
  title: '이용 규정 동의',
  hint: `아래 규정을 확인해 주세요. 최종 개정 ${lastRevised}`,
  regionLabel: '대관 규정 전문',
  consentLabel: '위 대관 규정 및 환불 정책을 모두 확인하였으며, 이에 동의합니다.',
};

/* ═══════════════════  STEP 03 · 추가 옵션  ═══════════════════ */

export const optionsIntro = {
  eyebrow: 'STEP 03',
  title: '추가 옵션 선택 및 비용 안내',
  body: '아래 항목은 선택 시 추가 비용이 발생할 수 있습니다.',
  note: '최종 금액 및 적용 여부는 제출 내용 확인 후 운영자가 문자로 안내드립니다.',
};

export type AddOn = {
  id: string;
  title: string;
  /** Omitted when the option carries no stated charge. */
  price?: string;
  /** Omitted when the title says all there is to say. */
  notes?: string[];
};

export const addOns: AddOn[] = [
  {
    id: 'tax-invoice',
    title: '세금계산서 또는 현금 영수증 발행',
  },
];

export const requestsField = {
  label: '그 외 요청 사항',
  placeholder: '필요한 장비, 세팅 요청, 문의 사항 등을 자유롭게 적어 주세요. (선택)',
};

/* ═════════════════  STEP 04 · 개인정보 동의  ═════════════════ */

/**
 * 개인정보 수집·이용 동의. Retention is 3 years; processing is delegated to
 * Cloudflare (hosting, form handling, notification mail) and Google (the
 * submissions spreadsheet).
 *
 * NOTE: reviewed against general PIPA practice, not by a lawyer. Have it
 * checked before it carries real submissions.
 */
export const privacy = {
  eyebrow: 'STEP 04',
  title: '개인정보 수집·이용 동의',
  regionLabel: '개인정보 수집·이용 동의 전문',
  consentLabel: '개인정보 수집·이용 및 처리위탁에 동의합니다. (필수)',
  intro: '이씀(영준피엠씨)은 대관 예약 신청 처리를 위해 아래와 같이 개인정보를 수집·이용합니다.',
  collection: [
    {
      term: '수집 항목',
      value:
        '성함, 소속(선택), 전화번호, 이메일 주소, 대관 희망 일시, 사용 인원, 대관 목적, 유입 경로',
    },
    {
      term: '이용 목적',
      value: '대관 예약 신청 접수 및 확인, 예약 관련 안내와 회신, 이용 규정 동의 확인, 대관 계약 이행',
    },
    {
      term: '보유 기간',
      value:
        '수집일로부터 3년간 보유한 뒤 지체 없이 파기합니다. 관계 법령에 따라 별도의 보존 의무가 있는 경우 해당 기간 동안 보관합니다.',
    },
  ],
  refusal: '동의를 거부하실 수 있으나, 이 경우 대관 예약 신청이 접수되지 않습니다.',
  delegationTitle: '개인정보 처리업무 위탁',
  delegationIntro: '원활한 예약 처리를 위해 아래와 같이 업무를 위탁하고 있습니다.',
  delegation: [
    { name: 'Cloudflare, Inc.', task: '웹사이트 운영, 예약 신청 처리 및 알림 메일 발송' },
    { name: 'Google LLC', task: '예약 신청 내역 저장 및 관리 (Google Sheets)' },
  ],
  delegationNote: '위탁 업무의 내용이나 수탁자가 변경될 경우 본 안내를 통해 공개합니다.',
  rightsTitle: '정보주체의 권리',
  rights:
    '수집된 개인정보에 대해 열람·정정·삭제·처리정지를 요구하실 수 있습니다. 아래 연락처로 요청하시면 지체 없이 조치합니다.',
  officer: '개인정보 보호책임자 정용철',
};

/* ═════════════════  STEP 05 · 신청 내용 확인  ═════════════════ */

export const reviewStep = {
  eyebrow: 'STEP 05',
  title: '신청 내용 확인',
  /** Split so the button's own name can be emphasised inside the sentence. */
  hint: {
    before: '아래 내용으로 접수됩니다. 수정이 필요하면 각 항목의 ',
    strong: '수정',
    after: '을 눌러 해당 단계로 돌아가세요.',
  },
  editLabel: '수정',
  /** Placeholder in every value cell until the review is filled from the form. */
  pending: '—',
};

/**
 * Field labels for the final review screen. Order here is the order shown, and
 * `step` lets each group link back to the step that owns it.
 */
export const reviewGroups = [
  {
    step: 1,
    title: '기본 정보',
    fields: [
      ['name', '성함'],
      ['org', '소속'],
      ['phone', '전화번호'],
      ['email', '이메일'],
      ['date', '대관 날짜'],
      ['__time', '대관 시간'],
      ['guests', '총 사용 인원'],
      ['purpose', '대관 설명'],
      ['referral', '유입 경로'],
    ] as [string, string][],
  },
  {
    step: 2,
    title: '이용 규정 동의',
    fields: [['agreeRules', '규정 동의']] as [string, string][],
  },
  {
    step: 3,
    title: '추가 옵션',
    fields: [
      ['addons', '선택한 옵션'],
      ['requests', '요청 사항'],
    ] as [string, string][],
  },
  {
    step: 4,
    title: '개인정보 동의',
    fields: [['agreePrivacy', '수집·이용 및 처리위탁 동의']] as [string, string][],
  },
];

/** How a live form value is worded on the review screen. */
export const reviewValues = {
  agreed: '동의함',
  declined: '미동의',
  none: '선택 없음',
  empty: '입력 없음',
  separator: ' · ',
  guests: (n: string) => `${n}명`,
  time: (start: string, end: string, hours: string) => `${start} ~ ${end} (${hours}시간)`,
};

/* ═══════════════════════  제출 · 완료  ═══════════════════════ */

/** Real people never fill this; the label exists only for screen readers. */
export const honeypotLabel = '웹사이트';

export const nav = {
  prev: '이전',
  next: '다음',
  submit: '예약 신청 제출',
  submitting: '전송 중…',
  /**
   * 제출이 길어질 때 버튼 라벨을 순서대로 교체한다. `after`는 제출 시점부터의
   * 경과 밀리초.
   *
   * 서버는 한 번의 요청 안에서 Turnstile → 이메일 → 시트를 처리하지만 그 경계는
   * 브라우저가 알 수 없다. 그래서 이 문구들은 진행 단계를 주장하지 않고 "아직
   * 처리 중"이라는 사실만 전한다 — 알 수 없는 진행률을 숫자로 꾸며내지 않기 위한
   * 선택이다.
   */
  submittingStages: [
    { after: 1500, label: '접수 처리 중…' },
    { after: 5000, label: '조금만 기다려 주세요…' },
  ] as { after: number; label: string }[],
};

export const success = {
  eyebrow: 'REQUEST RECEIVED',
  title: '예약 신청이 접수되었습니다.',
  body: '영업일 기준 1일 내에 담당자가 연락드립니다. 최종 금액과 예약 확정은 확인 후 안내됩니다.',
  /** The phone number is a link, so the sentence is split around it. */
  urgent: { before: '급하신 경우 ', after: ' 으로 연락 주세요.' },
  home: '홈으로',
};

/* ═══════════════════════  안내 문구  ═══════════════════════ */

/**
 * 을/를 — depends on whether the last syllable carries a final consonant.
 * Lives with the copy because it is a property of the sentences below.
 */
const eul = (word: string) => {
  const last = word.charCodeAt(word.length - 1) - 0xac00;
  return last >= 0 && last <= 11171 && last % 28 !== 0 ? '을' : '를';
};

/**
 * Validation copy. The browser's own `validationMessage` follows the *browser's*
 * locale rather than the document's — an English-locale Chrome shows English on
 * a Korean-only site — so every message is written here instead.
 */
export const messages = {
  /** Names each control in a "…을 입력해 주세요" sentence. */
  fieldLabels: {
    name: '성함',
    org: '소속',
    phone: '전화번호',
    email: '이메일',
    date: '대관 날짜',
    guests: '총 사용 인원',
    start: '시작 시간',
    end: '종료 시간',
    purpose: '대관 설명',
    requests: '요청 사항',
  } as Record<string, string>,
  /** Fallback when a control has no entry above. */
  fallbackLabel: '항목',
  /** Consent checkboxes read as an action, not a missing value. */
  consent: {
    agreeRules: '대관 규정 및 환불 정책에 동의해 주세요.',
    agreePrivacy: '개인정보 수집·이용에 동의해 주세요.',
  } as Record<string, string>,

  missing: (label: string, verb: string) => `${label}${eul(label)} ${verb}해 주세요.`,
  invalid: (label: string) => `${label}${eul(label)} 확인해 주세요.`,
  /** `<select>` is chosen, everything else is typed. */
  verbSelect: '선택',
  verbInput: '입력',

  email: '이메일 형식이 올바르지 않습니다. 예) example@email.com',
  phone: '전화번호 형식이 올바르지 않습니다. 예) 010-0000-0000',
  pastDate: '지난 날짜는 선택하실 수 없습니다. 오늘 이후로 정해 주세요.',
  tooManyGuests: (max: string) => `최대 ${max}인까지 신청하실 수 있습니다.`,
  tooFewGuests: '1인 이상 입력해 주세요.',
  numberOnly: '숫자만 입력해 주세요.',
  referralRequired: '유입 경로를 하나 이상 선택해 주세요.',

  endBeforeStart: '종료 시간이 시작 시간보다 늦어야 합니다.',
  tooShort: (hours: string, min: number) =>
    `${hours}시간 — 최소 ${min}시간부터 신청할 수 있습니다.`,
  totalHours: (hours: string) => `총 ${hours}시간`,
  /** Appended to each end-time option: 9:00pm (3시간). */
  optionHours: (hours: string) => `(${hours}시간)`,

  turnstileBlocked:
    '보안 확인을 불러오지 못했습니다. 광고 차단기를 끄거나 새로고침 후 다시 시도해 주세요.',
  turnstileFailed: '보안 확인을 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.',
  turnstileRequired: '보안 확인을 완료해 주세요.',
  submitFailed: '접수에 실패했습니다. 잠시 후 다시 시도해 주세요.',
  /** 이메일 발송이 실패해 접수를 보장할 수 없을 때. 연락처는 config/site.ts가 넘긴다. */
  mailFailed: (phone: string, email: string) =>
    `접수 처리 중 문제가 발생했습니다. ${phone} 또는 ${email}으로 연락해 주세요.`,
  networkFailed: '네트워크 오류로 접수하지 못했습니다. 연결을 확인한 뒤 다시 시도해 주세요.',
};

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

/** Minimum bookable duration, in hours. */
export const MIN_HOURS = 3;

/** Hard capacity of the main hall. */
export const MAX_GUESTS = 90;

/** Business hours, matching the 08–22시 stat on the home page. */
export const OPEN_HOUR = 8;
export const CLOSE_HOUR = 22;

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

export const lastRevised = '2026. 08. 01.';

export const rulesStep = {
  eyebrow: 'STEP 02',
  title: '이용 규정 동의',
  hint: `아래 규정을 확인해 주세요. 최종 개정 ${lastRevised}`,
  regionLabel: '대관 규정 전문',
  consentLabel: '위 대관 규정 및 환불 정책을 모두 확인하였으며, 이에 동의합니다.',
};

/**
 * Rental policy. Ported from design/ISSEUM Rules.dc.html renderVals().
 *
 * Numbering is DERIVED, not stored — the export hardcoded it and drifted:
 * groups ran 01→02→03 then jumped to 05, the TOC listed 4 entries for 5 sections
 * and labelled the last one 04, item 11 did not exist (items went 1–10 then 12),
 * and the header claimed "총 12개 항목" against 11 real items.
 * Deriving means it can't disagree with itself again.
 *
 * An item carries either `lines` (bulleted label + text) or a plain `body`.
 */
export type PolicyLine = { label: string; text: string };
export type PolicyItem = { title: string; lines?: PolicyLine[]; body?: string };
export type PolicyGroup = { id: string; title: string; items: PolicyItem[] };

export const policyGroups: PolicyGroup[] = [
  {
    id: 'before',
    title: '예약 전 필수 확인 사항',
    items: [
      {
        title: '이용 시간 및 인원 안내',
        lines: [
          { label: '이용 시간 — ', text: '대관 시간은 행사 준비 및 철수(정리) 시간을 모두 포함한 시간입니다.' },
          { label: '시간 초과 — ', text: '이용 시간을 초과할 경우, 30분 단위로 추가 요금이 부과됩니다.' },
          { label: '수용 인원 — ', text: '예약 인원을 초과하여 입실할 경우 사전 고지가 필요합니다.' },
        ],
      },
      {
        title: '미성년자 및 반려동물 출입',
        lines: [
          {
            label: '미성년자 이용 — ',
            text: '만 19세 미만은 법정대리인(보호자) 동반 없이 단독으로 공간을 대관 및 이용할 수 없습니다.',
          },
          {
            label: '반려동물 출입 — ',
            text: '시각장애인 안내견을 제외한 모든 반려동물의 출입은 사전 협의 후 가능합니다.',
          },
        ],
      },
      {
        title: '이동 약자 접근성 안내',
        lines: [
          {
            label: '주출입구 — ',
            text: '단차가 없어 휠체어 진입이 원활하며, 엘리베이터를 통해 지하 1층 공간까지 편리하게 이동할 수 있습니다.',
          },
          {
            label: '주차 · 화장실 — ',
            text: '1층 기계식 주차장 옆에 장애인 전용 주차 구역 1면이 마련되어 있으며, 장애인 전용 화장실(남녀 공용)은 건물 1층에 위치합니다.',
          },
        ],
      },
      {
        title: '주차 및 화물 반입 안내',
        lines: [
          {
            label: '주차 안내 — ',
            text: '대관 시 기계식 주차장 기준 최대 5대 주차가 가능합니다. 기계식 주차장 제한 규격이 있어 SUV 등 일부 대형·RV 차량은 입고가 불가할 수 있으며, 방문객 차량은 인근 유료 주차장 이용을 사전에 안내 부탁드립니다.',
          },
          {
            label: '화물 반입 — ',
            text: '대형 디스플레이, 이동식 대형 행거 등 부피가 큰 짐을 반입할 경우 사전 승인을 받아야 합니다.',
          },
        ],
      },
    ],
  },
  {
    id: 'arrival',
    title: '공간 도착 및 이용 안내',
    items: [
      {
        title: '입퇴실 및 출입 안내',
        lines: [
          {
            label: '출입 정보 — ',
            text: '현관 비밀번호 및 상세 이용 안내는 이용 시작 1시간 전에 예약자 연락처로 문자·카카오톡 발송됩니다.',
          },
          {
            label: '정각 입퇴실 — ',
            text: '다음 예약자를 위해 반드시 예약된 시간 정각에 입실 및 퇴실해 주시기 바랍니다. (사전 짐 보관 불가)',
          },
        ],
      },
      {
        title: 'F&B(음식물) 반입 및 취식',
        lines: [
          { label: '반입 제한 — ', text: '공간 내 현장 조리 및 국물류 음식의 반입은 삼가해 주시기 바랍니다. 단, 완제품 형태의 음료 및 다과류만 반입 가능합니다.' },
          {
            label: '뒷정리 — ',
            text: '취식 후 남은 음식물 쓰레기와 잔여물은 직접 수거해 깔끔하게 정리해 주셔야 합니다.',
          },
        ],
      },
      {
        title: '통신 및 음향 · 영상 기기 사용',
        lines: [
          {
            label: 'Wi-Fi — ',
            text: '공간 내 무료 와이파이가 제공되며, 비밀번호는 공간 내부 및 안내 문자를 통해 확인할 수 있습니다.',
          },
          {
            label: '기기 조작 주의 — ',
            text: '빔프로젝터, 마이크, 스피커 등 음향·영상 기기는 제공된 매뉴얼에 따라 주의하여 다뤄 주시기 바랍니다.',
          },
        ],
      },
    ],
  },
  {
    id: 'exit',
    title: '주의사항 및 퇴실 · 정리',
    items: [
      {
        title: '화재 예방 및 안전 관리',
        lines: [
          { label: '절대 금연 — ', text: '건물 전체 및 지하 내부에서는 전자담배를 포함하여 절대 금연입니다.' },
          {
            label: '화기 금지 — ',
            text: '촛불, 캔들, 가스버너, 폭죽 등 화기 및 연막 장비는 어떠한 경우에도 사용이 불가합니다.',
          },
          {
            label: '통행 방해 금지 — ',
            text: '복도·계단 등 공용 공간에서의 대기 및 짐 보관은 제한됩니다. 짐 보관은 대관하신 공간 내부의 창고실을 이용해 주시기 바랍니다.',
          },
        ],
      },
      {
        title: '보안 및 CCTV 작동 안내',
        lines: [
          {
            label: 'CCTV 녹화 — ',
            text: '안전, 화재 예방, 방범 및 시설물 훼손 방지를 위해 24시간 CCTV가 녹화되고 있습니다. 예약 시 CCTV 촬영 및 저장에 동의한 것으로 간주합니다.',
          },
          { label: '임의 조작 금지 — ', text: 'CCTV 방향을 임의로 돌리거나 가리는 행위는 엄격히 금지합니다.' },
        ],
      },
      {
        title: '원상복구 및 쓰레기 분리배출',
        lines: [
          { label: '원상복구 — ', text: '퇴실 시 책상, 의자, 무대 등은 입실 전 기본 배치로 원상 복구해 주셔야 합니다.' },
          {
            label: '벽면 훼손 금지 — ',
            text: '벽면에 테이프, 접착제, 못, 핀 사용은 불가하며, 부착물은 갤러리 와이어 및 전용 점착제(블루택 등)을 제공해 드립니다.',
          },
          {
            label: '손해 배상 — ',
            text: '기자재 파손 및 소품 분실 시 수리비 또는 동일 제품 교체 비용이 청구될 수 있습니다.',
          },
          {
            label: '쓰레기 분리배출 — ',
            text: '행사 중 발생한 일반 쓰레기 및 플라스틱·종이컵은 엘레베이터 옆 쓰레기통에 분리 배출해 주시고, 대량으로 발생한 쓰레기는 별도 봉투에 담아 동일 장소에 배출해 주시기 바랍니다.',
          },
        ],
      },
      {
        // Item 11. It sits here, as the last numbered item, rather than after the
        // refund tiers — the refund section is a table plus exceptions and owns
        // no number, so a numbered item trailing it read as an afterthought.
        title: '안전 관리 및 책임 안내',
        body: '행사 중 발생하는 참여자의 개인 소지품 분실, 도난 및 부주의로 인한 안전사고에 대한 모든 책임은 주최 측(예약자)에게 있습니다.',
      },
    ],
  },
];

/**
 * Severity is encoded by fading text, never by colour. design/COMPONENTS.md §26.
 * The fade is derived from position in the list rather than authored per tier,
 * so adding or removing a tier can't leave the ramp inconsistent.
 *
 * Rendered in full on /booking; the home page FAQ reuses `tiers` alone.
 */
export type RefundTier = { when: string; rate: string };

export const refundSection = {
  id: 'refund',
  title: '취소 및 환불 정책',
  tiers: [
    { when: '이용 8일 전 취소', rate: '100% 환불' },
    { when: '이용 7일 전 취소', rate: '70% 환불' },
    { when: '이용 6일 전 취소', rate: '60% 환불' },
    { when: '이용 5일 전 취소', rate: '50% 환불' },
    { when: '이용 4일 전 취소', rate: '40% 환불' },
    { when: '이용 3일 전 취소', rate: '30% 환불' },
    { when: '이용 2일 전 ~ 당일 취소', rate: '환불 불가' },
  ] as RefundTier[],
  exceptions: [
    {
      label: '결제 직후 취소 예외 — ',
      text: '결제 후 2시간 이내 취소 시 100% 환불 (단, 당일 이용 시간이 경과한 경우 환불 불가)',
    },
    { label: '변경 불가 — ', text: '일정·시간 변경 및 인원 축소로 인한 부분 취소는 별도로 문의해 주시기 바랍니다.' },
    { label: '불가항력 — ', text: '천재지변이나 공간 자체의 심각한 결함으로 이용이 불가한 경우 100% 환불 처리됩니다.' },
  ],
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
  networkFailed: '네트워크 오류로 접수하지 못했습니다. 연결을 확인한 뒤 다시 시도해 주세요.',
};

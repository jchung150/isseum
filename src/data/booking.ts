/**
 * 대관 예약 신청서 content and constraints.
 *
 * Prices: only the add-on prices the owner authored are shown. The base hourly
 * rate is deliberately NOT on the site — it will be surfaced separately later —
 * so the form never computes a total. Final amounts are quoted on reply.
 */

/** Minimum bookable duration, in hours. */
export const MIN_HOURS = 3;

/** Hard capacity of the main hall. */
export const MAX_GUESTS = 90;

/** Business hours, matching the 08–22시 stat on the home page. */
export const OPEN_HOUR = 8;
export const CLOSE_HOUR = 22;

export const steps = [
  { id: 'basic', label: '기본 정보' },
  { id: 'rules', label: '이용 규정 동의' },
  { id: 'options', label: '추가 옵션' },
  { id: 'privacy', label: '개인정보 동의' },
  { id: 'review', label: '신청 내용 확인' },
] as const;

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

export const referralSources = [
  '스페이스클라우드',
  '아워플레이스',
  '네이버',
  '인스타',
  '지인 추천',
  '기타',
] as const;

export type AddOn = {
  id: string;
  title: string;
  /** Omitted when the option carries no stated charge. */
  price?: string;
  notes: string[];
};

export const addOns: AddOn[] = [
  {
    id: 'tax-invoice',
    title: '세금계산서 또는 현금 영수증 발행',
    notes: ['세금계산서 또는 현금 영수증 발행이 필요하신 경우 미리 요청 부탁드립니다.'],
  },
];

export const optionsIntro = {
  title: '추가 옵션 선택 및 비용 안내',
  body: '아래 항목은 선택 시 추가 비용이 발생합니다. 필요한 경우에만 선택해 주세요.',
  note: '최종 금액 및 적용 여부는 제출 내용 확인 후 운영자가 문자로 안내드립니다.',
};

/**
 * 개인정보 수집·이용 동의. Retention is 3 years; processing is delegated to
 * Cloudflare (hosting, form handling, notification mail) and Google (the
 * submissions spreadsheet).
 *
 * NOTE: reviewed against general PIPA practice, not by a lawyer. Have it
 * checked before it carries real submissions.
 */
export const privacy = {
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


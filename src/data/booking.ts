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
] as const;

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
  price: string;
  notes: string[];
};

export const addOns: AddOn[] = [
  {
    id: 'multitrack',
    title: '멀티트랙 녹음',
    price: '100,000원',
    notes: [
      '행사 당일 Logic 기반 멀티트랙 라이브 녹음을 진행해 드립니다.',
      '전문 레코딩 스튜디오(상업 녹음) 품질을 보장하는 형태가 아니라, 현장 라이브 상황에 따른 녹음입니다.',
      '장비 오류나 현장 상황(신호 문제, 케이블·전원·네트워크, 공연 진행 변수 등)으로 녹음 결과에 문제가 발생할 수 있으며, 이 경우 해당 옵션 비용 환불을 기준으로 처리하고 추가 배상은 진행하지 않습니다.',
    ],
  },
  {
    id: 'operator',
    title: '추가 오퍼레이터',
    price: '시간당 20,000원',
    notes: [
      '세팅이 많아 현장 운용 스태프가 필요한 경우',
      '무대 LED 조작 스태프를 자체적으로 준비하기 어려운 경우',
      '행사 진행 중 추가적인 기술 지원이 필요한 경우',
      '대관 시간만큼 추가할 수 있습니다.',
    ],
  },
  {
    id: 'bar',
    title: 'Bar 운영 및 주류 판매',
    price: '무료 (당일 200,000원 이상 구매 시)',
    notes: [
      '이씀에서 서비스 차원으로 운영하는 Bar입니다. 상주 바리스타가 음료 제조 및 결제를 진행합니다.',
      '운영 조건 — 당일 총 구매액 200,000원 이상 시 Bar 운영을 무료로 제공합니다.',
      '진행 방식 — 티켓 기반 프리드링크 또는 관객 현장 직접 결제.',
      '요청하시는 판매 품목이 있다면 사전 문의 부탁드립니다.',
      '당일 재료 상황에 따라 일부 메뉴는 판매가 어려울 수 있습니다.',
      '주류 구매 시 신분증 확인이 필요합니다.',
    ],
  },
  {
    id: 'tax-invoice',
    title: '세금계산서 또는 카드 결제',
    price: '부가세 10% 별도',
    notes: [
      '세금계산서 발행 또는 카드 결제가 필요하신 경우 미리 요청 부탁드립니다.',
      '해당 결제 방식 선택 시 부가세 10%가 별도로 부과됩니다.',
    ],
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
        '성함, 소속(선택), 전화번호, 이메일 주소, 대관 희망 일시, 사용 인원, 대관 목적, 유입 경로, 서명',
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

export const signature = {
  title: '이용 규정 동의 서명',
  body: '위 규정을 확인하셨다면 아래에 서명해 주세요. 마우스나 손가락으로 직접 서명하거나, 성함을 입력하셔도 됩니다.',
  drawLabel: '직접 서명',
  typeLabel: '성함 입력으로 대체',
  clearLabel: '다시 서명',
  /** Canvas drawing is impossible for some users and needs JS; typing is the fallback. */
  fallbackHint: '마우스 사용이 어렵거나 서명이 표시되지 않는 경우 성함을 입력해 주세요.',
};

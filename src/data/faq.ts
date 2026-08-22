/**
 * 자주 묻는 질문.
 *
 * Answers are the same facts as the rental policy, phrased as replies. The
 * refund tiers are NOT copied here — the section renders `refundSection.tiers`
 * straight from rules.ts, so the FAQ and the booking form can never disagree.
 *
 * Two answers absorbed the deleted 공간 특징 section: parking and the basement
 * air-handling point, which had no other home on the page.
 */

export type FaqItem = {
  q: string;
  /** Paragraphs. */
  a: string[];
  /** Renders the refund tier list from rules.ts under the answer. */
  refundTable?: boolean;
};

export const faq: FaqItem[] = [
  {
    q: '예약을 취소하면 환불되나요?',
    a: ['취소 시점에 따라 아래와 같이 환불됩니다.'],
    refundTable: true,
  },
  {
    q: '최소 몇 시간부터 대관할 수 있나요?',
    a: [
      '최소 3시간부터 신청하실 수 있으며, 이용 가능 시간은 08시부터 22시까지입니다.',
      '대관 시간에는 행사 준비와 철수(정리) 시간이 모두 포함됩니다. 이용 시간을 초과할 경우 30분 단위로 추가 요금이 부과됩니다.',
    ],
  },
  {
    q: '몇 명까지 이용할 수 있나요?',
    a: [
      '메인 홀 기준 최대 90인까지 착석 가능합니다. 프로젝트 룸은 최대 10인입니다.',
      '예약 인원을 초과하여 입실할 경우 사전 고지가 필요합니다.',
    ],
  },
  {
    q: '주차가 가능한가요?',
    a: [
      '건물 내 기계식 주차장에 최대 5대까지 주차하실 수 있습니다.',
      '기계식 주차장 규격 제한이 있어 SUV 등 일부 대형·RV 차량은 입고가 어려울 수 있습니다. 방문객 차량은 인근 유료 주차장 이용을 사전에 안내 부탁드립니다.',
      '행사용 대형 짐이나 촬영 장비는 건물 앞 지정 주차 공간을 활용해 편리하게 상하차하실 수 있습니다.',
    ],
  },
  {
    q: '지하 공간인데 답답하지 않나요?',
    a: [
      '급배기 시스템을 갖추고 있어 지하 특유의 답답함과 습도가 없습니다.',
      '메인 홀과 프로젝트 룸은 각각 독립 공조로 운영되어, 행사 내내 쾌적한 공기를 유지합니다.',
    ],
  },
  {
    q: '음식을 가져와도 되나요?',
    a: [
      '완제품 형태의 음료와 다과류는 반입 가능합니다. 다만 공간 내 현장 조리와 국물류 음식 반입은 삼가해 주시기 바랍니다.',
      '취식 후 남은 음식물 쓰레기와 잔여물은 직접 수거해 정리해 주셔야 합니다.',
    ],
  },
  {
    q: '엘리베이터나 휠체어 접근이 가능한가요?',
    a: [
      '주출입구에 단차가 없어 휠체어 진입이 원활하며, 엘리베이터로 지하 1층까지 이동하실 수 있습니다.',
      '1층 기계식 주차장 옆에 장애인 전용 주차 구역 1면이 있으며, 장애인 전용 화장실(남녀 공용)은 건물 1층에 있습니다.',
    ],
  },
  {
    q: '반려동물과 함께 갈 수 있나요?',
    a: ['시각장애인 안내견을 제외한 모든 반려동물의 출입은 사전 협의 후 가능합니다.'],
  },
  {
    q: '미성년자만으로 대관할 수 있나요?',
    a: [
      '만 19세 미만은 법정대리인(보호자) 동반 없이 단독으로 대관 및 이용하실 수 없습니다. 규정 위반 시 환불 없이 퇴실 조치됩니다.',
    ],
  },
];

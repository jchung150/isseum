/**
 * /rules 페이지의 뼈대 문구만 둔다.
 *
 * **규정 본문은 여기 없다.** `booking.ts`의 `policyGroups`와 `refundSection`이
 * 살아 있는 규정이고, 이 페이지와 `/booking`의 2단계가 같은 데이터를 렌더한다.
 * 옮겨 적는 순간 폼에서 동의한 내용과 공개된 내용이 갈라질 수 있어서, 두 벌을
 * 만들지 않는다 — CLAUDE.md §"상수 하나, 리터럴 둘 금지".
 *
 * 항목 번호도 저장하지 않고 배열 순서에서 계산한다.
 */

export const page = {
  title: '대관 규정',
  description:
    '이씀 대관 규정 전문. 이용 시간과 인원, 출입과 반입, 퇴실과 원상복구, 취소 및 환불 정책을 안내합니다.',
  eyebrow: 'RENTAL POLICY',
  heading: '대관 규정',
  lead: '예약 전 반드시 확인해 주시기 바랍니다. 예약 결제가 완료됨과 동시에 본 이용 규정에 모두 동의하신 것으로 간주됩니다.',
  /** 최종 개정일 앞에 붙는 말. 날짜 자체는 booking.ts의 lastRevised가 가진다. */
  revisedLabel: '최종 개정',
  /** 규정을 읽고 바로 신청으로 넘어갈 수 있게. */
  ctaLabel: '대관 예약하기',
};

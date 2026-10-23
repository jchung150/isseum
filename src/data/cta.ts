/**
 * 대관 예약 버튼. 헤더 · /rules · 404가 같은 라벨을 쓴다.
 *
 * 버튼은 네이버 예약(config/site.ts의 bookingUrl)을 새 창으로 연다. 시각적으로는
 * 같은 버튼이라 스크린 리더에만 새 창으로 열린다는 사실을 덧붙인다.
 */
export const bookingCta = {
  label: '대관 예약하기',
  newWindow: '(네이버 예약, 새 창)',
};

/**
 * 예약 문의. 대관 절차의 첫 단계라 헤더의 유일한 버튼이 이것이다 — 예약은 문의로
 * 가능 여부를 들은 뒤에 한다.
 *
 * 헤더 · /rules · 404의 버튼은 네이버 톡톡 하나로 간다. 채널을 고르는 자리는 대관
 * 절차 1단계 카드와 푸터뿐이다.
 */
export const inquiryCta = {
  label: '예약 문의',
  newWindow: '(네이버 톡톡, 새 창)',
  channels: { naverTalk: '네이버 톡톡', kakao: '카카오톡' },
  channelLabel: (name: string) => `${name} 문의`,
  channelNewWindow: '(새 창)',
};

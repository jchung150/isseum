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
 * 문의 채널. 대관 절차의 첫 단계라 헤더의 버튼이 이것들이다 — 예약은 문의로 가능
 * 여부를 들은 뒤에 한다.
 *
 * 버튼에는 채널 이름만 보인다. '문의'는 스크린 리더에만 덧붙인다(srSuffix). 두
 * 이름이 모두 받침 ㄱ으로 끝나서 조사가 '으로' 하나로 맞는다 — 채널을 더하면 확인할 것.
 */
export const inquiryCta = {
  channels: { naverTalk: '네이버 톡톡', kakao: '카카오톡' },
  srSuffix: '으로 문의 (새 창)',
  newWindow: '(새 창)',
};

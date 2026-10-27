/**
 * 푸터 문구. 로고의 aria-label은 헤더와 같은 header.homeLabel을 쓴다.
 *
 * '공식 채널'(인스타그램 · 네이버 블로그) 열은 2026-10-14에 내렸다. 둘 다 운영하지
 * 않는 계정이라 링크를 걸어 두면 방치된 곳으로 사람을 보낸다. 다시 운영하면
 * config/site.ts에 링크를 되살리고 여기 라벨을 더할 것.
 */
export const footer = {
  info: {
    companyName: '상호명',
    representative: '대표자명',
    address: '주소',
    phone: '전화 문의',
    email: '이메일',
    chat: '채팅 문의',
  },
  copyright: (year: number, nameLatin: string) => `© ${year} ${nameLatin}. All rights reserved.`,
  place: 'SEOUL · KOREA',
};

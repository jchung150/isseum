/** 404 문구. 모양은 types.ts의 NotFound. */

import type { NotFound } from '../types';

export const notFound: NotFound = {
  title: '페이지를 찾을 수 없습니다',
  description: '요청하신 페이지를 찾을 수 없습니다.',
  eyebrow: '404 — NOT FOUND',
  heading: '페이지를 찾을 수 없어요',
  lead: '주소가 바뀌었거나 없어진 페이지예요. 아래에서 찾으시는 안내로 가 보세요.',
  home: '처음으로',
  linksLabel: '주요 안내',
  // 이용 안내(/guide)는 대관한 사람에게 건네는 문서라 넣지 않는다(CLAUDE.md §이용 안내).
  links: [
    { label: '공간 안내', path: '/#space' },
    { label: '대관 절차', path: '/#process' },
    { label: '자주 묻는 질문', path: '/#faq' },
    { label: '대관 규정', path: '/rules' },
  ],
};

/**
 * /404 copy. Its own module rather than a corner of home.ts — it is a page of
 * its own, and nothing else renders these strings.
 *
 * The link list under the actions is `footerLinks` from config/site.ts, so it
 * follows the showEventsPage flag without being restated here.
 */

export const notFound = {
  title: '페이지를 찾을 수 없습니다',
  description: '요청하신 페이지를 찾을 수 없습니다.',
  eyebrow: '404 — NOT FOUND',
  headline: '요청하신 페이지를 찾을 수 없습니다.',
  lead: '주소가 변경되었거나 삭제된 페이지일 수 있습니다. 아래에서 원하시는 안내를 찾아보세요.',
  home: '홈으로 돌아가기',
  linksLabel: '주요 안내',
};

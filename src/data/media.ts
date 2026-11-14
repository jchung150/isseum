/**
 * 홈에 쓰는 사진. 파일은 여기서 한 번만 import하고, 대체 텍스트(alt)는 언어별 문구
 * 모듈이 같은 id로 가진다 — 사진을 바꾸면 두 언어의 alt가 모두 타입 오류로 알려 준다.
 *
 * 행사 사진은 참석자 얼굴이 보인다. 2026-11-12 소유자가 게시 동의를 확인했다.
 * 원본은 4000px로 들어오므로 긴 변 2000px로 줄이고 EXIF 회전을 픽셀에 구워 넣은 뒤
 * src/assets/home/에 둔다(CLAUDE.md §함정).
 */

import type { ImageMetadata } from 'astro';

import hall01 from '../assets/isseum_main-hall_01.jpg';
import hall02 from '../assets/isseum_main-hall_02.jpg';
import hall04 from '../assets/isseum_main-hall_04.jpg';
import hall05 from '../assets/isseum_main-hall_05.jpg';
import room01 from '../assets/isseum_project-room_01.jpg';
import room02 from '../assets/isseum_project-room_02.jpg';
import powder from '../assets/isseum_powder-room_01.jpg';
import bar from '../assets/isseum_bar_01.jpg';
import control from '../assets/isseum_control-room_01.jpg';
import hero1 from '../assets/home/hero_20260914_155118.jpg';
import hero2 from '../assets/home/hero_20260914_130847.jpg';
import hero5 from '../assets/home/hero_20260918_133940.jpg';
import hero6 from '../assets/home/hero_20260914_130913.jpg';

export const photos = {
  hallWorkshop: hall01,
  hallWide: hall02,
  hallTheater: hall04,
  hallLounge: hall05,
  roomMeeting: room01,
  roomAngle: room02,
  powder,
  bar,
  control,
} satisfies Record<string, ImageMetadata>;

export type PhotoId = keyof typeof photos;

/**
 * 히어로에서 차례로 바뀌는 사진. 첫 장이 기본으로 깔리고 나머지가 그 위로 겹쳐 나타난다.
 * 소유자가 Affinity에서 보정하고 TV 화면과 정면 얼굴을 흐린 판이다(2026-11-13).
 * 원본 경로: 공유 드라이브 500_행사사진/202609_홍보용사진선택/Edited/.
 * hero_20260914_155211 · hero_20260831_191110은 같은 세미나 장면이 겹쳐 빼 두었다.
 * 파일은 src/assets/home/에 보관만 한다(import하지 않으면 빌드에 들어가지 않는다).
 *
 * 히어로 틀은 4:5라 4:3 사진의 가운데 60% 폭만 보인다. focus는 CSS object-position의
 * 가로 값으로, 연사가 왼쪽 끝에 선 사진이 잘리지 않게 한다. 사진이 장식(alt="")이라
 * 언어별 alt가 없고, 영역 전체에 aria-label 하나가 붙는다(hero.photosLabel).
 */
export const heroPhotos: { src: ImageMetadata; focus: string }[] = [
  { src: hero2, focus: '50%' },
  { src: hero1, focus: '12%' },
  { src: hero5, focus: '50%' },
  { src: hero6, focus: '15%' },
];

/**
 * 공간 안내 갤러리. 세 장씩 넘기므로 3의 배수를 유지할 것.
 * isseum_main-hall_03.jpg는 isseum_bar_01.jpg와 같은 파일이라 빠졌다.
 * 2026-11-13 보정 전 행사 사진(event_*)을 모두 내려 빈 공간 사진 9장만 남았다.
 */
export const galleryPhotos: PhotoId[] = [
  'hallWorkshop', 'hallWide', 'hallTheater',
  'hallLounge', 'roomMeeting', 'roomAngle',
  'powder', 'bar', 'control',
];

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
import eventFull from '../assets/home/event_20260919_141251.jpg';
import eventQa from '../assets/home/event_20260831_195840.jpg';
import eventRoom from '../assets/home/event_20260811_142251.jpg';
import eventPodium from '../assets/home/event_20260918_102056.jpg';
import eventLaptops from '../assets/home/event_20260917_090653.jpg';
import eventGroups from '../assets/home/event_20260912_135605.jpg';
import eventBar from '../assets/home/event_20260914_130913.jpg';
import eventTalk from '../assets/home/event_20260917_111453.jpg';

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
  eventFull,
  eventQa,
  eventRoom,
  eventPodium,
  eventLaptops,
  eventGroups,
  eventBar,
  eventTalk,
} satisfies Record<string, ImageMetadata>;

export type PhotoId = keyof typeof photos;

/** 히어로에서 차례로 바뀌는 사진. 첫 장이 기본으로 깔리고 나머지가 그 위로 겹쳐 나타난다. */
export const heroPhotos: PhotoId[] = ['eventFull', 'eventQa', 'eventRoom', 'eventPodium', 'eventLaptops'];

/**
 * 공간 안내 갤러리. 세 장씩 넘기므로 3의 배수를 유지할 것.
 * isseum_main-hall_03.jpg는 isseum_bar_01.jpg와 같은 파일이라 빠졌고, 그 자리를
 * 세미나 사진(eventTalk)이 채운다.
 */
export const galleryPhotos: PhotoId[] = [
  'hallWorkshop', 'hallWide', 'hallTheater',
  'hallLounge', 'eventTalk', 'eventFull',
  'roomMeeting', 'roomAngle', 'eventRoom',
  'powder', 'bar', 'eventBar',
  'control', 'eventQa', 'eventGroups',
];

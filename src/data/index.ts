/**
 * 언어별 콘텐츠의 입구. 페이지와 컴포넌트는 `content[lang]`으로만 문구를 읽는다.
 *
 *   facts.ts   언어와 무관한 숫자(요금 · 인원 · 시간 · 환불 등급)
 *   media.ts   사진 파일
 *   ko/  en/   그 위에 얹는 문장. 두 폴더의 같은 이름 모듈은 같은 타입(types.ts)이다.
 *
 * 아직 옮기지 않은 페이지(/rules, /guide, /booking, /events, 404)는 src/data/의 기존
 * 한국어 모듈을 그대로 읽는다. 옮길 때 이 표에 더할 것.
 */

import type { Lang } from './i18n';
import type { Content } from './types';
import { common as koCommon } from './ko/common';
import { home as koHome } from './ko/home';
import { common as enCommon } from './en/common';
import { home as enHome } from './en/home';

export const content: Record<Lang, Content> = {
  ko: { common: koCommon, home: koHome },
  en: { common: enCommon, home: enHome },
};

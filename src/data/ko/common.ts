/** 모든 한국어 페이지에 걸리는 문구. 모양은 types.ts의 Common. */

import { business, kakaoChannelUrl } from '../../config/site';
import type { Common } from '../types';

export const common: Common = {
  site: {
    name: '이씀',
    description:
      '홍대입구역 인근 동교동에 위치한 약 60평 규모의 가변형 복합문화공간. 워크숍, 북토크, 팝업스토어, 팬미팅 등 모든 형태의 행사를 지원합니다.',
    tagline: '홍대 복합문화공간 대관',
  },
  skipLink: '본문으로 건너뛰기',
  header: {
    homeLabel: '이씀 처음으로',
    navLabel: '주요 메뉴',
    menu: { space: '공간 안내', process: '대관 절차', faq: 'FAQ' },
    program: { label: '프로그램', soon: '준비 중' },
    inquire: '대관 문의',
    langSwitch: { label: 'EN', aria: 'English page' },
  },
  notice: {
    region: '공지',
    text: '이씀에 오신 것을 환영합니다.',
    link: '대관 문의 →',
    close: '공지 닫기',
  },
  channels: {
    naverTalk: '네이버 톡톡',
    kakao: '카카오톡',
    newWindow: '(새 창)',
  },
  footer: {
    heading: { hand: '모든 형태의 이야기를,', rest: '이곳에서 자유롭게 펼쳐보세요' },
    cards: {
      naverTalk: { label: 'NAVER TALK', value: '네이버 톡톡 →' },
      kakao: { label: 'KAKAOTALK', value: '카카오톡 채널 →' },
      phone: 'PHONE',
      email: 'EMAIL',
    },
    business: {
      company: { term: '상호', value: business.companyName },
      representative: { term: '대표', value: business.representative },
      address: { term: '주소', value: business.address },
      registration: { term: '사업자등록번호' },
    },
  },
};

/** 문장 안에서 채널을 부를 때. 카카오톡 채널을 끄면(null) 문구에서도 빠진다. */
export const channelPhrase = kakaoChannelUrl ? '네이버 톡톡이나 카카오톡으로' : '네이버 톡톡으로';

/**
 * 한국어 홈. 문구는 소유자가 확정한 시안(brand/directions/home.html)을 그대로 옮겼고,
 * 숫자는 facts.ts에서 읽는다. 모양은 types.ts의 Home.
 */

import { bookingUrl, kakaoChannelUrl } from '../../config/site';
import {
  AREA,
  CLOSE_HOUR,
  LONG_TERM_DAYS,
  MANUAL_LEAD_HOURS,
  MAX_GUESTS,
  MIN_HOURS,
  OPEN_HOUR,
  OVERTIME_STEP_MINUTES,
  PARKING_SPACES,
  PROJECT_ROOM_MAX,
  RATES,
} from '../facts';
import { refundSection } from './rules';
import { grouped, pad2 } from '../i18n';
import type { Home } from '../types';
import { channelPhrase } from './common';

const rateLabel = { weekday: '주중 (월–목)', weekend: '주말 (금–일) · 공휴일' } as const;
/** 촬영 · 장기 대관처럼 따로 견적하는 문의를 받는 곳. */
const askAnywhere = `${kakaoChannelUrl ? '톡톡, 카카오톡' : '톡톡'}, 전화 또는 이메일로`;

export const home: Home = {
  title: '홈',
  hero: {
    eyebrow: 'GATHERING SPACE IN SEOUL',
    hand: '이야기가',
    rest: '피어나는 곳',
    lead: `이씀은 홍대입구역 근처에 위치한 약 ${AREA.pyeong}평 규모의 모임 공간입니다. 아이디어를 나누는 워크숍부터 작가와 독자가 교감하는 북토크, 브랜드와 팬이 만나는 팝업스토어와 팬미팅까지. 모든 형태의 이야기를, 이곳에서 자유롭게 펼쳐보세요.`,
    primary: '대관 문의하기',
    secondary: '네이버 예약 바로가기',
    photosLabel: '이씀에서 열린 세미나와 워크숍 장면',
  },
  stats: [
    { value: `약 ${AREA.pyeong}평`, label: '공간 면적' },
    { value: `최대 ${MAX_GUESTS}인`, label: '동시 수용 인원' },
    { value: '4개 영역', label: '메인 홀 · 프로젝트 룸 · 파우더 룸 · 바' },
    { value: `${pad2(OPEN_HOUR)}–${CLOSE_HOUR}시`, label: '대관 가능 시간' },
  ],
  space: {
    title: '공간 안내',
    desc: '강연, 워크숍, 상영, 팝업까지. 행사에 맞춰 테이블과 의자를 자유롭게 배치할 수 있어요. 사진을 넘겨 구성을 확인해 보세요.',
    prev: '← 이전',
    next: '다음 →',
    prevLabel: '이전 사진 3장',
    nextLabel: '다음 사진 3장',
    alts: {
      hallWorkshop: '테이블과 의자를 배치하고 강연대를 세팅한 메인 홀',
      hallWide: '무대와 대형 TV를 갖춘 메인 홀 와이드 전경',
      hallTheater: '극장형으로 좌석을 배치한 메인 홀',
      hallLounge: '소파와 라운지 체어를 배치한 메인 홀 라운지 구성',
      roomMeeting: '회의용 타원 테이블과 소파, 벽걸이 TV가 있는 프로젝트 룸',
      roomAngle: '프로젝트 룸의 다른 각도',
      powder: '조명이 둘러진 화장 거울과 의자가 놓인 파우더 룸',
      bar: '우드 카운터와 싱크대를 갖춘 오픈 바 영역',
      control: '음향 장비가 있는 음향실',
    },
  },
  process: {
    title: '대관 절차',
    desc: '일정을 먼저 확인한 뒤 예약합니다. 문의 없이 예약하신 일정이 다른 대관과 겹치면 전액 환불해 드려요.',
    steps: [
      {
        title: '일정 문의',
        body: `${kakaoChannelUrl ? '네이버 톡톡이나 카카오톡으로' : '네이버 톡톡으로'} 희망 날짜와 시간, 인원, 행사 성격을 남겨 주세요. 담당자가 예약 가능 여부를 안내해 드립니다.`,
      },
      {
        title: '예약 및 결제',
        body: '가능하다는 안내를 받으시면 {link}에서 같은 날짜와 시간으로 예약하고 결제해 주세요.',
        link: { text: '네이버 예약', href: bookingUrl },
      },
      {
        title: '이용 매뉴얼 전송',
        body: `이용 시작 ${MANUAL_LEAD_HOURS}시간 전, 현관 비밀번호와 입퇴실 방법, 장비 사용 안내를 문자로 보내드립니다.`,
      },
      {
        title: '입실 및 이용',
        body: '공간을 이용하신 후 원상복구를 마치고 퇴실하시면 됩니다.',
      },
    ],
  },
  faq: {
    title: '자주 묻는 질문',
    desc: `더 궁금한 점은 ${channelPhrase} 물어봐 주세요.`,
    items: [
      {
        q: '대관료가 얼마인가요?',
        a: [
          `전체 대관 기준 시간당 요금이며, 표기 금액에는 부가세가 포함되어 있습니다. 최소 ${MIN_HOURS}시간부터 이용하실 수 있습니다.`,
        ],
        table: {
          caption: '요일별 시간당 대관 요금',
          rows: RATES.map((rate) => ({ label: rateLabel[rate.id], value: `시간당 ${grouped(rate.price)}원` })),
        },
        after: [
          '메인 홀 · 프로젝트 룸 · 파우더 룸 · 바 전 영역과 보유 장비 전체를 함께 이용하시며, 일부 공간만 단독으로 대관하지는 않습니다.',
          '일정 문의 후 네이버 예약에서 결제해 주세요. 문의 없이 예약하신 일정이 다른 대관과 겹치면 전액 환불해 드립니다.',
        ],
      },
      {
        q: '최소 몇 시간부터 대관할 수 있나요?',
        a: [
          `최소 ${MIN_HOURS}시간부터 신청하실 수 있으며, 이용 가능 시간은 ${pad2(OPEN_HOUR)}시부터 ${CLOSE_HOUR}시까지입니다.`,
          `대관 시간에는 행사 준비와 철수(정리) 시간이 모두 포함됩니다. 이용 시간을 초과할 경우 ${OVERTIME_STEP_MINUTES}분 단위로 추가 요금이 부과됩니다.`,
        ],
      },
      {
        q: '몇 명까지 이용할 수 있나요?',
        a: [
          `메인 홀 기준 최대 ${MAX_GUESTS}인까지 착석 가능합니다. 프로젝트 룸은 최대 ${PROJECT_ROOM_MAX}인입니다. 예약 인원을 초과하여 입실할 경우 사전 고지가 필요합니다.`,
        ],
      },
      {
        q: '예약을 취소하면 환불되나요?',
        a: ['취소 시점에 따라 아래와 같이 환불됩니다.'],
        table: {
          caption: '취소 시점별 환불 비율',
          // 규정(/rules, /booking)과 같은 문장을 그대로 쓴다.
          rows: refundSection.tiers.map((tier) => ({ label: tier.when, value: tier.rate })),
        },
      },
      {
        id: 'equipment',
        q: '어떤 장비를 쓸 수 있나요?',
        a: [
          `아래 장비를 모두 대관 요금 안에서 이용하실 수 있습니다. 사용법은 이용 ${MANUAL_LEAD_HOURS}시간 전에 보내드리는 매뉴얼에 있습니다.`,
        ],
        list: [
          'JBL 6채널 입체 음향 시스템',
          '슈어(SHURE) 무선 마이크',
          '100인치 삼성 스마트 TV',
          '이동형 TV',
          '기본 의자',
          '이동식 다목적 테이블',
          '3인용 소파 & 1인용 라운지 체어',
          '이동식 강연대',
          '스탠드 조명',
          '초고속 Wi-Fi',
        ],
      },
      {
        q: '촬영도 할 수 있나요?',
        a: [
          `네, 가능합니다. 다만 촬영은 참여 인원과 장비, 세트 규모에 따라 특수 청소가 필요할 수 있어 일반 대관과 요금이 달라질 수 있습니다. 촬영 일정과 내용, 인원을 ${askAnywhere} 먼저 알려 주시면 요금을 안내해 드리겠습니다.`,
        ],
      },
      {
        q: '장기간 대관도 가능한가요?',
        a: [
          `연속 ${LONG_TERM_DAYS}일 이상의 장기 대관은 일정과 이용 목적에 맞춰 별도로 안내해 드립니다. ${askAnywhere} 먼저 문의해 주세요.`,
        ],
      },
      {
        q: '음식을 가져와도 되나요?',
        a: [
          '완제품 형태의 음료와 다과류는 반입 가능합니다. 다만 공간 내 현장 조리와 국물류 음식 반입은 삼가해 주시기 바랍니다.',
          '취식 후 남은 음식물 쓰레기와 잔여물은 직접 수거해 정리해 주셔야 합니다.',
        ],
      },
      {
        q: '주차가 가능한가요?',
        a: [
          `건물 내 기계식 주차장에 최대 ${PARKING_SPACES}대까지 주차하실 수 있습니다.`,
          '기계식 주차장 규격 제한이 있어 SUV 등 일부 대형·RV 차량은 입고가 어려울 수 있습니다. 방문객 차량은 인근 유료 주차장 이용을 사전에 안내 부탁드립니다.',
          '행사용 대형 짐이나 촬영 장비는 건물 앞 지정 주차 공간을 활용해 편리하게 상하차하실 수 있습니다.',
        ],
      },
      {
        q: '지하 공간인데 답답하지 않나요?',
        a: [
          '급배기 시스템을 갖추고 있어 지하 특유의 답답함과 습도가 없습니다.',
          '메인 홀과 프로젝트 룸은 각각 독립 공조로 운영되어, 행사 내내 쾌적한 공기를 유지합니다.',
        ],
      },
      {
        q: '엘리베이터나 휠체어 접근이 가능한가요?',
        a: [
          '주출입구에 단차가 없어 휠체어 진입이 원활하며, 엘리베이터로 지하 1층까지 이동하실 수 있습니다.',
          '1층 기계식 주차장 옆에 장애인 전용 주차 구역 1면이 있으며, 장애인 전용 화장실(남녀 공용)은 건물 1층에 있습니다.',
        ],
      },
      {
        q: '반려동물과 함께 갈 수 있나요?',
        a: ['시각장애인 안내견을 제외한 모든 반려동물의 출입은 사전 협의 후 가능합니다.'],
      },
    ],
  },
};

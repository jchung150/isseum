/** The four areas of the venue. Ported from design/ISSEUM Main.dc.html renderVals().spaces. */

export type Space = {
  num: string;
  name: string;
  slot: string;
  desc: string;
  meta: string;
};

export const spaces: Space[] = [
  {
    num: '01',
    name: '메인 홀',
    slot: '메인 홀 (1200×1500)',
    desc: '대형 TV와 자유로운 가구 배치가 가능한 메인 행사 공간. 공연, 상영, 브랜드 쇼케이스까지 폭넓게 소화합니다.',
    meta: '132㎡ · 최대 90인 · 독립 공조',
  },
  {
    num: '02',
    name: '프로젝트 룸',
    slot: '프로젝트 룸 (1200×1500)',
    desc: '미팅, 소모임, 출연자 대기실로 활용 가능한 프라이빗 룸. 독립 조명과 도어록으로 분리 운영됩니다.',
    meta: '26㎡ · 최대 10인 · 독립 공조',
  },
  {
    num: '03',
    name: '파우더 룸',
    slot: '분장실 (1200×1500)',
    desc: '거울과 조명이 갖춰진 준비 공간. 연사와 출연자의 메이크업, 의상 교체, 리허설 대기 용도로 사용합니다.',
    meta: '12㎡ · 조명 거울 · 행거 비치',
  },
  {
    num: '04',
    name: '바(Bar)',
    slot: '바 영역 (1200×1500)',
    desc: '음료 제공 및 네트워킹을 위한 오픈 바 공간. 케이터링 반입과 간단한 조주 세팅이 가능합니다.',
    meta: '18㎡ · 싱크 · 냉장 설비',
  },
];

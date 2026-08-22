/**
 * Rental policy. Ported from design/ISSEUM Rules.dc.html renderVals().
 *
 * Numbering is DERIVED, not stored — the export hardcoded it and drifted:
 * groups ran 01→02→03 then jumped to 05, the TOC listed 4 entries for 5 sections
 * and labelled the last one 04, item 11 did not exist (items went 1–10 then 12),
 * and the header claimed "총 12개 항목" against 11 real items.
 * Deriving means it can't disagree with itself again.
 */

export type PolicyLine = { label: string; text: string };
export type PolicyItem = { title: string; lines: PolicyLine[] };
export type PolicyGroup = { id: string; title: string; items: PolicyItem[] };

export const lastRevised = '2026. 08. 01.';

export const intro = {
  eyebrow: 'RENTAL POLICY & GUIDE',
  headline: '이씀 대관 규정 및 이용 안내',
  body: '예약 전 반드시 아래의 대관 규정을 확인해 주시기 바랍니다.',
  emphasis: '예약 결제가 완료됨과 동시에 본 이용 규정에 모두 동의하신 것으로 간주됩니다.',
};

export const policyGroups: PolicyGroup[] = [
  {
    id: 'before',
    title: '예약 전 필수 확인 사항',
    items: [
      {
        title: '이용 시간 및 인원 안내',
        lines: [
          { label: '이용 시간 — ', text: '대관 시간은 행사 준비 및 철수(정리) 시간을 모두 포함한 시간입니다.' },
          { label: '시간 초과 — ', text: '이용 시간을 초과할 경우, 30분 단위로 추가 요금이 부과됩니다.' },
          { label: '수용 인원 — ', text: '예약 인원을 초과하여 입실할 경우 사전 고지가 필요합니다.' },
        ],
      },
      {
        title: '미성년자 및 반려동물 출입',
        lines: [
          {
            label: '미성년자 이용 — ',
            text: '만 19세 미만은 법정대리인(보호자) 동반 없이 단독으로 공간을 대관 및 이용할 수 없습니다. 규정 위반 시 환불 없이 퇴실 조치됩니다.',
          },
          {
            label: '반려동물 출입 — ',
            text: '시각장애인 안내견을 제외한 모든 반려동물의 출입은 사전 협의 후 가능합니다.',
          },
        ],
      },
      {
        title: '이동 약자 접근성 안내',
        lines: [
          {
            label: '주출입구 — ',
            text: '단차가 없어 휠체어 진입이 원활하며, 엘리베이터를 통해 지하 1층 공간까지 편리하게 이동할 수 있습니다.',
          },
          {
            label: '주차 · 화장실 — ',
            text: '1층 기계식 주차장 옆에 장애인 전용 주차 구역 1면이 마련되어 있으며, 장애인 전용 화장실(남녀 공용)은 건물 1층에 위치합니다.',
          },
        ],
      },
      {
        title: '주차 및 화물 반입 안내',
        lines: [
          {
            label: '주차 안내 — ',
            text: '대관 시 기계식 주차장 기준 최대 5대 주차가 가능합니다. 기계식 주차장 제한 규격이 있어 SUV 등 일부 대형·RV 차량은 입고가 불가할 수 있으며, 방문객 차량은 인근 유료 주차장 이용을 사전에 안내 부탁드립니다.',
          },
          {
            label: '화물 반입 — ',
            text: '대형 디스플레이, 이동식 대형 행거 등 부피가 큰 짐을 반입할 경우 사전 승인을 받아야 합니다.',
          },
        ],
      },
    ],
  },
  {
    id: 'arrival',
    title: '공간 도착 및 이용 안내',
    items: [
      {
        title: '입퇴실 및 출입 안내',
        lines: [
          {
            label: '출입 정보 — ',
            text: '현관 비밀번호 및 상세 이용 안내는 이용 시작 1시간 전에 예약자 연락처로 문자·카카오톡 발송됩니다.',
          },
          {
            label: '정각 입퇴실 — ',
            text: '다음 예약자를 위해 반드시 예약된 시간 정각에 입실 및 퇴실해 주시기 바랍니다. (사전 짐 보관 불가)',
          },
        ],
      },
      {
        title: 'F&B(음식물) 반입 및 취식',
        lines: [
          { label: '반입 제한 — ', text: '공간 내 현장 조리 및 국물류 음식의 반입은 삼가해 주시기 바랍니다.' },
          { label: '허용 품목 — ', text: '완제품 형태의 음료 및 다과류만 반입 가능합니다.' },
          {
            label: '뒷정리 — ',
            text: '취식 후 남은 음식물 쓰레기와 잔여물은 직접 수거해 깔끔하게 정리해 주셔야 합니다.',
          },
        ],
      },
      {
        title: '통신 및 음향 · 영상 기기 사용',
        lines: [
          {
            label: 'Wi-Fi — ',
            text: '공간 내 무료 와이파이가 제공되며, 비밀번호는 공간 내부 및 안내 문자를 통해 확인할 수 있습니다.',
          },
          {
            label: '기기 조작 주의 — ',
            text: '빔프로젝터, 마이크, 스피커 등 음향·영상 기기는 제공된 매뉴얼에 따라 주의하여 다뤄 주시고, 케이블을 임의로 뽑거나 설정을 변경하지 마세요.',
          },
        ],
      },
    ],
  },
  {
    id: 'exit',
    title: '주의사항 및 퇴실 · 정리',
    items: [
      {
        title: '화재 예방 및 안전 관리',
        lines: [
          { label: '절대 금연 — ', text: '건물 전체 및 지하 내부에서는 전자담배를 포함하여 절대 금연입니다.' },
          {
            label: '화기 금지 — ',
            text: '촛불, 캔들, 가스버너, 폭죽 등 화기 및 연막 장비는 어떠한 경우에도 사용이 불가합니다.',
          },
          {
            label: '통행 방해 금지 — ',
            text: '복도·계단 등 공용 공간에서의 대기 및 짐 보관은 제한됩니다. 방문객 대기와 짐 보관은 대관하신 공간 내부를 이용해 주시기 바랍니다.',
          },
        ],
      },
      {
        title: '보안 및 CCTV 작동 안내',
        lines: [
          {
            label: 'CCTV 녹화 — ',
            text: '안전, 화재 예방, 방범 및 시설물 훼손 방지를 위해 24시간 CCTV가 녹화되고 있습니다. 예약 시 CCTV 촬영 및 저장에 동의한 것으로 간주합니다.',
          },
          { label: '임의 조작 금지 — ', text: 'CCTV 방향을 임의로 돌리거나 가리는 행위는 엄격히 금지합니다.' },
        ],
      },
      {
        title: '원상복구 및 쓰레기 분리배출',
        lines: [
          { label: '원상복구 — ', text: '퇴실 시 책상, 의자, 무대 등은 입실 전 기본 배치로 원상 복구해 주셔야 합니다.' },
          {
            label: '벽면 훼손 금지 — ',
            text: '벽면에 테이프, 접착제, 못, 핀 사용은 절대 불가하며, 부착물은 갤러리 와이어 및 전용 점착제(블루택)만 허용됩니다.',
          },
          {
            label: '손해 배상 — ',
            text: '기자재 파손 및 소품 분실 시 수리비 또는 동일 제품 교체 비용이 청구될 수 있습니다.',
          },
          {
            label: '쓰레기 분리배출 — ',
            text: '행사 중 발생한 일반 쓰레기 및 플라스틱·종이컵은 지정된 방식에 따라 분리 배출해 주시고, 대량으로 발생한 쓰레기는 별도 봉투에 담아 쓰레기통 옆에 배출해 주시기 바랍니다.',
          },
        ],
      },
    ],
  },
];

/**
 * Severity is encoded by fading text, never by colour. design/COMPONENTS.md §26.
 * The fade is derived from position in the list rather than authored per tier,
 * so adding or removing a tier can't leave the ramp inconsistent.
 */
export type RefundTier = { when: string; rate: string };

export const refundSection = {
  id: 'refund',
  title: '취소 및 환불 정책',
  tiers: [
    { when: '이용 8일 전 취소', rate: '100% 환불' },
    { when: '이용 7일 전 취소', rate: '70% 환불' },
    { when: '이용 6일 전 취소', rate: '60% 환불' },
    { when: '이용 5일 전 취소', rate: '50% 환불' },
    { when: '이용 4일 전 취소', rate: '40% 환불' },
    { when: '이용 3일 전 취소', rate: '30% 환불' },
    { when: '이용 2일 전 ~ 당일 취소', rate: '환불 불가' },
  ] as RefundTier[],
  exceptions: [
    {
      label: '결제 직후 취소 예외 — ',
      text: '결제 후 2시간 이내 취소 시 100% 환불 (단, 당일 이용 시간이 경과한 경우 환불 불가)',
    },
    { label: '변경 불가 — ', text: '일정·시간 변경 및 인원 축소로 인한 부분 취소는 별도로 문의해 주시기 바랍니다.' },
    { label: '불가항력 — ', text: '천재지변이나 공간 자체의 심각한 결함으로 이용이 불가한 경우 100% 환불 처리됩니다.' },
  ],
  closingItem: {
    title: '안전 관리 및 책임 안내',
    body: '행사 중 발생하는 참여자의 개인 소지품 분실, 도난 및 부주의로 인한 안전사고에 대한 모든 책임은 주최 측(예약자)에게 있습니다.',
  },
};

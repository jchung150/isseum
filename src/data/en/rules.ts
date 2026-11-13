/**
 * Rental terms in English. A translation of ko/rules.ts with the same 12 items in
 * the same order (numbering is derived from position, so the two stay aligned).
 * Facts come from facts.ts. The Korean text is the binding version; the English
 * page says so in its lead.
 */

import {
  MANUAL_LEAD_HOURS,
  OVERTIME_STEP_MINUTES,
  PARKING_SPACES,
  REFUND_TIERS,
  RULES_REVISED,
} from '../facts';
import type { PolicyGroup, Rules } from '../types';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** 'October 24, 2026' */
export const lastRevised = `${MONTHS[RULES_REVISED.month - 1]} ${RULES_REVISED.day}, ${RULES_REVISED.year}`;

/** Wall-mounting rule. Shared by rule 10 and the guide's "Protect the walls". */
export const wallMounting =
  'Tape, glue, nails and pins may not be used on the walls. Only gallery wire and removable adhesive putty (Blu Tack) are allowed, and we can provide both if you arrange it in advance.';

const policyGroups: PolicyGroup[] = [
  {
    id: 'before',
    title: 'Before you book',
    items: [
      {
        title: 'Rental hours and capacity',
        lines: [
          { label: 'Rental time — ', text: 'Your booked time includes setting up and clearing away.' },
          {
            label: 'Overtime — ',
            text: `If you stay past your booked time, an extra charge applies in ${OVERTIME_STEP_MINUTES}-minute blocks.`,
          },
          { label: 'Capacity — ', text: 'Please tell us in advance if more people will attend than you booked for.' },
        ],
      },
      {
        title: 'Minors and pets',
        lines: [
          {
            label: 'Minors — ',
            text: 'Anyone under 19 may not rent or use the space without a parent or legal guardian. If this rule is broken, you will be asked to leave without a refund.',
          },
          {
            label: 'Pets — ',
            text: 'Apart from guide dogs, pets are allowed only by prior arrangement.',
          },
        ],
      },
      {
        title: 'Accessibility',
        lines: [
          {
            label: 'Main entrance — ',
            text: 'The entrance is step-free for wheelchairs, and an elevator takes you down to the basement floor.',
          },
          {
            label: 'Parking and restroom — ',
            text: 'There is one accessible parking space next to the mechanical car park on the ground floor, and an accessible all-gender restroom on the ground floor of the building.',
          },
        ],
      },
      {
        title: 'Parking and deliveries',
        lines: [
          {
            label: 'Parking — ',
            text: `Up to ${PARKING_SPACES} cars can use the mechanical car park during your rental. Because of its size limits, some SUVs and other large vehicles may not fit, so please point your guests to paid car parks nearby.`,
          },
          {
            label: 'Large items — ',
            text: 'Bulky items such as large displays or big rolling racks need our approval before you bring them in.',
          },
        ],
      },
    ],
  },
  {
    id: 'arrival',
    title: 'Arriving and using the space',
    items: [
      {
        title: 'Check-in, check-out and entry',
        lines: [
          {
            label: 'Entry details — ',
            text: `The door code and detailed instructions are sent by text message to the booker ${MANUAL_LEAD_HOURS} hour before your booking starts.`,
          },
          {
            label: 'On-time check-in and check-out — ',
            text: 'Please check in and out exactly at your booked times, for the sake of the next guests. (We cannot store items before your booking.)',
          },
        ],
      },
      {
        title: 'Food and drink',
        lines: [
          {
            label: 'What you can bring — ',
            text: 'Please do not cook on site or bring soups and other liquid dishes. Only packaged drinks and snacks may be brought in.',
          },
          {
            label: 'Clearing up — ',
            text: 'Please take away all leftover food and waste yourself and leave the space clean.',
          },
        ],
      },
      {
        title: 'Wi-Fi and audio-visual equipment',
        lines: [
          {
            label: 'Wi-Fi — ',
            text: 'Free Wi-Fi is available. The password is posted inside the venue and included in the text message we send you.',
          },
          {
            label: 'Handle with care — ',
            text: 'Please use projectors, microphones, speakers and other AV equipment carefully as described in the manual we provide, and do not unplug cables or change settings.',
          },
        ],
      },
    ],
  },
  {
    id: 'exit',
    title: 'Precautions and checking out',
    items: [
      {
        title: 'Fire prevention and safety',
        lines: [
          {
            label: 'No smoking — ',
            text: 'Smoking, including e-cigarettes, is not allowed anywhere in the building or the basement.',
          },
          {
            label: 'No open flames — ',
            text: 'Candles, gas burners, fireworks and other open flames or smoke machines may not be used under any circumstances.',
          },
          {
            label: 'Keep walkways clear — ',
            text: 'Waiting or leaving items in shared areas such as corridors and stairs is not allowed. Please use the storage room inside the space you rented.',
          },
        ],
      },
      {
        title: 'Security and CCTV',
        lines: [
          {
            label: 'CCTV recording — ',
            text: 'CCTV records 24 hours a day for safety, fire prevention, crime prevention and to protect the facilities. By booking, you agree to being recorded and to the recordings being stored.',
          },
          {
            label: 'Do not tamper — ',
            text: 'Turning or covering the CCTV cameras is strictly prohibited.',
          },
        ],
      },
      {
        title: 'Restoring the space and recycling',
        lines: [
          {
            label: 'Put things back — ',
            text: 'When you leave, return the tables, chairs and stage to the layout they were in when you arrived.',
          },
          { label: 'Protect the walls — ', text: wallMounting },
          {
            label: 'Damage — ',
            text: 'If equipment is damaged or items go missing, you may be charged for repair or replacement with the same product.',
          },
          {
            label: 'Sorting waste — ',
            text: 'Sort general waste, plastics and paper cups from your event into the bins next to the elevator. Put any large amount of waste in separate bags and leave them in the same place.',
          },
        ],
      },
    ],
  },
  {
    id: 'liability',
    title: 'Terms and responsibility',
    items: [
      { title: 'Cancellation and refunds', refund: true },
      {
        title: 'Safety and responsibility',
        body: 'The organizer (the person who booked) is fully responsible for any loss or theft of attendees’ belongings and for any accident caused by carelessness during the event.',
      },
    ],
  },
];

const refundSection: Rules['refund'] = {
  id: 'refund',
  title: 'Cancellation and refunds',
  tiers: REFUND_TIERS.map((tier, i, all) => ({
    when:
      i === 0
        ? `${tier.daysBefore}+ days before`
        : i === all.length - 1
          ? `${tier.daysBefore} days before to the day itself`
          : `${tier.daysBefore} days before`,
    rate: tier.percent > 0 ? `${tier.percent}% refund` : 'No refund',
  })),
  exceptions: [
    {
      label: 'Right after payment — ',
      text: 'Cancel within 2 hours of paying for a full refund (not available once the booked time on the day has passed).',
    },
    {
      label: 'Changes — ',
      text: 'For changes to the date or time, or a partial cancellation because fewer people are coming, please contact us.',
    },
    {
      label: 'After your rental starts — ',
      text: 'Once your booked time has started, unused time is not refunded or moved to another date, even if you leave early or your event ends early.',
    },
    {
      label: 'Force majeure — ',
      text: 'If the space cannot be used because of a natural disaster or a serious fault with the space itself, you get a full refund.',
    },
  ],
};

export const rules: Rules = {
  page: {
    title: 'Rental terms',
    description:
      'Full rental terms for ISSEUM: hours and capacity, entry and deliveries, checking out and restoring the space, and the cancellation and refund policy.',
    eyebrow: 'RENTAL POLICY',
    heading: 'Rental terms',
    lead: 'Please read these before you book. Completing payment means you agree to all of these terms. This is a translation; if it differs from the Korean version, the Korean version applies.',
    revised: `Last revised ${lastRevised}`,
    tocLabel: 'Contents',
    inquire: { naverTalk: 'Ask on Naver TalkTalk', kakao: 'Ask on KakaoTalk' },
    toTop: 'Back to top',
  },
  groups: policyGroups,
  refund: refundSection,
};

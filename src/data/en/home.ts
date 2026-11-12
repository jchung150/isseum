/**
 * English home. A translation of ko/home.ts, written for visitors from abroad:
 * same facts (read from facts.ts), same order, same shape (types.ts → Home).
 */

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
  REFUND_TIERS,
} from '../facts';
import { grouped } from '../i18n';
import type { Home } from '../types';
import { askAnywhere, channelPhrase } from './phrases';

const rateLabel = {
  weekday: 'Weekdays (Mon–Thu)',
  weekend: 'Weekends (Fri–Sun) & public holidays',
} as const;

/** 8 → '8 AM', 22 → '10 PM'. */
const clock = (h: number) => `${h % 12 || 12} ${h < 12 ? 'AM' : 'PM'}`;

export const home: Home = {
  title: 'Home',
  hero: {
    eyebrow: 'MULTI CULTURAL SPACE IN SEOUL',
    hand: 'A place where',
    rest: 'stories bloom',
    lead: `ISSEUM is a flexible multipurpose venue of about ${AREA.sqm}㎡, a short walk from Hongik Univ. Station. From workshops where ideas are shared and book talks that bring authors and readers together, to pop-up stores and fan meetings where brands meet their fans: bring every kind of story here and tell it your way.`,
    primary: 'Send an inquiry',
    secondary: 'Explore the space',
    photosLabel: 'Seminars and workshops held at ISSEUM',
  },
  stats: [
    { value: `${AREA.sqm}㎡`, label: 'Main hall floor area' },
    { value: `Up to ${MAX_GUESTS}`, label: 'Guests at once' },
    { value: '4 areas', label: 'Main hall · Project room · Powder room · Bar' },
    { value: `${clock(OPEN_HOUR)}–${clock(CLOSE_HOUR)}`, label: 'Rental hours' },
  ],
  space: {
    title: 'The space',
    desc: 'Talks, workshops, screenings and pop-ups. Tables and chairs move freely to suit your event. Browse the photos to see the setups.',
    prev: '← Prev',
    next: 'Next →',
    prevLabel: 'Previous 3 photos',
    nextLabel: 'Next 3 photos',
    alts: {
      hallWorkshop: 'Main hall set with tables, chairs and a lectern',
      hallWide: 'Wide view of the main hall with its stage and large TV',
      hallTheater: 'Main hall with chairs in theater rows',
      hallLounge: 'Main hall arranged as a lounge with sofas and armchairs',
      roomMeeting: 'Project room with an oval meeting table, sofa and wall-mounted TV',
      roomAngle: 'Another view of the project room',
      powder: 'Powder room with a lit vanity mirror and chairs',
      bar: 'Open bar area with a wooden counter and sink',
      control: 'Sound booth with audio equipment',
      eventFull: 'A seminar with the main hall full of attendees',
      eventQa: 'An attendee asking a question at a seminar in the main hall',
      eventRoom: 'People meeting over laptops in the project room',
      eventPodium: 'A speaker presenting at the lectern',
      eventLaptops: 'Attendees following a lecture on their laptops',
      eventGroups: 'A workshop with people seated in groups at each table',
      eventBar: 'Coffee and snacks laid out on the bar counter',
      eventTalk: 'A speaker with a microphone lecturing in front of the large TV screen',
    },
  },
  process: {
    title: 'How to book',
    desc: 'Check the date with us first, then book. If you book without asking and the date clashes with another rental, we refund you in full.',
    steps: [
      {
        title: 'Ask about dates',
        body: `Message us ${channelPhrase} with your preferred date and time, number of guests and type of event. We will let you know whether it is available.`,
      },
      {
        title: 'Book and pay',
        body: 'Once we confirm, book and pay for the same date and time.',
      },
      {
        title: 'Get the guide',
        body: `${MANUAL_LEAD_HOURS} hour before your booking starts, we text you the door code, how to check in and out, and how to use the equipment.`,
      },
      {
        title: 'Check in and enjoy',
        body: 'When your event is over, put the space back the way you found it and check out.',
      },
    ],
  },
  faq: {
    title: 'FAQ',
    desc: `Anything else? Ask us ${channelPhrase}.`,
    items: [
      {
        q: 'How much does it cost?',
        a: [
          `Rates are per hour for the whole venue and include VAT. The minimum booking is ${MIN_HOURS} hours.`,
        ],
        table: {
          caption: 'Hourly rates by day of the week',
          rows: RATES.map((rate) => ({ label: rateLabel[rate.id], value: `₩${grouped(rate.price)} per hour` })),
        },
        after: [
          'Every booking includes the main hall, project room, powder room, bar and all equipment. We do not rent individual rooms on their own.',
          'Once we have confirmed your date, please pay through Naver Booking. If you book without asking first and the date clashes with another rental, we refund you in full.',
        ],
      },
      {
        q: 'What is the minimum booking?',
        a: [
          `The minimum is ${MIN_HOURS} hours, any time between ${clock(OPEN_HOUR)} and ${clock(CLOSE_HOUR)}.`,
          `Your booked time includes setting up and clearing away. If you stay past it, an extra charge applies in ${OVERTIME_STEP_MINUTES}-minute blocks.`,
        ],
      },
      {
        q: 'How many people can it hold?',
        a: [
          `The main hall seats up to ${MAX_GUESTS}. The project room seats up to ${PROJECT_ROOM_MAX}. Please tell us in advance if more people will come than you booked for.`,
        ],
      },
      {
        q: 'Can I get a refund if I cancel?',
        a: ['Refunds depend on when you cancel.'],
        table: {
          caption: 'Refund by cancellation date',
          rows: REFUND_TIERS.map((tier, i, all) => ({
            label:
              i === 0
                ? `${tier.daysBefore}+ days before`
                : i === all.length - 1
                  ? `${tier.daysBefore} days before to the day itself`
                  : `${tier.daysBefore} days before`,
            value: tier.percent > 0 ? `${tier.percent}% refund` : 'No refund',
          })),
        },
      },
      {
        id: 'equipment',
        q: 'What equipment is included?',
        a: [
          `Everything below comes with the rental at no extra cost. Instructions are in the guide we send ${MANUAL_LEAD_HOURS} hour before your booking.`,
        ],
        list: [
          'JBL 6-channel surround sound system',
          'Shure wireless microphones',
          '100-inch Samsung smart TV',
          'Mobile TV',
          'Standard chairs',
          'Movable multipurpose tables',
          '3-seater sofa & lounge armchairs',
          'Movable lectern',
          'Floor lamps',
          'High-speed Wi-Fi',
        ],
      },
      {
        q: 'Can I hold a photo or video shoot?',
        a: [
          `Yes. Shoots may need special cleaning depending on the crew, equipment and set, so the rate can differ from a regular rental. Tell us the date, what you plan to shoot and how many people via ${askAnywhere}, and we will quote you a price.`,
        ],
      },
      {
        q: 'Can I book for a longer period?',
        a: [
          `For ${LONG_TERM_DAYS} or more consecutive days, we arrange terms around your schedule and purpose. Please contact us first via ${askAnywhere}.`,
        ],
      },
      {
        q: 'Can I bring food?',
        a: [
          'Packaged drinks and snacks are welcome. Please do not cook on site or bring soups and other liquid dishes.',
          'Please take away all leftover food and waste yourself.',
        ],
      },
      {
        q: 'Is there parking?',
        a: [
          `The building's mechanical car park holds up to ${PARKING_SPACES} cars.`,
          'Because of its size limits, some SUVs and other large vehicles may not fit. Please point your guests to paid car parks nearby.',
          'For large event items or filming gear, you can load and unload at the designated spot in front of the building.',
        ],
      },
      {
        q: 'It is underground. Is it stuffy?',
        a: [
          'A supply and exhaust ventilation system keeps out the stuffiness and damp you might expect underground.',
          'The main hall and project room each have their own climate control, so the air stays fresh throughout your event.',
        ],
      },
      {
        q: 'Is there an elevator and wheelchair access?',
        a: [
          'The main entrance is step-free for wheelchairs, and an elevator goes down to the basement floor.',
          'There is one accessible parking space next to the mechanical car park on the ground floor, and an accessible all-gender restroom on the ground floor of the building.',
        ],
      },
      {
        q: 'Can I bring my pet?',
        a: ['Pets are allowed by prior arrangement. Guide dogs are always welcome.'],
      },
    ],
  },
};

/**
 * Venue guide (English) — `/en/guide`.
 *
 * Mirrors ko/guide.ts block for block. The `slug`s, the order of pages and
 * children, the block kinds and the `shots.xxx` photo references must match the
 * Korean tree exactly; only the sentences, `alt` and `caption` text differ.
 * When one file changes, change the other.
 *
 * **This is a public page.** The entrance code and the Wi-Fi password never go
 * here. They are sent by text message one hour before the booking, as the
 * booking rules promise.
 *
 * Labels printed on physical devices and screens stay in Korean inside brackets,
 * followed by an English gloss, so visitors can match them to what they see.
 */

import { business, kakaoChannelUrl } from "../../config/site";
import { PARKING_SPACES } from "../facts";
import { shots } from "../guide-media";
import type { Guide, GuidePage } from "../guide-tree";
import { wallMounting } from "./rules";

const page: Guide["page"] = {
  title: "Venue guide",
  description:
    "The ISSEUM venue guide for renters. How to get in, how the space is laid out, how to use the lights, sound system and air conditioning, parking and loading, and how to tidy up before you leave, all with photos.",
  eyebrow: "GUIDE",
  heading: "Venue guide",
  lead: "Everything you need while using the space, from getting in and finding your way to using the equipment and tidying up, with photos.",
  breadcrumbLabel: "You are here",
  backLabel: "Back to list",
  pendingPrefix: "Photo coming soon — ",
  pagerLabel: "Previous and next guides",
};

/* ═══════════════  Arrival & entry  ═══════════════ */

const arrivalPages: GuidePage[] = [
  {
    slug: "parking",
    title: "Parking and loading",
    summary:
      "Size limits and how to use the mechanical car park, plus nearby parking and the unloading area.",
    blocks: [
      { kind: "heading", text: "Parking" },
      {
        kind: "bullets",
        items: [
          {
            text: `With your booking, you can park up to ${PARKING_SPACES} cars in the mechanical car park behind the building.`,
          },
          {
            text: "Because of size limits, some large vehicles such as SUVs and RVs cannot enter. We appreciate your understanding.",
            details: [
              "Length: 5,100mm or less",
              "Width (measured at the tires): 2,100mm or less",
              "Height: 1,550mm or less",
              "Weight: 1,850kg or less",
            ],
          },
        ],
      },
      {
        kind: "figure",
        src: shots.parking01,
        alt: "Entrance to the mechanical car park behind the building, with the control panel and a sign showing the size limits",
      },
      {
        kind: "bullets",
        items: [
          {
            text: "At night (after 19:30) and on weekends and public holidays, you can use the open spaces in the car park instead of the mechanical lift.",
          },
        ],
      },

      {
        kind: "bullets",
        items: [
          {
            label: "Taking out a parked car — ",
            text: "If a car is already inside the mechanical car park, you need to take it out yourself using the manual controls.",
          },
        ],
      },
      {
        kind: "pagelink",
        to: "manual",
        label: "How to take a car out manually",
        note: "Step-by-step control panel instructions with photos.",
      },
      { kind: "heading", text: "Nearby paid parking" },
      {
        kind: "text",
        body: "If you have many visitors with cars, or the car park is full, please use a nearby car park.",
      },
      {
        kind: "link",
        label: "Gyeongnam 1 on-street public car park (경남1 노상 공영 주차장)",
        href: "https://map.naver.com/p/entry/place/37060270",
        lines: [
          { label: "Address — ", text: "Seogyo-dong 418, Mapo-gu, Seoul" },
          { label: "Fee — ", text: "₩250 per 5 minutes (₩3,000 per hour)" },
          {
            label: "Hours — ",
            text: "Mon–Sat 11:00–21:00 (closed Sundays; card payment only)",
          },
          {
            label: "Note — ",
            text: "On-street parking is often busy and spaces are frequently full. Please check the situation before you go, or consider other paid car parks nearby as well.",
          },
        ],
      },
      { kind: "heading", text: "Bringing in goods and equipment" },
      {
        kind: "bullets",
        items: [
          {
            text: "If you are bringing heavy items or large equipment, it is easier to unload in the temporary stopping area next to the front entrance on the ground floor. Once everything is unloaded, please move your car elsewhere.",
          },
          {
            text: "To avoid scratching the floor, please lift heavy items instead of dragging them.",
          },
        ],
      },
      {
        kind: "note",
        body: [
          "This area is for unloading only. You may stop there briefly, but you cannot stay parked.",
        ],
      },
      {
        kind: "figure",
        src: shots.parking10,
        alt: "The temporary stopping area for unloading next to the building's front entrance on the ground floor, marked with a red oval",
      },
    ],
    children: [
      {
        slug: "manual",
        title: "How to take a car out manually",
        summary: "The control panel steps for taking out a car that is already parked inside.",
        blocks: [
          {
            kind: "figure",
            src: shots.parking02,
            alt: "The mechanical car park control panel, a stainless steel cabinet with a touchscreen and an emergency stop button",
          },
          {
            kind: "steps",
            items: [
              {
                text: "On the control panel keypad, press the [조작설명] (Instructions) button.",
                shots: [
                  {
                    src: shots.parking03,
                    alt: "Buttons stacked on the right side of the control panel screen: 운전화면 (Operation), 이상화면 (Errors) and 조작설명 (Instructions)",
                  },
                ],
              },
              {
                label: "Switch to manual mode — ",
                text: "Press and hold [게이트 닫힘대기 ON] (Gate close standby ON), the blue button on the right of the screen, for at least 5 seconds to switch to manual mode.",
                shots: [
                  {
                    src: shots.parking04,
                    alt: "The instructions screen that opens after pressing 조작설명, with the blue 게이트 닫힘대기 ON button on the right",
                  },
                  {
                    src: shots.parking05,
                    alt: "Close-up of the blue 게이트 닫힘대기 ON button, circled in red",
                  },
                ],
              },
              {
                label: "Open the door — ",
                text: "Go back to the main screen and press [출입문 열림(상)] (Door open, up) at the bottom to open the door.",
                shots: [
                  {
                    src: shots.parking06,
                    alt: "Close-up of the 출입문 열림(상) button, circled in red",
                  },
                ],
              },
              {
                label: "Take the car out — ",
                text: "Press [출고] (Exit), enter the 4-digit number of the car to take out using the keypad (the number buttons on the right), then press [운전시작] (Start). The machine will move the car to the exit. Please wait at a safe distance.",
                shots: [
                  {
                    src: shots.parking07,
                    alt: "The exit screen with the 입고 (Enter), 출고 (Exit), 취소 (Cancel) and 운전시작 (Start) buttons and a number keypad",
                  },
                ],
              },
              {
                label: "Close the door — ",
                text: "Press [출입문 닫힘(하)] (Door close, down) at the bottom to close the door.",
                shots: [
                  {
                    src: shots.parking08,
                    alt: "Close-up of the 출입문 닫힘(하) button, circled in red",
                  },
                ],
              },
            ],
          },
          {
            kind: "note",
            title: "Safety when taking a car out",
            body: [
              "If you enter the wrong number, press [취소] (Cancel) or [CE] to clear it, then enter it again.",
              "For your safety, stay away from the inside of the car park and the entry opening while the car is moving.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "entry",
    title: "Getting in",
    summary: "How to open the door with the door lock, and how to lock it when you leave.",
    blocks: [
      { kind: "heading", text: "Getting in" },
      {
        kind: "figure",
        src: shots.entry01,
        alt: "The white double fire doors at the basement (B1) entrance, with a digital door lock in the middle",
      },
      {
        kind: "steps",
        items: [
          { text: "Touch the door lock screen at the B1 entrance with your palm." },
          { text: "Enter the code you received." },
          { text: "Press the * (star) button. The door will open." },
        ],
      },
      {
        kind: "note",
        body: [
          "The entrance code is sent to you by text message one hour before your booking starts.",
        ],
      },
      { kind: "heading", text: "Leaving" },
      {
        kind: "steps",
        items: [
          {
            text: "Close the left door so it sits fully inside the metal frame of the right door, then push both doors together so they close tightly.",
          },
          {
            text: "Lift the door lock cover (screen) upward. The lock will engage and the door will lock.",
          },
          {
            text: "Pull the door handle to make sure the door is properly locked before you leave.",
          },
        ],
      },
    ],
  },
  {
    slug: "route",
    title: "Layout and getting around",
    summary: "How the space is laid out as you come in the main door, and where the restrooms are.",
    blocks: [
      { kind: "heading", text: "The space (entering from the main door)" },
      {
        kind: "bullets",
        items: [
          {
            label: "Left — ",
            text: "Project Room and waiting room (a separate meeting room or a green room for speakers)",
          },
        ],
      },
      {
        kind: "figure",
        src: shots.route01,
        alt: "The Project Room, also used as a waiting room, with a sofa, a meeting table and a wall-mounted TV",
      },
      {
        kind: "bullets",
        items: [{ label: "Straight ahead — ", text: "Main hall (the large main space)" }],
      },
      {
        kind: "figure",
        src: shots.route02,
        alt: "The main hall with desks and chairs set up classroom style and a large TV at the front",
      },
      {
        kind: "bullets",
        items: [
          {
            label: "Right — ",
            text: "Bar area, with the sound and PC control zone further in",
          },
        ],
      },
      {
        kind: "figure",
        src: shots.route03,
        alt: "The bar area with a wooden counter, a refrigerator and a sink",
      },
      {
        kind: "bullets",
        items: [
          {
            label: "Restrooms — ",
            text: "Go out through the main door and turn into the corridor on the left. Along the corridor, the women's restroom comes first and the men's restroom is further in.",
          },
        ],
      },
      {
        kind: "figure",
        src: shots.route04,
        alt: "The basement corridor leading to the restrooms, with a floor directory on the wall",
      },
      { kind: "heading", text: "Getting around (entering from the main door)" },
      {
        kind: "figure",
        src: shots.route05,
        alt: "Floor plan of B1 with arrows showing the way from the main door to the main hall and the Project Room",
      },
    ],
  },
];

/* ═══════════════  Using the space  ═══════════════ */

const usePages: GuidePage[] = [
  {
    slug: "conduct",
    title: "House rules",
    summary: "The basic rules to follow while you use the space.",
    blocks: [
      { kind: "heading", text: "Keep shared areas (corridors and stairs) clear" },
      {
        kind: "text",
        body: "So people can pass freely, please do not wait or leave items in the corridors or on the stairs. Keep all waiting guests and all items inside the space.",
      },
      { kind: "heading", text: "Take care of the walls" },
      // Same sentence as rule 10. rules.ts is the source.
      { kind: "text", body: wallMounting },
      { kind: "heading", text: "Food and drinks (F&B)" },
      {
        kind: "text",
        body: "You may bring packaged drinks and snacks. Please do not cook on site or bring soups or other foods with a strong smell.",
      },
      { kind: "heading", text: "No smoking and no open flames" },
      {
        kind: "text",
        body: "Smoking, including e-cigarettes, is strictly prohibited throughout the building and inside the basement. To prevent fire, open flames such as candles and gas burners, and smoke or haze machines, are not allowed.",
      },
      { kind: "heading", text: "Minors" },
      {
        kind: "text",
        body: "Minors may not use the space on their own, and should be accompanied by a guardian. Drinking and smoking by minors are strictly prohibited. Minors may not be admitted to events where alcohol is served.",
      },
      { kind: "heading", text: "Pets" },
      {
        kind: "text",
        body: "For hygiene and for the next guests, pets are not allowed, except guide dogs for people with visual impairments. Exceptions may be made for events agreed in advance, so please ask us beforehand.",
      },
      { kind: "heading", text: "Put everything back" },
      {
        kind: "text",
        body: "When you leave, please return all furniture, supplies, sound equipment and lighting to exactly how you found them.",
      },
      { kind: "heading", text: "Before you leave (lights and heating/cooling)" },
      {
        kind: "text",
        body: "When you leave, make sure all lights and the air conditioning or heating are completely turned off.",
      },
      { kind: "heading", text: "Trash" },
      {
        kind: "text",
        body: "Before you leave, sort your trash into general waste, recycling and paper, and put it in the bins next to the elevator. Put food waste in a food waste bag and take it to the food waste bin next to Starbucks on the ground floor.",
      },
    ],
  },
  {
    slug: "wifi",
    title: "Wi-Fi",
    summary: "How to connect to the free Wi-Fi available throughout the space.",
    blocks: [
      {
        kind: "text",
        body: "Free Wi-Fi is available in the space. You can find the network name and password on the notice inside the venue and in the text message we send you.",
      },
    ],
  },
  {
    slug: "tv",
    title: "Using the smart TVs",
    summary: "How to show your screen on the 100-inch TV in the main hall and the TV in the Project Room.",
    blocks: [
      { kind: "heading", text: "Main hall TV" },
      {
        kind: "figure",
        src: shots.tv01,
        alt: "The 100-inch Samsung smart TV at the front of the stage in the main hall",
      },
      {
        kind: "text",
        body: "There are three ways to show your screen on the main hall TV.",
      },
      { kind: "heading", text: "1. Use the sound booth PC (default setup)" },
      {
        kind: "steps",
        items: [
          {
            text: "Sign in to the sound booth PC. You can find the unlock password on the notice inside the venue.",
            shots: [{ src: shots.tv02, alt: "A monitor, PC tower and keyboard on the desk in the sound and PC control zone" }],
          },
          {
            text: "Turn on the TV with the remote provided.",
            shots: [{ src: shots.tv03, alt: "The Samsung TV remote kept in the main hall" }],
          },
          {
            text: "Press the Home button on the remote, go to [연결된 기기] (Connected devices) in the menu on the left of the screen, and select [HDMI3].",
            shots: [{ src: shots.tv08, alt: "The 연결된 기기 (Connected devices) menu" }],
          },
        ],
      },
      { kind: "heading", text: "2. Connect your own laptop at the lectern" },
      {
        kind: "bullets",
        items: [
          {
            label: "Hub location — ",
            text: "If you want to use your own laptop, turn the main hall TV slightly to the left. (It swivels sideways.) On the back right of the TV there is a multi-port hub like the one in the photo below.",
            shots: [{ src: shots.tv04, alt: "The multi-port hub and HDMI ports connected to the back of the TV" }],
          },
        ],
      },
      {
        kind: "steps",
        items: [
          { label: "Turn it on — ", text: "Turn on the TV with the remote provided." },
          {
            label: "Connect your laptop — ", text: "Cable: plug the cable into the HDMI2 port of the multi-port hub on the back right of the TV, and plug the other end into your laptop.",
          },
          {
            label: "Select the input — ", text: "Press the Home button on the remote and, in the [연결된 기기] (Connected devices) menu on the left of the screen, select the hub port you connected to (HDMI2).",
          },
        ],
      },
      { kind: "heading", text: "3. Connect your own laptop inside the sound booth" },
      { kind: "heading", text: "Project Room TV" },
      {
        kind: "figure",
        src: shots.tv05,
        alt: "The smart TV mounted on the wall of the Project Room",
      },
      {
        kind: "steps",
        items: [
          {
            label: "Turn it on — ",
            text: "Turn on the TV with the remote provided.",
            shots: [{ src: shots.tv06, alt: "The TV remote kept in the Project Room" }],
          },
          {
            label: "Connect your laptop — ",
            text: "An HDMI cable is already attached to the TV. Plug it into your laptop, then change the input with the remote.",
            shots: [{ src: shots.tv07, alt: "A cable plugged into the HDMI port on the back of the TV" }],
          },
        ],
      },
    ],
  },
  {
    slug: "lighting",
    title: "Lights and switches",
    summary:
      "Where the light switches are in the main hall, the bar and the Project Room, and what each one does.",
    blocks: [
      {
        kind: "text",
        body: "Each area has its own light switches, so you can set the mood you want.",
      },
      { kind: "heading", text: "Main hall" },
      {
        kind: "bullets",
        items: [
          {
            label: "Light switches — ",
            text: "Inside the sound booth, on the wall to the left of the PC tower (next to the door).",
          },
        ],
      },
      {
        kind: "figure",
        src: shots.light01,
        alt: "The main hall light switch panel on the wall next to the sound booth door",
      },
      {
        kind: "figure",
        src: shots.light02,
        alt: "A row of switches labeled 음향, 원통, T7, 무대, 간접, 흡기 and 배기",
        caption: "Each switch has a label in Korean.",
      },
      {
        kind: "bullets",
        items: [
          { label: "[음향] (Sound) — ", text: "Lights in the sound booth." },
          { label: "[원통] (Cylinder) — ", text: "Cylinder-shaped ceiling lights in the main hall." },
          { label: "[T7] — ", text: "Long bar-shaped ceiling lights in the main hall." },
          {
            label: "[무대] (Stage) — ",
            text: "The ceiling lights just above the TV and the warm yellow cylinder mood lights.",
          },
          {
            label: "[간접] (Indirect) — ",
            text: "The warm yellow cylinder mood lights one row in front of the stage lights.",
          },
          { label: "[흡기] · [배기] (Intake · Exhaust) — ", text: "Ventilation fans for the main hall." },
        ],
      },
      { kind: "heading", text: "Bar area" },
      {
        kind: "bullets",
        items: [
          { label: "Light switches — ", text: "On the wall to the right of the sink." },
        ],
      },
      {
        kind: "figure",
        src: shots.light03,
        alt: "The light switches on the wall to the right of the sink in the bar area",
      },
      { kind: "heading", text: "Project Room" },
      {
        kind: "bullets",
        items: [
          {
            label: "Light switches — ",
            text: "Enter the Project Room, pull back the curtain on the right and go in (the vanity area). The switches are on the right-hand wall.",
          },
        ],
      },
      {
        kind: "figure",
        src: shots.light04,
        alt: "The light switches on the right-hand wall of the vanity area in the Project Room",
      },
    ],
  },
  {
    slug: "sound",
    title: "Using the sound system",
    summary: "How to turn the microphones, speakers and PC on and off in the right order.",
    blocks: [
      {
        kind: "bullets",
        items: [
          { label: "Location — ", text: "Sound and PC control zone (beside the bar area)." },
        ],
      },
      {
        kind: "figure",
        src: shots.sound01,
        alt: "The sound and PC control zone beside the bar area",
      },
      {
        kind: "figure",
        src: shots.sound02,
        alt: "The sound rack holding the mixer, the wireless microphone receiver and the power amplifiers",
      },
      { kind: "heading", text: "Turning on" },
      {
        kind: "steps",
        items: [
          {
            label: "PC first — ",
            text: "Turn on the main PC in the control zone first.",
            shots: [
              {
                src: shots.sound03,
                alt: "The power button on the PC tower under the desk in the control zone",
              },
            ],
          },
          {
            label: "Upper rack equipment — ",
            text: "Turn on the mixer at the top of the rack and the wireless microphone receiver in the middle. This activates the microphone and audio signals first.",
            shots: [
              {
                src: shots.sound04,
                alt: "The YAMAHA MGP16X mixer installed at the top of the rack",
                caption: "Top mixer (YAMAHA MGP16X)",
              },
              {
                src: shots.sound05,
                alt: "The power switch on the right side of the back of the mixer",
                caption: "Mixer power switch: back right of the upper rack",
              },
              {
                src: shots.sound06,
                alt: "The wireless microphone receiver on the front of the middle rack, with two power buttons",
                caption: "Wireless microphone receiver (EWI SRD3U): 2 power buttons",
              },
            ],
          },
          {
            label: "Lower amplifiers last — ",
            text: "Press the power buttons on power amplifiers 1 and 2, the blue-framed units at the bottom. They go last to prevent a loud pop from the speakers and damage to the equipment.",
            shots: [
              {
                src: shots.sound07,
                alt: "Two blue-framed power amplifiers installed at the bottom of the rack",
              },
              {
                src: shots.sound08,
                alt: "The power switch on the front of a power amplifier",
                caption: "Power amplifiers 1 and 2 (YAMAHA PX3 / PX5): one power switch each",
              },
            ],
          },
        ],
      },
      { kind: "heading", text: "Using it and adjusting the volume" },
      {
        kind: "bullets",
        items: [
          {
            text: "Raise the PC and microphone volume slowly. Turning it up suddenly can cause feedback or a very loud sound.",
          },
          {
            text: "Check that the sound from the main hall speakers is at a comfortable level.",
          },
        ],
      },
      { kind: "heading", text: "Turning off when you leave" },
      {
        kind: "text",
        body: "Do it in the reverse order of turning on.",
      },
      {
        kind: "steps",
        items: [
          {
            label: "Lower amplifiers first — ",
            text: "Turn off power amplifiers 1 and 2 first. This cuts the speaker output first.",
          },
          {
            label: "Middle and upper equipment — ",
            text: "Turn off the microphone receiver and the mixer.",
          },
          { label: "PC last — ", text: "Shut down the main PC." },
        ],
      },
      {
        kind: "note",
        title: "Caution",
        body: [
          "The amplifier volume knobs and detailed settings are already set. Please do not change anything other than the power buttons.",
        ],
      },
    ],
  },
  {
    slug: "hvac",
    title: "Air conditioning and dehumidifiers",
    summary: "Where the air conditioning remote is, the recommended temperatures, and how the dehumidifiers are run.",
    blocks: [
      { kind: "heading", text: "Where they are" },
      {
        kind: "bullets",
        items: [
          {
            label: "Air conditioning — ",
            text: "There are 2 units in the main hall and 1 in the Project Room. One remote is kept in the bar area, and it controls all of them.",
          },
        ],
      },
      {
        kind: "figure",
        src: shots.hvac01,
        alt: "A ceiling-mounted air conditioning vent",
      },
      {
        kind: "bullets",
        items: [
          {
            label: "Dehumidifiers — ",
            text: "There is one in the main hall and one in the Project Room. To keep the space comfortable, our staff keep them running at all times and empty the water tanks, so you can use the space without touching them.",
          },
        ],
      },
      { kind: "figure", src: shots.hvac02, alt: "The dehumidifier in a corner of the main hall" },
      { kind: "heading", text: "Using the air conditioning" },
      {
        kind: "figure",
        src: shots.hvac03,
        alt: "The air conditioning remote kept in the bar area",
      },
      {
        kind: "steps",
        items: [
          {
            label: "Turn it on — ",
            text: "Turn on the air conditioning with the remote in the bar area.",
          },
          {
            label: "Recommended temperature — ",
            text: "We recommend 24–26℃ for cooling and 20–22℃ for heating.",
          },
          {
            label: "Separate control — ",
            text: "The main hall and the Project Room can be controlled separately.",
          },
          { label: "When you leave — ", text: "Always turn it off before you leave." },
        ],
      },
      { kind: "heading", text: "Using the dehumidifiers" },
      {
        kind: "steps",
        items: [
          {
            label: "Run it — ",
            text: "On humid days, run it to keep the space comfortable.",
          },
          {
            label: "Empty the tank — ",
            text: "If the tank fills up and it stops (full tank alert), empty the tank and it will start again.",
          },
        ],
      },
    ],
  },
  {
    slug: "bar",
    title: "Bar supplies and tableware",
    summary: "Where to find the appliances and disposable items, and how to clean up after use.",
    blocks: [
      { kind: "heading", text: "Appliances and disposable items" },
      {
        kind: "bullets",
        items: [
          {
            label: "Appliances — ",
            text: "Feel free to use the refrigerator, the water purifier and the other appliances provided.",
          },
        ],
      },
      {
        kind: "figure",
        src: shots.route03,
        alt: "The bar area with a refrigerator, a water purifier and a sink",
      },
      {
        kind: "bullets",
        items: [
          {
            label: "Disposable items — ",
            text: "Disposable cups, plates and cutlery are in the cabinet under the bar table. Please use as many as you need.",
          },
        ],
      },
      {
        kind: "figure",
        src: shots.bar01,
        alt: "Disposable cups, plates and cutlery arranged in the cabinet under the bar table",
      },
      { kind: "heading", text: "Cleaning up after use" },
      {
        kind: "bullets",
        items: [
          {
            text: "You do not need to wash dishes. Please empty any leftover food and contents from the disposable items first.",
          },
          {
            text: "Sort the emptied disposable items into recycling, paper and general waste, and put them in the bins next to the elevator.",
          },
        ],
      },
      {
        kind: "figure",
        src: shots.bar02,
        alt: "Sorting bins lined up next to the elevator",
      },
      {
        kind: "bullets",
        items: [
          {
            text: "Put leftover food in a food waste bag and take it to the food waste bin next to Starbucks on the ground floor.",
          },
        ],
      },
      {
        kind: "figure",
        src: shots.bar03,
        alt: "The food waste bin next to Starbucks on the ground floor of the building",
      },
    ],
  },
];

/* ═══════════════  Checking out  ═══════════════ */

const exitPages: GuidePage[] = [
  {
    slug: "layout",
    title: "Seating layout and putting furniture back",
    summary: "The default layout to return the furniture and props to when you leave.",
    blocks: [
      {
        kind: "bullets",
        items: [
          {
            label: "Put everything back — ",
            text: "When you leave, you must return all desks, chairs, props and other items you used to the default layout (the setup you found when you arrived).",
          },
        ],
      },
      { kind: "heading", text: "Classroom and seminar style" },
      {
        kind: "figure",
        src: shots.route02,
        alt: "The default main hall setup, with desks and chairs arranged classroom style",
      },
      { kind: "heading", text: "Book talk and lecture style" },
      {
        kind: "figure",
        src: shots.layout01,
        alt: "The main hall set up for a book talk, with chairs only, facing the stage",
      },
    ],
  },
  {
    slug: "recycling",
    title: "Recycling",
    summary: "Where to put trash and food waste, and how to sort it.",
    blocks: [
      { kind: "heading", text: "Bins next to the elevator" },
      {
        kind: "bullets",
        items: [
          {
            text: "Both general waste and recycling (plastic, bottles and paper) can go here.",
          },
          {
            text: "For recycling, you do not need to separate plastic and bottles. Put them in together.",
          },
        ],
      },
      {
        kind: "figure",
        src: shots.recycle01,
        alt: "Bins for each type of waste next to the elevator",
      },
      { kind: "heading", text: "Indoor trash cans" },
      {
        kind: "bullets",
        items: [{ text: "Please put only general waste in the trash cans inside the space." }],
      },
      { kind: "figure", src: shots.recycle02, alt: "The indoor trash can in the main hall" },
      { kind: "figure", src: shots.recycle03, alt: "The indoor trash can in the bar area" },
      { kind: "heading", text: "Large amounts of trash" },
      {
        kind: "bullets",
        items: [
          {
            text: "If you have a lot of trash, please put it in separate large trash bags and leave them neatly together beside the bins next to the elevator.",
          },
        ],
      },
      { kind: "heading", text: "Food waste" },
      {
        kind: "bullets",
        items: [
          {
            text: "Please collect and clear away any leftover food and scraps yourself. Put food waste in a food waste bag and take it to the food waste bin next to Starbucks on the ground floor.",
          },
        ],
      },
      {
        kind: "figure",
        src: shots.bar03,
        alt: "The food waste bin next to Starbucks on the ground floor of the building",
      },
    ],
  },
  {
    slug: "checklist",
    title: "Checkout checklist",
    summary: "Things to check before you leave.",
    blocks: [
      {
        kind: "text",
        body: "For the next guests, please check the items below before you leave. Each section of this guide explains the details.",
      },
      { kind: "heading", text: "Tidying up" },
      {
        kind: "checklist",
        items: [
          "Have you returned the desks, chairs and props to the default layout?",
          "Have you removed all gallery wire and adhesive you used on the walls?",
          "Have you sorted general waste and recycling into the bins next to the elevator?",
          "Have you put food waste in a food waste bag and taken it to the bin next to Starbucks on the ground floor?",
          "Have you emptied and cleared away the disposable items you used?",
        ],
      },
      { kind: "heading", text: "Power" },
      {
        kind: "checklist",
        items: [
          "Have you turned off the sound system in this order: power amplifiers → microphone receiver and mixer → PC?",
          "Have you turned off the air conditioning?",
          "Have you turned off all the light switches in the main hall, the Project Room and the bar?",
        ],
      },
      { kind: "heading", text: "Leaving" },
      {
        kind: "checklist",
        items: [
          "Have you taken all your personal belongings and the equipment you brought?",
          "Have you checked that nothing is left in the corridor or on the stairs?",
          "Have you closed the left door inside the frame of the right door and pushed both doors together?",
          "Have you lifted the door lock cover to lock it, then pulled the handle from outside to check?",
        ],
      },
      {
        kind: "note",
        body: [
          "You do not need to turn off the dehumidifiers. Our staff keep them running and empty the water tanks.",
        ],
      },
    ],
  },
];

/* ═══════════════  Safety  ═══════════════ */

const safetyPages: GuidePage[] = [
  {
    slug: "safety",
    title: "Emergency contacts and safety equipment",
    summary: "Who to contact in an emergency, and where the fire extinguishers and first aid kit are.",
    blocks: [
      { kind: "heading", text: "Host emergency contact" },
      {
        kind: "text",
        body: "If any equipment stops working or there is an emergency while you are using the space, contact us at any time.",
      },
      {
        kind: "bullets",
        items: [
          { label: "Emergency contact — ", text: `Venue manager ${business.phone}` },
          // Listed for emergencies, so drop the whole line if the channel is closed (null).
          ...(kakaoChannelUrl
            ? [{ label: "KakaoTalk — ", text: "ISSEUM channel (이씀 복합문화공간)", href: kakaoChannelUrl }]
            : []),
        ],
      },
      { kind: "heading", text: "Fire extinguishers" },
      {
        kind: "bullets",
        items: [
          {
            text: "Fire extinguishers are placed in front of the Project Room, inside the Project Room, and at the entrance to the restroom corridor.",
          },
        ],
      },
      { kind: "figure", src: shots.safety01, alt: "The fire extinguisher in front of the Project Room" },
      { kind: "figure", src: shots.safety02, alt: "The fire extinguisher inside the Project Room" },
      { kind: "figure", src: shots.safety03, alt: "The fire extinguisher at the entrance to the restroom corridor" },
      { kind: "heading", text: "First aid kit" },
      {
        kind: "bullets",
        items: [
          {
            text: "A first aid kit for minor injuries such as scrapes (bandages, ointment and so on) is in the cabinet on the right side of the bar area.",
          },
        ],
      },
      {
        kind: "figure",
        src: shots.safety04,
        alt: "The first aid kit kept in the cabinet on the right side of the bar area",
      },
    ],
  },
  {
    slug: "cctv",
    title: "CCTV and security",
    summary: "How CCTV is used in the space, and what to keep in mind.",
    blocks: [
      {
        kind: "bullets",
        items: [
          {
            label: "CCTV recording — ",
            text: "CCTV records 24 hours a day for safety, fire prevention, crime prevention, and to protect the facilities from damage.",
          },
          {
            label: "Do not tamper — ",
            text: "CCTV is essential for safety. Turning the cameras or covering them is strictly prohibited.",
          },
        ],
      },
    ],
  },
];

/** Groups shown on the contents page. Arrival → use → checkout; safety is for reference at any time. */
export const guide: Guide = {
  page,
  groups: [
    { title: "Arrival & entry", pages: arrivalPages },
    { title: "Using the space", pages: usePages },
    { title: "Checking out", pages: exitPages },
    { title: "Safety", pages: safetyPages },
  ],
};

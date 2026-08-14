# ISSEUM — Component Inventory

Extracted from `design/*.dc.html`. Token names refer to [TOKENS.md](./TOKENS.md).

30 distinct components across 4 pages. The header and footer are **byte-identical** across all four
exports (apart from the active-nav marker), so they are genuine shared layout, not four near-copies.

Page key: **M** = Main · **E** = Equipment · **R** = Rules · **V** = Events

---

## Foundations

### 1. Eyebrow label
**M E R V** — appears above every section heading and panel label.

`11.5px / weight 500 / letter-spacing 0.24em / --text-secondary`, margin-bottom `14px` (or
`clamp(20px, 3vw, 34px)` when above an `h1`). Content is Latin caps: `PREMIUM MULTI CULTURE SPACE`,
`WHY ISSEUM`, `SPACE & EQUIPMENT`, `RENTAL PROCESS`, `RENTAL POLICY & GUIDE`, `EQUIPMENT & PROPS`,
`PAST EVENTS · ARCHIVE`.

Variant: `--eyebrow-panel` at `0.20em` for Korean-language labels (`목차`, `주요 안내`, `공식 채널`,
`예외 규정 및 주의사항`, `LOCATION`).

### 2. Section header
**M E R V** — the unit that opens every section.

Eyebrow + serif `h2` at `--display-section`, wrapped in a flex row with `justify-content: space-between`
and `align-items: flex-end` (leaves room for an optional trailing action), then
`padding-bottom: 26px; border-bottom: var(--border-emphasis)`.

The **dark 1px rule is the signature** — section headers use `--ink`, while everything internal uses
`--border`. That single contrast step carries the whole hierarchy.

### 3. Page hero
**E R V** — the top of every subpage.

Eyebrow + serif `h1` at `--display-page` + a flex row holding a lead paragraph (`--text-lead`,
`max-width: 34em`–`36em`) and an optional right-aligned meta line, closed by `--border-emphasis`.

Main's hero (§4) differs and is its own component.

### 4. Image placeholder (`.ph`)
**M E R V** — every image in the export.

The 135° hatch from TOKENS §5, plus an absolutely-positioned mono caption naming the intended asset and
pixel size. Caption sits on `--bg` with a `--border-hairline` so it stays legible over the hatch.

Three sizes: `--mono-slot-lg` (hero, `padding: 9px 16px`), `--mono-slot` (cards/map, `7px 12px` or
`8px 14px`), `--mono-slot-xs` (gallery tiles, `5px 8px`). Caption alignment varies by container:
centered for hero and map, `align-items: flex-end` for cards.

**Keep this component** as the loading/missing-image fallback once real photography lands.

---

## Actions

### 5. Primary button
**M E R V** — `대관 예약하기`, the sitewide CTA.

`background: --ink; color: #fff` (→ `--bg`, see TOKENS §1), `--text-ui` @600, `padding: 13px 24px`,
`--radius`, `transition: background .2s`. Hover: `background: --ink-hover`.

Sizes: header `13.5px / 13px 24px` · panel `14.5px / 17px 32px` · TOC full-width `13.5px / 15px 18px`.

### 6. Inverted button
**M E V** — the CTA inside dark panels.

`background: --bg; color: --ink`, `14.5px` @600, `padding: 17px 32px`. Hover: `background: --border`.

### 7. Outline button
**M R** — footer map links (`네이버 지도`, `카카오맵`), 2-up at `flex: 1`.

`border: --border-emphasis`, transparent fill, `12.5px` @600, `padding: 12px 6px`, `--radius`.
Hover inverts: `background: --ink; color: #fff`.

### 8. Outline button on dark
**R** — `지난 행사 보기` beside the gated CTA.

`border: 1px solid --link-hover; color: --bg`, `padding: 16px 31px` (1px less than the filled sibling to
compensate for the border — the design keeps optical heights matched). Hover: `border-color: --bg`.

### 9. Filter chip
**E V** — category filters. A real `<button type="button">` with `font-family: inherit`.

`13px` @600, `padding: 10px 19px`, `--radius`, `transition: border-color .2s, background .2s`.
Border/background/foreground are all driven from state:

| State | border | background | color |
|---|---|---|---|
| Active | `--ink` | `--ink` | `--bg` |
| Rest | `--border` | transparent | `--ink` |

Categories — Equipment: `전체 · 음향 · 영상 · 가구 · 기타`. Events: `전체 · 공연 · 브랜드 행사 · 촬영 · 강연 · 모임`.

### 10. Social chip
**M E R V** — `인스타그램`, `스페이스클라우드` in the footer.

`inline-flex`, `gap: 9px`, `border: --border-hairline`, `background: --bg`, `13px` @600,
`padding: 11px 16px`. Hover: `border-color: --ink`. Leading glyph is a bare 15×15 `<span>` with
`border: 1.5px solid --ink` — `--radius-sm` for Instagram, `--radius-full` for SpaceCloud. **No icon
font, no SVG** — the icons are pure CSS shapes. Charming, and worth keeping.

### 11. Text link with arrow
**M** — `전체 장비 자세히 보기 →`.

`inline-flex`, `gap: 8px`, `13.5px` @600. `.eq-link:hover .eq-arrow { transform: translateX(5px) }` with
`transition: transform .25s`. Arrow is the literal character `→`.

---

## Navigation

### 12. Header / GNB
**M E R V** — identical on all pages.

`position: sticky; top: 0; z-index: 50`, `background: --bg-sticky`, `backdrop-filter: blur(12px)`,
`border-bottom: --border-hairline`. Inner bar: `--container`, `--gutter`, `height: 100px`, flex
space-between.

Three slots: logo (`<img>` at `height: 64px`) · desktop nav · primary button (`flex: none`).

### 13. Desktop nav
**M E R V** — `.gnb-nav`, `display: none` until `min-width: 900px` then `flex`.

Four links at `--text-sm` @500, `gap: --gap-md`. Active link: weight `600` +
`border-bottom: --border-active` + `padding-bottom: 3px`.

### 14. Mobile tab bar
**M E R V** — `.m-only`, hidden at `min-width: 900px`.

A second row below the header bar: `border-top: --border-hairline`, `overflow-x: auto`, four `flex: 1`
links at `12.5px`, `padding: 12px 6px`, `white-space: nowrap`, separated by
`border-left: --border-hairline`. Active tab: weight `700` + `background: --surface`.

Not a hamburger — a horizontally-scrolling tab strip. Better for a 4-item nav; keep it.

### 15. TOC sidebar
**R** — `.toc`, `display: none` until `min-width: 1100px`, at which point `.doc-grid` becomes
`236px 1fr`.

`position: sticky; top: 112px`. Panel label + a column of links (`13.5px` @500, `padding: 13px 2px`,
`border-bottom: --border-hairline`) each prefixed by a `--mono-num` numeral, closed by a full-width
primary button.

Four entries, but the page renders five sections — see §Gaps.

---

## Content — Main page

### 16. Main hero
**M** — 16/7.6 placeholder with `border-left/right/bottom` only (no top border — it butts against the
header), then eyebrow, serif `h1` at `--display-hero` with `max-width: 24em`, then a lead paragraph at
`max-width: 62em`.

The `h1` contains an `<em style="font-style: normal; color: rgb(45,45,42)">“이씀”</em>` — italics
suppressed, color shifted one step. That's the brand-name treatment.

### 17. Stat row
**M** — `repeat(auto-fit, minmax(180px, 1fr))` with `border-top: --border-hairline`.

Driven by a `stats` array of `{value, label}`: `132㎡` / 메인 홀 면적 · `최대 60인` / 동시 수용 인원 ·
`4개 영역` / … · `09–24시` / 대관 가능 시간.

**The cell markup is empty in the export** — the `<sc-for>` body was never authored. Needs building from
scratch; see §Gaps.

### 18. Feature card
**M** — `.why-grid`, 1 column → 3 at `min-width: 860px`. Uses the hairline-grid technique.

Cell: `background: --bg`, `--space-card`, flex column `gap: 18px`. Serif `h3` at `--display-card` + body
at `15px / 1.8 / --text-body`.

Three cards: 역세권 스타벅스 건물 · 스마트 공조 시스템 · 편리한 빌딩 내 주차. Each has an **empty leading
`<div>`** where an icon or numeral was intended.

### 19. Space card
**M** — `.space-grid`, 1 → 2 (`640px`) → 4 (`1024px`), `gap: --gap-md`.

Portrait `4/5` placeholder, then a baseline-aligned row of `--mono-num` + serif `h3` at
`--display-card-alt`, then description at `14.5px / 1.75`, then a meta line at `12.5px` above a
`border-top: --border-hairline`.

Four: 메인 홀 · 프로젝트 룸 · 파우더 룸 · 바(Bar). Meta encodes area · capacity · HVAC.

### 20. Equipment summary list
**M** — compact preview of the Equipment page.

Subsection header (serif `h3` at `--display-sub` + arrow link) above `border-top: --border-emphasis`, then
a `<ul>` of rows. Row: `flex-wrap` with `gap: 8px 16px`, `padding: 15px 0`,
`border-bottom: --border-hairline`, holding a fixed `width: 26px` mono numeral, a
`flex: 1 1 260px` name at `--text-list-name` @600, and a `flex: 1 1 200px` spec at `13.5px /
--text-secondary`.

The `flex-basis` pair is what makes it collapse to two lines on narrow screens without a media query.

### 21. Process step card
**M** — `repeat(auto-fit, minmax(240px, 1fr))`, hairline grid, `border-bottom: --border-hairline`.

Cell has `transition: background .25s` and hover `background: --surface`. Top row is space-between: a
serif `--numeral-step` numeral (weight 400, `line-height: 1`) and an `--eyebrow-step` label (`STEP 01`).
Then `h3` at `--text-step-title` with `margin-top: 22px`, then `14px / 1.75` body.

Four steps: 예약 신청 → 승인 및 결제 → 이용 매뉴얼 전송 → 입실 및 이용.

### 22. Dark CTA banner
**M E R V** — closes every page.

`background: --ink`, `--space-panel`, flex-wrap space-between with `gap: 18px`. Serif headline at
`--display-cta` in `--bg`, subline at `13.5px` in `--text-tertiary`, inverted button on the right.

Per-page copy: M `원하시는 날짜가 비어 있는지 먼저 확인해 보세요.` · E `필요한 장비를 미리 알려주세요.` ·
V `비슷한 행사를 기획하고 계신가요?` · R is the gated variant (§29).

---

## Content — Rules page

### 23. Doc group heading
**R** — baseline row of `--mono-num-lg` + serif `h2` at `--display-group`, `padding-bottom: 20px`,
`border-bottom: --border-hairline`. Container carries `scroll-margin-top: 100px` for TOC anchors.

### 24. Policy item
**R** — `padding: clamp(26px, 3vw, 40px) 0`, `border-bottom: --border-hairline`.

Header: a 26×26 circled numeral (`border: --border-emphasis`, `--radius-full`, inline-flex centered,
`12px` @600) + `h3` at `--text-item-title`. Body is indented `padding-left: 38px` — matching the badge
width plus its `12px` gap, so text aligns under the title rather than the number. Deliberate; preserve it.

### 25. Bullet line
**E R** — the atom of all policy and note copy.

`flex; gap: 11px; align-items: flex-start`. A 4×4 `--text-tertiary` dot at `--radius-full` with
`margin-top: 11px` (optically centers it on the first line at `15px / 1.78`), then a paragraph whose
`<strong>` label is `--ink` @600 and whose remaining text is `--text-body`.

Label convention: `이용 시간 — ` (em-dash, trailing space) inside `<strong>`, then plain text.

### 26. Refund tier card
**R** — `repeat(auto-fit, minmax(200px, 1fr))`, hairline grid.

Condition line at `13.5px` @600 `--text-body`, then the rate as serif `--display-figure` in a
**state-driven color**: `100% 환불` → `--ink` · `50% 환불` → `--text-strong` · `환불 불가` →
`--text-secondary`. Severity encoded by fading rather than by red. Consistent with the no-accent-color
rule and worth keeping.

### 27. Notice panel
**E R** — `background: --surface`, `border: --border-hairline`, `--space-notice`.

Panel label (`--eyebrow-panel`) or serif `h3` at `--display-notice`, then a stack of bullet lines at
`gap: 13px`.

### 28. Definition list
**M E R** — two variants of `<dl>` with `grid-template-columns`.

Footer business info: `92px 1fr`, `gap: 11px 0`, `13.5px`, `dt` `--text-secondary` / `dd`
`--text-strong`. Equipment spec table: `74px 1fr` with `border-top` on the list and
`border-bottom: --border-hairline` + `padding: 11px 0` on every cell, producing full-width rules.

### 29. Agreement gate
**R** — the most stateful component in the design.

Dark panel containing a `<label>` wrapping a 20×20 checkbox (`accent-color: --bg`) and a
`clamp(15px, 1.5vw, 17.5px)` @600 statement in `--bg`. Below a `border-top: 1px solid --ink-hover`
divider: the CTA, the outline button, and a hint line.

`state = { agreed: false }` drives four values at once:

| | unchecked | checked |
|---|---|---|
| CTA background | `--ink-hover` | `--bg` |
| CTA color | `--text-secondary` | `--ink` |
| `pointer-events` | `none` | `auto` |
| Hint | `동의 후 예약 신청이 가능합니다.` | `동의 완료 — 예약 신청서로 이동할 수 있습니다.` |

Note it gates via `pointer-events: none` on an `<a>`, which is **not keyboard-accessible** — see §Gaps.

---

## Content — Equipment page

### 30. Equipment detail row
**E** — alternating full-width rows, `border-bottom: --border-hairline`.

1 column until `min-width: 980px`, then `1.28fr 1fr` for even rows (`.eq-row`) and `1fr 1.28fr` for odd
(`.eq-row-alt`), with `.eq-alt-media { order: 2 }` / `.eq-alt-body { order: 1 }` flipping the visual
order. `.eq-body-inner { padding-top: 8px }` at the same breakpoint for optical alignment against the
image.

Body: metadata row → serif `h2` at `--display-item` → description at `15px / 1.8` → spec `<dl>`.

Because the flip is CSS `order` and not DOM order, reading order stays correct. Good.

### 31. Category + requirement badges
**E** — the metadata row above each item name.

Both are `11.5px` @600, `padding: 5px 10px`, square (no radius). Category badge:
`border: --border-hairline; background: --surface`. Requirement badge is state-driven —
`사전 요청` renders `background: --ink; color: --bg`, while `상시 세팅` / `상시 제공` renders transparent
with a `--border` outline and `--text-secondary` text. Filled = action needed.

---

## Content — Events page

### 32. Masonry photo tile
**V** — a `<button type="button">` in a `repeat(auto-fill, minmax(232px, 1fr))` grid with
`grid-auto-rows: 12px; gap: 10px`.

Height comes from `grid-row: span N` — `22` for index 0 (which also takes `grid-column: span 2`), then
`14` / `17` alternating by `index % 3`. Fixed, not content-derived, so it is deterministic and
SSR-safe.

`.tile` is `position: relative; overflow: hidden; cursor: zoom-in; padding: 0; background: none;
font-family: inherit; text-align: left` — button chrome fully reset.

Layers: `.ph` hatch at `inset: 0` · mono slot caption top-left · optional 52px circular play badge
(centered, CSS triangle from `border-left: 11px solid --ink` + transparent top/bottom borders) · a 26px
`＋` mark top-right that fades in on hover · `.cap` caption bar bottom, `--scrim` gradient, rising
`translateY(6px) → none` with opacity `0 → 1`.

`.cap` reveals on `:hover` **and `:focus-visible`** — the export got that right.

### 33. Lightbox
**V** — `state = { filter, open, index }`, closes on `Escape`.

Opens from a tile click, `index` clamped with `Math.min(index, max(list.length - 1, 0))` so filtering
while open can't produce an out-of-range index. Uses `rgba(20,20,18,0.94)` as its backdrop — the only
appearance of that value in the design.

---

## Footer

### 34. Footer
**M E R V** — identical everywhere.

`margin-top: --space-section`, `border-top: --border-hairline`, `background: --surface`. Grid:
`repeat(auto-fit, minmax(300px, 1fr))`, `gap: --gap-lg`.

Three columns: logo (`height: 40px`) + business `<dl>` · `LOCATION` label + 16/10 map placeholder + 2-up
outline buttons · `주요 안내` link list + `공식 채널` social chips.

### 35. Footer link row
**M E R V** — `flex` space-between, `padding: 15px 0`, `border-bottom: --border-hairline`,
`--text-sm` @500, with a trailing `--text-xs` `--text-tertiary` arrow — `→` for internal, `↗` for
external (`target="_blank" rel="noopener"`). Small, correct detail.

### 36. Footer bottom bar
**M E R V** — `border-top: --border-hairline`, `padding: 20px --gutter`, flex space-between at `12px`
`--text-secondary`: `© 2026 ISSEUM. All rights reserved.` and `SEOUL · KOREA` at `0.18em`.

---

## Content model

Each page carries a `<script type="text/x-dc">` with a `Component extends DCLogic` class exposing
`renderVals()`. This is Claude Design's own runtime — **it will not exist in your build**, so the data
needs re-homing (JSON, CMS, or a props file).

Editable props declared via `data-props`: `bookingUrl` (default `https://forms.gle/`, all pages),
`rulesUrl` (M), `showEquipment` boolean (M).

Arrays to port: `stats` (4) · `spaces` (4) · `equipment` (7) · `steps` (4) — Main. `items` (7 with
category/req/desc/spec/qty/place) + `notes` — Equipment. `toc` (4) · `groups` (3 groups, 10 items, ~30
bullet lines) · `refund` (3) · `exceptions` (3) — Rules. `photos` (18) + categories — Events.

Template directives to translate: `<sc-for list as>`, `<sc-if value>`, `{{ expr }}`,
`style-hover="…"`, `onClick="{{ fn }}"`. Note **`style-hover` is not real CSS** — every hover state in
this document comes from that custom attribute and must become a real `:hover` rule.

`showEquipment` is declared as a prop but never read in `renderVals()` — dead, or an unfinished toggle.

---

## Gaps — what the reference does not cover

Ranked by how likely each is to block the build.

**Unauthored in the export**
1. **Stat row cells (§17) are empty.** The `stats` data exists; the markup does not. Needs designing.
2. **Feature card icon slots (§18) are empty** — three cards each with an empty leading `<div>`.
3. **Rules TOC lists 4 entries but the page has 5 sections.** `#refund` is hardcoded outside the
   `groups` loop, and item 12 (안전 관리) sits outside any group. Numbering is inconsistent: the TOC
   labels `04` as `규정 및 책임` while the heading reads `05 취소 및 환불 정책`.
4. **Equipment page: `notes` array is referenced but its contents aren't in the export.**

**Absent entirely — every real site needs these**
5. **No form.** Booking goes to an external Google Form. There is no text input, select, textarea,
   radio, validation message, or submit state anywhere. The only input in the design is one checkbox.
6. **No error, empty, or loading states.** The filters (§9) can produce zero results with nothing to
   show. No 404 page. No image loading state (though §4 doubles as one).
7. **No focus-visible styling.** Only `.tile` has any focus treatment. With links globally undecorated
   and a keyboard-inaccessible CTA gate (§29), this is the most serious accessibility gap.
8. **No `prefers-reduced-motion`.**
9. **No dark mode.** The palette is a single light theme. Given the warm off-white is the brand, this is
   probably correct — but decide explicitly.
10. **No `<title>`, meta description, Open Graph, or favicon** on any page. No structured data, which
    matters for a venue (`LocalBusiness` / `Place` schema).
11. **No `lang` attribute** — `<html>` has none, and the content is Korean. Set `lang="ko"`.

**Content gaps**
12. **No pricing anywhere.** A venue rental site's most-asked question. Deliberate (steering to
    inquiry) or missing — confirm which.
13. **No availability calendar**, though the Main CTA says `원하시는 날짜가 비어 있는지 먼저 확인해 보세요`
    ("check whether your date is free") — which promises exactly that and then links to a form.
14. **No real photography** — all 23+ image slots are placeholders (TOKENS §9).
15. **No map embed** — placeholder only; needs a Naver or Kakao Maps key.
16. **Social links are `href="#"`** — real URLs needed.
17. **Directions / transit detail.** 홍대입구역 도보 9분 is mentioned in prose but there's no
    step-by-step arrival guide, which a basement venue really wants.
18. **Korean only.** No `hreflang`, no language switcher. If English is ever needed, retrofitting the
    fluid Korean-tuned letter-spacing is painful — decide now.

**Decisions to make before building**
19. Consolidate the 13-step display scale and 6 ad-hoc breakpoints (TOKENS §2, §4).
20. Pick one "white" (TOKENS §1).
21. Fix the logo filename (TOKENS §9).
22. Choose where content lives — the `renderVals()` arrays are substantial enough (Rules alone is ~30
    bullet lines of legal copy) that hardcoding them into markup will hurt the first time they change.

Related: [[isseum-tokens]]

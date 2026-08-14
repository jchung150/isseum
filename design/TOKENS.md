# ISSEUM — Design Tokens

Extracted from the Claude Design export in `design/*.dc.html` (4 pages: Main, Equipment, Rules, Events).
Every value below was read from the actual CSS — inline `style` attributes plus each page's `<style>` block.
Where a value is inferred rather than read, it is marked **[inferred]**.

The export has no CSS variables: values are literal and repeated inline. The names below are new — this
file is where the naming is established.

---

## 1. Color

Twelve hex colors, all warm neutrals. **There is no chromatic accent color anywhere in the design** — no
blue, no brand hue. Hierarchy is carried entirely by value (lightness) and by border weight. Treat that as
a deliberate constraint, not an omission.

Counts are occurrences across the 4 pages, as a signal of how load-bearing each color is.

| Token | Hex | Uses | Role as actually used |
|---|---|---|---|
| `--ink` | `#1C1C1A` | 91 | Primary ink. Headings, body strong, emphasis borders, primary button fill, dark CTA panel background |
| `--ink-hover` | `#3D3D38` | 7 | Primary button hover fill; hairline divider inside dark panels |
| `--text-strong` | `#2D2D2A` | 28 | `<dd>` values in footer info list and spec tables |
| `--text-body` | `#55554C` | 16 | Running body copy in every paragraph |
| `--text-secondary` | `#8A8A7E` | 69 | Eyebrow labels, `<dt>` labels, mono captions, footnotes, disabled CTA text |
| `--text-tertiary` | `#A5A599` | 30 | Mono index numerals, bullet dots, `→` arrows, subtext on dark panels |
| `--link-hover` | `#6E6E64` | 5 | Global `a:hover` color; outline-button border on dark backgrounds |
| `--border` | `#E5E5E0` | 110 | The hairline. Most-used color in the design — see §5 |
| `--surface` | `#F4F4F0` | 17 | Raised/recessed surface: footer bg, notice panels, active mobile tab, category chip, step-card hover |
| `--bg` | `#FBFBF9` | 51 | Page background; also the "white" text/fill color **on** dark panels |
| `--placeholder-stripe` | `#EAEAE3` | 4 | Darker stripe of the `.ph` placeholder hatch only |
| `--on-ink` | `#FFF` | 18 | Button label color on `--ink` fill |

### Alpha values

| Token | Value | Used for |
|---|---|---|
| `--bg-sticky` | `rgba(251,251,249,0.88)` | Sticky header, paired with `backdrop-filter: blur(12px)` |
| `--bg-glass-strong` | `rgba(251,251,249,0.9)` | Photo-tile `＋` hover mark |
| `--bg-glass` | `rgba(251,251,249,0.86)` | Photo-tile video play badge |
| `--on-ink-muted` | `rgba(251,251,249,0.72)` | Date line in photo-tile caption |
| `--border-on-ink` | `rgba(251,251,249,0.3)` | Border on dark backgrounds |
| `--scrim` | `linear-gradient(to top, rgba(28,28,26,0.82), rgba(28,28,26,0))` | Photo-tile caption scrim |

### Two inconsistencies to resolve before building

1. **`#FFF` vs `#FBFBF9` as "white."** Buttons set `color: #fff`; the dark CTA panel sets
   `color: #FBFBF9`. Both read as white but they are different values. **Recommendation:** standardize on
   `--bg` (`#FBFBF9`) everywhere, and drop `--on-ink` entirely. `#FFF` against `#1C1C1A` is very slightly
   colder than the rest of the palette.
2. **`rgb(45, 45, 42)`** appears once (the `“이씀”` `<em>` in the Main hero `<h1>`) — that is `#2D2D2A`
   written in a different notation. Same color, use `--text-strong`.

---

## 2. Typography

### Families

| Token | Stack | Role |
|---|---|---|
| `--font-serif` | `'Noto Serif KR', serif` | All display type: h1, h2, h3, step numerals, refund rates, CTA headlines |
| `--font-sans` | `Pretendard, -apple-system, system-ui, sans-serif` | Body, UI, labels, buttons. Set on `<body>` |
| `--font-mono` | `ui-monospace, Menlo, monospace` | Index numerals and placeholder slot captions only — never body text |

Loaded via CDN: Pretendard from jsDelivr (`orioncactus/pretendard@v1.3.9`), Noto Serif KR from Google
Fonts at weights 300/400/500/600/700, with `preconnect` to both Google hosts.

**Only weight 500 of the serif is actually used** (plus 400 for the one step numeral). The other four
loaded weights are dead payload — see §9.

### Weights

`400` — step numerals only · `500` — default, all serif headings, nav links · `600` — emphasis, buttons,
item titles, `<strong>` · `700` — active mobile tab label only

### Display scale (serif, weight 500)

All display type is fluid `clamp()`. Grouped by role:

| Token | Value | line-height | letter-spacing |
|---|---|---|---|
| `--display-page` | `clamp(30px, 5vw, 68px)` | 1.22 | -0.03em |
| `--display-page-alt` | `clamp(30px, 4.8vw, 66px)` | 1.22 / 1.24 | -0.03em |
| `--display-hero` | `clamp(24px, 3.2vw, 44px)` | 1.35 | -0.03em |
| `--display-section` | `clamp(28px, 4vw, 52px)` | 1.2 | -0.03em |
| `--display-group` | `clamp(22px, 2.8vw, 34px)` | 1.25 | -0.03em |
| `--display-item` | `clamp(21px, 2.6vw, 32px)` | 1.3 | -0.035em |
| `--display-figure` | `clamp(24px, 2.6vw, 34px)` | — | -0.03em |
| `--display-cta` | `clamp(20px, 2.4vw, 30px)` | — | -0.025em / -0.03em |
| `--display-sub` | `clamp(20px, 2.2vw, 28px)` | — | -0.025em |
| `--display-card` | `clamp(19px, 2vw, 24px)` | 1.35 | -0.03em |
| `--display-card-alt` | `clamp(19px, 2vw, 25px)` | — | -0.025em |
| `--display-notice` | `clamp(18px, 2.2vw, 26px)` | — | -0.03em |
| `--numeral-step` | `clamp(30px, 3.4vw, 46px)` @ weight 400 | 1 | — |

**[inferred]** These 13 steps are more granularity than a design system needs, and several pairs differ by
1px at max width (`44` vs `46`, `24` vs `25`, `66` vs `68`). See §9 for the consolidation I recommend.

### Text scale (sans)

| Token | Size | line-height | letter-spacing | Role |
|---|---|---|---|---|
| `--text-lead` | `clamp(15px, 1.4vw, 17.5px)` | 1.75–1.85 | -0.015em | Hero and page lead paragraphs |
| `--text-item-title` | `clamp(17px, 1.8vw, 21px)` @600 | — | -0.03em | Policy item titles |
| `--text-list-name` | `clamp(15px, 1.5vw, 17px)` @600 | — | -0.025em | Equipment list item names |
| `--text-step-title` | `18px` @600 | — | -0.025em | Process step titles |
| `--text-base` | `15px` | 1.78–1.8 | -0.015em | Body copy in cards and policy lines |
| `--text-sm` | `14.5px` | 1.75–1.78 | -0.015em / -0.01em | Compact body; nav links; large buttons |
| `--text-ui` | `13.5px` | — | -0.01em / -0.015em | Medium buttons, `<dt>`/`<dd>`, TOC links |
| `--text-ui-sm` | `13px` @600 | — | -0.015em | Filter chips, social chips |
| `--text-meta` | `12.5px` | — | +0.01em / +0.02em | Card meta lines, footnotes, mobile tabs |
| `--text-xs` | `12px` | — | +0.01em | Footer bottom bar, circled numbers, arrows |

### Eyebrow / kicker scale

Small, wide-tracked, uppercase-Latin labels. A signature of the design — they appear above every section
heading and panel label.

| Token | Value | Role |
|---|---|---|
| `--eyebrow-section` | `11.5px` / `500` / `0.24em` / `--text-secondary` | Above every section + page `h1` |
| `--eyebrow-panel` | `11.5px` / `500` / `0.20em` / `--text-secondary` | Footer column labels, notice panel labels |
| `--eyebrow-step` | `11px` / `500` / `0.18em` / `--text-tertiary` | `STEP 01` labels on process cards |
| `--eyebrow-footer` | `12px` / `0.18em` / `--text-secondary` | `SEOUL · KOREA` |

### Mono scale

| Token | Value | Role |
|---|---|---|
| `--mono-slot-lg` | `11.5px` / `0.14em` | Hero placeholder caption |
| `--mono-slot` | `10.5px` / `0.12em` | Card and map placeholder captions |
| `--mono-slot-xs` | `9.5px` / `0.10em` | Photo-tile placeholder caption |
| `--mono-num` | `11px` / `--text-tertiary` / `0.10em` | Index numerals (`01`, `02`, …) |
| `--mono-num-lg` | `11.5px` / `--text-tertiary` / `0.10em` | Doc group numerals |

### Letter-spacing system

The design is consistently tight on Korean text and wide on Latin labels — this is the single most
important typographic rule to preserve.

- **Display / headings:** `-0.03em` (occasionally `-0.035em` on the largest)
- **Body:** `-0.015em`
- **UI / nav / buttons:** `-0.01em`
- **Titles, names:** `-0.025em`
- **Eyebrows / mono:** `+0.10em` to `+0.24em`

One stray literal: `letter-spacing: -0.24885px` on a `<span>` in the Main hero paragraph. That is an
editor artifact from manual text nudging — **drop it**, inherit `-0.015em`.

### Global body defaults

```css
body {
  margin: 0;
  background: #FBFBF9;
  color: #1C1C1A;
  font-family: Pretendard, -apple-system, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-wrap: pretty;
}
html { scroll-behavior: smooth; }
a { color: #1C1C1A; text-decoration: none; }
a:hover { color: #6E6E64; }
```

Note `text-wrap: pretty` and `-webkit-font-smoothing: antialiased` — both intentional and worth keeping.
Links are undecorated globally, so link affordance depends entirely on weight and context.

---

## 3. Spacing

The export uses fluid `clamp()` pairs rather than a fixed step scale. These are the recurring pairs, and
they should become the scale.

| Token | Value | Role |
|---|---|---|
| `--gutter` | `clamp(20px, 4vw, 64px)` | Standard page gutter (Main, Equipment, Rules) |
| `--gutter-wide` | `clamp(16px, 3vw, 48px)` | Events page only — narrower to let the gallery breathe |
| `--space-section` | `clamp(70px, 10vw, 140px)` | Vertical rhythm between major sections |
| `--space-section-sm` | `clamp(46px, 6vw, 90px)` | Page-hero top padding; footer top padding |
| `--space-header-gap` | `clamp(28px, 3.6vw, 52px)` | Section header rule → content |
| `--space-group` | `clamp(38px, 5vw, 68px)` | Doc group top padding |
| `--space-card` | `clamp(28px, 3vw, 44px) clamp(24px, 2.4vw, 36px) clamp(32px, 3.6vw, 50px)` | Feature card padding (note: bottom > top) |
| `--space-panel` | `clamp(28px, 3.4vw, 48px) clamp(24px, 3vw, 44px)` | Dark CTA panel padding |
| `--space-notice` | `clamp(24px, 3vw, 40px)` | Notice panel padding |
| `--gap-lg` | `clamp(32px, 4vw, 64px)` | Footer columns, doc grid |
| `--gap-md` | `clamp(20px, 2.4vw, 30px)` | Space card grid; desktop nav items |
| `--gap-hairline` | `1px` | Grid gap over a `--border` background — see §5 |

Fixed small gaps in use: `8 · 9 · 10 · 11 · 12 · 13 · 14 · 16 · 18 · 20 · 24 · 26 · 28 · 32`

**[inferred]** That's effectively every even number plus some odds — not a scale. Recommend snapping to
`4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64`. The 9px/11px/13px values are within 1–2px of a 4pt step and
no layout depends on the difference.

---

## 4. Layout

| Token | Value | Notes |
|---|---|---|
| `--container` | `1440px` | Main, Equipment, Rules |
| `--container-wide` | `1600px` | Events gallery only |
| `--header-height` | `100px` | Fixed, does not shrink on scroll |
| `--scroll-offset` | `90px` – `112px` | `scroll-margin-top` on anchor targets; TOC sticky `top: 112px` |
| `--measure-lead` | `62em` | Hero lead paragraph max-width |
| `--measure-body` | `34em` – `36em` | Body copy max-width |
| `--measure-display` | `24em` | Main `h1` max-width |

Sticky header: `position: sticky; top: 0; z-index: 50`.

### Breakpoints

| Width | What changes |
|---|---|
| `640px` | `.space-grid` → 2 columns |
| `860px` | `.why-grid` → 3 columns |
| `900px` | Desktop nav appears, mobile tab bar hides (`.gnb-nav` / `.m-only`) |
| `980px` | Equipment rows → alternating `1.28fr 1fr` / `1fr 1.28fr` |
| `1024px` | `.space-grid` → 4 columns |
| `1100px` | Rules TOC appears, `.doc-grid` → `236px 1fr` |

**[inferred]** These are six ad-hoc per-component values, not a shared scale — each was chosen for the
component that needed it. That is defensible (container-query thinking) but hard to maintain in CSS.
Recommend collapsing to `640 · 900 · 1100` and letting the equipment rows flip at 900 and space-grid go
4-up at 1100. Only the 900px nav breakpoint is genuinely load-bearing.

Grids that need no breakpoint (already intrinsic — keep as-is):
`repeat(auto-fit, minmax(180px, 1fr))` stats · `minmax(240px, 1fr)` steps · `minmax(300px, 1fr)` footer ·
`minmax(200px, 1fr)` refund tiers · `repeat(auto-fill, minmax(232px, 1fr))` photo gallery

---

## 5. Border, radius, elevation

**There is not one `box-shadow` in the entire export.** Every boundary in the design is a 1px line. This
is the defining characteristic of the visual language — do not introduce shadows.

| Token | Value | Uses | Role |
|---|---|---|---|
| `--border-hairline` | `1px solid #E5E5E0` | 110 | Default separator: card edges, list rows, table rules |
| `--border-emphasis` | `1px solid #1C1C1A` | 12 | Section header bottom rule; outline buttons; circled numbers |
| `--border-active` | `1.5px solid #1C1C1A` | 8 | Active nav underline (`padding-bottom: 3px`); social chip glyphs |

| Token | Value | Uses |
|---|---|---|
| `--radius` | `2px` | 28 — buttons, chips, panels. Essentially sharp |
| `--radius-sm` | `4px` | 4 — Instagram glyph square |
| `--radius-full` | `50%` | 14 — circled numbers, bullet dots, play badge, `＋` mark |

### The hairline-grid technique

Used for every card grid in the design. Instead of borders on each cell, the grid itself is the border
color and a 1px gap lets it show through:

```css
display: grid;
gap: 1px;
background: #E5E5E0;
border: 1px solid #E5E5E0;   /* cells then set background: #FBFBF9 */
```

This gives perfect single-width interior rules with no double-border seams. Preserve it.

### Placeholder hatch

```css
.ph { background-image: repeating-linear-gradient(135deg, #EAEAE3 0 10px, #F4F4F0 10px 20px); }
```

Every image in the export is an unfilled placeholder using this pattern plus a mono caption stating the
intended asset and pixel dimensions. See §9.

---

## 6. Motion

| Token | Value | Applied to |
|---|---|---|
| `--transition-fast` | `.2s` | `background`, `color`, `border-color` on buttons and links |
| `--transition` | `.25s` | `transform`, `opacity`, card hover background |

Named movements: `.eq-link:hover .eq-arrow { transform: translateX(5px) }` · photo-tile caption rises
`translateY(6px) → none` with opacity `0 → 1` · `＋` mark fades in on tile hover.

No easing function is ever specified — everything uses the browser default `ease`. **[inferred]** Fine to
keep; if you add one, a single `cubic-bezier(.2,0,.2,1)` would suit the restrained feel.

`--backdrop-blur: blur(12px)` — sticky header only.

### Accessibility gap

No `@media (prefers-reduced-motion: reduce)` block anywhere. Add one — it needs to neutralize the arrow
translate, the tile caption transform, and `scroll-behavior: smooth`.

---

## 7. Aspect ratios

| Token | Value | Used by |
|---|---|---|
| `--ratio-hero` | `16 / 7.6` | Main hero image |
| `--ratio-card` | `4 / 5` | Space cards (portrait) |
| `--ratio-media` | `3 / 2` | Equipment detail images |
| `--ratio-map` | `16 / 10` | Footer map embed |

Photo gallery uses row-span masonry instead of a ratio: `grid-auto-rows: 12px` with `span` values of
`22` (feature, also `grid-column: span 2`), `14`, and `17` cycling by index.

---

## 8. Copy-paste starting point

```css
:root {
  /* color */
  --ink: #1C1C1A;           --ink-hover: #3D3D38;
  --text-strong: #2D2D2A;   --text-body: #55554C;
  --text-secondary: #8A8A7E; --text-tertiary: #A5A599;
  --link-hover: #6E6E64;
  --border: #E5E5E0;        --surface: #F4F4F0;
  --bg: #FBFBF9;            --placeholder-stripe: #EAEAE3;
  --bg-sticky: rgba(251,251,249,0.88);
  --on-ink-muted: rgba(251,251,249,0.72);
  --border-on-ink: rgba(251,251,249,0.3);

  /* type */
  --font-serif: 'Noto Serif KR', serif;
  --font-sans: Pretendard, -apple-system, system-ui, sans-serif;
  --font-mono: ui-monospace, Menlo, monospace;

  --display-page: clamp(30px, 5vw, 68px);
  --display-section: clamp(28px, 4vw, 52px);
  --display-group: clamp(22px, 2.8vw, 34px);
  --display-card: clamp(19px, 2vw, 24px);
  --text-lead: clamp(15px, 1.4vw, 17.5px);
  --text-base: 15px;
  --text-sm: 14.5px;
  --text-ui: 13.5px;
  --text-meta: 12.5px;

  --tracking-display: -0.03em;
  --tracking-body: -0.015em;
  --tracking-ui: -0.01em;
  --tracking-eyebrow: 0.24em;
  --tracking-label: 0.2em;

  /* space */
  --gutter: clamp(20px, 4vw, 64px);
  --space-section: clamp(70px, 10vw, 140px);
  --space-header-gap: clamp(28px, 3.6vw, 52px);
  --space-panel: clamp(28px, 3.4vw, 48px) clamp(24px, 3vw, 44px);
  --gap-lg: clamp(32px, 4vw, 64px);
  --gap-md: clamp(20px, 2.4vw, 30px);

  /* layout */
  --container: 1440px;
  --container-wide: 1600px;
  --header-height: 100px;

  /* line */
  --border-hairline: 1px solid var(--border);
  --border-emphasis: 1px solid var(--ink);
  --border-active: 1.5px solid var(--ink);
  --radius: 2px;
  --radius-full: 50%;

  /* motion */
  --transition-fast: .2s;
  --transition: .25s;
  --backdrop-blur: blur(12px);
}
```

---

## 9. Notes for implementation

**Every image is a placeholder.** All four pages ship `.ph` hatch blocks with mono captions naming the
intended asset and size — `HERO — 메인 홀 와이드 전경 (2400×1140)`, `메인 홀 (1200×1500)`,
`JBL 음향 시스템 & SHURE 마이크 (1800×1200)`, `MAP EMBED — 네이버 / 카카오맵`, and 18 gallery slots. The
build needs real photography, and the placeholder component should be kept as the fallback state.

**The logo path is broken.** All four pages reference `./assets/isseum-logo.png`; the file on disk is
`assets/isseum_logo_no_BG.png`. Fix on the way in.

**Font payload.** Noto Serif KR is requested at weights 300/400/500/600/700 but only 400 and 500 are
used. Korean webfonts are large — dropping the three unused weights is a significant win. Also consider
`font-display: swap` (present on the Google request, absent from the Pretendard CDN link) and self-hosting
with `unicode-range` subsetting.

**Dead token.** `.gnb-nav { display: none }` plus a `min-width: 900px` override means the desktop nav is
mobile-hidden by default — correct, but it means the nav has no `<button>` toggle at all. The mobile
pattern is a horizontally-scrolling tab bar (`.m-only`), not a hamburger. Keep it; it's better for a
4-item nav.

**`data-path-to-node` attributes** on some `<span>`s in the Main hero are Claude Design editor artifacts.
Strip them.

Related: [[isseum-components]] for how these tokens compose.

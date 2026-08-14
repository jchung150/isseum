# ISSEUM (이씀) — 복합문화공간 website

A venue-rental site for ISSEUM, a 68-pyeong multi-purpose cultural space in Donggyo-dong, Seoul.
Content is **Korean** — set `lang="ko"` on `<html>`.

Pages: Main (공간 소개) · Equipment (보유 장비) · Rules (대관 규정) · Events (지난 행사).

## Styling: single source of truth

**All styling comes from `design/TOKENS.md`.** Component structure comes from `design/COMPONENTS.md`.
Read both before writing any markup or CSS. If a value you need isn't in TOKENS.md, add it there first
with a name, then use the name — don't inline it.

- **No hardcoded hex colors or magic pixel values** in component code. Every color, size, space, radius,
  and duration resolves through a CSS custom property defined once from TOKENS.md §8.
- If the design reference and TOKENS.md disagree, TOKENS.md wins — it records deliberate normalizations
  (see its §9).

## Non-negotiable design rules

These are properties of the visual language, not preferences. Breaking any one of them makes the site
stop looking like ISSEUM.

1. **No shadows.** There is not one `box-shadow` in the entire design. Every boundary is a 1px line.
   Elevation is expressed by border weight: `--border` hairline for internal separation, `--ink` for
   section-level rules.
2. **No accent color.** The palette is twelve warm neutrals with no brand hue. Hierarchy and even
   severity (e.g. refund tiers) are encoded by lightness, never by red/green/blue.
3. **Sharp corners.** `--radius` is `2px`. Circles (`50%`) are only for badges, bullets, and marks.
4. **Letter-spacing is load-bearing.** Korean text is tight (`-0.015em` body, `-0.03em` display); Latin
   eyebrow labels are wide (`0.18em`–`0.24em`). Never leave it at default.
5. **Fluid type, not breakpoint type.** Display sizes are `clamp()` pairs. Don't add per-breakpoint
   font-size overrides.
6. **Serif for display, sans for everything else.** Noto Serif KR at weight 500 for headings; Pretendard
   for body and UI; mono only for index numerals and placeholder captions — never body text.

## `design/` is a read-only reference

`design/*.dc.html` is an export from Claude Design. **Never edit it and never ship it.** It exists only
as the visual reference the two `.md` files were extracted from.

It will not run as-is. It depends on a Claude Design runtime that won't exist in this build:

- `style-hover="…"` is a **custom attribute, not CSS** — every hover state in the design comes from it
  and must be rewritten as a real `:hover` rule or it silently disappears.
- `<sc-for list as>`, `<sc-if value>`, `{{ expr }}`, `onClick="{{ fn }}"` are its template directives.
- Page content lives in a `<script type="text/x-dc">` `renderVals()` class per page. That data needs
  re-homing — Rules alone is ~30 bullet lines of policy copy.
- `data-path-to-node` attributes are editor artifacts. Strip them.
- All images are placeholders. The logo is referenced as `assets/isseum-logo.png` but the file on disk is
  `assets/isseum_logo_no_BG.png`.

## Accessibility floor

The reference does not meet this bar; the build must. Links are undecorated globally, which makes the
first two items critical:

- Visible `:focus-visible` on every interactive element. Only the photo tiles have any in the reference.
- Never gate an action with `pointer-events: none` on an `<a>` (the reference does this on the Rules
  page CTA) — it is unreachable by keyboard. Use a real `<button>` with `disabled`, or `aria-disabled`
  plus a handled activation.
- Include `@media (prefers-reduced-motion: reduce)`; neutralize the arrow translate, photo-tile caption
  transform, and `scroll-behavior: smooth`.
- Filters can return zero results — every filtered list needs an empty state.

## Open decisions

Don't invent answers to these; ask.

- **Stack is not chosen yet.**
- **Pricing appears nowhere** in the design. Deliberate (steer to inquiry) or missing?
- **The Main CTA promises date-availability checking** ("원하시는 날짜가 비어 있는지 먼저 확인해 보세요") but
  links to a Google Form. Needs a real calendar or softer copy.
- Four spots are unauthored in the reference: stat-row cells, feature-card icon slots, Rules TOC
  (4 entries vs 5 sections, with conflicting numbering), Equipment `notes`. See `COMPONENTS.md` §Gaps.
- Booking is an external Google Form (`bookingUrl` prop). Staying external, or moving in-house?

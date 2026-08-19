# ISSEUM (이씀) — 복합문화공간 website

Marketing site for ISSEUM, a ~60평 (198㎡) convertible multi-purpose cultural space in
동교동, Mapo-gu, Seoul, five minutes from 홍대입구역 exit 1. It rents the space for
workshops, book talks, pop-ups, fan meetings, showcases, and photo shoots.

**All content is Korean.** `<html lang="ko">` is set in `BaseLayout.astro`. Copy is written
for Korean event organisers; keep that register. Latin text appears only as wide-tracked
eyebrow labels (`WHY ISSEUM`, `RENTAL PROCESS`) — it is decorative, not translation.

**Status: live.** Serving at **`https://www.isseum.com`** (and `isseum.com`, which does
not yet redirect — see [Before launch](#before-launch)). Domain registered at 후이즈 /
Whois, DNS delegated to Cloudflare. The booking form still requires a Google sign-in, so
the site is not yet ready to promote.

---

## Stack

| | |
|---|---|
| Framework | Astro 7 (`output: 'static'`) |
| Language | TypeScript 6 (strict), plain CSS |
| Styling | CSS custom properties. **No Tailwind, no UI library** |
| Interactivity | Vanilla `<script>` in `.astro` files. **No React/Vue/Svelte** |
| Images | `astro:assets` (sharp) → WebP, responsive `srcset` |
| Fonts | Pretendard + Noto Serif KR, currently via CDN |
| SEO | `@astrojs/sitemap`, `public/robots.txt` (incl. Naver's `Yeti` crawler) |
| Hosting | Cloudflare **Workers Static Assets** — see [Deployment](#deployment) |

```bash
npm run dev      # localhost:4321 — runs as a daemon; `astro dev stop` to kill
npm run build    # astro check && astro build → dist/
npm run preview  # serve dist/
```

`npm run build` runs `astro check` first, so **type errors block the build**. Keep it at
0 errors / 0 warnings / 0 hints.

### Why this stack

Chosen deliberately, not by default:

- **Zero JS by default.** The home page ships **no JavaScript at all**; Equipment, Rules and
  Events each carry one small inlined module (~1.5 KB max). The site already pays for two
  Korean webfonts, which are heavy — spending a framework runtime on a small brochure
  site on top of that would be the wrong trade.
- **Naver.** The audience searches in Korean, and Naver's crawler handles static HTML far
  better than client-rendered content. Pre-rendered pages matter more here than for a
  Google-only audience.
- **No Tailwind** because the design has 11 fluid `clamp()` display sizes, each pairing a
  size with a specific `line-height` *and* `letter-spacing`. Expressing that as utilities
  means extending the config until it *is* `tokens.css`. See [Design rules](#design-rules).

---

## Repo map

```
CLAUDE.md                 ← this file
astro.config.mjs          site URL, static output, sitemap, image defaults
wrangler.jsonc            Cloudflare deploy config: static assets + custom domains
design/                   READ-ONLY design reference — see §Design reference
src/
  config/site.ts          business info, nav, bookingUrl, social/map links
  data/                   all page content, plain typed TS modules
    home.ts               hero slideshow + copy, stats, features, process steps
    spaces.ts             the 4 areas (메인 홀 · 프로젝트 룸 · 파우더 룸 · 바)
    equipment.ts          7 equipment items + usage notes
    rules.ts              rental policy: 4 groups, 11 items, refund tiers
    events.ts             past events + disk-discovered gallery photos
  assets/                 images processed by Astro (see §Adding content)
    events/README.md      the event-photo folder convention
  styles/
    tokens.css            ★ every design value. Single source of truth
    base.css              globals, focus ring, reduced-motion, primitives
  components/             10 components, all scoped-CSS .astro
  layouts/BaseLayout.astro  head, SEO, JSON-LD, header/footer, skip link
  pages/                  index · equipment · rules · events (hidden) · 404
```

### Content lives in `src/data/*.ts`, not in markup

Plain typed TS modules rather than Astro content collections: this content is structured
records, not prose documents, so collections' markdown/glob machinery buys nothing while TS
gives full type-checking through `astro check`. Never hardcode copy into a `.astro` file.

---

## Design rules

**All styling resolves through `src/styles/tokens.css`.** If a value you need isn't there,
add it with a name, then use the name. No literal hex colours or magic pixel values in
component code.

These five are properties of the visual language, not preferences. Break any one and the
site stops looking like ISSEUM:

1. **No shadows.** There is not one `box-shadow` in the design. Every boundary is a 1px
   line. Elevation is border weight: `--border` hairline for internal separation,
   `--border-emphasis` (`--ink`) for section-level rules. That single contrast step carries
   the entire hierarchy.
2. **No accent colour.** Twelve warm neutrals, no brand hue anywhere. Hierarchy *and
   severity* are encoded by lightness — the refund tiers go 100% 환불 → 환불 불가 by fading
   `--ink` → `--text-secondary`, never by turning red.
3. **Sharp corners.** `--radius` is `2px`. `--radius-full` (50%) is only for badges,
   bullet dots and circular marks.
4. **Letter-spacing is load-bearing.** Korean is tight (`--tracking-body` -0.015em, display
   -0.03em); Latin eyebrows are wide (0.18em–0.24em). Never leave it at browser default.
5. **Fluid type, not breakpoint type.** Display sizes are `clamp()`. Don't add
   per-breakpoint `font-size` overrides.

Serif (Noto Serif KR, weight 500) for display; Pretendard for body and UI; mono for index
numerals and placeholder captions only — never body text.

### The hairline-grid idiom

Used for every card grid. The grid *is* the border colour and 1px gaps let it show through,
giving perfect interior rules with no double-border seams:

```css
display: grid; gap: 1px; background: var(--border); border: var(--border-hairline);
/* cells then set background: var(--bg) */
```

`.hairline-grid` in `base.css`. Preserve it.

### Breakpoints — only three

`640px` · `900px` · `1100px`. The design export had six ad-hoc values; they were collapsed.
Only 900px is load-bearing (desktop nav ⇄ mobile tab bar). Prefer intrinsic grids
(`repeat(auto-fit, minmax(…, 1fr))`) over adding a fourth.

---

## Accessibility floor

Non-negotiable, and the design reference does **not** meet it — the build must.

- **Visible `:focus-visible` on every interactive element.** Links are undecorated globally
  (`a { text-decoration: none }`), so the focus ring is the only affordance a keyboard user
  gets. Global rule is in `base.css`; `.on-ink` flips it to `--bg` on dark panels.
- **Never gate an action with `pointer-events: none` on an `<a>`.** The design export did
  this on the Rules page CTA, which makes it unreachable by keyboard. The build uses
  `aria-disabled` plus a click handler, and renders **enabled** so it still works with JS
  off.
- **`prefers-reduced-motion` is respected.** `base.css` neutralises transitions globally,
  and the hero slideshow **does not auto-advance** at all under it — manual controls still
  work. If the hero looks frozen on macOS, check System Settings → Accessibility → Display →
  Reduce motion before assuming a bug.
- **Every filtered list has an empty state** plus a `role="status"` live-region count.
  Equipment and Events filters can both return zero.
- **The Events lightbox is a native `<dialog>`** with `showModal()`, which brings focus
  trapping, Escape-to-close and an inert background for free. Don't replace it with a div.
- Skip link (`본문으로 건너뛰기`) is the first focusable element.

---

## Adding content

### Event photos — just drop files in

The only auto-discovering collection. One folder per event, named exactly the event's
`slug` in `events.ts`:

```
src/assets/events/2026-06-14_이씀의밤/01.jpg, 02.jpg, 09.jpg, 10.jpg
```

Sorted numerically by filename; **first file becomes the feature tile** (double width,
taller). An event whose folder is missing or empty falls back to the placeholder hatch via
its `shots` array, so the page never breaks mid-upload. Full convention in
`src/assets/events/README.md`. Adding an event = 5 lines in `events.ts` + a folder; array
order doesn't matter, the gallery sorts by date newest-first.

### Everything else — explicit imports

Hero slides, space cards and equipment are fixed 1:1 slots, so they take explicit imports
in their data file. **Dropping a file in `src/assets/` does nothing on its own** — it must
be imported and referenced. (This has broken the build twice: renamed files with stale
imports.)

- **Hero slideshow** — `heroSlides` in `home.ts`. Reorder/swap freely; the component reads
  the array length. Optional `focus` per slide (CSS `object-position`) because the 3:2
  sources lose ~29% of height at the 16:7.6 hero crop.
- **Space cards** — `src`/`alt`/`focus` in `spaces.ts`. 4:5 portrait crop discards ~47% of
  the 3:2 frame width; `focus` nudges it.
- **Equipment** — optional `src`/`alt`/`fit` in `equipment.ts`. `fit: 'contain'` is set on
  the current product cut-outs so nothing is cropped; switch to `'cover'` when real in-situ
  photography replaces them. Items without `src` fall back to the placeholder.

### Where files go

- **`src/assets/`** — images only. Processed: WebP conversion, resizing, content hashing.
  Upload full-resolution originals (~2000px long edge); Astro downsizes.
- **`public/`** — served verbatim at the same path. For favicon, `robots.txt`, PDFs, and
  **video**.
- **Never commit video to this repo.** Astro doesn't process it and git handles large
  binaries badly — it would bloat every clone permanently. Host on Cloudflare Stream, Mux,
  or unlisted Vimeo and store the URL. `src/assets/` is already ~13 MB of photography.

### The booking form is the only conversion path

`bookingUrl` in `config/site.ts` feeds **10 CTAs** across the live pages (header, dark CTA
banners, footer link, Rules TOC button and agreement gate). Change it in one place.

---

## Deployment

`git push` to `main` is the deploy. Cloudflare Workers Builds runs `npm run build` then
`npx wrangler deploy`, and the site is live in about a minute. There is no server — the
build produces static files and Cloudflare serves them from its edge.

- **Project**: Cloudflare Workers → `isseum`. Direct URL `isseum.cloudfan150.workers.dev`
  stays live and is useful for checking a deploy before DNS-level changes.
- **`wrangler.jsonc`** declares the whole deploy: `assets.directory` = `./dist`, plus the
  custom domains as `routes` with `custom_domain: true`. **Attach domains here, not in the
  dashboard** — dashboard attempts failed silently, writing no DNS record while appearing to
  succeed. In the config, every deploy reconciles them and failures show up in the build log.
- **`html_handling: "drop-trailing-slash"`** pairs with Astro's `trailingSlash: 'never'`, so
  `/rules/` 301s to `/rules` instead of both being served.
- **`public/_headers`** works on Workers Static Assets (verified against live response
  headers, not assumed): security headers sitewide, `/_astro/*` immutable for a year, HTML
  revalidated every request.
- **`robots.txt`**: Cloudflare **prepends a managed block** to the file we ship. It declares
  `Content-Signal: search=yes, ai-train=no, use=reference` and blocks AI training crawlers
  (GPTBot, ClaudeBot, CCBot, Google-Extended, …). `search=yes` means Google and Naver index
  normally — the dashboard labelling this "disabled" is confusing; it means blocking is
  disabled. Our own rules, including Naver's `Yeti` and the sitemap line, survive underneath.
- **Node version** is supplied by the build image (24.x). The `NODE_VERSION` variable is not
  needed; an unused `nodeversion` variable may still be set in the dashboard and is harmless.

### Deploy gotcha

**Run `npm ci` locally after adding any dependency, before pushing.** CI installs with
`npm ci`, which hard-fails if `package-lock.json` and `package.json` disagree. A normal
`npm install` papers over that, so the build can break while everything works locally —
this happened once, with sharp's `@emnapi/*` transitive deps missing from the lock.

---

## Feature flags

### `showEventsPage` — `src/config/site.ts`

Currently **`false`**. The 지난 행사 archive is finished code but has no real
photography yet — all 23 gallery tiles are placeholder hatches — so it is hidden until
the venue has run enough events to fill it.

One flag drives all five consequences, so they can't fall out of step:

| | when `false` |
|---|---|
| Header nav (desktop + mobile tabs) | 공간 소개 · 보유 장비 · 대관 규정 only |
| Footer link list | 지난 행사 아카이브 removed |
| Rules page agreement CTA | `지난 행사 보기` button removed |
| `/events` page | `<meta name="robots" content="noindex, nofollow">` |
| Sitemap | `/events` excluded |

`astro.config.mjs` **imports the same flag** for the sitemap filter rather than repeating
the decision — Astro's config loader resolves the `.ts` import fine. Don't split this
across two files; that is exactly how the Events container width drifted earlier.

**The page still builds**, so you can review it at `/events` while adding photos. It just
has no inbound link and no crawler will cache it. Hiding only the nav link would have been
worse than leaving it visible: `/events` was in the sitemap, so Google and Naver would have
kept indexing a page of grey hatches.

To reopen: set the flag to `true`, add photos under `src/assets/events/<slug>/`, push.

## Divergences from the design reference

`design/` is the original Claude Design export and is **read-only** — never edit it, never
ship it. It will not run: `style-hover="…"` is a custom attribute rather than CSS, and
`<sc-for>` / `<sc-if>` / `{{ }}` are its template directives. Every hover state in the
build was rewritten as a real `:hover` rule.

Deliberate departures from it, so nobody "fixes" them back:

| | Export | Now | Why |
|---|---|---|---|
| Hero | single static image | 5-slide crossfade | requested |
| Subpage `h1` | 68px | 46px | 68px dwarfed everything under it |
| Events container | 1600px / narrower gutter | same 1440px as all pages | margins now match sitewide |
| Breakpoints | 6 ad-hoc | 640 / 900 / 1100 | maintainability |
| Rules numbering | hardcoded, self-contradictory | derived from data | see below |
| "white" | `#FFF` and `#FBFBF9` mixed | `--bg` only | `#FFF` is colder than the palette |
| Rules page head | hand-rolled `.intro` | shared `PageHero` | had drifted from the others |

**Rules numbering is derived, not stored.** The export contradicted itself four ways:
groups ran 01→02→03 then jumped to 05, the TOC listed 4 entries for 5 sections and labelled
the last 04, item 11 didn't exist (1–10 then 12), and the header claimed 12 items against
11 real ones. It now computes from the data and reads **총 11개 항목**. If 12 is the legally
correct count, an item is missing and needs writing.

Two spots were **unauthored** in the export and are my invention in the design's idiom —
replace freely: the stat-row cells (serif value over secondary label) and the feature-card
icon slots (mono index numerals).

### Design reference

`design/TOKENS.md` and `design/COMPONENTS.md` are the **extraction record of the original
export**, not live documentation. They explain *why* the design is shadow-free, accent-free
and tracking-sensitive, and they inventory all 30 original components — still worth reading
once. But **`src/styles/tokens.css` is the source of truth for values**, and the code is
the source of truth for components. Don't sync token lists into Markdown; that's what
caused the container-width drift.

---

## Before launch

Blocking:

1. **The Google Form requires a Google account.** Verified by loading
   `https://forms.gle/HCXGP9p7tJiJYrMX8` in a signed-out browser — it shows Google's sign-in
   screen, not the form. Fix in Forms settings: 이메일 주소 수집 → `수집 안 함` or
   `응답자 입력` (not 확인된), turn off 응답 횟수 1개로 제한, and if it's a Workspace form
   allow external respondents. **This is the site's only conversion path.**
2. **`isseum.com` does not redirect to `www`.** Both hostnames currently serve the site
   directly, which reads as duplicate content. Every canonical tag points at `www`, so the
   damage is limited, but it should be a real 301. Fix with a Cloudflare **Redirect Rule**:
   match `Hostname equals isseum.com`, action Dynamic,
   `concat("https://www.isseum.com", http.request.uri.path)`, status 301, preserve query
   string. Dynamic rather than static so `/rules` doesn't collapse to the homepage.
   Redirect Rules run before Workers, so the rule wins over the apex custom domain.
3. **Social and map links are `href="#"`** — 인스타그램, 네이버 블로그, 네이버 지도, 카카오맵
   in `config/site.ts`.
4. **Register with 네이버 서치어드바이저 and Google Search Console.** Naver matters more for
   this audience. Sitemap is at `/sitemap-index.xml`. Verification file goes in `public/`.
5. **Event photography**, which is what `showEventsPage` is waiting on — see
   [Feature flags](#feature-flags).

### Done

Favicons (`favicon-16/32`, `apple-touch-icon`, `icon-192/512`, `site.webmanifest`) and the
1200×630 `og-image.jpg` are generated and wired into `BaseLayout.astro`. Both were produced
from the repo's own assets, so they can be regenerated:

- **Icons** — sharp, from `design/assets/isseum_logo_no_BG.png`. The mark is knocked out of
  an `--ink` tile because a 1:1.98 portrait wordmark on a light background is illegible at
  small sizes. 16px and 32px use **only the `이` glyph** (the mark's first row, found by
  detecting fully-transparent row gaps); 180px and up use the full stacked mark.
- **OG image** — rendered by screenshotting an HTML layout in headless Chrome rather than
  drawing it with sharp, because sharp/librsvg can't reliably render Korean text without the
  webfont installed. This way it uses the real Noto Serif KR and real tokens.

Should do:

6. **Self-host and subset the fonts.** Currently CDN (`fonts.googleapis.com` +
   jsDelivr) — a third-party dependency on every page load, and Korean webfonts are large.
   Noto Serif KR is already trimmed to weights 400/500 (from five).
7. **Map embed** — placeholder only; needs a Naver or Kakao Maps key.
8. `isseum_control-room_mixer.jpg` is unused — no matching equipment item exists, though
   the notes copy mentions 믹서. Either add an 음향 item or delete the file.
9. 이동식 강연대 and 초고속 Wi-Fi have no photo (they fall back to placeholders).

Open product questions — **don't invent answers, ask**:

10. **No pricing anywhere.** A venue's most-asked question. Deliberate (steer to inquiry) or
    missing?
11. **The home CTA promises date-availability checking** ("원하시는 날짜가 비어 있는지 먼저
    확인해 보세요") but links to a static form. Needs a real calendar or softer copy.
12. **Korean only** — no `hreflang`, no language switcher. Retrofitting is painful because
    the letter-spacing scale is tuned for Korean.

---

## Gotchas

Things that have actually bitten, in this order of likelihood:

- **`astro check` treats an unused `Props` interface as a hint.** Annotate the destructure
  (`const { … }: Props = Astro.props`) rather than leaving it inferred.
- **Malformed class names don't fail the build.** A bulk find-and-replace once produced
  `class="containerfilters"`, silently dropping the container entirely, and the build stayed
  green. Verify layout changes by rendering, not by compiling.
- **`@astrojs/check` peers TypeScript `^5 || ^6`.** TS 7 exists; installing it breaks
  `npm install`. Pin TS to `^6`.
- **Renaming a file in `src/assets/` breaks its import.** The import path is a hard
  reference; there is no auto-discovery outside `src/assets/events/`.
- **The dev server daemonises.** `npm run dev` returns immediately; use `astro dev stop`.
- **Chrome `--dump-dom` output contains NUL bytes**, so `grep` treats it as binary and
  prints nothing. Pipe through node, or use `grep -a`.
- The logo asset was originally 88% transparent padding (a 496×984 mark on a 2000×2000
  canvas). It's trimmed now; the original is preserved at
  `design/assets/isseum_logo_no_BG.png`. Sizes are `--logo-height` / `--logo-height-footer`.

---

## Conventions

- Commit messages in English, imperative. Branch off `main` for anything non-trivial.
- Component CSS is scoped `<style>` in the `.astro` file. Only genuinely global primitives
  go in `base.css`.
- Use `:global()` sparingly, and only to style an `<Image>` rendered by a child component.
- BEM-ish class names scoped per component (`.tile__cap`, `.hero__lead`). One leftover
  misnomer: `.intro__emphasis` on the Rules page now lives in a `PageHero` slot;
  `.rules__emphasis` would read better.
- Korean copy uses `·` as a separator and `—` (em dash) before explanatory clauses, matching
  the reference. Bullet-line labels end with `— ` inside `<strong>`.

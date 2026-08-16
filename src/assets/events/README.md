# Event photos

Drop photos here and they appear in the 지난 행사 gallery. No code change needed.

## How

One folder per event, named exactly the `slug` in `src/data/events.ts`:

```
src/assets/events/
  2026-06-14_이씀의밤/
    01.jpg
    02.jpg
    03.jpg
```

- Files are sorted by **filename**, numerically — `01`, `02`, `09`, `10` in that
  order. Zero-pad so ordering stays obvious.
- The **first file becomes the feature tile**: double width and taller.
- Formats: `.jpg` `.jpeg` `.png` `.webp` `.avif`. Astro converts and resizes
  them, so upload full-resolution originals — around 2000px on the long edge.
- An event whose folder is missing or empty falls back to the placeholder hatch,
  so the page never breaks while you're mid-upload.

## Captions

Optional. Alt text defaults to the event title. To caption individual files, add
a `captions` map to that event in `src/data/events.ts`, keyed by filename:

```ts
captions: { '01.jpg': '무대 전경', '02.jpg': '관객석' }
```

## Adding a new event

Add an entry to `events` in `src/data/events.ts` (date, category, title, slug),
then create the matching folder. Order in the array doesn't matter — the gallery
sorts by date, newest first.

## Video

Not wired up yet. When it is: host the file externally (Cloudflare Stream, Mux,
unlisted Vimeo) and store the URL — do **not** commit video to this repo. Git
handles large binaries badly and it would bloat every clone forever. A poster
still can live in the event folder.

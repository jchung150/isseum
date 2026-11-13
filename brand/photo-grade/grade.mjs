#!/usr/bin/env node
/**
 * ISSEUM photo grade. Applies the house colour edit to any photo, so every
 * Instagram post, story and site image looks like it was shot the same day.
 * The values and the reasons behind them are in README.md next to this file.
 *
 *   node brand/photo-grade/grade.mjs <photo or folder>... --out <folder> [--size 1080x1350]
 *
 * Without --size the photo keeps its shape and is shrunk to 2000px on the long
 * edge (the size the website wants). With --size it is cropped to fill that box
 * from the centre. Output is always JPEG, named after the input.
 */
import { createRequire } from 'node:module';
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// sharp lives in the repo's node_modules; resolve it from the repo root.
const root = resolve(fileURLToPath(import.meta.url), '../../..');
const sharp = createRequire(join(root, 'package.json'))('sharp');

/** The house grade. Change it here and in README.md together. */
export const GRADE = {
  // 1. Levels: stretch the darkest 1% to black and the brightest 0.5% to white.
  //    Fluorescent ceiling light leaves our photos grey and flat.
  levels: { lower: 1, upper: 99.5 },
  // 2. Slightly brighter, noticeably more colour.
  brightness: 1.04,
  saturation: 1.24,
  // 3. Contrast: ×1.06, then pull everything down 6 levels so blacks stay deep.
  contrast: { a: 1.06, b: -6 },
  // 4. Warmth: red +2.5%, blue −3%. Any warmer and the white walls turn yellow.
  warmth: { red: 1.025, blue: 0.97 },
};

export function grade(input) {
  return sharp(input)
    .rotate() // bake in phone EXIF rotation (Galaxy photos arrive sideways)
    .normalise(GRADE.levels)
    .modulate({ brightness: GRADE.brightness, saturation: GRADE.saturation })
    .linear(GRADE.contrast.a, GRADE.contrast.b)
    .recomb([
      [GRADE.warmth.red, 0, 0],
      [0, 1, 0],
      [0, 0, GRADE.warmth.blue],
    ]);
}

const PHOTO = /\.(jpe?g|png|heic|webp|tiff?)$/i;

async function main(argv) {
  const outIdx = argv.indexOf('--out');
  const sizeIdx = argv.indexOf('--size');
  if (outIdx < 0 || !argv[outIdx + 1]) {
    console.error('usage: grade.mjs <photo or folder>... --out <folder> [--size 1080x1350]');
    process.exit(1);
  }
  const out = resolve(argv[outIdx + 1]);
  const size = sizeIdx >= 0 ? argv[sizeIdx + 1].split('x').map(Number) : null;
  const skip = new Set([outIdx, outIdx + 1, sizeIdx, sizeIdx + 1]);
  const inputs = argv
    .filter((_, i) => !skip.has(i))
    .flatMap((p) => (statSync(p).isDirectory() ? readdirSync(p).map((f) => join(p, f)) : [p]))
    .filter((p) => PHOTO.test(p));

  mkdirSync(out, { recursive: true });
  for (const file of inputs) {
    const target = join(out, `${basename(file, extname(file))}.jpg`);
    const img = grade(file);
    if (size) img.resize(size[0], size[1], { fit: 'cover' });
    else img.resize(2000, 2000, { fit: 'inside', withoutEnlargement: true });
    await img.jpeg({ quality: 90, mozjpeg: true }).toFile(target);
    console.log(`${basename(file)} → ${target}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main(process.argv.slice(2));

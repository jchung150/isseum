// Usage: node brand/photo-grade/blur.mjs <photo folder> <boxes.json> <output folder>
// Blur TV screens (rectangles) and front-facing faces (soft ellipses) on the graded photos.
// Boxes are percentages of width/height: [x, y, w, h], top-left origin.
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const sharp = createRequire('/Users/juan/Projects/isseum/package.json')('sharp');
const [dir, boxesFile, outDir] = process.argv.slice(2);
const boxes = JSON.parse(readFileSync(boxesFile, 'utf8'));
for (const [name, { tv, face }] of Object.entries(boxes)) {
  const src = `${dir}/${name}.jpg`;
  const img = sharp(src);
  const { width: W, height: H } = await img.metadata();
  const base = await sharp(src).toBuffer();
  const layers = [];
  const add = async ([x, y, w, h], kind) => {
    // Faces get a little margin; screens are inset slightly so the TV bezel stays sharp.
    const pad = kind === 'face' ? 0.12 : -0.03;
    let L = Math.round((x - w * pad) / 100 * W), T = Math.round((y - h * pad) / 100 * H);
    let R = Math.round((x + w * (1 + pad)) / 100 * W), B = Math.round((y + h * (1 + pad)) / 100 * H);
    L = Math.max(0, L); T = Math.max(0, T); R = Math.min(W, R); B = Math.min(H, B);
    const cw = R - L, ch = B - T;
    const sigma = Math.max(8, Math.min(cw, ch) / (kind === 'face' ? 5 : 8));
    let patch = await sharp(base).extract({ left: L, top: T, width: cw, height: ch }).blur(sigma).toBuffer();
    if (kind === 'face') {
      const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}"><defs><filter id="f"><feGaussianBlur stdDeviation="${Math.min(cw, ch) / 10}"/></filter></defs><ellipse cx="${cw / 2}" cy="${ch / 2}" rx="${cw * 0.42}" ry="${ch * 0.44}" fill="#fff" filter="url(#f)"/></svg>`);
      patch = await sharp(patch).ensureAlpha().composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
    }
    layers.push({ input: patch, left: L, top: T });
  };
  for (const b of tv) await add(b, 'tv');
  for (const b of face) await add(b, 'face');
  await sharp(base).composite(layers).jpeg({ quality: 90, mozjpeg: true }).toFile(`${outDir}/${name}.jpg`);
  console.log(name, tv.length, 'tv', face.length, 'faces');
}

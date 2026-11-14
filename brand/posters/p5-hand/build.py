"""P5 · hand-drawn marker letters. Prints the SVG body for the PosterSlow canvas board.

Letters are skeleton strokes in a 0..100 box, drawn with a fixed-width round marker
(vector-effect keeps the stroke even when a letter is squashed or stretched).
Each letter gets its own box size, tilt and bounce, so no two look set by a font.
"""
import json, random, sys

SK = {
 'S': 'M82 18C66 2 26 6 24 26C22 44 50 46 60 50C80 56 88 72 78 86C66 100 26 96 14 80',
 'L': 'M24 12L24 72Q24 88 40 88L82 88',
 'O': 'M50 12C92 12 92 88 50 88C8 88 8 12 50 12Z',
 'W': 'M10 14L24 78Q28 94 37 80L50 52L63 80Q72 94 76 78L90 14',
 'D': 'M22 12L22 88L44 88C94 88 94 12 44 12Z',
 'N': 'M20 88L20 18Q20 8 27 18L73 82Q80 92 80 82L80 12',
 'Y': 'M14 12Q32 46 50 54M86 12Q68 46 50 54L50 88',
 'U': 'M20 12L20 58C20 94 80 94 80 58L80 12',
 'A': 'M12 88L41 24Q50 6 59 24L88 88M28 62L72 62',
 'R': 'M22 88L22 12L48 12C86 12 86 54 48 54L22 54M46 54L82 88',
 'E': 'M80 12L40 12Q22 12 22 30L22 70Q22 88 40 88L80 88M22 50L64 50',
 'I': 'M50 10L50 90',
 'G': 'M84 26C70 6 18 8 16 48C14 92 72 96 84 68L84 54L56 54',
 'F': 'M80 12L40 12Q22 12 22 30L22 88M22 50L64 50',
}
WIDTH = {'I': 70, 'W': 230, 'O': 190, 'D': 180, 'G': 190, 'A': 200, 'Y': 180, 'N': 196, 'E': 176}
ROWS = ['SLOW', 'DOWN', 'YOU', 'ARE', 'DOING', 'FINE']
X0, W, TOP, ROW_H, GAP, STROKE = 0, 1188, 0, 222, -10, 46
STEP = 186   # rows bite into each other: STEP < ROW_H
SIZE = 0.96  # one size for every row, so line lengths stay ragged

TOP = (1680 - (STEP * (len(ROWS) - 1) + ROW_H)) // 2 - 40
rnd = random.Random(int(sys.argv[1]) if len(sys.argv) > 1 else 21)
y = TOP
out = []
for word in ROWS:
    ws = [WIDTH.get(c, 168) * rnd.uniform(0.9, 1.12) for c in word]
    scale = SIZE
    ws = [w * scale for w in ws]
    x = X0 + (W - sum(ws) - GAP * (len(word) - 1)) / 2 + rnd.uniform(-14, 14)
    for c, w in zip(word, ws):
        h = ROW_H * rnd.uniform(0.86, 1.12)
        dy = rnd.uniform(-12, 12)
        rot = rnd.uniform(-5, 5)
        # skeleton box sits inside the stroke, so pad by half the marker width
        bw, bh = w - STROKE, h - STROKE
        cx, cy = x + w / 2, y + ROW_H / 2 + dy
        out.append(
            f'<g transform="translate({cx:.1f} {cy:.1f}) rotate({rot:.1f}) '
            f'translate({-bw/2:.1f} {-bh/2:.1f}) scale({bw/100:.3f} {bh/100:.3f})">'
            f'<path d="{SK[c]}" vector-effect="non-scaling-stroke"/></g>')
        x += w + GAP
    y += STEP
print(json.dumps({'svg': ''.join(out), 'bottom': round(y - STEP + ROW_H)}))

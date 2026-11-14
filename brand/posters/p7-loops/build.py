"""P7 · giant looped letters with small programme blocks. Prints the board's inner HTML.

Big letters are single thick strokes (skeletons in a 0..100 box), tilted and cropped by the edge.
Small blocks are caps lines, each underlined, tilted to sit in the gaps between the letters.
"""
import json

C = '#0526c5'
STROKE = 80
SK = {
 'I': 'M50 4 L50 96',  # a loop would clog: the I is too narrow for one at this stroke
 'S': 'M84 18 C70 2 28 2 22 24 C16 46 50 50 62 54 C84 60 90 78 78 90 C64 102 24 100 12 82',
 'E': 'M10 52 L90 52 C90 20 70 6 50 6 C24 6 8 28 8 52 C8 80 28 96 52 96 C70 96 84 88 92 76',
 'U': 'M14 4 L14 60 C14 100 86 100 86 60 L86 4',
 'M': 'M8 96 L8 12 C8 0 20 0 24 10 L50 64 L76 10 C80 0 92 0 92 12 L92 96',
}
# letter, x, y, w, h, rotation
BIG = [
 ('I',   40,  30, 200, 560,  -6),
 ('S',  560,  10, 470, 600,  10),
 ('S',  -10, 620, 470, 540, -12),
 ('E',  560, 590, 640, 540,   8),
 ('U',   30, 1270, 520, 560,  6),
 ('M',  600, 1260, 640, 600, -8),
]
# lines, x, y, rotation, font size. Every block sits in a gap: text and letters share one colour.
BLOCKS = [
 (['ISSEUM', 'PRESENTS'],                        310,   70,  -4, 44),
 (['SAT 05.12', '14H', '– 20H'],                  1000, 440,   6, 44),
 (['OPEN', 'STUDIO DAY'],                        380,  560,  -3, 50),
 (['22 WORLD CUP-', 'BUK-RO, MAPO-GU', 'SEOUL'], 440, 1112,  4, 34),
 (['STORY TABLE'],                               40,  1196,  -6, 40),
 (['ZINE MAKING'],                               820, 1176,  -6, 38),
 (['LISTENING ROOM'],                            500, 1060, -84, 38),
]

svg = []
for L, x, y, w, h, r in BIG:
    bw, bh = w - STROKE, h - STROKE
    svg.append(f'<g transform="translate({x + w/2} {y + h/2}) rotate({r}) translate({-bw/2} {-bh/2}) scale({bw/100:.3f} {bh/100:.3f})">'
               f'<path d="{SK[L]}" vector-effect="non-scaling-stroke"/></g>')
html = []
for lines, x, y, r, fs in BLOCKS:
    rows = ''.join(f'<span style="display: block; width: fit-content; padding: 0 6px 2px 0; border-bottom: 3px solid {C};">{t}</span>' for t in lines)
    html.append(f'<div style="position: absolute; left: {x}px; top: {y}px; transform: rotate({r}deg); transform-origin: 0 0; font-size: {fs}px; line-height: 1.08; font-weight: 500; letter-spacing: 0.01em;">{rows}</div>')
print(json.dumps({'svg': ''.join(svg), 'html': '\n  '.join(html)}))

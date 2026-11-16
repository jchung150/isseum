"""Build A3 print PDFs (trim and 3 mm bleed) from the canvas boards.

Boards in boards/ are copies of the canvas artifact's project/Poster*.dc.html.
Refresh them from the canvas before rebuilding. Run from the repo root:
    python3 brand/posters/print/make.py
Output goes to brand/posters/print/pdf/ (gitignored: about 22 MB each).

Bleed: the board is scaled up uniformly so its width covers the bleed width,
which also covers the bleed height. With 3 mm bleed the poster grows about 2%,
with 1 mm (the digital print shop's 299x422 spec) under 1%. Margins are 20 mm or more, so nothing important is lost.
Chrome flattens the page to a 300 dpi image because of the grain blend layer.
"""
import os, re, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
POSTERS = os.path.dirname(HERE)
BOARDS = [('p1', 'PosterForm'), ('p2', 'PosterForm3'), ('p3', 'PosterType'), ('p4', 'PosterPuff'),
          ('p5', 'PosterSlow'), ('p6', 'PosterProgram'), ('p7', 'PosterLoops')]
# Canvas asset urls -> local originals.
BLOBS = {'/_blob/2e3ba408fa66c542c36ffc683f416fe6': f'{POSTERS}/p7-loops/p7-full.svg',
         '/_blob/abbb87aa21bc18169ae7c337f4fb9788': f'{POSTERS}/p6-program/story-table.svg'}
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
PX_PER_MM = 96 / 25.4


def exact_mediabox(path, w_mm, h_mm):
    """Chrome rounds the page to whole CSS pixels (299 mm comes out as 299.13).
    Print shops check the size to 0.1 mm, so rewrite the MediaBox to the exact
    size. The new string is padded to the old length so xref offsets stay valid;
    the box is anchored at the top-left so the artwork does not move."""
    b = open(path, 'rb').read()
    m = re.search(rb'/MediaBox\s*\[([^\]]*)\]', b)
    old_h = float(m.group(1).split()[3])
    w, h = w_mm * 72 / 25.4, h_mm * 72 / 25.4
    new = f'0 {old_h - h:.2f} {w:.2f} {old_h:.2f}'.encode()
    assert len(new) <= len(m.group(1)), new
    b = b[:m.start(1)] + new.ljust(len(m.group(1))) + b[m.end(1):]
    open(path, 'wb').write(b)


SIZES = {'a3': (297, 420), 'a3-bleed1mm': (299, 422), 'a3-bleed3mm': (303, 426)}

out_dir = f'{HERE}/pdf'; tmp = f'{HERE}/pdf/.html'
os.makedirs(tmp, exist_ok=True)
for n, f in BOARDS:
    s = open(f'{HERE}/boards/{f}.dc.html').read()
    links = ''.join(re.findall(r'<link [^>]*>', s))
    body = s[s.index('<div style="position: relative'):s.index('</x-dc>')]
    for k, v in BLOBS.items():
        body = body.replace(k, 'file://' + v)
    for kind, (W, H) in SIZES.items():
        k = W * PX_PER_MM / 1188
        top = (H * PX_PER_MM - 1680 * k) / 2
        html = f'''<!doctype html><html><head><meta charset="utf-8">{links}<style>
@page{{size:{W}mm {H}mm;margin:0}}html,body{{margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.b{{position:absolute;left:0;top:{top/k:.3f}px;zoom:{k:.6f};width:1188px;height:1680px;overflow:hidden}}</style></head>
<body><div style="position:relative;width:{W}mm;height:{H}mm;overflow:hidden"><div class="b">{body}</div></div></body></html>'''
        h = f'{tmp}/{n}-{kind}.html'
        open(h, 'w').write(html)
        out = f'{out_dir}/isseum-poster-{n}-{kind}.pdf'
        subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
                        '--allow-file-access-from-files', '--virtual-time-budget=5000',
                        f'--print-to-pdf={out}', 'file://' + h],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        exact_mediabox(out, W, H)
        print(os.path.basename(out), f'{os.path.getsize(out)/1e6:.1f} MB')

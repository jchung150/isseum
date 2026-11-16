"""Build A3 print PDFs (trim and 3 mm bleed) from the canvas boards.

Boards in boards/ are copies of the canvas artifact's project/Poster*.dc.html.
Refresh them from the canvas before rebuilding. Run from the repo root:
    python3 brand/posters/print/make.py
Output goes to brand/posters/print/pdf/ (gitignored: about 22 MB each).

Bleed: the board is scaled up uniformly so its width covers the bleed width,
which also covers the bleed height. With 3 mm bleed the poster grows about 2%,
with 1 mm (the digital print shop's 299x422 spec) under 1%. Margins are 20 mm or more, so nothing important is lost.
Each page is a single opaque 300 dpi JPEG: no fonts, no transparency (see image_pdf).
"""
import math, os, re, struct, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
POSTERS = os.path.dirname(HERE)
BOARDS = [('p1', 'PosterForm'), ('p2', 'PosterForm3'), ('p3', 'PosterType'), ('p4', 'PosterPuff'),
          ('p5', 'PosterSlow'), ('p6', 'PosterProgram'), ('p7', 'PosterLoops')]
# Canvas asset urls -> local originals.
BLOBS = {'/_blob/2e3ba408fa66c542c36ffc683f416fe6': f'{POSTERS}/p7-loops/p7-full.svg',
         '/_blob/abbb87aa21bc18169ae7c337f4fb9788': f'{POSTERS}/p6-program/story-table.svg'}
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
PX_PER_MM = 96 / 25.4


DPI = 300


def jpeg_size(data):
    i = 2
    while True:
        marker, length = data[i + 1], struct.unpack('>H', data[i + 2:i + 4])[0]
        if 0xC0 <= marker <= 0xCF and marker not in (0xC4, 0xC8, 0xCC):
            h, w = struct.unpack('>HH', data[i + 5:i + 9])
            return w, h
        i += 2 + length


def image_pdf(jpg, out, w_mm, h_mm):
    """Write a one-page PDF holding only this JPEG, stretched to exactly w_mm x h_mm.

    Print shops reject Chrome's own PDFs: its Type3 fonts count as "not embedded"
    and the grain layer leaves transparency (SMask). One opaque image has neither,
    and the page box is exact (Chrome rounds 299 mm to 299.13).
    """
    data = open(jpg, 'rb').read()
    px_w, px_h = jpeg_size(data)
    w, h = w_mm * 72 / 25.4, h_mm * 72 / 25.4
    content = f'q {w:.3f} 0 0 {h:.3f} 0 0 cm /Im0 Do Q'.encode()
    objs = [
        b'<< /Type /Catalog /Pages 2 0 R >>',
        b'<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
        f'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {w:.3f} {h:.3f}] '
        f'/Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>'.encode(),
        f'<< /Type /XObject /Subtype /Image /Width {px_w} /Height {px_h} /ColorSpace /DeviceRGB '
        f'/BitsPerComponent 8 /Filter /DCTDecode /Length {len(data)} >>\nstream\n'.encode() + data + b'\nendstream',
        f'<< /Length {len(content)} >>\nstream\n'.encode() + content + b'\nendstream',
    ]
    pdf, offsets = bytearray(b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n'), []
    for i, o in enumerate(objs, 1):
        offsets.append(len(pdf))
        pdf += f'{i} 0 obj\n'.encode() + o + b'\nendobj\n'
    xref = len(pdf)
    pdf += f'xref\n0 {len(objs) + 1}\n0000000000 65535 f \n'.encode()
    pdf += b''.join(f'{x:010d} 00000 n \n'.encode() for x in offsets)
    pdf += f'trailer\n<< /Size {len(objs) + 1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n'.encode()
    open(out, 'wb').write(pdf)


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
        png, jpg = f'{tmp}/{n}-{kind}.png', f'{tmp}/{n}-{kind}.jpg'
        css_w, css_h = math.ceil(W * PX_PER_MM), math.ceil(H * PX_PER_MM)
        subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars',
                        '--allow-file-access-from-files', '--virtual-time-budget=5000',
                        f'--force-device-scale-factor={DPI / 96}', f'--window-size={css_w},{css_h}',
                        f'--screenshot={png}', 'file://' + h],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '95', png, '--out', jpg],
                       stdout=subprocess.DEVNULL, check=True)
        image_pdf(jpg, out, W, H)
        print(os.path.basename(out), f'{os.path.getsize(out)/1e6:.1f} MB')

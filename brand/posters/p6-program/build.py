"""P6 · programme guide poster. Prints the line drawing (SVG body) for the PosterProgram board.

Stick figures around one long table, drawn as cobalt round-cap strokes on the lime panel.
Everything is plain geometry so it can be redrawn without an illustrator.
"""
import json, math

C = '#0526c5'
out = []
def p(d, w=6, fill='none'):
    out.append(f'<path d="{d}" fill="{fill}" stroke="{C}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')
def circle(x, y, r, w=6, fill='#eafda1'):
    out.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{C}" stroke-width="{w}"/>')
def dot(x, y, r=4.5):
    out.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{C}"/>')

def face(x, y, look=0, mood='smile'):
    dot(x - 11 + look, y - 4); dot(x + 11 + look, y - 4)
    if mood == 'smile':
        p(f'M{x-10+look} {y+10} Q{x+look} {y+20} {x+10+look} {y+10}', 5)
    elif mood == 'talk':
        out.append(f'<ellipse cx="{x+look}" cy="{y+14}" rx="6" ry="8" fill="none" stroke="{C}" stroke-width="5"/>')

def hair(x, y, style):
    r = 34
    if style == 'spikes':
        for a in (-60, -30, 0, 30, 60):
            t = math.radians(a - 90); x1, y1 = x + r*math.cos(t), y + r*math.sin(t)
            p(f'M{x1:.0f} {y1:.0f} L{x1 + 16*math.cos(t):.0f} {y1 + 16*math.sin(t):.0f}', 5)
    elif style == 'bun':
        circle(x + 6, y - r - 14, 14)
    elif style == 'curls':
        for a in range(-150, -20, 26):
            t = math.radians(a); circle(x + (r+4)*math.cos(t), y + (r+4)*math.sin(t), 9, 5)
    elif style == 'fringe':
        p(f'M{x-30} {y-14} Q{x-8} {y-46} {x+30} {y-16}', 5)
        p(f'M{x-6} {y-34} L{x-14} {y-16} M{x+10} {y-33} L{x+4} {y-14}', 5)
    elif style == 'long':
        p(f'M{x-28} {y-20} Q{x} {y-50} {x+28} {y-20} M{x-32} {y-6} L{x-36} {y+40} M{x+32} {y-6} L{x+36} {y+40}', 5)

def sitter(x, y, style, look=0, mood='smile', arms=(-46, 46)):
    p(f'M{x} {y+34} L{x} {y+150}')                                   # body
    p(f'M{x} {y+62} L{x+arms[0]} {y+156} M{x} {y+62} L{x+arms[1]} {y+156}')  # arms to the table
    circle(x, y, 34); hair(x, y, style); face(x, y, look, mood)

# back row, sitting behind the table
TY = 960
for x, st, lk, md, arms in [(330, 'spikes', 0, 'smile', (-40, 50)),
                            (500, 'long', 4, 'talk', (-50, 44)),
                            (670, 'curls', -4, 'smile', (-44, 40)),
                            (840, 'bun', -2, 'smile', (-50, 46))]:
    sitter(x, 790, st, lk, md, arms)

# the long table, filled lime so it hides the bodies behind it
p(f'M210 {TY} L978 {TY} L1010 {TY+52} L178 {TY+52} Z', 6, '#eafda1')
for lx in (300, 888): p(f'M{lx} {TY+52} L{lx} {TY+168}')
p(f'M594 {TY+52} L594 {TY+130}')

# story cards on the table
for cx, rot in [(300, -8), (470, 6), (640, -4), (810, 8)]:
    out.append(f'<g transform="translate({cx} {TY+26}) rotate({rot})"><rect x="-38" y="-16" width="76" height="32" rx="4" fill="#ffffff" stroke="{C}" stroke-width="5"/>'
               f'<path d="M-24 -4 L20 -4 M-24 6 L8 6" stroke="{C}" stroke-width="4" stroke-linecap="round"/></g>')

# people at both ends, on stools
for x, st, look, side in [(140, 'fringe', 6, 1), (1048, 'spikes', -6, -1)]:
    y = 840
    circle(x, y, 34); hair(x, y, st); face(x, y, look, 'smile')
    p(f'M{x} {y+34} L{x} {y+160}')
    p(f'M{x} {y+70} L{x + side*70} {TY+20}')                       # reaching to the table
    p(f'M{x} {y+160} L{x + side*56} {y+176} L{x + side*56} {y+250}')  # knee and shin
    out.append(f'<ellipse cx="{x + side*70}" cy="{y+254}" rx="18" ry="8" fill="none" stroke="{C}" stroke-width="5"/>')
    p(f'M{x - 40} {y+176} L{x + 40} {y+176} M{x - 30} {y+176} L{x - 36} {y+262} M{x + 30} {y+176} L{x + 36} {y+262}')  # stool

# a story blooming out of the talker's mouth
p('M520 760 Q560 720 590 700', 5)
for a in range(0, 360, 72):
    t = math.radians(a); circle(620 + 22*math.cos(t), 668 + 22*math.sin(t), 14, 5, '#ffffff')
circle(620, 668, 10, 5, '#eafda1')
for d in ('M676 640 L694 626', 'M682 664 L704 664', 'M674 688 L692 700'):
    p(d, 5)

print(json.dumps({'svg': ''.join(out)}))

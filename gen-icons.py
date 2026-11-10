#!/usr/bin/env python3
"""Piirtää sovelluksen kuvakkeet (icons/icon-*.png) ilman ulkoisia kirjastoja."""
import zlib, struct, pathlib

BG = (21, 20, 15); WOOD = (70, 49, 34); FRET = (189, 181, 166); STR = (217, 208, 191); NUT = (236, 228, 210)
DOTS = [  # (x, y, väri) suhteellisina koordinaatteina
    (0.30, 0.42, (251, 146, 60)), (0.52, 0.42, (241, 237, 228)), (0.52, 0.53, (241, 237, 228)),
]

def render(size):
    px = [[list(BG) for _ in range(size)] for _ in range(size)]
    s = size
    def rect(x0, y0, x1, y1, c):
        for y in range(int(y0*s), int(y1*s)):
            for x in range(int(x0*s), int(x1*s)):
                px[y][x] = list(c)
    def blend(x, y, c, a):
        p = px[y][x]
        for k in range(3): p[k] = round(p[k]*(1-a) + c[k]*a)
    def circle(cx, cy, r, c):
        cx, cy, r = cx*s, cy*s, r*s
        for y in range(int(cy-r-2), int(cy+r+2)):
            for x in range(int(cx-r-2), int(cx+r+2)):
                d = ((x+.5-cx)**2 + (y+.5-cy)**2) ** .5
                a = max(0.0, min(1.0, r - d + .5))
                if a > 0: blend(x, y, c, a)
    # otelauta turva-alueen sisällä (maskable-kuvakkeet)
    rect(0.16, 0.28, 0.86, 0.72, WOOD)
    rect(0.14, 0.28, 0.165, 0.72, NUT)
    for fx in (0.41, 0.63, 0.86):
        rect(fx-0.006, 0.28, fx+0.006, 0.72, FRET)
    for i in range(4):
        y = 0.31 + i*0.11
        th = 0.006 + i*0.0025
        rect(0.16, y-th, 0.86, y+th, STR)
    for x, y, c in DOTS:
        circle(x, y, 0.052, (0, 0, 0))
        circle(x, y, 0.047, c)
    return px

def png(px):
    h = len(px); w = len(px[0])
    raw = b''.join(b'\x00' + bytes(v for p in row for v in p) for row in px)
    chunk = lambda t, d: struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)) + chunk(b'IDAT', zlib.compress(raw, 9)) + chunk(b'IEND', b'')

out = pathlib.Path(__file__).parent / 'icons'
out.mkdir(exist_ok=True)
for size in (180, 192, 512):
    (out / f'icon-{size}.png').write_bytes(png(render(size)))
    print(f'icons/icon-{size}.png')

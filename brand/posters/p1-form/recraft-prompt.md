# P1 도형 · Recraft 프롬프트

P1(겹친 도형, 흰색 A3)의 가운데 도형 부분만 Recraft로 그린다. 글자(isseum / here, now, together.)는
보드에서 그대로 쓰고, 그림에는 글자를 넣지 않는다. 글자를 그림에 넣으면 고치기도, 인쇄 품질을 맞추기도 어렵다.

## 설정

- Style: Vector illustration (질감을 원하면 Digital illustration → Grain / Risograph 계열)
- Aspect ratio: 4:5 (보드의 도형 영역이 세로로 조금 길다)
- Colors: #0526C5 · #EAFDA1 · #C9D0F2 · #111111, 배경 #FAFAF8
- Export: SVG(질감 없는 버전) 또는 PNG(질감 버전)

## Prompt

A minimal Bauhaus-inspired abstract composition of overlapping flat geometric shapes on an off-white paper background (#FAFAF8). A large black square in the upper right; a pale periwinkle circle (#C9D0F2) overlapping it from the left; a bold cobalt blue circle (#0526C5) in the centre overlapping both; a soft lime square (#EAFDA1) in the lower left tucked under the cobalt circle; a pale periwinkle half-circle cut flat on its right side at the bottom; and a small black square in the lower right. Where shapes overlap, the colors mix like transparent printing inks (multiply), creating darker blended areas. Subtle risograph grain texture over everything. Clean edges, balanced asymmetry, generous margins, calm and modern.

## Negative prompt

text, letters, numbers, logo, gradient, glossy, 3D, shadow, perspective, outlines, extra colors, red, orange, yellow, frame, border

## 변주 (도형 부분만 바꾼다)

- 로고 키트를 넣고 싶을 때: `Replace the small black square with a thick cobalt ring and add one tall black vertical bar.`
- 더 가볍게: `Replace both black squares with cobalt outline squares (thick stroke, no fill).`

## 2026-11-13 · 적용

소유자가 위 프롬프트로 만든 그림을 P1에 넣었다(`p1-shapes.png`, 1024×1024). 원본 종이색이 (253,253,249)로
포스터 바탕(#FAFAF8)보다 살짝 노래서, 채널별로 끌어올려 종이를 순백으로 만든 뒤 보드에서
`mix-blend-mode: multiply`로 얹었다. 그래서 사각형 테두리 없이 바탕에 녹는다.
보드에서는 폭 1188px(가득), top 380px. 캔버스 에셋 `/_blob/3123c41e8e25344c88ff18c8eb1ba8b0`.

## 2026-11-15 · 코드로 다시 그림

Recraft SVG는 리소 결을 수천 개 납작한 조각으로 바꿔 A3에서 얼룩처럼 보였고, PNG는 1024px라 A3에서 흐렸다.
소유자 결정으로 도형을 코드로 다시 그렸다: `p1-shapes.svg`(viewBox 1024, 보드에서 폭 1188 · top 380).
Recraft 그림의 위치를 측정해 원 2 · 사각형 3 · 사분원 1로 옮기고 색은 브랜드 값으로 맞췄다
(틴트 #C9D0F2 · 코발트 #0526C5 · 라임 #EAFDA1 · 잉크 #111111). 겹침: 코발트∩검정 #0A1A8A,
코발트 위 틴트 18%, 라임은 multiply. 결은 보드 공통의 입자 효과가 낸다. `p1-shapes.png`는 이전 판으로 남긴다.


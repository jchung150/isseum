# P7 작은 글씨 · Recraft 프롬프트

큰 글자(p7-letters.png)는 그대로 두고, 작은 안내 블록에 리듬을 준다. 블록이 기울고, 큰 글자의 곡선을
따라 휘고, 세로로 서고, 계단처럼 어긋나게.

## 설정

- 가능하면 Image to image(또는 reference image)에 `p7-letters.png`를 넣고 강도를 낮게. 큰 글자를 지킨다.
- Style: Vector illustration · Aspect ratio 2:3 · Colors #0526C5, 배경 #EAFDA1 · Export SVG

## Prompt

Typographic event poster on a solid pale lime background (#EAFDA1), cobalt blue (#0526C5) only. Keep the huge monoline letters "I S / S e / U m" exactly as in the reference image, filling the sheet. In the gaps and inside the open counters of the big letters, place small uppercase geometric sans-serif text blocks, each line underlined with a thin rule. Give the small type rhythm: lines tilt at changing angles, some bend along the curve of the nearest big letter, some run vertically, some step down like a staircase, so the small text dances around the big letters. Use exactly these texts and nothing else: "ISSEUM PRESENTS", "OPEN STUDIO DAY", "SAT 05.12", "14H – 20H", "22 WORLD CUP-BUK-RO", "MAPO-GU, SEOUL", "STORY TABLE", "ZINE MAKING", "LISTENING ROOM". Small text never touches or overlaps the big letters. Flat colors, no texture.

## Negative prompt

misspelled words, extra words, gibberish text, lowercase small text, serif, script font, gradient, shadow, 3D, extra colors, black, yellow, frame, border

## 주의

생성 이미지의 작은 글씨는 철자가 틀리기 쉽다. 결과는 글자를 하나씩 확인한다. 틀리면 그 블록만
Recraft의 영역 수정(inpaint)으로 고치거나, 배치만 참고하고 글씨는 보드에서 SVG textPath로 다시 쓴다.

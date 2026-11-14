# P7 · 고리 글자

캔버스 보드 PosterLoops를 만드는 스크립트. 큰 글자 ISSEUM(IS / SE / UM)을 굵은 한 줄 획으로 그려
기울이고 가장자리에서 자르고, 그 틈에 밑줄 친 작은 안내 블록을 놓는다.

- `python3 build.py > loops.json` → `svg`는 보드의 큰 글자 `<g>` 안에, `html`은 그 아래에 넣는다.
- 글자와 블록이 같은 코발트라 블록이 글자 위에 얹히면 사라진다. 블록은 반드시 틈에 둔다.
- I에 고리를 넣어 봤지만 폭이 좁아 고리 안쪽이 메워졌다. I는 곧은 획.
- 블록 내용(OPEN STUDIO DAY, SAT 05.12 14H–20H, STORY TABLE · ZINE MAKING · LISTENING ROOM)은 지어낸 예시. 주소는 실제 주소.

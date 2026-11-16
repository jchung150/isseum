# 포스터 인쇄용 PDF (A3)

P1–P7을 A3 PDF로 만든다. `python3 brand/posters/print/make.py` → `pdf/`(gitignore, 장당 약 22 MB).

- `isseum-poster-pN-a3.pdf`: 재단 크기 297×420mm, 블리드 없음.
- `isseum-poster-pN-a3-bleed3mm.pdf`: 작업 크기 303×426mm, 사방 3mm 블리드. 보드를 약 2% 균일하게 키워 채웠다.
  가장자리 3mm는 잘려 나가지만 여백이 모두 20mm 이상이라 잃는 것은 없다.
- 페이지는 300dpi 이미지로 납작해진다(입자 효과의 multiply 레이어 때문에 Chrome이 통째로 래스터화). 인쇄 기준으로 충분하다.
- `boards/`는 캔버스 보드의 사본이다. 캔버스를 고쳤다면 다시 받아 넣고 빌드한다.

**인쇄 전 확인:** P6 · P7의 날짜 · 시간표 · 프로그램명은 예시 문구다.

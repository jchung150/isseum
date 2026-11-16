# 포스터 인쇄용 PDF (A3)

P1–P7을 A3 PDF로 만든다. `python3 brand/posters/print/make.py` → `pdf/`(gitignore, 장당 3~6 MB).

- `isseum-poster-pN-a3.pdf`: 재단 크기 297×420mm, 블리드 없음.
- `isseum-poster-pN-a3-bleed1mm.pdf`: 299×422mm, 사방 1mm 블리드. **디지털 출력 업체가 요구한 규격**(2026-11-15, 303×426은 거절됨).
- `isseum-poster-pN-a3-bleed3mm.pdf`: 작업 크기 303×426mm, 사방 3mm 블리드. 보드를 약 2% 균일하게 키워 채웠다.
  가장자리 3mm는 잘려 나가지만 여백이 모두 20mm 이상이라 잃는 것은 없다.
- **페이지마다 300dpi JPEG 한 장만 담은 PDF다.** Chrome의 PDF 출력은 디지털 출력 업체 검사에서 "글꼴 미포함"(Type3 글꼴)과
  "투명도 효과"(SMask)로 걸렸다(2026-11-16). 그래서 Chrome 스크린샷을 300dpi로 찍어 JPEG(품질 95)로 만들고,
  글꼴 · 투명도 없이 정확한 페이지 크기의 PDF에 직접 넣는다. Chrome은 페이지 크기도 픽셀 단위로 반올림해서(299mm → 299.13mm) 이 방식이 그것도 피한다.
- `boards/`는 캔버스 보드의 사본이다. 캔버스를 고쳤다면 다시 받아 넣고 빌드한다.

**인쇄 전 확인:** P6 · P7의 날짜 · 시간표 · 프로그램명은 예시 문구다.

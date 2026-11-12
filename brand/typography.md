# 이씀 리브랜딩 · 서체 기록

홈페이지 시안(`brand/directions/home.html`, 아티팩트 v24 기준, 2026-11-11)에서 쓴 서체.
사이트를 실제로 코딩할 때 이 표를 기준으로 `tokens.css`에 옮긴다.

## 쓰는 서체 세 가지

| 역할 | 서체 | 굵기 | 출처 | 시안에서 쓴 곳 |
|---|---|---|---|---|
| 손글씨 (강조) | **Gaegu (개구)** | **300 Light** 하나만 | Google Fonts | 로고 자리 "이씀"(테스트), 히어로 "이야기가", 푸터 "모든 형태의 이야기를," |
| 한국어 본문·제목 | **Noto Sans KR** (시안용 대체) → 실제 사이트는 **Pretendard** 후보 | 400 · 500 · 700 · 900 | Google Fonts / Pretendard는 CDN·자체 호스팅 | 모든 제목(900), 본문(400), 버튼·라벨(500·700) |
| 영문 라벨·숫자 | **Space Grotesk** | 500 · 700 | Google Fonts | "MULTI CULTURAL SPACE IN SEOUL", EN/KOR 버튼, 공간 넘김 "1 / 5", 절차 번호 01–04, 푸터 연락처 라벨(NAVER TALK 등), 장비 번호 |

시안의 불러오기 줄:

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&family=Gaegu:wght@300&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
```

```css
--ko: 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
--latin: 'Space Grotesk', 'Helvetica Neue', Arial, sans-serif;
/* 손글씨: */ font-family: 'Gaegu', 'Apple SD Gothic Neo', cursive; font-weight: 300;
```

## 바꾼 이력 (버린 대안)

- 손글씨: **Nanum Pen Script(나눔손글씨 펜)** → 소유자 "좀 더 thin한 걸로" → **Gaegu 300**.
- 한국어 고딕: 현행 사이트·초기 시안은 **Pretendard**. 아티팩트가 Google Fonts만 허용해서 시안에서만 **Noto Sans KR**로 대체.
- 세리프(Noto Serif KR, 현행 사이트 디스플레이)는 새 방향에서 쓰지 않는다.

## 쓰는 법 (시안에서 정한 값)

손글씨는 **한 제목 안에서 첫 줄만** 바꿔 쓴다. 레퍼런스 "Human / Connection, by Design."처럼 가는 손글씨 + 굵은 고딕의 대비가 핵심.

| 요소 | 서체·굵기 | 크기 | 자간 | 행간 |
|---|---|---|---|---|
| 로고 "이씀"(테스트) | Gaegu 300 | 46px | −0.08em | 1 |
| 제목 속 손글씨 줄 | Gaegu 300 | 부모 제목의 1.12배 | −0.01em | 0.92 |
| 히어로 제목 | 고딕 900 | clamp(46px, 6.6vw, 92px) | −0.065em | 1.04 |
| 섹션 제목·푸터 제목 | 고딕 900 | clamp(32px, 4.6vw, 56px) | −0.06em | 1.08 |
| 절차 단계 제목 | 고딕 900 | clamp(22px, 2.2vw, 28px) | −0.05em | 1.2 |
| 숫자 띠 값 | 고딕 900 | clamp(20px, 2.2vw, 26px) | −0.05em | 1.2 |
| 본문 | 고딕 400 | 16px (소개 17px) | −0.01em | 1.7 |
| 공지 띠 | 고딕 500 | 16.5px (모바일 14.5px) | — | — |
| 영문 라벨 | Space Grotesk 700 | 12–14px | +0.02–0.18em, 대문자 | — |
| 번호·쪽수 | Space Grotesk 500·700 | 13–24px | tabular-nums | — |

푸터 제목은 손글씨 줄 아래 간격을 0.3em 더 띄운다(소유자 요청).

## 실제 사이트로 옮길 때 정할 것

1. **한국어 고딕: Pretendard로 돌아갈지, Noto Sans KR로 갈지.** Pretendard가 현행 사이트와 같고 숫자·영문이 더 단정하다.
   시안의 굵기 900은 Pretendard에도 있다(Black). 권장: Pretendard.
2. **Gaegu를 계속 쓸지, 소유자 손글씨로 바꿀지.** 소유자가 로고를 직접 쓸 예정이다. 같은 펜으로 "이야기가", "모든 형태의 이야기를"도
   써서 SVG로 넣으면 로고와 한 목소리가 된다. 그 경우 Gaegu는 불러오지 않아도 된다(용량 절약).
3. **폰트 용량.** 한국어 웹폰트는 무겁다(CLAUDE.md 남은 일 9). Gaegu는 쓰는 글자가 몇 개뿐이라
   `&text=이야기가모든형태의를,씀` 처럼 글자를 지정해 불러오면 거의 0에 가깝다.
4. 영문 Space Grotesk는 라벨에만 쓰므로 500·700 두 굵기면 충분하다.

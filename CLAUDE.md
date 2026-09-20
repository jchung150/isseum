# ISSEUM (이씀) — 복합문화공간 웹사이트

서울 마포구 동교동, 홍대입구역 1번 출구에서 5분 거리에 있는 약 60평(198㎡) 규모의 가변형
복합문화공간 **이씀**의 대관 마케팅 사이트. 워크숍, 북토크, 팝업스토어, 팬미팅, 쇼케이스,
촬영 대관을 받는다.

**모든 콘텐츠는 한국어다.** `BaseLayout.astro`에 `<html lang="ko">`가 지정돼 있다. 카피는
한국 행사 주최자를 독자로 쓰였으니 그 어조를 유지할 것. 라틴 문자는 넓은 자간의 eyebrow
라벨(`WHY ISSEUM`, `RENTAL PROCESS`)로만 등장하며 **장식이지 번역이 아니다**.

**상태: 라이브, 정식 공지 전.** **`https://www.isseum.com`** 에서 서비스 중이다
(`isseum.com`도 함께 뜨지만 아직 리다이렉트되지 않는다 — §런칭 전 할 일 참고). 도메인은
후이즈(Whois)에 등록돼 있고 DNS는 Cloudflare에 위임돼 있다.

자체 제작한 예약 폼 **`/booking`** 이 라이브이며 모든 `대관 예약하기` CTA가 이곳을 가리킨다.
구글 폼은 없앴다. **실제 문의가 이 폼으로 들어온다.** 이 폼과 `/api/booking`에 대한 수정은
프로덕션 변경으로 취급할 것.

---

## 작업 규칙 (먼저 읽을 것)

코드에서 유추할 수 없는 합의 사항이다. 매 세션 적용된다.

1. **내가 명시적으로 요청하지 않는 한 `git commit` / `git push` 하지 말 것.**
   `main`에 push하면 Cloudflare Workers Builds가 **즉시 라이브 배포**한다. 되돌리려면 또
   한 번의 배포가 필요하다. 수정한 뒤 `npm run build`로 컴파일만 확인하고 멈출 것. 커밋과
   푸시는 내가 직접 한다.

2. **CSS · 카피 · 레이아웃 변경은 스크린샷 한 장으로 확인할 것.**
   CDP로 `getComputedStyle`을 읽는 방식은 오래된 값을 돌려준 전력이 있어 믿지 않는다
   (§함정 모음). 브라우저는 한 번 띄워 재사용하고, 빌드는 편집 묶음이 끝난 뒤 한 번만
   돌릴 것 — dev 서버가 켜진 채로 빌드하면 dev 서버가 깨진다(§함정 모음).

3. **추측해서 답을 지어내지 말 것.** 요금, 정책, 운영 규칙처럼 소유자만 아는 값은
   §런칭 전 할 일의 "열린 질문"에 남기고 물어볼 것.

---

## 기술 스택

| | |
|---|---|
| 프레임워크 | Astro 7 (`output: 'static'`) |
| 언어 | TypeScript 6 (strict), 순수 CSS |
| 스타일링 | CSS 커스텀 프로퍼티. **Tailwind 없음, UI 라이브러리 없음** |
| 인터랙션 | `.astro` 안의 바닐라 `<script>`. **React/Vue/Svelte 없음** |
| 이미지 | `astro:assets` (sharp) → WebP, 반응형 `srcset` |
| 폰트 | Pretendard + Noto Serif KR, 현재 CDN 사용 |
| 폼 | Turnstile + Cloudflare Email Routing + Apps Script → Google Sheets |
| SEO | `@astrojs/sitemap`, `public/robots.txt` (네이버 `Yeti` 크롤러 포함) |
| 호스팅 | Cloudflare **Workers Static Assets** — §배포 참고 |

```bash
npm run dev      # localhost:4321 — 데몬으로 뜬다. 종료는 `astro dev stop`
npm run build    # astro check && astro build → dist/
npm run preview  # dist/ 서빙
```

`npm run build`는 `astro check`를 먼저 돌리므로 **타입 에러가 빌드를 막는다**. 0 errors /
0 warnings / 0 hints 상태를 유지할 것.

새 컴퓨터에서 세팅하려면 §새 컴퓨터에서 시작하기를 볼 것.

### 이 스택을 고른 이유

기본값을 따른 게 아니라 의도적으로 고른 것이다.

- **자바스크립트가 거의 없고, 그중 프레임워크는 하나도 없다.** 홈 페이지는 인라인 모듈 세
  개, 합계 **약 2.5 KB**를 싣는다 — 헤더 높이 측정(253 B), 히어로 슬라이드쇼(1,378 B),
  장비 모달(860 B) — 여기에 장비 상세를 담은 약 2.6 KB JSON 아일랜드가 더해진다.
  하이드레이션도 없고 런타임 fetch도 없다. `/events`는 모듈 하나를 싣고, 진짜 예외는
  `/booking`이다(§예약 폼). 이 사이트는 이미 무거운 한국어 웹폰트 두 벌을 지불하고 있는데,
  그 위에 작은 브로슈어 사이트를 위해 프레임워크 런타임까지 얹는 것은 잘못된 교환이다.

  이 문서는 한때 홈 페이지가 자바스크립트를 **하나도** 싣지 않는다고 적고 있었다. 한 페이지로
  합치면서 장비가 홈으로 올라오고 히어로가 슬라이드쇼가 된 시점에 사실이 아니게 됐는데 문장만
  남아 있었다. 인용하지 말고 직접 셀 것:
  `grep -c '<script' dist/client/index.html`.
- **네이버.** 이 사이트의 방문자는 한국어로 검색하고, 네이버 크롤러는 클라이언트 렌더링보다
  정적 HTML을 훨씬 잘 처리한다. 구글만 보는 사이트보다 사전 렌더링이 더 중요하다.
- **Tailwind를 쓰지 않는 이유**는 디자인에 유동 `clamp()` 디스플레이 크기가 11단계 있고, 각
  단계가 고유한 `line-height`와 `letter-spacing`을 **함께** 갖기 때문이다. 유틸리티로
  표현하려면 설정 파일을 확장하다가 결국 그게 `tokens.css`가 된다. §디자인 규칙 참고.

---

## 저장소 구조

```
CLAUDE.md                 ← 이 파일
astro.config.mjs          사이트 URL, 정적 출력, 사이트맵, 이미지 기본값
wrangler.jsonc            Cloudflare 배포 설정: 정적 에셋 + 커스텀 도메인
design/                   읽기 전용 디자인 레퍼런스 — §디자인 레퍼런스 참고
src/
  config/site.ts          사업자 정보, nav, bookingUrl, 소셜/지도 링크
  data/                   ★ 사이트에 보이는 모든 문자열. 아래 설명 참고
    home.ts               / — 페이지 타이틀, 히어로, 스탯, 5개 섹션 헤더,
                          대관 절차 단계, 마무리 CTA
    spaces.ts             4개 영역 (메인 홀 · 프로젝트 룸 · 파우더 룸 · 바)
    equipment.ts          장비 10개 + 소개 카피 + 상세 모달 라벨
    pricing.ts            시간당 요금 — 홈 #price 표, 대관료 FAQ 답변,
                          /booking 요금 줄이 모두 이 모듈 하나를 읽는다
    faq.ts                자주 묻는 질문. booking.ts의 refundSection.tiers와
                          pricing.ts의 rates를 렌더할 뿐, 어느 쪽도 복사하지 않는다
    booking.ts            /booking의 모든 문자열을 플로우 순서대로 — 대관 규정
                          (3그룹 11항목)과 환불 등급 포함. 예전엔 rules.ts에 있었다
    events.ts             지난 행사 + 디스크에서 자동 발견한 갤러리 사진,
                          그리고 /events의 모든 카피(히어로, 필터, 라이트박스, 빈 상태)
    notFound.ts           /404
  assets/                 Astro가 처리하는 이미지 (§콘텐츠 추가하기)
    events/README.md      행사 사진 폴더 규칙
  styles/
    tokens.css            ★ 모든 디자인 값. 단일 원천
    base.css              전역 스타일, 포커스 링, reduced-motion, 프리미티브
  components/             컴포넌트 9개, 전부 scoped CSS .astro
  layouts/BaseLayout.astro  head, SEO, JSON-LD, 헤더/푸터, 스킵 링크
  cloudflare.d.ts         엔드포인트가 쓰는 Workers 런타임 모듈 2개의 최소 선언
  pages/                  index(한 페이지: 공간·장비·요금·절차·FAQ) · booking ·
                          events(숨김) · 404
    api/booking.ts        유일한 on-demand 라우트. 나머지는 전부 사전 렌더링된다
scripts/booking-sheet/    제출 내용을 Google Sheets에 붙여넣는 Apps Script
```

### 사용자에게 보이는 모든 문자열은 `src/data/*.ts`에 있다

**카피는 `.astro` 파일에 단 한 글자도 쓰여 있지 않다.** 제목도, 버튼 라벨도, placeholder도,
`aria-label`도, 검증 메시지도, 페이지 `title`도 아니다. 사람이 읽을 수 있는 것이라면
`src/data/`에서 `export`되어 이름으로 참조된다. 소유자가 페이지 파일을 열지 않고도 카피를
고칠 수 있고, 사이트의 모든 문자열을 폴더 하나에서 찾을 수 있다.

이 규칙은 **`.astro` 파일의 양쪽 절반 모두**에 적용된다. 클라이언트 `<script>` 블록은 Vite가
번들하므로, 마크업이 쓰는 것과 같은 모듈에서 문자열을 `import`한다 — `booking.astro`와
`events.astro` 스크립트 상단의 import를 볼 것. Rollup이 클라이언트가 건드리지 않는 것을
tree-shake하므로, 대관 규정 전문을 함께 담은 모듈에서 import해도 번들에는 비용이 없다
(확인함: `booking.astro`의 스크립트 번들은 약 9 KB이고 규정 텍스트가 들어 있지 않다).

Astro 콘텐츠 컬렉션이 아니라 평범한 타입 지정 TS 모듈을 쓴다. 이 콘텐츠는 산문 문서가 아니라
구조화된 레코드라서, 컬렉션의 마크다운/glob 기계장치는 얻을 게 없는 반면 TS는 `astro check`로
완전한 타입 검사를 준다.

**어느 모듈이 문자열을 소유하는가:** 그것을 렌더하는 페이지가 아니라, 그것이 가리키는 대상을
소유한 모듈이다. 규격 · 보유 수량 · 설치 장소는 `spec`/`qty`/`place` 필드의 라벨이므로
`index.astro`가 렌더하더라도 그 필드 옆인 `equipment.ts`에 있다. 대관 규정은 `/booking`이
렌더하므로 `booking.ts`에 있다. 페이지 자체의 뼈대 — `title`, 섹션 헤더, 마무리 CTA — 는 그
페이지의 모듈에 둔다.

**상수 하나, 리터럴 둘은 금지.** 한쪽에서 만들고 다른 쪽에서 소비하는 문자열은 양쪽이 같은
export를 읽는다. 실제 사례 두 개이며, 둘 다 중앙화 전에는 조용한 버그였다.

- `events.ts`의 `gallery.openSuffix` — 타일 `aria-label`에 ` 크게 보기`를 붙이고,
  라이트박스는 그것을 다시 떼어내 확대 사진의 `alt`로 재사용한다. 리터럴 두 개로 두었을 때
  라벨 문구를 바꾸자 모든 alt가 조용히 비어버렸다.
- `events.ts`의 `ALL` (= `EVENT_CATEGORIES[0]`) — 필터가 세 곳에서 이 값과 비교한다.
  `'전체'`를 반복해 적었을 때 오타 하나로 첫 화면에 빈 갤러리가 떴다.

**유일한 예외는 아이콘 글리프다** — `✕ ← → ＋ ·` 같은 것들로, 항상 `aria-hidden`이다. 이들은
카피가 아니라 기호이며, 데이터 파일을 경유시키면 양쪽 파일이 모두 읽기 어려워진다. 읽는 소리가
있는 것은 전부 — 그런 버튼의 이름을 짓는 `aria-label`을 포함해 — 규칙을 따른다.

**아직 남은 일:** 컴포넌트들과 `BaseLayout.astro`는 이 작업을 거치지 않았다. 실제 카피가
`Footer.astro`(사업자 정보 항목 라벨, 주요 안내 · 공식 채널, 지도 `alt`), `Header.astro`와
`DarkCta.astro`(둘 다 `대관 예약하기`를 직접 적고 있다), `HeroSlideshow.astro`(캐러셀 라벨),
`BaseLayout.astro`(스킵 링크, OG 이미지 `alt`, `business.address`를 필드별로 다시 적은
JSON-LD 주소)에 하드코딩돼 있다. 해당 파일을 다음에 건드릴 때 옮길 것.

---

## 디자인 규칙

**모든 스타일은 `src/styles/tokens.css`를 거쳐 해석된다.** 필요한 값이 없으면 이름을 붙여
추가한 다음 그 이름을 쓸 것. 컴포넌트 코드에 리터럴 hex 색상이나 정체불명의 픽셀 값을 쓰지
않는다.

아래 다섯 가지는 취향이 아니라 이 비주얼 언어의 속성이다. 하나라도 깨면 사이트가 이씀처럼
보이지 않게 된다.

1. **그림자 없음.** 디자인 전체에 `box-shadow`가 하나도 없다. 모든 경계는 1px 선이다. 높이는
   테두리의 무게로 표현한다 — 내부 구분은 `--border` 헤어라인, 섹션 단위 구분선은
   `--border-emphasis`(`--ink`). 그 한 단계의 대비가 위계 전부를 짊어진다.
2. **액센트 색 없음, 예외 하나.** 브랜드 색상 없이 따뜻한 무채색만 쓴다. 위계 *와 심각도*
   모두 명도로 부호화한다 — 환불 등급은 100% 환불 → 환불 불가로 갈 때 `--ink` →
   `--text-secondary`로 옅어질 뿐, 빨강으로 바뀌지 않는다. 유일한 예외는 소유자 요청으로
   추가한 `--error`(`#b3392c`, 따뜻한 빨강)이며 **폼 검증 전용**이다: 필드 아래 인라인
   메시지와 그 필드의 테두리. 강조나 위계, `/booking` 바깥의 어떤 용도로도 쓰지 말 것.
3. **각진 모서리.** `--radius`는 `2px`다. `--radius-full`(50%)은 배지, 불릿 점, 원형 마크
   전용이다.
4. **자간이 구조를 지탱한다.** 한국어는 좁게(`--tracking-body` -0.015em, 디스플레이
   -0.03em), 라틴 eyebrow는 넓게(0.18em–0.24em). 브라우저 기본값으로 두지 말 것.
5. **브레이크포인트 타입이 아니라 유동 타입.** 디스플레이 크기는 `clamp()`다. 브레이크포인트별
   `font-size` 덮어쓰기를 추가하지 말 것.

디스플레이는 세리프(Noto Serif KR, weight 500), 본문과 UI는 Pretendard, 모노는 인덱스 숫자와
플레이스홀더 캡션 전용 — 본문에는 절대 쓰지 않는다.

### 헤어라인 그리드 관용구

모든 카드 그리드에 쓴다. 그리드 자체가 테두리 색이고 1px 간격으로 그 색이 비쳐 보이게 해서,
이중 테두리 이음매 없이 완벽한 내부 구분선을 만든다.

```css
display: grid; gap: 1px; background: var(--border); border: var(--border-hairline);
/* 셀에서 background: var(--bg) 를 지정한다 */
```

이를 위한 공용 클래스는 없다 — 모든 그리드가 세 줄을 직접 적게 되면서 `base.css`의 유틸리티가
쓰이지 않게 됐고, 그래서 삭제했다. 클래스가 아니라 관용구를 보존할 것.

### 브레이크포인트는 세 개뿐

`640px` · `900px` · `1100px`. 디자인 export에는 임의의 값이 여섯 개 있었고 이렇게 합쳤다.
실제로 구조를 바꾸는 건 900px 하나뿐이다(데스크톱 nav ⇄ 모바일 탭 바). 네 번째를 추가하기보다
내재적 그리드(`repeat(auto-fit, minmax(…, 1fr))`)를 먼저 고려할 것.

---

## 접근성 최저선

타협 대상이 아니다. 디자인 레퍼런스는 이 기준을 **충족하지 못하지만** 빌드는 충족해야 한다.

- **모든 인터랙티브 요소에 보이는 `:focus-visible`.** 링크는 전역적으로 밑줄이 제거돼 있어서
  (`a { text-decoration: none }`) 키보드 사용자에게는 포커스 링이 유일한 단서다. 전역 규칙은
  `base.css`에 있고, `.on-ink`는 어두운 패널 위에서 링을 `--bg`로 뒤집는다.
- **`<a>`에 `pointer-events: none`으로 동작을 막지 말 것.** 디자인 export가 대관 규정 페이지
  CTA에 이렇게 해두었는데, 키보드로 도달할 수 없게 된다. 빌드에서는 `aria-disabled`와 클릭
  핸들러를 쓰고, JS가 꺼져 있어도 동작하도록 **활성 상태로** 렌더한다.
- **`prefers-reduced-motion`을 존중한다.** `base.css`가 전역적으로 트랜지션을 무력화하고,
  히어로 슬라이드쇼는 이 설정에서 **자동으로 넘어가지 않는다**(수동 조작은 동작한다). macOS에서
  히어로가 멈춰 보이면 버그로 단정하기 전에 시스템 설정 → 손쉬운 사용 → 디스플레이 → 동작 줄이기를
  확인할 것.
- **필터가 달린 목록에는 반드시 빈 상태**와 `role="status"` 라이브 리전 카운트가 있다. 장비와
  지난 행사 필터 모두 0건을 반환할 수 있다.
- **지난 행사 라이트박스는 네이티브 `<dialog>`** 이며 `showModal()`을 쓴다. 포커스 가둠,
  Escape로 닫기, 배경 비활성화를 공짜로 얻는다. div로 바꾸지 말 것.
- 스킵 링크(`본문으로 건너뛰기`)가 첫 번째 포커스 대상이다.

---

## 콘텐츠 추가하기

### 행사 사진 — 파일만 넣으면 된다

유일하게 자동 발견되는 컬렉션이다. 행사 하나당 폴더 하나이며, 폴더 이름은 `events.ts`의
`slug`와 정확히 같아야 한다.

```
src/assets/events/2026-06-14_이씀의밤/01.jpg, 02.jpg, 09.jpg, 10.jpg
```

파일명 기준 숫자 정렬이며 **첫 파일이 대표 타일**이 된다(가로 2배, 더 높게). 폴더가 없거나 비어
있는 행사는 `shots` 배열을 통해 플레이스홀더 해칭으로 대체되므로, 업로드 중에도 페이지가 깨지지
않는다. 전체 규칙은 `src/assets/events/README.md`에 있다. 행사 추가 = `events.ts` 5줄 +
폴더 하나. 배열 순서는 상관없다. 갤러리가 날짜 기준 최신순으로 정렬한다.

### 그 외 — 명시적 import

히어로 슬라이드, 공간 카드, 장비는 1:1로 고정된 슬롯이라 데이터 파일에서 명시적으로 import한다.
**`src/assets/`에 파일을 넣는 것만으로는 아무 일도 일어나지 않는다** — import하고 참조해야
한다. (이것 때문에 빌드가 두 번 깨졌다. 파일명을 바꾸고 import는 그대로 둔 경우다.)

- **히어로 슬라이드쇼** — `home.ts`의 `heroSlides`. 순서 변경·교체·추가·삭제 자유. 컴포넌트가
  배열 길이를 읽는다. 슬라이드별 `focus`(CSS `object-position`)는 선택 사항인데, 3:2 원본이
  16:7.6 히어로 크롭에서 높이의 약 29%를 잃기 때문이다.
- **공간 카드** — `spaces.ts`의 `src`/`alt`/`focus`. 4:5 세로 크롭이 3:2 프레임 가로의 약
  47%를 버리므로 `focus`로 위치를 조정한다.
- **장비** — `equipment.ts`의 `src`/`alt`/`fit`(선택). 현재 제품 누끼 컷에는 잘림을 막으려고
  `fit: 'contain'`을 지정했다. 실제 현장 사진으로 교체되면 `'cover'`로 바꿀 것. `src`가 없는
  항목은 플레이스홀더로 대체된다.

### 파일 위치

- **`src/assets/`** — 이미지 전용. WebP 변환, 리사이즈, 콘텐츠 해싱이 적용된다. 원본
  고해상도(긴 변 약 2000px)를 넣으면 Astro가 줄인다.
- **`public/`** — 같은 경로로 그대로 서빙된다. favicon, `robots.txt`, PDF, 그리고 **영상**용.
- **이 저장소에 영상을 커밋하지 말 것.** Astro가 처리하지 않고 git은 큰 바이너리를 잘 다루지
  못한다 — 모든 클론을 영구히 무겁게 만든다. Cloudflare Stream, Mux, 비공개 Vimeo에 올리고
  URL만 저장할 것. `src/assets/`는 이미 사진 약 13 MB다.

### 예약 CTA

`config/site.ts`의 `bookingUrl`이 모든 예약 CTA를 공급한다 — **페이지당 3개**: 헤더 버튼,
마무리 다크 CTA 배너, 푸터 링크. 이 값은 컴포넌트 두 개(`Header.astro`, `DarkCta.astro`)와
`footerLinks`만 거쳐 전달되므로, 한 곳만 바꿔도 셋이 함께 바뀐다.

### 대관 요금

`src/data/pricing.ts`가 요금 숫자가 존재하는 유일한 곳이다. 소비처 세 곳이 이 모듈을 읽고,
어느 쪽도 숫자를 다시 타이핑하지 않는다: 홈의 `#price` 표, `faq.ts`의 대관료 답변,
`/booking` 시간 선택 아래 요금 줄.

현재 요금(부가세 포함): 평일 정상가 280,000 → 오픈 특가 **140,000**, 주말·공휴일 340,000 →
**170,000**. 시간당, 최소 3시간, 전체 대관만(부분 대관 없음).

- **금액은 문자열이 아니라 숫자**이고 포맷은 모듈이 한다. 화면에 나오는 건 시간당 금액 두 개
  뿐이다: 표는 정상가와 오픈 특가, 최소 3시간은 합계 없이 규칙으로만 주석에 적는다. 3시간
  합계는 표와 주석 양쪽에서 시도했다가 두 번 다 뺐다 — 자기가 파생돼 나온 시간당 요금과
  경쟁했다. 최소 시간 자체는 `booking.ts`의 `MIN_HOURS`에서 오므로 폼의 검증값과 어긋날 수
  없다.
- **모든 금액은 부가세 포함**이며 소유자가 그렇게 견적한다. 부가세 주석이 이를 명시하므로 별도
  세금 줄을 추가하지 말 것.
- **할인율은 화면에 쓰지 않는다.** 현재 특가가 정상가의 정확히 절반이긴 하다. 소유자 결정이며
  이유는, "50% 할인"이라고 못 박으면 나중에 정상가로 돌아갈 때 가격 인상으로 읽히는 반면,
  정상가에 취소선을 긋고 오픈 특가를 나란히 두면 같은 말을 하면서도 시점에 매이지 않기
  때문이다. 묻지 않고 퍼센트를 되돌리지 말 것. (지금은 정확하기라도 하다 — 이전의
  275,000/330,000 쌍은 반올림해서 같은 게시가가 나왔고, 그래서 "50%"가 실제 49%를 부풀려
  표시광고법 위험이 있었다.)
- **취소선은 시각 정보일 뿐이다.** 스크린 리더는 `text-decoration`을 읽어주지 않으므로 모든
  금액에 라벨이 붙는다: 데스크톱에서는 열 제목, 모바일에서는 셀 안의 `aria-hidden` 인라인
  라벨 — 어느 폭에서든 둘 중 정확히 하나만 보인다. 다시 스타일링하더라도 둘 다 남길 것.
- **`/booking`은 여전히 합계를 계산하지 않는다.** 요금 줄은 안내일 뿐이고, 최종 금액은 신청
  내용을 확인한 뒤 호스트가 알려준다. 추가 옵션 안내가 이미 그렇게 말하고 있다.

카드가 아니라 진짜 `<table>`이다. 숫자는 가로로도, **세로로도** 읽히라고 놓은 것이고, 그게
평일과 주말을 함께 보여주는 이유 전부다. 사이트의 유일한 표이기도 해서 반응형 규칙은
`index.astro` 안에만 있다 — 모바일 우선 블록 쌓기, 640px부터 진짜 표 레이아웃.

배치도 의도적이다. `#price`는 보유 장비와 대관 절차 사이에 있다 — 그 요금이 무엇을 사는지 본
직후, 예약하는 법을 안내받기 전. 이제 nav는 5개 항목이고, 390px에서는 모바일 탭 스트립이 5개를
다 담지 못하고 가로 스크롤된다.

---

## 예약 폼

`/booking`은 방문자에게 구글 로그인을 요구하던 구글 폼을 대체한다. 퍼널에서 가장 크게 이탈하던
지점이었다. 5단계: 기본 정보 → 이용 규정 동의 → 추가 옵션 → 개인정보 동의 → 신청 내용 확인.

**모든 페이지에서 링크된다.** `config/site.ts`의 `bookingUrl`이 `/booking`이고 버튼은 내부
링크이므로 `external` / `target="_blank"`를 쓰지 않는다. 이 페이지는 `noindex`이며 사이트맵에서
빠져 있다 — 콘텐츠가 아니라 폼이기 때문이며, 이제 링크되어 있어도 그대로 두는 게 맞다.

### 처리 흐름

```
브라우저 → POST /api/booking
             ├─ 허니팟          (봇에게는 200을 돌려줘서 패턴을 바꾸지 않게 한다)
             ├─ Turnstile siteverify
             ├─ 서버 측 검증              ← 실제로 유효한 검증은 이것
             ├─ 이메일 (Cloudflare Email Routing)                        ← 안전망
             └─ 시트   (Apps Script → Google Sheets + Drive)              ← 최선 노력
```

**순서는 의도적이다.** 이메일은 잃어버리면 안 되는 기록이라 먼저 보내고, 실패하면 전화로
연락해 달라는 에러를 돌려준다 — 받지 않은 것을 받았다고 말하지 않는다. 시트는 편의용 사본이다.
구글이 죽어 있어도 방문자는 성공하고 문의는 이미 메일함에 들어와 있다.

### 제약값

`src/data/booking.ts`에 `MIN_HOURS`(3), `MAX_GUESTS`(90), `OPEN_HOUR`/`CLOSE_HOUR`(8–22)가
있다. **클라이언트와 `api/booking.ts` 양쪽이 모두 강제한다** — 클라이언트 검사는 예의일 뿐,
devtools로 간단히 우회된다.

### 서명 없음

캔버스 서명을 만들었다가 소유자 요청으로 제거했다. 지금은 아무것도 서명을 수집하거나 저장하지
않는다 — 폼도, 이메일도, 시트도, 개인정보 고지도. Turnstile은 여전히 JS가 필요하므로 폼은
JS 전용이며 `<noscript>` 블록이 전화/이메일 안내를 제공한다.

### 시크릿과 설정

`wrangler secret put`으로 설정한다. 저장소에는 절대 넣지 않는다.

| 이름 | 값 |
|---|---|
| `TURNSTILE_SECRET` | Turnstile 시크릿 키 (**사이트 키가 아니다** — 생김새가 비슷하다) |
| `SHEET_WEBHOOK_URL` | Apps Script 웹앱 `/exec` URL |
| `SHEET_SECRET` | Apps Script `setup()`이 출력하는 `SHARED_SECRET` |

`NOTIFY_TO` / `NOTIFY_FROM`은 `wrangler.jsonc`의 평범한 vars다. Turnstile **사이트** 키는
공개 값이며 `config/site.ts`에 있다. 실제 키는 프로덕션 호스트명에 묶여 있어 localhost에서
동작할 수 없으므로 dev에서는 Cloudflare의 테스트 키(`1x00000000000000000000AA`)로 대체된다.

시트 설정은 `scripts/booking-sheet/README.md`에 정리돼 있다. Apps Script는 수정 후 **새 버전
배포**가 필요하다. 저장만 해서는 아무것도 바뀌지 않는다.

### 이메일

서드파티 ESP가 아니라 Cloudflare Email Routing의 `send_email` 바인딩을 쓴다. **검증된 수신
주소로만** 보낼 수 있는데, 소유자 알림에는 정확히 알맞고 개인정보 고지에서 처리 위탁처를 하나
줄여줬다. 동시에 이는 **나중으로 미룬 신청자 확인 메일은 이 경로를 쓸 수 없다**는 뜻이기도
하다. 그건 Resend 같은 서비스가 필요하다.

---

## 새 컴퓨터에서 시작하기

저장소가 거의 모든 것을 담고 있다. 이 파일이 인수인계 문서다 — 새 Claude Code 세션은 이 파일을
자동으로 읽으므로 스택, 디자인 규칙, 접근성 최저선, 아래 함정들을 다시 설명할 필요가 없다.

```bash
git clone https://github.com/jchung150/isseum.git
cd isseum
npm ci          # `npm install`이 아니다 — CI가 lock을 그대로 쓰므로 맞춰야 한다
npm run dev
```

Node **24.x** (Cloudflare 빌드 이미지도 같은 버전을 제공한다). 로컬 실행에 그 외 필요한 것은
없다.

### 저장소에 딸려오지 않는 것

| | |
|---|---|
| **Claude 메모리** | `~/.claude/projects/<프로젝트-경로>/memory/` — 폴더 이름이 프로젝트의 **절대 경로**로 만들어지므로, 클론이 정확히 같은 경로에 있을 때만 복사가 통한다. 다시 알려주는 편이 확실하다. 아래 프롬프트 참고. |
| **`.dev.vars`** | gitignore됨. 한 줄이고 값도 공개 값이다: `TURNSTILE_SECRET="1x0000000000000000000000000000000AA"` — Cloudflare가 공개한 "항상 통과" 테스트 시크릿. 이게 없으면 `/api/booking`이 로컬 제출을 전부 거부한다. |
| **`.claude/settings.local.json`** | 추적되지 않는 권한 허용 목록. 작업하면서 알아서 다시 쌓인다. 신경 쓰지 않아도 된다. |
| **계정 로그인** | Cloudflare, GitHub, 후이즈/Whois, Google (Apps Script + Sheets). |
| **`node_modules`** | `npm ci`가 복원한다. |

**Cloudflare 시크릿은 다시 입력할 필요가 없다.** `TURNSTILE_SECRET`, `SHEET_WEBHOOK_URL`,
`SHEET_SECRET`은 노트북이 아니라 Cloudflare에 있다. `wrangler login`은 시크릿을 바꾸거나 수동
배포할 때만 필요하다 — 평소 배포는 `git push`다.

### 새 세션 시작하기

이걸 붙여넣을 것. 작업 규칙은 §작업 규칙에도 적혀 있지만, 매 세션 앞머리에서 다시 확인해 두면
확실하다.

```
이 저장소는 ISSEUM(이씀) 복합문화공간 마케팅 사이트야.
먼저 루트의 CLAUDE.md를 읽고 시작해줘.

작업 규칙 두 가지를 지켜줘:

1. 내가 명시적으로 요청하지 않는 한 git commit / push 하지 마.
   main에 push하면 Cloudflare Workers Builds가 바로 라이브 배포돼.
   수정하고 `npm run build`로 컴파일만 확인한 뒤 멈춰줘.
   나는 localhost:4321에서 직접 보고 커밋해.

2. CSS·카피·레이아웃 변경은 스크린샷 한 장으로 확인해줘.
   getComputedStyle을 CDP로 재는 건 오래된 값을 돌려준 적이 있어서 믿지 마.
   브라우저는 한 번 띄워서 재사용하고, 빌드는 편집 묶음이 끝난 뒤 한 번만.

이 두 가지는 메모리에 저장해줘.
```

그다음 무슨 작업을 할지 말할 것. **이 파일은 규칙을 기록하지, 어디까지 했는지를 기록하지
않는다** — 그건 git 로그에 있으니, 마지막 커밋이 무엇이고 무엇이 아직 절반인지 말해줄 것.

---

## 배포

`main`에 `git push`하는 것이 곧 배포다. Cloudflare Workers Builds가 `npm run build`를 돌린 뒤
`npx wrangler deploy`를 실행하고, 1분쯤이면 라이브에 반영된다. 서버는 없다 — 빌드가 정적
파일을 만들고 Cloudflare가 엣지에서 서빙한다.

**§작업 규칙 1을 다시 상기할 것: 요청받지 않았다면 push하지 않는다.**

- **프로젝트**: Cloudflare Workers → `isseum`. 직접 URL `isseum.cloudfan150.workers.dev`는
  계속 살아 있고, DNS 단계 변경 전에 배포를 확인할 때 유용하다.
- **assets 설정의 `run_worker_first: ["/api/*"]`.** 이게 없으면 `/api/booking`으로의 POST가
  **405**를 받는다. 정적 에셋 라우터가 먼저 돌고 GET/HEAD만 답하기 때문에 요청이 Worker까지
  가지 못한다. `/api/*`로만 한정해서, 콘텐츠 페이지는 Worker를 거치지 않고 엣지에서 바로
  서빙되게 했다.
- **어댑터의 `imageService: 'compile'`.** 그렇지 않으면 최적화가 런타임 Cloudflare Images
  바인딩으로 넘어간다 — 과금되고, 느리고, 이미지가 있는 모든 페이지가 사전 렌더링되는 상황에서
  무의미하다. 되돌아갔을 때의 증상: `dist/client/_astro/`에 `.webp`가 하나도 없고 HTML에
  `/_image?` URL이 보인다.
- **최상위의 `session: false`.** 여기서는 세션을 쓰는 게 없다. 켜두면 어댑터가 SESSION KV
  네임스페이스를 프로비저닝하고 세션 런타임을 Worker에 번들한다.
- 어댑터가 출력을 나눈다 — 정적 에셋은 `dist/client`, Worker는 `dist/server`. 따라서
  `wrangler.jsonc`의 assets 디렉터리는 `./dist/client`여야 한다.
- **`wrangler.jsonc`가 배포 전체를 선언한다**: `assets.directory`(`./dist/client`)와
  `custom_domain: true`를 단 `routes`의 커스텀 도메인들. **도메인은 대시보드가 아니라 여기에 붙일 것** — 대시보드
  시도는 성공한 것처럼 보이면서 DNS 레코드를 쓰지 않고 조용히 실패했다. 설정 파일에 두면 매
  배포마다 재조정되고 실패가 빌드 로그에 드러난다.
- **`html_handling: "drop-trailing-slash"`** 는 Astro의 `trailingSlash: 'never'`와 짝이다.
  `/booking/`이 둘 다 서빙되는 대신 `/booking`으로 301된다.
- **`public/_headers`** 는 Workers Static Assets에서 동작한다(추측이 아니라 라이브 응답 헤더로
  확인함): 사이트 전역 보안 헤더, `/_astro/*`는 1년 immutable, HTML은 매 요청 재검증.
- **`robots.txt`**: Cloudflare가 우리가 올린 파일 **앞에 관리 블록을 덧붙인다**.
  `Content-Signal: search=yes, ai-train=no, use=reference`를 선언하고 AI 학습 크롤러
  (GPTBot, ClaudeBot, CCBot, Google-Extended, …)를 차단한다. `search=yes`는 구글과 네이버가
  정상적으로 색인한다는 뜻이다 — 대시보드가 이를 "disabled"라고 적어두어 헷갈리는데, 차단이
  비활성이라는 의미다. 네이버 `Yeti`와 사이트맵 줄을 포함한 우리 규칙은 그 아래에 그대로
  남는다.
- **Node 버전**은 빌드 이미지가 제공한다(24.x). `NODE_VERSION` 변수는 필요 없다. 대시보드에
  쓰이지 않는 `nodeversion` 변수가 남아 있을 수 있는데 무해하다.

### 배포가 실제로 반영됐는지 확인

대시보드의 빌드 성공은 라이브 사이트가 바뀌었다는 증거가 아니다. 해시가 붙은 에셋을 비교할 것.

```bash
curl -s https://www.isseum.com/ | grep -o '/_astro/[A-Za-z0-9._-]*\.css'
ls dist/client/_astro/*.css
```

페이지가 스타일시트를 **하나 이상** 불러오므로 첫 매치만 보지 말고 목록 전체를 비교할 것. 더
빠른 기능 확인: `POST /api/booking`은 **400**("보안 확인에 실패했습니다")을 돌려줘야 하며,
405가 나오면 안 된다.

### 배포 함정

**의존성을 추가한 뒤에는 push 전에 lock을 리눅스 기준으로 검증할 것:**

```bash
npm ci --dry-run --os=linux --cpu=x64
```

CI는 `npm ci`로 설치하는데, `package-lock.json`과 `package.json`이 어긋나면 즉시 실패한다.
macOS에서 그냥 `npm ci`를 돌리는 것으로는 **충분하지 않다** — darwin-arm64 optional 의존성만
해석하므로, 리눅스 항목이 빠진 lock이 로컬에서는 통과하고 CI에서 깨진다. 이미 두 번 물렸고 두
번 다 sharp의 `@emnapi/*` 전이 의존성이었다.

점진적인 `npm install <pkg>`가 이것들을 떨어뜨린다. 리눅스 검사가 실패하면:

```bash
rm -rf node_modules package-lock.json && npm install
```

전체 재생성이 크로스 플랫폼 optional 트리를 복원한다. `grep -c emnapi package-lock.json`으로
확인할 것 — 15가 아니라 20이어야 한다.

---

## 기능 플래그

### `showEventsPage` — `src/config/site.ts`

현재 **`false`**. 지난 행사 아카이브는 코드가 완성돼 있지만 실제 사진이 없다 — 갤러리 타일 23개가
전부 플레이스홀더 해칭이다 — 그래서 공간이 행사를 충분히 치를 때까지 숨겨둔다.

플래그 하나가 모든 결과를 끌고 가므로 서로 어긋날 수 없다.

| | `false`일 때 |
|---|---|
| 푸터 링크 목록 | 지난 행사 아카이브 제거 |
| `/events` 페이지 | `<meta name="robots" content="noindex, nofollow">` |
| 사이트맵 | `/events` 제외 |

**nav는 원래 이 링크를 가진 적이 없다.** `config/site.ts`의 `nav`는 홈 페이지 앵커 다섯 개
(공간 안내 · 보유 장비 · 대관 요금 · 대관 절차 · 자주 묻는 질문)이며 플래그를 아예 읽지 않는다
— 아카이브는 처음부터 푸터에서만 도달할 수 있었다. 마찬가지로 별도의 대관 규정 페이지도 이제
없다. 규정은 `booking.ts`에 있고 `/booking` 안에서 렌더된다. 플래그를 `true`로 바꾼다면 그때
지난 행사가 여섯 번째 nav 자리를 가질 만한지 판단할 것. 다섯 개만으로도 390px에서는 모바일 탭
스트립이 이미 스크롤된다.

`astro.config.mjs`가 사이트맵 필터를 위해 **같은 플래그를 import한다.** 판단을 두 번 적지 않기
위해서다 — Astro의 설정 로더는 `.ts` import를 문제없이 해석한다. 이걸 두 파일로 쪼개지 말 것.
지난 행사 컨테이너 폭이 어긋났던 게 정확히 그 방식 때문이었다.

**페이지는 여전히 빌드된다.** 사진을 넣는 동안 `/events`에서 검토할 수 있다. 들어오는 링크가
없고 어떤 크롤러도 캐시하지 않을 뿐이다. nav 링크만 숨기는 쪽이 오히려 그냥 두는 것보다
나빴을 것이다. `/events`가 사이트맵에 있었으니 구글과 네이버가 회색 해칭 페이지를 계속
색인했을 테니까.

다시 여는 법: 플래그를 `true`로 바꾸고, `src/assets/events/<slug>/` 아래에 사진을 넣고, push.

---

## 디자인 레퍼런스와의 차이

`design/`은 원본 Claude Design export이며 **읽기 전용**이다. 절대 수정하지 말고, 절대 배포하지
말 것. 실행되지도 않는다: `style-hover="…"`는 CSS가 아니라 커스텀 속성이고,
`<sc-for>` / `<sc-if>` / `{{ }}`는 그 export의 템플릿 지시자다. 빌드의 모든 hover 상태는 진짜
`:hover` 규칙으로 다시 작성했다.

의도적으로 벗어난 부분들이다. 누군가 "고쳐서" 되돌리지 않도록 기록해 둔다.

| | Export | 현재 | 이유 |
|---|---|---|---|
| 히어로 | 정적 이미지 1장 | 5장 크로스페이드 | 요청 사항 |
| 서브페이지 `h1` | 68px | 46px | 68px가 그 아래 모든 것을 압도했다 |
| 지난 행사 컨테이너 | 1600px / 좁은 여백 | 다른 페이지와 같은 1440px | 페이지 여백이 사이트 전체와 일치 |
| 브레이크포인트 | 임의의 6개 | 640 / 900 / 1100 | 유지보수성 |
| 규정 번호 | 하드코딩, 자기모순 | 데이터에서 계산 | 아래 참고 |
| "흰색" | `#FFF`와 `#FBFBF9` 혼용 | `--bg` 하나 | `#FFF`는 팔레트보다 차갑다 |
| 규정 페이지 헤드 | 직접 만든 `.intro` | 공용 `PageHero` | 다른 페이지들과 어긋나 있었다 |

**규정 번호는 저장하지 않고 계산한다.** export는 네 가지 방식으로 자기모순이었다: 그룹이
01→02→03으로 가다 05로 뛰었고, 목차는 5개 섹션에 4개 항목을 나열하며 마지막을 04로 표기했고,
11번 항목이 존재하지 않았으며(1–10 다음 12), 헤더는 실제 11개인데 12개 항목이라고 주장했다.
지금은 데이터에서 계산해 **총 11개 항목**으로 표시된다. 법적으로 12가 맞는 숫자라면 항목 하나가
누락된 것이니 작성이 필요하다.

export에서 **작성되지 않은 채였던** 두 곳은 디자인 어법에 맞춰 내가 만든 것이다. 자유롭게
교체해도 된다: 스탯 행 셀(세리프 값 위에 보조 라벨)과 특징 카드의 아이콘 슬롯(모노 인덱스 숫자).

### 디자인 레퍼런스

`design/TOKENS.md`와 `design/COMPONENTS.md`는 **원본 export를 추출한 기록**이지 살아 있는
문서가 아니다. 이 디자인이 왜 그림자가 없고, 액센트 색이 없고, 자간에 민감한지를 설명하며 원본
컴포넌트 30개를 목록화한다 — 한 번은 읽어볼 가치가 있다. 다만 **값의 단일 원천은
`src/styles/tokens.css`** 이고 컴포넌트의 단일 원천은 코드다. 토큰 목록을 마크다운에 동기화하지
말 것. 컨테이너 폭이 어긋났던 원인이 바로 그것이다.

---

## 런칭 전 할 일

차단 요소:

1. **개인정보 동의 문구를 전문가에게 검토받을 것.** 폼은 이미 라이브이고 3년 보관을 명시한 채
   실제 개인정보를 Google Sheet에 수집하고 있다. `data/booking.ts`의 문구는 일반적인 PIPA
   관행을 따랐을 뿐 변호사가 쓴 것이 아니며, PIPA 위반에는 과징금이 따른다.
2. **`isseum.com`이 `www`로 리다이렉트되지 않는다.** 현재 두 호스트명이 모두 사이트를 직접
   서빙해서 중복 콘텐츠로 읽힌다. 모든 canonical 태그가 `www`를 가리키므로 피해는 제한적이지만
   진짜 301이어야 한다. Cloudflare **Redirect Rule**로 해결할 것: `Hostname equals
   isseum.com` 매치, 액션 Dynamic,
   `concat("https://www.isseum.com", http.request.uri.path)`, 상태 301, 쿼리 스트링 보존.
   static이 아니라 dynamic이어야 `/booking`이 홈으로 뭉개지지 않는다. Redirect Rule은 Workers
   보다 먼저 실행되므로 apex 커스텀 도메인보다 이 규칙이 이긴다.
3. **Google Search Console 등록.** 네이버 서치어드바이저는 완료됐다 — §완료됨 참고. 사이트맵은
   `/sitemap-index.xml`에 있다.
4. **행사 사진.** `showEventsPage`가 기다리고 있는 바로 그것이다 — §기능 플래그 참고.

### 완료됨

파비콘(`favicon-16/32`, `apple-touch-icon`, `icon-192/512`, `site.webmanifest`)과
1200×630 `og-image.jpg`가 생성돼 `BaseLayout.astro`에 연결돼 있다. 둘 다 저장소 자체의
에셋에서 만들었으므로 재생성할 수 있다.

- **아이콘** — `design/assets/isseum_logo_no_BG.png`에서 sharp로. 1:1.98 세로 워드마크는 밝은
  배경 위 작은 크기에서 읽히지 않기 때문에 `--ink` 타일에서 마크를 파내는 방식을 썼다. 16px과
  32px는 **`이` 글자만** 사용하고(완전 투명한 행 간격을 찾아 마크의 첫 줄을 잘라냈다), 180px
  이상은 전체 적층 마크를 쓴다.
- **OG 이미지** — sharp로 그리지 않고 헤드리스 Chrome에서 HTML 레이아웃을 스크린샷해 만들었다.
  sharp/librsvg는 웹폰트가 설치돼 있지 않으면 한국어 텍스트를 안정적으로 렌더하지 못하기
  때문이다. 이 방식이면 진짜 Noto Serif KR과 진짜 토큰을 쓴다.

이 파일을 마지막으로 개정한 뒤 닫힌 항목들:

- **소셜 링크가 실제 주소로 연결됐다.** `config/site.ts`의 `socialLinks`에 인스타그램과
  네이버 블로그가 있다. 카카오맵은 채우는 대신 뺐다 — 지도 링크는 하나면 충분하다.
- **네이버 서치어드바이저 소유확인 완료.** 파일 업로드가 아니라 **HTML 메타 태그** 방식
  (`config/site.ts`의 `naverSiteVerification`)이다. 파일 방식은 Yeti가 리다이렉트를 따라오는지에
  의존하게 된다. `html_handling: "drop-trailing-slash"`가 `/naverXXXX.html`을 확장자 없는
  경로로 307 보내기 때문이다.
- **푸터 지도는 완성됐고 API 키가 필요 없다.** 정적 `naver_map.png`를 `naverMapUrl`
  (`naver.me` 공유 링크)로 감싼 것이다. 의도적이다: 푸터는 모든 페이지에 있으므로 지도 임베드
  스크립트를 넣으면 사이트 전역에 서드파티 JS가 깔리고 *동시에* 지도 제공자가 개인정보 처리
  위탁처가 된다. SDK 임베드로 "업그레이드"하지 말 것.
- **요금이 사이트에 올라갔다.** 평일 시간당 140,000원 / 주말·공휴일 170,000원, 부가세 포함,
  최소 3시간, 전체 대관만. 팝업 뒤에 숨기려던 이전 계획은 폐기했다: `홍대 대관 가격`은 이
  방문자층의 최상위 검색어이고, 네이버 Yeti는 JS 모달보다 정적 HTML을 훨씬 잘 읽으며, 홈
  페이지에는 프레임워크 런타임이 없어 그 판단과 잘 맞는다. §대관 요금 참고.
- **모든 장비 항목에 사진이 있다.** `equipment.ts`의 10개 항목 전부가 `src`를 갖는다. 이동식
  강연대(`podium.jpg`)와 초고속 Wi-Fi(`wifi.svg`) 포함이며, 컨트롤룸 믹서 파일은
  `src/assets/`에서 사라졌다. 제품 누끼 컷이므로 여전히 `fit: 'contain'`을 쓴다 — 실제 현장
  사진으로 교체되면 `'cover'`로 바꿀 것.

해두면 좋은 것:

5. **폰트 자체 호스팅 및 서브셋팅.** 현재 CDN(`fonts.googleapis.com` + jsDelivr)이라 모든
   페이지 로드마다 서드파티에 의존하고, 한국어 웹폰트는 크다. Noto Serif KR은 이미 weight를
   400/500 둘로 줄였다(원래 다섯).
6. **이용 시간 초과 요금에 금액이 없다.** FAQ와 요금 안내 양쪽이 "30분 단위로 추가 요금"이라고
   약속하는데 어느 쪽도 금액을 말하지 않는다. 사이트가 스스로 제기하고 답하지 않는 유일한
   질문이다 — 금액을 받아서 `pricing.ts`에 넣을 것.
7. **오픈 기념 특가에 종료 시점이 없다.** `pricing.ts`는 "별도 공지 시까지"라고 적고 있다.
   정적 HTML의 프로모션 가격은 기본적으로 영구 가격이 된다. 날짜를 정하거나, 140,000 /
   170,000이 이제 정가임을 받아들이거나 둘 중 하나다.
8. **`drive-download-20260819T100341Z-1-001/`이 저장소 루트에 커밋돼 있다 — 25 MB.** 장비 원본
   8장의 구글 드라이브 원본 내려받기 폴더로, `src/assets/` 전체보다 크고 아무것도 import하지
   않는다. 실제로 배포되는 누끼 컷은 `src/assets/`의 파일들이다. 영상을 커밋하는 것과 같은
   문제다 — 모든 클론에 영원히 남는다. 원본은 저장소 밖에 두고 폴더를 삭제할 것.

열린 제품 질문 — **답을 지어내지 말고 물어볼 것**:

9. **홈 CTA가 날짜 확인을 약속한다.** ("원하시는 날짜가 비어 있는지 먼저 확인해 보세요") 하지만
   링크는 정적 폼이다. 진짜 캘린더가 필요하거나, 카피를 누그러뜨려야 한다.
10. **한국어 전용** — `hreflang`도, 언어 전환기도 없다. 자간 스케일이 한국어에 맞춰져 있어서
    나중에 붙이는 작업은 고통스럽다.

---

## 함정 모음

실제로 물렸던 것들을, 재발 가능성이 높은 순서로.

- **`npm run dev`가 돌아가는 중에 `npm run build`를 하면 dev 서버가 깨진다.** 둘이
  `node_modules/.vite`를 공유하는데, 빌드가 최적화 의존성 디렉터리를 새로 쓰는 동안 실행 중인
  서버가 그 핸들을 쥐고 있기 때문이다. 이후 dev 서버는 *The file does not exist at
  .../deps_ssr/astro_assets_runtime.js … Try adding it to `optimizeDeps.exclude`* 같은
  500을 뱉는다 — 이 메시지는 헛다리다. 설정에는 아무 문제가 없다. 복구:
  ```bash
  npx astro dev stop && rm -rf node_modules/.vite .astro && npm run dev
  ```
  빌드 전에 dev 서버를 멈추거나, 작업이 끝난 뒤에만 빌드해서 피할 것.

- **Astro의 scoped CSS는 자바스크립트로 만든 요소에 절대 닿지 않는다.** 스코핑은 모든 선택자에
  `[data-astro-cid-…]`를 덧붙이는데 `document.createElement`로 만든 노드에는 그 속성이 없다 —
  그래서 페이지 `<style>` 블록에서 스타일을 준 `.field__error`가 상속받은 16px 잉크색으로
  렌더됐다. JS가 만드는 노드의 스타일은 `<style is:global>`에 둘 것. 이미 마크업에 있는
  요소에 클래스를 토글하는 것은 괜찮다. cid를 그대로 갖고 있기 때문이다.
- **input의 `pattern`은 정규식 `v` 플래그로 컴파일되며, 잘못된 패턴은 조용히 무시된다.**
  `pattern="0\d{1,2}[-\s]?…"`는 *Invalid character in character class*를 던졌는데 — `v` 모드
  문자 클래스 안에서는 맨 `-`가 허용되지 않는다 — 그 결과 `checkValidity()`가 `abc`를 포함해
  **모든 값에 true**를 돌려줬다. 이스케이프하고(`[\-\s]`) 실제로 잘못된 값으로 검증할 것.
  아무것도 검증하지 않는 패턴은 제대로 동작하는 패턴과 겉보기가 똑같다.
- **헤드리스 CDP의 `getComputedStyle`은 낡은 색을 돌려줄 수 있다.** `.is-invalid`가 분명히
  적용돼 있는데도 테두리가 `--border`로 보고되는 것을 쫓느라 여러 차례를 낭비했다 —
  스크린샷에는 처음부터 올바른 빨강이 찍혀 있었다. 색은 CDP로 computed style을 읽지 말고
  스크린샷의 픽셀을 샘플링해서 확인할 것.

- **`<dialog>`에 `display:`를 지정하면 `close()` 후에도 계속 보인다.** UA 스타일시트는 닫힌
  다이얼로그를 `dialog:not([open]) { display: none }`으로 숨기는데, 작성자의 `display`는
  명시도와 무관하게 *언제나* UA 규칙을 이긴다. `.eqmodal { display: grid }` 때문에 `✕`가
  `close()`를 호출하고 `open`이 `false`가 되어도 패널이 화면에 남았다. `display`를 지정하는
  다이얼로그에는 짝이 되는 `:not([open]) { display: none }`이 필요하다.
- **앵커 오프셋은 대상 자신의 `padding-top`을 빼야 한다.** 모든 `.section`은
  `padding-top: var(--space-section)`(최대 140px)를 갖는다. 섹션 *박스*를 헤더 아래로 스크롤
  시키면 그 패딩이 오프셋 위에 쌓여 제목 위에 약 150px의 빈 공간이 생겼다. 그래서
  `--scroll-offset`은 `calc(var(--header-h) + var(--anchor-gap) - var(--space-section))`이고
  데스크톱에서는 음수인데, 이는 유효하다. `--header-h`는 `Header.astro`에서 런타임에 측정한다.
  모바일 헤더(바 + 탭 스트립, 141px)가 데스크톱 바(101px)보다 높기 때문이다.

- **`astro check`는 사용되지 않은 `Props` 인터페이스를 hint로 취급한다.** 추론에 맡기지 말고
  구조 분해에 타입을 달 것(`const { … }: Props = Astro.props`).
- **잘못된 클래스 이름은 빌드를 실패시키지 않는다.** 일괄 치환이 한 번
  `class="containerfilters"`를 만들어 컨테이너를 통째로 날렸는데 빌드는 초록색이었다. 레이아웃
  변경은 컴파일이 아니라 렌더로 확인할 것.
- **`@astrojs/check`의 peer는 TypeScript `^5 || ^6`이다.** TS 7이 존재하지만 설치하면
  `npm install`이 깨진다. TS는 `^6`에 고정할 것.
- **`src/assets/`의 파일 이름을 바꾸면 import가 깨진다.** import 경로는 강한 참조이며,
  `src/assets/events/` 바깥에는 자동 발견이 없다.
- **dev 서버는 데몬으로 뜬다.** `npm run dev`는 즉시 반환한다. 종료는 `astro dev stop`.
  `astro.config.mjs`를 바꾼 뒤에는 재시작할 것 — 설정 변경은 핫 리로드되지 않는다.
- **`wrangler types`를 실행하지 말 것.** 전역 `worker-configuration.d.ts`를 쓰는데, 여기서 DOM
  타입을 다시 선언해(`Element.remove()`가 Workers 런타임에서는 `Element`를, DOM에서는 `void`를
  반환한다) 모든 클라이언트 `<script>`가 컴파일되지 않게 된다. `src/cloudflare.d.ts`가
  엔드포인트가 import하는 모듈 두 개만 선언하고 있고, 생성되는 파일은 gitignore돼 있다.
- **Turnstile 토큰은 1회용이다.** 제출에 실패한 뒤에는 `turnstile.reset()`을 호출해야 한다.
  그러지 않으면 재시도마다 같은 에러가 난다.
- **Chrome `--dump-dom` 출력에는 NUL 바이트가 섞여 있어서** `grep`이 바이너리로 취급해 아무것도
  출력하지 않는다. node로 파이프하거나 `grep -a`를 쓸 것.
- 로고 에셋은 원래 88%가 투명 여백이었다(2000×2000 캔버스 위의 496×984 마크). 지금은
  잘라냈고 원본은 `design/assets/isseum_logo_no_BG.png`에 보존돼 있다. 크기는
  `--logo-height` / `--logo-height-footer`로 조절한다.

---

## 컨벤션

- 커밋 메시지는 영어, 명령형. 사소하지 않은 작업은 `main`에서 브랜치를 딸 것.
- 컴포넌트 CSS는 해당 `.astro` 파일 안의 scoped `<style>`에 둔다. 진짜로 전역인 프리미티브만
  `base.css`에 넣는다.
- `:global()`은 아껴 쓰고, 자식 컴포넌트가 렌더한 `<Image>`를 스타일링할 때만 쓴다.
- 클래스 이름은 컴포넌트별 BEM 풍(`.tile__cap`, `.hero__lead`). 남아 있는 오명 하나:
  대관 규정 페이지의 `.intro__emphasis`는 이제 `PageHero` 슬롯 안에 있으므로
  `.rules__emphasis`가 더 맞다.
- 한국어 카피는 구분자로 `·`를, 설명절 앞에는 `—`(em dash)를 쓴다. 레퍼런스를 따른 것이다.
  불릿 줄의 라벨은 `<strong>` 안에서 `— `로 끝낸다.

# ISSEUM (이씀) — 복합문화공간 웹사이트

서울 마포구 동교동, 홍대입구역 1번 출구 5분 거리의 약 60평(198㎡) 가변형 복합문화공간
**이씀**의 대관 마케팅 사이트. 워크숍 · 북토크 · 팝업 · 팬미팅 · 쇼케이스 · 촬영 대관을 받는다.

- **모든 콘텐츠는 한국어다.** 라틴 문자는 `WHY ISSEUM` 같은 장식용 eyebrow 라벨뿐이다.
- **이미 라이브다.** `https://www.isseum.com`. `/booking` 폼으로 **실제 문의가 들어오므로**
  그 폼과 `/api/booking` 수정은 프로덕션 변경으로 취급할 것.

---

## 작업 규칙

코드에서 유추할 수 없는 합의 사항.

1. **요청받지 않으면 `git commit` / `git push` 하지 말 것.** `main`에 push하면 Cloudflare가
   **즉시 라이브 배포**한다. 수정 후 `npm run build`로 확인만 하고 멈출 것.
2. **CSS · 카피 · 레이아웃 변경은 스크린샷으로 확인할 것.** CDP `getComputedStyle`은 낡은
   값을 돌려준 적이 있어 믿지 않는다. 빌드는 편집이 끝난 뒤 한 번만.
3. **요금 · 정책처럼 소유자만 아는 값은 지어내지 말고 물어볼 것.**

---

## 스택

Astro 7 (`output: 'static'`) · TypeScript 6 strict · 순수 CSS · Cloudflare Workers.
**Tailwind 없음, UI 라이브러리 없음, React/Vue/Svelte 없음.** 인터랙션은 `.astro` 안의 바닐라
`<script>`뿐이다(홈 약 2.5 KB). 이미지는 `astro:assets`(sharp) → WebP. 폰트는 Pretendard +
Noto Serif KR(CDN). Node 24.x.

```bash
npm ci           # npm install 아님 — CI가 lock을 그대로 쓴다
npm run dev      # localhost:4321, 데몬으로 뜬다. 종료는 `npx astro dev stop`
npm run build    # astro check && astro build → 0 errors/warnings/hints 유지
```

정적 HTML을 고수하는 이유는 **네이버**다. Yeti는 클라이언트 렌더링보다 정적 마크업을 훨씬 잘
읽고, 이 사이트의 방문자는 한국어로 검색한다.

---

## 저장소 구조

```
astro.config.mjs   사이트 URL, 정적 출력, 사이트맵
wrangler.jsonc     배포 설정 (정적 에셋 + 커스텀 도메인)
design/            읽기 전용 원본 디자인 export. 수정·배포 금지
src/
  config/site.ts   사업자 정보, nav, bookingUrl, 소셜/지도 링크, showEventsPage 플래그
  data/            ★ 사용자에게 보이는 모든 문자열
    home.ts  spaces.ts  equipment.ts  pricing.ts  faq.ts  booking.ts  events.ts  notFound.ts
  styles/tokens.css  ★ 모든 디자인 값
  styles/base.css    전역 스타일, 포커스 링, reduced-motion
  components/      9개, 전부 scoped CSS .astro
  layouts/BaseLayout.astro
  pages/           index(공간·장비·요금·절차·FAQ 한 페이지) · booking · events(숨김) · 404
    api/booking.ts 유일한 on-demand 라우트
scripts/booking-sheet/  Apps Script (제출 → Google Sheets)
```

---

## 지켜야 할 규칙 넷

### 1. 카피는 전부 `src/data/*.ts`에 있다

제목 · 버튼 라벨 · placeholder · `aria-label` · 검증 메시지 · 페이지 `title`까지, 사람이 읽는
문자열은 `.astro`에 쓰지 않고 `src/data/`에서 export해 이름으로 참조한다. 클라이언트
`<script>`도 마크업과 같은 모듈에서 import한다(Rollup이 tree-shake하므로 번들 비용 없음).

- **어느 모듈이 소유하는가**: 렌더하는 페이지가 아니라 그 대상을 소유한 모듈. 장비 라벨은
  `equipment.ts`, 대관 규정은 `booking.ts`. 페이지 뼈대(타이틀·섹션 헤더·마무리 CTA)는 그
  페이지의 모듈.
- **상수 하나, 리터럴 둘 금지.** 한쪽이 만들고 다른 쪽이 소비하는 문자열은 같은 export를
  읽는다. 리터럴을 두 번 적었다가 조용한 버그가 난 전력이 있다(`events.ts`의 `openSuffix`,
  `ALL`).
- **예외는 아이콘 글리프**(`✕ ← → ＋`, 항상 `aria-hidden`)뿐이다.
- 아직 `Footer.astro` · `Header.astro` · `DarkCta.astro` · `HeroSlideshow.astro` ·
  `BaseLayout.astro`에는 카피가 하드코딩돼 있다. 그 파일을 건드릴 때 옮길 것.

### 2. 스타일은 전부 `tokens.css`를 거친다

값이 없으면 이름을 붙여 추가한 뒤 그 이름을 쓴다. 리터럴 hex나 매직 픽셀 금지.

1. **그림자 없음.** 모든 경계는 1px 선. 위계는 `--border`(헤어라인)와 `--border-emphasis`
   (`--ink`) 두 단계뿐.
2. **액센트 색 없음.** 따뜻한 무채색만. 위계도 심각도도 명도로 표현한다(환불 등급이 그 예).
   유일한 예외 `--error`는 **폼 검증 전용**이다.
3. **각진 모서리.** `--radius`는 `2px`. `--radius-full`은 배지·점·원형 마크 전용.
4. **자간이 구조를 지탱한다.** 한국어는 좁게, 라틴 eyebrow는 넓게. 기본값으로 두지 말 것.
5. **유동 타입.** 디스플레이 크기는 `clamp()`. 브레이크포인트별 `font-size` 덮어쓰기 금지.

디스플레이는 세리프(Noto Serif KR 500), 본문·UI는 Pretendard, 모노는 인덱스 숫자 전용.

**헤어라인 그리드** — 모든 카드 그리드의 관용구. 그리드 배경이 곧 테두리 색이고 1px 간격으로
비쳐 보이게 해서 이중 테두리 없이 내부 구분선을 만든다:

```css
display: grid; gap: 1px; background: var(--border); border: var(--border-hairline);
/* 셀에서 background: var(--bg) */
```

**브레이크포인트는 `640px` · `900px` · `1100px` 셋뿐이다.** 실제로 구조를 바꾸는 건
900px(데스크톱 nav ⇄ 모바일 탭 바)뿐. 네 번째를 만들기 전에 `repeat(auto-fit, minmax(…))`를
먼저 볼 것.

### 3. 접근성 최저선

- **모든 인터랙티브 요소에 보이는 `:focus-visible`.** 링크는 전역적으로 밑줄이 없어서 포커스
  링이 키보드 사용자의 유일한 단서다.
- **`<a>`를 `pointer-events: none`으로 막지 말 것.** `aria-disabled` + 클릭 핸들러를 쓰고, JS가
  꺼져도 동작하도록 활성 상태로 렌더한다.
- **`prefers-reduced-motion` 존중.** 이 설정에서 히어로는 자동으로 넘어가지 않는다. macOS에서
  멈춰 보이면 버그로 단정하기 전에 시스템 설정을 확인할 것.
- 필터가 있는 목록에는 **빈 상태**와 `role="status"` 카운트가 있다.
- 지난 행사 라이트박스는 네이티브 `<dialog>` + `showModal()`이다. div로 바꾸지 말 것.

### 4. 이미지는 `src/assets/`, 그 외 정적 파일은 `public/`

`src/assets/`는 WebP 변환·리사이즈·해싱을 거친다(원본 긴 변 약 2000px 권장). 행사 사진만
자동 발견된다 — `src/assets/events/<slug>/`에 파일을 넣으면 되고, 첫 파일이 대표 타일이 된다
(규칙은 `src/assets/events/README.md`). 히어로·공간·장비 사진은 **데이터 파일에서 명시적으로
import**해야 하며, 파일만 넣는 것으로는 아무 일도 일어나지 않는다.

**영상은 커밋하지 말 것.** Astro가 처리하지 않고 모든 클론을 영구히 무겁게 한다. 외부에
호스팅하고 URL만 저장할 것.

---

## 대관 요금

`src/data/pricing.ts`가 요금 숫자가 존재하는 **유일한 곳**이고, 소비처 세 곳(홈 `#price` 표,
`faq.ts` 대관료 답변, `/booking` 요금 줄)이 이 모듈을 읽는다.

부가세 포함 · 시간당 · 최소 3시간 · **전체 대관만**(부분 대관 없음):

| | 정상가 | 오픈 특가 |
|---|---|---|
| 평일 | 280,000원 | **140,000원** |
| 주말·공휴일 | 340,000원 | **170,000원** |

- 금액은 숫자로 저장하고 모듈이 포맷한다. 최소 시간은 `booking.ts`의 `MIN_HOURS`를 읽으므로
  폼 검증값과 어긋날 수 없다.
- **할인율(%)은 화면에 쓰지 않는다.** 특가가 정확히 절반이긴 하지만, "50% 할인"이라고 적으면
  나중에 정상가 복귀가 인상으로 읽힌다. 소유자 결정이니 묻지 않고 되돌리지 말 것.
- **취소선은 시각 정보일 뿐이다.** 스크린 리더용으로 데스크톱은 열 제목, 모바일은
  `aria-hidden` 인라인 라벨이 금액마다 붙는다. 다시 스타일링해도 둘 다 남길 것.
- `/booking`은 합계를 계산하지 않는다. 최종 금액은 호스트가 확인 후 안내한다.

---

## 예약 폼

`/booking`은 구글 로그인을 요구하던 구글 폼을 대체한다. 5단계: 기본 정보 → 이용 규정 동의 →
추가 옵션 → 개인정보 동의 → 신청 내용 확인. `noindex`이며 사이트맵에서 제외된다.

```
브라우저 → POST /api/booking
             ├─ 허니팟 → Turnstile → 서버 검증   ← 실제로 유효한 검증
             ├─ 이메일 (Cloudflare Email Routing)   ← 안전망. 실패하면 에러를 돌려준다
             └─ 시트   (Apps Script → Google Sheets) ← 최선 노력. 실패해도 성공 처리
```

순서가 중요하다. 받지 않은 것을 받았다고 말하지 않기 위해 이메일이 먼저다.

제약값은 `booking.ts`에 있고(`MIN_HOURS` 3, `MAX_GUESTS` 90, `OPEN_HOUR`/`CLOSE_HOUR` 8–22)
**클라이언트와 `api/booking.ts` 양쪽이 강제한다.** 클라이언트 검사는 예의일 뿐이다.

시크릿은 `wrangler secret put`으로 넣으며 저장소에 두지 않는다:

| 이름 | 값 |
|---|---|
| `TURNSTILE_SECRET` | Turnstile 시크릿 키 (사이트 키 아님 — 생김새가 비슷하다) |
| `SHEET_WEBHOOK_URL` | Apps Script 웹앱 `/exec` URL |
| `SHEET_SECRET` | Apps Script `setup()`이 출력하는 `SHARED_SECRET` |

`NOTIFY_TO` / `NOTIFY_FROM`은 `wrangler.jsonc`의 vars다. Turnstile **사이트** 키는 공개 값이라
`config/site.ts`에 있고, 로컬에서는 테스트 키로 대체된다(`.dev.vars`에
`TURNSTILE_SECRET="1x0000000000000000000000000000000AA"` 필요, gitignore됨).
Apps Script는 수정 후 **새 버전 배포**가 필요하다. 저장만으로는 아무것도 바뀌지 않는다.

---

## 배포

`main`에 push하면 Cloudflare Workers Builds가 빌드·배포한다(약 1분). **§작업 규칙 1 — 요청받지
않았으면 push하지 않는다.**

설정은 전부 `wrangler.jsonc`와 `astro.config.mjs`에 있다. 건드릴 때 알아야 할 것:

- **`run_worker_first: ["/api/*"]`** 가 없으면 `/api/booking` POST가 **405**를 받는다.
- **`assets.directory`는 `./dist/client`.** 어댑터가 출력을 client/server로 나눈다.
- **`imageService: 'compile'`** 이어야 빌드 타임에 최적화된다. 되돌아가면 `_astro/`에 `.webp`가
  사라지고 HTML에 `/_image?`가 보인다.
- **커스텀 도메인은 `routes`에 선언한다.** 대시보드에서 붙이는 시도는 DNS 레코드를 쓰지 않고
  조용히 실패한 전력이 있다.
- **의존성을 추가했으면 push 전에 `npm ci --dry-run --os=linux --cpu=x64`.** macOS에서 그냥
  `npm ci`는 검증이 안 된다. 실패하면 `rm -rf node_modules package-lock.json && npm install`
  (sharp의 `@emnapi/*` 때문에 두 번 물렸다).

배포 확인: 대시보드의 빌드 성공은 증거가 아니다. `curl`로 라이브 HTML의 `/_astro/*.css` 해시를
로컬 `dist/`와 비교하거나, `POST /api/booking`이 **400**(405 아님)을 돌려주는지 볼 것.

---

## 기능 플래그 `showEventsPage`

현재 **`false`**. 지난 행사 아카이브는 코드가 완성됐지만 사진이 없어(타일 23개가 전부
플레이스홀더) 숨겨둔 상태다. 플래그 하나가 푸터 링크 · `/events`의 `noindex` · 사이트맵 제외를
모두 끌고 간다. `astro.config.mjs`가 사이트맵 필터를 위해 **같은 플래그를 import한다** —
두 파일로 쪼개지 말 것.

페이지 자체는 빌드되므로 사진을 넣으며 `/events`에서 검토할 수 있다. 다시 열려면 플래그를
`true`로 바꾸고 `src/assets/events/<slug>/`에 사진을 넣으면 된다.

---

## 함정

실제로 물렸던 것들:

- **dev 서버가 켜진 채 `npm run build`하면 dev 서버가 깨진다**(둘이 `node_modules/.vite`를
  공유). 복구: `npx astro dev stop && rm -rf node_modules/.vite .astro && npm run dev`.
- **Astro의 scoped CSS는 JS로 만든 요소에 닿지 않는다.** 스코핑이 `[data-astro-cid-…]`를
  붙이는데 `createElement` 노드에는 그 속성이 없다. JS가 만드는 노드는 `<style is:global>`에.
- **`<dialog>`에 `display:`를 주면 `close()` 후에도 보인다.** 작성자 `display`가 UA의
  `dialog:not([open])` 규칙을 이긴다. 짝이 되는 `:not([open]) { display: none }`이 필요하다.
- **input `pattern`은 정규식 `v` 플래그로 컴파일되고, 잘못된 패턴은 조용히 무시된다**
  (검증이 항상 통과한다). `v` 모드 문자 클래스 안의 맨 `-`는 `[\-\s]`로 이스케이프할 것.
- **앵커 오프셋은 대상의 `padding-top`을 빼야 한다.** `--scroll-offset`이 그래서 음수이며,
  `--header-h`는 `Header.astro`에서 런타임에 측정한다(모바일 헤더가 더 높다).
- **잘못된 클래스 이름은 빌드를 실패시키지 않는다.** 레이아웃 변경은 컴파일이 아니라 렌더로
  확인할 것.
- **`src/assets/` 파일 이름을 바꾸면 import가 깨진다.** `events/` 바깥에는 자동 발견이 없다.
- **`wrangler types`를 실행하지 말 것.** DOM 타입을 다시 선언해 클라이언트 `<script>`가 전부
  컴파일되지 않게 된다. `src/cloudflare.d.ts`가 필요한 선언만 갖고 있다.
- **Turnstile 토큰은 1회용이다.** 실패 후 `turnstile.reset()`을 호출하지 않으면 재시도마다 같은
  에러가 난다.
- **TypeScript는 `^6`에 고정.** `@astrojs/check`의 peer가 `^5 || ^6`이라 TS 7을 넣으면
  `npm install`이 깨진다.
- dev 서버는 데몬이다. `astro.config.mjs`를 바꾸면 재시작해야 한다(핫 리로드 안 됨).

---

## 남은 일

차단 요소:

1. **개인정보 동의 문구를 전문가에게 검토받을 것.** 폼이 이미 실제 개인정보를 수집 중이고,
   `booking.ts`의 문구는 일반적인 PIPA 관행을 따랐을 뿐 변호사가 쓴 것이 아니다.
2. **`isseum.com` → `www` 301 리다이렉트.** 지금은 두 호스트가 모두 사이트를 서빙해 중복
   콘텐츠로 읽힌다. Cloudflare Redirect Rule로, `/booking`이 홈으로 뭉개지지 않게 Dynamic으로.
3. **Google Search Console 등록** (네이버 서치어드바이저는 완료).
4. **행사 사진** — `showEventsPage`가 기다리는 것.

미정 값 — 지어내지 말고 물어볼 것:

5. **이용 시간 초과 요금.** FAQ와 요금 안내 양쪽이 "30분 단위 추가 요금"이라고 약속하는데
   금액이 없다. 사이트가 제기하고 답하지 않는 유일한 질문이다.
6. **오픈 기념 특가 종료 시점.** 지금은 "별도 공지 시까지". 날짜가 없으면 사실상 정가가 된다.
7. **홈 CTA가 날짜 확인을 약속한다**("원하시는 날짜가 비어 있는지 먼저 확인해 보세요"). 링크는
   정적 폼이므로 캘린더를 만들거나 카피를 누그러뜨려야 한다.

해두면 좋은 것:

8. **폰트 자체 호스팅·서브셋팅** (현재 CDN, 한국어 웹폰트는 무겁다).
9. **`drive-download-20260819T100341Z-1-001/`(25 MB)가 저장소 루트에 커밋돼 있다.** 장비 원본
   내려받기 폴더로 아무것도 import하지 않는다. 저장소 밖으로 옮기고 삭제할 것.

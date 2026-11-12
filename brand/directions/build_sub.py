"""Builds the draft sub-pages (rules.html, guide.html, guide-parking.html) with one shared header and footer.
Copy is taken verbatim from the live pages isseum.com/rules, /guide and /guide/parking."""
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'home')

HEAD = '''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="claude:viewport-fit-sides" content="cover">
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&family=Gaegu:wght@300&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="sub.css">
<style>{css}</style>
</head>
<body>
<div class="promo" role="region" aria-label="공지" data-promo><div class="promo-track" data-ticker>주중 시간당 140,000원 · 최소 3시간 · 부가세 포함<a href="./#contact">대관 문의 →</a></div><button type="button" class="promo-close" data-promo-close aria-label="공지 닫기"><span aria-hidden="true">✕</span></button></div>
<header class="hdr">
  <div class="wrap">
    <a href="./" class="logo-hand" aria-label="이씀 처음으로">이씀</a>
    <nav class="nav" aria-label="주요 메뉴">
      <a href="./#space">공간 안내</a><a href="./#process">대관 절차</a><span class="soon" aria-label="프로그램, 준비 중">프로그램<small>준비 중</small></span><a href="./#faq">FAQ</a>
    </nav>
    <div class="hdr-cta"><button type="button" class="lang" data-lang aria-label="언어 전환 (영어 페이지 준비 중)">EN</button><a class="btn pri sm" href="#contact">대관 문의</a></div>
  </div>
</header>
<main>
'''

FOOT = '''</main>
<footer class="contact" id="contact" aria-labelledby="contact-title">
  <span class="emb inv" aria-hidden="true"><i class="o"></i><i class="bar"></i><i class="sl"></i><i class="sq"></i></span>
  <div class="wrap">
    <h2 id="contact-title" class="contact-h"><span class="hand">모든 형태의 이야기를,</span>이곳에서 자유롭게 펼쳐보세요</h2>
    <div class="channels">
      <a class="ch" href="https://talk.naver.com/ct/wxgdt7v" target="_blank" rel="noopener"><span class="l">NAVER TALK</span><span class="v">네이버 톡톡 →</span></a>
      <a class="ch" href="https://pf.kakao.com/_ZGxomX/chat" target="_blank" rel="noopener"><span class="l">KAKAOTALK</span><span class="v">카카오톡 채널 →</span></a>
      <div class="ch"><span class="l">PHONE</span><span class="v">010-6899-4417</span></div>
      <div class="ch"><span class="l">EMAIL</span><span class="v">hello@isseum.com</span></div>
    </div>
    <div class="biz">
      <dl>
        <dt>상호</dt><dd>영준피엠씨(YOUNGJUN PMC)</dd>
        <dt>대표</dt><dd>정용철</dd>
        <dt>주소</dt><dd>서울특별시 마포구 월드컵북로 22, 지하 1층</dd>
        <dt>사업자등록번호</dt><dd>105-04-11192</dd>
      </dl>
      <p class="links"><a href="rules.html">대관 규정</a><a href="guide.html">이용 안내 (시안 검토용)</a></p>
      <p class="draft">리브랜딩 시안입니다. 실제 사이트(isseum.com)와 다를 수 있습니다.</p>
    </div>
  </div>
</footer>
<script src="sub.js"></script>
</body>
</html>
'''


def page(name, title, css, body):
    with open(os.path.join(OUT, name), 'w', encoding='utf-8') as f:
        f.write(HEAD.format(title=title, css=css) + body + FOOT)


def li(label, text):
    return f'<li><b>{label}</b> — {text}</li>' if label else f'<li>{text}</li>'


# ======================= 대관 규정 =======================
REFUND = [('이용 8일 전 취소', '100% 환불'), ('이용 7일 전 취소', '70% 환불'), ('이용 6일 전 취소', '60% 환불'),
          ('이용 5일 전 취소', '50% 환불'), ('이용 4일 전 취소', '40% 환불'), ('이용 3일 전 취소', '30% 환불'),
          ('이용 2일 전 ~ 당일 취소', '환불 불가')]

groups = [
    ('예약 전 필수 확인 사항', [
        ('이용 시간 및 인원 안내', [
            ('이용 시간', '대관 시간은 행사 준비 및 철수(정리) 시간을 모두 포함한 시간입니다.'),
            ('시간 초과', '이용 시간을 초과할 경우, 30분 단위로 추가 요금이 부과됩니다.'),
            ('수용 인원', '예약 인원을 초과하여 입실할 경우 사전 고지가 필요합니다.')]),
        ('미성년자 및 반려동물 출입', [
            ('미성년자 이용', '만 19세 미만은 법정대리인(보호자) 동반 없이 단독으로 공간을 대관 및 이용할 수 없습니다. 규정 위반 시 환불 없이 퇴실 조치됩니다.'),
            ('반려동물 출입', '시각장애인 안내견을 제외한 모든 반려동물의 출입은 사전 협의 후 가능합니다.')]),
        ('이동 약자 접근성 안내', [
            ('주출입구', '단차가 없어 휠체어 진입이 원활하며, 엘리베이터를 통해 지하 1층 공간까지 편리하게 이동할 수 있습니다.'),
            ('주차 · 화장실', '1층 기계식 주차장 옆에 장애인 전용 주차 구역 1면이 마련되어 있으며, 장애인 전용 화장실(남녀 공용)은 건물 1층에 위치합니다.')]),
        ('주차 및 화물 반입 안내', [
            ('주차 안내', '대관 시 기계식 주차장 기준 최대 5대 주차가 가능합니다. 기계식 주차장 제한 규격이 있어 SUV 등 일부 대형·RV 차량은 입고가 불가할 수 있으며, 방문객 차량은 인근 유료 주차장 이용을 사전에 안내 부탁드립니다.'),
            ('화물 반입', '대형 디스플레이, 이동식 대형 행거 등 부피가 큰 짐을 반입할 경우 사전 승인을 받아야 합니다.')]),
    ]),
    ('공간 도착 및 이용 안내', [
        ('입퇴실 및 출입 안내', [
            ('출입 정보', '현관 비밀번호 및 상세 이용 안내는 이용 시작 1시간 전에 예약자 연락처로 문자 발송됩니다.'),
            ('정각 입퇴실', '다음 예약자를 위해 반드시 예약된 시간 정각에 입실 및 퇴실해 주시기 바랍니다. (사전 짐 보관 불가)')]),
        ('F&B(음식물) 반입 및 취식', [
            ('반입 제한', '공간 내 현장 조리 및 국물류 음식의 반입은 삼가해 주시기 바랍니다. 단, 완제품 형태의 음료 및 다과류만 반입 가능합니다.'),
            ('뒷정리', '취식 후 남은 음식물 쓰레기와 잔여물은 직접 수거해 깔끔하게 정리해 주셔야 합니다.')]),
        ('통신 및 음향 · 영상 기기 사용', [
            ('Wi-Fi', '공간 내 무료 와이파이가 제공되며, 비밀번호는 공간 내부 및 안내 문자를 통해 확인할 수 있습니다.'),
            ('기기 조작 주의', '빔프로젝터, 마이크, 스피커 등 음향·영상 기기는 제공된 매뉴얼에 따라 주의하여 다뤄 주시고, 케이블을 임의로 뽑거나 설정을 변경하지 말아 주세요.')]),
    ]),
    ('주의사항 및 퇴실 · 정리', [
        ('화재 예방 및 안전 관리', [
            ('절대 금연', '건물 전체 및 지하 내부에서는 전자담배를 포함하여 절대 금연입니다.'),
            ('화기 금지', '촛불, 캔들, 가스버너, 폭죽 등 화기 및 연막 장비는 어떠한 경우에도 사용이 불가합니다.'),
            ('통행 방해 금지', '복도·계단 등 공용 공간에서의 대기 및 짐 보관은 제한됩니다. 짐 보관은 대관하신 공간 내부의 창고실을 이용해 주시기 바랍니다.')]),
        ('보안 및 CCTV 작동 안내', [
            ('CCTV 녹화', '안전, 화재 예방, 방범 및 시설물 훼손 방지를 위해 24시간 CCTV가 녹화되고 있습니다. 예약 시 CCTV 촬영 및 저장에 동의한 것으로 간주합니다.'),
            ('임의 조작 금지', 'CCTV 방향을 임의로 돌리거나 가리는 행위는 엄격히 금지합니다.')]),
        ('원상복구 및 쓰레기 분리배출', [
            ('원상복구', '퇴실 시 책상, 의자, 무대 등은 입실 전 기본 배치로 원상 복구해 주셔야 합니다.'),
            ('벽면 훼손 금지', '벽면에 테이프, 접착제, 못, 핀 사용은 불가하며, 갤러리 와이어와 전용 점착제(블루텍)만 허용됩니다. 두 가지는 사전 협의 시 제공해 드립니다.'),
            ('손해 배상', '기자재 파손 및 소품 분실 시 수리비 또는 동일 제품 교체 비용이 청구될 수 있습니다.'),
            ('쓰레기 분리배출', '행사 중 발생한 일반 쓰레기 및 플라스틱·종이컵은 엘리베이터 옆 쓰레기통에 분리 배출해 주시고, 대량으로 발생한 쓰레기는 별도 봉투에 담아 동일 장소에 배출해 주시기 바랍니다.')]),
    ]),
    ('규정 및 책임', [
        ('취소 및 환불 정책', 'REFUND'),
        ('안전 관리 및 책임 안내', [
            (None, '행사 중 발생하는 참여자의 개인 소지품 분실, 도난 및 부주의로 인한 안전사고에 대한 모든 책임은 주최 측(예약자)에게 있습니다.')]),
    ]),
]

refund_extra = [
    ('결제 직후 취소 예외', '결제 후 2시간 이내 취소 시 100% 환불 (단, 당일 이용 시간이 경과한 경우 환불 불가)'),
    ('변경 불가', '일정·시간 변경 및 인원 축소로 인한 부분 취소는 별도로 문의해 주시기 바랍니다.'),
    ('대관 개시 후 취소 및 조기 퇴실', '대관 시작 시간 이후 고객의 사정이나 행사 조기 종료 등으로 인하여 조기 퇴실하더라도, 미진행 잔여 시간에 대한 대관료는 일체 환불되거나 다른 일정으로 이월되지 않습니다.'),
    ('불가항력', '천재지변이나 공간 자체의 심각한 결함으로 이용이 불가한 경우 100% 환불 처리됩니다.'),
]

n = 0
toc, secs = [], []
for gi, (gtitle, items) in enumerate(groups):
    toc_items, cards = [], []
    for title, body in items:
        n += 1
        num = f'{n:02d}'
        toc_items.append(f'<li><a href="#r{num}"><span>{num}</span>{title}</a></li>')
        if body == 'REFUND':
            inner = ('<div class="refund">' + ''.join(f'<div><span>{w}</span><b>{r}</b></div>' for w, r in REFUND) + '</div>'
                     + '<ul class="items" style="margin-top:18px">' + ''.join(li(a, b) for a, b in refund_extra) + '</ul>')
        else:
            inner = '<ul class="items">' + ''.join(li(a, b) for a, b in body) + '</ul>'
        cards.append(f'<article class="rule" id="r{num}"><span class="sqn">{num}</span><div><h3>{title}</h3>{inner}</div></article>')
    toc.append(f'<li class="tg"><b>{gtitle}</b><ol>{"".join(toc_items)}</ol></li>')
    secs.append(f'<section class="rgroup" aria-labelledby="g{gi}"><h2 id="g{gi}">{gtitle}</h2>{"".join(cards)}</section>')

rules_css = '''
.rules-grid { display: grid; grid-template-columns: 1fr; gap: 40px; padding-bottom: var(--space); }
@media (min-width: 900px) { .rules-grid { grid-template-columns: 280px 1fr; gap: clamp(40px, 6vw, 96px); align-items: start; } }
.rtoc { position: sticky; top: 110px; list-style: none; padding: 0; display: grid; gap: 22px; font-size: 14.5px; }
@media (max-width: 899px) { .rtoc { position: static; background: var(--paper); border-radius: var(--r-card); padding: 20px; } }
.rtoc > li > b { display: block; font-size: 13px; color: var(--muted); margin-bottom: 6px; }
.rtoc ol { list-style: none; padding: 0; display: grid; gap: 4px; }
.rtoc a { display: flex; gap: 10px; padding: 2px 0; }
.rtoc a span { font: 700 12px var(--latin); color: var(--cobalt); padding-top: 3px; width: 20px; }
.rtoc a:hover { color: var(--cobalt); }
.rgroup { display: grid; gap: 0; }
.rgroup + .rgroup { margin-top: clamp(40px, 5vw, 64px); }
.rgroup h2 { font-size: clamp(26px, 3vw, 36px); font-weight: 900; letter-spacing: -0.05em; padding-bottom: 18px; border-bottom: 2px solid var(--ink); }
.rule { display: flex; gap: clamp(16px, 2.4vw, 28px); padding-block: 28px; border-bottom: 1px solid var(--mist); scroll-margin-top: 110px; }
.rule > div { min-width: 0; display: grid; gap: 14px; }
.rule h3 { font-size: clamp(19px, 1.8vw, 22px); font-weight: 900; letter-spacing: -0.04em; padding-top: 10px; }
.rules-cta { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 36px; }
'''

page('rules.html', '대관 규정 · 이씀', rules_css, f'''
<div class="wrap">
  <section class="page-head" aria-labelledby="rules-title">
    <p class="hl">RENTAL POLICY</p>
    <h1 id="rules-title"><span class="hand">함께 지키는</span>대관 규정</h1>
    <p class="lead">예약 전 반드시 확인해 주시기 바랍니다. 예약 결제가 완료됨과 동시에 본 이용 규정에 모두 동의하신 것으로 간주됩니다.</p>
    <p class="chip">최종 개정 2026. 10. 24.</p>
  </section>
  <div class="rules-grid">
    <nav aria-label="규정 목차"><ol class="rtoc">{"".join(toc)}</ol></nav>
    <div>
      {"".join(secs)}
      <div class="rules-cta"><a class="btn pri" href="https://talk.naver.com/ct/wxgdt7v" target="_blank" rel="noopener">네이버 톡톡으로 문의</a><a class="btn" href="https://pf.kakao.com/_ZGxomX/chat" target="_blank" rel="noopener">카카오톡으로 문의</a></div>
    </div>
  </div>
</div>
''')

# ======================= 이용 안내 (목차) =======================
guide_groups = [
    ('도착 및 출입', ['주차 및 화물 반입 안내', '출입 방법', '동선 및 공간 안내']),
    ('공간 이용', ['공간 이용 기본 수칙', '와이파이 연결', '스마트 TV 사용법', '조명 및 스위치 사용법', '음향기기 사용법', '에어컨 및 제습기 사용법', '바 공간 비품 및 식기류']),
    ('퇴실', ['자리 배치 및 가구 원상 복구', '분리수거', '퇴실 전 마무리 체크리스트']),
    ('안전', ['긴급 연락처 및 안전 용품', 'CCTV 보안']),
]
cols, k = [], 0
for gi, (g, rows) in enumerate(guide_groups):
    items = []
    for r in rows:
        k += 1
        num = f'{k:02d}'
        if k == 1:
            items.append(f'<li><a class="gl" href="guide-parking.html"><span class="gn">{num}</span><span class="gt">{r}</span><span class="ga" aria-hidden="true">→</span></a></li>')
        else:
            items.append(f'<li><span class="gl todo"><span class="gn">{num}</span><span class="gt">{r}</span><span class="ga" aria-hidden="true">→</span></span></li>')
    cols.append(f'<section class="gcol"><p class="gstep">{gi + 1}</p><h2>{g}</h2><ul>{"".join(items)}</ul></section>')

guide_css = '''
.gflow { display: grid; grid-template-columns: 1fr; gap: 40px; padding-bottom: var(--space); position: relative; }
@media (min-width: 1100px) {
  .gflow { grid-template-columns: repeat(4, 1fr); gap: 28px; }
  .gflow::before { content: ""; position: absolute; left: 0; right: 0; top: 27px; height: 6px; background: var(--cobalt); }
}
.gcol { position: relative; display: grid; gap: 16px; align-content: start; }
.gstep { width: 60px; height: 60px; border: 11px solid var(--cobalt); background: var(--page); display: grid; place-items: center; font: 700 17px var(--latin); color: var(--cobalt); position: relative; z-index: 1; }
.gcol:first-child .gstep { background: var(--cobalt); color: var(--lime); }
.gcol h2 { font-size: clamp(24px, 2.4vw, 30px); font-weight: 900; letter-spacing: -0.05em; }
.gcol ul { list-style: none; padding: 0; border-top: 2px solid var(--ink); }
.gl { display: flex; align-items: baseline; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--mist); font-weight: 500; }
.gl .gn { font: 700 12px var(--latin); color: var(--cobalt); width: 20px; flex: none; }
.gl .gt { flex: 1; }
.gl .ga { color: var(--cobalt); transition: transform .2s; }
a.gl:hover { color: var(--cobalt); }
a.gl:hover .ga { transform: translateX(4px); }
.gl.todo { color: var(--muted); }
.gl.todo .ga { color: var(--mist); }
.gnote { font-size: 13.5px; color: var(--muted); padding-bottom: var(--space); }
'''

page('guide.html', '이용 안내 · 이씀', guide_css, f'''
<div class="wrap">
  <section class="page-head" aria-labelledby="guide-title">
    <p class="hl">GUIDE</p>
    <h1 id="guide-title"><span class="hand">처음 오신 날,</span>이용 안내</h1>
    <p class="lead">출입과 동선부터 기기 사용법과 퇴실 정리까지, 공간을 이용하시는 데 필요한 안내를 사진과 함께 담았습니다.</p>
  </section>
  <div class="gflow">{"".join(cols)}</div>
  <p class="gnote">시안에서는 01 주차 및 화물 반입 안내만 상세 페이지를 만들었습니다. 나머지 14개는 같은 틀로 이어집니다.</p>
</div>
''')

# ======================= 이용 안내 · 01 주차 =======================
park_css = '''
.doc { display: grid; grid-template-columns: 1fr; gap: 0; max-width: 820px; padding-bottom: var(--space); }
.doc h2 { font-size: clamp(24px, 2.6vw, 32px); font-weight: 900; letter-spacing: -0.05em; margin-top: clamp(40px, 5vw, 64px); padding-bottom: 14px; border-bottom: 2px solid var(--ink); margin-bottom: 22px; display: flex; gap: 14px; align-items: center; }
.doc h2:first-child { margin-top: 0; }
.doc h2 .sqn { width: 40px; height: 40px; border-width: 7px; font-size: 12px; }
.spec { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 18px 0 6px; }
@media (min-width: 640px) { .spec { grid-template-columns: repeat(4, 1fr); } }
.spec div { background: var(--paper); border-radius: 16px; padding: 16px; display: grid; gap: 2px; }
.spec span { font-size: 13px; color: var(--muted); }
.spec b { font-size: clamp(19px, 2vw, 24px); font-weight: 900; letter-spacing: -0.04em; font-variant-numeric: tabular-nums; }
.spec small { font-size: 12.5px; color: var(--muted); }
.fig { margin: 26px 0; }
.fig img { width: 100%; border-radius: var(--r-photo); }
.fig.tall img { max-width: 520px; }
.fig figcaption { font-size: 14px; color: var(--muted); margin-top: 10px; }
.sublink { display: flex; justify-content: space-between; align-items: center; gap: 16px; background: var(--lime); border-radius: var(--r-card); padding: 22px 24px; margin-top: 22px; }
.sublink b { display: block; font-size: 19px; font-weight: 900; letter-spacing: -0.04em; }
.sublink span { font-size: 14.5px; color: var(--body); }
.sublink .ga { font-size: 22px; color: var(--cobalt); }
.sublink:hover { background: var(--cobalt); color: var(--paper); }
.sublink:hover span, .sublink:hover .ga { color: var(--paper); }
.place { background: var(--paper); border-radius: var(--r-card); padding: 24px; display: grid; gap: 14px; margin-top: 16px; }
.place h3 { font-size: 19px; font-weight: 900; letter-spacing: -0.04em; }
.place h3 a { color: var(--cobalt); }
.place dl { display: grid; grid-template-columns: max-content 1fr; gap: 6px 18px; font-size: 15px; }
.place dt { color: var(--muted); }
.place dd { margin: 0; }
.note { border-left: 6px solid var(--cobalt); background: var(--paper); border-radius: 0 16px 16px 0; padding: 16px 20px; margin-top: 18px; font-size: 15px; }
.pager { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding-top: 28px; border-top: 1px solid var(--mist); margin-top: clamp(40px, 5vw, 64px); }
'''

page('guide-parking.html', '주차 및 화물 반입 안내 · 이씀', park_css, '''
<div class="wrap">
  <nav class="crumb" aria-label="현재 위치"><a href="guide.html">이용 안내</a><span aria-hidden="true">/</span><span aria-current="page">주차 및 화물 반입 안내</span></nav>
  <section class="page-head" aria-labelledby="park-title">
    <p class="hl">01 · 도착 및 출입</p>
    <h1 id="park-title">주차 및 화물 반입 안내</h1>
    <p class="lead">기계식 주차장 규격과 이용 방법, 인근 주차장과 화물 하차 공간을 안내합니다.</p>
  </section>
  <article class="doc">
    <h2><span class="sqn">A</span>주차 안내</h2>
    <ul class="items">
      <li>대관 시 건물 뒷편 기계식 주차장에 기본 5대까지 주차 가능합니다.</li>
      <li>단, 규격 제한으로 인해 SUV 등 일부 대형 · RV 차량은 입고가 불가한 점 양해 부탁드립니다.</li>
    </ul>
    <div class="spec" role="list" aria-label="기계식 주차장 입고 가능 규격">
      <div role="listitem"><span>전장(길이)</span><b>5,100mm</b><small>이하</small></div>
      <div role="listitem"><span>전폭(타이어폭 기준)</span><b>2,100mm</b><small>이하</small></div>
      <div role="listitem"><span>전고(높이)</span><b>1,550mm</b><small>이하</small></div>
      <div role="listitem"><span>중량</span><b>1,850kg</b><small>이하</small></div>
    </div>
    <figure class="fig"><img src="img/parking-01.jpg" alt="제어반과 규격 제한 안내판이 붙어 있는 건물 뒷편 기계식 주차장 입구" loading="lazy"><figcaption>제어반과 규격 제한 안내판이 붙어 있는 건물 뒷편 기계식 주차장 입구</figcaption></figure>
    <ul class="items">
      <li>야간(19:30 이후) 및 주말 · 공휴일에는 기계식 주차장 입고 대신 주차장의 빈 공간을 이용할 수 있습니다.</li>
      <li><b>기존 차량 출차</b> — 기계식 주차장에 이미 입고된 차량의 출차는 이용자가 직접 수동으로 조작하셔야 합니다.</li>
    </ul>
    <a class="sublink" href="https://www.isseum.com/guide/parking/manual" target="_blank" rel="noopener"><div><b>수동 출차 조작 방법</b><span>제어반 조작을 사진과 함께 단계별로 안내합니다. (현재 사이트, 새 창)</span></div><span class="ga" aria-hidden="true">↗</span></a>

    <h2><span class="sqn">B</span>인근 유료 주차장</h2>
    <p style="color:var(--body)">방문객 차량이 많거나 만차일 경우 인근 주차장을 이용해 주시기 바랍니다.</p>
    <div class="place">
      <h3><a href="https://map.naver.com/p/entry/place/37060270" target="_blank" rel="noopener">경남1 노상 공영 주차장 ↗</a></h3>
      <dl>
        <dt>주소</dt><dd>서울 마포구 서교동 418</dd>
        <dt>요금</dt><dd>5분당 250원 (1시간 3,000원)</dd>
        <dt>운영 시간</dt><dd>월–토 11:00–21:00 (일요일 정기휴무 · 카드 전용 결제)</dd>
        <dt>참고</dt><dd>노상 주차장 특성상 혼잡도가 높아 빈 자리가 없는 경우가 많으니, 이용 시 미리 현장 상황을 확인하시거나 인근 다른 유료 주차장도 함께 고려해 주시기 바랍니다.</dd>
      </dl>
    </div>

    <h2><span class="sqn">C</span>화물 및 장비 반입</h2>
    <ul class="items">
      <li>무거운 짐이나 대형 장비를 반입하실 경우, 건물 1층 정문 옆 임시 주차 공간에서 짐을 내리면 좀 더 원활하게 이동할 수 있습니다. 짐을 모두 내린 후 차량은 다른 곳으로 이동 부탁드립니다.</li>
      <li>바닥 스크래치 방지를 위해 무거운 짐은 끌지 말고 들어서 운반해 주시기를 부탁드립니다.</li>
    </ul>
    <p class="note">해당 공간은 짐을 내리기 위한 장소로 임시 정차는 가능하나 계속 주차는 어렵습니다.</p>
    <figure class="fig"><img src="img/parking-10.jpg" alt="건물 1층 정문 옆, 붉은 타원으로 표시된 화물 하차용 임시 정차 공간" loading="lazy"><figcaption>건물 1층 정문 옆, 붉은 타원으로 표시된 화물 하차용 임시 정차 공간</figcaption></figure>

    <div class="pager"><a class="btn sm" href="guide.html">← 목차로 돌아가기</a><span class="btn sm" style="opacity:.45" aria-disabled="true">02 출입 방법 →</span></div>
  </article>
</div>
''')
print('built')

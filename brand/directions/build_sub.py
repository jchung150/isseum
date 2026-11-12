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
<div class="wrap" id="top">
  <section class="page-head" aria-labelledby="rules-title">
    <p class="hl">RENTAL POLICY</p>
    <h1 id="rules-title">대관 규정</h1>
    <p class="lead">예약 전 반드시 확인해 주시기 바랍니다. 예약 결제가 완료됨과 동시에 본 이용 규정에 모두 동의하신 것으로 간주됩니다.</p>
    <p class="chip">최종 개정 2026. 10. 24.</p>
  </section>
  <div class="rules-grid">
    <nav aria-label="규정 목차"><ol class="rtoc">{"".join(toc)}</ol></nav>
    <div>
      {"".join(secs)}
      <div class="rules-cta"><a class="btn pri" href="https://talk.naver.com/ct/wxgdt7v" target="_blank" rel="noopener">네이버 톡톡으로 문의</a><a class="btn" href="https://pf.kakao.com/_ZGxomX/chat" target="_blank" rel="noopener">카카오톡으로 문의</a></div>
      <div class="pager"><a class="btn sm" href="#top"><span aria-hidden="true">↑</span>&nbsp;위로가기</a></div>
    </div>
  </div>
</div>
''')


# ======================= 이용 안내 (전체, guide.ts에서 생성) =======================
import json, html as H

GJ = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gx', 'guide.json')
groups_g = json.load(open(GJ, encoding='utf-8'))


def esc(t):
    return H.escape(t, quote=False)


def lab(l):
    return (l or '').rstrip().rstrip('—').rstrip()


def img_url(src):
    return 'img/guide/' + src.replace('/', '-')


def shot(sh, cls='fig'):
    cap = sh.get('caption') or sh['alt']
    if sh.get('src'):
        return f'<figure class="{cls}"><img src="{img_url(sh["src"])}" alt="{H.escape(sh["alt"])}" loading="lazy"><figcaption>{esc(cap)}</figcaption></figure>'
    return f'<figure class="{cls}"><div class="hatch" role="img" aria-label="{H.escape(sh["alt"])}">사진 준비 중</div><figcaption>사진 준비 중 — {esc(cap)}</figcaption></figure>'


def line(it):
    t = esc(it['text'])
    if it.get('href'):
        t = f'<a class="ilink" href="{H.escape(it["href"])}" target="_blank" rel="noopener">{t} ↗</a>'
    out = (f'<b>{esc(lab(it["label"]))}</b> — ' if it.get('label') else '') + t
    if it.get('details'):
        out += '<ul class="sub">' + ''.join(f'<li>{esc(d)}</li>' for d in it['details']) + '</ul>'
    if it.get('shots'):
        out += '<div class="shots">' + ''.join(shot(x, 'fig sm') for x in it['shots']) + '</div>'
    return out


def blocks_html(blocks, page_file):
    out, h = [], 0
    for b in blocks:
        k = b['kind']
        if k == 'heading':
            h += 1
            out.append(f'<h2><span class="sqn">{chr(64 + h)}</span>{esc(b["text"])}</h2>')
        elif k == 'text':
            out.append(f'<p class="txt">{esc(b["body"])}</p>')
        elif k == 'bullets':
            out.append('<ul class="items">' + ''.join(f'<li>{line(i)}</li>' for i in b['items']) + '</ul>')
        elif k == 'steps':
            out.append('<ol class="gsteps">' + ''.join(
                f'<li><span class="sqn sm">{n:02d}</span><div>{line(i)}</div></li>' for n, i in enumerate(b['items'], 1)) + '</ol>')
        elif k == 'note':
            t = f'<b>{esc(b["title"])}</b>' if b.get('title') else ''
            out.append('<div class="note">' + t + ''.join(f'<p>{esc(x)}</p>' for x in b['body']) + '</div>')
        elif k == 'figure':
            out.append(shot(b))
        elif k == 'link':
            dl = ''.join(f'<dt>{esc(lab(l.get("label")))}</dt><dd>{esc(l["text"])}</dd>' for l in b['lines'])
            out.append(f'<div class="place"><h3><a href="{H.escape(b["href"])}" target="_blank" rel="noopener">{esc(b["label"])} ↗</a></h3><dl>{dl}</dl></div>')
        elif k == 'pagelink':
            target = page_file.replace('.html', f'-{b["to"]}.html')
            out.append(f'<a class="sublink" href="{target}"><div><b>{esc(b["label"])}</b><span>{esc(b["note"])}</span></div><span class="ga" aria-hidden="true">→</span></a>')
        elif k == 'checklist':
            out.append('<ul class="check">' + ''.join(
                f'<li><label><input type="checkbox"><span class="box" aria-hidden="true"></span>{esc(x)}</label></li>' for x in b['items']) + '</ul>')
        else:
            raise SystemExit('unknown block ' + k)
    return ''.join(out)


doc_css = park_css_common = '''
.doc { display: grid; grid-template-columns: minmax(0, 1fr); max-width: 820px; padding-bottom: var(--space); }
.doc > * + * { margin-top: 18px; }
.doc h2 { font-size: clamp(24px, 2.6vw, 32px); font-weight: 900; letter-spacing: -0.05em; margin-top: clamp(40px, 5vw, 64px); padding-bottom: 14px; border-bottom: 2px solid var(--ink); display: flex; gap: 14px; align-items: center; }
.doc h2:first-child { margin-top: 0; }
.doc h2 .sqn { width: 40px; height: 40px; border-width: 7px; font-size: 12px; }
.sqn.sm { width: 36px; height: 36px; border-width: 6px; font-size: 11px; }
.txt { color: var(--body); }
.items .sub { list-style: none; padding: 8px 0 0; display: grid; gap: 4px; }
.items .sub li { padding-left: 14px; position: relative; font-size: 15px; }
.items .sub li::before { content: ""; position: absolute; left: 0; top: .75em; width: 6px; height: 2px; background: var(--muted); }
.ilink { color: var(--cobalt); font-weight: 700; }
.gsteps { list-style: none; padding: 0; display: grid; gap: 22px; }
.gsteps > li { display: flex; gap: 16px; align-items: flex-start; color: var(--body); }
.gsteps > li > div { min-width: 0; flex: 1; padding-top: 4px; }
.gsteps b { color: var(--ink); }
.shots { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 12px; }
.fig { margin: 8px 0 0; }
.fig img { width: auto; max-width: 100%; max-height: 640px; border-radius: var(--r-photo); }
.fig.sm img { max-height: 360px; border-radius: 16px; }
.fig figcaption { font-size: 14px; color: var(--muted); margin-top: 10px; }
.hatch { aspect-ratio: 4 / 3; max-width: 520px; border-radius: var(--r-card); display: grid; place-items: center; font-size: 14px; color: var(--muted); background: repeating-linear-gradient(-31deg, var(--mist) 0 10px, var(--paper) 10px 20px); }
.sublink { display: flex; justify-content: space-between; align-items: center; gap: 16px; background: var(--lime); border-radius: var(--r-card); padding: 22px 24px; }
.sublink b { display: block; font-size: 19px; font-weight: 900; letter-spacing: -0.04em; }
.sublink span { font-size: 14.5px; color: var(--body); }
.sublink .ga { font-size: 22px; color: var(--cobalt); }
.sublink:hover { background: var(--cobalt); color: var(--paper); }
.sublink:hover span, .sublink:hover .ga { color: var(--paper); }
.place { background: var(--paper); border-radius: var(--r-card); padding: 24px; display: grid; gap: 14px; }
.place h3 { font-size: 19px; font-weight: 900; letter-spacing: -0.04em; }
.place h3 a { color: var(--cobalt); }
.place dl { display: grid; grid-template-columns: max-content 1fr; gap: 6px 18px; font-size: 15px; }
.place dt { color: var(--muted); }
.place dd { margin: 0; }
.note { border-left: 6px solid var(--cobalt); background: var(--paper); border-radius: 0 16px 16px 0; padding: 16px 20px; font-size: 15px; display: grid; gap: 6px; }
.check { list-style: none; padding: 0; display: grid; gap: 10px; }
.check label { display: flex; gap: 14px; align-items: flex-start; background: var(--paper); border-radius: 16px; padding: 16px 18px; cursor: pointer; }
.check input { position: absolute; opacity: 0; }
.check .box { flex: none; width: 24px; height: 24px; border: 5px solid var(--cobalt); margin-top: 2px; }
.check input:checked + .box { background: var(--cobalt); box-shadow: inset 0 0 0 3px var(--paper); }
.check input:focus-visible + .box { outline: 3px solid var(--cobalt); outline-offset: 3px; }
.pager { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding-top: 28px; border-top: 1px solid var(--mist); margin-top: clamp(40px, 5vw, 64px) !important; }
'''

flat = []  # (file, page, group_title, number)
num = 0
for g in groups_g:
    for p in g['pages']:
        num += 1
        flat.append((f'guide-{p["slug"]}.html', p, g['title'], num))

for i, (fname, p, gtitle, n) in enumerate(flat):
    prev_ = flat[i - 1] if i > 0 else None
    next_ = flat[i + 1] if i + 1 < len(flat) else None
    pager = ('<div class="pager"><a class="btn sm pri" href="guide.html"><span aria-hidden="true">←</span>&nbsp;목록으로</a><div class="pn">'
             + (f'<a class="btn sm" href="{prev_[0]}">← {prev_[3]:02d} {esc(prev_[1]["title"])}</a>' if prev_ else '')
             + (f'<a class="btn sm" href="{next_[0]}">{next_[3]:02d} {esc(next_[1]["title"])} →</a>' if next_ else '') + '</div></div>')
    page(fname, f'{p["title"]} · 이씀', doc_css, f'''
<div class="wrap">
  <nav class="crumb" aria-label="현재 위치"><a href="guide.html">이용 안내</a><span aria-hidden="true">/</span><span aria-current="page">{esc(p["title"])}</span><a class="back" href="guide.html"><span aria-hidden="true">←</span> 목록으로</a></nav>
  <section class="page-head"><p class="hl">{n:02d} · {esc(gtitle)}</p><h1>{esc(p["title"])}</h1><p class="lead">{esc(p["summary"])}</p></section>
  <article class="doc">{blocks_html(p["blocks"], fname)}{pager}</article>
</div>
''')
    for c in p.get('children') or []:
        cname = fname.replace('.html', f'-{c["slug"]}.html')
        page(cname, f'{c["title"]} · 이씀', doc_css, f'''
<div class="wrap">
  <nav class="crumb" aria-label="현재 위치"><a href="guide.html">이용 안내</a><span aria-hidden="true">/</span><a href="{fname}">{esc(p["title"])}</a><span aria-hidden="true">/</span><span aria-current="page">{esc(c["title"])}</span><a class="back" href="{fname}"><span aria-hidden="true">←</span> 목록으로</a></nav>
  <section class="page-head"><p class="hl">{n:02d} · {esc(p["title"])}</p><h1>{esc(c["title"])}</h1><p class="lead">{esc(c["summary"])}</p></section>
  <article class="doc">{blocks_html(c["blocks"], cname)}<div class="pager"><a class="btn sm pri" href="{fname}"><span aria-hidden="true">←</span>&nbsp;목록으로</a><div class="pn"><a class="btn sm" href="guide.html">목차로 돌아가기 →</a></div></div></article>
</div>
''')

# 목차
cols, k = [], 0
for gi, g in enumerate(groups_g):
    items = []
    for p in g['pages']:
        k += 1
        items.append(f'<li><a class="gl" href="guide-{p["slug"]}.html"><span class="gn">{k:02d}</span><span class="gt">{esc(p["title"])}</span><span class="ga" aria-hidden="true">→</span></a></li>')
    cols.append(f'<section class="gcol"><p class="gstep">{gi + 1}</p><h2>{esc(g["title"])}</h2><ul>{"".join(items)}</ul></section>')

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
'''
page('guide.html', '이용 안내 · 이씀', guide_css, f'''
<div class="wrap">
  <nav class="crumb" aria-label="현재 위치"><span aria-current="page">이용 안내</span><a class="back" href="./"><span aria-hidden="true">←</span> 목록으로</a></nav>
  <section class="page-head" aria-labelledby="guide-title">
    <p class="hl">GUIDE</p>
    <h1 id="guide-title">이용 안내</h1>
    <p class="lead">출입과 동선부터 기기 사용법과 퇴실 정리까지, 공간을 이용하시는 데 필요한 안내를 사진과 함께 담았습니다.</p>
  </section>
  <div class="gflow">{"".join(cols)}</div>
  <div class="pager" style="padding-bottom:var(--space)"><a class="btn sm" href="./"><span aria-hidden="true">←</span>&nbsp;목록으로</a></div>
</div>
''')
print('guide pages:', len(flat), '+ children')

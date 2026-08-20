/**
 * 이씀 대관 예약 신청 — Google Sheets 수신 스크립트
 *
 * Cloudflare Worker가 이 웹앱으로 POST하면 시트에 한 행을 추가하고,
 * 서명 이미지는 드라이브에 저장한 뒤 링크를 함께 기록합니다.
 *
 * 설치 방법은 같은 폴더의 README.md 참고.
 *
 * 보안: 웹앱 URL은 공개되므로(Anyone 접근 필요) 요청 본문의 secret 값이
 * 유일한 방어선입니다. Script Properties의 SHARED_SECRET과 일치해야만 기록합니다.
 */

/** 시트 첫 행. 순서를 바꾸면 기존 데이터와 어긋나니 뒤에만 추가하세요. */
var HEADERS = [
  '접수 일시',
  '성함',
  '소속',
  '전화번호',
  '이메일',
  '대관 날짜',
  '시작',
  '종료',
  '시간',
  '총 인원',
  '대관 설명',
  '유입 경로',
  '추가 옵션',
  '요청 사항',
  '규정 동의',
  '개인정보 동의',
  '서명',
  'IP',
  'User-Agent',
];

var SIGNATURE_FOLDER = '이씀 대관 신청 서명';

/**
 * 최초 1회 실행하세요. 헤더를 만들고 공유 시크릿을 생성합니다.
 * 실행 후 로그에 찍힌 시크릿을 Worker에 등록하면 됩니다.
 */
function setup() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  var props = PropertiesService.getScriptProperties();
  var secret = props.getProperty('SHARED_SECRET');
  if (!secret) {
    secret = Utilities.getUuid() + Utilities.getUuid().replace(/-/g, '');
    props.setProperty('SHARED_SECRET', secret);
  }

  Logger.log('SHARED_SECRET = ' + secret);
  Logger.log('이 값을 Worker에 SHEET_SECRET 으로 등록하세요.');
  return secret;
}

/** Worker가 호출하는 엔드포인트. */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json({ ok: false, error: 'empty body' });
    }

    var payload = JSON.parse(e.postData.contents);

    var expected = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
    if (!expected || payload.secret !== expected) {
      return json({ ok: false, error: 'unauthorized' });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var d = payload.data || {};
    var signatureUrl = saveSignature(d.signatureImage, d.name, d.date);

    sheet.appendRow([
      formatNow(),
      text(d.name),
      text(d.org),
      text(d.phone),
      text(d.email),
      text(d.date),
      text(d.start),
      text(d.end),
      d.hours ? d.hours + '시간' : '',
      text(d.guests),
      text(d.purpose),
      list(d.referral),
      list(d.addons),
      text(d.requests),
      d.agreeRules ? '동의' : '',
      d.agreePrivacy ? '동의' : '',
      signatureUrl,
      text(d.ip),
      text(d.userAgent),
    ]);

    return json({ ok: true, row: sheet.getLastRow() });
  } catch (err) {
    // The Worker treats a non-ok response as "sheet failed" and still sends the
    // notification email, so a throw here never loses the enquiry.
    return json({ ok: false, error: String(err) });
  }
}

/**
 * data:image/png;base64,... 를 드라이브에 저장하고 열람 URL을 돌려줍니다.
 * 서명이 없으면 빈 문자열.
 */
function saveSignature(dataUrl, name, date) {
  if (!dataUrl || dataUrl.indexOf('base64,') === -1) return '';

  var base64 = dataUrl.substring(dataUrl.indexOf('base64,') + 7);
  var bytes = Utilities.base64Decode(base64);
  var safeName = String(name || 'unknown').replace(/[\\/:*?"<>|]/g, '');
  var filename = (date || formatDateOnly()) + '_' + safeName + '.png';
  var blob = Utilities.newBlob(bytes, 'image/png', filename);

  return getFolder().createFile(blob).getUrl();
}

/** 서명 폴더를 찾거나 없으면 만듭니다. 파일은 시트 소유자만 볼 수 있습니다. */
function getFolder() {
  var it = DriveApp.getFoldersByName(SIGNATURE_FOLDER);
  return it.hasNext() ? it.next() : DriveApp.createFolder(SIGNATURE_FOLDER);
}

/* ---------- helpers ---------- */

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function text(v) {
  return v === undefined || v === null ? '' : String(v);
}

function list(v) {
  if (!v) return '';
  return Array.isArray(v) ? v.join(' · ') : String(v);
}

function tz() {
  return SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone() || 'Asia/Seoul';
}

function formatNow() {
  return Utilities.formatDate(new Date(), tz(), 'yyyy-MM-dd HH:mm:ss');
}

function formatDateOnly() {
  return Utilities.formatDate(new Date(), tz(), 'yyyy-MM-dd');
}

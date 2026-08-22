/**
 * 대관 예약 신청 접수 엔드포인트.
 *
 * The only on-demand route on the site; everything else is prerendered.
 *
 * Order matters: Turnstile → email → sheet. The email is the safety net, so a
 * Google outage or a broken Apps Script deployment can never lose an enquiry.
 * The sheet write is best-effort and its failure is reported but not fatal.
 *
 * Secrets (wrangler secret put):
 *   TURNSTILE_SECRET   Turnstile secret key
 *   SHEET_WEBHOOK_URL  Apps Script web app /exec URL
 *   SHEET_SECRET       SHARED_SECRET printed by the Apps Script setup()
 * Vars (wrangler.jsonc):
 *   NOTIFY_TO, NOTIFY_FROM
 */

import type { APIRoute } from 'astro';
import { EmailMessage } from 'cloudflare:email';
import { env } from 'cloudflare:workers';
import { createMimeMessage } from 'mimetext';
import { MAX_GUESTS, MIN_HOURS } from '../../data/booking';

export const prerender = false;

type Payload = Record<string, unknown>;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const arr = (v: unknown) => (Array.isArray(v) ? v.map(String) : []);
const hourOf = (v: string) => Number(v.split(':')[0]);

/** Server-side validation. The client checks the same things; this is the one that counts. */
function validate(d: Payload): string | null {
  const required: [string, string][] = [
    ['name', '성함'],
    ['phone', '전화번호'],
    ['email', '이메일'],
    ['date', '대관 날짜'],
    ['start', '시작 시간'],
    ['end', '종료 시간'],
    ['purpose', '대관 설명'],
  ];
  for (const [key, label] of required) {
    if (!str(d[key])) return `${label}을(를) 입력해 주세요.`;
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(str(d.email))) return '이메일 형식을 확인해 주세요.';

  const hours = hourOf(str(d.end)) - hourOf(str(d.start));
  if (hours < MIN_HOURS) return `대관은 최소 ${MIN_HOURS}시간부터 신청할 수 있습니다.`;

  const guests = Number(d.guests);
  if (!Number.isFinite(guests) || guests < 1 || guests > MAX_GUESTS) {
    return `총 사용 인원은 1명 이상 ${MAX_GUESTS}명 이하로 입력해 주세요.`;
  }

  if (!arr(d.referral).length) return '유입 경로를 하나 이상 선택해 주세요.';
  if (!d.agreeRules) return '이용 규정에 동의해 주세요.';
  if (!d.agreePrivacy) return '개인정보 수집·이용에 동의해 주세요.';

  return null;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = (env as any).TURNSTILE_SECRET as string | undefined;
  if (!secret) return false;

  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

function buildEmailBody(d: Payload, hours: number, ip: string) {
  const rows: [string, string][] = [
    ['성함', str(d.name)],
    ['소속', str(d.org) || '—'],
    ['전화번호', str(d.phone)],
    ['이메일', str(d.email)],
    ['대관 날짜', str(d.date)],
    ['대관 시간', `${str(d.start)} ~ ${str(d.end)} (${hours}시간)`],
    ['총 사용 인원', `${str(d.guests)}명`],
    ['대관 설명', str(d.purpose)],
    ['유입 경로', arr(d.referral).join(' · ') || '—'],
    ['추가 옵션', arr(d.addons).join(' · ') || '선택 없음'],
    ['요청 사항', str(d.requests) || '—'],
    ['규정 동의', d.agreeRules ? '동의' : '미동의'],
    ['개인정보 동의', d.agreePrivacy ? '동의' : '미동의'],
    ['접수 IP', ip || '—'],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
${rows
  .map(
    ([k, v]) =>
      `<tr><th align="left" style="color:#8a8a7e;font-weight:600;white-space:nowrap;vertical-align:top">${k}</th><td>${escapeHtml(
        v
      ).replace(/\n/g, '<br>')}</td></tr>`
  )
  .join('\n')}
</table>`;

  return { text, html };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return json({ ok: false, error: '요청을 이해하지 못했습니다.' }, 400);
  }

  // Honeypot: bots fill it, humans can't see it. Answer 200 so they don't retune.
  if (str(payload.company_website)) return json({ ok: true });

  const ip = request.headers.get('CF-Connecting-IP') ?? clientAddress ?? '';

  const passed = await verifyTurnstile(str(payload['cf-turnstile-response']), ip);
  if (!passed) {
    return json({ ok: false, error: '보안 확인에 실패했습니다. 새로고침 후 다시 시도해 주세요.' }, 400);
  }

  const problem = validate(payload);
  if (problem) return json({ ok: false, error: problem }, 400);

  const hours = hourOf(str(payload.end)) - hourOf(str(payload.start));
  const { text, html } = buildEmailBody(payload, hours, ip);

  /* ---- 1. Email first: this is the record that must not be lost. ---- */
  try {
    const to = ((env as any).NOTIFY_TO as string) || 'isseumspace@gmail.com';
    const from = ((env as any).NOTIFY_FROM as string) || 'no-reply@isseum.com';

    const msg = createMimeMessage();
    msg.setSender({ name: '이씀 예약 신청', addr: from });
    msg.setRecipient(to);
    msg.setSubject(`[대관 신청] ${str(payload.date)} ${str(payload.name)} (${str(payload.guests)}명)`);
    msg.addMessage({ contentType: 'text/plain', data: text });
    msg.addMessage({ contentType: 'text/html', data: html });


    await (env as any).NOTIFY_EMAIL.send(new EmailMessage(from, to, msg.asRaw()));
  } catch (err) {
    // Nothing else has run yet, so tell the visitor to use another channel
    // rather than pretending we received it.
    console.error('email failed', err);
    return json(
      {
        ok: false,
        error: '접수 처리 중 문제가 발생했습니다. 010-6899-4417 또는 isseumspace@gmail.com으로 연락해 주세요.',
      },
      500
    );
  }

  /* ---- 2. Sheet second: convenience mirror, best-effort. ---- */
  let sheetOk = false;
  try {
    const url = (env as any).SHEET_WEBHOOK_URL as string | undefined;
    const secret = (env as any).SHEET_SECRET as string | undefined;
    if (url && secret) {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        // Apps Script answers /exec with a redirect to script.googleusercontent.com.
        redirect: 'follow',
        body: JSON.stringify({
          secret,
          data: {
            name: str(payload.name),
            org: str(payload.org),
            phone: str(payload.phone),
            email: str(payload.email),
            date: str(payload.date),
            start: str(payload.start),
            end: str(payload.end),
            hours,
            guests: str(payload.guests),
            purpose: str(payload.purpose),
            referral: arr(payload.referral),
            addons: arr(payload.addons),
            requests: str(payload.requests),
            agreeRules: Boolean(payload.agreeRules),
            agreePrivacy: Boolean(payload.agreePrivacy),
            ip,
            userAgent: request.headers.get('user-agent') ?? '',
          },
        }),
      });
      sheetOk = res.ok;
    }
  } catch (err) {
    console.error('sheet failed', err);
  }

  // The visitor succeeded either way — the enquiry is in the owner's inbox.
  return json({ ok: true, sheet: sheetOk });
};

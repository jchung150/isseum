/**
 * Minimal declarations for the two Cloudflare runtime modules the booking
 * endpoint imports.
 *
 * Deliberately NOT `wrangler types` / @cloudflare/workers-types: those declare
 * the full Workers runtime globally, which redefines DOM types (Element.remove
 * returns Element there, void in the DOM) and breaks every client-side
 * <script> in the project. Narrow declarations keep the two worlds apart.
 */

declare module 'cloudflare:workers' {
  export const env: Record<string, unknown> & {
    NOTIFY_EMAIL?: { send(message: unknown): Promise<void> };
    NOTIFY_TO?: string;
    NOTIFY_FROM?: string;
    TURNSTILE_SECRET?: string;
    SHEET_WEBHOOK_URL?: string;
    SHEET_SECRET?: string;
  };
}

declare module 'cloudflare:email' {
  export class EmailMessage {
    constructor(from: string, to: string, raw: string);
  }
}

import crypto from "crypto";

/**
 * Meta Conversions API (server-side) client.
 *
 * This module must only ever be imported from server code — it reads the
 * access token, and it is the only place raw PII is turned into the SHA-256
 * hashes Meta expects. Plain email addresses and phone numbers never leave
 * this server.
 */

const GRAPH_VERSION = process.env.META_GRAPH_API_VERSION || "v26.0";
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE;

/** Country code prepended to local phone numbers that omit one (UAE). */
const DEFAULT_COUNTRY_CODE = process.env.META_DEFAULT_COUNTRY_CODE || "971";

/**
 * Allowlist of events the public endpoint will forward. Anything else is
 * rejected, so the route cannot be used to inject arbitrary events into the
 * dataset.
 */
export const TRACKABLE_EVENTS = [
  "PageView",
  "Lead",
  "Contact",
  "Subscribe",
  "ViewContent",
] as const;

export type TrackableEvent = (typeof TRACKABLE_EVENTS)[number];

export function isTrackableEvent(value: unknown): value is TrackableEvent {
  return typeof value === "string" && (TRACKABLE_EVENTS as readonly string[]).includes(value);
}

export interface CapiUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  clientIp?: string;
  userAgent?: string;
  fbc?: string;
  fbp?: string;
}

export interface CapiEventInput {
  eventName: TrackableEvent;
  eventId: string;
  eventSourceUrl?: string;
  userData: CapiUserData;
  customData?: Record<string, unknown>;
}

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

/** Meta expects lowercase, trimmed values before hashing. */
function hashText(value?: string): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  return normalized ? sha256(normalized) : undefined;
}

/** Names are stripped to letters so "Al-Rashid" and "al rashid" match. */
function hashName(value?: string): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase().replace(/[^a-zÀ-ɏ]/g, "");
  return normalized ? sha256(normalized) : undefined;
}

/**
 * Meta wants digits only, in E.164 order and including the country code.
 * Local UAE numbers ("050 123 4567", "+971 52 414 5668") both normalise to a
 * 971-prefixed string so they match the same person.
 */
function hashPhone(value?: string): string | undefined {
  if (!value) return undefined;
  let digits = value.replace(/\D/g, "");
  if (!digits) return undefined;
  if (value.trim().startsWith("+")) {
    // Already international — take it as given.
  } else if (digits.startsWith("00")) {
    digits = digits.slice(2);
  } else if (digits.startsWith("0")) {
    digits = DEFAULT_COUNTRY_CODE + digits.slice(1);
  } else if (!digits.startsWith(DEFAULT_COUNTRY_CODE)) {
    digits = DEFAULT_COUNTRY_CODE + digits;
  }
  return sha256(digits);
}

function buildUserData(user: CapiUserData): Record<string, unknown> {
  const payload: Record<string, unknown> = {};

  const em = hashText(user.email);
  if (em) payload.em = [em];

  const ph = hashPhone(user.phone);
  if (ph) payload.ph = [ph];

  const fn = hashName(user.firstName);
  if (fn) payload.fn = [fn];

  const ln = hashName(user.lastName);
  if (ln) payload.ln = [ln];

  const ct = hashName(user.city);
  if (ct) payload.ct = [ct];

  const country = hashText(user.country);
  if (country) payload.country = [country];

  // These three are sent unhashed by design — Meta uses them for matching.
  if (user.clientIp) payload.client_ip_address = user.clientIp;
  if (user.userAgent) payload.client_user_agent = user.userAgent;
  if (user.fbc) payload.fbc = user.fbc;
  if (user.fbp) payload.fbp = user.fbp;

  return payload;
}

export function isCapiConfigured(): boolean {
  return Boolean(PIXEL_ID && ACCESS_TOKEN);
}

export interface CapiResult {
  ok: boolean;
  /** Present only on failure — logged server-side, never returned to the browser. */
  error?: string;
}

export async function sendCapiEvent(input: CapiEventInput): Promise<CapiResult> {
  if (!isCapiConfigured()) {
    return { ok: false, error: "Missing NEXT_PUBLIC_META_PIXEL_ID or META_CAPI_ACCESS_TOKEN" };
  }

  const event: Record<string, unknown> = {
    event_name: input.eventName,
    event_time: Math.floor(Date.now() / 1000),
    // Shared with the browser pixel so Meta collapses the two into one event.
    event_id: input.eventId,
    action_source: "website",
    user_data: buildUserData(input.userData),
  };

  if (input.eventSourceUrl) event.event_source_url = input.eventSourceUrl;
  if (input.customData && Object.keys(input.customData).length > 0) {
    event.custom_data = input.customData;
  }

  const body: Record<string, unknown> = {
    data: [event],
    // Sent in the body rather than the query string to keep it out of logs.
    access_token: ACCESS_TOKEN,
  };
  if (TEST_EVENT_CODE) body.test_event_code = TEST_EVENT_CODE;

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const detail = await response.text();
      return { ok: false, error: `Meta responded ${response.status}: ${detail.slice(0, 500)}` };
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

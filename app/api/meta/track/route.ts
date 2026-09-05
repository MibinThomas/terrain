import { NextRequest, NextResponse } from "next/server";
import { isCapiConfigured, isTrackableEvent, sendCapiEvent } from "@/lib/meta/capi";

/** Node runtime — the CAPI client uses node:crypto for SHA-256 hashing. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Receives an event from the browser, enriches it with data only the server
 * can see (real client IP, user agent, Meta's _fbc/_fbp cookies), hashes any
 * PII and forwards it to the Conversions API.
 *
 * The browser sends the same event_id to the Pixel, so Meta deduplicates the
 * pair and counts one event even when both paths succeed.
 */
export async function POST(request: NextRequest) {
  // Always answer 200 so a blocked or misconfigured pixel never surfaces as a
  // console error on the site. Failures are logged server-side instead.
  const ok = NextResponse.json({ ok: true });

  if (!isCapiConfigured()) {
    console.warn("[meta-capi] Skipped: NEXT_PUBLIC_META_PIXEL_ID or META_CAPI_ACCESS_TOKEN is not set");
    return ok;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { eventName, eventId, eventSourceUrl, userData, customData } =
    (body ?? {}) as Record<string, any>;

  if (!isTrackableEvent(eventName)) {
    return NextResponse.json({ ok: false, error: "Unsupported event" }, { status: 400 });
  }
  if (typeof eventId !== "string" || !eventId) {
    return NextResponse.json({ ok: false, error: "Missing event id" }, { status: 400 });
  }

  // Vercel puts the real visitor IP first in x-forwarded-for.
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp =
    forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || undefined;

  const result = await sendCapiEvent({
    eventName,
    eventId,
    eventSourceUrl: typeof eventSourceUrl === "string" ? eventSourceUrl : undefined,
    userData: {
      email: userData?.email,
      phone: userData?.phone,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      city: userData?.city,
      country: userData?.country,
      clientIp,
      userAgent: request.headers.get("user-agent") || undefined,
      fbc: request.cookies.get("_fbc")?.value,
      fbp: request.cookies.get("_fbp")?.value,
    },
    customData: customData && typeof customData === "object" ? customData : undefined,
  });

  if (!result.ok) {
    console.error(`[meta-capi] ${eventName} failed:`, result.error);
  }

  return ok;
}

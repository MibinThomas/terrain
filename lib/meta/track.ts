"use client";

import type { TrackableEvent } from "@/lib/meta/capi";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export interface TrackOptions {
  /** Plain values — hashed on the server before they reach Meta. */
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    country?: string;
  };
  customData?: Record<string, unknown>;
}

function createEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Fires one conversion down both paths — the browser Pixel and the server-side
 * Conversions API — sharing a single event_id so Meta deduplicates them into
 * one event. If the Pixel is blocked by an ad blocker the server call still
 * lands, which is the whole point of running CAPI alongside it.
 *
 * Never throws: analytics must not be able to break a form submission.
 */
export function trackMeta(eventName: TrackableEvent, options: TrackOptions = {}): void {
  const eventId = createEventId();

  try {
    window.fbq?.("track", eventName, options.customData ?? {}, { eventID: eventId });
  } catch {
    // Pixel unavailable or blocked — the server call below still records it.
  }

  try {
    void fetch("/api/meta/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl: window.location.href,
        userData: options.userData,
        customData: options.customData,
      }),
      // Survives the page being navigated away from immediately after the call.
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Ignore — tracking is best-effort.
  }
}

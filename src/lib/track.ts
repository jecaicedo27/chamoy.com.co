"use client";

type EventMeta = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(type: string, meta: EventMeta = {}) {
  try {
    const payload = JSON.stringify({
      type,
      path: window.location.pathname,
      meta
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/events/", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/events/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true
      }).catch(() => {});
    }

    window.gtag?.("event", type, meta);
  } catch {
    // tracking must never break the page
  }
}

"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

export function AnalyticsListener() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.("a[href*='wa.me']") as HTMLAnchorElement | null;
      if (!link) return;

      track("whatsapp_click", {
        label: (link.dataset.cta || link.textContent || "").trim().slice(0, 80)
      });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

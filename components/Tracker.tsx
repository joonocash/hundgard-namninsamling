"use client";

import { useEffect } from "react";

export default function Tracker() {
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "pageview" }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}

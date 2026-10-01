"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Img = { src: string; alt: string };

const clamp = (v: number) => Math.min(100, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Hint animation: nudge the handle left, right and back to the middle once,
// so visitors see the image can be dragged.
const HINT_STOPS = [50, 30, 70, 50];
const HINT_SEGMENT_MS = 650;
const HINT_DELAY_MS = 500;

export default function BeforeAfterSlider({ before, after }: { before: Img; after: Img }) {
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchedRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gesture = useRef<{ id: number; x: number; y: number; dragging: boolean } | null>(null);

  function stopHint() {
    touchedRef.current = true;
    setTouched(true);
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    if (timerRef.current !== null) clearTimeout(timerRef.current);
  }

  function posFromClientX(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return 50;
    return clamp(((clientX - rect.left) / rect.width) * 100);
  }

  // Play the hint once, the first time the slider is mostly in view.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function play() {
      const start = performance.now();
      const total = HINT_SEGMENT_MS * (HINT_STOPS.length - 1);
      const step = (now: number) => {
        if (touchedRef.current) return;
        const elapsed = Math.min(now - start, total);
        const seg = Math.min(Math.floor(elapsed / HINT_SEGMENT_MS), HINT_STOPS.length - 2);
        const t = easeInOut((elapsed - seg * HINT_SEGMENT_MS) / HINT_SEGMENT_MS);
        setPos(HINT_STOPS[seg] + (HINT_STOPS[seg + 1] - HINT_STOPS[seg]) * t);
        if (elapsed < total) frameRef.current = requestAnimationFrame(step);
      };
      frameRef.current = requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !touchedRef.current) {
          observer.disconnect();
          timerRef.current = setTimeout(play, HINT_DELAY_MS);
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  // Mouse drags right away. On touch we wait to see the direction: sideways
  // moves the slider, up/down is left to the browser so the page still scrolls.
  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    gesture.current = { id: e.pointerId, x: e.clientX, y: e.clientY, dragging: e.pointerType === "mouse" };
    if (e.pointerType === "mouse") {
      stopHint();
      e.currentTarget.setPointerCapture(e.pointerId);
      setPos(posFromClientX(e.clientX));
    }
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    if (!g.dragging) {
      const dx = Math.abs(e.clientX - g.x);
      const dy = Math.abs(e.clientY - g.y);
      if (dx < 6 || dx < dy) return;
      g.dragging = true;
      stopHint();
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    setPos(posFromClientX(e.clientX));
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const g = gesture.current;
    if (g && g.id === e.pointerId && !g.dragging) {
      // A plain tap moves the handle to where you tapped.
      stopHint();
      setPos(posFromClientX(e.clientX));
    }
    gesture.current = null;
  }

  return (
    <figure className="m-0">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (gesture.current = null)}
        className="relative aspect-[4/3] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-3xl bg-line"
      >
        <Image
          src={after.src}
          alt={after.alt}
          fill
          priority
          draggable={false}
          sizes="(min-width: 480px) 440px, 100vw"
          className="pointer-events-none object-cover"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image
            src={before.src}
            alt={before.alt}
            fill
            priority
            draggable={false}
            sizes="(min-width: 480px) 440px, 100vw"
            className="pointer-events-none object-cover"
          />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[13px] font-bold text-[#14261a]">
          Idag
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-brand px-3 py-1.5 text-[13px] font-bold text-brand-ink">
          Så kan det bli
        </span>

        {/* Keyboard / screen reader control; the handle below shows its focus. */}
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(pos)}
          onChange={(e) => {
            stopHint();
            setPos(Number(e.target.value));
          }}
          aria-label="Jämför platsen idag med hur den kan bli"
          className="peer sr-only"
        />

        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white"
          style={{ left: `${pos}%` }}
        />
        <div
          className="pointer-events-none absolute top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full peer-focus-visible:ring-4 peer-focus-visible:ring-brand"
          style={{ left: `${pos}%` }}
        >
          {!touched && (
            <span className="absolute inset-0 rounded-full bg-white motion-safe:animate-handle-pulse" />
          )}
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-white text-[#1d6b3c] shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-[22px] w-[22px]"
            >
              <path d="M8 7l-5 5 5 5" />
              <path d="M16 7l5 5-5 5" />
            </svg>
          </span>
        </div>
      </div>
      <figcaption className="mt-2.5 flex items-center justify-center gap-1.5 text-sm text-muted">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path d="M8 7l-5 5 5 5" />
          <path d="M16 7l5 5-5 5" />
        </svg>
        Dra i bilden för att jämföra
      </figcaption>
    </figure>
  );
}

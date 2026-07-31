"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ExpandableImage({
  src,
  alt,
  sizes,
  aspectClassName = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  sizes: string;
  aspectClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Visa bilden i fullskärm: ${alt}`}
        className={`relative block w-full cursor-zoom-in ${aspectClassName}`}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-4"
        >
          <div className="relative h-full w-full">
            <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}

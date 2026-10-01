"use client";

export default function CtaButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  function handleClick() {
    // Fire-and-forget: the link must work even if this fails or is slow.
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "click" }),
      keepalive: true,
    }).catch(() => {});
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand px-5 text-base font-bold text-brand-ink transition hover:bg-brand-hover ${className}`}
    >
      {children}
    </a>
  );
}

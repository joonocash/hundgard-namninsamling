"use client";

export default function CtaButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
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
      className="inline-block rounded-full bg-[#e2703a] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-black/30 transition hover:bg-[#c85f2e]"
    >
      {children}
    </a>
  );
}

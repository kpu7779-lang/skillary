"use client";

import { useEffect, useState } from "react";

/**
 * AnimatedBackground
 * ------------------
 * Background system with two modes:
 *
 * 1. Custom media (auto-detected if file exists):
 *    Drop a file at /public/bg/custom-bg.{mp4,webm,gif,jpg,png,webp}
 *    - Video files (mp4/webm/mov) → <video> tag, autoplay+loop+muted+playsInline
 *    - Image files (gif/jpg/png/webp) → <img> tag
 *
 * 2. Pure CSS aurora background (fallback when no media file):
 *    Multi-layer animated aurora + grid + noise
 *
 * Override via URL: ?bg=filename.ext
 */
const CANDIDATE_FILES = [
  "/bg/custom-bg.mp4",
  "/bg/custom-bg.webm",
  "/bg/custom-bg.gif",
  "/bg/custom-bg.jpg",
  "/bg/custom-bg.png",
  "/bg/custom-bg.webp",
];

async function findCustomBg(): Promise<string | null> {
  for (const path of CANDIDATE_FILES) {
    try {
      const r = await fetch(path, { method: "HEAD" });
      if (r.ok) return path;
    } catch {
      /* try next */
    }
  }
  return null;
}

function isVideoFile(path: string): boolean {
  return /\.(mp4|webm|mov|ogg)$/i.test(path);
}

export function AnimatedBackground() {
  const [customBg, setCustomBg] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("bg");
    return fromQuery ? `/bg/${fromQuery}` : null;
  });

  useEffect(() => {
    if (customBg) return;
    let cancelled = false;
    findCustomBg().then((found) => {
      if (!cancelled && found) setCustomBg(found);
    });
    return () => {
      cancelled = true;
    };
  }, [customBg]);

  const usingVideo = customBg && isVideoFile(customBg);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {customBg ? (
        <>
          {/* Custom media background */}
          <div className="absolute inset-0">
            {usingVideo ? (
              <video
                src={customBg}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover opacity-55"
                onError={() => setCustomBg(null)}
              />
            ) : (
              <img
                src={customBg}
                alt=""
                className="h-full w-full object-cover opacity-60"
                onError={() => setCustomBg(null)}
              />
            )}
            {/* Dark overlay to keep text readable */}
            <div className="absolute inset-0 bg-background/55" />
          </div>
        </>
      ) : (
        <>
          {/* Pure CSS aurora background (fallback) */}
          <div className="aurora-base" />
          <div className="aurora-mesh" />
          <div className="aurora-ribbon-top" />
          <div className="aurora-ribbon-bottom" />
          <div className="absolute inset-0 bg-grid-dots" />
          <div className="aurora-noise" />
        </>
      )}

      {/* Vignette — darken edges for focus */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 30%, transparent 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </div>
  );
}

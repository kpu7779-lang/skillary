"use client";

import { useState } from "react";
import { StitchMeshCanvas } from "./StitchMeshCanvas";

/**
 * AnimatedBackground — Stitch / Linear / Vercel 风格动态背景
 * Override via URL: ?bg=filename.ext (file must live in /public/bg/)
 */
function isVideoFile(path: string): boolean {
  return /\.(mp4|webm|mov|ogg)$/i.test(path);
}

export function AnimatedBackground() {
  const [customBg, setCustomBg] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const fromQuery = new URLSearchParams(window.location.search).get("bg");
    return fromQuery ? `/bg/${fromQuery}` : null;
  });

  const usingVideo = customBg && isVideoFile(customBg);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {customBg ? (
        <div className="absolute inset-0">
          {usingVideo ? (
            <video
              src={customBg}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-50"
              onError={() => setCustomBg(null)}
            />
          ) : (
            <img
              src={customBg}
              alt=""
              className="h-full w-full object-cover opacity-55"
              onError={() => setCustomBg(null)}
            />
          )}
          <div className="absolute inset-0 bg-background/60" />
        </div>
      ) : (
        <>
          <div className="stitch-base" />
          <div className="stitch-spotlight" />
          <div className="stitch-aurora stitch-aurora-a" />
          <div className="stitch-aurora stitch-aurora-b" />
          <div className="stitch-aurora stitch-aurora-c" />
          <div className="stitch-aurora stitch-aurora-d" />
          <div className="stitch-aurora stitch-aurora-e" />
          <div className="stitch-beam stitch-beam-left" />
          <div className="stitch-beam stitch-beam-center" />
          <div className="stitch-beam stitch-beam-right" />
          <div className="stitch-horizon-glow" />
          <div className="stitch-mesh-spin" />
          <div className="stitch-perspective-grid" />
          <div className="absolute inset-0 bg-grid-dots" />
          <StitchMeshCanvas />
          <div className="stitch-light-sweep" />
          <div className="stitch-light-sweep stitch-light-sweep-2" />
        </>
      )}

      <div className="stitch-vignette-clear" />
    </div>
  );
}
"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

/**
 * MouseGlow
 * ---------
 * A soft radial glow that follows the cursor across the page.
 * - Uses spring physics for smooth, lagging follow
 * - mix-blend-mode: screen → additive glow on dark backgrounds
 * - pointer-events: none → never blocks interaction
 * - Disabled when user prefers reduced motion
 * - Hidden on touch devices (no hover)
 */
export function MouseGlow() {
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Smooth follow with spring
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.4 });

  const hasHover = useRef(true);

  useEffect(() => {
    if (prefersReduced) return;
    // Detect touch device — skip glow on touch-only
    if (typeof window !== "undefined") {
      const isTouch =
        "ontouchstart" in window && !window.matchMedia("(hover: hover)").matches;
      hasHover.current = !isTouch;
      if (isTouch) return;
    }

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, prefersReduced]);

  if (prefersReduced || !hasHover.current) return null;

  const bg = useMotionTemplate`radial-gradient(420px circle at ${springX}px ${springY}px, rgba(124, 92, 255, 0.10), transparent 65%)`;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30"
      style={{ background: bg, mixBlendMode: "screen" }}
    />
  );
}

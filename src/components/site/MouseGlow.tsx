"use client";

import { useEffect, useRef, useState } from "react";

function glowGradient(x: number, y: number) {
  return `radial-gradient(680px circle at ${x}px ${y}px, rgba(124, 92, 255, 0.22), rgba(45, 212, 191, 0.09) 38%, rgba(168, 85, 247, 0.05) 55%, transparent 72%)`;
}

/**
 * MouseGlow — 鼠标跟随紫青光晕
 * 置于内容层之上、Header 之下，mix-blend-mode: screen 叠加全页
 */
export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Windows 触屏笔记本常把 (hover: hover) 判为 false，桌面端默认启用
    const coarseOnly = window.matchMedia("(pointer: coarse)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    if (coarseOnly && noHover) return;

    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const el = glowRef.current;
    if (!el) return;

    const apply = (x: number, y: number) => {
      el.style.background = glowGradient(x, y);
    };

    apply(window.innerWidth / 2, window.innerHeight / 2);

    const onMove = (e: MouseEvent) => apply(e.clientX, e.clientY);

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[35]"
      style={{ mixBlendMode: "screen", transition: "background 0.06s linear" }}
    />
  );
}
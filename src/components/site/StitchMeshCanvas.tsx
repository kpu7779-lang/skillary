"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
}

/**
 * StitchMeshCanvas — 加强版粒子连线网
 */
export function StitchMeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

    const COUNT = reduced ? 40 : 152;
    const LINK = reduced ? 0 : 192;
    const MOUSE_R = 400;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (reduced ? 0.1 : 0.38),
        vy: (Math.random() - 0.5) * (reduced ? 0.1 : 0.38),
        r: Math.random() * 1.8 + 0.7,
        hue: [258, 195, 280, 220][Math.floor(Math.random() * 4)],
      }));
    }

    function onMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function onLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        if (!reduced) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_R && dist > 1) {
            const force = 0.042 * (1 - dist / MOUSE_R);
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
          p.vx *= 0.988;
          p.vy *= 0.988;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }

      if (!reduced) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < LINK) {
              const t = 1 - d / LINK;
              const alpha = t * t * 0.2;
              const nearMouse =
                Math.hypot(a.x - mx, a.y - my) < MOUSE_R ||
                Math.hypot(b.x - mx, b.y - my) < MOUSE_R;
              ctx.strokeStyle = nearMouse
                ? `rgba(45, 212, 191, ${alpha * 1.25})`
                : `rgba(124, 92, 255, ${alpha})`;
              ctx.lineWidth = nearMouse ? 0.9 : 0.65;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        const t = Date.now() * 0.002;
        const pulseR = 100 + Math.sin(t) * 12;
        const pulse = ctx.createRadialGradient(mx, my, 0, mx, my, pulseR);
        pulse.addColorStop(0, "rgba(124, 92, 255, 0.14)");
        pulse.addColorStop(0.5, "rgba(45, 212, 191, 0.06)");
        pulse.addColorStop(1, "rgba(124, 92, 255, 0)");
        ctx.fillStyle = pulse;
        ctx.beginPath();
        ctx.arc(mx, my, pulseR, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of particles) {
        const near = !reduced && Math.hypot(p.x - mx, p.y - my) < MOUSE_R;
        const glow = p.r * (near ? 2.2 : 1.8);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
        g.addColorStop(0, `hsla(${p.hue}, 85%, 78%, ${near ? 0.72 : 0.55})`);
        g.addColorStop(0.55, `hsla(${p.hue}, 80%, 68%, ${near ? 0.18 : 0.1})`);
        g.addColorStop(1, `hsla(${p.hue}, 75%, 65%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (near ? 1.6 : 1.35), 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    resize();
    seed();
    tick();

    const onResize = () => {
      resize();
      seed();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="stitch-mesh-canvas absolute inset-0 h-full w-full"
    />
  );
}
"use client";

import { PLATFORM_META, type Platform } from "@/lib/skills-data";
import { cn } from "@/lib/utils";

const ICONS: Record<Platform, JSX.Element> = {
  "claude-code": (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <path
        d="M5 19c2-1 3-3 3-6 0-3 1-6 4-6s4 3 4 6c0 3 1 5 3 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7" r="1.4" fill="currentColor" />
    </svg>
  ),
  cursor: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <path d="M4 4l7 16 2-6 6-2L4 4z" fill="currentColor" />
    </svg>
  ),
  codex: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 9l3 3-3 3M13 9l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  qwen: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  glm: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <path d="M12 3v18M5 8l7-5 7 5M5 8v8l7 5 7-5V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  kimi: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
};

export function PlatformBadge({
  platform,
  withLabel = true,
  size = "md",
  className,
}: {
  platform: Platform;
  withLabel?: boolean;
  size?: "sm" | "md";
  className?: string;
}) {
  const meta = PLATFORM_META[platform];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full chip",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        className
      )}
      style={{ color: meta.color }}
      title={meta.label}
    >
      <span className="text-current opacity-90">{ICONS[platform]}</span>
      {withLabel && <span className="text-white/70 font-medium">{meta.label}</span>}
    </span>
  );
}

export function PlatformIcon({ platform, className }: { platform: Platform; className?: string }) {
  return (
    <span
      className={cn("inline-flex h-7 w-7 items-center justify-center rounded-md chip", className)}
      style={{ color: PLATFORM_META[platform].color }}
      title={PLATFORM_META[platform].label}
    >
      {ICONS[platform]}
    </span>
  );
}

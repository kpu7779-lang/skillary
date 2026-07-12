"use client";

import { motion } from "framer-motion";
import {
  Star,
  Download,
  Heart,
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";
import { type Skill, formatCompact, formatRelativeDate } from "@/lib/skills-data";
import { cn } from "@/lib/utils";
import { PlatformBadge } from "./PlatformBadge";
import { useNav } from "@/store/nav";

export function SkillCard({ skill, index = 0 }: { skill: Skill; index?: number }) {
  const goDetail = useNav((s) => s.goDetail);

  return (
    <motion.button
      type="button"
      onClick={() => goDetail(skill.slug)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="group relative w-full text-left glass-card glass-card-hover rounded-2xl p-5 flex flex-col gap-4 overflow-hidden"
    >
      {/* Accent glow on hover */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          "bg-gradient-to-br",
          skill.accent
        )}
        style={{ filter: "blur(28px)", opacity: 0, mixBlendMode: "screen" }}
        aria-hidden
      />

      {/* Header */}
      <div className="relative flex items-start gap-3">
        <div
          className={cn(
            "h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-semibold shadow-lg",
            skill.accent
          )}
        >
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[15px] font-semibold tracking-tight text-white/95 truncate">
              {skill.title}
            </h3>
            <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-white/70 transition-colors shrink-0 mt-0.5" />
          </div>
          <p className="text-[13px] text-white/55 mt-0.5 line-clamp-1">
            {skill.tagline}
          </p>
        </div>
      </div>

      {/* 适合人群 */}
      <div className="text-[11px] text-white/35 -mt-2">
        适合：{skill.audience}
      </div>

      {/* Description */}
      <p className="text-[13px] leading-relaxed text-white/55 line-clamp-2">
        {skill.description}
      </p>

      {/* Platforms */}
      <div className="flex flex-wrap gap-1.5">
        {skill.platforms.slice(0, 4).map((p) => (
          <PlatformBadge key={p} platform={p} withLabel={false} size="sm" />
        ))}
        {skill.platforms.length > 4 && (
          <span className="text-[10px] text-white/40 px-1.5 py-0.5">
            +{skill.platforms.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="relative flex items-center justify-between pt-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 text-[11px] text-white/50">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            <span className="font-medium text-white/70">{skill.rating}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Download className="h-3 w-3" />
            {formatCompact(skill.downloads)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Heart className="h-3 w-3" />
            {formatCompact(skill.favorites)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {skill.price === 0 ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300/90">
              <Check className="h-3 w-3" /> 免费
            </span>
          ) : (
            <span className="text-[11px] font-medium text-white/80">
              ¥{skill.price}
            </span>
          )}
          <span className="text-[10px] text-white/30">· {formatRelativeDate(skill.updatedAt)}</span>
        </div>
      </div>

      {/* Top-right new/trending chip */}
      <div className="absolute top-3 right-3 flex gap-1.5">
        {skill.isNew && (
          <span className="rounded-full bg-white/10 backdrop-blur px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white/80 border border-white/10">
            新
          </span>
        )}
        {skill.trending && (
          <span className="rounded-full bg-gradient-to-r from-violet-500/30 to-cyan-400/30 backdrop-blur px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white/90 border border-white/10">
            热门
          </span>
        )}
      </div>
    </motion.button>
  );
}

"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Palette,
  PenLine,
  GraduationCap,
  Database,
  Heart,
  Briefcase,
  Bot,
  ArrowUp,
  SlidersHorizontal,
} from "lucide-react";
import {
  CATEGORY_META,
  type SkillCategory,
} from "@/lib/skills-data";
import { useNav } from "@/store/nav";
import { cn } from "@/lib/utils";
import { useState } from "react";

const CATEGORY_ICONS: Record<string, JSX.Element> = {
  Code2: <Code2 className="h-4 w-4" />,
  Palette: <Palette className="h-4 w-4" />,
  PenLine: <PenLine className="h-4 w-4" />,
  GraduationCap: <GraduationCap className="h-4 w-4" />,
  Database: <Database className="h-4 w-4" />,
  Heart: <Heart className="h-4 w-4" />,
  Briefcase: <Briefcase className="h-4 w-4" />,
  Bot: <Bot className="h-4 w-4" />,
};

const CATEGORIES: SkillCategory[] = [
  "coding",
  "design",
  "writing",
  "learning",
  "data",
  "lifestyle",
  "office",
  "agent",
];

// Shared animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function HomePage() {
  const { setCategory, category } = useNav();
  const [localQuery, setLocalQuery] = useState("");
  const [searchType, setSearchType] = useState<"all" | "free" | "paid">("all");
  const [sortMode, setSortMode] = useState<"popular" | "newest" | "rating">("popular");

  const prefersReduced = useReducedMotion();

  // Parallax — hero section scroll
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Title drifts up slowly, search panel drifts a bit faster, both fade
  const titleY = useTransform(heroProgress, [0, 1], [0, prefersReduced ? 0 : -60]);
  const titleOpacity = useTransform(heroProgress, [0, 0.8], [1, prefersReduced ? 1 : 0]);
  const panelY = useTransform(heroProgress, [0, 1], [0, prefersReduced ? 0 : -30]);
  const panelOpacity = useTransform(heroProgress, [0, 0.7], [1, prefersReduced ? 1 : 0.3]);

  return (
    <div className="relative">
      {/* ===================== HERO（Stitch 风格 — 紧凑居中，一屏装下）==================== */}
      <section
        ref={heroRef}
        className="relative mx-auto max-w-3xl px-5 sm:px-8 pt-10 sm:pt-16 pb-8 min-h-[78vh] flex flex-col items-center justify-center text-center"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
          }}
          className="flex flex-col items-center w-full"
        >
          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: titleY, opacity: titleOpacity }}
            className="mt-4 text-[32px] sm:text-[44px] leading-[1.1] font-semibold tracking-tight brand-gradient-text"
          >
            AI 技能市场
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2.5 text-[13px] sm:text-[14px] text-white/45 max-w-md leading-relaxed"
          >
            发现、安装、交付 AI 技能 —— 一键即用，无需配置。
          </motion.p>

          {/* 大型搜索面板 — Stitch 风格 */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: panelY, opacity: panelOpacity }}
            className="search-panel rounded-[28px] flex flex-col overflow-hidden mt-6 w-full"
            // Subtle hover lift on the panel
            whileHover={prefersReduced ? undefined : { y: -2 }}
          >
            {/* 输入区 */}
            <div className="flex-1 px-6 pt-5 pb-3 min-h-0">
              <textarea
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                placeholder="搜索技能…"
                className="search-panel-input text-white text-[18px] sm:text-[22px] leading-[1.5] min-h-[80px] max-h-[200px] overflow-y-auto"
                rows={3}
                spellCheck={false}
              />
            </div>

            {/* 底部工具栏 */}
            <div className="shrink-0 px-4 sm:px-5 py-3.5 border-t border-white/[0.05]">
              <div className="flex flex-wrap items-center gap-2 justify-between">
                {/* 左侧 — 类型切换 */}
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center rounded-lg bg-white/[0.04] p-0.5 border border-white/[0.05]">
                    {([
                      { key: "all", label: "全部" },
                      { key: "free", label: "免费" },
                      { key: "paid", label: "付费" },
                    ] as const).map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setSearchType(opt.key)}
                        className={cn(
                          "rounded-[7px] px-3 py-1.5 text-[12px] font-medium transition-all",
                          searchType === opt.key
                            ? "bg-white/[0.10] text-white shadow-sm"
                            : "text-white/45 hover:text-white/70"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 右侧 — 排序 + 发送 */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* 排序下拉 */}
                  <div className="relative group">
                    <select
                      value={sortMode}
                      onChange={(e) => setSortMode(e.target.value as "popular" | "newest" | "rating")}
                      className="appearance-none inline-flex items-center gap-1.5 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[12px] text-white/70 hover:text-white hover:bg-white/[0.06] px-3 pr-7 transition-colors cursor-pointer outline-none"
                    >
                      <option value="popular" className="bg-[#161420]">热门优先</option>
                      <option value="newest" className="bg-[#161420]">最新优先</option>
                      <option value="rating" className="bg-[#161420]">评分优先</option>
                    </select>
                    <SlidersHorizontal className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-white/40 pointer-events-none" />
                  </div>

                  {/* 搜索图标按钮 */}
                  <motion.button
                    type="button"
                    disabled={!localQuery.trim()}
                    whileHover={prefersReduced || !localQuery.trim() ? undefined : { scale: 1.05 }}
                    whileTap={prefersReduced ? undefined : { scale: 0.95 }}
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-lg transition-all shrink-0",
                      localQuery.trim()
                        ? "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10"
                        : "bg-white/[0.06] text-white/25 cursor-not-allowed"
                    )}
                    title="搜索（Ctrl+Enter）"
                  >
                    <ArrowUp className="h-[18px] w-[18px]" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>


        </motion.div>
      </section>

      {/* ===================== CATEGORIES ===================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
        className="mx-auto max-w-7xl px-5 sm:px-8 py-10"
      >
        <SectionHeading
          eyebrow="浏览"
          title="热门分类"
          subtitle="按你想做的事情找，最快。"
        />
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((c, i) => {
            const meta = CATEGORY_META[c];
            const active = category === c;
            return (
              <motion.button
                key={c}
                variants={fadeUp}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={prefersReduced ? undefined : { y: -3, scale: 1.02 }}
                whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                onClick={() => setCategory(active ? null : c)}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all border",
                  active
                    ? "bg-white/10 border-white/20"
                    : "glass-card glass-card-hover"
                )}
              >
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-violet-500/30 to-cyan-400/30 border border-white/10 flex items-center justify-center text-white/90 transition-transform group-hover:scale-110">
                  {CATEGORY_ICONS[meta.icon]}
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-white truncate">{meta.label}</div>
                  <div className="text-[11px] text-white/40">
                    {meta.desc}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}

/* -------------------- helpers -------------------- */

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: React.ReactNode;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={cn(align === "center" ? "text-center max-w-2xl mx-auto" : "text-left")}
    >
      {eyebrow && (
        <div className="text-[11px] font-medium uppercase tracking-wider text-white/40">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-1 text-[24px] sm:text-[30px] font-semibold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-2 text-[14px] text-white/55", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

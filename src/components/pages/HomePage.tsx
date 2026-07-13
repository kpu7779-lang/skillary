"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUp, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { FeaturedSkillsSection } from "@/components/site/FeaturedSkillsSection";
import { SearchResultsSection } from "@/components/site/SearchResultsSection";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function HomePage() {
  const [localQuery, setLocalQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [searchType, setSearchType] = useState<"all" | "free" | "paid">("all");
  const [sortMode, setSortMode] = useState<"popular" | "newest" | "rating">("popular");

  const runSearch = () => {
    const q = localQuery.trim();
    if (!q) return;
    setActiveQuery(q);
    requestAnimationFrame(() => {
      document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(heroProgress, [0, 1], [0, prefersReduced ? 0 : -60]);
  const titleOpacity = useTransform(heroProgress, [0, 0.8], [1, prefersReduced ? 1 : 0]);
  const panelY = useTransform(heroProgress, [0, 1], [0, prefersReduced ? 0 : -30]);
  const panelOpacity = useTransform(heroProgress, [0, 0.7], [1, prefersReduced ? 1 : 0.3]);

  return (
    <div className="relative snap-y snap-proximity">
      <section
        ref={heroRef}
        className="relative mx-auto w-full min-h-[calc(100dvh-4rem)] flex flex-col pb-0 snap-start snap-always"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
          }}
          className="flex-1 flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto px-5 sm:px-6"
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-[48px] sm:text-[64px] leading-[1.06] font-semibold tracking-tight brand-gradient-text"
          >
            Skillary
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-[20px] sm:text-[26px] text-white/50 max-w-2xl leading-relaxed"
          >
            发现、安装、交付 AI 技能 —— 一键即用，无需配置。
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: panelY, opacity: panelOpacity }}
          className="shrink-0 w-full max-w-[920px] mx-auto px-4 sm:px-5 pb-0"
        >
          <motion.div className="search-panel rounded-t-[32px] rounded-b-none flex flex-col overflow-hidden w-full">
            <div className="flex-1 px-7 sm:px-8 pt-5 sm:pt-6 pb-3 min-h-0">
              <textarea
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    runSearch();
                  }
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    e.preventDefault();
                    runSearch();
                  }
                }}
                placeholder="搜索技能…"
                className="search-panel-input text-white text-[22px] sm:text-[26px] leading-[1.5] min-h-[112px] max-h-[260px] overflow-y-auto"
                rows={4}
                spellCheck={false}
              />
            </div>

            <div className="shrink-0 px-6 sm:px-7 py-4 sm:py-5 border-t border-white/[0.05]">
              <div className="flex flex-wrap items-center gap-2 justify-between">
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
                          "rounded-[8px] px-4 py-2.5 text-[14px] font-medium transition-all",
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

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="relative group">
                    <select
                      value={sortMode}
                      onChange={(e) => setSortMode(e.target.value as "popular" | "newest" | "rating")}
                      className="appearance-none inline-flex items-center gap-1.5 h-11 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[14px] text-white/70 hover:text-white hover:bg-white/[0.06] px-4 pr-9 transition-colors cursor-pointer outline-none"
                    >
                      <option value="popular" className="bg-[#161420]">热门优先</option>
                      <option value="newest" className="bg-[#161420]">最新优先</option>
                      <option value="rating" className="bg-[#161420]">评分优先</option>
                    </select>
                    <SlidersHorizontal className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-white/40 pointer-events-none" />
                  </div>

                  <motion.button
                    type="button"
                    disabled={!localQuery.trim()}
                    onClick={runSearch}
                    whileHover={prefersReduced || !localQuery.trim() ? undefined : { scale: 1.05 }}
                    whileTap={prefersReduced ? undefined : { scale: 0.95 }}
                    className={cn(
                      "inline-flex h-11 w-11 items-center justify-center rounded-lg transition-all shrink-0",
                      localQuery.trim()
                        ? "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10"
                        : "bg-white/[0.06] text-white/25 cursor-not-allowed"
                    )}
                    title="搜索（Enter）"
                    aria-label="搜索"
                  >
                    <ArrowUp className="h-[22px] w-[22px]" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <div id="search-results">
        <SearchResultsSection
          query={activeQuery}
          searchType={searchType}
          sortMode={sortMode}
          onClear={() => {
            setActiveQuery("");
            setLocalQuery("");
          }}
        />
      </div>

      <FeaturedSkillsSection />
    </div>
  );
}
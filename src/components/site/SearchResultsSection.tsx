"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";
import { searchSkills, formatCompact, PLATFORM_META, type Skill } from "@/lib/skills-data";
import { useNav } from "@/store/nav";
import { cn } from "@/lib/utils";

type Props = {
  query: string;
  searchType: "all" | "free" | "paid";
  sortMode: "popular" | "newest" | "rating";
  onClear: () => void;
};

export function SearchResultsSection({ query, searchType, sortMode, onClear }: Props) {
  const openInstall = useNav((s) => s.openInstall);
  const results = searchSkills({ query, type: searchType, sort: sortMode });

  if (!query.trim()) return null;

  return (
    <AnimatePresence>
      <motion.section
        key={query + searchType + sortMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl px-5 sm:px-8 py-10"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-[22px] font-semibold text-white">
              「{query}」的搜索结果
            </h2>
            <p className="mt-1 text-[14px] text-white/45">共 {results.length} 个技能</p>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="btn-secondary text-[13px] px-4 py-2"
          >
            <X className="h-3.5 w-3.5" />
            清除搜索
          </button>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-16 text-white/45">
            <p>没有找到匹配的技能</p>
            <p className="mt-2 text-[13px]">试试其他关键词，或浏览下方精选 Skill</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((skill, i) => (
              <SkillResultCard
                key={skill.slug}
                skill={skill}
                index={i}
                onOpen={() => openInstall(skill.slug)}
              />
            ))}
          </div>
        )}
      </motion.section>
    </AnimatePresence>
  );
}

function SkillResultCard({
  skill,
  index,
  onOpen,
}: {
  skill: Skill;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      onClick={onOpen}
      className="glass-card glass-card-hover rounded-xl sm:rounded-2xl p-4 sm:p-5 text-left flex flex-col h-full border border-white/[0.06] hover:border-white/[0.12]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {skill.isNew && (
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-cyan-400/30 text-cyan-300">
              新
            </span>
          )}
          {skill.trending && (
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-amber-400/30 text-amber-300">
              热门
            </span>
          )}
          {skill.price === 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-400/30 text-emerald-300">
              免费
            </span>
          )}
        </div>
        <span className={cn("text-[13px] font-semibold shrink-0", skill.price > 0 ? "text-amber-300" : "text-white/80")}>
          {skill.price > 0 ? `¥${skill.price}` : "免费"}
        </span>
      </div>
      <h3 className="mt-3 text-[16px] font-semibold text-white leading-snug">{skill.title}</h3>
      <p className="mt-2 text-[13px] text-white/45 leading-relaxed flex-1">{skill.tagline}</p>
      <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[12px] text-white/40">
        <span className="inline-flex items-center gap-1 text-white/55">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {skill.rating}
        </span>
        <span>{formatCompact(skill.downloads)} 安装</span>
        <div className="flex gap-1">
          {skill.platforms.slice(0, 3).map((p) => (
            <span
              key={p}
              className="h-5 w-5 rounded text-[8px] font-bold flex items-center justify-center text-white"
              style={{ background: PLATFORM_META[p].color }}
              title={PLATFORM_META[p].label}
            >
              {PLATFORM_META[p].short}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
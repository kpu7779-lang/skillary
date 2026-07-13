"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Sparkles, RotateCcw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FEATURED_FILTERS,
  FEATURED_SKILLS,
  filterFeaturedSkills,
  groupByPair,
  type FeaturedFilterId,
  type FeaturedSkill,
} from "@/lib/featured-skills-data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function FlipSkillCard({
  skill,
  index,
  autoFlip,
}: {
  skill: FeaturedSkill;
  index: number;
  autoFlip?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, rotateX: prefersReduced ? 0 : 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flip-card h-[220px] sm:h-[240px]"
    >
      <motion.button
        type="button"
        aria-label={`${skill.title}，点击翻转查看能力`}
        onClick={() => setFlipped((f) => !f)}
        onMouseEnter={() => {
          if (!prefersReduced && autoFlip) setFlipped(true);
        }}
        onMouseLeave={() => {
          if (!prefersReduced && autoFlip) setFlipped(false);
        }}
        className={cn(
          "flip-inner relative h-full w-full text-left",
          flipped && "is-flipped"
        )}
      >
        {/* Front */}
        <div className="flip-face flip-front glass-card rounded-2xl border border-white/[0.1] p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl"
            style={{ background: skill.glow }}
            aria-hidden
          />
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/55">
              <Sparkles className="h-3 w-3 text-violet-300" />
              {skill.categoryLabel}
            </span>
            <p className="mt-3 text-[11px] text-white/40">{skill.subCategory}</p>
            <h3 className="mt-2 text-[17px] sm:text-[19px] font-semibold leading-snug text-white">
              {skill.title}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "inline-block h-2 w-10 rounded-full bg-gradient-to-r",
                skill.accent
              )}
            />
            <span className="text-[11px] text-white/35 flex items-center gap-1">
              翻转查看 <RotateCcw className="h-3 w-3" />
            </span>
          </div>
        </div>

        {/* Back — 与正面相同的玻璃样式，仅展示能力内容 */}
        <div className="flip-face flip-back glass-card rounded-2xl border border-white/[0.1] p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl"
            style={{ background: skill.glow }}
            aria-hidden
          />
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/55">
              <Sparkles className="h-3 w-3 text-violet-300" />
              主要能力
            </span>
            <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-white">
              {skill.ability}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "inline-block h-2 w-10 rounded-full bg-gradient-to-r",
                skill.accent
              )}
            />
            <span className="text-[11px] text-white/35 flex items-center gap-1">
              点击返回 <RotateCcw className="h-3 w-3" />
            </span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

export function FeaturedSkillsSection() {
  const [filter, setFilter] = useState<FeaturedFilterId>("featured");
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const skills = filterFeaturedSkills(filter);
  const pairs = groupByPair(skills);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.35"],
  });
  const revealOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0.85, 1]);
  const revealY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReduced ? 0 : 72, 0]
  );
  const revealScale = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReduced ? 1 : 0.94, 1]
  );
  const beamScaleX = useTransform(scrollYProgress, [0, 0.55], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="featured-skills-section relative min-h-[92vh] py-16 sm:py-24 overflow-hidden snap-start snap-always"
    >
      {/* Scroll-driven transition bridge */}
      <motion.div
        style={{ scaleX: beamScaleX }}
        className="featured-skills-beam pointer-events-none absolute left-0 right-0 top-0 z-10 h-[2px] origin-left"
        aria-hidden
      />
      <div className="featured-skills-curtain pointer-events-none absolute inset-x-0 top-0 h-32" aria-hidden />

      {/* Section transition accents */}
      <div className="featured-skills-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="featured-skills-divider pointer-events-none absolute left-0 right-0 top-0 h-px" aria-hidden />

      <motion.div
        style={{
          opacity: revealOpacity,
          y: revealY,
          scale: revealScale,
        }}
        className="relative mx-auto max-w-6xl px-5 sm:px-8"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[26px] sm:text-[36px] font-semibold tracking-tight text-white"
          >
            精选 Skill
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-[14px] sm:text-[15px] text-white/45 leading-relaxed">
            按场景筛选，点击卡片翻转查看能力
          </motion.p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
        >
          {FEATURED_FILTERS.map((item) => {
            const active = filter === item.id;
            const isAll = item.id === "all";
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "group relative rounded-lg border px-3.5 sm:px-4 py-2 sm:py-2.5 text-left transition-all duration-200",
                  isAll && "ml-0 sm:ml-1",
                  active
                    ? "border-white/20 bg-white/[0.10] text-white"
                    : "border-transparent bg-white/[0.03] text-white/50 hover:bg-white/[0.06] hover:text-white/75"
                )}
              >
                <span className="text-[13px] font-medium">{item.label}</span>
                {item.hint && (
                  <span className="block text-[10px] text-white/35 mt-0.5">{item.hint}</span>
                )}
                {isAll && (
                  <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] font-semibold text-white">
                    {FEATURED_SKILLS.length}
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Pair rows with flip cards */}
        <div className="mt-12 space-y-6 sm:space-y-8">
          <AnimatePresence mode="popLayout">
            {pairs.map((row, rowIndex) => (
              <motion.div
                key={`${filter}-pair-${rowIndex}`}
                layout
                initial={
                  prefersReduced
                    ? { opacity: 0 }
                    : { opacity: 0, x: rowIndex % 2 === 0 ? -40 : 40 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: rowIndex % 2 === 0 ? -20 : 20 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  {row.map((skill, i) => (
                    <FlipSkillCard
                      key={skill.id}
                      skill={skill}
                      index={rowIndex * 2 + i}
                      autoFlip={filter === "featured"}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filter === "featured" && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center"
          >
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="btn-secondary text-[13px] px-5 py-3"
            >
              查看全部 {FEATURED_SKILLS.length} 个精选 Skill
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
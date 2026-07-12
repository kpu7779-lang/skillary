"use client";

import { motion } from "framer-motion";
import {
  Star,
  Download,
  Heart,
  Clock,
  Tag,
  Calendar,
  GitBranch,
  ShieldCheck,
  Play,
  Copy,
  Check,
  ChevronRight,
  Package,
  FileText,
  History,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  getSkillBySlug,
  getRelatedSkills,
  formatCompact,
  formatRelativeDate,
  PLATFORM_META,
  CATEGORY_META,
} from "@/lib/skills-data";
import { useNav } from "@/store/nav";
import { PlatformBadge } from "@/components/site/PlatformBadge";
import { RatingStars } from "@/components/site/RatingStars";
import { SkillCard } from "@/components/site/SkillCard";
import { cn } from "@/lib/utils";

export function DetailPage({ slug }: { slug: string }) {
  const skill = getSkillBySlug(slug);
  const { goHome, openInstall } = useNav();
  const [tab, setTab] = useState<"readme" | "changelog" | "reviews">("readme");
  const [copied, setCopied] = useState<string | null>(null);
  const [favorited, setFavorited] = useState(false);

  if (!skill) {
    return (
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center">
        <p className="text-white/60">技能未找到。</p>
        <button onClick={goHome} className="mt-4 text-sm text-white/80 underline">
          返回探索
        </button>
      </div>
    );
  }

  const related = getRelatedSkills(skill, 4);
  const primaryCmd = skill.installCommands[skill.platforms[0]] ?? "";
  const otherCmds = skill.platforms.slice(1);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-6 pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[12px] text-white/40">
        <button onClick={goHome} className="hover:text-white/70">探索</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white/70">{CATEGORY_META[skill.category]?.label ?? skill.category}</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white/70 truncate">{skill.title}</span>
      </div>

      {/* ===================== HERO ===================== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-5 grid gap-8 lg:grid-cols-[1.5fr_1fr]"
      >
        {/* Left — title / meta / install */}
        <div>
          {/* Author + version */}
          <div className="flex items-center gap-3">
            <div className={cn("h-9 w-9 rounded-full bg-gradient-to-br flex items-center justify-center text-[12px] font-semibold text-white", skill.authorAvatarColor)}>
              {skill.author.slice(0, 2)}
            </div>
            <div>
              <div className="text-[13px] font-medium text-white/90">{skill.author}</div>
              <div className="text-[11px] text-white/40">已认证发布者</div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="rounded-full chip px-2 py-0.5 text-[11px] text-white/70">v{skill.version}</span>
              <span className="inline-flex items-center gap-1 rounded-full chip px-2 py-0.5 text-[11px] text-white/70">
                <Clock className="h-3 w-3" /> {formatRelativeDate(skill.updatedAt)}
              </span>
            </div>
          </div>

          {/* Title + tagline */}
          <h1 className="mt-5 text-[32px] sm:text-[40px] font-semibold tracking-tight text-white leading-[1.1]">
            {skill.title}
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-white/60 max-w-2xl">
            {skill.tagline}
          </p>

          {/* 适合人群 */}
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full chip px-3 py-1 text-[12px] text-white/70">
            <Users className="h-3 w-3" /> 适合：{skill.audience}
          </div>

          {/* Platforms */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[12px] text-white/40 mr-1">支持平台</span>
            {skill.platforms.map((p) => (
              <PlatformBadge key={p} platform={p} size="sm" />
            ))}
          </div>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatBlock icon={<Download className="h-4 w-4" />} value={formatCompact(skill.downloads)} label="下载量" />
            <StatBlock icon={<Star className="h-4 w-4 text-amber-400 fill-amber-400" />} value={skill.rating.toFixed(1)} label={`${skill.reviewsCount} 条评价`} />
            <StatBlock icon={<Heart className="h-4 w-4" />} value={formatCompact(skill.favorites)} label="收藏数" />
            <StatBlock icon={<GitBranch className="h-4 w-4" />} value={`v${skill.version}`} label="最新版本" />
          </div>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {skill.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full chip px-2.5 py-1 text-[11px] text-white/65">
                <Tag className="h-3 w-3" /> {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => openInstall(skill.slug)}
              className="inline-flex items-center gap-2 rounded-xl brand-gradient-bg text-white font-medium px-5 py-2.5 text-[14px] shadow-lg shadow-violet-500/20 hover:brightness-110 transition"
            >
              {skill.price === 0 ? <Download className="h-4 w-4" /> : <Package className="h-4 w-4" />}
              {skill.price === 0 ? "免费安装" : `购买 ¥${skill.price}`}
            </button>
            <button
              onClick={() => setFavorited((v) => !v)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[14px] border transition-colors",
                favorited ? "border-rose-400/40 bg-rose-500/10 text-rose-300" : "border-white/10 text-white/70 hover:text-white hover:border-white/20"
              )}
            >
              <Heart className={cn("h-4 w-4", favorited && "fill-rose-400 text-rose-400")} />
              {favorited ? "已收藏" : "收藏"}
            </button>
            <button
              onClick={() => primaryCmd && copy(primaryCmd)}
              className="inline-flex items-center gap-2 rounded-xl chip px-4 py-2.5 text-[13px] font-mono text-white/80 hover:text-white"
            >
              {copied === primaryCmd ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              {primaryCmd || "安装命令"}
            </button>
          </div>
        </div>

        {/* Right — preview card */}
        <div className="relative">
          <div className={cn("absolute -inset-1 rounded-3xl bg-gradient-to-br opacity-30 blur-2xl", skill.accent)} />
          <div className="relative glass-card rounded-2xl overflow-hidden">
            {/* Demo header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2 text-[11px] text-white/40 font-mono">演示 · {skill.slug}</span>
              <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-white/50">
                <Play className="h-3 w-3" /> 预览
              </span>
            </div>

            {/* Big icon */}
            <div className="p-6 flex flex-col items-center text-center">
              <div className={cn("h-16 w-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-xl", skill.accent)}>
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <div className="mt-4 text-[15px] font-semibold text-white">{skill.title}</div>
              <p className="mt-1 text-[12px] text-white/50 max-w-xs">{skill.description}</p>
            </div>

            {/* Before / After */}
            {skill.beforeAfter && (
              <div className="px-4 pb-4">
                <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2">效果对比</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-rose-400/20 bg-rose-500/[0.06] p-3">
                    <div className="text-[10px] text-rose-300/80 font-medium mb-1">使用前</div>
                    <pre className="text-[11px] text-white/55 font-mono whitespace-pre-wrap leading-relaxed">{skill.beforeAfter.before}</pre>
                  </div>
                  <div className="rounded-lg border border-emerald-400/20 bg-emerald-500/[0.06] p-3">
                    <div className="text-[10px] text-emerald-300/80 font-medium mb-1">使用后</div>
                    <pre className="text-[11px] text-white/65 font-mono whitespace-pre-wrap leading-relaxed">{skill.beforeAfter.after}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* Safety bar */}
            <div className="px-4 py-3 border-t border-white/[0.06] bg-white/[0.02] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-[11px] text-white/60">沙箱测试 · 已审查 · 已签名</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===================== TABS ===================== */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          {/* Tab nav */}
          <div className="flex items-center gap-1 border-b border-white/[0.06]">
            <TabButton active={tab === "readme"} onClick={() => setTab("readme")} icon={<FileText className="h-3.5 w-3.5" />}>
              说明文档
            </TabButton>
            <TabButton active={tab === "changelog"} onClick={() => setTab("changelog")} icon={<History className="h-3.5 w-3.5" />}>
              更新日志
            </TabButton>
            <TabButton active={tab === "reviews"} onClick={() => setTab("reviews")} icon={<Star className="h-3.5 w-3.5" />}>
              评价 · {skill.reviewsCount}
            </TabButton>
          </div>

          {/* Tab content */}
          <div className="py-6">
            {tab === "readme" && (
              <article className="prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-white/65 font-mono bg-transparent border-0 p-0">
{skill.readme}
                </pre>
              </article>
            )}

            {tab === "changelog" && (
              <div className="space-y-5">
                {skill.changelog.map((c) => (
                  <div key={c.version} className="glass-card rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full chip px-2 py-0.5 text-[11px] font-mono text-white/80">v{c.version}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-white/40">
                        <Calendar className="h-3 w-3" /> {c.date}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {c.notes.map((n) => (
                        <li key={n} className="text-[13px] text-white/65 flex gap-2">
                          <span className="text-emerald-400 mt-1.5">•</span>
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {tab === "reviews" && (
              <div className="space-y-4">
                {/* Rating summary */}
                <div className="glass-card rounded-2xl p-5 flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-[40px] font-semibold text-white leading-none">{skill.rating.toFixed(1)}</div>
                    <RatingStars value={skill.rating} className="mt-2 justify-center" />
                    <div className="text-[11px] text-white/40 mt-1">{skill.reviewsCount} 条评价</div>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === 5 ? 78 : star === 4 ? 16 : star === 3 ? 4 : star === 2 ? 1 : 1;
                      return (
                        <div key={star} className="flex items-center gap-2 text-[11px]">
                          <span className="w-4 text-white/40">{star}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-8 text-right text-white/40">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Individual reviews */}
                {skill.reviews.map((r, i) => (
                  <div key={i} className="glass-card rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("h-8 w-8 rounded-full bg-gradient-to-br flex items-center justify-center text-[11px] font-semibold text-white", r.avatarColor)}>
                        {r.author.slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] font-medium text-white/90">{r.author}</div>
                        <div className="text-[11px] text-white/40">{formatRelativeDate(r.date)}</div>
                      </div>
                      <RatingStars value={r.rating} size={12} />
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed text-white/65">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ===================== SIDEBAR — install ===================== */}
        <aside className="space-y-4">
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-[13px] font-semibold text-white/90 flex items-center gap-2">
              <Download className="h-4 w-4" /> 安装
            </h3>
            <p className="mt-1 text-[12px] text-white/45">
              选择你的平台，复制命令即可。
            </p>

            {/* Primary command */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-white/50 inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: PLATFORM_META[skill.platforms[0]].color }} />
                  {PLATFORM_META[skill.platforms[0]].label}
                </span>
                <button
                  onClick={() => copy(primaryCmd)}
                  className="text-[11px] text-white/50 hover:text-white inline-flex items-center gap-1"
                >
                  {copied === primaryCmd ? <><Check className="h-3 w-3 text-emerald-400" /> 已复制</> : <><Copy className="h-3 w-3" /> 复制</>}
                </button>
              </div>
              <pre className="rounded-lg bg-black/40 border border-white/[0.08] px-3 py-2.5 text-[12px] font-mono text-emerald-200/90 overflow-x-auto">
{primaryCmd}
              </pre>
            </div>

            {/* Other platforms */}
            {otherCmds.length > 0 && (
              <div className="mt-3 space-y-2">
                {otherCmds.map((p) => {
                  const cmd = skill.installCommands[p] ?? "";
                  return (
                    <div key={p}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-white/50 inline-flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full" style={{ background: PLATFORM_META[p].color }} />
                          {PLATFORM_META[p].label}
                        </span>
                        <button
                          onClick={() => copy(cmd)}
                          className="text-[11px] text-white/50 hover:text-white inline-flex items-center gap-1"
                        >
                          {copied === cmd ? <><Check className="h-3 w-3 text-emerald-400" /></> : <><Copy className="h-3 w-3" /></>}
                        </button>
                      </div>
                      <pre className="rounded-lg bg-black/40 border border-white/[0.06] px-3 py-2 text-[11px] font-mono text-white/65 overflow-x-auto">
{cmd}
                      </pre>
                    </div>
                  );
                })}
              </div>
            )}

            <button
              onClick={() => openInstall(skill.slug)}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl brand-gradient-bg text-white font-medium px-4 py-2.5 text-[13px] hover:brightness-110 transition"
            >
              {skill.price === 0 ? <Download className="h-4 w-4" /> : <Package className="h-4 w-4" />}
              {skill.price === 0 ? "快速安装" : `购买 ¥${skill.price}`}
            </button>
          </div>

          {/* Safety */}
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-2 text-[12px] text-white/70">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              已审查 · 沙箱测试
            </div>
            <p className="mt-2 text-[11px] text-white/40 leading-relaxed">
              所有技能在上线前都会扫描提示词注入、密钥泄露和恶意 Shell 执行。
            </p>
          </div>
        </aside>
      </div>

      {/* ===================== RELATED ===================== */}
      {related.length > 0 && (
        <section className="mt-16">
          <h3 className="text-[20px] font-semibold tracking-tight text-white mb-5">相关技能</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((s, i) => (
              <SkillCard key={s.id} skill={s} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* -------------------- helpers -------------------- */

function StatBlock({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="glass-card rounded-xl px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-0.5 text-[16px] font-semibold text-white">{value}</div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-2.5 text-[13px] border-b-2 -mb-px transition-colors",
        active ? "border-white text-white" : "border-transparent text-white/45 hover:text-white/80"
      )}
    >
      {icon}
      {children}
    </button>
  );
}

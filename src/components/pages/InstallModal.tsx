"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Package,
  Sparkles,
  Terminal,
  Heart,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  getSkillBySlug,
  PLATFORM_META,
  type Platform,
  type Skill,
} from "@/lib/skills-data";
import { useNav } from "@/store/nav";
import { cn } from "@/lib/utils";

export function InstallModal() {
  const { installSkillSlug, closeInstall } = useNav();
  const skill = installSkillSlug ? getSkillBySlug(installSkillSlug) : null;

  useEffect(() => {
    if (!installSkillSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeInstall();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [installSkillSlug, closeInstall]);

  return (
    <AnimatePresence>
      {skill && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeInstall}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            key={skill.slug}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg glass-card rounded-2xl overflow-hidden"
          >
            <InstallPanel skill={skill} onClose={closeInstall} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InstallPanel({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  const [selected, setSelected] = useState<Platform>(skill.platforms[0]);
  const [copied, setCopied] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [done, setDone] = useState(false);

  const cmd = skill.installCommands[selected] ?? "";
  const isPaid = skill.price > 0;

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {/* Accent glow */}
      <div className={cn("absolute -top-24 -inset-x-10 h-40 bg-gradient-to-br opacity-30 blur-3xl pointer-events-none", skill.accent)} />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 h-8 w-8 rounded-lg chip flex items-center justify-center hover:bg-white/10"
        aria-label="关闭"
      >
        <X className="h-4 w-4 text-white/60" />
      </button>

      <div className="relative p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className={cn("h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg", skill.accent)}>
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-[15px] font-semibold text-white truncate">{skill.title}</div>
            <div className="text-[12px] text-white/45 truncate">{skill.tagline}</div>
          </div>
        </div>

        {/* Success state */}
        {done ? (
          <div className="mt-6 flex flex-col items-center text-center py-6">
            <div className="h-14 w-14 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
              <Check className="h-7 w-7 text-emerald-400" />
            </div>
            <h3 className="mt-4 text-[18px] font-semibold text-white">
              安装命令已复制
            </h3>
            <p className="mt-2 text-[13px] text-white/55 max-w-xs">
              将下面的命令粘贴到你的 {PLATFORM_META[selected].label} 中，技能将立即可用。
            </p>
          </div>
        ) : isPaid && !purchased ? (
          /* Purchase UI */
          <div className="mt-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-white/60">一次性购买</span>
                <span className="text-[22px] font-semibold text-white">¥{skill.price}</span>
              </div>
              <div className="mt-1 text-[11px] text-white/40">
                终身更新 · 14 天退款 · 单开发者授权
              </div>
            </div>
            <button
              onClick={() => setPurchased(true)}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl brand-gradient-bg text-white font-medium px-4 py-2.5 text-[14px] hover:brightness-110 transition"
            >
              <Package className="h-4 w-4" /> 购买并安装
            </button>
            <p className="mt-3 text-center text-[11px] text-white/35">
              仅演示 —— 不会进行真实支付
            </p>
          </div>
        ) : (
          <>
            {/* Platform picker */}
            <div className="mt-6">
              <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2">
                选择平台
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {skill.platforms.map((p) => {
                  const meta = PLATFORM_META[p];
                  const active = selected === p;
                  return (
                    <button
                      key={p}
                      onClick={() => setSelected(p)}
                      className={cn(
                        "rounded-xl px-3 py-2.5 text-left border transition-all",
                        active
                          ? "border-white/30 bg-white/10"
                          : "border-white/[0.06] bg-white/[0.02] hover:border-white/15"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: meta.color }} />
                        <span className="text-[12px] font-medium text-white">{meta.label}</span>
                        {active && <Check className="h-3.5 w-3.5 text-emerald-400 ml-auto" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Command */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase tracking-wider text-white/40 inline-flex items-center gap-1">
                  <Terminal className="h-3 w-3" /> 安装命令
                </span>
                <button
                  onClick={() => copy(cmd)}
                  className="text-[11px] text-white/60 hover:text-white inline-flex items-center gap-1"
                >
                  {copied ? <><Check className="h-3 w-3 text-emerald-400" /> 已复制</> : <><Copy className="h-3 w-3" /> 复制</>}
                </button>
              </div>
              <pre className="rounded-lg bg-black/50 border border-white/[0.08] px-3 py-3 text-[12.5px] font-mono text-emerald-200/95 overflow-x-auto whitespace-pre-wrap break-all">
{cmd}
              </pre>
            </div>

            {/* Primary action */}
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  copy(cmd);
                  setDone(true);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl brand-gradient-bg text-white font-medium px-4 py-2.5 text-[14px] hover:brightness-110 transition"
              >
                <Download className="h-4 w-4" /> 复制并安装
              </button>
              <button
                onClick={() => copy(cmd)}
                className="inline-flex items-center justify-center gap-2 rounded-xl chip px-4 py-2.5 text-[13px] text-white/80 hover:text-white"
              >
                <Copy className="h-4 w-4" /> 复制
              </button>
            </div>

            {/* Safety */}
            <div className="mt-4 flex items-center gap-2 text-[11px] text-white/45">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              沙箱测试 · 已审查 · 由 {skill.author} 签名
            </div>
          </>
        )}

        {/* Footer micro-stats */}
        {!done && (
          <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-white/40">
            <span>v{skill.version} · 更新于 {skill.updatedAt}</span>
            <span className="inline-flex items-center gap-1">
              <Heart className="h-3 w-3" /> {skill.favorites.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Upload,
  Sparkles,
  Tag,
  Check,
  ArrowRight,
  Image as ImageIcon,
  FileText,
  DollarSign,
  Eye,
  Send,
  Code2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORY_META, PLATFORM_META, type Platform, type SkillCategory } from "@/lib/skills-data";
import { useNav } from "@/store/nav";
import { PlatformBadge } from "@/components/site/PlatformBadge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ALL_PLATFORMS: Platform[] = ["claude-code", "cursor", "codex", "qwen", "glm", "kimi"];
const ALL_CATEGORIES: SkillCategory[] = ["coding", "design", "writing", "learning", "data", "lifestyle", "office", "agent"];

export function UploadPage() {
  const { goHome } = useNav();
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [audience, setAudience] = useState("");
  const [category, setCategory] = useState<SkillCategory>("coding");
  const [tags, setTags] = useState("");
  const [version, setVersion] = useState("0.1.0");
  const [platforms, setPlatforms] = useState<Platform[]>(["claude-code"]);
  const [price, setPrice] = useState("0");
  const [readme, setReadme] = useState("# 我的技能\n\n描述这个技能能做什么…");
  const [installCmd, setInstallCmd] = useState("claude skill add my-skill");
  const [cover, setCover] = useState<string>("");

  const togglePlatform = (p: Platform) => {
    setPlatforms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const onCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCover(url);
  };

  const tagsList = useMemo(
    () => tags.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 6),
    [tags]
  );

  const canPublish = title.trim() && tagline.trim() && platforms.length > 0 && installCmd.trim();

  const handlePublish = () => {
    if (!canPublish) {
      toast.error("请填写必填字段");
      return;
    }
    toast.success("技能已发布！（演示）");
    setTimeout(() => goHome(), 800);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 rounded-full chip px-3 py-1 text-[11px] text-white/60">
          <Sparkles className="h-3 w-3 text-violet-300" /> 2 分钟即可发布
        </div>
        <h1 className="mt-3 text-[32px] sm:text-[40px] font-semibold tracking-tight brand-gradient-text">
          发布技能
        </h1>
        <p className="mt-2 text-[14px] text-white/55 max-w-xl">
          填写基本信息，我们自动生成安装命令、版本管理和展示页面。
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* ===================== FORM ===================== */}
        <div className="space-y-5">
          {/* Title + tagline */}
          <Card title="基本信息" icon={<Sparkles className="h-4 w-4" />}>
            <Field label="技能名称" required>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例如：作业辅导小助手"
                className="input"
              />
            </Field>
            <Field label="一句话简介" required hint="最多 80 字，显示在卡片上。">
              <input
                value={tagline}
                onChange={(e) => setTagline(e.target.value.slice(0, 80))}
                placeholder="拍下题目，逐步讲解，不直接给答案。"
                className="input"
              />
              <div className="text-right text-[10px] text-white/30 mt-1">{tagline.length}/80</div>
            </Field>
            <Field label="详细描述" hint="一段话介绍这个技能能做什么、适合谁。">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="这个技能能做什么？适合什么人？"
                className="input resize-none"
              />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="作者 / 发布者">
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="你的名字或团队名"
                  className="input"
                />
              </Field>
              <Field label="适合人群" hint="例如：小学生 · 家长">
                <input
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="小学生 · 家长"
                  className="input"
                />
              </Field>
            </div>
          </Card>

          {/* Category + tags + platforms */}
          <Card title="分类与标签" icon={<Tag className="h-4 w-4" />}>
            <Field label="分类">
              <div className="flex flex-wrap gap-2">
                {ALL_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-[12px] border transition-all",
                      category === c
                        ? "border-white/30 bg-white/10 text-white"
                        : "border-white/[0.06] text-white/55 hover:text-white hover:border-white/15"
                    )}
                  >
                    {CATEGORY_META[c].label}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="标签" hint="用逗号分隔，最多 6 个。">
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="作业辅导, 小学, 数学"
                className="input"
              />
              {tagsList.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tagsList.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-full chip px-2 py-0.5 text-[11px] text-white/65">
                      <Tag className="h-2.5 w-2.5" /> {t}
                    </span>
                  ))}
                </div>
              )}
            </Field>
            <Field label="支持平台" required hint="用户可以在这些平台上使用。">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ALL_PLATFORMS.map((p) => {
                  const active = platforms.includes(p);
                  const meta = PLATFORM_META[p];
                  return (
                    <button
                      key={p}
                      onClick={() => togglePlatform(p)}
                      className={cn(
                        "rounded-lg px-3 py-2 text-left border transition-all flex items-center gap-2",
                        active
                          ? "border-white/30 bg-white/10"
                          : "border-white/[0.06] hover:border-white/15"
                      )}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: meta.color }} />
                      <span className={cn("text-[12px] flex-1", active ? "text-white" : "text-white/55")}>
                        {meta.label}
                      </span>
                      {active && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </Field>
          </Card>

          {/* Version + price + install */}
          <Card title="发布设置" icon={<Code2 className="h-4 w-4" />}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="版本号">
                <input
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="0.1.0"
                  className="input"
                />
              </Field>
              <Field label="价格（元）" hint="0 = 免费">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ""))}
                    inputMode="decimal"
                    placeholder="0"
                    className="input pl-9"
                  />
                </div>
              </Field>
            </div>
            <Field label="安装命令" required hint="用户复制这条命令来安装你的技能。">
              <input
                value={installCmd}
                onChange={(e) => setInstallCmd(e.target.value)}
                placeholder="kimi skill add my-skill"
                className="input font-mono text-[13px]"
              />
            </Field>
          </Card>

          {/* Cover + README */}
          <Card title="内容" icon={<FileText className="h-4 w-4" />}>
            <Field label="封面图片" hint="建议 PNG/JPG，1200×675。点击选择或拖入。">
              <label className="block cursor-pointer">
                <div className="relative rounded-xl border border-dashed border-white/15 bg-white/[0.02] hover:border-white/25 transition-colors p-6 flex flex-col items-center justify-center text-center">
                  {cover ? (
                    <img src={cover} alt="封面预览" className="max-h-32 rounded-lg" />
                  ) : (
                    <>
                      <div className="h-10 w-10 rounded-full bg-white/[0.04] flex items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-white/40" />
                      </div>
                      <div className="mt-2 text-[12px] text-white/60">点击上传</div>
                      <div className="text-[11px] text-white/35">或将文件拖到这里</div>
                    </>
                  )}
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={onCoverChange} />
                </div>
              </label>
            </Field>
            <Field label="说明文档" hint="支持 Markdown 格式。">
              <textarea
                value={readme}
                onChange={(e) => setReadme(e.target.value)}
                rows={6}
                className="input resize-none font-mono text-[12.5px]"
              />
            </Field>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <button onClick={goHome} className="text-[13px] text-white/55 hover:text-white">
              取消
            </button>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-xl chip px-4 py-2.5 text-[13px] text-white/80 hover:text-white">
                <Eye className="h-4 w-4" /> 保存草稿
              </button>
              <button
                onClick={handlePublish}
                disabled={!canPublish}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-medium transition",
                  canPublish
                    ? "brand-gradient-bg text-white hover:brightness-110"
                    : "bg-white/[0.06] text-white/40 cursor-not-allowed"
                )}
              >
                <Send className="h-4 w-4" /> 发布技能
              </button>
            </div>
          </div>
        </div>

        {/* ===================== LIVE PREVIEW ===================== */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2 inline-flex items-center gap-1.5">
            <Eye className="h-3 w-3" /> 实时预览
          </div>
          <div className="glass-card rounded-2xl p-5">
            {/* Cover */}
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-violet-500/30 via-indigo-500/20 to-cyan-400/30 relative">
              {cover ? (
                <img src={cover} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/30 text-[11px]">
                  封面图片预览
                </div>
              )}
              <div className="absolute top-2 right-2 rounded-full bg-black/40 backdrop-blur px-2 py-0.5 text-[10px] text-white/80">
                v{version || "0.1.0"}
              </div>
            </div>

            {/* Title block */}
            <h3 className="mt-4 text-[16px] font-semibold text-white">
              {title || "你的技能名称"}
            </h3>
            <p className="text-[12px] text-white/55 mt-1">
              {tagline || "你的一句话简介会显示在这里。"}
            </p>

            {/* Audience */}
            {audience && (
              <p className="mt-1 text-[11px] text-white/35">
                适合：{audience}
              </p>
            )}

            {/* Description */}
            {description && (
              <p className="mt-2 text-[12px] text-white/45 line-clamp-3">{description}</p>
            )}

            {/* Platforms */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {platforms.length === 0 ? (
                <span className="text-[11px] text-white/30">选择支持平台…</span>
              ) : (
                platforms.map((p) => <PlatformBadge key={p} platform={p} size="sm" />)
              )}
            </div>

            {/* Tags */}
            {tagsList.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tagsList.map((t) => (
                  <span key={t} className="rounded-full chip px-2 py-0.5 text-[10px] text-white/65">#{t}</span>
                ))}
              </div>
            )}

            {/* Install + price */}
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/40">安装命令</span>
                <span className="text-[11px] font-medium text-emerald-300/90">
                  {Number(price) === 0 ? "免费" : `¥${price}`}
                </span>
              </div>
              <pre className="mt-1.5 rounded-lg bg-black/40 border border-white/[0.08] px-3 py-2 text-[11px] font-mono text-emerald-200/85 overflow-x-auto">
{installCmd || "kimi skill add your-skill"}
              </pre>
            </div>

            {/* CTA preview */}
            <button
              disabled
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl brand-gradient-bg text-white font-medium px-4 py-2 text-[13px] opacity-90"
            >
              {Number(price) === 0 ? "免费安装" : `购买 ¥${price}`} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mt-3 text-[11px] text-white/35 leading-relaxed">
            提示：标题尽量简短，简介突出价值。前 80 个字决定用户的点击率。
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------- helpers -------------------- */

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-7 w-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/70">
          {icon}
        </div>
        <h3 className="text-[13px] font-semibold text-white/90">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[12px] text-white/70 mb-1.5">
        {label}
        {required && <span className="text-rose-400 text-[10px]">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-[10.5px] text-white/35">{hint}</p>}
    </div>
  );
}

"use client";

import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useNav } from "@/store/nav";

export function Footer() {
  const { goHome, goUpload } = useNav();
  const soon = (label: string) => () => toast.info(`${label}即将上线`);

  return (
    <footer className="mt-24 border-t border-white/[0.06] bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-10 sm:py-12">
        <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-[15px] font-semibold text-white">Skillary</span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-white/45 max-w-sm">
              AI 技能市场。发现、安装、使用 Claude Code、Cursor、通义千问等平台技能。
            </p>
          </div>

          <FooterCol
            title="产品"
            links={[
              { label: "探索技能", onClick: goHome },
              { label: "发布技能", onClick: goUpload },
              { label: "定价", onClick: soon("定价页面") },
              { label: "更新日志", onClick: soon("更新日志") },
            ]}
          />
          <FooterCol
            title="平台"
            links={[
              { label: "Claude Code", onClick: goHome },
              { label: "Cursor", onClick: goHome },
              { label: "通义千问", onClick: goHome },
              { label: "智谱 GLM / Kimi", onClick: goHome },
            ]}
          />
          <FooterCol
            title="关于"
            links={[
              { label: "关于我们", onClick: soon("关于页面") },
              { label: "博客", onClick: soon("博客") },
              { label: "招聘", onClick: soon("招聘") },
              { label: "联系方式", onClick: soon("联系方式") },
            ]}
          />
        </div>

        <div className="mt-8 sm:mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/35">© 2026 Skillary</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[12px] text-white/40">
            <button type="button" onClick={soon("隐私政策")} className="hover:text-white/65 transition-colors">
              隐私政策
            </button>
            <button type="button" onClick={soon("服务条款")} className="hover:text-white/65 transition-colors">
              服务条款
            </button>
            <button type="button" onClick={soon("安全说明")} className="hover:text-white/65 transition-colors">
              安全说明
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; onClick: () => void }[];
}) {
  return (
    <div>
      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-white/35">
        {title}
      </h4>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <button
              type="button"
              onClick={l.onClick}
              className="text-[13px] text-white/55 hover:text-white transition-colors"
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
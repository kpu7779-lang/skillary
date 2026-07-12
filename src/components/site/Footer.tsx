"use client";

import { Sparkles } from "lucide-react";
import { useNav } from "@/store/nav";

export function Footer() {
  const { goHome, goUpload } = useNav();
  return (
    <footer className="mt-24 border-t border-white/[0.06] bg-background/40 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-[15px] font-semibold text-white">Skillary</span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-white/50 max-w-xs">
              人人都能用的 AI 技能市场。一键发现、安装、使用 AI 技能，支持 Claude Code、Cursor、通义千问、智谱 GLM、Kimi。
            </p>
          </div>

          <FooterCol
            title="产品"
            links={[
              { label: "探索技能", onClick: goHome },
              { label: "发布技能", onClick: goUpload },
              { label: "定价", onClick: () => {} },
              { label: "更新日志", onClick: () => {} },
            ]}
          />
          <FooterCol
            title="平台"
            links={[
              { label: "Claude Code", onClick: () => {} },
              { label: "Cursor", onClick: () => {} },
              { label: "通义千问", onClick: () => {} },
              { label: "智谱 GLM / Kimi", onClick: () => {} },
            ]}
          />
          <FooterCol
            title="公司"
            links={[
              { label: "关于我们", onClick: () => {} },
              { label: "博客", onClick: () => {} },
              { label: "招聘", onClick: () => {} },
              { label: "联系方式", onClick: () => {} },
            ]}
          />
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/40">
            © 2026 Skillary · 为中国 AI 用户打造
          </p>
          <div className="flex items-center gap-4 text-[12px] text-white/40">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white/70">隐私政策</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white/70">服务条款</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white/70">安全说明</a>
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
      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
        {title}
      </h4>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <button
              onClick={l.onClick}
              className="text-[13px] text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

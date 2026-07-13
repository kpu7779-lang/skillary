"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, Upload, BookOpen, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useNav } from "@/store/nav";
import { useAuthUI } from "@/store/auth-ui";
import { cn } from "@/lib/utils";

export function Header() {
  const { data: session } = useSession();
  const { view, goHome, goUpload } = useNav();
  const openAuth = useAuthUI((s) => s.openAuth);
  const [open, setOpen] = useState(false);

  const isHome = view.name === "home";
  const isUpload = view.name === "upload";

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="absolute inset-0 backdrop-blur-xl bg-[#0f0f12]/60 border-b border-white/[0.06]" />
      <div className="relative mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <button onClick={goHome} className="group flex items-center gap-2.5 shrink-0">
          <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-500/15">
            <Sparkles className="h-4 w-4 text-white" />
            <div className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Skillary
          </span>
          <span className="hidden sm:inline rounded-full chip px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-medium text-white/50">
            Beta
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <NavButton active={isHome} onClick={goHome} icon={<Search className="h-3.5 w-3.5" />}>
            探索
          </NavButton>
          <NavButton active={isUpload} onClick={goUpload} icon={<Upload className="h-3.5 w-3.5" />}>
            发布
          </NavButton>
          <button
            type="button"
            onClick={() => toast.info("文档中心即将上线")}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] text-white/55 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5" /> 文档
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {session?.user ? (
            <>
              <span className="inline-flex items-center gap-1.5 rounded-lg chip px-3 py-1.5 text-[13px] text-white/75 max-w-[160px] truncate">
                <User className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{session.user.name || session.user.email}</span>
              </span>
              <button
                type="button"
                onClick={() => signOut()}
                className="btn-ghost text-[13px] px-3 py-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                退出
              </button>
            </>
          ) : (
            <button type="button" onClick={() => openAuth("login")} className="btn-ghost text-[13px] px-3.5 py-1.5">
              登录
            </button>
          )}
          <button type="button" onClick={goUpload} className="btn-primary text-[13px] px-3.5 py-1.5">
            发布技能
          </button>
        </div>

        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg chip"
          onClick={() => setOpen((v) => !v)}
          aria-label="菜单"
          aria-expanded={open}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute left-0 right-0 top-14 sm:top-16 mx-3 rounded-2xl glass-card p-2 flex flex-col gap-0.5 shadow-2xl shadow-black/40"
          >
            <MobileNavItem active={isHome} onClick={() => { goHome(); setOpen(false); }}>
              探索
            </MobileNavItem>
            <MobileNavItem active={isUpload} onClick={() => { goUpload(); setOpen(false); }}>
              发布
            </MobileNavItem>
            {session?.user ? (
              <>
                <div className="px-3 py-2 text-[12px] text-white/45 truncate border-t border-white/[0.06] mt-1 pt-3">
                  {session.user.name || session.user.email}
                </div>
                <MobileNavItem onClick={() => { signOut(); setOpen(false); }}>
                  退出登录
                </MobileNavItem>
              </>
            ) : (
              <MobileNavItem onClick={() => { openAuth("login"); setOpen(false); }}>
                登录 / 注册
              </MobileNavItem>
            )}
            <button
              type="button"
              onClick={() => { goUpload(); setOpen(false); }}
              className="btn-primary w-full text-sm font-medium px-3 py-2.5 mt-2"
            >
              发布技能
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavButton({
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
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] transition-colors",
        active ? "bg-white/10 text-white" : "text-white/55 hover:text-white hover:bg-white/[0.05]"
      )}
    >
      {icon}
      {children}
    </button>
  );
}

function MobileNavItem({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
        active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/[0.05]"
      )}
    >
      {children}
    </button>
  );
}
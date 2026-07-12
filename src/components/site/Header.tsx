"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, Upload, Github, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNav } from "@/store/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const { view, goHome, goUpload } = useNav();
  const [open, setOpen] = useState(false);

  const isHome = view.name === "home";
  const isUpload = view.name === "upload";

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="absolute inset-0 backdrop-blur-xl bg-background/60 border-b border-white/[0.06]" />
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <button onClick={goHome} className="group flex items-center gap-2.5">
          <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Sparkles className="h-4 w-4 text-white" />
            <div className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Skillary
          </span>
          <span className="hidden sm:inline rounded-full chip px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-medium">
            Beta
          </span>
        </button>

        {/* Center nav (desktop) */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <NavButton active={isHome} onClick={goHome} icon={<Search className="h-3.5 w-3.5" />}>
            探索
          </NavButton>
          <NavButton active={isUpload} onClick={goUpload} icon={<Upload className="h-3.5 w-3.5" />}>
            发布
          </NavButton>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] text-white/60 hover:text-white transition-colors"
          >
            <Github className="h-3.5 w-3.5" /> 文档
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={goUpload}
            className="rounded-lg bg-white text-black text-[13px] font-medium px-3.5 py-1.5 hover:bg-white/90 transition-colors"
          >
            发布技能
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg chip"
          onClick={() => setOpen((v) => !v)}
          aria-label="菜单"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute left-0 right-0 top-16 mx-3 rounded-2xl glass-card p-3 flex flex-col gap-1"
          >
            <button
              onClick={() => { goHome(); setOpen(false); }}
              className={cn("rounded-lg px-3 py-2 text-left text-sm", isHome ? "bg-white/10 text-white" : "text-white/70")}
            >
              探索
            </button>
            <button
              onClick={() => { goUpload(); setOpen(false); }}
              className={cn("rounded-lg px-3 py-2 text-left text-sm", isUpload ? "bg-white/10 text-white" : "text-white/70")}
            >
              发布
            </button>
            <button
              onClick={() => { goUpload(); setOpen(false); }}
              className="rounded-lg bg-white text-black text-sm font-medium px-3 py-2 mt-1"
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
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] transition-colors",
        active ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
      )}
    >
      {icon}
      {children}
    </button>
  );
}

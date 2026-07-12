"use client";

import { create } from "zustand";

export type View =
  | { name: "home" }
  | { name: "detail"; slug: string }
  | { name: "upload" };

interface NavState {
  view: View;
  /** Optional search query carried from home → results */
  query: string;
  /** Optional category filter */
  category: string | null;
  /** Skill id pending install (drives the install modal) */
  installSkillSlug: string | null;
  goHome: () => void;
  goDetail: (slug: string) => void;
  goUpload: () => void;
  setQuery: (q: string) => void;
  setCategory: (c: string | null) => void;
  openInstall: (slug: string) => void;
  closeInstall: () => void;
}

export const useNav = create<NavState>((set) => ({
  view: { name: "home" },
  query: "",
  category: null,
  installSkillSlug: null,
  goHome: () => {
    set({ view: { name: "home" } });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  },
  goDetail: (slug) => {
    set({ view: { name: "detail", slug } });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  },
  goUpload: () => {
    set({ view: { name: "upload" } });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  },
  setQuery: (q) => set({ query: q }),
  setCategory: (c) => set({ category: c }),
  openInstall: (slug) => set({ installSkillSlug: slug }),
  closeInstall: () => set({ installSkillSlug: null }),
}));

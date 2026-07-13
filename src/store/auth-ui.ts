import { create } from "zustand";

type AuthTab = "login" | "register";

interface AuthUIState {
  open: boolean;
  tab: AuthTab;
  openAuth: (tab?: AuthTab) => void;
  closeAuth: () => void;
}

export const useAuthUI = create<AuthUIState>((set) => ({
  open: false,
  tab: "login",
  openAuth: (tab = "login") => set({ open: true, tab }),
  closeAuth: () => set({ open: false }),
}));
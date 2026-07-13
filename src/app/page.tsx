"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { MouseGlow } from "@/components/site/MouseGlow";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HomePage } from "@/components/pages/HomePage";
import { UploadPage } from "@/components/pages/UploadPage";
import { InstallModal } from "@/components/pages/InstallModal";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { AuthModal } from "@/components/site/AuthModal";
import { useNav } from "@/store/nav";
import { useAuthUI } from "@/store/auth-ui";

function GlobalAuthModal() {
  const { open, tab, closeAuth } = useAuthUI();
  return <AuthModal open={open} onClose={closeAuth} defaultTab={tab} />;
}

export default function Home() {
  const view = useNav((s) => s.view);

  return (
    <AuthProvider>
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />
      <div className="relative z-[2] flex min-h-screen flex-1 flex-col">
      <Header />

      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={view.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {view.name === "home" && <HomePage />}
            {view.name === "upload" && <UploadPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <MouseGlow />
      </div>
      <InstallModal />
      <GlobalAuthModal />
    </div>
    </AuthProvider>
  );
}

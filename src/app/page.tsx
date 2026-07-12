"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { MouseGlow } from "@/components/site/MouseGlow";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HomePage } from "@/components/pages/HomePage";
import { DetailPage } from "@/components/pages/DetailPage";
import { UploadPage } from "@/components/pages/UploadPage";
import { InstallModal } from "@/components/pages/InstallModal";
import { useNav } from "@/store/nav";

export default function Home() {
  const view = useNav((s) => s.view);

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />
      <MouseGlow />
      <Header />

      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={view.name + (view.name === "detail" ? view.slug : "")}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {view.name === "home" && <HomePage />}
            {view.name === "detail" && <DetailPage slug={view.slug} />}
            {view.name === "upload" && <UploadPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <InstallModal />
    </div>
  );
}

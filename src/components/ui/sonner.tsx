"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="dark"
    position="top-center"
    richColors
    closeButton
    toastOptions={{
      classNames: {
        toast:
          "group toast glass-card border border-white/10 text-white shadow-xl",
        title: "text-[13px] font-medium",
        description: "text-[12px] text-white/60",
      },
    }}
    {...props}
  />
);

export { Toaster };

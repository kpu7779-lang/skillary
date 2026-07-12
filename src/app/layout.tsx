import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skillary — AI 技能市场，一键安装即用",
  description:
    "人人都能用的 AI 技能市场。从编程到写作、从学习到生活，找到合适的 AI 技能，一键安装，立即使用。支持 Claude Code、Cursor、通义千问、智谱 GLM、Kimi。",
  keywords: [
    "AI 技能",
    "AI Skills",
    "Claude 技能",
    "Cursor 技能",
    "通义千问",
    "智谱 GLM",
    "Kimi",
    "AI 技能市场",
    "Skillary",
    "AI 工具",
  ],
  authors: [{ name: "Skillary" }],
  openGraph: {
    title: "Skillary — AI 技能市场",
    description:
      "人人都能用的 AI 技能市场。一键发现、安装、使用 AI 技能。",
    siteName: "Skillary",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skillary — AI 技能市场",
    description: "人人都能用的 AI 技能市场。一键发现、安装、使用 AI 技能。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

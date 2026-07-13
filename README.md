# Skillary · CN

AI 技能市场（中文版）— 完整项目目录。

## 目录结构

```
skillary·cn/
├── src/              Next.js 源码（页面、组件、API）
├── prisma/           数据库 schema 与 dev.db
├── public/           静态资源（logo、背景视频等）
├── static/           纯静态版 SPA（无需 Node，可单独预览 UI）
├── 启动网站.bat      启动完整版（Next.js + API，端口 3000）
├── 启动静态站.bat    启动静态预览（端口 8765）
└── package.json      依赖配置
```

## 快速开始

### 完整版（推荐）

双击 **`启动网站.bat`**，或：

```bash
npm install --legacy-peer-deps
npx prisma@6.11.1 db push
npx prisma@6.11.1 generate
npm run dev
```

访问 http://localhost:3000

### 静态预览版

双击 **`启动静态站.bat`**，访问 http://localhost:8765

> 静态版 UI 预览；登录、发布等需配合完整版 API（3000 端口）。

## 功能说明

- 探索 / 搜索 AI Skills
- 用户注册登录（NextAuth）
- Skill 发布与安装
- Stitch 动态背景 + 鼠标光晕跟随
- 精选 Skill 翻转卡片

## 技术栈

- Next.js 16 · React · TypeScript
- Tailwind CSS · Framer Motion
- Prisma · SQLite
- NextAuth.js
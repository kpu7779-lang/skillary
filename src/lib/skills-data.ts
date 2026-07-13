/**
 * Mock dataset for the AI Skills Marketplace MVP.
 * 全中文内容，覆盖全年龄段用户（儿童 / 学生 / 职场 / 创作者 / 开发者 / 银发族）。
 */

export type Platform =
  | "claude-code"
  | "cursor"
  | "codex"
  | "qwen"
  | "glm"
  | "kimi";

export type SkillCategory =
  | "coding"
  | "design"
  | "writing"
  | "learning"
  | "data"
  | "lifestyle"
  | "office"
  | "agent";

export interface Skill {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  author: string;
  authorAvatarColor: string;
  category: SkillCategory;
  /** 适合人群标签 */
  audience: string;
  tags: string[];
  version: string;
  updatedAt: string;
  platforms: Platform[];
  price: number;
  downloads: number;
  favorites: number;
  rating: number;
  reviewsCount: number;
  featured: boolean;
  trending: boolean;
  isNew: boolean;
  accent: string;
  readme: string;
  installCommands: Partial<Record<Platform, string>>;
  changelog: { version: string; date: string; notes: string[] }[];
  reviews: {
    author: string;
    avatarColor: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  beforeAfter?: { before: string; after: string };
}

export const PLATFORM_META: Record<
  Platform,
  { label: string; short: string; color: string }
> = {
  "claude-code": { label: "Claude Code", short: "CC", color: "#d97757" },
  cursor: { label: "Cursor", short: "CR", color: "#6f7bff" },
  codex: { label: "Codex", short: "CX", color: "#10a37f" },
  qwen: { label: "通义千问", short: "QW", color: "#a855f7" },
  glm: { label: "智谱 GLM", short: "GL", color: "#3b82f6" },
  kimi: { label: "Kimi", short: "KM", color: "#ec4899" },
};

export const CATEGORY_META: Record<
  SkillCategory,
  { label: string; short: string; icon: string; desc: string }
> = {
  coding: { label: "编程", short: "编程", icon: "Code2", desc: "代码生成、规则、测试" },
  design: { label: "设计", short: "设计", icon: "Palette", desc: "绘图提示词、设计系统" },
  writing: { label: "写作", short: "写作", icon: "PenLine", desc: "文案、脚本、润色" },
  learning: { label: "学习", short: "学习", icon: "GraduationCap", desc: "作业辅导、语言、研究" },
  data: { label: "数据", short: "数据", icon: "Database", desc: "表格、数据库、分析" },
  lifestyle: { label: "生活", short: "生活", icon: "Heart", desc: "健康、旅行、日常" },
  office: { label: "办公", short: "办公", icon: "Briefcase", desc: "会议、PPT、邮件" },
  agent: { label: "智能体", short: "智能体", icon: "Bot", desc: "多智能体、自动化流程" },
};

const G = {
  violet: "from-violet-500 to-fuchsia-500",
  indigo: "from-indigo-500 to-blue-500",
  cyan: "from-cyan-400 to-teal-500",
  amber: "from-amber-400 to-orange-500",
  rose: "from-rose-500 to-pink-500",
  emerald: "from-emerald-400 to-green-600",
  sky: "from-sky-400 to-indigo-500",
  purple: "from-purple-500 to-indigo-600",
};

export const SKILLS: Skill[] = [
  // ==================== 学习（4个，覆盖儿童→研究者）====================
  {
    id: "1",
    slug: "homework-helper",
    title: "作业辅导小助手",
    tagline: "拍下题目，逐步讲解，不直接给答案。",
    description:
      "适合小学生的作业辅导技能。拍下数学、语文、英语题目，AI 会一步步讲解思路，引导孩子自己找到答案，而不是直接给出结果。",
    author: "成长学堂",
    authorAvatarColor: G.amber,
    category: "learning",
    audience: "小学生 · 家长",
    tags: ["作业辅导", "小学", "数学", "语文"],
    version: "1.2.0",
    updatedAt: "2026-07-09",
    platforms: ["glm", "qwen", "kimi"],
    price: 0,
    downloads: 89200,
    favorites: 12300,
    rating: 4.9,
    reviewsCount: 1840,
    featured: true,
    trending: true,
    isNew: false,
    accent: G.amber,
    readme: `# 作业辅导小助手

拍下题目，AI 一步步讲解思路，**不直接给答案**。

## 适合谁
- 小学生（1-6 年级）
- 想辅导孩子但不知从何下手的家长

## 怎么用
1. 打开 AI 助手
2. 拍下作业题目
3. AI 会问引导问题，帮孩子自己想出答案

## 支持科目
- 数学（含应用题、几何）
- 语文（阅读理解、作文指导）
- 英语（单词、语法）

\`\`\`bash
glm skill add homework-helper
\`\`\``,
    installCommands: {
      glm: "glm skill add homework-helper",
      qwen: "qwen skill add homework-helper",
      kimi: "kimi skill add homework-helper",
    },
    changelog: [
      {
        version: "1.2.0",
        date: "2026-07-09",
        notes: ["新增英语科目支持", "优化低年级题目的引导语气"],
      },
      {
        version: "1.1.0",
        date: "2026-06-20",
        notes: ["新增拍照识别功能", "支持手写体识别"],
      },
    ],
    reviews: [
      {
        author: "乐乐妈妈",
        avatarColor: G.rose,
        rating: 5,
        date: "2026-07-08",
        comment: "孩子三年级，以前辅导作业鸡飞狗跳。现在 AI 引导他自己想，省心多了。",
      },
      {
        author: "王老师",
        avatarColor: G.emerald,
        rating: 5,
        date: "2026-07-05",
        comment: "推荐给班上家长用了，不直接给答案这点很好，符合教育理念。",
      },
    ],
    beforeAfter: {
      before: "孩子：\"这道题不会。\" 家长：\"答案是 12。\"（孩子下次还是不会）",
      after: "AI：\"我们先看看题目要求什么……你觉得第一步该做什么？\"",
    },
  },
  {
    id: "2",
    slug: "picture-book-story",
    title: "绘本故事生成器",
    tagline: "说一个主题，AI 生成带插图的儿童故事。",
    description:
      "输入一个主题（如\"勇敢的小兔子\"），AI 自动生成完整的绘本故事，包含分页文字描述和插图提示词，可直接用于 AI 绘画工具生成插图。",
    author: "童趣工坊",
    authorAvatarColor: G.rose,
    category: "learning",
    audience: "儿童 · 家长 · 幼教",
    tags: ["绘本", "故事", "儿童", "创作"],
    version: "2.0.1",
    updatedAt: "2026-07-10",
    platforms: ["glm", "kimi", "qwen"],
    price: 0,
    downloads: 45600,
    favorites: 8900,
    rating: 4.8,
    reviewsCount: 670,
    featured: false,
    trending: true,
    isNew: true,
    accent: G.rose,
    readme: `# 绘本故事生成器

说一个主题，AI 帮你写一本完整的儿童绘本。

## 输出内容
- 完整故事文本（分 8-12 页）
- 每页的插图描述（可用于 AI 绘画）
- 适合年龄建议
- 教育寓意总结

## 使用示例
"帮我写一个关于'学会分享'的绘本，主角是小熊，适合 4-6 岁。"

\`\`\`bash
glm skill add picture-book-story
\`\`\``,
    installCommands: {
      glm: "glm skill add picture-book-story",
      kimi: "kimi skill add picture-book-story",
      qwen: "qwen skill add picture-book-story",
    },
    changelog: [
      {
        version: "2.0.1",
        date: "2026-07-10",
        notes: ["新增插图提示词输出", "支持自定义主角和主题"],
      },
    ],
    reviews: [
      {
        author: "朵朵爸爸",
        avatarColor: G.amber,
        rating: 5,
        date: "2026-07-09",
        comment: "女儿每天睡前要听新故事，这个技能救了我。插图提示词还能配合画画工具用。",
      },
    ],
    beforeAfter: {
      before: "家长临时编故事，讲到一半卡壳，孩子不满意。",
      after: "30 秒生成完整绘本，有文字有插图描述，孩子听得很开心。",
    },
  },
  {
    id: "3",
    slug: "english-speaking-coach",
    title: "英语口语陪练",
    tagline: "像真人外教一样，陪你练口语，随时纠正发音。",
    description:
      "适合学生和职场人士的英语口语练习技能。AI 扮演对话场景（点餐、面试、闲聊），实时纠正语法和用词，给出更地道的表达方式。",
    author: "语言星球",
    authorAvatarColor: G.cyan,
    category: "learning",
    audience: "学生 · 职场",
    tags: ["英语", "口语", "练习", "对话"],
    version: "3.4.0",
    updatedAt: "2026-07-06",
    platforms: ["kimi", "glm", "qwen"],
    price: 0,
    downloads: 67800,
    favorites: 9800,
    rating: 4.7,
    reviewsCount: 920,
    featured: false,
    trending: true,
    isNew: false,
    accent: G.cyan,
    readme: `# 英语口语陪练

像真人外教一样陪你练口语。

## 练习场景
- 日常对话（点餐、购物、问路）
- 职场场景（面试、会议、邮件）
- 自由聊天（兴趣、旅行、新闻）

## 特色
- 实时纠正语法错误
- 给出更地道的表达方式
- 可调节难度（初学者 / 中级 / 高级）
- 支持中英对照

\`\`\`bash
kimi skill add english-speaking-coach
\`\`\``,
    installCommands: {
      kimi: "kimi skill add english-speaking-coach",
      glm: "glm skill add english-speaking-coach",
      qwen: "qwen skill add english-speaking-coach",
    },
    changelog: [
      {
        version: "3.4.0",
        date: "2026-07-06",
        notes: ["新增面试场景库", "优化发音纠错提示"],
      },
    ],
    reviews: [
      {
        author: "考研的小林",
        avatarColor: G.indigo,
        rating: 5,
        date: "2026-07-04",
        comment: "考研复试前用了两周，每天练 30 分钟。比报班方便多了，而且不紧张。",
      },
    ],
    beforeAfter: {
      before: "I want to go to restaurant.（语法生硬）",
      after: "AI 纠正：\"I'd like to grab a bite.\" 更地道。",
    },
  },
  {
    id: "4",
    slug: "literature-review",
    title: "论文文献综述助手",
    tagline: "输入主题，自动检索、整理、生成结构化文献综述。",
    description:
      "面向研究生和科研人员的文献综述技能。输入研究主题，AI 自动检索相关文献，提取核心观点，生成结构化的综述框架和引用列表。",
    author: "学术工坊",
    authorAvatarColor: G.indigo,
    category: "learning",
    audience: "研究生 · 科研人员",
    tags: ["论文", "文献综述", "研究", "学术"],
    version: "1.5.2",
    updatedAt: "2026-07-07",
    platforms: ["claude-code", "glm", "kimi"],
    price: 29,
    downloads: 12300,
    favorites: 3400,
    rating: 4.8,
    reviewsCount: 280,
    featured: true,
    trending: false,
    isNew: true,
    accent: G.indigo,
    readme: `# 论文文献综述助手

输入研究主题，自动生成结构化文献综述。

## 功能
- 自动检索相关文献（支持中英文数据库）
- 提取每篇文献的核心观点
- 按主题/时间/方法分类整理
- 生成综述框架和引用列表（APA / GB/T 7714）
- 标注文献质量评分

\`\`\`bash
claude skill add literature-review
\`\`\``,
    installCommands: {
      "claude-code": "claude skill add literature-review",
      glm: "glm skill add literature-review",
      kimi: "kimi skill add literature-review",
    },
    changelog: [
      {
        version: "1.5.2",
        date: "2026-07-07",
        notes: ["新增 GB/T 7714 引用格式", "文献去重准确率提升 30%"],
      },
    ],
    reviews: [
      {
        author: "博士生小陈",
        avatarColor: G.purple,
        rating: 5,
        date: "2026-07-05",
        comment: "开题报告的文献综述，原来要两周，现在一天搞定框架。引用格式也规范。",
      },
    ],
    beforeAfter: {
      before: "手动检索 50 篇文献，逐篇阅读，耗时两周。",
      after: "AI 检索 + 分类 + 框架生成，2 小时出初稿。",
    },
  },

  // ==================== 写作（2个）====================
  {
    id: "5",
    slug: "short-video-script",
    title: "短视频脚本生成器",
    tagline: "输入主题，30 秒生成抖音/小红书短视频脚本。",
    description:
      "面向内容创作者的短视频脚本技能。输入主题和时长，AI 生成完整的分镜脚本，包含画面描述、旁白文案、字幕和BGM建议。",
    author: "创作星球",
    authorAvatarColor: G.rose,
    category: "writing",
    audience: "创作者 · 自媒体",
    tags: ["短视频", "脚本", "抖音", "自媒体"],
    version: "2.1.0",
    updatedAt: "2026-07-08",
    platforms: ["kimi", "glm", "qwen"],
    price: 0,
    downloads: 56000,
    favorites: 11200,
    rating: 4.7,
    reviewsCount: 780,
    featured: true,
    trending: true,
    isNew: false,
    accent: G.rose,
    readme: `# 短视频脚本生成器

30 秒生成一个完整的短视频脚本。

## 输出内容
- 分镜脚本（画面描述 + 时长）
- 旁白文案（口语化、有钩子）
- 字幕文案（含表情符号建议）
- BGM 风格建议
- 标题和话题标签

## 支持平台
- 抖音 / TikTok
- 小红书
- B 站
- 视频号

\`\`\`bash
kimi skill add short-video-script
\`\`\``,
    installCommands: {
      kimi: "kimi skill add short-video-script",
      glm: "glm skill add short-video-script",
      qwen: "qwen skill add short-video-script",
    },
    changelog: [
      {
        version: "2.1.0",
        date: "2026-07-08",
        notes: ["新增视频号脚本模板", "优化开场钩子文案"],
      },
    ],
    reviews: [
      {
        author: "百万粉博主阿杰",
        avatarColor: G.amber,
        rating: 5,
        date: "2026-07-06",
        comment: "以前写脚本要 2 小时，现在 5 分钟出初稿，再改改就能拍。效率翻倍。",
      },
    ],
    beforeAfter: {
      before: "面对镜头不知道说什么，拍 10 条废 9 条。",
      after: "脚本有分镜、有旁白、有钩子，一条过。",
    },
  },
  {
    id: "6",
    slug: "xiaohongshu-copywriter",
    title: "小红书文案助手",
    tagline: "输入产品/话题，生成爆款小红书笔记文案。",
    description:
      "专为小红书创作者设计的文案技能。输入产品或话题，AI 生成符合小红书风格的笔记文案，包含标题、正文、Emoji、话题标签和互动引导。",
    author: "种草研究所",
    authorAvatarColor: G.rose,
    category: "writing",
    audience: "创作者 · 运营",
    tags: ["小红书", "文案", "种草", "营销"],
    version: "1.8.3",
    updatedAt: "2026-07-03",
    platforms: ["kimi", "glm"],
    price: 0,
    downloads: 43200,
    favorites: 8700,
    rating: 4.6,
    reviewsCount: 560,
    featured: false,
    trending: true,
    isNew: false,
    accent: G.violet,
    readme: `# 小红书文案助手

生成符合小红书风格的爆款笔记文案。

## 输出内容
- 标题（含钩子和数字）
- 正文（口语化、分段、Emoji）
- 话题标签（# 格式）
- 互动引导文案
- 配图建议

\`\`\`bash
kimi skill add xiaohongshu-copywriter
\`\`\``,
    installCommands: {
      kimi: "kimi skill add xiaohongshu-copywriter",
      glm: "glm skill add xiaohongshu-copywriter",
    },
    changelog: [
      {
        version: "1.8.3",
        date: "2026-07-03",
        notes: ["优化标题钩子模板", "新增美妆/美食/旅行分类"],
      },
    ],
    reviews: [
      {
        author: "运营小美",
        avatarColor: G.cyan,
        rating: 4,
        date: "2026-07-01",
        comment: "文案风格很对味，就是偶尔 Emoji 太多了，需要手动删一些。",
      },
    ],
  },

  // ==================== 办公（2个）====================
  {
    id: "7",
    slug: "meeting-notes-generator",
    title: "会议纪要一键生成",
    tagline: "粘贴会议录音转写文本，30 秒出结构化纪要。",
    description:
      "面向职场人士的会议纪要技能。粘贴会议录音的转写文本，AI 自动提取议题、讨论要点、决策结论和待办事项，生成结构清晰的会议纪要。",
    author: "效率工坊",
    authorAvatarColor: G.indigo,
    category: "office",
    audience: "职场 · 管理",
    tags: ["会议纪要", "办公", "效率", "职场"],
    version: "2.3.0",
    updatedAt: "2026-07-05",
    platforms: ["kimi", "glm", "qwen", "claude-code"],
    price: 0,
    downloads: 78900,
    favorites: 15600,
    rating: 4.8,
    reviewsCount: 1200,
    featured: true,
    trending: true,
    isNew: false,
    accent: G.indigo,
    readme: `# 会议纪要一键生成

粘贴录音转写文本，30 秒出结构化纪要。

## 输出内容
- 会议基本信息（时间、参会人）
- 议题列表
- 讨论要点摘要
- 决策结论
- 待办事项（含负责人和截止日期）
- 下次会议建议

\`\`\`bash
kimi skill add meeting-notes-generator
\`\`\``,
    installCommands: {
      kimi: "kimi skill add meeting-notes-generator",
      glm: "glm skill add meeting-notes-generator",
      qwen: "qwen skill add meeting-notes-generator",
      "claude-code": "claude skill add meeting-notes-generator",
    },
    changelog: [
      {
        version: "2.3.0",
        date: "2026-07-05",
        notes: ["新增待办事项自动提取", "支持识别多人发言"],
      },
    ],
    reviews: [
      {
        author: "项目经理老张",
        avatarColor: G.emerald,
        rating: 5,
        date: "2026-07-04",
        comment: "每周三个会，以前整理纪要要半天。现在粘贴进去就行，待办事项还自动分配。",
      },
      {
        author: "行政小李",
        avatarColor: G.amber,
        rating: 5,
        date: "2026-07-02",
        comment: "领导说纪要写得比以前清楚多了。其实不是我变厉害了，是 AI 厉害了。",
      },
    ],
    beforeAfter: {
      before: "1 小时会议录音，手动整理纪要 2 小时，遗漏重点。",
      after: "粘贴转写文本，30 秒出结构化纪要，待办事项一目了然。",
    },
  },
  {
    id: "8",
    slug: "ppt-outline-generator",
    title: "PPT 大纲与内容生成",
    tagline: "输入主题，生成完整 PPT 大纲和每页内容。",
    description:
      "面向职场人士和学生的 PPT 制作技能。输入演示主题和受众，AI 生成完整的 PPT 大纲、每页标题、要点内容和演讲备注，可直接导入 PPT 工具。",
    author: "演示工坊",
    authorAvatarColor: G.violet,
    category: "office",
    audience: "职场 · 学生",
    tags: ["PPT", "演示", "大纲", "办公"],
    version: "1.6.0",
    updatedAt: "2026-07-02",
    platforms: ["kimi", "glm", "qwen"],
    price: 15,
    downloads: 34500,
    favorites: 7200,
    rating: 4.7,
    reviewsCount: 450,
    featured: false,
    trending: false,
    isNew: false,
    accent: G.violet,
    readme: `# PPT 大纲与内容生成

输入主题，生成完整 PPT 大纲和每页内容。

## 输出内容
- PPT 整体结构（开头-主体-结尾）
- 每页标题和要点
- 演讲备注（口播稿）
- 配图建议
- 适合的图表类型

\`\`\`bash
kimi skill add ppt-outline-generator
\`\`\``,
    installCommands: {
      kimi: "kimi skill add ppt-outline-generator",
      glm: "glm skill add ppt-outline-generator",
      qwen: "qwen skill add ppt-outline-generator",
    },
    changelog: [
      {
        version: "1.6.0",
        date: "2026-07-02",
        notes: ["新增演讲备注生成", "支持自定义页数"],
      },
    ],
    reviews: [
      {
        author: "销售总监老王",
        avatarColor: G.rose,
        rating: 5,
        date: "2026-06-30",
        comment: "客户提案的 PPT，以前要做两天，现在半天搞定。内容逻辑还很清晰。",
      },
    ],
  },

  // ==================== 数据（2个）====================
  {
    id: "9",
    slug: "excel-formula-explainer",
    title: "Excel 公式解释器",
    tagline: "看不懂的 Excel 公式，粘贴进来，用人话解释给你听。",
    description:
      "面向所有 Excel 用户的公式解释技能。粘贴任何 Excel 公式，AI 用大白话逐层解释公式含义，并给出优化建议和替代方案。适合不熟悉公式的人群。",
    author: "表格助手",
    authorAvatarColor: G.emerald,
    category: "data",
    audience: "通用 · 职场",
    tags: ["Excel", "公式", "表格", "办公"],
    version: "1.3.0",
    updatedAt: "2026-07-04",
    platforms: ["kimi", "glm", "qwen"],
    price: 0,
    downloads: 52100,
    favorites: 9800,
    rating: 4.8,
    reviewsCount: 690,
    featured: true,
    trending: false,
    isNew: true,
    accent: G.emerald,
    readme: `# Excel 公式解释器

看不懂的 Excel 公式，用人话解释给你听。

## 怎么用
1. 复制 Excel 公式
2. 粘贴到对话框
3. AI 逐层解释含义，给出优化建议

## 示例
粘贴 \`=IFERROR(VLOOKUP(A2,Sheet2!A:D,4,FALSE),"未找到")\`
AI 解释：\"在 Sheet2 表的 A 列查找 A2 的值，找到后返回第 4 列的内容。如果找不到，显示'未找到'。\"`,
    installCommands: {
      kimi: "kimi skill add excel-formula-explainer",
      glm: "glm skill add excel-formula-explainer",
      qwen: "qwen skill add excel-formula-explainer",
    },
    changelog: [
      {
        version: "1.3.0",
        date: "2026-07-04",
        notes: ["新增公式优化建议", "支持数组公式解释"],
      },
    ],
    reviews: [
      {
        author: "财务小刘",
        avatarColor: G.amber,
        rating: 5,
        date: "2026-07-03",
        comment: "接手前任的表格，公式层层嵌套看不懂。粘贴进来一解释就明白了，救命。",
      },
    ],
    beforeAfter: {
      before: "=IFERROR(VLOOKUP(A2,Sheet2!A:D,4,FALSE),\"未找到\") —— 看不懂",
      after: "AI：在 Sheet2 表查找 A2 的值，返回第 4 列。找不到显示\"未找到\"。",
    },
  },
  {
    id: "10",
    slug: "prisma-schema-doctor",
    title: "Prisma 数据库医生",
    tagline: "诊断并修复 Prisma Schema 问题，上线前必跑。",
    description:
      "面向开发者的 Prisma 数据库 Schema 诊断技能。检测 N+1 查询、缺失索引、不安全的级联删除，并生成带回滚方案的迁移建议。",
    author: "DB 工坊",
    authorAvatarColor: G.emerald,
    category: "data",
    audience: "开发者",
    tags: ["Prisma", "数据库", "PostgreSQL", "性能"],
    version: "1.8.0",
    updatedAt: "2026-07-08",
    platforms: ["claude-code", "cursor", "codex"],
    price: 0,
    downloads: 31420,
    favorites: 3980,
    rating: 4.8,
    reviewsCount: 201,
    featured: false,
    trending: true,
    isNew: true,
    accent: G.emerald,
    readme: `# Prisma 数据库医生

诊断 Prisma Schema 的性能、安全、正确性问题。

## 检测项
- 索引覆盖分析
- 级联删除风险
- N+1 查询模式
- 迁移方案生成（带回滚）

\`\`\`bash
claude skill add prisma-schema-doctor
\`\`\``,
    installCommands: {
      "claude-code": "claude skill add prisma-schema-doctor",
      cursor: "npx skillary install prisma-schema-doctor",
      codex: "codex skill install prisma-schema-doctor",
    },
    changelog: [
      {
        version: "1.8.0",
        date: "2026-07-08",
        notes: ["新增 MySQL 和 MongoDB 支持", "Schema 解析速度提升"],
      },
    ],
    reviews: [
      {
        author: "后端老马",
        avatarColor: G.indigo,
        rating: 5,
        date: "2026-07-06",
        comment: "上线前跑了一遍，发现一个缺失索引，救了线上性能。",
      },
    ],
    beforeAfter: {
      before: "Schema 静默允许级联删除 User.posts",
      after: "医生标记风险，建议 restrict + 显式清理任务",
    },
  },

  // ==================== 编程（2个）====================
  {
    id: "11",
    slug: "cursor-rules-architect",
    title: "Cursor 规则架构师",
    tagline: "30 秒为你的代码库生成专业的 .cursor/rules。",
    description:
      "面向 Cursor 用户的规则生成技能。分析你的代码库结构、技术栈和编码规范，自动生成模块化、可复用的 .cursor/rules 文件，让 Cursor 在大型重构中保持一致。",
    author: "Linear Labs",
    authorAvatarColor: G.violet,
    category: "coding",
    audience: "开发者",
    tags: ["Cursor", "规则", "重构", "规范"],
    version: "2.4.1",
    updatedAt: "2026-07-04",
    platforms: ["cursor", "claude-code"],
    price: 0,
    downloads: 48230,
    favorites: 5120,
    rating: 4.9,
    reviewsCount: 312,
    featured: true,
    trending: true,
    isNew: false,
    accent: G.violet,
    readme: `# Cursor 规则架构师

30 秒为你的代码库生成专业的 .cursor/rules。

## 功能
- 扫描代码库，检测框架、Lint、测试规范
- 生成模块化规则文件（命名、结构、测试、依赖）
- 通过共享 :imports 保持规则 DRY

\`\`\`bash
npx skillary install cursor-rules-architect
\`\`\``,
    installCommands: {
      cursor: "npx skillary install cursor-rules-architect",
      "claude-code": "claude skill add cursor-rules-architect",
    },
    changelog: [
      {
        version: "2.4.1",
        date: "2026-07-04",
        notes: ["代码库扫描速度提升 3 倍", "更好的 Monorepo 检测"],
      },
    ],
    reviews: [
      {
        author: "前端老陈",
        avatarColor: G.indigo,
        rating: 5,
        date: "2026-07-02",
        comment: "Cursor 幻觉少了一半。规则严格而且可以版本管理。",
      },
    ],
    beforeAfter: {
      before: "Cursor 忽略项目规范，CJS/ESM 混用",
      after: "Cursor 强制 ESM、命名导出、测试同目录",
    },
  },
  {
    id: "12",
    slug: "test-generator-pro",
    title: "代码测试生成器",
    tagline: "为你的代码生成能跑通的测试，不是模板。",
    description:
      "面向开发者的测试生成技能。读取源代码和已有测试，生成有意义、能通过的测试用例——不是模板代码。自动检测测试框架（Vitest / Jest / Playwright）。",
    author: "QA 工坊",
    authorAvatarColor: G.cyan,
    category: "coding",
    audience: "开发者",
    tags: ["测试", "Vitest", "Playwright", "覆盖率"],
    version: "2.0.0",
    updatedAt: "2026-07-01",
    platforms: ["claude-code", "cursor", "codex"],
    price: 0,
    downloads: 27510,
    favorites: 3010,
    rating: 4.7,
    reviewsCount: 178,
    featured: false,
    trending: false,
    isNew: false,
    accent: G.cyan,
    readme: `# 代码测试生成器

生成能跑通、有意义的测试。

## 功能
- 自动检测测试框架
- 复用已有 fixtures 和 helpers
- 优先覆盖未测分支
- 沙箱运行 + 自动修复

\`\`\`bash
claude skill add test-generator-pro
\`\`\``,
    installCommands: {
      "claude-code": "claude skill add test-generator-pro",
      cursor: "npx skillary install test-generator-pro",
      codex: "codex skill install test-generator-pro",
    },
    changelog: [
      {
        version: "2.0.0",
        date: "2026-07-01",
        notes: ["测试自修复功能", "Playwright 支持"],
      },
    ],
    reviews: [
      {
        author: "测试工程师小赵",
        avatarColor: G.indigo,
        rating: 4,
        date: "2026-06-30",
        comment: "不错，就是有时对简单工具函数生成太多边界用例。",
      },
    ],
  },

  // ==================== 设计（2个）====================
  {
    id: "13",
    slug: "ai-art-prompt-master",
    title: "AI 绘画提示词大师",
    tagline: "用中文描述你想要的图，自动生成专业英文提示词。",
    description:
      "面向创作者和设计师的 AI 绘画提示词技能。用中文描述你想要的画面，AI 自动生成适配 Midjourney / Stable Diffusion / DALL-E 的专业英文提示词，含风格、构图、光影参数。",
    author: "视觉工坊",
    authorAvatarColor: G.purple,
    category: "design",
    audience: "创作者 · 设计师",
    tags: ["AI 绘画", "提示词", "Midjourney", "Stable Diffusion"],
    version: "2.2.0",
    updatedAt: "2026-07-09",
    platforms: ["kimi", "glm", "qwen"],
    price: 0,
    downloads: 91000,
    favorites: 18900,
    rating: 4.9,
    reviewsCount: 1560,
    featured: true,
    trending: true,
    isNew: true,
    accent: G.purple,
    readme: `# AI 绘画提示词大师

用中文描述，自动生成专业英文提示词。

## 支持平台
- Midjourney（v6）
- Stable Diffusion（SDXL / SD3）
- DALL-E 3
- Flux

## 输出内容
- 英文提示词（含风格、构图、光影）
- 负面提示词（Negative Prompt）
- 推荐参数（steps, cfg, aspect ratio）
- 风格参考图建议

\`\`\`bash
kimi skill add ai-art-prompt-master
\`\`\``,
    installCommands: {
      kimi: "kimi skill add ai-art-prompt-master",
      glm: "glm skill add ai-art-prompt-master",
      qwen: "qwen skill add ai-art-prompt-master",
    },
    changelog: [
      {
        version: "2.2.0",
        date: "2026-07-09",
        notes: ["新增 Flux 平台支持", "优化中国画风格提示词"],
      },
    ],
    reviews: [
      {
        author: "插画师小雨",
        avatarColor: G.rose,
        rating: 5,
        date: "2026-07-08",
        comment: "以前写英文提示词要查半天单词，现在用中文描述就行，出图质量还更高了。",
      },
    ],
    beforeAfter: {
      before: "中文：\"一个古风少女在桃花树下\" → 直译效果差",
      after: "AI 生成：ancient chinese girl, peach blossom, hanfu, soft light, 8k...",
    },
  },
  {
    id: "14",
    slug: "design-tokens-to-tailwind",
    title: "设计稿转 Tailwind",
    tagline: "Figma 设计变量一键转为 Tailwind 4 主题。",
    description:
      "面向前端工程师和设计师的技能。读取 Figma 设计变量（颜色、字体、间距、圆角），生成 Tailwind 4 CSS 主题和 TypeScript 类型定义，让设计稿和代码保持同步。",
    author: "Studio Form",
    authorAvatarColor: G.rose,
    category: "design",
    audience: "设计师 · 前端",
    tags: ["Figma", "Tailwind", "设计系统", "设计稿"],
    version: "3.1.2",
    updatedAt: "2026-07-09",
    platforms: ["cursor", "claude-code"],
    price: 19,
    downloads: 18920,
    favorites: 2410,
    rating: 4.9,
    reviewsCount: 142,
    featured: false,
    trending: false,
    isNew: true,
    accent: G.rose,
    readme: `# 设计稿转 Tailwind

Figma 设计变量 → Tailwind 4 主题，一键同步。

## 支持
- 颜色（纯色、渐变）
- 字体（字族、字号、字重、行高）
- 间距、圆角、阴影
- 亮色/暗色模式

\`\`\`bash
npx skillary install design-tokens-to-tailwind
\`\`\``,
    installCommands: {
      cursor: "npx skillary install design-tokens-to-tailwind",
      "claude-code": "claude skill add design-tokens-to-tailwind",
    },
    changelog: [
      {
        version: "3.1.2",
        date: "2026-07-09",
        notes: ["Tailwind 4 原生主题支持", "TypeScript 类型安全"],
      },
    ],
    reviews: [
      {
        author: "设计师范范",
        avatarColor: G.purple,
        rating: 5,
        date: "2026-07-07",
        comment: "终于不用手动同步 Figma 和代码了。改一次设计变量，前端自动更新。",
      },
    ],
  },

  // ==================== 生活（2个）====================
  {
    id: "15",
    slug: "healthy-diet-advisor",
    title: "健康饮食建议",
    tagline: "告诉 AI 你有什么食材，它帮你搭配营养餐。",
    description:
      "面向所有人的健康饮食技能。告诉 AI 冰箱里有什么食材、有什么饮食偏好或限制（如低糖、低盐），AI 生成营养均衡的菜谱建议，含步骤和营养信息。特别适合长辈使用。",
    author: "健康生活",
    authorAvatarColor: G.emerald,
    category: "lifestyle",
    audience: "通用 · 银发族",
    tags: ["健康", "饮食", "菜谱", "营养"],
    version: "1.4.0",
    updatedAt: "2026-07-06",
    platforms: ["kimi", "glm", "qwen"],
    price: 0,
    downloads: 64500,
    favorites: 14200,
    rating: 4.8,
    reviewsCount: 980,
    featured: true,
    trending: true,
    isNew: false,
    accent: G.emerald,
    readme: `# 健康饮食建议

告诉 AI 你有什么食材，它帮你搭配营养餐。

## 怎么用
1. 说出你有的食材（如"鸡蛋、西红柿、面条"）
2. 告诉 AI 你的饮食需求（如"低糖"、"老人吃"）
3. AI 生成 2-3 个菜谱建议，含步骤和营养信息

## 特色
- 营养均衡搭配
- 适合不同人群（老人、小孩、健身）
- 低油低盐选项
- 食材替代建议`,
    installCommands: {
      kimi: "kimi skill add healthy-diet-advisor",
      glm: "glm skill add healthy-diet-advisor",
      qwen: "qwen skill add healthy-diet-advisor",
    },
    changelog: [
      {
        version: "1.4.0",
        date: "2026-07-06",
        notes: ["新增营养信息标注", "优化长辈友好的菜谱推荐"],
      },
    ],
    reviews: [
      {
        author: "张阿姨",
        avatarColor: G.amber,
        rating: 5,
        date: "2026-07-05",
        comment: "每天不知道做什么菜，问问 AI 就行。还告诉我营养成分，老伴血糖高，很实用。",
      },
      {
        author: "健身的小王",
        avatarColor: G.cyan,
        rating: 5,
        date: "2026-07-03",
        comment: "增肌期用它搭配高蛋白餐，很方便。",
      },
    ],
    beforeAfter: {
      before: "冰箱里有鸡蛋和西红柿，不知道做什么。",
      after: "AI 建议：西红柿炒蛋 + 蛋花汤，附营养信息和步骤。",
    },
  },
  {
    id: "16",
    slug: "smart-chat-companion",
    title: "智能聊天伴侣",
    tagline: "随时陪你聊天、解答问题、解闷解忧。",
    description:
      "面向所有人（特别是长辈）的聊天陪伴技能。AI 可以陪你闲聊、回答生活问题、讲笑话、回忆往事、提醒事项。语气温暖耐心，适合不太会用科技产品的长辈日常使用。",
    author: "温暖科技",
    authorAvatarColor: G.rose,
    category: "lifestyle",
    audience: "银发族 · 通用",
    tags: ["聊天", "陪伴", "长辈", "日常"],
    version: "1.0.5",
    updatedAt: "2026-07-10",
    platforms: ["kimi", "glm", "qwen"],
    price: 0,
    downloads: 38700,
    favorites: 9600,
    rating: 4.9,
    reviewsCount: 720,
    featured: false,
    trending: true,
    isNew: true,
    accent: G.rose,
    readme: `# 智能聊天伴侣

随时陪你聊天、解答问题、解闷解忧。

## 能聊什么
- 日常闲聊（天气、新闻、趣事）
- 生活问题（怎么去除油渍、公交车路线）
- 回忆往事（老照片、老歌、老故事）
- 讲笑话、猜谜语
- 健康小贴士
- 用药提醒（需手动设置）

## 特色
- 语气温暖耐心，不嫌烦
- 支持语音输入（配合语音转文字）
- 用词简单，长辈也能听懂`,
    installCommands: {
      kimi: "kimi skill add smart-chat-companion",
      glm: "glm skill add smart-chat-companion",
      qwen: "qwen skill add smart-chat-companion",
    },
    changelog: [
      {
        version: "1.0.5",
        date: "2026-07-10",
        notes: ["优化长辈友好的对话语气", "新增方言识别（普通话/四川话/粤语）"],
      },
    ],
    reviews: [
      {
        author: "在外打工的小李",
        avatarColor: G.indigo,
        rating: 5,
        date: "2026-07-09",
        comment: "给妈妈装了这个，她每天跟 AI 聊天，说比看电视剧有意思。我在外地也放心了。",
      },
    ],
    beforeAfter: {
      before: "长辈一个人在家，没人说话，整天看电视。",
      after: "跟 AI 聊天解闷，还能问生活问题，心情好多了。",
    },
  },

  // ==================== 精选 Skill（首页翻转卡片）====================
  {
    id: "17",
    slug: "research-paper",
    title: "科研文献拆解与研究助手",
    tagline: "总结论文、提取方法、整理研究缺口、生成阅读笔记。",
    description:
      "面向科研人员与研究生，自动拆解论文结构，提炼方法与创新点，标注研究空白，并输出可复用的阅读笔记与综述提纲。",
    author: "学术工坊",
    authorAvatarColor: G.indigo,
    category: "learning",
    audience: "研究生 · 科研人员",
    tags: ["论文", "科研", "文献", "综述"],
    version: "1.2.0",
    updatedAt: "2026-07-12",
    platforms: ["claude-code", "glm", "kimi"],
    price: 29,
    downloads: 8600,
    favorites: 2100,
    rating: 4.8,
    reviewsCount: 156,
    featured: true,
    trending: true,
    isNew: true,
    accent: G.indigo,
    readme: `# 科研文献拆解与研究助手\n\n上传或粘贴论文，自动输出结构化阅读笔记与研究缺口分析。`,
    installCommands: {
      "claude-code": "claude skill add research-paper",
      glm: "glm skill add research-paper",
      kimi: "kimi skill add research-paper",
    },
    changelog: [{ version: "1.2.0", date: "2026-07-12", notes: ["新增研究缺口自动标注"] }],
    reviews: [
      {
        author: "博士生小林",
        avatarColor: G.purple,
        rating: 5,
        date: "2026-07-10",
        comment: "读英文论文快了很多，笔记格式直接能放进组会汇报。",
      },
    ],
    beforeAfter: {
      before: "一篇论文读 3 小时，笔记零散难复盘。",
      after: "30 分钟拿到结构化笔记 + 方法对比 + 研究空白清单。",
    },
  },
  {
    id: "18",
    slug: "prd-planner",
    title: "产品 PRD 与网站策划师",
    tagline: "梳理需求、输出 PRD、规划信息架构与页面流程。",
    description:
      "帮助产品经理与创业者把想法落成可执行的 PRD：用户故事、功能优先级、页面流程与信息架构一页看清。",
    author: "产品实验室",
    authorAvatarColor: G.cyan,
    category: "office",
    audience: "产品经理 · 创业者",
    tags: ["PRD", "产品", "策划", "网站"],
    version: "1.0.3",
    updatedAt: "2026-07-11",
    platforms: ["claude-code", "cursor", "qwen"],
    price: 19,
    downloads: 11200,
    favorites: 2800,
    rating: 4.7,
    reviewsCount: 198,
    featured: true,
    trending: false,
    isNew: true,
    accent: G.cyan,
    readme: `# 产品 PRD 与网站策划师\n\n输入产品想法，输出 PRD 草案与站点结构。`,
    installCommands: {
      "claude-code": "claude skill add prd-planner",
      cursor: "cursor skill add prd-planner",
      qwen: "qwen skill add prd-planner",
    },
    changelog: [{ version: "1.0.3", date: "2026-07-11", notes: ["新增页面流程图输出"] }],
    reviews: [
      {
        author: "独立开发者阿杰",
        avatarColor: G.sky,
        rating: 5,
        date: "2026-07-08",
        comment: "从脑暴到 PRD 只要一轮对话，省了我两天写文档的时间。",
      },
    ],
    beforeAfter: {
      before: "需求散落在聊天记录里，开发无从下手。",
      after: "一份 PRD + 页面清单，团队当天就能开工。",
    },
  },
  {
    id: "19",
    slug: "study-coach",
    title: "个性化学习计划教练",
    tagline: "按目标、水平和时间生成学习计划与练习，因材施教。",
    description:
      "根据你的学习目标、当前水平与可用时间，生成周计划、每日任务与练习反馈，适合备考与自学。",
    author: "学伴 AI",
    authorAvatarColor: G.emerald,
    category: "learning",
    audience: "学生 · 自学者",
    tags: ["学习", "计划", "教练", "备考"],
    version: "1.1.0",
    updatedAt: "2026-07-09",
    platforms: ["kimi", "glm", "qwen"],
    price: 0,
    downloads: 24500,
    favorites: 6100,
    rating: 4.9,
    reviewsCount: 412,
    featured: true,
    trending: true,
    isNew: false,
    accent: G.emerald,
    readme: `# 个性化学习计划教练\n\n告诉 AI 你的目标与时间，获得可执行的学习路线。`,
    installCommands: {
      kimi: "kimi skill add study-coach",
      glm: "glm skill add study-coach",
      qwen: "qwen skill add study-coach",
    },
    changelog: [{ version: "1.1.0", date: "2026-07-09", notes: ["支持多科目并行计划"] }],
    reviews: [
      {
        author: "高三学生",
        avatarColor: G.amber,
        rating: 5,
        date: "2026-07-07",
        comment: "每天的任务清单很清晰，知道先学什么后学什么。",
      },
    ],
    beforeAfter: {
      before: "学习计划靠感觉，经常三天打鱼两天晒网。",
      after: "有周目标 + 日复盘，坚持了两周效率明显提升。",
    },
  },
  {
    id: "20",
    slug: "jd-resume",
    title: "招聘 JD 与简历匹配助手",
    tagline: "撰写岗位 JD、解析简历亮点，匹配人选与岗位需求。",
    description:
      "HR 与求职者双向赋能：快速生成岗位 JD、解析简历亮点与缺口，并给出匹配度分析与面试追问建议。",
    author: "职场加速器",
    authorAvatarColor: G.rose,
    category: "office",
    audience: "HR · 求职者",
    tags: ["招聘", "简历", "JD", "面试"],
    version: "1.0.1",
    updatedAt: "2026-07-08",
    platforms: ["claude-code", "kimi", "qwen"],
    price: 15,
    downloads: 9800,
    favorites: 1900,
    rating: 4.6,
    reviewsCount: 134,
    featured: true,
    trending: false,
    isNew: true,
    accent: G.rose,
    readme: `# 招聘 JD 与简历匹配助手\n\n输入岗位或简历，获得匹配分析与优化建议。`,
    installCommands: {
      "claude-code": "claude skill add jd-resume",
      kimi: "kimi skill add jd-resume",
      qwen: "qwen skill add jd-resume",
    },
    changelog: [{ version: "1.0.1", date: "2026-07-08", notes: ["新增匹配度评分"] }],
    reviews: [
      {
        author: "HR 小陈",
        avatarColor: G.violet,
        rating: 5,
        date: "2026-07-06",
        comment: "筛简历快了一倍，匹配理由写得很清楚。",
      },
    ],
    beforeAfter: {
      before: "人工比对 JD 与简历，一份要 15 分钟。",
      after: "批量上传后 2 分钟出匹配排序与追问清单。",
    },
  },
];

/* ===================== Selectors ===================== */

export function searchSkills({
  query = "",
  type = "all",
  sort = "popular",
  category = null as string | null,
}: {
  query?: string;
  type?: "all" | "free" | "paid";
  sort?: "popular" | "newest" | "rating";
  category?: string | null;
} = {}) {
  const q = query.trim().toLowerCase();
  let list = [...SKILLS];

  if (q) {
    list = list.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        CATEGORY_META[s.category]?.label.toLowerCase().includes(q)
    );
  }

  if (type === "free") list = list.filter((s) => s.price === 0);
  if (type === "paid") list = list.filter((s) => s.price > 0);
  if (category) list = list.filter((s) => s.category === category);

  switch (sort) {
    case "newest":
      list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    default:
      list.sort((a, b) => b.downloads - a.downloads);
  }

  return list;
}

export const getFeaturedSkills = () => SKILLS.filter((s) => s.featured);
export const getTrendingSkills = () => SKILLS.filter((s) => s.trending);
export const getNewSkills = () => SKILLS.filter((s) => s.isNew);
export const getSkillBySlug = (slug: string) => SKILLS.find((s) => s.slug === slug);
export const getRelatedSkills = (skill: Skill, limit = 4) =>
  SKILLS.filter(
    (s) => s.id !== skill.id && (s.category === skill.category || s.tags.some((t) => skill.tags.includes(t)))
  ).slice(0, limit);

/** 紧凑数字格式（中文习惯：万） */
export const formatCompact = (n: number) => {
  if (n >= 10000) return (n / 10000).toFixed(n >= 100000 ? 0 : 1) + "万";
  if (n >= 1000) return (n / 1000).toFixed(0) + "k";
  return String(n);
};

/** 中文相对日期 */
export const formatRelativeDate = (iso: string) => {
  const d = new Date(iso);
  const now = new Date("2026-07-11");
  const days = Math.round((now.getTime() - d.getTime()) / 86400000);
  if (days <= 0) return "今天";
  if (days === 1) return "昨天";
  if (days < 7) return `${days} 天前`;
  if (days < 30) return `${Math.floor(days / 7)} 周前`;
  return `${Math.floor(days / 30)} 个月前`;
};

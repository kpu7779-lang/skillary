/** Skillary — 技能数据与工具函数 */
window.SkillaryData = (function () {
  const PLATFORM_META = {
    "claude-code": { label: "Claude Code", short: "CC", color: "#d97757" },
    cursor: { label: "Cursor", short: "CR", color: "#6f7bff" },
    codex: { label: "Codex", short: "CX", color: "#10a37f" },
    qwen: { label: "通义千问", short: "QW", color: "#a855f7" },
    glm: { label: "智谱 GLM", short: "GL", color: "#3b82f6" },
    kimi: { label: "Kimi", short: "KM", color: "#ec4899" },
  };

  const CATEGORY_META = {
    coding: { label: "编程", desc: "代码生成、规则、测试" },
    design: { label: "设计", desc: "绘图提示词、设计系统" },
    writing: { label: "写作", desc: "文案、脚本、润色" },
    learning: { label: "学习", desc: "作业辅导、语言、研究" },
    data: { label: "数据", desc: "表格、数据库、分析" },
    lifestyle: { label: "生活", desc: "健康、旅行、日常" },
    office: { label: "办公", desc: "会议、PPT、邮件" },
    agent: { label: "智能体", desc: "多智能体、自动化流程" },
    science: { label: "科学发现", desc: "科研平台" },
    product: { label: "产品落地", desc: "产业发展" },
    wellbeing: { label: "民生福祉", desc: "学伴 · 职场" },
  };

  const FEATURED_FILTERS = [
    { id: "featured", label: "精选", hint: "编辑推荐" },
    { id: "science", label: "科学发现", hint: "科研平台" },
    { id: "product", label: "产品落地", hint: "产业发展" },
    { id: "wellbeing", label: "民生福祉", hint: "学伴 · 职场" },
    { id: "all", label: "全部" },
  ];

  const SKILLS = [
    {
      slug: "research-paper",
      title: "科研文献拆解与研究助手",
      tagline: "总结论文、提取方法、整理研究缺口、生成阅读笔记",
      description:
        "面向科研工作者与学生的文献阅读技能。上传或粘贴论文，自动提炼核心方法、实验结论与研究缺口，并生成结构化阅读笔记。",
      author: "科研平台",
      authorColor: "linear-gradient(135deg,#8b5cf6,#6366f1)",
      category: "science",
      categoryLabel: "科学发现",
      subCategory: "科研平台",
      audience: "研究生 · 科研工作者",
      tags: ["论文", "科研", "文献", "笔记"],
      version: "1.0.0",
      updatedAt: "2026-07-10",
      platforms: ["claude-code", "cursor", "glm"],
      price: 0,
      downloads: 28400,
      favorites: 5200,
      rating: 4.9,
      reviewsCount: 312,
      featured: true,
      trending: true,
      isNew: true,
      comingSoon: false,
      pair: 1,
      accent: "linear-gradient(90deg,#8b5cf6,#6366f1,#3b82f6)",
      backBg: "linear-gradient(135deg,#8b5cf6,#6366f1,#2563eb)",
      glow: "rgba(124,92,255,0.35)",
      readme: "上传论文 PDF 或粘贴摘要，AI 将输出：核心贡献、方法拆解、实验结论、研究缺口与延伸阅读建议。",
      installCommands: {
        "claude-code": "claude skill add research-paper",
        cursor: "cursor skill add research-paper",
        glm: "glm skill add research-paper",
      },
      reviews: [
        { author: "李博士", rating: 5, date: "2026-07-08", comment: "读综述效率提升明显，缺口整理很到位。" },
      ],
    },
    {
      slug: "prd-planner",
      title: "产品 PRD 与网站策划师",
      tagline: "梳理需求、输出 PRD、规划信息架构与页面流程",
      description:
        "从产品想法到可交付 PRD 的一站式技能。自动梳理用户故事、功能优先级、信息架构与页面流程，适合独立开发者与产品经理。",
      author: "产业发展",
      authorColor: "linear-gradient(135deg,#22d3ee,#0ea5e9)",
      category: "product",
      categoryLabel: "产品落地",
      subCategory: "产业发展 · 软件",
      audience: "产品经理 · 独立开发者",
      tags: ["PRD", "产品", "网站", "策划"],
      version: "1.1.0",
      updatedAt: "2026-07-09",
      platforms: ["cursor", "claude-code", "qwen"],
      price: 29,
      downloads: 19200,
      favorites: 4100,
      rating: 4.8,
      reviewsCount: 198,
      featured: true,
      trending: true,
      isNew: false,
      comingSoon: false,
      pair: 1,
      accent: "linear-gradient(90deg,#22d3ee,#0ea5e9,#2563eb)",
      backBg: "linear-gradient(135deg,#22d3ee,#0ea5e9,#2563eb)",
      glow: "rgba(45,212,191,0.32)",
      readme: "描述你的产品想法，AI 输出完整 PRD：背景、用户画像、功能列表、页面流程与 MVP 范围。",
      installCommands: {
        cursor: "cursor skill add prd-planner",
        "claude-code": "claude skill add prd-planner",
        qwen: "qwen skill add prd-planner",
      },
      reviews: [
        { author: "小陈", rating: 5, date: "2026-07-07", comment: "独立做站必备，信息架构部分特别省心。" },
      ],
    },
    {
      slug: "study-coach",
      title: "个性化学习计划教练",
      tagline: "按目标、水平和时间生成学习计划与练习，因材施教",
      description:
        "根据你的学习目标、当前水平与可用时间，生成周计划、每日任务与配套练习，并随进度动态调整难度。",
      author: "智能学伴",
      authorColor: "linear-gradient(135deg,#34d399,#14b8a6)",
      category: "wellbeing-learn",
      categoryLabel: "民生福祉",
      subCategory: "智能学伴 · 因材施教",
      audience: "学生 · 自学者",
      tags: ["学习", "计划", "练习", "辅导"],
      version: "2.0.0",
      updatedAt: "2026-07-11",
      platforms: ["glm", "kimi", "qwen"],
      price: 0,
      downloads: 45600,
      favorites: 8900,
      rating: 4.9,
      reviewsCount: 670,
      featured: true,
      trending: true,
      isNew: true,
      comingSoon: false,
      pair: 2,
      accent: "linear-gradient(90deg,#34d399,#14b8a6,#06b6d4)",
      backBg: "linear-gradient(135deg,#34d399,#14b8a6,#06b6d4)",
      glow: "rgba(52,211,153,0.3)",
      readme: "告诉 AI 你的目标（如考研英语 70 分）、当前水平与每天可用时间，获得个性化学习路径。",
      installCommands: {
        glm: "glm skill add study-coach",
        kimi: "kimi skill add study-coach",
        qwen: "qwen skill add study-coach",
      },
      reviews: [
        { author: "考研党", rating: 5, date: "2026-07-09", comment: "每天的任务很具体，不会不知道从哪开始。" },
      ],
    },
    {
      slug: "jd-resume",
      title: "招聘 JD 与简历匹配助手",
      tagline: "撰写岗位 JD、解析简历亮点，匹配人选与岗位需求",
      description:
        "HR 与求职者双向赋能。一键生成专业 JD，或上传简历自动匹配岗位关键词、亮点提炼与面试准备建议。",
      author: "职场赋能",
      authorColor: "linear-gradient(135deg,#d946ef,#ec4899)",
      category: "wellbeing-work",
      categoryLabel: "民生福祉",
      subCategory: "新岗位 · 传统岗位赋能",
      audience: "HR · 求职者",
      tags: ["招聘", "简历", "JD", "匹配"],
      version: "1.3.0",
      updatedAt: "2026-07-08",
      platforms: ["kimi", "glm", "cursor"],
      price: 0,
      downloads: 32100,
      favorites: 6100,
      rating: 4.7,
      reviewsCount: 445,
      featured: true,
      trending: false,
      isNew: false,
      comingSoon: false,
      pair: 2,
      accent: "linear-gradient(90deg,#d946ef,#ec4899,#f43f5e)",
      backBg: "linear-gradient(135deg,#d946ef,#ec4899,#f43f5e)",
      glow: "rgba(236,72,153,0.32)",
      readme: "输入岗位需求生成 JD，或粘贴简历获取匹配度分析与优化建议。",
      installCommands: {
        kimi: "kimi skill add jd-resume",
        glm: "glm skill add jd-resume",
        cursor: "cursor skill add jd-resume",
      },
      reviews: [
        { author: "HR 小王", rating: 5, date: "2026-07-06", comment: "写 JD 从半小时缩短到五分钟。" },
      ],
    },
    {
      slug: "enterprise-plan",
      title: "AI 企业执行方案生成器",
      tagline: "从战略意图到可落地执行方案，一键生成",
      description: "输入企业目标与约束，自动生成分阶段执行方案、里程碑与资源配置建议。",
      author: "Skillary",
      authorColor: "linear-gradient(135deg,#6366f1,#8b5cf6)",
      category: "product",
      categoryLabel: "产品落地",
      subCategory: "企业发展",
      audience: "管理者 · 咨询顾问",
      tags: ["企业", "方案", "战略", "执行"],
      version: "0.1.0",
      updatedAt: "2026-07-12",
      platforms: ["claude-code", "cursor"],
      price: 49,
      downloads: 0,
      favorites: 0,
      rating: 0,
      reviewsCount: 0,
      featured: false,
      trending: false,
      isNew: true,
      comingSoon: true,
      pair: 1,
      accent: "linear-gradient(90deg,#6366f1,#8b5cf6,#a855f7)",
      backBg: "linear-gradient(135deg,#6366f1,#8b5cf6)",
      glow: "rgba(99,102,241,0.3)",
      readme: "即将上线，敬请期待。",
      installCommands: {},
      reviews: [],
    },
    {
      slug: "ad-content-factory",
      title: "商品卖点与广告内容工厂",
      tagline: "提炼卖点，批量生成多平台广告文案与素材脚本",
      description: "输入商品信息，自动提炼核心卖点，生成短视频脚本、朋友圈文案、详情页话术。",
      author: "Skillary",
      authorColor: "linear-gradient(135deg,#f59e0b,#ef4444)",
      category: "writing",
      categoryLabel: "写作",
      subCategory: "营销内容",
      audience: "电商 · 运营",
      tags: ["广告", "卖点", "文案", "营销"],
      version: "0.1.0",
      updatedAt: "2026-07-12",
      platforms: ["qwen", "kimi"],
      price: 19,
      downloads: 0,
      favorites: 0,
      rating: 0,
      reviewsCount: 0,
      featured: false,
      trending: false,
      isNew: true,
      comingSoon: true,
      pair: 1,
      accent: "linear-gradient(90deg,#f59e0b,#ef4444,#ec4899)",
      backBg: "linear-gradient(135deg,#f59e0b,#ef4444)",
      glow: "rgba(245,158,11,0.3)",
      readme: "即将上线，敬请期待。",
      installCommands: {},
      reviews: [],
    },
    {
      slug: "spreadsheet-analyst",
      title: "表格数据洞察分析师",
      tagline: "上传表格，自动发现趋势、异常与可视化建议",
      description: "面向业务人员的数据分析技能。无需写公式，用自然语言提问即可获得洞察报告。",
      author: "Skillary",
      authorColor: "linear-gradient(135deg,#06b6d4,#3b82f6)",
      category: "data",
      categoryLabel: "数据",
      subCategory: "表格分析",
      audience: "运营 · 分析师",
      tags: ["表格", "数据", "分析", "洞察"],
      version: "0.1.0",
      updatedAt: "2026-07-12",
      platforms: ["cursor", "glm"],
      price: 29,
      downloads: 0,
      favorites: 0,
      rating: 0,
      reviewsCount: 0,
      featured: false,
      trending: false,
      isNew: true,
      comingSoon: true,
      pair: 2,
      accent: "linear-gradient(90deg,#06b6d4,#3b82f6,#6366f1)",
      backBg: "linear-gradient(135deg,#06b6d4,#3b82f6)",
      glow: "rgba(6,182,212,0.3)",
      readme: "即将上线，敬请期待。",
      installCommands: {},
      reviews: [],
    },
    {
      slug: "short-video-director",
      title: "短视频脚本与分镜导演",
      tagline: "从创意到分镜脚本，一条视频全流程策划",
      description: "输入主题与平台（抖音/小红书/B站），生成完整脚本、分镜表与拍摄清单。",
      author: "Skillary",
      authorColor: "linear-gradient(135deg,#ec4899,#8b5cf6)",
      category: "writing",
      categoryLabel: "写作",
      subCategory: "短视频",
      audience: "创作者 · 运营",
      tags: ["短视频", "脚本", "分镜", "创作"],
      version: "0.1.0",
      updatedAt: "2026-07-12",
      platforms: ["kimi", "qwen"],
      price: 15,
      downloads: 0,
      favorites: 0,
      rating: 0,
      reviewsCount: 0,
      featured: false,
      trending: false,
      isNew: true,
      comingSoon: true,
      pair: 2,
      accent: "linear-gradient(90deg,#ec4899,#8b5cf6,#6366f1)",
      backBg: "linear-gradient(135deg,#ec4899,#8b5cf6)",
      glow: "rgba(236,72,153,0.3)",
      readme: "即将上线，敬请期待。",
      installCommands: {},
      reviews: [],
    },
    {
      slug: "homework-helper",
      title: "作业辅导小助手",
      tagline: "拍下题目，逐步讲解，不直接给答案",
      description: "适合小学生的作业辅导技能。AI 一步步讲解思路，引导孩子自己找到答案。",
      author: "成长学堂",
      authorColor: "linear-gradient(135deg,#f59e0b,#f97316)",
      category: "learning",
      categoryLabel: "学习",
      subCategory: "作业辅导",
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
      featured: false,
      trending: true,
      isNew: false,
      comingSoon: false,
      accent: "linear-gradient(90deg,#f59e0b,#f97316)",
      backBg: "linear-gradient(135deg,#f59e0b,#f97316)",
      glow: "rgba(245,158,11,0.3)",
      readme: "拍下题目，AI 引导思考，不直接给答案。支持数学、语文、英语。",
      installCommands: {
        glm: "glm skill add homework-helper",
        qwen: "qwen skill add homework-helper",
        kimi: "kimi skill add homework-helper",
      },
      reviews: [
        { author: "乐乐妈妈", rating: 5, date: "2026-07-08", comment: "辅导作业省心多了。" },
      ],
    },
    {
      slug: "code-review-pro",
      title: "代码审查专家",
      tagline: "自动发现 bug、性能问题与安全漏洞",
      description: "粘贴代码或指定文件，获得结构化审查报告与修复建议，支持多种语言。",
      author: "DevTools",
      authorColor: "linear-gradient(135deg,#6f7bff,#3b82f6)",
      category: "coding",
      categoryLabel: "编程",
      subCategory: "代码质量",
      audience: "开发者",
      tags: ["代码审查", "bug", "安全", "性能"],
      version: "2.1.0",
      updatedAt: "2026-07-07",
      platforms: ["claude-code", "cursor", "codex"],
      price: 0,
      downloads: 56700,
      favorites: 9800,
      rating: 4.8,
      reviewsCount: 1200,
      featured: false,
      trending: true,
      isNew: false,
      comingSoon: false,
      accent: "linear-gradient(90deg,#6f7bff,#3b82f6)",
      backBg: "linear-gradient(135deg,#6f7bff,#3b82f6)",
      glow: "rgba(111,123,255,0.3)",
      readme: "粘贴代码片段或指定仓库路径，获得分级审查报告。",
      installCommands: {
        "claude-code": "claude skill add code-review-pro",
        cursor: "cursor skill add code-review-pro",
        codex: "codex skill add code-review-pro",
      },
      reviews: [
        { author: "全栈阿杰", rating: 5, date: "2026-07-05", comment: "安全漏洞检测很准，省了很多 review 时间。" },
      ],
    },
  ];

  function getSkillBySlug(slug) {
    return SKILLS.find((s) => s.slug === slug) || null;
  }

  function getFeaturedFlipSkills() {
    return SKILLS.filter((s) => s.featured && s.pair);
  }

  function filterFeaturedSkills(filter) {
    const featured = getFeaturedFlipSkills();
    switch (filter) {
      case "featured":
        return featured;
      case "science":
        return featured.filter((s) => s.category === "science");
      case "product":
        return featured.filter((s) => s.category === "product");
      case "wellbeing":
        return featured.filter((s) => s.category.startsWith("wellbeing"));
      default:
        return featured;
    }
  }

  function groupByPair(skills) {
    const pairs = [[], []];
    skills.forEach((s) => {
      if (s.pair) pairs[s.pair - 1].push(s);
    });
    return pairs.filter((row) => row.length > 0);
  }

  function formatCompact(n) {
    if (n >= 10000) return (n / 10000).toFixed(n >= 100000 ? 0 : 1) + "万";
    if (n >= 1000) return (n / 1000).toFixed(0) + "k";
    return String(n);
  }

  function searchSkills({ query = "", type = "all", sort = "popular", category = null } = {}) {
    const q = query.trim().toLowerCase();
    let list = [...SKILLS];

    if (q) {
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)) ||
          (s.categoryLabel && s.categoryLabel.toLowerCase().includes(q))
      );
    }

    if (type === "free") list = list.filter((s) => s.price === 0);
    if (type === "paid") list = list.filter((s) => s.price > 0);
    if (category) list = list.filter((s) => s.category === category || s.category.startsWith(category));

    switch (sort) {
      case "newest":
        list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.downloads - a.downloads);
    }

    return list;
  }

  function getRelatedSkills(skill, limit = 4) {
    return SKILLS.filter(
      (s) =>
        s.slug !== skill.slug &&
        (s.category === skill.category || s.tags.some((t) => skill.tags.includes(t)))
    ).slice(0, limit);
  }

  return {
    PLATFORM_META,
    CATEGORY_META,
    FEATURED_FILTERS,
    SKILLS,
    getSkillBySlug,
    getFeaturedFlipSkills,
    filterFeaturedSkills,
    groupByPair,
    formatCompact,
    searchSkills,
    getRelatedSkills,
  };
})();
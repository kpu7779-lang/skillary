export type FeaturedFilterId =
  | "featured"
  | "science"
  | "product"
  | "wellbeing"
  | "all";

export type FeaturedSkill = {
  id: string;
  /** 对应 skills-data 中的 slug，用于详情页跳转 */
  slug: string;
  title: string;
  ability: string;
  category: "science" | "product" | "wellbeing-learn" | "wellbeing-work";
  categoryLabel: string;
  subCategory: string;
  pair: 1 | 2;
  accent: string;
  glow: string;
  featured: boolean;
};

export const FEATURED_FILTERS: { id: FeaturedFilterId; label: string; hint?: string }[] = [
  { id: "featured", label: "精选", hint: "编辑推荐" },
  { id: "science", label: "科学发现", hint: "科研平台" },
  { id: "product", label: "产品落地", hint: "产业发展" },
  { id: "wellbeing", label: "民生福祉", hint: "学伴 · 职场" },
  { id: "all", label: "全部" },
];

export const FEATURED_SKILLS: FeaturedSkill[] = [
  {
    id: "research-paper",
    slug: "research-paper",
    title: "科研文献拆解与研究助手",
    ability: "总结论文、提取方法、整理研究缺口、生成阅读笔记",
    category: "science",
    categoryLabel: "科学发现",
    subCategory: "科研平台",
    pair: 1,
    accent: "from-violet-500 via-indigo-500 to-blue-500",
    glow: "rgba(124, 92, 255, 0.35)",
    featured: true,
  },
  {
    id: "prd-planner",
    slug: "prd-planner",
    title: "产品 PRD 与网站策划师",
    ability: "梳理需求、输出 PRD、规划信息架构与页面流程，助力产品落地",
    category: "product",
    categoryLabel: "产品落地",
    subCategory: "产业发展 · 软件",
    pair: 1,
    accent: "from-cyan-400 via-sky-500 to-blue-600",
    glow: "rgba(45, 212, 191, 0.32)",
    featured: true,
  },
  {
    id: "study-coach",
    slug: "study-coach",
    title: "个性化学习计划教练",
    ability: "按目标、水平和时间生成学习计划与练习，因材施教",
    category: "wellbeing-learn",
    categoryLabel: "民生福祉",
    subCategory: "智能学伴 · 因材施教",
    pair: 2,
    accent: "from-emerald-400 via-teal-500 to-cyan-500",
    glow: "rgba(52, 211, 153, 0.3)",
    featured: true,
  },
  {
    id: "jd-resume",
    slug: "jd-resume",
    title: "招聘 JD 与简历匹配助手",
    ability: "撰写岗位 JD、解析简历亮点，匹配人选与岗位需求",
    category: "wellbeing-work",
    categoryLabel: "民生福祉",
    subCategory: "新岗位 · 传统岗位赋能",
    pair: 2,
    accent: "from-fuchsia-500 via-pink-500 to-rose-500",
    glow: "rgba(236, 72, 153, 0.32)",
    featured: true,
  },
];

export function filterFeaturedSkills(filter: FeaturedFilterId): FeaturedSkill[] {
  switch (filter) {
    case "featured":
      return FEATURED_SKILLS.filter((s) => s.featured);
    case "science":
      return FEATURED_SKILLS.filter((s) => s.category === "science");
    case "product":
      return FEATURED_SKILLS.filter((s) => s.category === "product");
    case "wellbeing":
      return FEATURED_SKILLS.filter((s) => s.category.startsWith("wellbeing"));
    case "all":
    default:
      return FEATURED_SKILLS;
  }
}

export function groupByPair(skills: FeaturedSkill[]): FeaturedSkill[][] {
  const pairs: FeaturedSkill[][] = [[], []];
  for (const skill of skills) {
    pairs[skill.pair - 1].push(skill);
  }
  return pairs.filter((row) => row.length > 0);
}
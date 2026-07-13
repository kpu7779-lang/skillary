/** Skillary API 客户端 — 连接 Next.js 后端 */
window.SkillaryAPI = (function () {
  const DEFAULT_BASE = "http://localhost:3000";
  let baseUrl = localStorage.getItem("skillary_api_base") || DEFAULT_BASE;

  function setBaseUrl(url) {
    baseUrl = url.replace(/\/$/, "");
    localStorage.setItem("skillary_api_base", baseUrl);
  }

  async function request(path, options = {}) {
    const url = `${baseUrl}${path}`;
    const res = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    const json = await res.json().catch(() => ({ ok: false, error: "响应解析失败" }));
    return { res, json };
  }

  async function register({ email, password, name }) {
    return request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
  }

  async function login({ email, password }) {
    const csrfRes = await fetch(`${baseUrl}/api/auth/csrf`, { credentials: "include" });
    const csrfJson = await csrfRes.json();
    const csrfToken = csrfJson?.csrfToken;
    if (!csrfToken) return { res: { ok: false }, json: { ok: false, error: "无法获取 CSRF" } };

    const res = await fetch(`${baseUrl}/api/auth/callback/credentials`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        csrfToken,
        email,
        password,
        redirect: "false",
        json: "true",
      }),
    });
    const json = await res.json().catch(() => ({}));
    return { res, json };
  }

  async function logout() {
    const csrfRes = await fetch(`${baseUrl}/api/auth/csrf`, { credentials: "include" });
    const csrfJson = await csrfRes.json();
    return fetch(`${baseUrl}/api/auth/signout`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        csrfToken: csrfJson?.csrfToken || "",
        callbackUrl: window.location.href,
        json: "true",
      }),
    });
  }

  async function me() {
    return request("/api/auth/me");
  }

  async function searchSkills(params = {}) {
    const q = new URLSearchParams();
    if (params.q) q.set("q", params.q);
    if (params.type) q.set("type", params.type);
    if (params.sort) q.set("sort", params.sort);
    return request(`/api/skills?${q.toString()}`);
  }

  async function submitSkill(data) {
    return request("/api/skills/submit", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async function getFavorites() {
    return request("/api/favorites");
  }

  async function addFavorite(skillSlug) {
    return request("/api/favorites", {
      method: "POST",
      body: JSON.stringify({ skillSlug }),
    });
  }

  async function removeFavorite(skillSlug) {
    return request(`/api/favorites?slug=${encodeURIComponent(skillSlug)}`, {
      method: "DELETE",
    });
  }

  async function ping() {
    try {
      const { res } = await request("/api/skills");
      return res.ok;
    } catch {
      return false;
    }
  }

  return {
    getBaseUrl: () => baseUrl,
    setBaseUrl,
    register,
    login,
    logout,
    me,
    searchSkills,
    submitSkill,
    getFavorites,
    addFavorite,
    removeFavorite,
    ping,
  };
})();
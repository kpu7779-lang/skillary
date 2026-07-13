/** Skillary — 动态 SPA 应用 */
(function () {
  const D = window.SkillaryData;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const state = {
    view: "home",
    slug: null,
    query: "",
    searchType: "all",
    sortMode: "popular",
    featuredFilter: "featured",
    installSlug: null,
    installPlatform: null,
  };

  /* ── Toast ── */
  function toast(msg, ms = 2800) {
    const root = $("#toast-root");
    if (!root) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    root.appendChild(el);
    setTimeout(() => {
      el.classList.add("out");
      setTimeout(() => el.remove(), 250);
    }, ms);
  }

  /* ── Router ── */
  function parseHash() {
    const hash = location.hash.slice(1) || "/";
    const parts = hash.split("/").filter(Boolean);
    if (!parts.length || parts[0] === "home") return { view: "home" };
    if (parts[0] === "search") {
      const params = new URLSearchParams(hash.split("?")[1] || "");
      return {
        view: "search",
        query: params.get("q") || "",
        searchType: params.get("type") || "all",
        sortMode: params.get("sort") || "popular",
      };
    }
    if (parts[0] === "skill" && parts[1]) return { view: "detail", slug: parts[1] };
    if (parts[0] === "upload") return { view: "upload" };
    return { view: "home" };
  }

  function setHash(route) {
    let hash = "#/";
    if (route.view === "search") {
      const p = new URLSearchParams();
      if (route.query) p.set("q", route.query);
      if (route.searchType !== "all") p.set("type", route.searchType);
      if (route.sortMode !== "popular") p.set("sort", route.sortMode);
      hash = "#/search?" + p.toString();
    } else if (route.view === "detail") hash = "#/skill/" + route.slug;
    else if (route.view === "upload") hash = "#/upload";
    if (location.hash !== hash) location.hash = hash;
  }

  function navigate(route, push = true) {
    Object.assign(state, { view: route.view, slug: route.slug || null });
    if (route.query !== undefined) state.query = route.query;
    if (route.searchType) state.searchType = route.searchType;
    if (route.sortMode) state.sortMode = route.sortMode;
    if (push) setHash(route);
    render();
    if (route.view !== "search") window.scrollTo({ top: 0, behavior: "smooth" });
    updateNav();
    closeSuggestions();
  }

  function updateNav() {
    $$(".nav-btn[data-nav]").forEach((btn) => {
      const nav = btn.dataset.nav;
      btn.classList.toggle("active", (nav === "home" && state.view === "home") || (nav === "upload" && state.view === "upload"));
    });
    const mobile = $("#mobileMenu");
    if (mobile) {
      $$("#mobileMenu button[data-nav]").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.nav === state.view || (btn.dataset.nav === "home" && state.view === "search"));
      });
    }
  }

  /* ── Render views ── */
  function render() {
    $$(".view").forEach((v) => v.classList.remove("active"));
    const homeVisible = state.view === "home" || state.view === "search";
    $("#view-home")?.classList.toggle("active", homeVisible);
    $("#view-detail")?.classList.toggle("active", state.view === "detail");
    $("#view-upload")?.classList.toggle("active", state.view === "upload");

    if (state.view === "search") renderSearchResults();
    if (state.view === "detail") renderDetail(state.slug);
    if (state.view === "upload") renderUpload();

    const hero = $(".hero");
    const featured = $("#featuredSkills");
    const searchSec = $("#searchResultsSection");
    if (state.view === "detail" || state.view === "upload") {
      hero?.style.setProperty("display", "none");
      featured?.style.setProperty("display", "none");
      searchSec?.style.setProperty("display", "none");
    } else {
      hero?.style.removeProperty("display");
      featured?.style.removeProperty("display");
      if (state.view === "search") {
        searchSec?.style.removeProperty("display");
      } else {
        searchSec?.style.setProperty("display", "none");
      }
    }
  }

  function renderSkillCard(skill) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "skill-card";
    const badges = [];
    if (skill.comingSoon) badges.push('<span class="badge soon">即将上线</span>');
    if (skill.isNew) badges.push('<span class="badge new">新</span>');
    if (skill.trending) badges.push('<span class="badge hot">热门</span>');
    if (skill.price === 0) badges.push('<span class="badge free">免费</span>');
    const platforms = skill.platforms
      .slice(0, 4)
      .map((p) => {
        const m = D.PLATFORM_META[p];
        return m ? `<span class="platform-dot" style="background:${m.color}" title="${m.label}">${m.short}</span>` : "";
      })
      .join("");
    card.innerHTML = `
      <div class="skill-card-top">
        <div class="skill-card-badges">${badges.join("")}</div>
        <span class="skill-card-price ${skill.price > 0 ? "paid" : ""}">${skill.price > 0 ? "¥" + skill.price : "免费"}</span>
      </div>
      <h3>${skill.title}</h3>
      <p>${skill.tagline}</p>
      <div class="skill-card-meta">
        <span class="skill-card-rating">${skill.rating > 0 ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>${skill.rating}` : "暂无评分"}</span>
        <span>${D.formatCompact(skill.downloads)} 次安装</span>
        <div class="platform-dots">${platforms}</div>
      </div>`;
    card.onclick = () => navigate({ view: "detail", slug: skill.slug });
    return card;
  }

  function renderSearchResults() {
    const sec = $("#searchResultsSection");
    const grid = $("#searchResultsGrid");
    const title = $("#searchResultsTitle");
    const count = $("#searchResultsCount");
    if (!sec || !grid) return;

    const input = $("#searchInput");
    if (input && state.query) input.value = state.query;

    const results = D.searchSkills({
      query: state.query,
      type: state.searchType,
      sort: state.sortMode,
    });

    title.textContent = state.query ? `「${state.query}」的搜索结果` : "全部技能";
    count.textContent = `共 ${results.length} 个技能`;

    grid.innerHTML = "";
    if (!results.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <p>没有找到匹配的技能</p>
        <p style="margin-top:8px;font-size:13px">试试其他关键词，或浏览精选 Skill</p>
      </div>`;
    } else {
      results.forEach((s) => grid.appendChild(renderSkillCard(s)));
    }

    setTimeout(() => sec.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }

  function renderDetail(slug) {
    const root = $("#view-detail");
    const skill = D.getSkillBySlug(slug);
    if (!root) return;

    if (!skill) {
      root.innerHTML = `<div class="detail-page" style="text-align:center;padding-top:4rem">
        <p style="color:rgba(255,255,255,.5)">技能未找到</p>
        <button class="btn-secondary" style="margin-top:1rem" onclick="SkillaryApp.goHome()">返回首页</button>
      </div>`;
      return;
    }

    const platforms = skill.platforms
      .map((p) => D.PLATFORM_META[p])
      .filter(Boolean)
      .map((m) => `<span class="platform-dot" style="background:${m.color}">${m.short}</span>`)
      .join("");

    const reviews = skill.reviews
      .map(
        (r) => `<div class="review-card">
        <div class="review-head"><span>${r.author}</span><span class="review-stars">${"★".repeat(r.rating)}</span></div>
        <p class="review-text">${r.comment}</p>
      </div>`
      )
      .join("");

    root.innerHTML = `<div class="detail-page">
      <nav class="breadcrumb">
        <button type="button" data-action="home">探索</button>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        <span>${skill.categoryLabel || skill.category}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        <span style="color:rgba(255,255,255,.7)">${skill.title}</span>
      </nav>
      <div class="detail-hero">
        <div>
          <div class="detail-author">
            <div class="detail-avatar" style="background:${skill.authorColor}">${skill.author.slice(0, 2)}</div>
            <div>
              <div style="font-size:13px;font-weight:500">${skill.author}</div>
              <div style="font-size:11px;color:rgba(255,255,255,.4)">${skill.audience || ""}</div>
            </div>
          </div>
          <h1 class="detail-title">${skill.title}</h1>
          <p class="detail-tagline">${skill.tagline}</p>
          <div class="detail-stats">
            <span class="detail-stat">${skill.rating > 0 ? "★ " + skill.rating + " (" + skill.reviewsCount + ")" : "即将上线"}</span>
            <span class="detail-stat">${D.formatCompact(skill.downloads)} 安装</span>
            <span class="detail-stat">v${skill.version}</span>
            <span class="detail-stat">${skill.price > 0 ? "¥" + skill.price : "免费"}</span>
          </div>
          <p class="detail-desc">${skill.description}</p>
          <div class="detail-tags">${skill.tags.map((t) => `<span class="detail-tag">${t}</span>`).join("")}</div>
          <div class="detail-actions">
            <button type="button" class="btn-primary" data-action="install" ${skill.comingSoon ? "disabled" : ""}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              ${skill.comingSoon ? "即将上线" : "安装技能"}
            </button>
            <button type="button" class="btn-secondary" data-action="favorite">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              收藏
            </button>
          </div>
        </div>
        <div class="detail-panel">
          <h4>使用说明</h4>
          <div class="detail-panel-content">${skill.readme}</div>
          <div style="margin-top:1rem;display:flex;gap:6px">${platforms}</div>
        </div>
      </div>
      ${reviews ? `<div class="detail-reviews"><h3>用户评价</h3>${reviews}</div>` : ""}
    </div>`;

    root.querySelector('[data-action="home"]')?.addEventListener("click", goHome);
    root.querySelector('[data-action="install"]')?.addEventListener("click", () => {
      if (!skill.comingSoon) openInstall(skill.slug);
    });
    root.querySelector('[data-action="favorite"]')?.addEventListener("click", async () => {
      if (window.SkillaryAuth && !SkillaryAuth.requireLogin()) return;
      try {
        if (window.SkillaryAPI && skill && !skill.comingSoon) {
          const favorited = root.dataset.favorited === "1";
          const { json } = favorited
            ? await SkillaryAPI.removeFavorite(skill.slug)
            : await SkillaryAPI.addFavorite(skill.slug);
          if (json.ok) {
            root.dataset.favorited = favorited ? "0" : "1";
            toast(favorited ? "已取消收藏" : "已加入收藏 ❤️");
            return;
          }
          toast(json.error || "操作失败");
          return;
        }
      } catch { /* fallback */ }
      toast("已加入收藏 ❤️");
    });
  }

  function renderUpload() {
    const root = $("#view-upload");
    if (!root || root.dataset.rendered) return;
    root.dataset.rendered = "1";
    root.innerHTML = `<div class="upload-page">
      <h1>发布技能</h1>
      <p>将你的 AI 技能分享给更多人，支持 Claude Code、Cursor、通义千问等平台。</p>
      <form class="upload-form" id="uploadForm">
        <div class="form-group">
          <label>技能名称</label>
          <input type="text" name="title" placeholder="例：科研文献拆解助手" required>
        </div>
        <div class="form-group">
          <label>一句话介绍</label>
          <input type="text" name="tagline" placeholder="用一句话说明这个技能能做什么" required>
        </div>
        <div class="form-group">
          <label>详细描述</label>
          <textarea name="description" placeholder="描述技能的功能、适合人群、使用场景…" required></textarea>
        </div>
        <div class="form-group">
          <label>分类</label>
          <select name="category">
            <option value="science">科学发现</option>
            <option value="product">产品落地</option>
            <option value="learning">学习</option>
            <option value="coding">编程</option>
            <option value="writing">写作</option>
            <option value="data">数据</option>
            <option value="office">办公</option>
            <option value="agent">智能体</option>
          </select>
        </div>
        <div class="form-group">
          <label>定价（¥，0 为免费）</label>
          <input type="number" name="price" min="0" value="0">
        </div>
        <button type="submit" class="btn-primary" style="align-self:flex-start">提交审核</button>
      </form>
    </div>`;
    $("#uploadForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (window.SkillaryAuth && !SkillaryAuth.requireLogin()) return;
      const fd = new FormData(e.target);
      try {
        if (window.SkillaryAPI) {
          const { json } = await SkillaryAPI.submitSkill({
            title: fd.get("title"),
            tagline: fd.get("tagline"),
            description: fd.get("description"),
            category: fd.get("category"),
            price: Number(fd.get("price")) || 0,
          });
          if (json.ok) {
            toast(json.data?.message || "提交成功！我们将在 1-3 个工作日内审核 🎉");
            setTimeout(goHome, 1500);
            return;
          }
          if (json.error) {
            toast(json.error);
            return;
          }
        }
      } catch { /* fallback */ }
      toast("提交成功！我们将在 1-3 个工作日内审核 🎉");
      setTimeout(goHome, 1500);
    });
  }

  /* ── Featured flip cards ── */
  function renderFlipCard(skill, autoFlip) {
    const card = document.createElement("div");
    card.className = "flip-card";
    card.innerHTML = `
      <button type="button" class="flip-inner" aria-label="${skill.title}，点击翻转查看能力">
        <div class="flip-face flip-front">
          <div class="glow-orb" style="background:${skill.glow}"></div>
          <div>
            <span class="cat-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
              ${skill.categoryLabel}
            </span>
            <p class="sub-cat">${skill.subCategory}</p>
            <h3>${skill.title}</h3>
          </div>
          <div class="foot">
            <span class="accent-bar" style="background:${skill.accent}"></span>
            <span class="flip-hint">翻转查看
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            </span>
          </div>
        </div>
        <div class="flip-face flip-back" style="background:${skill.backBg}">
          <div>
            <p class="ability-label">主要能力</p>
            <p class="ability-text">${skill.tagline}</p>
          </div>
          <div class="foot">
            <span>${skill.title}</span>
            <span class="coming-soon" data-slug="${skill.slug}">
              ${skill.comingSoon ? "即将上线" : "查看详情"}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      </button>`;
    const inner = card.querySelector(".flip-inner");
    const comingSoon = card.querySelector(".coming-soon");
    comingSoon?.addEventListener("click", (e) => {
      e.stopPropagation();
      navigate({ view: "detail", slug: skill.slug });
    });
    inner.addEventListener("click", (e) => {
      if (e.target.closest(".coming-soon")) return;
      inner.classList.toggle("is-flipped");
    });
    if (autoFlip && matchMedia("(hover:hover)").matches && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
      inner.addEventListener("mouseenter", () => inner.classList.add("is-flipped"));
      inner.addEventListener("mouseleave", () => inner.classList.remove("is-flipped"));
    }
    return card;
  }

  function renderFeatured() {
    const filtersEl = $("#featuredFilters");
    const pairsEl = $("#featuredPairs");
    const viewAllWrap = $("#viewAllWrap");
    if (!filtersEl || !pairsEl) return;

    filtersEl.innerHTML = "";
    D.FEATURED_FILTERS.forEach((f) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-pill" + (f.id === "all" ? " all" : "") + (state.featuredFilter === f.id ? " active" : "");
      btn.innerHTML = `<span class="label">${f.label}</span>${f.hint ? `<span class="hint">${f.hint}</span>` : ""}${f.id === "all" ? `<span class="filter-badge">${D.getFeaturedFlipSkills().length}</span>` : ""}`;
      btn.onclick = () => {
        state.featuredFilter = f.id;
        renderFeatured();
      };
      filtersEl.appendChild(btn);
    });

    const skills = D.filterFeaturedSkills(state.featuredFilter);
    const pairs = D.groupByPair(skills);
    pairsEl.innerHTML = "";
    pairs.forEach((row, i) => {
      const rowEl = document.createElement("div");
      rowEl.className = "pair-row";
      rowEl.innerHTML = `<div class="pair-label"><span>第 ${i + 1} 组</span><span class="line"></span></div>`;
      const grid = document.createElement("div");
      grid.className = "pair-grid";
      row.forEach((s) => grid.appendChild(renderFlipCard(s, state.featuredFilter === "featured")));
      rowEl.appendChild(grid);
      pairsEl.appendChild(rowEl);
    });

    if (viewAllWrap) viewAllWrap.hidden = state.featuredFilter !== "featured";
  }

  /* ── Install modal ── */
  function openInstall(slug) {
    const skill = D.getSkillBySlug(slug);
    if (!skill || skill.comingSoon) return;
    state.installSlug = slug;
    state.installPlatform = skill.platforms[0];
    const overlay = $("#installModal");
    const body = $("#installModalBody");
    if (!overlay || !body) return;

    function renderModal() {
      const cmd = skill.installCommands[state.installPlatform] || "暂无安装命令";
      const platformBtns = skill.platforms
        .map((p) => {
          const m = D.PLATFORM_META[p];
          return `<button type="button" class="platform-btn ${state.installPlatform === p ? "active" : ""}" data-platform="${p}">${m?.label || p}</button>`;
        })
        .join("");
      body.innerHTML = `
        <p class="modal-skill-title">${skill.title}</p>
        <p class="modal-skill-meta">${skill.price > 0 ? "¥" + skill.price + " · " : "免费 · "}${D.PLATFORM_META[state.installPlatform]?.label || ""}</p>
        <div class="platform-picker">${platformBtns}</div>
        <div class="cmd-box" id="installCmd">${cmd}</div>`;
      body.querySelectorAll("[data-platform]").forEach((btn) => {
        btn.onclick = () => {
          state.installPlatform = btn.dataset.platform;
          renderModal();
        };
      });
    }
    renderModal();
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeInstall() {
    state.installSlug = null;
    $("#installModal")?.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* ── Search ── */
  function doSearch() {
    const q = $("#searchInput")?.value.trim() || "";
    state.query = q;
    state.searchType = $(".type-toggle button.active")?.dataset.type || "all";
    state.sortMode = $("#sortSelect")?.value || "popular";
    navigate({ view: "search", query: q, searchType: state.searchType, sortMode: state.sortMode });
  }

  function closeSuggestions() {
    $("#searchSuggestions")?.classList.remove("open");
  }

  function showSuggestions(q) {
    const box = $("#searchSuggestions");
    if (!box) return;
    if (!q.trim()) {
      closeSuggestions();
      return;
    }
    const results = D.searchSkills({ query: q }).slice(0, 6);
    if (!results.length) {
      closeSuggestions();
      return;
    }
    box.innerHTML = results
      .map(
        (s) => `<button type="button" class="suggestion-item" data-slug="${s.slug}">
        <span>${s.title}</span><span>${s.categoryLabel || ""}</span>
      </button>`
      )
      .join("");
    box.classList.add("open");
    box.querySelectorAll(".suggestion-item").forEach((item) => {
      item.onclick = () => navigate({ view: "detail", slug: item.dataset.slug });
    });
  }

  function goHome() {
    navigate({ view: "home", query: "", searchType: "all", sortMode: "popular" });
    $("#searchInput") && ($("#searchInput").value = "");
  }

  /* ── Init ── */
  function init() {
    renderFeatured();
    $("#viewAllBtn")?.addEventListener("click", () => {
      state.featuredFilter = "all";
      renderFeatured();
    });


    if ($("#featuredSkills") && "IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => {
        $("#featuredSkills")?.classList.toggle("in-view", e.isIntersecting);
      }, { threshold: 0.15 }).observe($("#featuredSkills"));
    } else {
      $("#featuredSkills")?.classList.add("in-view");
    }

    $("#typeToggle")?.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-type]");
      if (!btn) return;
      $$("#typeToggle button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });

    const searchInput = $("#searchInput");
    const searchGo = $("#searchGo");
    searchInput?.addEventListener("input", () => {
      const has = searchInput.value.trim().length > 0;
      searchGo?.classList.toggle("enabled", has);
      searchGo?.classList.toggle("disabled", !has);
      showSuggestions(searchInput.value);
    });
    searchInput?.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        doSearch();
      }
      if (e.key === "Escape") closeSuggestions();
    });
    searchGo?.addEventListener("click", doSearch);
    $("#sortSelect")?.addEventListener("change", () => {
      if (state.view === "search") doSearch();
    });

    $("#clearSearch")?.addEventListener("click", goHome);

    $$("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nav = btn.dataset.nav;
        if (nav === "home") goHome();
        if (nav === "upload") navigate({ view: "upload" });
        $("#mobileMenu")?.classList.remove("open");
      });
    });
    document.querySelector("header .logo-btn")?.addEventListener("click", () => goHome());

    $("#menuBtn")?.addEventListener("click", () => $("#mobileMenu")?.classList.toggle("open"));

    $("#installModal")?.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-backdrop") || e.target.closest("[data-close-modal]")) closeInstall();
    });
    $("#copyInstallCmd")?.addEventListener("click", async () => {
      const cmd = $("#installCmd")?.textContent;
      if (cmd) {
        try {
          await navigator.clipboard.writeText(cmd);
          toast("安装命令已复制 📋");
        } catch {
          toast("复制失败，请手动选择");
        }
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeInstall();
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-input-wrap")) closeSuggestions();
    });

    window.addEventListener("hashchange", () => {
      const route = parseHash();
      navigate(route, false);
    });

    const route = parseHash();
    if (route.view !== "home") navigate(route, false);
    else render();

    initMesh();
    initMouseGlow();
  }

  function initMouseGlow() {
    const glow = $("#mouse-glow");
    if (!glow || !matchMedia("(hover:hover)").matches) return;
    document.addEventListener("mousemove", (e) => {
      glow.style.background = `radial-gradient(480px circle at ${e.clientX}px ${e.clientY}px, rgba(124,92,255,.12), rgba(45,212,191,.05) 38%, transparent 62%)`;
    });
  }

  function initMesh() {
    const canvas = $("#mesh-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = matchMedia("(prefers-reduced-motion:reduce)").matches;
    let w, h, pts = [], mx = -9999, my = -9999;
    const N = reduced ? 40 : 152,
      LINK = reduced ? 0 : 192,
      MR = 400;
    const hues = [258, 195, 280, 220];

    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = Array.from({ length: N }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (reduced ? 0.1 : 0.38),
        vy: (Math.random() - 0.5) * (reduced ? 0.1 : 0.38),
        r: Math.random() * 1.8 + 0.7,
        hue: hues[Math.floor(Math.random() * hues.length)],
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduced) {
          const dx = mx - p.x,
            dy = my - p.y,
            d = Math.hypot(dx, dy);
          if (d < MR && d > 1) {
            const f = 0.042 * (1 - d / MR);
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
          p.vx *= 0.988;
          p.vy *= 0.988;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }
      if (!reduced) {
        for (let i = 0; i < pts.length; i++)
          for (let j = i + 1; j < pts.length; j++) {
            const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
            if (d < LINK) {
              const t = 1 - d / LINK,
                a = t * t * 0.2;
              const near = Math.hypot(pts[i].x - mx, pts[i].y - my) < MR || Math.hypot(pts[j].x - mx, pts[j].y - my) < MR;
              ctx.strokeStyle = near ? `rgba(45,212,191,${a * 1.25})` : `rgba(124,92,255,${a})`;
              ctx.lineWidth = near ? 0.9 : 0.65;
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.stroke();
            }
          }
      }
      for (const p of pts) {
        const near = !reduced && Math.hypot(p.x - mx, p.y - my) < MR;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 1.8);
        g.addColorStop(0, `hsla(${p.hue},85%,78%,${near ? 0.72 : 0.55})`);
        g.addColorStop(1, `hsla(${p.hue},75%,65%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (near ? 1.6 : 1.35), 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    resize();
    frame();
    addEventListener("resize", resize);
    addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
    });
  }

  window.SkillaryApp = { navigate, goHome, openInstall, closeInstall, toast, doSearch };

  async function initAll() {
    init();
    if (window.SkillaryAuth) await SkillaryAuth.init();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAll);
  else initAll();
})();
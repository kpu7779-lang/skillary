/** Skillary 登录/注册 UI */
window.SkillaryAuth = (function () {
  const API = () => window.SkillaryAPI;
  const toast = (msg) => window.SkillaryApp?.toast?.(msg) || alert(msg);

  let user = null;
  let modalEl = null;

  function renderHeaderAuth() {
    const slot = document.getElementById("headerAuth");
    if (!slot) return;
    if (user) {
      slot.innerHTML = `
        <span class="user-chip">${user.name || user.email}</span>
        <button type="button" class="auth-btn ghost" id="logoutBtn">退出</button>`;
      document.getElementById("logoutBtn")?.addEventListener("click", handleLogout);
    } else {
      slot.innerHTML = `<button type="button" class="auth-btn ghost" id="loginBtn">登录</button>`;
      document.getElementById("loginBtn")?.addEventListener("click", () => openModal("login"));
    }
  }

  function ensureModal() {
    if (modalEl) return modalEl;
    modalEl = document.createElement("div");
    modalEl.id = "authModal";
    modalEl.className = "modal-overlay";
    modalEl.innerHTML = `
      <div class="modal-backdrop" data-close-auth></div>
      <div class="modal-panel auth-panel">
        <div class="modal-header">
          <div class="auth-tabs">
            <button type="button" class="auth-tab active" data-tab="login">登录</button>
            <button type="button" class="auth-tab" data-tab="register">注册</button>
          </div>
          <button type="button" class="modal-close" data-close-auth aria-label="关闭">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <form class="auth-form" id="authForm">
          <div class="form-group auth-name-field" hidden>
            <label>昵称</label>
            <input type="text" name="name" placeholder="你的昵称（可选）">
          </div>
          <div class="form-group">
            <label>邮箱</label>
            <input type="email" name="email" required placeholder="you@example.com">
          </div>
          <div class="form-group">
            <label>密码</label>
            <input type="password" name="password" required minlength="6" placeholder="至少 6 位">
          </div>
          <p class="auth-hint" id="authHint"></p>
          <button type="submit" class="btn-primary auth-submit">登录</button>
        </form>
      </div>`;
    document.body.appendChild(modalEl);

    let tab = "login";
    modalEl.querySelectorAll(".auth-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        tab = btn.dataset.tab;
        modalEl.querySelectorAll(".auth-tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
        modalEl.querySelector(".auth-name-field").hidden = tab !== "register";
        modalEl.querySelector(".auth-submit").textContent = tab === "login" ? "登录" : "注册";
        modalEl.querySelector("#authHint").textContent = "";
      });
    });

    modalEl.querySelectorAll("[data-close-auth]").forEach((el) => {
      el.addEventListener("click", closeModal);
    });

    modalEl.querySelector("#authForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const email = fd.get("email");
      const password = fd.get("password");
      const name = fd.get("name");
      const hint = modalEl.querySelector("#authHint");
      const submit = modalEl.querySelector(".auth-submit");
      submit.disabled = true;
      hint.textContent = "处理中…";

      try {
        if (tab === "register") {
          const { json } = await API().register({ email, password, name: name || undefined });
          if (!json.ok) {
            hint.textContent = json.error || "注册失败";
            return;
          }
          toast("注册成功，请登录");
          modalEl.querySelector('[data-tab="login"]').click();
        } else {
          const { res, json } = await API().login({ email, password });
          if (!res.ok || json?.error) {
            hint.textContent = "邮箱或密码错误";
            return;
          }
          toast("登录成功");
          closeModal();
          await refreshUser();
        }
      } catch {
        hint.textContent = "无法连接后端，请先启动 skillary-main（npm run dev）";
      } finally {
        submit.disabled = false;
        if (!hint.textContent.startsWith("无法")) hint.textContent = "";
      }
    });

    return modalEl;
  }

  function openModal(tab = "login") {
    ensureModal();
    modalEl.querySelector(`[data-tab="${tab}"]`)?.click();
    modalEl.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalEl?.classList.remove("open");
    document.body.style.overflow = "";
  }

  async function refreshUser() {
    try {
      const online = await API().ping();
      if (!online) {
        user = null;
        renderHeaderAuth();
        return null;
      }
      const { json } = await API().me();
      user = json.ok ? json.data.user : null;
    } catch {
      user = null;
    }
    renderHeaderAuth();
    window.dispatchEvent(new CustomEvent("skillary:auth", { detail: { user } }));
    return user;
  }

  async function handleLogout() {
    try {
      await API().logout();
    } catch { /* ignore */ }
    user = null;
    renderHeaderAuth();
    toast("已退出登录");
    window.dispatchEvent(new CustomEvent("skillary:auth", { detail: { user: null } }));
  }

  function getUser() {
    return user;
  }

  function requireLogin() {
    if (user) return true;
    openModal("login");
    return false;
  }

  async function init() {
    renderHeaderAuth();
    await refreshUser();
  }

  return { init, openModal, refreshUser, getUser, requireLogin, handleLogout };
})();
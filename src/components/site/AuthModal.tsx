"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
};

export function AuthModal({ open, onClose, defaultTab = "login" }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setEmail("");
    setPassword("");
    setName("");
    setLoading(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: name || undefined }),
      });
      const json = await res.json();
      if (!json.ok) {
        toast.error(json.error ?? "注册失败");
        return;
      }
      toast.success("注册成功，请登录");
      setTab("login");
    } catch {
      toast.error("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        toast.error("邮箱或密码错误");
        return;
      }
      toast.success("登录成功");
      handleClose();
    } catch {
      toast.error("登录失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md glass-card rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div className="flex gap-1 rounded-lg bg-white/[0.04] p-0.5">
                {(["login", "register"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={cn(
                      "rounded-md px-4 py-2 text-[13px] font-medium transition-colors",
                      tab === t
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:text-white/80"
                    )}
                  >
                    {t === "login" ? "登录" : "注册"}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="h-8 w-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:text-white"
                aria-label="关闭"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              className="p-6 space-y-4"
              onSubmit={tab === "login" ? handleLogin : handleRegister}
            >
              {tab === "register" && (
                <Field
                  icon={<User className="h-4 w-4" />}
                  label="昵称"
                  value={name}
                  onChange={setName}
                  placeholder="你的昵称（可选）"
                />
              )}
              <Field
                icon={<Mail className="h-4 w-4" />}
                label="邮箱"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                required
              />
              <Field
                icon={<Lock className="h-4 w-4" />}
                label="密码"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="至少 6 位"
                required
                minLength={6}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-[14px] font-semibold disabled:opacity-50"
              >
                {loading ? "处理中…" : tab === "login" ? "登录" : "注册"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  minLength,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <div>
      <label className="text-[12px] font-medium text-white/50 mb-1.5 block">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-4 py-3 text-[14px] text-white outline-none focus:border-violet-400/40 transition-colors"
        />
      </div>
    </div>
  );
}
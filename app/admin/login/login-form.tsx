"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(result.error ?? "Unable to sign in.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto grid max-w-xl gap-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Admin username
        <input autoComplete="username" name="username" required className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Password
        <input autoComplete="current-password" name="password" type="password" required className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" />
      </label>
      {error ? <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      <button disabled={pending} className="rounded-full bg-[#08142F] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

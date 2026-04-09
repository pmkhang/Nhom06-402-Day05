"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/client/api";

type HealthResponse = {
  status: string;
  ts: string;
};

export function HealthDemo() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await apiFetch<HealthResponse>("/api/health");
        setHealth(result);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unexpected error";
        setError(message);
      }
    };

    void load();
  }, []);

  return (
    <section className="glass-panel animate-in space-y-4 p-6 sm:p-7">
      <div>
        <p className="eyebrow">Kiểm tra hệ thống</p>
        <h1 className="serif-title mt-2 text-2xl text-[var(--color-primary-deep)] sm:text-3xl">
          Trạng thái kết nối API
        </h1>
        <p className="mt-2 text-sm leading-7 text-[var(--color-ink-soft)]">
          Màn hình này giúp xác nhận ứng dụng và API nội bộ đang hoạt động bình thường.
        </p>
      </div>

      <div className="rounded-2xl border border-emerald-900/10 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          Kết quả mới nhất
        </p>

        {error ? (
          <div className="mt-2 rounded-xl border border-red-300/40 bg-red-50 px-3 py-2 text-sm text-red-700">
            Lỗi kết nối: {error}
          </div>
        ) : null}

        {!error && !health ? (
          <div className="mt-3 animate-pulse space-y-2">
            <div className="h-3 w-28 rounded bg-emerald-100" />
            <div className="h-3 w-40 rounded bg-emerald-100" />
          </div>
        ) : null}

        {health ? (
          <div className="mt-3 rounded-xl border border-emerald-900/10 bg-[linear-gradient(160deg,#f7fffb_0%,#ffffff_100%)] p-3">
            <p className="text-sm font-semibold text-emerald-700">Hệ thống đang hoạt động</p>
            <p className="mt-1 text-sm text-slate-700">
              Trạng thái: <span className="font-medium">{health.status}</span>
            </p>
            <p className="text-sm text-slate-700">
              Cập nhật lúc: <span className="font-medium">{new Date(health.ts).toLocaleString("vi-VN")}</span>
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

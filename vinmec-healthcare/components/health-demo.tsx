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
    <div className="rounded-[var(--radius-card)] border border-emerald-900/10 bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold text-[var(--color-primary)]">Demo Health Check</h1>
      <p className="mt-3 text-sm text-slate-700">This page verifies that App Router and API route are connected.</p>
      <pre className="mt-4 overflow-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
        {JSON.stringify(error ? { error } : health ?? { loading: true }, null, 2)}
      </pre>
    </div>
  );
}

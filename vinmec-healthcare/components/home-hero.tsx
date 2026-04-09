export function HomeHero() {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-[var(--radius-card)] border border-emerald-900/10 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
        Vinmec Healthcare Assistant
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        MVP monolithic app is bootstrapped. Use this page to verify the frontend
        runs correctly before implementing feature phases.
      </p>
      <div className="mt-5 flex flex-wrap gap-3 text-sm">
        <a
          className="rounded-xl bg-[var(--color-primary)] px-4 py-2 font-medium text-white transition hover:opacity-90"
          href="/demo"
        >
          Open Demo Page
        </a>
        <a
          className="rounded-xl border border-emerald-900/20 px-4 py-2 font-medium text-[var(--color-primary)] transition hover:bg-emerald-50"
          href="/api/health"
          target="_blank"
          rel="noreferrer"
        >
          Check /api/health
        </a>
      </div>
    </section>
  );
}

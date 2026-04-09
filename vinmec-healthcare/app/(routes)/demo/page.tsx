import { HealthDemo } from "@/components/health-demo";

export default function DemoPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-3xl flex-col justify-center px-4 py-10 sm:px-6">
      <HealthDemo />
    </main>
  );
}

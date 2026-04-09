import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vinmec Healthcare",
  description: "Vinmec AI Assistant MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--color-surface)] text-slate-900">
        <header className="border-b border-emerald-950/10 bg-white/80 backdrop-blur">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
            <p className="text-sm font-semibold tracking-wide text-[var(--color-primary)]">
              Vinmec Healthcare Assistant
            </p>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BYOS — Bring Your Own Software",
  description:
    "Enterprise platform where engineers bring their own tools, get them security-certified, and use them freely.",
};

function ShieldIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-emerald-500"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function Header() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/locker", label: "Locker" },
    { href: "/submit", label: "Submit" },
    { href: "/security", label: "Security" },
    { href: "/how-it-works", label: "How It Works" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border-default bg-surface-base/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <ShieldIcon />
          <span className="text-lg font-semibold tracking-tight text-text-primary">
            BYOS
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/submit"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-text-inverse transition-colors hover:bg-emerald-600"
        >
          Submit a Tool
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border-default bg-surface-base">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <ShieldIcon />
          <span>BYOS — Bring Your Own Software</span>
        </div>
        <p className="text-sm text-text-muted">
          Built by{" "}
          <a
            href="https://github.com/MithunXcpu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 transition-colors hover:text-emerald-400"
          >
            Mithun
          </a>
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-surface-base font-sans text-text-primary antialiased`}
      >
        <Header />
        <main className="min-h-[calc(100vh-140px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

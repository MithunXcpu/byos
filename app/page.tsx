"use client";

import { useState, useMemo } from "react";
import {
  defaultTools,
  recentScans,
  securityPolicies,
  TOOL_CATEGORIES,
  type Tool,
  type ToolStatus,
  type SecurityScan,
  type ToolCategory,
} from "./data";

/* ─── Icons (inline SVG, no external deps) ────────────────────────────── */

function ShieldCheckIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ClockIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function XCircleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function BoxIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function SearchIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ChevronRightIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ShieldIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function GlobeIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function KeyIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

function ScanIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <line x1="7" x2="17" y1="12" y2="12" />
    </svg>
  );
}

function NetworkIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  );
}

function UploadIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function ActivityIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function CheckCircleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function LockIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/* ─── Policy icon resolver ─────────────────────────────────────────────── */

function PolicyIcon({ icon, className = "size-6" }: { icon: string; className?: string }) {
  switch (icon) {
    case "shield":
      return <ShieldIcon className={className} />;
    case "globe":
      return <GlobeIcon className={className} />;
    case "key":
      return <KeyIcon className={className} />;
    case "scan":
      return <ScanIcon className={className} />;
    case "network":
      return <NetworkIcon className={className} />;
    default:
      return <ShieldIcon className={className} />;
  }
}

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function statusColor(status: ToolStatus) {
  switch (status) {
    case "certified":
      return "text-status-certified";
    case "pending":
      return "text-status-pending";
    case "denied":
      return "text-status-denied";
  }
}

function statusBg(status: ToolStatus) {
  switch (status) {
    case "certified":
      return "bg-emerald-900/40 text-status-certified border border-emerald-700/30";
    case "pending":
      return "bg-amber-900/40 text-status-pending border border-amber-700/30";
    case "denied":
      return "bg-red-900/40 text-status-denied border border-red-700/30";
  }
}

function riskBg(risk: string) {
  switch (risk) {
    case "low":
      return "bg-emerald-900/30 text-risk-low border border-emerald-700/20";
    case "medium":
      return "bg-amber-900/30 text-risk-medium border border-amber-700/20";
    case "high":
      return "bg-red-900/30 text-risk-high border border-red-700/20";
    default:
      return "bg-surface-elevated text-text-muted";
  }
}

function scoreBarColor(score: number) {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-red-500";
}

function statusLabel(status: ToolStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

/* ─── Section wrapper ──────────────────────────────────────────────────── */

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-6 py-16 ${className}`}>
      {children}
    </section>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border-default">
      {/* Glow backdrop */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-700/30 bg-emerald-900/20 px-4 py-1.5 text-sm text-emerald-400">
          <ShieldCheckIcon className="size-4" />
          <span>Enterprise Software Certification</span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          Bring Your Own{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Software
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
          Engineers submit their tools. Security scans them. Certified tools
          enter the Software Locker. Enterprise security meets developer
          freedom.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#locker"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-text-inverse shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/30"
          >
            <UploadIcon className="size-4" />
            Submit a Tool
          </a>
          <a
            href="#locker"
            className="inline-flex items-center gap-2 rounded-xl border border-border-default bg-surface-card px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-hover"
          >
            <LockIcon className="size-4" />
            View Locker
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS DASHBOARD
   ═══════════════════════════════════════════════════════════════════════════ */

function StatsDashboard() {
  const totalTools = defaultTools.length;
  const certified = defaultTools.filter((t) => t.status === "certified").length;
  const pending = defaultTools.filter((t) => t.status === "pending").length;
  const denied = defaultTools.filter((t) => t.status === "denied").length;

  const stats = [
    {
      label: "Total Tools",
      value: totalTools,
      icon: <BoxIcon className="size-6" />,
      color: "text-emerald-400",
      bg: "bg-emerald-900/20",
    },
    {
      label: "Certified",
      value: certified,
      icon: <ShieldCheckIcon className="size-6" />,
      color: "text-status-certified",
      bg: "bg-emerald-900/20",
    },
    {
      label: "Pending Review",
      value: pending,
      icon: <ClockIcon className="size-6" />,
      color: "text-status-pending",
      bg: "bg-amber-900/20",
    },
    {
      label: "Denied",
      value: denied,
      icon: <XCircleIcon className="size-6" />,
      color: "text-status-denied",
      bg: "bg-red-900/20",
    },
  ];

  return (
    <Section>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-2xl border border-border-default bg-surface-card p-6 transition-colors hover:border-border-focus/30 hover:bg-surface-hover"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-text-muted">{stat.label}</p>
              <div className={`rounded-lg ${stat.bg} p-2 ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <p className={`mt-3 text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOOL CARD
   ═══════════════════════════════════════════════════════════════════════════ */

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border-default bg-surface-card transition-all hover:border-border-focus/30 hover:bg-surface-hover">
      {/* Gradient header */}
      <div className={`relative h-24 rounded-t-2xl bg-gradient-to-br ${tool.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <span className="text-lg font-bold text-white">
              {tool.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{tool.name}</h3>
            <span className="text-xs text-white/70">{tool.category}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Status & risk badges */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBg(tool.status)}`}>
            {tool.status === "certified" && <ShieldCheckIcon className="size-3" />}
            {tool.status === "pending" && <ClockIcon className="size-3" />}
            {tool.status === "denied" && <XCircleIcon className="size-3" />}
            {statusLabel(tool.status)}
          </span>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${riskBg(tool.riskLevel)}`}>
            {tool.riskLevel.charAt(0).toUpperCase() + tool.riskLevel.slice(1)} Risk
          </span>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-text-secondary line-clamp-3">
          {tool.description}
        </p>

        {/* Security score */}
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-text-muted">Security Score</span>
            <span className={`font-semibold ${tool.securityScore >= 80 ? "text-status-certified" : tool.securityScore >= 60 ? "text-status-pending" : "text-status-denied"}`}>
              {tool.securityScore}/100
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-elevated">
            <div
              className={`h-full rounded-full transition-all ${scoreBarColor(tool.securityScore)}`}
              style={{ width: `${tool.securityScore}%` }}
            />
          </div>
        </div>

        {/* Permissions */}
        <div className="mb-3">
          <p className="mb-1.5 text-xs font-medium text-text-muted">Permissions</p>
          <div className="flex flex-wrap gap-1">
            {tool.permissions.map((perm) => (
              <span
                key={perm}
                className="rounded-md border border-border-subtle bg-surface-elevated px-2 py-0.5 text-xs text-text-secondary"
              >
                {perm}
              </span>
            ))}
          </div>
        </div>

        {/* Data access */}
        <div>
          <p className="mb-1.5 text-xs font-medium text-text-muted">Data Access</p>
          <div className="flex flex-wrap gap-1">
            {tool.dataAccess.map((access) => (
              <span
                key={access}
                className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                  access === "Customer data"
                    ? "bg-red-900/30 text-red-400 border border-red-700/20"
                    : access === "None"
                      ? "bg-emerald-900/30 text-emerald-400 border border-emerald-700/20"
                      : "bg-amber-900/30 text-amber-400 border border-amber-700/20"
                }`}
              >
                {access}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SOFTWARE LOCKER
   ═══════════════════════════════════════════════════════════════════════════ */

function SoftwareLocker() {
  const [statusFilter, setStatusFilter] = useState<"all" | ToolStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filteredTools = useMemo(() => {
    return defaultTools.filter((tool) => {
      const matchesStatus =
        statusFilter === "all" || tool.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || tool.category === categoryFilter;
      const matchesSearch =
        search === "" ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.category.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [statusFilter, categoryFilter, search]);

  const statusTabs: { label: string; value: "all" | ToolStatus }[] = [
    { label: "All", value: "all" },
    { label: "Certified", value: "certified" },
    { label: "Pending", value: "pending" },
    { label: "Denied", value: "denied" },
  ];

  return (
    <Section id="locker">
      <SectionHeading
        title="Software Locker"
        subtitle="Browse, filter, and review all submitted tools and their certification status."
      />

      {/* Filter bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status tabs */}
        <div className="flex items-center gap-1 rounded-xl border border-border-default bg-surface-card p-1">
          {statusTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                statusFilter === tab.value
                  ? "bg-emerald-500 text-text-inverse"
                  : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Category dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-border-default bg-surface-input px-4 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-border-focus"
          >
            <option value="all">All Categories</option>
            {TOOL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 rounded-xl border border-border-default bg-surface-input py-2.5 pl-9 pr-4 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-border-focus"
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-text-muted">
        Showing {filteredTools.length} of {defaultTools.length} tools
      </p>

      {/* Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border-default bg-surface-card px-6 py-20 text-center">
          <SearchIcon className="mb-4 size-10 text-text-muted" />
          <p className="text-lg font-medium text-text-primary">No tools found</p>
          <p className="mt-1 text-sm text-text-secondary">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   RECENT SECURITY SCANS
   ═══════════════════════════════════════════════════════════════════════════ */

function RecentScans() {
  return (
    <Section>
      <SectionHeading
        title="Recent Security Scans"
        subtitle="Latest automated scan results across all submitted tools."
      />

      <div className="overflow-hidden rounded-2xl border border-border-default">
        {/* Table header */}
        <div className="hidden border-b border-border-default bg-surface-card px-6 py-3 sm:grid sm:grid-cols-6 sm:gap-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Tool</p>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Submitter</p>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Date</p>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Status</p>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Risk</p>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Score</p>
        </div>

        {/* Rows */}
        {recentScans.map((scan, i) => (
          <div
            key={`${scan.toolName}-${i}`}
            className={`flex flex-col gap-2 border-b border-border-subtle px-6 py-4 transition-colors hover:bg-surface-hover sm:grid sm:grid-cols-6 sm:items-center sm:gap-4 ${
              i === recentScans.length - 1 ? "border-b-0" : ""
            }`}
          >
            {/* Tool name */}
            <div>
              <p className="text-sm font-medium text-text-primary">{scan.toolName}</p>
              <p className="text-xs text-text-muted sm:hidden">{scan.submittedBy}</p>
            </div>
            {/* Submitter */}
            <p className="hidden text-sm text-text-secondary sm:block">{scan.submittedBy}</p>
            {/* Date */}
            <p className="text-sm text-text-secondary">{scan.date}</p>
            {/* Status */}
            <div>
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBg(scan.status)}`}>
                {statusLabel(scan.status)}
              </span>
            </div>
            {/* Risk */}
            <div>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${riskBg(scan.riskLevel)}`}>
                {scan.riskLevel.charAt(0).toUpperCase() + scan.riskLevel.slice(1)}
              </span>
            </div>
            {/* Score */}
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-elevated">
                <div
                  className={`h-full rounded-full ${scoreBarColor(scan.score)}`}
                  style={{ width: `${scan.score}%` }}
                />
              </div>
              <span className={`text-sm font-semibold ${scan.score >= 80 ? "text-status-certified" : scan.score >= 60 ? "text-status-pending" : "text-status-denied"}`}>
                {scan.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECURITY POLICIES
   ═══════════════════════════════════════════════════════════════════════════ */

function SecurityPolicies() {
  return (
    <Section>
      <SectionHeading
        title="Security Policies"
        subtitle="Every submitted tool is evaluated against these enterprise security standards."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {securityPolicies.map((policy) => (
          <div
            key={policy.name}
            className="group rounded-2xl border border-border-default bg-surface-card p-6 transition-all hover:border-border-focus/30 hover:bg-surface-hover"
          >
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-emerald-900/20 text-emerald-400">
              <PolicyIcon icon={policy.icon} className="size-6" />
            </div>
            <h3 className="mb-2 text-base font-semibold text-text-primary">
              {policy.name}
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              {policy.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════════════════════════════════════ */

function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Submit Your Tool",
      description:
        "Engineers submit the software they want to use, with justification and required permissions.",
      icon: <UploadIcon className="size-6" />,
    },
    {
      step: "02",
      title: "Automated Security Scan",
      description:
        "Our engine scans dependencies, network endpoints, OAuth scopes, and data handling practices.",
      icon: <ScanIcon className="size-6" />,
    },
    {
      step: "03",
      title: "Risk Assessment",
      description:
        "A security score is generated based on vulnerability scans, data access analysis, and policy compliance.",
      icon: <ActivityIcon className="size-6" />,
    },
    {
      step: "04",
      title: "Certified or Denied",
      description:
        "Tools that pass enter the Software Locker. Denied tools receive a detailed security report.",
      icon: <CheckCircleIcon className="size-6" />,
    },
  ];

  return (
    <Section>
      <SectionHeading
        title="How It Works"
        subtitle="From submission to certification in four steps."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.step} className="relative">
            {/* Connector line (hidden on last item and small screens) */}
            {i < steps.length - 1 && (
              <div className="absolute right-0 top-12 hidden h-px w-6 bg-border-default lg:block" style={{ right: "-24px" }}>
                <ChevronRightIcon className="absolute -right-2 -top-1.5 size-3 text-emerald-500" />
              </div>
            )}

            <div className="flex flex-col rounded-2xl border border-border-default bg-surface-card p-6 transition-all hover:border-border-focus/30 hover:bg-surface-hover">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-900/20 text-emerald-400">
                  {s.icon}
                </div>
                <span className="font-mono text-xs font-bold text-text-muted">
                  STEP {s.step}
                </span>
              </div>
              <h3 className="mb-2 text-base font-semibold text-text-primary">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsDashboard />
      <SoftwareLocker />
      <RecentScans />
      <SecurityPolicies />
      <HowItWorks />
    </>
  );
}

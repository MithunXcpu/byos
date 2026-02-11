export type ToolStatus = "certified" | "pending" | "denied";
export type RiskLevel = "low" | "medium" | "high";
export type ToolCategory =
  | "IDE"
  | "Design"
  | "DevOps"
  | "Communication"
  | "Security"
  | "Analytics"
  | "AI/ML"
  | "Productivity"
  | "Database"
  | "Browser"
  | "Terminal"
  | "Project Mgmt"
  | "Notes";

export type DataAccess =
  | "None"
  | "Code repos"
  | "Customer data"
  | "Internal docs"
  | "Communication"
  | "Analytics";

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  status: ToolStatus;
  riskLevel: RiskLevel;
  submittedBy: string;
  dateSubmitted: string;
  dateCertified?: string;
  description: string;
  permissions: string[];
  dataAccess: DataAccess[];
  securityScore: number;
  url?: string;
  justification?: string;
  gradient: string;
}

export interface SecurityScan {
  toolName: string;
  submittedBy: string;
  date: string;
  status: ToolStatus;
  riskLevel: RiskLevel;
  score: number;
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  "IDE",
  "Design",
  "DevOps",
  "Communication",
  "Security",
  "Analytics",
  "AI/ML",
  "Productivity",
  "Database",
  "Browser",
  "Terminal",
  "Project Mgmt",
  "Notes",
];

export const DATA_ACCESS_OPTIONS: DataAccess[] = [
  "None",
  "Code repos",
  "Customer data",
  "Internal docs",
  "Communication",
  "Analytics",
];

export const GRADIENTS = [
  "from-gradient-violet-from to-gradient-violet-to",
  "from-gradient-blue-from to-gradient-blue-to",
  "from-gradient-rose-from to-gradient-rose-to",
  "from-gradient-amber-from to-gradient-amber-to",
  "from-gradient-sky-from to-gradient-sky-to",
  "from-gradient-emerald-from to-gradient-emerald-to",
  "from-gradient-orange-from to-gradient-orange-to",
  "from-gradient-indigo-from to-gradient-indigo-to",
];

export const defaultTools: Tool[] = [
  {
    id: "tool-001",
    name: "Cursor",
    category: "IDE",
    status: "certified",
    riskLevel: "low",
    submittedBy: "Alex Chen",
    dateSubmitted: "2024-09-15",
    dateCertified: "2024-09-16",
    description:
      "AI-powered code editor built on VS Code. Enhances developer productivity with inline AI completions and chat-based code generation.",
    permissions: ["File system read/write", "Network access"],
    dataAccess: ["Code repos"],
    securityScore: 95,
    gradient: "from-gradient-violet-from to-gradient-violet-to",
  },
  {
    id: "tool-002",
    name: "Warp",
    category: "Terminal",
    status: "certified",
    riskLevel: "low",
    submittedBy: "Jordan Lee",
    dateSubmitted: "2024-09-18",
    dateCertified: "2024-09-19",
    description:
      "Modern terminal with AI command suggestions, block-based output, and collaborative workflows for development teams.",
    permissions: ["Shell access", "Network access"],
    dataAccess: ["None"],
    securityScore: 92,
    gradient: "from-gradient-sky-from to-gradient-sky-to",
  },
  {
    id: "tool-003",
    name: "Raycast",
    category: "Productivity",
    status: "certified",
    riskLevel: "low",
    submittedBy: "Sam Patel",
    dateSubmitted: "2024-09-20",
    dateCertified: "2024-09-21",
    description:
      "Blazingly fast productivity launcher with extensions, clipboard history, snippets, and deep integrations with developer tools.",
    permissions: ["Accessibility", "File system read"],
    dataAccess: ["None"],
    securityScore: 94,
    gradient: "from-gradient-orange-from to-gradient-orange-to",
  },
  {
    id: "tool-004",
    name: "Linear",
    category: "Project Mgmt",
    status: "certified",
    riskLevel: "low",
    submittedBy: "Taylor Kim",
    dateSubmitted: "2024-10-01",
    dateCertified: "2024-10-02",
    description:
      "Streamlined project management built for software teams. Fast, keyboard-driven interface with powerful integrations.",
    permissions: ["Network access"],
    dataAccess: ["Internal docs"],
    securityScore: 96,
    gradient: "from-gradient-indigo-from to-gradient-indigo-to",
  },
  {
    id: "tool-005",
    name: "Figma",
    category: "Design",
    status: "certified",
    riskLevel: "low",
    submittedBy: "Morgan Rivera",
    dateSubmitted: "2024-10-05",
    dateCertified: "2024-10-06",
    description:
      "Collaborative design tool for interface design, prototyping, and design systems. Browser-based with real-time collaboration.",
    permissions: ["Network access", "Clipboard"],
    dataAccess: ["Internal docs"],
    securityScore: 93,
    gradient: "from-gradient-rose-from to-gradient-rose-to",
  },
  {
    id: "tool-006",
    name: "Notion",
    category: "Productivity",
    status: "certified",
    riskLevel: "medium",
    submittedBy: "Casey Zhang",
    dateSubmitted: "2024-10-10",
    dateCertified: "2024-10-12",
    description:
      "All-in-one workspace for notes, docs, wikis, and project management. Stores data in cloud with extensive sharing capabilities.",
    permissions: ["Network access", "File upload"],
    dataAccess: ["Internal docs", "Customer data"],
    securityScore: 78,
    gradient: "from-gradient-amber-from to-gradient-amber-to",
  },
  {
    id: "tool-007",
    name: "Obsidian",
    category: "Notes",
    status: "certified",
    riskLevel: "low",
    submittedBy: "Riley Martinez",
    dateSubmitted: "2024-10-15",
    dateCertified: "2024-10-16",
    description:
      "Local-first markdown knowledge base with bidirectional linking. All data stored on device, optional sync via encrypted vault.",
    permissions: ["File system read/write"],
    dataAccess: ["None"],
    securityScore: 97,
    gradient: "from-gradient-violet-from to-gradient-violet-to",
  },
  {
    id: "tool-008",
    name: "Arc Browser",
    category: "Browser",
    status: "certified",
    riskLevel: "low",
    submittedBy: "Dakota Brown",
    dateSubmitted: "2024-10-18",
    dateCertified: "2024-10-19",
    description:
      "Chromium-based browser with spaces, profiles, and a clean sidebar-driven interface. Built-in ad blocking and privacy features.",
    permissions: ["Network access", "Camera", "Microphone"],
    dataAccess: ["None"],
    securityScore: 90,
    gradient: "from-gradient-blue-from to-gradient-blue-to",
  },
  {
    id: "tool-009",
    name: "Postman",
    category: "DevOps",
    status: "certified",
    riskLevel: "medium",
    submittedBy: "Quinn Foster",
    dateSubmitted: "2024-10-22",
    dateCertified: "2024-10-24",
    description:
      "API development and testing platform. Supports REST, GraphQL, and WebSocket. Stores collections with environment variables and API keys.",
    permissions: ["Network access", "File system read/write"],
    dataAccess: ["Code repos", "Internal docs"],
    securityScore: 76,
    gradient: "from-gradient-orange-from to-gradient-orange-to",
  },
  {
    id: "tool-010",
    name: "TablePlus",
    category: "Database",
    status: "pending",
    riskLevel: "medium",
    submittedBy: "Avery Wilson",
    dateSubmitted: "2024-11-01",
    description:
      "Native database management GUI supporting PostgreSQL, MySQL, SQLite, and more. Direct connection to production databases possible.",
    permissions: ["Network access", "File system read/write"],
    dataAccess: ["Customer data", "Internal docs"],
    securityScore: 68,
    gradient: "from-gradient-emerald-from to-gradient-emerald-to",
  },
  {
    id: "tool-011",
    name: "ngrok",
    category: "DevOps",
    status: "pending",
    riskLevel: "high",
    submittedBy: "Jamie Scott",
    dateSubmitted: "2024-11-05",
    description:
      "Secure tunneling to expose local servers to the internet. Creates public URLs for local development environments. Potential data exfiltration vector.",
    permissions: ["Network access", "Shell access"],
    dataAccess: ["Code repos", "Internal docs"],
    securityScore: 42,
    gradient: "from-gradient-rose-from to-gradient-rose-to",
  },
  {
    id: "tool-012",
    name: "Tailscale",
    category: "Security",
    status: "certified",
    riskLevel: "medium",
    submittedBy: "Drew Anderson",
    dateSubmitted: "2024-11-08",
    dateCertified: "2024-11-10",
    description:
      "Zero-config mesh VPN built on WireGuard. Creates secure private networks between devices with SSO integration.",
    permissions: ["Network access", "System configuration"],
    dataAccess: ["None"],
    securityScore: 85,
    gradient: "from-gradient-sky-from to-gradient-sky-to",
  },
  {
    id: "tool-013",
    name: "1Password",
    category: "Security",
    status: "certified",
    riskLevel: "low",
    submittedBy: "Sage Thompson",
    dateSubmitted: "2024-11-10",
    dateCertified: "2024-11-11",
    description:
      "Enterprise password manager with zero-knowledge encryption, SSO integration, and secrets automation for development workflows.",
    permissions: ["Browser extension", "Clipboard"],
    dataAccess: ["None"],
    securityScore: 98,
    gradient: "from-gradient-blue-from to-gradient-blue-to",
  },
  {
    id: "tool-014",
    name: "GitHub Copilot",
    category: "AI/ML",
    status: "certified",
    riskLevel: "medium",
    submittedBy: "Emery Davis",
    dateSubmitted: "2024-11-15",
    dateCertified: "2024-11-18",
    description:
      "AI pair programmer that suggests code completions. Sends code context to cloud for processing. Enterprise plan offers data retention controls.",
    permissions: ["Code editor integration", "Network access"],
    dataAccess: ["Code repos"],
    securityScore: 80,
    gradient: "from-gradient-amber-from to-gradient-amber-to",
  },
  {
    id: "tool-015",
    name: "Claude Code",
    category: "AI/ML",
    status: "certified",
    riskLevel: "medium",
    submittedBy: "Reese Park",
    dateSubmitted: "2024-11-20",
    dateCertified: "2024-11-22",
    description:
      "Agentic coding tool from Anthropic. Understands full codebase context, can edit files, run commands, and search code. Enterprise-grade privacy controls.",
    permissions: ["File system read/write", "Shell access", "Network access"],
    dataAccess: ["Code repos"],
    securityScore: 82,
    gradient: "from-gradient-emerald-from to-gradient-emerald-to",
  },
  {
    id: "tool-016",
    name: "Slack Connect",
    category: "Communication",
    status: "denied",
    riskLevel: "high",
    submittedBy: "Harper Moore",
    dateSubmitted: "2024-11-25",
    description:
      "External channel sharing feature allowing direct communication with outside organizations. Creates unmonitored data sharing pathways.",
    permissions: ["Network access", "File sharing"],
    dataAccess: ["Internal docs", "Customer data", "Communication"],
    securityScore: 28,
    gradient: "from-gradient-indigo-from to-gradient-indigo-to",
  },
  {
    id: "tool-017",
    name: "WeTransfer",
    category: "Productivity",
    status: "denied",
    riskLevel: "high",
    submittedBy: "Blake Taylor",
    dateSubmitted: "2024-12-01",
    description:
      "Cloud file sharing service with no encryption at rest for free tier. Files accessible via public links. No audit trail for enterprise compliance.",
    permissions: ["File upload", "Network access"],
    dataAccess: ["Internal docs", "Customer data"],
    securityScore: 22,
    gradient: "from-gradient-rose-from to-gradient-rose-to",
  },
];

export const recentScans: SecurityScan[] = [
  {
    toolName: "Claude Code",
    submittedBy: "Reese Park",
    date: "2024-11-22",
    status: "certified",
    riskLevel: "medium",
    score: 82,
  },
  {
    toolName: "Slack Connect",
    submittedBy: "Harper Moore",
    date: "2024-11-25",
    status: "denied",
    riskLevel: "high",
    score: 28,
  },
  {
    toolName: "WeTransfer",
    submittedBy: "Blake Taylor",
    date: "2024-12-01",
    status: "denied",
    riskLevel: "high",
    score: 22,
  },
  {
    toolName: "1Password",
    submittedBy: "Sage Thompson",
    date: "2024-11-11",
    status: "certified",
    riskLevel: "low",
    score: 98,
  },
  {
    toolName: "ngrok",
    submittedBy: "Jamie Scott",
    date: "2024-11-05",
    status: "pending",
    riskLevel: "high",
    score: 42,
  },
  {
    toolName: "TablePlus",
    submittedBy: "Avery Wilson",
    date: "2024-11-01",
    status: "pending",
    riskLevel: "medium",
    score: 68,
  },
  {
    toolName: "GitHub Copilot",
    submittedBy: "Emery Davis",
    date: "2024-11-18",
    status: "certified",
    riskLevel: "medium",
    score: 80,
  },
  {
    toolName: "Tailscale",
    submittedBy: "Drew Anderson",
    date: "2024-11-10",
    status: "certified",
    riskLevel: "medium",
    score: 85,
  },
];

export const securityPolicies = [
  {
    name: "SOC 2 Alignment",
    description:
      "Verify the tool meets SOC 2 Type II controls for security, availability, and confidentiality.",
    icon: "shield",
  },
  {
    name: "GDPR Data Handling",
    description:
      "Assess data processing agreements, storage locations, and right-to-deletion support.",
    icon: "globe",
  },
  {
    name: "OAuth Scope Review",
    description:
      "Analyze requested OAuth scopes and ensure minimal permission principles are followed.",
    icon: "key",
  },
  {
    name: "Dependency Vulnerability Scan",
    description:
      "Scan all third-party dependencies for known CVEs and supply chain risks.",
    icon: "scan",
  },
  {
    name: "Network Access Audit",
    description:
      "Map all network endpoints the tool communicates with and verify against allowed domains.",
    icon: "network",
  },
];

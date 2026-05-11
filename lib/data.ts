import {
  Activity,
  Bot,
  Bug,
  CheckCircle2,
  Eye,
  Gauge,
  GitPullRequest,
  KeyRound,
  MonitorCheck,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";

export const partnerLogos = ["Vercel", "Linear", "GitHub", "Playwright", "Stripe", "Raycast", "Cursor", "Arc"];

export const workflow = [
  { title: "PR detected", detail: "Diff-aware impact map generated", icon: GitPullRequest },
  { title: "Browser launched", detail: "Chromium workers replay key paths", icon: MonitorCheck },
  { title: "AI explores app", detail: "Planner adapts to UI changes", icon: Bot },
  { title: "Screenshots captured", detail: "Evidence saved with DOM context", icon: Eye },
  { title: "UX analyzed", detail: "Accessibility, layout, copy, and friction", icon: Sparkles },
  { title: "Report generated", detail: "Repro steps, severity, confidence", icon: CheckCircle2 }
];

export const features = [
  {
    title: "Natural language testing",
    detail: "Describe a flow once. TesterArmy expands it into deterministic checks, exploratory branches, and user-intent assertions.",
    icon: Sparkles,
    accent: "cyan"
  },
  {
    title: "OAuth, OTP, and session handling",
    detail: "Authentication flows are treated as first-class product behavior instead of brittle setup scripts.",
    icon: KeyRound,
    accent: "green"
  },
  {
    title: "Visual regression intelligence",
    detail: "Screenshots are interpreted like a senior QA reviewer, catching overlap, missing affordances, and suspicious UI shifts.",
    icon: Eye,
    accent: "amber"
  },
  {
    title: "Autonomous QA agents",
    detail: "Agents inspect nearby workflows, retry flaky paths, and continue testing after non-blocking failures.",
    icon: Bot,
    accent: "violet"
  },
  {
    title: "GitHub PR reviews",
    detail: "Every pull request gets changed-flow coverage, risk notes, visual evidence, and a release gate summary.",
    icon: GitPullRequest,
    accent: "cyan"
  },
  {
    title: "Production monitoring",
    detail: "Critical paths are checked continuously without noisy alerts. Downtime, login failures, and degraded UX are escalated.",
    icon: Activity,
    accent: "green"
  },
  {
    title: "Accessibility audits",
    detail: "Keyboard traps, missing labels, contrast failures, and touch target issues are reported with severity and context.",
    icon: ShieldCheck,
    accent: "amber"
  },
  {
    title: "Performance insights",
    detail: "TesterArmy watches API latency, hydration errors, blocking assets, and animation jank during real flows.",
    icon: Gauge,
    accent: "red"
  }
];

export const timeline = [
  { time: "00:01", kind: "browser", title: "Open /checkout", detail: "Viewport: iPhone 15 Pro, saved auth session" },
  { time: "00:07", kind: "action", title: "Apply coupon SPRING-OLD", detail: "Network returned 422 with stale validation copy" },
  { time: "00:12", kind: "vision", title: "Screenshot diff detected", detail: "CTA overlaps error copy by 18px" },
  { time: "00:18", kind: "retry", title: "Retry after refresh", detail: "Issue reproduced twice, confidence upgraded" },
  { time: "00:23", kind: "report", title: "Bug report generated", detail: "High severity, PR #428 blocked" }
];

export const dashboardRuns = [
  { name: "Checkout regression", env: "Preview", health: 82, status: "Blocked", severity: "High" },
  { name: "Signup smoke", env: "Staging", health: 97, status: "Passed", severity: "None" },
  { name: "Mobile visual sweep", env: "Preview", health: 88, status: "Review", severity: "Medium" },
  { name: "Production heartbeat", env: "Prod", health: 99, status: "Passed", severity: "None" }
];

export const activityFeed = [
  "Planner inferred checkout as highest revenue-risk path.",
  "Browser worker recovered after renamed Continue button.",
  "Vision verifier flagged mobile overlap in coupon state.",
  "Accessibility audit found modal focus escape.",
  "PR review comment drafted with reproduction steps."
];

export const reasoningLogs = [
  "[planner] User persona: returning buyer with saved cart",
  "[browser] Launching chromium session: preview-428",
  "[action] type coupon SPRING-OLD",
  "[network] /api/coupons -> 422 in 184ms",
  "[vision] CTA bounding box intersects validation region",
  "[a11y] focus escaped payment modal after 6 tab presses",
  "[report] release gate: blocked, confidence high"
];

export const pricing = [
  {
    name: "Launch",
    price: "$49",
    description: "For founders shipping weekly.",
    features: ["300 AI test minutes", "Visual evidence reports", "1 GitHub repo", "Slack alerts"]
  },
  {
    name: "Scale",
    price: "$149",
    description: "For product teams with real release gates.",
    featured: true,
    features: ["2,000 AI test minutes", "Parallel browser workers", "PR impact analysis", "Production monitoring"]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For regulated teams and large surfaces.",
    features: ["SSO and audit logs", "Private runners", "Custom retention", "Dedicated QA strategy"]
  }
];

export const severityIcon = Bug;
export const speedIcon = Zap;

"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bug,
  ChevronLeft,
  Command,
  Eye,
  GitPullRequest,
  Home,
  KeyRound,
  Loader2,
  MonitorCheck,
  PlayCircle,
  Search,
  Settings,
  ShieldCheck,
  Terminal,
  Video
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { activityFeed, dashboardRuns, reasoningLogs } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VisualSandbox } from "@/components/dashboard/visual-sandbox";

const nav = [
  { label: "Overview", icon: Home },
  { label: "Runs", icon: PlayCircle },
  { label: "Evidence", icon: Eye },
  { label: "PR reviews", icon: GitPullRequest },
  { label: "Monitors", icon: MonitorCheck },
  { label: "Settings", icon: Settings }
];

const commands = [
  { id: "run-sweep", label: "Run AI Sweep", shortcut: "⌘R" },
  { id: "switch-prod", label: "Switch to Production Environment", shortcut: "⌘P" },
  { id: "switch-staging", label: "Switch to Staging Environment", shortcut: "⌘S" },
  { id: "switch-preview", label: "Switch to Preview Environment", shortcut: "⌘V" },
  { id: "filter-high", label: "Filter by High Severity Runs", shortcut: "⌘H" },
  { id: "filter-all", label: "Show All Runs", shortcut: "⌘A" },
  { id: "view-mobile", label: "View Mobile Screenshot Diffs", shortcut: "⌘M" },
  { id: "reset-sim", label: "Reset Simulation State", shortcut: "⌘X" }
];

const SIMULATION_STEPS = [
  {
    step: 0,
    metrics: {
      health: { value: "100%", status: "Checking..." },
      sessions: { value: "0", status: "Starting..." },
      diffs: { value: "0", status: "Idle" },
      assertions: { value: "0", status: "Queued" }
    },
    logs: [
      "[planner] User persona: returning buyer with saved cart"
    ],
    activities: [],
    runHealth: 100,
    screenshotState: "loading",
    showA11yAlert: false
  },
  {
    step: 1,
    metrics: {
      health: { value: "98%", status: "Checking..." },
      sessions: { value: "2", status: "Live" },
      diffs: { value: "0", status: "Idle" },
      assertions: { value: "15", status: "Running" }
    },
    logs: [
      "[planner] User persona: returning buyer with saved cart",
      "[browser] Launching chromium session: preview-428"
    ],
    activities: [
      "Planner inferred checkout as highest revenue-risk path."
    ],
    runHealth: 98,
    screenshotState: "clean",
    showA11yAlert: false
  },
  {
    step: 2,
    metrics: {
      health: { value: "95%", status: "Checking..." },
      sessions: { value: "4", status: "Live" },
      diffs: { value: "0", status: "Idle" },
      assertions: { value: "42", status: "Running" }
    },
    logs: [
      "[planner] User persona: returning buyer with saved cart",
      "[browser] Launching chromium session: preview-428",
      "[action] type coupon SPRING-OLD"
    ],
    activities: [
      "Planner inferred checkout as highest revenue-risk path.",
      "Browser worker recovered after renamed Continue button."
    ],
    runHealth: 95,
    screenshotState: "typing",
    showA11yAlert: false
  },
  {
    step: 3,
    metrics: {
      health: { value: "90%", status: "Checking..." },
      sessions: { value: "8", status: "Live" },
      diffs: { value: "0", status: "Checking" },
      assertions: { value: "85", status: "Running" }
    },
    logs: [
      "[planner] User persona: returning buyer with saved cart",
      "[browser] Launching chromium session: preview-428",
      "[action] type coupon SPRING-OLD",
      "[network] /api/coupons -> 422 in 184ms"
    ],
    activities: [
      "Planner inferred checkout as highest revenue-risk path.",
      "Browser worker recovered after renamed Continue button.",
      "Coupon API validation error received."
    ],
    runHealth: 90,
    screenshotState: "typing",
    showA11yAlert: false
  },
  {
    step: 4,
    metrics: {
      health: { value: "85%", status: "Reviewing..." },
      sessions: { value: "8", status: "Live" },
      diffs: { value: "1", status: "Review" },
      assertions: { value: "112", status: "Running" }
    },
    logs: [
      "[planner] User persona: returning buyer with saved cart",
      "[browser] Launching chromium session: preview-428",
      "[action] type coupon SPRING-OLD",
      "[network] /api/coupons -> 422 in 184ms",
      "[vision] CTA bounding box intersects validation region"
    ],
    activities: [
      "Planner inferred checkout as highest revenue-risk path.",
      "Browser worker recovered after renamed Continue button.",
      "Coupon API validation error received.",
      "Vision verifier flagged mobile overlap in coupon state."
    ],
    runHealth: 85,
    screenshotState: "error",
    showA11yAlert: false
  },
  {
    step: 5,
    metrics: {
      health: { value: "82%", status: "Reviewing..." },
      sessions: { value: "8", status: "Live" },
      diffs: { value: "2", status: "Review" },
      assertions: { value: "120", status: "Running" }
    },
    logs: [
      "[planner] User persona: returning buyer with saved cart",
      "[browser] Launching chromium session: preview-428",
      "[action] type coupon SPRING-OLD",
      "[network] /api/coupons -> 422 in 184ms",
      "[vision] CTA bounding box intersects validation region",
      "[a11y] focus escaped payment modal after 6 tab presses"
    ],
    activities: [
      "Planner inferred checkout as highest revenue-risk path.",
      "Browser worker recovered after renamed Continue button.",
      "Coupon API validation error received.",
      "Vision verifier flagged mobile overlap in coupon state.",
      "Accessibility audit found modal focus escape."
    ],
    runHealth: 82,
    screenshotState: "error",
    showA11yAlert: true
  },
  {
    step: 6,
    metrics: {
      health: { value: "82%", status: "Blocked" },
      sessions: { value: "8", status: "Live" },
      diffs: { value: "3", status: "Review" },
      assertions: { value: "126", status: "Passed" }
    },
    logs: [
      "[planner] User persona: returning buyer with saved cart",
      "[browser] Launching chromium session: preview-428",
      "[action] type coupon SPRING-OLD",
      "[network] /api/coupons -> 422 in 184ms",
      "[vision] CTA bounding box intersects validation region",
      "[a11y] focus escaped payment modal after 6 tab presses",
      "[report] release gate: blocked, confidence high"
    ],
    activities: [
      "Planner inferred checkout as highest revenue-risk path.",
      "Browser worker recovered after renamed Continue button.",
      "Coupon API validation error received.",
      "Vision verifier flagged mobile overlap in coupon state.",
      "Accessibility audit found modal focus escape.",
      "PR review comment drafted with reproduction steps."
    ],
    runHealth: 82,
    screenshotState: "error",
    showA11yAlert: true
  }
];

export function DashboardShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedRun, setSelectedRun] = useState(dashboardRuns[0]);
  const [query, setQuery] = useState("");
  const [simStep, setSimStep] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
      if (event.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filteredCommands = useMemo(
    () => commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleRunSweep = () => {
    if (simStep !== null) return;
    
    let currentStep = 0;
    setSimStep(0);
    
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < SIMULATION_STEPS.length) {
        setSimStep(currentStep);
      } else {
        clearInterval(interval);
        setSimStep(null);
      }
    }, 2200);
  };

  const dynamicRuns = useMemo(() => {
    if (simStep === null) return dashboardRuns;
    const currentStepData = SIMULATION_STEPS[simStep];
    return dashboardRuns.map((run) => {
      if (run.name === "Checkout regression") {
        return {
          ...run,
          health: currentStepData.runHealth,
          status: currentStepData.metrics.health.status
        };
      }
      return run;
    });
  }, [simStep]);

  const filteredRuns = useMemo(() => {
    if (!severityFilter) return dynamicRuns;
    return dynamicRuns.filter((run) => run.severity === severityFilter || run.status === "Blocked");
  }, [dynamicRuns, severityFilter]);

  const activeRun = useMemo(() => {
    return filteredRuns.find((r) => r.name === selectedRun.name) || filteredRuns[0] || dynamicRuns[0];
  }, [filteredRuns, selectedRun.name, dynamicRuns]);

  const currentMetrics = useMemo(() => {
    if (simStep === null) {
      return {
        health: { value: "82%", status: "Blocked", tone: "red" as const },
        sessions: { value: "8", status: "Live", tone: "green" as const },
        diffs: { value: "3", status: "Review", tone: "amber" as const },
        assertions: { value: "126", status: "Passed", tone: "green" as const }
      };
    }
    const stepData = SIMULATION_STEPS[simStep];
    
    const getHealthTone = (status: string) => {
      if (status === "Blocked") return "red" as const;
      if (status === "Reviewing...") return "amber" as const;
      return "cyan" as const;
    };
    
    const getDiffsTone = (status: string) => {
      if (status === "Review") return "amber" as const;
      if (status === "Checking") return "cyan" as const;
      return "neutral" as const;
    };

    return {
      health: { 
        value: stepData.metrics.health.value, 
        status: stepData.metrics.health.status,
        tone: getHealthTone(stepData.metrics.health.status)
      },
      sessions: { 
        value: stepData.metrics.sessions.value, 
        status: stepData.metrics.sessions.status,
        tone: stepData.metrics.sessions.status === "Live" ? ("green" as const) : ("cyan" as const)
      },
      diffs: { 
        value: stepData.metrics.diffs.value, 
        status: stepData.metrics.diffs.status,
        tone: getDiffsTone(stepData.metrics.diffs.status)
      },
      assertions: { 
        value: stepData.metrics.assertions.value, 
        status: stepData.metrics.assertions.status,
        tone: stepData.metrics.assertions.status === "Passed" ? ("green" as const) : ("cyan" as const)
      }
    };
  }, [simStep]);

  const screenshotState = useMemo(() => {
    if (simStep === null) return "error";
    return SIMULATION_STEPS[simStep].screenshotState;
  }, [simStep]);

  const currentLogs = useMemo(() => {
    if (simStep === null) return reasoningLogs;
    return SIMULATION_STEPS[simStep].logs;
  }, [simStep]);

  const currentActivities = useMemo(() => {
    if (simStep === null) return activityFeed;
    return SIMULATION_STEPS[simStep].activities;
  }, [simStep]);

  const prStatus = useMemo(() => {
    if (simStep === null) {
      return {
        title: "PR #428 blocked",
        desc: "High severity visual regression requires review.",
        tone: "red" as const
      };
    }
    const stepData = SIMULATION_STEPS[simStep];
    if (stepData.step <= 2) {
      return {
        title: "PR #428 scanning...",
        desc: "Running regression suites on Chromium clusters.",
        tone: "cyan" as const
      };
    }
    if (stepData.step <= 5) {
      return {
        title: "PR #428 review required",
        desc: "Potential regressions flagged, waiting for assertion suite.",
        tone: "amber" as const
      };
    }
    return {
      title: "PR #428 blocked",
      desc: "High severity visual regression requires review.",
      tone: "red" as const
    };
  }, [simStep]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentLogs]);

  const executeCommand = (id: string) => {
    setPaletteOpen(false);
    setQuery("");
    
    switch (id) {
      case "run-sweep":
        handleRunSweep();
        break;
      case "switch-prod": {
        const prodRun = dynamicRuns.find((r) => r.env === "Prod");
        if (prodRun) setSelectedRun(prodRun);
        break;
      }
      case "switch-staging": {
        const stagingRun = dynamicRuns.find((r) => r.env === "Staging");
        if (stagingRun) setSelectedRun(stagingRun);
        break;
      }
      case "switch-preview": {
        const previewRun = dynamicRuns.find((r) => r.env === "Preview");
        if (previewRun) setSelectedRun(previewRun);
        break;
      }
      case "filter-high":
        setSeverityFilter("High");
        break;
      case "filter-all":
        setSeverityFilter(null);
        break;
      case "view-mobile": {
        const mobileRun = dynamicRuns.find((r) => r.name.toLowerCase().includes("mobile"));
        if (mobileRun) setSelectedRun(mobileRun);
        break;
      }
      case "reset-sim":
        setSimStep(null);
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (filteredCommands.length > 0 ? (prev + 1) % filteredCommands.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (filteredCommands.length > 0 ? (prev - 1 + filteredCommands.length) % filteredCommands.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (filteredCommands[activeIndex]) {
        executeCommand(filteredCommands[activeIndex].id);
      }
    }
  };

  return (
    <div className="noise min-h-screen bg-ink-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(105,231,255,.14),transparent_32%),radial-gradient(circle_at_16%_72%,rgba(56,248,178,.09),transparent_30%)]" />
      <div className="relative flex min-h-screen">
        <motion.aside
          animate={{ width: collapsed ? 88 : 288 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="sticky top-0 hidden h-screen shrink-0 border-r border-white/[.08] bg-black/24 p-4 backdrop-blur-2xl lg:block"
        >
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-sm font-black text-ink-950">
                TA
              </span>
              {!collapsed && (
                <div>
                  <p className="font-semibold">TesterArmy</p>
                  <p className="font-mono text-[11px] text-white/34">autonomous QA</p>
                </div>
              )}
            </Link>
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-white/[.08] text-white/54 transition hover:text-white"
              onClick={() => setCollapsed((value) => !value)}
              aria-label="Collapse sidebar"
              type="button"
            >
              <ChevronLeft className={cn("h-4 w-4 transition", collapsed && "rotate-180")} />
            </button>
          </div>

          <nav className="space-y-2" aria-label="Dashboard navigation">
            {nav.map((item, index) => (
              <button
                key={item.label}
                className={cn(
                  "flex h-11 w-full items-center gap-3 rounded-2xl px-3 text-sm text-white/55 transition hover:bg-white/[.055] hover:text-white",
                  index === 0 && "border border-signal-cyan/22 bg-signal-cyan/10 text-white"
                )}
                type="button"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && item.label}
              </button>
            ))}
          </nav>

          {!collapsed && (
            <div className="absolute bottom-4 left-4 right-4 rounded-3xl border border-white/[.08] bg-white/[.04] p-4">
              <Badge tone="green">Google auth active</Badge>
              <p className="mt-4 text-sm font-medium">qa.lead@demo.dev</p>
              <p className="mt-1 text-xs text-white/38">SSO session restored across workers</p>
            </div>
          )}
        </motion.aside>

        <main className="relative min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-6 flex flex-col justify-between gap-4 rounded-[1.75rem] border border-white/[.08] bg-white/[.035] p-4 backdrop-blur-xl md:flex-row md:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-cyan">Mission control</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">Preview release gate</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => setPaletteOpen(true)}>
                <Command className="h-4 w-4" />
                Command
                <span className="rounded-md border border-white/[.12] px-1.5 py-0.5 font-mono text-[10px] text-white/46">
                  Ctrl K
                </span>
              </Button>
              <Button onClick={handleRunSweep} disabled={simStep !== null}>
                {simStep !== null ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-signal-cyan" />
                    Sweeping... {simStep + 1}/{SIMULATION_STEPS.length}
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4" />
                    Run AI sweep
                  </>
                )}
              </Button>
            </div>
          </header>

          <section className="grid gap-4 xl:grid-cols-[1fr_390px]">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  { label: "Release health", value: currentMetrics.health.value, status: currentMetrics.health.status, tone: currentMetrics.health.tone },
                  { label: "Browser sessions", value: currentMetrics.sessions.value, status: currentMetrics.sessions.status, tone: currentMetrics.sessions.tone },
                  { label: "Visual diffs", value: currentMetrics.diffs.value, status: currentMetrics.diffs.status, tone: currentMetrics.diffs.tone },
                  { label: "Assertions", value: currentMetrics.assertions.value, status: currentMetrics.assertions.status, tone: currentMetrics.assertions.tone }
                ].map((metric) => (
                  <motion.article
                    key={metric.label}
                    whileHover={{ y: -4 }}
                    className="rounded-3xl border border-white/[.08] bg-white/[.04] p-4"
                  >
                    <p className="text-sm text-white/44">{metric.label}</p>
                    <strong className="mt-4 block text-3xl tracking-[-0.04em]">
                      {metric.value}
                    </strong>
                    <span className={cn(
                      "mt-2 block font-mono text-xs",
                      metric.tone === "red" && "text-signal-red",
                      metric.tone === "green" && "text-signal-green",
                      metric.tone === "amber" && "text-signal-amber",
                      metric.tone === "cyan" && "text-signal-cyan",
                      metric.tone === "neutral" && "text-white/34"
                    )}>
                      {metric.status}
                    </span>
                  </motion.article>
                ))}
              </div>

              <div className="grid gap-4 xl:grid-cols-[.94fr_1.06fr]">
                <section className="rounded-[1.75rem] border border-white/[.08] bg-white/[.04] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold">Active runs</h2>
                      {severityFilter && (
                        <span className="font-mono text-[9px] text-signal-red uppercase tracking-wider animate-pulse">
                          [filtered]
                        </span>
                      )}
                    </div>
                    {severityFilter ? (
                      <button 
                        onClick={() => setSeverityFilter(null)}
                        className="font-mono text-[10px] text-signal-cyan hover:underline transition"
                        type="button"
                      >
                        Reset Filter
                      </button>
                    ) : (
                      <Badge tone={simStep !== null ? "cyan" : "red"}>
                        {simStep !== null ? "running" : "1 high severity"}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-3">
                    {filteredRuns.map((run) => (
                      <button
                        key={run.name}
                        type="button"
                        onClick={() => setSelectedRun(run)}
                        className={cn(
                          "w-full rounded-2xl border p-4 text-left transition",
                          activeRun.name === run.name
                            ? "border-signal-cyan/34 bg-signal-cyan/10"
                            : "border-white/[.07] bg-black/20 hover:bg-white/[.055]"
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-medium">{run.name}</p>
                            <p className="mt-1 font-mono text-xs text-white/36">{run.env}</p>
                          </div>
                          <span className="text-2xl font-semibold">{run.health}%</span>
                        </div>
                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[.08]">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-signal-green to-signal-cyan"
                            initial={false}
                            animate={{ width: `${run.health}%` }}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="panel-reflection rounded-[1.75rem] border border-white/[.08] bg-[#070b12] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold">Screenshot viewer</h2>
                    <Badge tone="amber">mobile 390px</Badge>
                  </div>
                  <div className="relative min-h-[430px] overflow-hidden rounded-[1.4rem] border border-white/[.09] bg-ink-900 p-5">
                    {/* Sweeping scan beam */}
                    {(simStep !== null || screenshotState === "error") && (
                      <div className="absolute inset-x-0 h-px animate-beam bg-gradient-to-r from-transparent via-signal-cyan to-transparent z-20" />
                    )}

                    <div className="mx-auto max-w-[260px] relative rounded-[1.6rem] border border-white/[.14] bg-ink-800 p-3 shadow-cinematic">
                      {screenshotState === "loading" ? (
                        <div className="flex h-[220px] flex-col items-center justify-center gap-3">
                          <Loader2 className="h-8 w-8 animate-spin text-signal-cyan/70" />
                          <p className="font-mono text-[10px] text-white/34 uppercase tracking-widest animate-pulse">Replaying flow...</p>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="mb-3 h-3 w-24 rounded-full bg-signal-cyan/35" />
                          <div className="h-32 rounded-2xl bg-gradient-to-br from-signal-green/20 to-white/[.04] p-4 flex flex-col justify-between">
                            <div className="text-[10px] font-mono text-white/40">Checkout Summary</div>
                            <div className="text-right text-lg font-bold text-white">$149.00</div>
                          </div>
                          
                          <div className="mt-3 space-y-2 rounded-2xl bg-black/32 p-3 relative">
                            {/* Card Input field */}
                            <div className="h-9 rounded-xl bg-white/[.09] px-3 flex items-center justify-between text-[10px] font-mono text-white/50">
                              <span>Card Number</span>
                              {screenshotState !== "clean" && (
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                  •••• 4242
                                </motion.span>
                              )}
                            </div>
                            
                            {/* Promo Input field */}
                            <div className="h-9 rounded-xl bg-white/[.07] px-3 flex items-center justify-between text-[10px] font-mono text-white/50">
                              <span>Promo Code</span>
                              {(screenshotState === "typing" || screenshotState === "error") && (
                                <motion.span 
                                  initial={{ width: 0 }} 
                                  animate={{ width: "auto" }}
                                  className="text-signal-cyan font-bold overflow-hidden whitespace-nowrap"
                                >
                                  SPRING-OLD
                                </motion.span>
                              )}
                            </div>

                            {/* Overlap Error container if screenshotState is error */}
                            <AnimatePresence>
                              {screenshotState === "error" && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute left-3 right-3 -top-5 bg-signal-red/10 border border-signal-red/30 rounded-lg p-1.5 text-[9px] text-signal-red leading-tight"
                                >
                                  Coupon expired. Promotion ended.
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Button */}
                            <div className={cn(
                              "h-11 rounded-xl bg-signal-green flex items-center justify-center font-mono text-[10px] font-bold text-ink-950 transition duration-500",
                              screenshotState === "error" && "shadow-[0_-15px_0_rgba(255,88,113,.48)] -mt-1"
                            )}>
                              PLACE ORDER
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <AnimatePresence>
                      {screenshotState === "error" && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute bottom-20 right-[26%] grid h-9 w-9 place-items-center rounded-full bg-signal-red text-sm font-black shadow-[0_0_0_12px_rgba(255,88,113,.15)]"
                        >
                          1
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {screenshotState === "error" ? (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 30 }}
                          className="absolute bottom-5 left-5 right-5 rounded-2xl border border-signal-red/20 bg-signal-red/10 p-4"
                        >
                          <div className="flex items-center gap-2 text-signal-red">
                            <AlertTriangle className="h-4 w-4" />
                            <strong>Checkout CTA overlaps coupon error</strong>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-white/58">
                            Actual: validation message is obscured after applying expired coupon. Expected: feedback stays
                            readable and action remains reachable.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center"
                        >
                          <p className="font-mono text-xs text-white/34 uppercase tracking-wider">
                            {simStep === null ? "Ready to simulate" : "Simulating user interactions..."}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </section>
              </div>

              <VisualSandbox />

              <section className="rounded-[1.75rem] border border-white/[.08] bg-white/[.04] p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-semibold">Environment monitoring</h2>
                  <Badge tone={simStep !== null ? "cyan" : "green"}>
                    {simStep !== null ? "monitoring active" : "Prod healthy"}
                  </Badge>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                  {[
                    { icon: Activity, label: "Uptime", value: "99.99%" },
                    { icon: ShieldCheck, label: "A11y score", value: simStep !== null && simStep < 5 ? "100%" : "68%" },
                    { icon: KeyRound, label: "Auth flow", value: simStep !== null && simStep === 0 ? "Pending" : "Restored" },
                    { icon: Video, label: "Recordings", value: simStep !== null ? `${simStep} clips` : "12 clips" }
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/[.07] bg-black/20 p-4">
                      <item.icon className="mb-6 h-5 w-5 text-signal-cyan" />
                      <p className="text-sm text-white/46">{item.label}</p>
                      <strong className="mt-1 block text-xl">{item.value}</strong>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-4">
              <section className="rounded-[1.75rem] border border-white/[.08] bg-black/30 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold">AI reasoning</h2>
                  <Terminal className="h-4 w-4 text-signal-green" />
                </div>
                <div 
                  ref={terminalRef}
                  className="terminal-scroll max-h-[330px] overflow-auto rounded-2xl bg-ink-950 p-4 font-mono text-xs leading-7 text-signal-green/86 scroll-smooth"
                >
                  {currentLogs.map((log) => (
                    <p key={log}>{log}</p>
                  ))}
                </div>
              </section>

              <section className="rounded-[1.75rem] border border-white/[.08] bg-white/[.04] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold">Live activity</h2>
                  <BarChart3 className="h-4 w-4 text-signal-cyan" />
                </div>
                <div className="space-y-3">
                  {currentActivities.map((activity, index) => (
                    <motion.div
                      key={`${activity}-${index}`}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 }}
                      className="flex gap-3 rounded-2xl border border-white/[.07] bg-black/18 p-3"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-signal-cyan shadow-[0_0_16px_rgba(105,231,255,.8)]" />
                      <p className="text-sm leading-6 text-white/58">{activity}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className={cn(
                "rounded-[1.75rem] border p-4 transition duration-500",
                prStatus.tone === "red" && "border-signal-red/20 bg-signal-red/10",
                prStatus.tone === "amber" && "border-signal-amber/20 bg-signal-amber/10",
                prStatus.tone === "cyan" && "border-signal-cyan/20 bg-signal-cyan/10"
              )}>
                <div className="flex items-center gap-3">
                  <Bug className={cn(
                    "h-5 w-5",
                    prStatus.tone === "red" && "text-signal-red",
                    prStatus.tone === "amber" && "text-signal-amber",
                    prStatus.tone === "cyan" && "text-signal-cyan"
                  )} />
                  <div>
                    <h2 className="font-semibold">{prStatus.title}</h2>
                    <p className="mt-1 text-sm text-white/52">{prStatus.desc}</p>
                  </div>
                </div>
              </section>
            </aside>
          </section>
        </main>
      </div>

      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-start bg-black/58 p-4 pt-[12vh] backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPaletteOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="mx-auto w-full max-w-2xl overflow-hidden rounded-[1.5rem] border border-white/[.12] bg-ink-900 shadow-cinematic"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-white/[.08] px-5 py-4">
                <Search className="h-5 w-5 text-white/42" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type to filter commands... (↑/↓ to navigate, Enter to run)"
                  className="h-10 flex-1 bg-transparent text-lg outline-none placeholder:text-white/28"
                />
              </div>
              <div className="p-3 space-y-1">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((command, index) => (
                    <button
                      key={command.id}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition duration-150",
                        index === activeIndex
                          ? "bg-white/[.09] text-white shadow-[inset_0_0_1px_rgba(255,255,255,0.2)]"
                          : "text-white/68 hover:bg-white/[.04] hover:text-white"
                      )}
                      type="button"
                      onClick={() => executeCommand(command.id)}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <span className="flex items-center gap-2">
                        <span className={cn(
                          "h-1.5 w-1.5 rounded-full bg-signal-cyan opacity-0 transition",
                          index === activeIndex && "opacity-100"
                        )} />
                        {command.label}
                      </span>
                      <span className="font-mono text-xs text-white/28">{command.shortcut}</span>
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center text-sm text-white/34 font-mono">
                    No commands matched your query
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

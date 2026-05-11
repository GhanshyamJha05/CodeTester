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
  MonitorCheck,
  PlayCircle,
  Search,
  Settings,
  ShieldCheck,
  Terminal,
  Video
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { activityFeed, dashboardRuns, reasoningLogs } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Overview", icon: Home },
  { label: "Runs", icon: PlayCircle },
  { label: "Evidence", icon: Eye },
  { label: "PR reviews", icon: GitPullRequest },
  { label: "Monitors", icon: MonitorCheck },
  { label: "Settings", icon: Settings }
];

const commands = [
  "Run checkout regression",
  "Open latest screenshot diff",
  "Draft PR review comment",
  "Replay failing browser session",
  "Audit accessibility risks",
  "Create production heartbeat"
];

export function DashboardShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedRun, setSelectedRun] = useState(dashboardRuns[0]);
  const [query, setQuery] = useState("");

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
    () => commands.filter((command) => command.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

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
              <Button>
                <PlayCircle className="h-4 w-4" />
                Run AI sweep
              </Button>
            </div>
          </header>

          <section className="grid gap-4 xl:grid-cols-[1fr_390px]">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  ["Release health", "82%", "Blocked"],
                  ["Browser sessions", "8", "Live"],
                  ["Visual diffs", "3", "Review"],
                  ["Assertions", "126", "Passed"]
                ].map(([label, value, status]) => (
                  <motion.article
                    key={label}
                    whileHover={{ y: -4 }}
                    className="rounded-3xl border border-white/[.08] bg-white/[.04] p-4"
                  >
                    <p className="text-sm text-white/44">{label}</p>
                    <strong className="mt-4 block text-3xl tracking-[-0.04em]">{value}</strong>
                    <span className="mt-2 block font-mono text-xs text-signal-cyan">{status}</span>
                  </motion.article>
                ))}
              </div>

              <div className="grid gap-4 xl:grid-cols-[.94fr_1.06fr]">
                <section className="rounded-[1.75rem] border border-white/[.08] bg-white/[.04] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold">Active runs</h2>
                    <Badge tone="red">1 high severity</Badge>
                  </div>
                  <div className="space-y-3">
                    {dashboardRuns.map((run) => (
                      <button
                        key={run.name}
                        type="button"
                        onClick={() => setSelectedRun(run)}
                        className={cn(
                          "w-full rounded-2xl border p-4 text-left transition",
                          selectedRun.name === run.name
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
                    <div className="absolute inset-x-0 top-24 h-px animate-beam bg-gradient-to-r from-transparent via-signal-cyan to-transparent" />
                    <div className="mx-auto max-w-[260px] rounded-[1.6rem] border border-white/[.14] bg-ink-800 p-3 shadow-cinematic">
                      <div className="mb-3 h-3 w-24 rounded-full bg-signal-cyan/35" />
                      <div className="h-32 rounded-2xl bg-gradient-to-br from-signal-green/20 to-white/[.04]" />
                      <div className="mt-3 space-y-2 rounded-2xl bg-black/32 p-3">
                        <div className="h-9 rounded-xl bg-white/[.09]" />
                        <div className="h-9 w-2/3 rounded-xl bg-white/[.07]" />
                        <div className="-mt-1 h-11 rounded-xl bg-signal-green shadow-[0_-15px_0_rgba(255,88,113,.48)]" />
                      </div>
                    </div>
                    <div className="absolute bottom-20 right-[26%] grid h-9 w-9 place-items-center rounded-full bg-signal-red text-sm font-black shadow-[0_0_0_12px_rgba(255,88,113,.15)]">
                      1
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-signal-red/20 bg-signal-red/10 p-4">
                      <div className="flex items-center gap-2 text-signal-red">
                        <AlertTriangle className="h-4 w-4" />
                        <strong>Checkout CTA overlaps coupon error</strong>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-white/58">
                        Actual: validation message is obscured after applying expired coupon. Expected: feedback stays
                        readable and action remains reachable.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <section className="rounded-[1.75rem] border border-white/[.08] bg-white/[.04] p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-semibold">Environment monitoring</h2>
                  <Badge tone="green">Prod healthy</Badge>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                  {[
                    { icon: Activity, label: "Uptime", value: "99.99%" },
                    { icon: ShieldCheck, label: "A11y score", value: "68%" },
                    { icon: KeyRound, label: "Auth flow", value: "Restored" },
                    { icon: Video, label: "Recordings", value: "12 clips" }
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
                <div className="terminal-scroll max-h-[330px] overflow-auto rounded-2xl bg-ink-950 p-4 font-mono text-xs leading-7 text-signal-green/86">
                  {reasoningLogs.map((log) => (
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
                  {activityFeed.map((activity, index) => (
                    <motion.div
                      key={activity}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="flex gap-3 rounded-2xl border border-white/[.07] bg-black/18 p-3"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-signal-cyan shadow-[0_0_16px_rgba(105,231,255,.8)]" />
                      <p className="text-sm leading-6 text-white/58">{activity}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="rounded-[1.75rem] border border-signal-red/20 bg-signal-red/10 p-4">
                <div className="flex items-center gap-3">
                  <Bug className="h-5 w-5 text-signal-red" />
                  <div>
                    <h2 className="font-semibold">PR #428 blocked</h2>
                    <p className="mt-1 text-sm text-white/52">High severity visual regression requires review.</p>
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
                  placeholder="Run command or jump to evidence"
                  className="h-10 flex-1 bg-transparent text-lg outline-none placeholder:text-white/28"
                />
              </div>
              <div className="p-3">
                {filteredCommands.map((command, index) => (
                  <button
                    key={command}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm text-white/68 transition hover:bg-white/[.06] hover:text-white"
                    type="button"
                    onClick={() => setPaletteOpen(false)}
                  >
                    {command}
                    <span className="font-mono text-xs text-white/28">⌘{index + 1}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

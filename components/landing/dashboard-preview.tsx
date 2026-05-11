"use client";

import { motion } from "framer-motion";
import { Activity, Bug, CheckCircle2, GitBranch, GitPullRequest, MonitorPlay, RadioTower } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const runs = [
  { name: "Checkout visual sweep", status: "blocked", value: "82%" },
  { name: "Signup auth recovery", status: "passed", value: "97%" },
  { name: "Production heartbeat", status: "live", value: "99%" }
];

const logs = [
  "18:44:17 [planner] impacted paths: checkout, wallet, promo",
  "18:44:19 [ci] playwright-checkout / failed (visual overlap)",
  "18:44:23 [trace] click#apply-coupon -> 422 stale-code",
  "18:44:27 [report] severity=high confidence=0.94 release_gate=blocked"
];

export function DashboardPreview({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative mx-auto max-w-6xl", className)}
    >
      <div className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(105,231,255,.16),transparent_45%)] blur-2xl" />
      <div className="panel-reflection relative overflow-hidden rounded-[1.75rem] border border-white/[.12] bg-ink-900/78 shadow-cinematic backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/[.08] px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-signal-red/80" />
            <span className="h-3 w-3 rounded-full bg-signal-amber/80" />
            <span className="h-3 w-3 rounded-full bg-signal-green/80" />
          </div>
          <Badge tone="green">Live preview env</Badge>
        </div>

        <div className="grid gap-0 lg:grid-cols-[250px_1fr_330px]">
          <aside className="hidden border-r border-white/[.08] bg-black/20 p-4 lg:block">
              <div className="mb-7 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-xs font-black text-ink-950">CT</div>
              <div>
                  <p className="text-sm font-semibold">CodeTester</p>
                <p className="font-mono text-[11px] text-white/38">mission-control</p>
              </div>
            </div>
            {["Runs", "Evidence", "Reports", "Monitors"].map((item, index) => (
              <div
                key={item}
                className={cn(
                  "mb-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/58",
                  index === 0 && "border border-signal-cyan/25 bg-signal-cyan/10 text-white"
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {item}
              </div>
            ))}
          </aside>

          <main className="min-w-0 p-5 md:p-7">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-cyan">PR #428</p>
                <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Checkout release gate</h3>
              </div>
              <Badge tone="red">Blocked by visual regression</Badge>
            </div>

            <div className="mb-4 grid gap-3 md:grid-cols-3">
              {[
                ["CI checks", "14/15 passed"],
                ["PR integration", "2 comments drafted"],
                ["Trace captures", "18 screenshots + video"]
              ].map((row) => (
                <div key={row[0]} className="rounded-xl border border-white/[.08] bg-black/20 px-3 py-2.5">
                  <p className="text-xs text-white/44">{row[0]}</p>
                  <p className="mt-1 font-mono text-xs text-white/80">{row[1]}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {runs.map((run, index) => (
                <motion.div
                  key={run.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-white/[.08] bg-white/[.04] p-4"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-xs text-white/52">{run.name}</span>
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        run.status === "blocked" && "bg-signal-red",
                        run.status === "passed" && "bg-signal-green",
                        run.status === "live" && "bg-signal-cyan"
                      )}
                    />
                  </div>
                  <strong className="text-3xl">{run.value}</strong>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-[1.05fr_.95fr]">
              <div className="relative min-h-[270px] overflow-hidden rounded-2xl border border-white/[.1] bg-[#070b12] p-4">
                <div className="absolute inset-x-0 top-20 h-px animate-beam bg-gradient-to-r from-transparent via-signal-cyan to-transparent" />
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-white/42">screenshot: checkout-mobile.png</span>
                  <Bug className="h-4 w-4 text-signal-red" />
                </div>
                <div className="mx-auto w-[62%] min-w-[210px] rounded-[1.4rem] border border-white/[.12] bg-ink-800 p-3 shadow-2xl">
                  <div className="mb-3 h-3 w-20 rounded-full bg-signal-cyan/40" />
                  <div className="h-28 rounded-2xl bg-gradient-to-br from-signal-green/25 to-white/[.04]" />
                  <div className="mt-3 space-y-2 rounded-2xl bg-black/30 p-3">
                    <div className="h-8 rounded-lg bg-white/[.09]" />
                    <div className="h-8 w-2/3 rounded-lg bg-white/[.07]" />
                    <div className="-mt-1 h-10 rounded-lg bg-signal-green shadow-[0_-13px_0_rgba(255,88,113,.48)]" />
                  </div>
                  <div className="absolute bottom-16 right-[22%] grid h-8 w-8 place-items-center rounded-full bg-signal-red text-xs font-black text-white shadow-[0_0_0_10px_rgba(255,88,113,.16)]">
                    1
                  </div>
                </div>
              </div>

              <div className="terminal-scroll max-h-[270px] overflow-auto rounded-2xl border border-white/[.08] bg-black/40 p-4 font-mono text-xs leading-7 text-signal-green/90">
                {logs.map((log) => (
                  <p key={log}>{log}</p>
                ))}
                <p className="text-signal-red">[gate] release blocked until high severity is resolved</p>
              </div>
            </div>
          </main>

          <aside className="border-t border-white/[.08] bg-black/20 p-5 lg:border-l lg:border-t-0">
            <div className="mb-5 flex items-center justify-between">
              <h4 className="font-semibold">Live signals</h4>
              <RadioTower className="h-4 w-4 text-signal-green" />
            </div>
            {[
              { icon: GitBranch, label: "Changed flows", value: "4 impacted" },
              { icon: GitPullRequest, label: "Open PRs", value: "12 in queue" },
              { icon: MonitorPlay, label: "Browser sessions", value: "8 active" },
              { icon: Activity, label: "API latency", value: "184ms p50" },
              { icon: CheckCircle2, label: "Assertions", value: "126 passed" }
            ].map((item) => (
              <div key={item.label} className="mb-3 flex items-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.035] p-3">
                <item.icon className="h-4 w-4 text-signal-cyan" />
                <div>
                  <p className="text-sm text-white/78">{item.label}</p>
                  <p className="font-mono text-xs text-white/38">{item.value}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </motion.div>
  );
}

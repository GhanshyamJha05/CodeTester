"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Github,
  GitPullRequest,
  Loader2,
  PlayCircle,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { useMemo, useState } from "react";
import { prScanIssues, prScanTimeline } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const severityTone = {
  High: "red",
  Medium: "amber",
  Low: "cyan"
} as const;

export function PrScanDemo() {
  const [prUrl, setPrUrl] = useState("https://github.com/acme/shop/pull/428");
  const [previewUrl, setPreviewUrl] = useState("https://checkout-preview-428.acme.dev");
  const [goal, setGoal] = useState("Find checkout, coupon, and mobile UI regressions");
  const [scanState, setScanState] = useState<"idle" | "running" | "complete">("idle");

  const comment = useMemo(
    () =>
      [
        "CodeTester blocked this PR: 1 high severity issue found.",
        "",
        "- Checkout CTA overlaps coupon error on mobile",
        "- Focus escapes payment modal during keyboard navigation",
        "- Coupon API returns stale validation copy",
        "",
        "Suggested gate: fix the high severity visual regression, then rerun checkout and accessibility flows."
      ].join("\n"),
    []
  );

  const runScan = () => {
    setScanState("running");
    window.setTimeout(() => setScanState("complete"), 1250);
  };

  const scanComplete = scanState === "complete";

  return (
    <section id="pr-demo" className="relative overflow-hidden px-6 py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.45em] text-abyssal-nature-cyan">
              PR testing workflow
            </p>
            <h2 className="font-brutal text-5xl font-black uppercase leading-[0.86] tracking-tight text-white md:text-8xl">
              Test a PR before it ships.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/48">
            Connect a pull request and preview URL. CodeTester maps the changed files to user flows, opens the app in
            real browsers, finds product issues, and drafts a review comment with evidence.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-[430px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-[1.75rem] border border-white/[.08] bg-white/[.04] p-5 backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-ink-950">
                  <GitPullRequest className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold">New PR scan</h3>
                  <p className="font-mono text-xs text-white/36">browser + code review</p>
                </div>
              </div>
              <Badge tone={scanComplete ? "red" : "neutral"}>{scanComplete ? "Blocked" : "Ready"}</Badge>
            </div>

            <div className="space-y-4">
              <Field label="GitHub PR URL" value={prUrl} onChange={setPrUrl} icon={<Github className="h-4 w-4" />} />
              <Field
                label="Preview deployment"
                value={previewUrl}
                onChange={setPreviewUrl}
                icon={<ShieldCheck className="h-4 w-4" />}
              />
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/38">
                  Test goal
                </span>
                <textarea
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-white/[.08] bg-black/28 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/24 focus:border-signal-cyan/50"
                />
              </label>
            </div>

            <Button className="mt-6 w-full" onClick={runScan} disabled={scanState === "running"}>
              {scanState === "running" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <PlayCircle className="h-4 w-4" />
              )}
              {scanState === "running" ? "Scanning PR" : scanComplete ? "Rerun CodeTester" : "Run CodeTester"}
            </Button>

            <div className="mt-6 rounded-2xl border border-white/[.07] bg-black/24 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
                <Sparkles className="h-4 w-4 text-abyssal-nature-cyan" />
                What gets checked
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-white/46">
                {["UI overlap", "Console errors", "API failures", "A11y traps", "Broken links", "PR risk"].map(
                  (item) => (
                    <span key={item} className="rounded-xl border border-white/[.06] bg-white/[.035] px-3 py-2">
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-[0.98fr_1.02fr]">
            <section className="rounded-[1.75rem] border border-white/[.08] bg-[#070b12] p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold">Issues found</h3>
                <Badge tone={scanComplete ? "red" : "neutral"}>{scanComplete ? "3 issues" : "Waiting"}</Badge>
              </div>

              <div className="space-y-3">
                {prScanIssues.map((issue, index) => (
                  <motion.article
                    key={issue.title}
                    initial={false}
                    animate={{
                      opacity: scanComplete ? 1 : 0.34,
                      y: scanComplete ? 0 : 8
                    }}
                    transition={{ delay: scanComplete ? index * 0.12 : 0 }}
                    className="rounded-2xl border border-white/[.07] bg-white/[.035] p-4"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{issue.title}</p>
                        <p className="mt-1 font-mono text-xs text-white/36">{issue.area}</p>
                      </div>
                      <Badge tone={severityTone[issue.severity as keyof typeof severityTone]}>{issue.severity}</Badge>
                    </div>
                    <p className="text-sm leading-6 text-white/54">{issue.detail}</p>
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="font-mono text-white/34">confidence {issue.confidence}</span>
                      <span className="text-signal-cyan">{issue.repro.length} repro steps</span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="space-y-5">
              <div className="rounded-[1.75rem] border border-white/[.08] bg-white/[.04] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-semibold">Scan timeline</h3>
                  {scanState === "running" ? (
                    <Loader2 className="h-4 w-4 animate-spin text-signal-cyan" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-signal-green" />
                  )}
                </div>
                <div className="space-y-3">
                  {prScanTimeline.map((item, index) => {
                    const active = scanComplete || (scanState === "running" && index < 3);
                    return (
                      <div key={item} className="flex gap-3">
                        <span
                          className={cn(
                            "mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px]",
                            active
                              ? "border-signal-cyan/35 bg-signal-cyan/10 text-signal-cyan"
                              : "border-white/[.08] bg-white/[.025] text-white/28"
                          )}
                        >
                          {index + 1}
                        </span>
                        <p className={cn("text-sm leading-6", active ? "text-white/68" : "text-white/28")}>{item}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-signal-red/20 bg-signal-red/10 p-5">
                <div className="mb-4 flex items-center gap-2 text-signal-red">
                  <AlertTriangle className="h-4 w-4" />
                  <h3 className="font-semibold text-white">Generated PR comment</h3>
                </div>
                <pre className="overflow-auto whitespace-pre-wrap rounded-2xl border border-white/[.07] bg-black/35 p-4 font-mono text-xs leading-6 text-white/62">
                  {scanComplete ? comment : "Run CodeTester to generate a PR-ready review comment."}
                </pre>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  icon
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/38">{label}</span>
      <span className="flex items-center gap-3 rounded-2xl border border-white/[.08] bg-black/28 px-4 transition focus-within:border-signal-cyan/50">
        <span className="text-white/38">{icon}</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/24"
        />
      </span>
    </label>
  );
}

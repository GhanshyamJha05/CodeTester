import Link from "next/link";
import { Terminal } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[.08] px-4 py-14 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-fine-grid bg-[size:44px_44px] opacity-[.06]" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="font-semibold">CodeTester</span>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-white/40">The release gate for AI-native teams.</span>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/48">
            AI QA agents for teams that care about trust, polish, and shipping without avoidable regressions.
          </p>
        </div>
        <div className="rounded-2xl border border-white/[.08] bg-black/30 p-4 font-mono text-xs text-signal-green/80">
          <div className="mb-2 flex items-center gap-2 text-white/50">
            <Terminal className="h-3.5 w-3.5" />
            deploy.log
          </div>
          <p>$ testerarmy gate --target preview --mode autonomous</p>
          <p className="text-white/36">release confidence: 94%</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-white/44">
          <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          <a href="#workflow" className="hover:text-white">Workflow</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
        </nav>
      </div>
    </footer>
  );
}

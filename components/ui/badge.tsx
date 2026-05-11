import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "cyan" | "green" | "amber" | "red" | "neutral";
  className?: string;
};

const tones = {
  cyan: "border-signal-cyan/25 bg-signal-cyan/10 text-signal-cyan",
  green: "border-signal-green/25 bg-signal-green/10 text-signal-green",
  amber: "border-signal-amber/25 bg-signal-amber/10 text-signal-amber",
  red: "border-signal-red/25 bg-signal-red/10 text-signal-red",
  neutral: "border-white/10 bg-white/[.045] text-white/70"
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full border px-3 font-mono text-[11px] uppercase tracking-[0.16em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

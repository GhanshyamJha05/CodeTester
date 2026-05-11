"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function MagneticButton({ children, href, variant = "primary", className }: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });
  const rotateX = useTransform(springY, [-18, 18], [7, -7]);
  const rotateY = useTransform(springX, [-18, 18], [-7, 7]);

  return (
    <motion.div
      style={{ x: springX, y: springY, rotateX, rotateY, transformPerspective: 700 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Link
        href={href}
        className={cn(
          "group inline-flex min-h-12 items-center gap-3 rounded-full px-6 text-sm font-medium transition duration-300",
          variant === "primary"
            ? "bg-white text-ink-950 shadow-[0_24px_70px_rgba(255,255,255,.14)] hover:bg-signal-cyan"
            : "fine-border bg-white/[.05] text-white backdrop-blur-xl hover:border-signal-cyan/40 hover:bg-white/[.08]",
          className
        )}
      >
        {children}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}

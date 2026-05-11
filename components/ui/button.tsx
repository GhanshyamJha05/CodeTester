import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-cyan/70 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-white text-ink-950 shadow-[0_18px_48px_rgba(255,255,255,.12)] hover:-translate-y-0.5 hover:bg-signal-cyan",
        secondary:
          "fine-border bg-white/[.045] text-white backdrop-blur-xl hover:-translate-y-0.5 hover:border-signal-cyan/45 hover:bg-white/[.075]",
        ghost:
          "text-white/70 hover:bg-white/[.06] hover:text-white",
        danger:
          "bg-signal-red/12 text-signal-red ring-1 ring-signal-red/25 hover:bg-signal-red/18"
      },
      size: {
        sm: "min-h-9 px-3 text-xs",
        md: "min-h-11 px-5",
        lg: "min-h-13 px-6 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

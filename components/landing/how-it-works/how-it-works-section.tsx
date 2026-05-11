"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Terminal, Bot, Eye, Sparkles, CheckCircle2, MonitorCheck, GitPullRequest } from "lucide-react";

const WORKFLOW = [
  {
    title: "PR Detected",
    desc: "Every pull request triggers a changed-flow impact analysis. Our AI identifies exactly which user paths are affected by your code diff.",
    icon: <GitPullRequest className="w-6 h-6" />,
    color: "emerald",
    side: "left",
  },
  {
    title: "AI Agent Reason",
    desc: "Autonomous agents launch a real browser, navigate your app, and perform complex interactions like a human would, asserting states in plain English.",
    icon: <Bot className="w-6 h-6" />,
    color: "magma",
    side: "right",
  },
  {
    title: "Visual Verifier",
    desc: "Screenshots are interpreted like a senior QA reviewer, catching layout shifts, accessibility gaps, and UI regressions that standard code tests miss.",
    icon: <Eye className="w-6 h-6" />,
    color: "cyan",
    side: "left",
  },
  {
    title: "Release Gate",
    desc: "Evidence-rich reports block failing PRs automatically. Deploy with 100% confidence knowing your critical user flows are verified.",
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: "emerald",
    side: "right",
  },
];

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} id="how-it-works" className="relative py-48 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Section Title */}
        <div className="mb-48 text-center lg:text-left">
           <p className="font-mono text-[10px] text-abyssal-nature-emerald uppercase tracking-[0.5em] mb-4">The System Architecture</p>
           <h2 className="text-5xl md:text-8xl font-brutal font-black text-white tracking-tighter uppercase leading-[0.9]">
             Autonomous QA, <br />
             <span className="text-white/20 italic">Visualized.</span>
           </h2>
        </div>

        {/* Central Root System */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden lg:block">
          <svg className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-24 overflow-visible" preserveAspectRatio="none">
            <motion.path
              d="M12,0 Q30,200 12,400 T12,800 Q-10,1000 12,1200 T12,1600"
              stroke="url(#root-gradient-works)"
              strokeWidth="2"
              fill="none"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="root-gradient-works" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="20%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#ff4d00" />
                <stop offset="80%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Feature Panels */}
        <div className="space-y-48 lg:space-y-64 relative z-10">
          {WORKFLOW.map((step, i) => (
            <WorkflowItem key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowItem({ step, index }: { step: any, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [step.side === 'left' ? -100 : 100, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [step.side === 'left' ? -5 : 5, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x, rotateX: rotate }}
      className={`relative flex flex-col ${step.side === 'left' ? 'lg:items-start' : 'lg:items-end'} w-full`}
    >
      <div className={`relative w-full lg:w-[45%] group`}>
        
        {/* Glow Effect */}
        <div className={`absolute -inset-4 rounded-3xl bg-abyssal-nature-emerald/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl ${step.color === 'magma' ? 'bg-abyssal-hellfire-magma/5' : step.color === 'cyan' ? 'bg-abyssal-nature-cyan/5' : ''}`} />

        {/* Panel Container */}
        <div className="relative p-8 lg:p-12 rounded-3xl border border-white/5 bg-abyssal-obsidian/40 backdrop-blur-xl overflow-hidden group-hover:border-white/20 transition-all duration-500">
          
          {/* Branching Root Detail */}
          <svg className={`absolute ${step.side === 'left' ? '-right-4' : '-left-4'} top-1/2 -translate-y-1/2 w-24 h-24 text-white/10 group-hover:text-white/30 transition-colors duration-700`} viewBox="0 0 100 100">
             <motion.path 
               d={step.side === 'left' ? "M0,50 Q40,50 100,20" : "M100,50 Q60,50 0,20"}
               fill="none" 
               stroke="currentColor" 
               strokeWidth="1"
               initial={{ pathLength: 0 }}
               whileInView={{ pathLength: 1 }}
               transition={{ duration: 2, delay: 0.5 }}
             />
          </svg>

          {/* Icon */}
          <div className={`mb-8 w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500
             ${step.color === 'emerald' ? 'bg-abyssal-nature-emerald/10 border-abyssal-nature-emerald/30 text-abyssal-nature-emerald group-hover:shadow-[0_0_20px_#10b98133]' : 
               step.color === 'magma' ? 'bg-abyssal-hellfire-magma/10 border-abyssal-hellfire-magma/30 text-abyssal-hellfire-magma group-hover:shadow-[0_0_20px_#ff4d0033]' : 
               step.color === 'cyan' ? 'bg-abyssal-nature-cyan/10 border-abyssal-nature-cyan/30 text-abyssal-nature-cyan group-hover:shadow-[0_0_20px_#06b6d433]' : 
               'bg-white/5 border-white/10 text-white/60 group-hover:shadow-[0_0_20px_#ffffff11]'}`}>
            {step.icon}
          </div>

          <h3 className="text-3xl md:text-4xl font-brutal font-black text-white uppercase tracking-tight mb-4 group-hover:tracking-wider transition-all duration-700">
            {step.title}
          </h3>
          <p className="text-lg text-white/50 leading-relaxed font-sans group-hover:text-white/70 transition-colors duration-500">
            {step.desc}
          </p>

          <div className="mt-8 flex items-center gap-4">
             <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Protocol Active</span>
             <div className="h-px flex-1 bg-white/5" />
             <div className={`h-1.5 w-1.5 rounded-full ${step.color === 'emerald' ? 'bg-abyssal-nature-emerald' : step.color === 'magma' ? 'bg-abyssal-hellfire-magma' : 'bg-abyssal-nature-cyan'} animate-pulse`} />
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className={`absolute ${step.side === 'left' ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 hidden lg:block opacity-5`}>
         <span className="font-brutal text-[15rem] font-black uppercase text-white tracking-tighter select-none">
           0{index + 1}
         </span>
      </div>
    </motion.div>
  );
}



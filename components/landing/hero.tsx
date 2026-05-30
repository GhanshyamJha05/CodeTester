"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Activity } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-32 overflow-hidden px-6">
      <div className="relative z-10 max-w-7xl w-full">
        
        {/* Massive Typography with Magma Mask */}
        <div className="relative mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,12vw,10rem)] font-brutal font-black leading-[0.8] tracking-tighter uppercase mix-blend-screen"
          >
            <span className="block text-white opacity-10">CODETESTER</span>
            <span className="relative block">
              <span className="absolute inset-0 bg-gradient-to-r from-abyssal-hellfire-magma via-abyssal-hellfire-crimson to-abyssal-hellfire-magma bg-[length:200%_auto] animate-magma-pulse bg-clip-text text-transparent">
                MISSION CONTROL
              </span>
              <span className="relative opacity-0 pointer-events-none">MISSION CONTROL</span>
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="absolute top-1/2 left-[65%] -translate-y-1/2 hidden lg:block"
          >
            <p className="font-mono text-[10px] text-abyssal-nature-cyan tracking-[0.4em] uppercase whitespace-nowrap bg-black/80 px-4 py-2 border-l border-abyssal-nature-cyan shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              System Status: Senior AI QA Online
            </p>
          </motion.div>
        </div>

        {/* The Entangled Dashboard */}
        <div className="relative mt-[-3rem] lg:mt-[-6rem] flex justify-end pr-4 lg:pr-20">
          <div className="relative group">
            
            {/* The Creeping Vines */}
            <CreepingVine className="absolute -top-12 -left-12 w-64 h-64 text-abyssal-nature-emerald opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            <CreepingVine className="absolute -bottom-16 -right-16 w-80 h-80 text-abyssal-nature-cyan opacity-40 group-hover:opacity-100 transition-opacity duration-700 scale-x-[-1] rotate-90" />

            {/* The Glass Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[320px] md:w-[500px] aspect-[1.4] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl overflow-hidden group-hover:border-white/20 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-fine-grid bg-[size:40px_40px] opacity-[0.05]" />
              
              {/* Internal UI */}
              <div className="relative h-full p-6 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-abyssal-hellfire-crimson" />
                    <div className="w-2 h-2 rounded-full bg-abyssal-nature-yellow" />
                    <div className="w-2 h-2 rounded-full bg-abyssal-nature-emerald" />
                  </div>
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">Release Pulse: Stable</span>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "PR Coverage", val: "14 Impacted Flows", color: "cyan" },
                    { label: "Active Browsers", val: "8 workers across 3 regions", color: "emerald" },
                    { label: "Blocked Issues", val: "1 High severity visual bug", color: "magma" }
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center`}>
                        <Activity className={`w-5 h-5 ${stat.color === 'cyan' ? 'text-abyssal-nature-cyan' : stat.color === 'emerald' ? 'text-abyssal-nature-emerald' : 'text-abyssal-hellfire-magma'}`} />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] text-white/40 uppercase">{stat.label}</p>
                        <p className="text-md text-white font-medium">{stat.val}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 flex justify-between items-center">
                  <span className="font-mono text-[9px] text-white/20 uppercase tracking-tighter">AI QA team thinking like senior engineers.</span>
                </div>
              </div>

              {/* Reflection Highlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* Hellfire Button CTA */}
        <div className="mt-20 flex flex-col md:flex-row items-center gap-8">
          <a href="#pr-demo" className="relative group px-10 py-5 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-abyssal-hellfire-magma transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.5),transparent)] opacity-60" />
            <div className="absolute inset-0 border border-white/20 rounded-full" />
            <motion.div 
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ff4d00,transparent)] opacity-50 blur-xl" 
            />
            <span className="relative z-10 font-mono text-sm uppercase tracking-[0.3em] text-white font-bold">
              Test a PR
            </span>
          </a>
          
          <div className="flex items-center gap-4">
             <div className="h-[1px] w-12 bg-white/10" />
             <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest max-w-[250px]">
               AI-native QA for pull requests, previews, and production.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CreepingVine({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M10,90 Q30,80 40,50 T70,30 Q90,20 80,10 M20,70 Q40,60 50,40 M60,40 Q75,30 85,25"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
      />
    </svg>
  );
}

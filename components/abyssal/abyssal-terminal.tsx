"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, AlertTriangle, ShieldCheck, Activity } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const LOG_ENTRIES = [
  { id: 1, type: "system", msg: "INITIALIZING_VOID_CORE_V4", time: "00:00:01" },
  { id: 2, type: "growth", msg: "NEURAL_OVERGROWTH_DETECTED_IN_SECTOR_7", time: "00:00:04" },
  { id: 3, type: "security", msg: "HELLFIRE_SHIELDING_AT_1400K", time: "00:00:08" },
  { id: 4, type: "error", msg: "TERMINAL_DECAY_PREVENTED_BY_BIOSPERE", time: "00:00:12" },
  { id: 5, type: "growth", msg: "FUNGAL_NETWORKING_ESTABLISHED", time: "00:00:15" },
  { id: 6, type: "system", msg: "ALL_SYSTEMS_RECLAIMED", time: "00:00:18" },
];

export function AbyssalTerminal() {
  const [logs, setLogs] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < LOG_ENTRIES.length) {
        const entry = LOG_ENTRIES[index];
        setLogs(prev => [...prev, entry]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-48 px-6 bg-abyssal-void overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <p className="font-mono text-[10px] text-abyssal-nature-cyan uppercase tracking-[0.5em] mb-4">Neural Interface</p>
            <h2 className="text-5xl md:text-8xl font-brutal font-black text-white tracking-tighter uppercase leading-[0.9] mb-12">
              The Void <br />
              <span className="text-white/20 italic">Speaks.</span>
            </h2>
            <p className="text-lg text-white/40 leading-relaxed font-sans max-w-md mb-12">
              Our autonomous agents don't just run tests; they inhabit the codebase. Watch the real-time reclamation of system logic by the Abyssal Biosphere.
            </p>
            
            <div className="flex gap-4">
               {[
                 { icon: <Activity />, label: "Pulse" },
                 { icon: <ShieldCheck />, label: "Armor" },
                 { icon: <TerminalIcon />, label: "Console" },
               ].map(btn => (
                 <button key={btn.label} className="group flex items-center gap-3 px-6 py-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-abyssal-nature-cyan/30 hover:bg-abyssal-nature-cyan/5 transition-all duration-500">
                    <span className="text-white/30 group-hover:text-abyssal-nature-cyan transition-colors">{btn.icon}</span>
                    <span className="font-mono text-[10px] text-white/20 group-hover:text-white uppercase tracking-widest">{btn.label}</span>
                 </button>
               ))}
            </div>
          </div>

          {/* Terminal Console */}
          <div className="relative group">
            {/* Organic Glow */}
            <div className="absolute -inset-10 bg-abyssal-nature-cyan/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative rounded-3xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl overflow-hidden p-8 min-h-[400px]">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                   <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-abyssal-hellfire-crimson/50" />
                     <div className="w-2.5 h-2.5 rounded-full bg-abyssal-nature-yellow/50" />
                     <div className="w-2.5 h-2.5 rounded-full bg-abyssal-nature-emerald/50" />
                   </div>
                   <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">nexus_terminal_0x1.bin</span>
                </div>
                <TerminalIcon className="w-4 h-4 text-white/10" />
              </div>

              {/* Logs */}
              <div className="space-y-4 font-mono text-[11px]">
                <AnimatePresence mode="popLayout">
                  {logs.map((log) => {
                    if (!log) return null;
                    return (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        className="flex items-start gap-6 group/log"
                      >
                        <span className="text-white/10 shrink-0">{log.time}</span>
                        <div className="flex-1 flex items-center gap-3">
                           <span className={`
                              px-1.5 py-0.5 rounded text-[9px] uppercase font-bold
                              ${log.type === 'system' ? 'bg-white/5 text-white/40 border border-white/10' : 
                                log.type === 'growth' ? 'bg-abyssal-nature-emerald/10 text-abyssal-nature-emerald border border-abyssal-nature-emerald/20' : 
                                log.type === 'security' ? 'bg-abyssal-hellfire-magma/10 text-abyssal-hellfire-magma border border-abyssal-hellfire-magma/20' : 
                                'bg-abyssal-hellfire-crimson/10 text-abyssal-hellfire-crimson border border-abyssal-hellfire-crimson/20'}
                           `}>
                             {log.type}
                           </span>
                           <span className="text-white/60 group-hover/log:text-white transition-colors">{log.msg}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                <div className="flex items-center gap-2">
                   <motion.div 
                     animate={{ opacity: [0, 1, 0] }}
                     transition={{ duration: 0.8, repeat: Infinity }}
                     className="w-1.5 h-4 bg-abyssal-nature-cyan/50" 
                   />
                   <span className="text-white/10 italic">Awaiting neural input...</span>
                </div>
              </div>

              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

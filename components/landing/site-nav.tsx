"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Hexagon, Activity, Shield, Zap } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-[100] px-6 py-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex items-center justify-center">
             <Hexagon className="absolute inset-0 text-abyssal-hellfire-magma animate-pulse" strokeWidth={1} size={40} />
             <div className="relative z-10 h-4 w-4 rounded-full bg-white shadow-[0_0_15px_#ffffff88]" />
          </div>
          <span className="font-brutal text-2xl font-black text-white tracking-tighter uppercase">CodeTester</span>
        </Link>

        <div className="hidden lg:flex items-center gap-12">
          {["Nexus", "Forest", "Thermal", "Terminal"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="group relative py-2 overflow-hidden">
               <span className="relative z-10 font-mono text-[10px] text-white/40 uppercase tracking-[0.4em] group-hover:text-white transition-colors duration-500">
                 {item}
               </span>
               <div className="absolute bottom-0 left-0 w-full h-[1px] bg-abyssal-nature-emerald translate-y-full group-hover:translate-y-0 transition-transform duration-500 shadow-[0_0_8px_#10b981]" />
            </a>
          ))}
          <button className="px-6 py-2 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-white uppercase tracking-widest hover:bg-white/10 transition-colors">
            Connect
          </button>
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
           {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-2xl border-b border-white/5 p-12 lg:hidden"
          >
            <div className="flex flex-col gap-8">
              {["Nexus", "Forest", "Thermal", "Terminal"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="font-brutal text-4xl font-black text-white uppercase tracking-tighter">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}


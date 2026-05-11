"use client";

import { motion } from "framer-motion";
import { Zap, Flame, Globe, Terminal, Bug } from "lucide-react";

const TIERS = [
  {
    name: "Launch",
    price: "49",
    desc: "For founders shipping weekly.",
    features: ["300 AI test minutes", "Visual evidence reports", "1 GitHub repo", "Slack alerts"],
    glow: "charcoal"
  },
  {
    name: "Scale",
    price: "149",
    desc: "For product teams with real release gates.",
    features: ["2,000 AI test minutes", "Parallel browser workers", "PR impact analysis", "Production monitoring"],
    glow: "magma",
    active: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For regulated teams and large surfaces.",
    features: ["SSO and audit logs", "Private runners", "Custom retention", "Dedicated QA strategy"],
    glow: "crimson"
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-48 px-6 bg-gradient-to-b from-transparent to-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-32 max-w-3xl">
           <p className="font-mono text-[10px] text-abyssal-hellfire-magma uppercase tracking-[0.5em] mb-4">Resource Allocation</p>
           <h2 className="text-6xl md:text-9xl font-brutal font-black text-white tracking-tighter uppercase leading-[0.8] mb-12">
             Thermal <br />
             <span className="text-abyssal-hellfire-magma">Tiers.</span>
           </h2>
           <p className="text-xl text-white/40 leading-relaxed max-w-xl">
             Select the intensity of your deployment. Higher tiers offer deeper architectural integration and thermal resilience.
           </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        {/* Technical Footer */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-white/5">
           {[
             { label: "Core Temp", val: "1,402°K" },
             { label: "Void Latency", val: "0.002ms" },
             { label: "Growth Rate", val: "4.2m/s" },
             { label: "Security Level", val: "S-OMNIC" },
           ].map(stat => (
             <div key={stat.label}>
               <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest mb-1">{stat.label}</p>
               <p className="font-mono text-lg text-white font-bold">{stat.val}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier, index }: { tier: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group h-full rounded-[2rem] border transition-all duration-700
         ${tier.active ? 'border-abyssal-hellfire-magma/30 bg-abyssal-hellfire-charcoal/40' : 'border-white/5 bg-abyssal-obsidian/40'}
         hover:border-white/20`}
    >
      {/* Deep Magma Glow */}
      <div className={`absolute -inset-1 rounded-[2rem] bg-gradient-to-b from-transparent to-abyssal-hellfire-magma/0 opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-2xl z-0
         ${tier.glow === 'magma' ? 'group-hover:to-abyssal-hellfire-magma/20' : tier.glow === 'crimson' ? 'group-hover:to-abyssal-hellfire-crimson/20' : 'group-hover:to-white/5'}`} />

      {/* Internal Content */}
      <div className="relative z-10 h-full p-10 flex flex-col">
        <div className="flex justify-between items-start mb-8">
           <div>
             <h3 className="text-3xl font-brutal font-black text-white uppercase tracking-tight mb-2">{tier.name}</h3>
             <p className="text-sm text-white/40">{tier.desc}</p>
           </div>
           {tier.active && (
             <div className="px-3 py-1 rounded-full border border-abyssal-hellfire-magma/40 bg-abyssal-hellfire-magma/10 text-[9px] font-mono text-abyssal-hellfire-magma uppercase tracking-widest">
               Most Active
             </div>
           )}
        </div>

        <div className="mb-12">
           <div className="flex items-baseline gap-2">
             <span className="font-mono text-sm text-white/40">$</span>
             <span className="text-6xl font-brutal font-black text-white">{tier.price}</span>
             {tier.price !== "Custom" && <span className="font-mono text-xs text-white/20 uppercase tracking-widest">/mo</span>}
           </div>
        </div>

        <div className="space-y-6 flex-1 mb-12">
           {tier.features.map((f: string) => (
             <div key={f} className="flex items-start gap-4">
               <div className="mt-1 h-1.5 w-1.5 rounded-full bg-abyssal-hellfire-magma shadow-[0_0_8px_#ff4d00]" />
               <span className="text-sm text-white/60 font-sans">{f}</span>
             </div>
           ))}
        </div>

        <button className={`w-full py-5 rounded-2xl font-mono text-xs uppercase tracking-[0.3em] font-black transition-all duration-500
           ${tier.active 
             ? 'bg-abyssal-hellfire-magma text-white shadow-magma group-hover:scale-[1.02]' 
             : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'}`}>
           Initialize Nexus
        </button>
      </div>

      {/* Obsidian Texture Detail */}
      <div className="absolute inset-0 noise opacity-[0.02] pointer-events-none rounded-[2rem]" />
    </motion.div>
  );
}

"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AbyssalBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-abyssal-void overflow-hidden">
      {/* Starfield / Volumetric Fog Layer 1 */}
      <motion.div 
        style={{
          x: useTransform(smoothX, [0, 1920], [20, -20]),
          y: useTransform(smoothY, [0, 1080], [20, -20]),
        }}
        className="absolute inset-[-10%] opacity-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />
      </motion.div>

      {/* Starfield Layer 2 */}
      <motion.div 
        style={{
          x: useTransform(smoothX, [0, 1920], [40, -40]),
          y: useTransform(smoothY, [0, 1080], [40, -40]),
        }}
        className="absolute inset-[-20%] opacity-30"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,77,0,0.03),transparent_50%)]" />
      </motion.div>

      {/* Film Grain / Noise */}
      <div className="absolute inset-0 noise opacity-[0.03] mix-blend-overlay" />

      {/* Ember Particles */}
      <EmberParticles />
    </div>
  );
}

function EmberParticles() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const p = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 + 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
    }));
    setParticles(p);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 0 }}
          animate={{
            y: ["110%", "-10%"],
            x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          className="absolute rounded-full bg-abyssal-hellfire-magma blur-[1px]"
          style={{
            width: p.size,
            height: p.size,
            boxShadow: "0 0 10px rgba(255, 77, 0, 0.5)",
          }}
        />
      ))}
    </div>
  );
}

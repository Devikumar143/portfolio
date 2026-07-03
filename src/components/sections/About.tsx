"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Cpu, Smartphone, Award, Terminal } from "lucide-react";
import GlassCard from "../ui/GlassCard";

function CountUp({ to, duration = 1.5 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = to;
    if (end === 0) return;
    const totalMs = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMs / end), 30);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  const stats = [
    { value: 10, suffix: "", label: "Repositories", icon: Terminal, color: "cyan" },
    { value: 3, suffix: "", label: "Native Android Apps", icon: Smartphone, color: "purple" },
    { value: 3, suffix: "", label: "Web Applications", icon: Cpu, color: "blue" },
    { value: 100, suffix: "%", label: "Open Source", icon: Award, color: "cyan" },
  ];

  return (
    <section id="about" className="py-24 relative w-full overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-2"
          >
            <div className="h-[1px] w-8 bg-zinc-700" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">01 // IDENTITY</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            ABOUT ME
          </motion.h2>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Profile bio block */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-gray-300">
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl font-bold text-white tracking-tight"
            >
              Hi, I'm Jedevi Kumar.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-base leading-relaxed"
            >
              I'm passionate about native Android development, clean mobile architecture, modular web systems, and creating software that solves real-world campus problems.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm md:text-base leading-relaxed border-l-2 border-purple-500 pl-4 bg-purple-500/5 py-2.5 rounded-r-xl"
            >
              I focus on implementing offline-first local cache synchronization, clean architecture models, custom playback systems, and responsive user interfaces.
            </motion.p>

            {/* Statistics grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <GlassCard 
                      glowColor={stat.color as "cyan" | "purple" | "blue"}
                      className="p-4 flex flex-col items-center justify-center text-center group"
                    >
                      <IconComponent className="h-5 w-5 text-gray-500 group-hover:text-cyan-400 transition-colors mb-2" />
                      <div className="text-2xl md:text-3xl font-extrabold font-mono text-white tracking-tight">
                        <CountUp to={stat.value} />
                        <span className="text-cyan-400">{stat.suffix}</span>
                      </div>
                      <div className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mt-1">
                        {stat.label}
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Profile Card visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <GlassCard 
              glowColor="purple" 
              className="w-full max-w-sm aspect-[4/5] p-2 overflow-hidden flex flex-col items-center justify-center relative bg-[#090712]"
            >
              {/* Inner animated core grid */}
              <div className="absolute inset-0 cyber-grid opacity-20" />
              
              {/* Neon border circle and abstract portrait simulation */}
              <div className="relative w-48 h-48 rounded-full border border-zinc-800 flex items-center justify-center p-3">
                <div className="absolute inset-0 rounded-full border border-dashed border-zinc-700/40 animate-[spin_40s_linear_infinite]" />
                <div className="w-full h-full rounded-full bg-slate-950/90 flex flex-col items-center justify-center border border-zinc-800 shadow-md relative">
                  <Terminal className="h-12 w-12 text-zinc-300 animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mt-2">SYS_ENG_DEV</span>
                </div>
              </div>

              {/* Identity summary block */}
              <div className="mt-8 text-center relative z-10">
                <h4 className="text-lg font-bold font-mono tracking-wide text-white">JEDEVI KUMAR</h4>
                <p className="text-xs font-mono text-zinc-500 mt-1">ROLE: SYS_ENG_DEV</p>
                <div className="mt-4 flex gap-1.5 justify-center">
                  <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-zinc-900/60 text-zinc-300 rounded border border-zinc-800">Kotlin</span>
                  <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-zinc-900/60 text-zinc-300 rounded border border-zinc-800">Android</span>
                  <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-zinc-900/60 text-zinc-300 rounded border border-zinc-800">Compose</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Play, Rocket, Milestone, Sparkles, Target } from "lucide-react";
import GlassCard from "../ui/GlassCard";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "cyan" | "purple" | "blue";
}

export default function Timeline() {
  const events: TimelineEvent[] = [
    {
      year: "2024",
      title: "Started Android Development",
      description: "Dived into Kotlin, Android Studio SDK, and lifecycle management. Built and deployed foundational mobile apps including Unisphere and Memora.",
      icon: Play,
      color: "cyan",
    },
    {
      year: "2025",
      title: "Full-Stack Web & Hybrid Systems",
      description: "Expanded toolkit into responsive web architectures. Designed localized student exchange applications like JU Web Store and match engines like Quadra.",
      icon: Rocket,
      color: "blue",
    },
    {
      year: "2026 & Beyond",
      title: "Advanced Architectures & Systems",
      description: "Exploring modular architectures, low-latency system models, decentralized application networks, and open-source contributions.",
      icon: Target,
      color: "purple",
    },
  ];

  return (
    <section id="timeline" className="py-24 relative w-full overflow-hidden">

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
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">04 // JOURNEY</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            TIMELINE
          </motion.h2>
        </div>

        {/* Timeline body */}
        <div className="relative border-l border-white/10 md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-[1px] md:before:bg-white/10 max-w-4xl mx-auto flex flex-col gap-12">
          {events.map((event, index) => {
            const Icon = event.icon;
            const isLeft = index % 2 === 0;

            const colorTheme = "text-zinc-200 bg-zinc-900 border-zinc-700";

            return (
              <div 
                key={event.title}
                className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center pl-8 md:pl-0"
              >
                {/* Timeline node marker */}
                <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
                  <motion.div 
                    whileInView={{ scale: [0.7, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`h-[18px] w-[18px] rounded-full border-2 ${colorTheme} flex items-center justify-center p-0.5`}
                  >
                    <div className="h-full w-full rounded-full bg-white animate-pulse" />
                  </motion.div>
                </div>

                {/* Left side spacing or card */}
                <div className={`w-full md:w-[45%] ${isLeft ? "md:text-right" : "md:order-last"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                  >
                    <GlassCard 
                      glowColor={event.color}
                      className="p-5 flex flex-col bg-zinc-900/30 border border-zinc-800/80"
                    >
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono font-bold tracking-wider w-fit mb-3 ${
                        isLeft ? "md:ml-auto" : ""
                      }`}>
                        <Icon className="h-3 w-3" />
                        <span>{event.year}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{event.description}</p>
                    </GlassCard>
                  </motion.div>
                </div>

                {/* Empty block on the opposite side to balance grid */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

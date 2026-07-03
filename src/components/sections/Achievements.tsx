"use client";

import { motion } from "framer-motion";
import { Award, Zap, BookOpen, Star } from "lucide-react";
import confetti from "canvas-confetti";
import GlassCard from "../ui/GlassCard";

interface Achievement {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "cyan" | "purple" | "blue";
  badge: string;
}

export default function Achievements() {
  const achievements: Achievement[] = [
    {
      title: "Personal Projects",
      subtitle: "Open Source Creator",
      description: "Designed, built, and shipped 10 repositories and multiple clean mobile applications on GitHub.",
      icon: Star,
      color: "cyan",
      badge: "10 Repositories",
    },
    {
      title: "Android Engineering",
      subtitle: "Native App Development",
      description: "Specialized in building micro-interactions, Jetpack Compose layouts, background media playback, and Room databases.",
      icon: Award,
      color: "purple",
      badge: "Android Specialist",
    },
    {
      title: "Web Applications",
      subtitle: "Full-Stack Developer",
      description: "Architect of responsive campus marketplaces, tournament managers, and secure local charting applications.",
      icon: BookOpen,
      color: "blue",
      badge: "Full-Stack Web",
    },
  ];

  const handleConfetti = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 55,
      origin: { x, y },
      colors: ["#06b6d4", "#a855f7", "#3b82f6"],
      disableForReducedMotion: true,
    });
  };

  return (
    <section id="achievements" className="py-24 relative w-full overflow-hidden">

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
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">06 // MILESTONES</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            ACHIEVEMENTS
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            const borderColors = "hover:border-zinc-500 text-zinc-300";
              
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="h-full">
                  <GlassCard
                    glowColor={item.color}
                    className={`h-full p-6 flex flex-col justify-between bg-slate-950/40 border border-white/5 transition-all duration-300 ${borderColors}`}
                  >
                    <div>
                      {/* Top icon and badge */}
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-2.5 rounded-lg border border-white/10 bg-white/5`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase rounded bg-white/5 text-gray-400 border border-white/5">
                          {item.badge}
                        </span>
                      </div>

                      {/* Header info */}
                      <h3 className="text-base font-bold text-white tracking-tight">{item.title}</h3>
                      <p className="text-[10px] font-semibold text-gray-500 font-mono uppercase tracking-widest mt-1 mb-3">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Desc */}
                    <p className="text-xs text-gray-400 leading-relaxed mt-auto">
                      {item.description}
                    </p>
                  </GlassCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

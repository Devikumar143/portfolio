"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Wrench } from "lucide-react";
import GlassCard from "../ui/GlassCard";

interface SkillItem {
  name: string;
  level: string; // e.g. "Advanced", "Expert"
}

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "cyan" | "purple" | "blue";
  skills: SkillItem[];
}

export default function Skills() {
  const categories: SkillCategory[] = [
    {
      title: "Programming",
      icon: Code2,
      color: "cyan",
      skills: [
        { name: "Kotlin", level: "Expert" },
        { name: "Java", level: "Advanced" },
        { name: "Python", level: "Intermediate" },
        { name: "C++", level: "Intermediate" },
        { name: "JavaScript", level: "Advanced" },
      ],
    },
    {
      title: "Frameworks & SDKs",
      icon: Cpu,
      color: "purple",
      skills: [
        { name: "Android SDK", level: "Expert" },
        { name: "Jetpack Compose", level: "Expert" },
        { name: "Firebase", level: "Advanced" },
        { name: "Node.js", level: "Advanced" },
        { name: "Next.js", level: "Advanced" },
      ],
    },
    {
      title: "Tools & Platfoms",
      icon: Wrench,
      color: "blue",
      skills: [
        { name: "Git", level: "Advanced" },
        { name: "Android Studio", level: "Expert" },
        { name: "Figma", level: "Intermediate" },
        { name: "VS Code", level: "Advanced" },
        { name: "GitHub", level: "Expert" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 18,
      },
    },
  };

  return (
    <section id="skills" className="py-24 relative w-full overflow-hidden">

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
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">02 // CAPABILITIES</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            SKILLS & TOOLKIT
          </motion.h2>
        </div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const colorClass = "text-zinc-200 border-zinc-800 bg-zinc-900/50";

            const accentGlow = category.color;

            return (
              <motion.div 
                key={category.title}
                variants={itemVariants}
                className="flex"
              >
                <GlassCard 
                  glowColor={accentGlow}
                  className="w-full flex flex-col p-6 h-full border border-white/5 bg-[#080512]/60"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-8 border-b border-zinc-700 pb-4">
                    <div className={`p-2.5 rounded-lg border ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wide">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-col gap-4 flex-1">
                    {category.skills.map((skill) => (
                      <div 
                        key={skill.name}
                        className="group flex flex-col gap-1.5 p-3.5 rounded-xl border border-white/5 bg-white/0 hover:bg-white/5 transition-all duration-300"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-200 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                            {skill.name}
                          </span>
                          <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-zinc-300 transition-colors">
                            {skill.level}
                          </span>
                        </div>
                        {/* Animated strength bar indicators */}
                        <div className="h-[2px] w-full bg-slate-900 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-zinc-400 transition-all duration-1000 w-[10%] group-hover:w-full"
                            style={{
                              width: skill.level === "Expert" ? "95%" : skill.level === "Advanced" ? "80%" : "65%"
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

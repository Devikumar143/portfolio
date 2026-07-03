"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, FileText, Send, Code } from "lucide-react";
import dynamic from "next/dynamic";
import Magnetic from "../ui/Magnetic";

// Load 3D background with SSR disabled to prevent hydration issues
const ThreeBackground = dynamic(() => import("../ui/ThreeBackground"), {
  ssr: false,
});

export default function Hero() {
  const roles = [
    "Android Developer",
    "Software Engineer",
    "Mobile App Builder",
    "AI Enthusiast",
    "Creative Thinker",
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handleDownloadResume = () => {
    window.open("/Jedevi_Kumar_Resume.pdf", "_blank");
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24"
    >
      {/* 3D background WebGL canvas loaded dynamically */}
      <ThreeBackground />

      {/* Main hero layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* Subtle top banner badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/40 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 backdrop-blur-md"
        >
          <Code className="h-3.5 w-3.5" />
          <span>Android // Systems Architecture</span>
        </motion.div>

        {/* Large Name title with letter-by-letter spring animation */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white select-none flex flex-wrap justify-center mb-2">
          {Array.from("JEDEVI KUMAR").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30, rotateX: -60 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.04 * index,
                type: "spring",
                damping: 15,
                stiffness: 120,
              }}
              whileHover={{
                scale: 1.12,
                color: "#22d3ee",
                y: -5,
                transition: { duration: 0.1 }
              }}
              className="inline-block cursor-default origin-bottom transition-colors"
              style={{ marginRight: char === " " ? "0.3em" : "0.02em" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Cycling Typing Text Animator */}
        <div className="h-10 md:h-14 mt-4 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={roleIndex}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gradient-cyan-purple"
            >
              {roles[roleIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Subtitle statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-6 max-w-xl md:max-w-2xl text-sm md:text-base lg:text-lg text-gray-400 leading-relaxed font-medium"
        >
          I build software that challenges conventional applications and creates new digital experiences.
        </motion.p>

        {/* Magnetic Button Actions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center items-center gap-4"
        >
          <Magnetic>
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 text-sm font-bold shadow-md hover:scale-[1.01] transition-all duration-200"
            >
              View Projects
            </a>
          </Magnetic>

          <Magnetic>
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/70 text-sm font-semibold text-zinc-200 transition-all duration-200"
            >
              <FileText className="h-4 w-4 text-zinc-400" />
              Download Resume
            </button>
          </Magnetic>

          <Magnetic>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-800 bg-transparent hover:bg-zinc-900/30 text-sm font-semibold text-zinc-300 transition-all duration-200"
            >
              <Send className="h-4 w-4 text-zinc-400" />
              Contact Me
            </a>
          </Magnetic>
        </motion.div>


      </div>
    </section>
  );
}

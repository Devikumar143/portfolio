"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + diff, 100);
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(finishTimer);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#09090b] text-white">
      <div className="w-full max-w-[200px] flex flex-col items-center gap-4">
        {/* Typographic Logo */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-[0.25em] uppercase text-zinc-100 font-sans"
        >
          Devi Kumar
        </motion.div>

        {/* Apple-style thin line loader */}
        <div className="w-full h-[1px] bg-zinc-800 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-zinc-200"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.1 }}
          />
        </div>

        {/* Micro percentage */}
        <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase select-none">
          {progress}%
        </div>
      </div>
    </div>
  );
}

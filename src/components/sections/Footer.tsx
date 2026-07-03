"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Magnetic from "../ui/Magnetic";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden mt-12 bg-black/40">
      {/* Solid line divider */}
      <div className="w-full h-[1px] bg-white/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left Side */}
        <div className="flex flex-col gap-1 text-center md:text-left">
          <p className="text-xs text-gray-500 font-medium">
            Designed & Developed by{" "}
            <span className="text-gray-300 font-semibold font-mono">Devi Kumar</span>
          </p>
          <p className="text-[10px] text-gray-600 font-mono">© 2026 Devi Kumar. All rights reserved.</p>
        </div>

        {/* Right Side: Back to top */}
        <div className="flex items-center gap-4">
          <Magnetic>
            <button
              onClick={scrollToTop}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400 hover:text-cyan-400 text-gray-400 transition-all shadow-lg"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4.5 w-4.5 animate-bounce" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}

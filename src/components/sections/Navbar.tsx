"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "../ui/Magnetic";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Timeline", href: "#timeline" },
    { name: "GitHub", href: "#github" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? "py-3.5 bg-zinc-950/60 backdrop-blur-lg border-b border-zinc-900" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
             <span className="text-sm font-semibold tracking-[0.25em] text-gradient-cyan-purple uppercase transition-all">
              Jedevi Kumar
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors duration-200 relative group"
              >
                {link.name}
                 <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-white group-hover:w-full transition-all duration-250" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <Magnetic>
               <a
                href="#contact"
                className="relative inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-full border border-zinc-800 bg-zinc-900/30 hover:bg-white hover:text-black hover:border-transparent text-zinc-300 transition-all duration-200"
              >
                Connect Now
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Magnetic>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block lg:hidden text-gray-300 hover:text-white p-1 z-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-30 bg-[#030008]/98 backdrop-blur-xl border-b border-white/5 lg:hidden overflow-hidden pt-24 pb-8 px-6 shadow-2xl"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold tracking-wide text-gray-300 hover:text-cyan-400 transition-colors py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 mt-6 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-sm font-semibold text-black shadow-lg shadow-cyan-500/10 transition-colors"
              >
                Connect Now
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

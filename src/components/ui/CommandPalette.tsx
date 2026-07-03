"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FolderGit, User, Sparkles, Trophy, Calendar, Mail, FileText, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/CustomIcons";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const items = [
    { name: "Go to Home / Hero", type: "navigation", target: "hero", icon: Sparkles },
    { name: "Go to About Section", type: "navigation", target: "about", icon: User },
    { name: "Go to Skills Dashboard", type: "navigation", target: "skills", icon: Trophy },
    { name: "Go to Selected Projects", type: "navigation", target: "projects", icon: FolderGit },
    { name: "Go to Journey Timeline", type: "navigation", target: "timeline", icon: Calendar },
    { name: "Go to GitHub Activity", type: "navigation", target: "github", icon: GithubIcon },
    { name: "Go to Contact", type: "navigation", target: "contact", icon: Mail },
    { name: "Download Resume", type: "action", action: () => handleDownloadResume(), icon: FileText },
    { name: "Connect on LinkedIn", type: "link", url: "https://www.linkedin.com/in/devi-kumar-b3659328a", icon: LinkedinIcon },
    { name: "Explore GitHub Profile", type: "link", url: "https://github.com/Devikumar143", icon: GithubIcon },
  ];

  const handleDownloadResume = () => {
    window.open("/Jedevi_Kumar_Resume.html", "_blank");
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: typeof items[0]) => {
    setIsOpen(false);
    if (item.type === "navigation") {
      const element = document.getElementById(item.target!);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (item.type === "action") {
      item.action!();
    } else if (item.type === "link") {
      window.open(item.url, "_blank");
    }
  };

  return (
    <>
      {/* Floating shortcut indicator in bottom-left */}
      <div 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-xs text-gray-400 hover:text-white hover:border-cyan-500/50 cursor-pointer transition-all duration-300 shadow-lg"
      >
        <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>Press</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono">Ctrl + K</kbd>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop with neon blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)] backdrop-blur-2xl"
            >
              {/* Input header */}
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-base caret-cyan-400"
                />
              </div>

              {/* Items List */}
              <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelect(item)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition-all duration-150 group"
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-4.5 w-4.5 text-gray-400 group-hover:text-cyan-400" />
                          <span>{item.name}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all text-cyan-400 translate-x-[-10px] group-hover:translate-x-0" />
                      </button>
                    );
                  })
                ) : (
                  <p className="p-4 text-center text-sm text-gray-500">No results found.</p>
                )}
              </div>

              {/* Keyboard legend */}
              <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between text-xs text-gray-500 bg-black/40">
                <span>Navigate with mouse or scroll</span>
                <span>Esc to close • Click action to trigger</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, FileText, Mail, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/CustomIcons";
import GlassCard from "../ui/GlassCard";
import Magnetic from "../ui/Magnetic";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("sending");
    
    // Simulate sending message
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset status back to idle after 4 seconds
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  const handleDownloadResume = () => {
    window.open("/Devi_Kumar_Resume.html", "_blank");
  };

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/Devikumar143", icon: GithubIcon, color: "hover:text-white" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/devi-kumar-b3659328a", icon: LinkedinIcon, color: "hover:text-white" },
    { name: "Email", href: "mailto:anegondhikumar2@gmail.com", icon: Mail, color: "hover:text-white" },
    { name: "Instagram", href: "https://instagram.com", icon: InstagramIcon, color: "hover:text-white" },
  ];

  return (
    <section id="contact" className="py-24 relative w-full overflow-hidden">

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
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">07 // COMMUNICATIONS</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            CONTACT ME
          </motion.h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left panel: Info & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Let's construct something visionary together.
            </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Whether you need a performant native Android system architecture, a high-scalability application backend, or deep machine learning modules, let's exchange messages.
              </p>
              
              <div className="flex flex-col gap-4 mt-4 text-xs font-mono text-gray-400">
                <p className="flex items-center gap-3">
                  <span className="text-zinc-500 font-bold">&gt;&gt;</span>
                  <span>LOCATION: BANGALORE, IN // REMOTE</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-zinc-500 font-bold">&gt;&gt;</span>
                  <span>EMAIL: ANEGONDHIKUMAR2@GMAIL.COM</span>
                </p>
              </div>
            </motion.div>

            {/* Social Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 lg:mt-0 flex items-center gap-4.5 border-t border-white/5 pt-8"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Magnetic key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all ${social.color}`}
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </Magnetic>
                );
              })}
            </motion.div>
          </div>

          {/* Right panel: Modern glass form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <GlassCard glowColor="purple" className="p-6 md:p-8 bg-[#07040f]/60 h-full border border-white/5">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center h-full min-h-[300px]"
                  >
                    <CheckCircle2 className="h-14 w-14 text-cyan-400 mb-4 animate-pulse" />
                    <h3 className="text-lg font-bold text-white mb-2">Message Transmitted</h3>
                    <p className="text-xs text-gray-400 max-w-sm">
                      Your query has been securely routed. Devi will decrypt and response shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono font-bold tracking-wider uppercase text-gray-400">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-zinc-805 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-zinc-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono font-bold tracking-wider uppercase text-gray-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-zinc-805 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-zinc-500 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-mono font-bold tracking-wider uppercase text-gray-400">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-zinc-800 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-zinc-500 transition-all resize-none"
                        placeholder="Describe your project..."
                      />
                    </div>

                    {/* Submission button bar */}
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <Magnetic>
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 text-sm font-bold transition-all disabled:opacity-50"
                        >
                          <Send className="h-4 w-4" />
                          {status === "sending" ? "Routing..." : "Send Message"}
                        </button>
                      </Magnetic>

                      <Magnetic>
                        <button
                          type="button"
                          onClick={handleDownloadResume}
                          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-semibold text-white transition-all"
                        >
                          <FileText className="h-4 w-4" />
                          Download Resume
                        </button>
                      </Magnetic>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Timeline from "@/components/sections/Timeline";
import GitHub from "@/components/sections/GitHub";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen w-full relative">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <div key="content" className="w-full">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Timeline />
            <GitHub />
            <Achievements />
            <Contact />
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, Database, Network, MessageSquare, Layers, X, Cpu, Code as CodeIcon, Music } from "lucide-react";
import { GithubIcon } from "@/components/ui/CustomIcons";
import GlassCard from "../ui/GlassCard";

interface ArchitectureStep {
  label: string;
  details: string;
}

interface Challenge {
  problem: string;
  solution: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "cyan" | "purple" | "blue";
  bannerBg: string;
  details: {
    overview: string;
    architecture: {
      type: string;
      steps: ArchitectureStep[];
    };
    challenges: Challenge[];
    features: string[];
  };
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "unisphere",
      title: "Unisphere",
      description: "A premium social media application designed specifically for students to establish connections, collaborate, share academic resources, and build campus networks.",
      tags: ["Kotlin", "Jetpack Compose", "Android SDK", "Firebase"],
      github: "https://github.com/Devikumar143/unisphere",
      demo: "https://github.com/Devikumar143/unisphere",
      icon: MessageSquare,
      color: "cyan",
      bannerBg: "bg-zinc-900/40",
      details: {
        overview: "Unisphere was built to solve fragmented campus communications by unifying class feeds, group assignments, and peer tutoring networks into a secure, domain-restricted student hub.",
        architecture: {
          type: "MVVM Architecture with Repository Pattern",
          steps: [
            { label: "UI Layer", details: "Declarative UI layout designed with Jetpack Compose using unidirectional state flow (UDF)." },
            { label: "ViewModel", details: "Maintains screen state dynamically, interacting with local and remote data repositories." },
            { label: "Repository", details: "Acts as the single source of truth, routing fetches to local caches or remote servers." },
            { label: "Firebase REST/WS", details: "Powers real-time messaging sync and hosts profile collections." }
          ]
        },
        challenges: [
          {
            problem: "Real-time chat scaling and buffering under weak campus Wi-Fi connections.",
            solution: "Implemented an offline-first repository pattern utilizing local SQLite (Room DB) as a write-through buffer with automatic event retry logic."
          },
          {
            problem: "Ensuring feed isolation between different university campuses.",
            solution: "Designed a secure institutional email verification pipeline (matching domain regex keys) that maps users strictly to their campus namespace."
          }
        ],
        features: ["Campus verified registration pipeline", "Instant peer messaging channels", "Collaborative textbook marketplaces", "Real-time class schedule shares"]
      }
    },
    {
      id: "memora",
      title: "Memora",
      description: "A native Android memo and personal notes manager application built using clean architecture for local data caching and offline synchronization.",
      tags: ["Kotlin", "Android SDK", "Room DB", "Coroutines"],
      github: "https://github.com/Devikumar143/Memora",
      demo: "https://github.com/Devikumar143/Memora",
      icon: Database,
      color: "purple",
      bannerBg: "bg-zinc-900/40",
      details: {
        overview: "Memora focuses on security and efficiency, offering markdown support, lightning-fast full-text indexing, and secure local encryption for personal logs.",
        architecture: {
          type: "Offline-First Clean Architecture",
          steps: [
            { label: "Domain Layer", details: "Houses core interfaces and business rules completely isolated from framework libraries." },
            { label: "Data Layer", details: "Implements Room SQLite interfaces and handles disk encryption protocols." },
            { label: "Presentation", details: "Uses Flow and StateFlow variables to broadcast changes directly to Compose layouts." }
          ]
        },
        challenges: [
          {
            problem: "Typing delay when searching through large lists of text items.",
            solution: "Configured a customized Room FTS4 full-text search database engine that performs queries asynchronously using Kotlin Coroutines."
          },
          {
            problem: "Protecting sensitive personal logs at rest.",
            solution: "Integrated SQLCipher to securely encrypt SQLite database files dynamically using key derivatives."
          }
        ],
        features: ["Rich Markdown parser rendering", "Instant full-text query indexing", "SQLCipher local disk encryption", "Dynamic category groupings"]
      }
    },
    {
      id: "store",
      title: "JU Web Store",
      description: "A localized marketplace application tailored for university student exchange, matching textbook sellers with nearby buyers.",
      tags: ["HTML", "CSS", "JavaScript", "Local Storage"],
      github: "https://github.com/Devikumar143/store",
      demo: "https://github.com/Devikumar143/store",
      icon: Layers,
      color: "blue",
      bannerBg: "bg-zinc-900/40",
      details: {
        overview: "JU Web Store is a lightweight student marketplace designed to eliminate middleman shipping fees by enabling face-to-face handoffs on university premises.",
        architecture: {
          type: "Component-driven Single Page Interface",
          steps: [
            { label: "DOM Controllers", details: "Vanilla JS classes listening to user inputs and rendering item grid sections." },
            { label: "Storage Pipeline", details: "Handles local persistency, parsing and writing serialized JSON lists." },
            { label: "Verification API", details: "Simulates secure academic email address checks before unlocking listings." }
          ]
        },
        challenges: [
          {
            problem: "Managing shopping cart synchronization without a database backend.",
            solution: "Structured a localized persistent layer using the Web Storage API, wrapping updates in custom event dispatchers."
          },
          {
            problem: "Creating smooth, native-feeling transitions on page swaps.",
            solution: "Engineered single-page routing structures utilizing CSS opacity-transforms linked to structural navigation handlers."
          }
        ],
        features: ["Local peer-to-peer list publishing", "Shopping cart state retention", "Campus pickup locator filters", "Student contact triggers"]
      }
    },
    {
      id: "quadra",
      title: "Quadra",
      description: "An online tournament manager designed for scheduling esports matches, aggregating player statistics, and tracking leaderboard standings.",
      tags: ["JavaScript", "HTML", "CSS", "DOM API"],
      github: "https://github.com/Devikumar143/Quadra",
      demo: "https://github.com/Devikumar143/Quadra",
      icon: Network,
      color: "cyan",
      bannerBg: "bg-zinc-900/40",
      details: {
        overview: "Quadra provides tools for local event planners to bootstrap gaming brackets (single and double elimination) and update brackets in real-time.",
        architecture: {
          type: "Graph-based elimination tree processor",
          steps: [
            { label: "Bracket Engine", details: "Computes tournament match trees using custom double-linked node structures." },
            { label: "Canvas Linker", details: "Connects bracket nodes visually using high-performance dynamic SVG lines." },
            { label: "Database Client", details: "Saves player stats histories inside local index directories." }
          ]
        },
        challenges: [
          {
            problem: "Generating double elimination bracket trees in O(N log N) time without UI locks.",
            solution: "Designed a deterministic seeding queue algorithm that calculates rounds ahead of rendering."
          },
          {
            problem: "Drawing connections between matches that align dynamically on page resizes.",
            solution: "Created an overlay listener that maps absolute bounding box values to vector path parameters."
          }
        ],
        features: ["Single/Double elimination formats", "Seeding queue match generators", "Real-time win-loss score trackers", "Interactive tournament grids"]
      }
    },
    {
      id: "herverse",
      title: "HerVerse",
      description: "A responsive wellness and health monitoring platform designed to support tracking, health data visualization, and localized community building.",
      tags: ["JavaScript", "CSS", "HTML", "Canvas"],
      github: "https://github.com/Devikumar143/herverse",
      demo: "https://github.com/Devikumar143/herverse",
      icon: Sparkles,
      color: "purple",
      bannerBg: "bg-zinc-900/40",
      details: {
        overview: "HerVerse provides private wellness charting utilities designed strictly around local storage, prioritizing absolute user privacy.",
        architecture: {
          type: "Local-First charting client",
          steps: [
            { label: "Canvas Pipeline", details: "Draws multi-cycle trends using bezier paths in HTML5 Canvas." },
            { label: "Encryption Engine", details: "Secures stored dataset attributes inside Web Crypto API envelopes." },
            { label: "Responsive Views", details: "CSS grid layouts that adjust viewport nodes across tablet, mobile, and desktop." }
          ]
        },
        challenges: [
          {
            problem: "Rendering smooth wellness curves over fluctuating monthly cycles.",
            solution: "Designed a cycle model calculator using Cubic Bezier mathematical interpolations drawn directly to the canvas."
          },
          {
            problem: "Storing sensitive medical data safely in the browser.",
            solution: "Integrated local passphrase-derived keys (PBKDF2) to encrypt dataset objects before browser persistence."
          }
        ],
        features: ["Interactive cycle graphing canvas", "Passphrase-based secure key storage", "Symptom logs and trends", "Local CSV backup exporters"]
      }
    },
    {
      id: "melora",
      title: "Melora",
      description: "A native Android music player application exploring modern material styling, custom playlist themes, real-time media search, and high-performance local playback services.",
      tags: ["Kotlin", "Jetpack Compose", "Media3 ExoPlayer", "Android SDK"],
      github: "https://github.com/Devikumar143/melora",
      demo: "https://github.com/Devikumar143/melora",
      icon: Music,
      color: "blue",
      bannerBg: "bg-zinc-900/40",
      details: {
        overview: "Melora is a native, offline-capable music player built to provide seamless, low-latency audio playback, dynamic playlist UI thematic styling, and structured media collection indices.",
        architecture: {
          type: "MVI/MVVM Architecture with Media3 Playback Service",
          steps: [
            { label: "Presentation Layer", details: "Declarative UI screens reading state events from dynamic ViewModels." },
            { label: "Media3 Service", details: "Background playback daemon managing audio focus, notifications, and player lifecycle." },
            { label: "SQLite Indexer", details: "Room Database cache indexing local audio track metadata for instantaneous search." }
          ]
        },
        challenges: [
          {
            problem: "Audio session interruption management (e.g. system calls, headphone unplugging, background notifications).",
            solution: "Bound state change listeners to Media3 AudioFocusManager and registered local BroadcastReceivers for AudioManager actions."
          },
          {
            problem: "Generating smooth, dynamic color themes matching active album art in real-time.",
            solution: "Integrated Palette API to extract prominent color swatches, feeding values directly to Compose Theme bounds."
          }
        ],
        features: ["High-performance background audio service", "Dynamic album art theme generation", "Local media scanning & instant search", "Custom playlist creator dialogs"]
      }
    }
  ];

  return (
    <section id="projects" className="py-24 relative w-full overflow-hidden">
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
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">03 // CREATIONS</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            SELECTED PROJECTS
          </motion.h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {projects.map((project, index) => {
            const Icon = project.icon;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: 0.05 * index }}
                className="flex"
              >
                <GlassCard
                  onClick={() => setSelectedProject(project)}
                  className="w-full flex flex-col p-0 overflow-hidden border border-white/5 bg-slate-950/40 relative group cursor-pointer"
                >
                  {/* Visual Banner Canvas */}
                  <div className={`h-48 w-full ${project.bannerBg} border-b border-white/5 flex items-center justify-center relative`}>
                    <div className="absolute inset-0 cyber-grid opacity-15" />
                    
                    {/* Animated background shape */}
                    <div className="absolute w-28 h-28 rounded-full bg-white/1 blur-xl group-hover:bg-white/5 transition-all duration-500" />
                    
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative z-10 p-5 rounded-2xl border border-zinc-800 bg-black/60 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                    >
                      <Icon className="h-8 w-8 text-zinc-200" />
                    </motion.div>
                  </div>

                  {/* Project Meta Info */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-6 flex-1">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-white/5 text-gray-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-zinc-800 hover:bg-zinc-900/50 text-xs font-semibold text-zinc-300 transition-all"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        Code
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-black text-xs font-semibold transition-all"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full-screen Overlay Modal (Apple Style) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-[#09090b] text-white p-6 md:p-10 shadow-2xl z-10 scrollbar-thin"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header Title / Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{selectedProject.title}</h3>
                <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase bg-zinc-900 text-zinc-400 border border-zinc-800 rounded">
                  Project Detail
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 text-zinc-300 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
                {/* Left Columns: Overview & Core Technical Challenges */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-2">Overview</h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">{selectedProject.details.overview}</p>
                  </div>

                  {/* Core Challenges Block */}
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-4">Technical Challenges & Solutions</h4>
                    <div className="flex flex-col gap-6">
                      {selectedProject.details.challenges.map((c, i) => (
                        <div key={i} className="flex flex-col gap-2 p-4 rounded-xl border border-zinc-850 bg-zinc-900/10">
                          <div className="flex gap-2">
                            <span className="text-xs font-bold text-zinc-400 uppercase font-mono">Problem:</span>
                            <p className="text-xs text-zinc-300 leading-normal">{c.problem}</p>
                          </div>
                          <div className="flex gap-2 border-t border-zinc-800/40 pt-2.5 mt-1">
                            <span className="text-xs font-bold text-zinc-100 uppercase font-mono">Solution:</span>
                            <p className="text-xs text-zinc-200 leading-normal">{c.solution}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Columns: Architecture Schematic Diagram */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Architecture Diagram Visualization */}
                  <div className="p-5 rounded-2xl border border-zinc-850 bg-zinc-900/15">
                    <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-4 flex items-center gap-1.5">
                      <Cpu className="h-4 w-4 text-zinc-400" />
                      Architecture Flow
                    </h4>
                    
                    <div className="flex flex-col gap-3 relative before:absolute before:left-3 before:top-4 before:bottom-4 before:w-[1px] before:bg-zinc-800">
                      {selectedProject.details.architecture.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-4 relative">
                          {/* Dot marker */}
                          <div className="h-[9px] w-[9px] rounded-full bg-zinc-650 border border-zinc-900 mt-1.5 ml-[2px] z-10" />
                          <div className="flex flex-col flex-1">
                            <span className="text-[11px] font-bold text-zinc-300">{step.label}</span>
                            <p className="text-[10px] text-zinc-500 leading-normal mt-0.5">{step.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="p-5 rounded-2xl border border-zinc-850 bg-zinc-900/15">
                    <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-3 flex items-center gap-1.5">
                      <CodeIcon className="h-4 w-4 text-zinc-400" />
                      Key Deliverables
                    </h4>
                    <ul className="flex flex-col gap-2 text-xs text-zinc-400 list-disc pl-4">
                      {selectedProject.details.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Modal CTA Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-800 hover:bg-zinc-900/50 text-xs font-semibold text-zinc-200 transition-colors"
                    >
                      <GithubIcon className="h-4 w-4" />
                      GitHub Repository
                    </a>
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Preview
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

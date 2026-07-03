"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitFork, Star, GitCommit, GitPullRequest, Code } from "lucide-react";
import GlassCard from "../ui/GlassCard";

interface Repository {
  name: string;
  desc: string;
  stars: number;
  forks: number;
  lang: string;
  langColor: string;
}

export default function GitHub() {
  const [profile, setProfile] = useState({
    public_repos: 10,
    followers: 2,
    following: 0
  });

  const [reposList, setReposList] = useState<Repository[]>([
    {
      name: "unisphere",
      desc: "A socialmedia app for students",
      stars: 1,
      forks: 0,
      lang: "JavaScript",
      langColor: "bg-zinc-500",
    },
    {
      name: "snappo",
      desc: "A messaging client interface built using clean TypeScript styles.",
      stars: 0,
      forks: 0,
      lang: "TypeScript",
      langColor: "bg-zinc-300",
    },
    {
      name: "herverse",
      desc: "A responsive wellness and health monitoring platform designed to support tracking.",
      stars: 0,
      forks: 0,
      lang: "JavaScript",
      langColor: "bg-zinc-500",
    }
  ]);

  const [langBreakdown, setLangBreakdown] = useState<{ name: string; percentage: number; color: string }[]>([
    { name: "Kotlin", percentage: 50, color: "bg-zinc-300" },
    { name: "JavaScript", percentage: 30, color: "bg-zinc-500" },
    { name: "TypeScript", percentage: 10, color: "bg-zinc-300" },
    { name: "Python", percentage: 10, color: "bg-zinc-600" },
  ]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch Profile details
        const profileRes = await fetch("https://api.github.com/users/Devikumar143");
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile({
            public_repos: profileData.public_repos || 10,
            followers: profileData.followers || 2,
            following: profileData.following || 0
          });
        }

        // Fetch Repos list (up to 30)
        const reposRes = await fetch("https://api.github.com/users/Devikumar143/repos?sort=updated&per_page=30");
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          
          const mappedRepos: Repository[] = reposData.map((item: any) => {
            const langColors: { [key: string]: string } = {
              Kotlin: "bg-zinc-450",
              Java: "bg-zinc-400",
              JavaScript: "bg-zinc-500",
              TypeScript: "bg-zinc-300",
              Python: "bg-zinc-500",
              HTML: "bg-zinc-400",
              CSS: "bg-zinc-600",
              "C#": "bg-zinc-650",
              "C++": "bg-zinc-600",
            };
            return {
              name: item.name,
              desc: item.description || "No description provided.",
              stars: item.stargazers_count,
              forks: item.forks_count,
              lang: item.language || "Other",
              langColor: langColors[item.language] || "bg-zinc-700",
            };
          });

          // Sort by stars descending, then slice top 3
          const sortedRepos = [...mappedRepos].sort((a, b) => b.stars - a.stars);
          setReposList(sortedRepos.slice(0, 3));

          // Calculate languages distribution dynamically
          const langCounts: { [key: string]: number } = {};
          let totalLanguages = 0;
          
          mappedRepos.forEach(r => {
            if (r.lang && r.lang !== "Other") {
              langCounts[r.lang] = (langCounts[r.lang] || 0) + 1;
              totalLanguages++;
            }
          });

          if (totalLanguages > 0) {
            const calculatedLangs = Object.entries(langCounts)
              .map(([name, count]) => {
                const langColors: { [key: string]: string } = {
                  Kotlin: "bg-zinc-300",
                  Java: "bg-zinc-400",
                  JavaScript: "bg-zinc-500",
                  TypeScript: "bg-zinc-350",
                  Python: "bg-zinc-500",
                  HTML: "bg-zinc-450",
                  CSS: "bg-zinc-600",
                  "C#": "bg-zinc-650",
                  "C++": "bg-zinc-600",
                };
                return {
                  name,
                  percentage: Math.round((count / totalLanguages) * 100),
                  color: langColors[name] || "bg-zinc-700",
                };
              })
              .sort((a, b) => b.percentage - a.percentage)
              .slice(0, 4);

            setLangBreakdown(calculatedLangs);
          }
        }
      } catch (err) {
        console.error("Error fetching GitHub telemetry:", err);
      }
    };

    fetchGitHubData();
  }, []);

  // Generate a mock contribution graph data array: 7 days * 28 weeks (196 cells)
  const contributionGrid = Array.from({ length: 196 }, (_, index) => {
    // Generate a deterministically random look based on index
    const seed = Math.sin(index) * 10000;
    const val = seed - Math.floor(seed);
    if (val < 0.5) return 0; // 0 commits
    if (val < 0.75) return 1; // low
    if (val < 0.9) return 2; // medium
    return 3; // high
  });

  return (
    <section id="github" className="py-24 relative w-full overflow-hidden">
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
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">05 // TELEMETRY</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            GITHUB ACTIVITY
          </motion.h2>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left panel: Contribution Graph & Stats */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <GlassCard className="p-6 bg-zinc-900/30 border border-zinc-850">
              <h3 className="text-sm font-bold font-mono tracking-widest text-white uppercase mb-6 flex items-center gap-2">
                <GitCommit className="h-4 w-4 text-zinc-400" />
                Contributions (Past 6 Months)
              </h3>
              
              {/* Grid Canvas Wrapper */}
              <div className="overflow-x-auto pb-2 scrollbar-thin">
                <div className="grid grid-flow-col grid-rows-7 gap-[3px] w-max">
                  {contributionGrid.map((level, i) => {
                    const colorClasses = [
                      "bg-white/5 border border-white/5", // 0
                      "bg-zinc-800 border border-zinc-700/10", // 1
                      "bg-zinc-650 border border-zinc-650/10", // 2
                      "bg-zinc-500 border border-zinc-500/20", // 3
                    ];
                    
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.3, zIndex: 20 }}
                        className={`h-[11px] w-[11px] rounded-[2px] transition-all cursor-pointer ${colorClasses[level]}`}
                        title={`${level * 3} commits`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Grid Legend */}
              <div className="flex items-center gap-1.5 justify-end text-[10px] text-gray-500 font-mono mt-4">
                <span>Less</span>
                <div className="h-[9px] w-[9px] rounded-[1px] bg-white/5" />
                <div className="h-[9px] w-[9px] rounded-[1px] bg-zinc-800" />
                <div className="h-[9px] w-[9px] rounded-[1px] bg-zinc-650" />
                <div className="h-[9px] w-[9px] rounded-[1px] bg-zinc-500" />
                <span>More</span>
              </div>
            </GlassCard>

            {/* Telemetry Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <GlassCard className="p-4 flex items-center justify-between bg-zinc-900/30 border border-zinc-800">
                <div>
                  <div className="text-2xl font-extrabold font-mono text-white">{profile.public_repos}</div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500 mt-1">Public Repos</div>
                </div>
                <Code className="h-7 w-7 text-zinc-700" />
              </GlassCard>

              <GlassCard className="p-4 flex items-center justify-between bg-zinc-900/30 border border-zinc-800">
                <div>
                  <div className="text-2xl font-extrabold font-mono text-white">{profile.followers}</div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500 mt-1">Followers</div>
                </div>
                <GitCommit className="h-7 w-7 text-zinc-700" />
              </GlassCard>

              <GlassCard className="p-4 flex items-center justify-between bg-zinc-900/30 border border-zinc-800">
                <div>
                  <div className="text-2xl font-extrabold font-mono text-white">{profile.following}</div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500 mt-1">Following</div>
                </div>
                <GitPullRequest className="h-7 w-7 text-zinc-700" />
              </GlassCard>
            </div>
          </div>

          {/* Right panel: Repository Cards & Languages */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Language distribution card */}
            <GlassCard className="p-6 bg-zinc-900/30 border border-zinc-800">
              <h3 className="text-sm font-bold font-mono tracking-widest text-white uppercase mb-5">
                Languages Breakdown
              </h3>
              <div className="flex flex-col gap-4">
                {langBreakdown.map((lang) => (
                  <div key={lang.name} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-gray-300">{lang.name}</span>
                      <span className="text-gray-500 font-mono">{lang.percentage}%</span>
                    </div>
                    <div className="h-[3px] w-full bg-slate-900 rounded-full overflow-hidden">
                      <div className={`h-full ${lang.color}`} style={{ width: `${lang.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Repos list */}
            <div className="flex flex-col gap-4">
              {reposList.map((repo) => (
                <a 
                  key={repo.name}
                  href={`https://github.com/Devikumar143/${repo.name}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="block"
                >
                  <GlassCard 
                    className="p-4 hover:border-zinc-500 transition-all border border-zinc-800/80 bg-zinc-900/30 flex flex-col gap-3 group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-white group-hover:text-zinc-200 font-mono tracking-tight transition-colors">
                        {repo.name}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                        <span className={`h-2 w-2 rounded-full ${repo.langColor}`} />
                        {repo.lang}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-normal line-clamp-2">
                      {repo.desc}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] text-gray-500 font-mono">
                      <span className="flex items-center gap-1 hover:text-white transition-colors">
                        <Star className="h-3.5 w-3.5 text-zinc-400" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1 hover:text-white transition-colors">
                        <GitFork className="h-3.5 w-3.5" />
                        {repo.forks}
                      </span>
                    </div>
                  </GlassCard>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

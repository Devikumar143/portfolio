import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import MouseFollower from "@/components/ui/MouseFollower";
import CommandPalette from "@/components/ui/CommandPalette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devi Kumar | Android Developer & Software Engineer Portfolio",
  description: "Explore the premium portfolio of Devi Kumar, a Senior Android Developer and Systems Engineer. Specialized in native performance, modular architectures, distributed AI networks, and Jetpack Compose.",
  keywords: ["Devi Kumar", "Android Developer", "Software Engineer", "Jetpack Compose", "Kotlin", "AI Swarm", "Mobile Architect"],
  authors: [{ name: "Devi Kumar" }],
  openGraph: {
    title: "Devi Kumar | Android Developer & Systems Architect",
    description: "Futuristic developer portfolio showing Android SDK engineering, distributed peer AI models, and native performance optimizations.",
    url: "https://devikumar.dev",
    siteName: "Devi Kumar Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devi Kumar | Android Developer & Systems Architect",
    description: "Futuristic developer portfolio showing Android SDK engineering, distributed peer AI models, and native performance optimizations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="bg-[#030008] text-gray-200 antialiased overflow-x-hidden">
        {/* Custom Global Layout Helpers */}
        <ScrollProgressBar />
        <MouseFollower />
        <CommandPalette />
        
        {/* Grain Overlay */}
        <div className="noise-overlay" />
        
        {children}
      </body>
    </html>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  glowColor?: "cyan" | "purple" | "blue" | "all";
}

export default function GlassCard({
  children,
  className,
  glowColor = "all",
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Tilt calculations
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(e.clientY - rect.top - centerY) / (rect.height / 8); 
    const rotateY = (e.clientX - rect.left - centerX) / (rect.width / 8);
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        transformPerspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className={cn(
        "glass-panel relative overflow-hidden rounded-2xl p-6 transition-all duration-300",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      <div className="relative z-[1]" style={{ transform: "translateZ(15px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

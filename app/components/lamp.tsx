"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/cn";

export function LampDemo() {
  return (
    <HeroContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: "circOut",
        }}
        className="flex flex-col items-center"
      >
        <h1 className="text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl md:leading-tight">
          <span className="bg-gradient-to-br from-white to-neutral-400 bg-clip-text">
            Great ideas deserve great{" "}
            <span className="relative inline-block">
              <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-[30%] bg-[#E3B619]/70 -rotate-1"></span>
              <span className="relative bg-gradient-to-br from-white to-neutral-400 bg-clip-text">
                engineering.
              </span>
            </span>
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-center text-base font-normal text-neutral-300 md:text-lg">
          I&apos;m Abel Kène. I build the foundational technology that helps
          ambitious businesses thrive online. From rapid e-commerce
          deployments—
          <span className="font-semibold text-[#E3B619]">
            ask me how fast
          </span>
          —to elegant web platforms, my focus is on clean, effective work that
          endures.
        </p>
        
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-[#E3B619] font-medium animate-pulse">
            Check your business health ↓
          </p>
          <a 
            href="#ai-audit"
            className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all flex items-center gap-2 group"
          >
            Use AI Audit Tool
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </motion.div>
    </HeroContainer>
  );
}

const AnimatedLine = ({ d, duration, delay }: any) => (
  <motion.svg
    width="1000"
    height="600"
    viewBox="0 0 1000 600"
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration, repeat: Infinity, delay }}
  >
    <motion.path
      d={d}
      fill="none"
      stroke="url(#gradient)"
      strokeWidth="3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: duration / 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
    <defs>
      <linearGradient id="gradient" gradientTransform="rotate(90)">
        <stop offset="0%" stopColor="#E3B619" stopOpacity="0" />
        <stop offset="50%" stopColor="#E3B619" stopOpacity="1" />
        <stop offset="100%" stopColor="#E3B619" stopOpacity="0" />
      </linearGradient>
    </defs>
  </motion.svg>
);

export const HeroContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const lines = [
    { d: "M 50 600 C 200 -100, 800 700, 950 100", duration: 25, delay: 0 },
    { d: "M 100 0 C 300 700, 700 -100, 900 600", duration: 20, delay: 2 },
    { d: "M 950 500 C 800 800, 200 -200, 50 100", duration: 30, delay: 5 },
  ];

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black w-full pt-24 md:pt-32 z-0",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-50 md:opacity-100 [filter:drop-shadow(0_0_10px_rgba(227,182,25,0.15))_md:drop-shadow(0_0_20px_rgba(227,182,25,0.3))]">
        {lines.map((line, i) => (
          <AnimatedLine key={i} {...line} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-5">
        {children}
      </div>

      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: [0, 10, 0], opacity: 1 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-10 z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </div>
  );
};

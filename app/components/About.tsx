"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/cn";

// NOTE: In a real project, these icons would ideally come from a library like 'react-icons'.
// Since that's not available, they are embedded here as simple SVG paths.
const icons = {
  nextjs: <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0Zm-.13 21.52V14.16H8.45v-2.32h3.42V2.48l7.26 12.33h-3.57l-3.7-6.3v8.71Z" />,
  react: (
    <>
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="11" ry="4.1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="12" cy="12" rx="11" ry="4.1" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4.1" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
    </>
  ),
  typescript: <path d="M1.5 0h21v24H1.5z M21 .75H3v22.5h18V.75z M8.62 9.37H4.5V5.25h12v4.12h-4.12V18.75h-3.75V9.37Z M15 6.75H9.75v2.62H15V6.75Z" />,
  python: <path d="M12.33 24a6.67 6.67 0 0 1-6.61-5.63H2.86V12.7a3.86 3.86 0 0 1 3.86-3.86h2.8V6.67a6.67 6.67 0 0 1 6.6-6.61h5.63v2.86a3.86 3.86 0 0 1-3.86 3.86v2.8h2.17a6.67 6.67 0 0 1 6.61 5.63v2.86h-5.64a3.86 3.86 0 0 1-3.86 3.86v2.17a6.67 6.67 0 0 1-5.63 6.61H12.33Zm-5.71-9.42a3.86 3.86 0 0 1 3.86-3.86h5.71v-2.8a6.67 6.67 0 0 1-6.61 5.63v2.86h-2.8a3.86 3.86 0 0_1-3.86-3.86V12.7h3.71Zm9.57 9.42a3.86 3.86 0 0 1-3.86 3.86h-2.8v2.8a6.67 6.67 0 0 1 5.63-6.61h2.86v2.8a3.86 3.86 0 0 1-3.86 3.86h-2.3Z" />,
  supabase: <path d="M16.48 4.63a1.07 1.07 0 0 0-1.07-1.06H1.07A1.07 1.07 0 0 0 0 4.63v14.74a1.07 1.07 0 0 0 1.07 1.06h14.34a1.07 1.07 0 0 0 1.07-1.06V4.63Zm-4 9.24a4.13 4.13 0 0 1-8.22.8c.36.27.76.4 1.18.4a2.95 2.95 0 0 0 2.95-2.95v-5.2a5.27 5.27 0 0 0-3.32 9.27C7.74 14.8.4 11.23.4 7.02A6.63 6.63 0 0 1 12.48 2a1.06 1.06 0 0 0 1.06 1.06c0 5.4-3.79 9.81-8.72 9.81Z" />,
  ai: <path d="M17.5 11H19v2h-1.5zm-1.5 7.5v-1H17v1zm-3-15v1.5h1V5zm-2 0H10V3.5h1zm-2 0H8V5H6.5V3.5h-1V5h-1V3.5H3V5H1.5V3.5H0v12h1.5V17H3v-1.5h1.5V17H6v-1.5h1V17h1.5v-1.5H10V17h1v-1.5h1.5V17h1v-1.5H15V17h1.5v-1.5H18V17h1v-1.5h1.5V17H22v-1.5h2V22H0V0h22v3.5h-2V2h-1.5v1.5H17V2h-1.5v1.5h-1V2h-1.5v1.5h-1V2H10v1.5H8.5V2H7V3.5zm-5 12H10v-1H8.5zm-1.5-3H10v-1H7zm1.5-1.5H10v-1H8.5zm-1.5-3H10v-1H7zM12 11h1.5v1H12zm1.5 1.5H15v1h-1.5zm-6-1.5H10v-1H7.5zm0-3H10V7H7.5zM6 11h1.5v1H6zm-1.5 1.5H6v1H4.5zM6 8.5h1.5v1H6zm-1.5-1.5H6v1H4.5zM12 7h1.5v1H12z" />,
  automation: <path d="M18.66 12.3a1.55 1.55 0 0 1-1.34 2.68L15.9 16a2.4 2.4 0 0 1-3.9 0l-1.42-1.06a1.55 1.55 0 0 1-1.34-2.68l.8-2.12-2.13-.8A1.55 1.55 0 0 1 6.57 8L5.5 6.57a1.55 1.55 0 0 1 2.68-1.34l1.06 1.42a2.4 2.4 0 0 1 3.9 0l1.06-1.42a1.55 1.55_0 0 1 2.68 1.34l-.8 2.13 2.12.8a1.55 1.55 0 0 1 1.34 2.68ZM12 8.7a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Zm0 1.98a1.32 1.32 0 1 1 0 2.64 1.32 1.32 0 0 1 0-2.64Z" />,
  tailwind: <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />,
  framer: <path d="M4 0h16v8h-8zM4 8h8l8 8h-16zM4 16h8v8z" />,
  node: <path d="M12 1.608l10.392 6v12L12 25.608l-10.392-6v-12L12 1.608zm0 2.77L4.615 8.538v7.538L12 23.23l7.385-7.154V8.538L12 4.377z" />,
  git: <path d="M22.61 16.52a2.78 2.78 0 0 0-1.02-3.9l-4.55-2.62a2.78 2.78 0 0 0-3.9 1.02 2.78 2.78 0 0 0 1.02 3.9l4.55 2.62a2.78 2.78 0 0 0 3.9-1.02zM12 13.5a2.78 2.78 0 1 0 0-5.56 2.78 2.78 0 0 0 0 5.56zM5.94 16.52a2.78 2.78 0 0 1-1.02-3.9l4.55-2.62a2.78 2.78 0 0 1 3.9 1.02 2.78 2.78 0 0 1-1.02 3.9L7.9 17.54a2.78 2.78 0 0 1-1.96-.98z" />,
};

const AnimatedLine = ({ d, duration, delay }: any) => (
  <motion.svg width="1000" height="600" viewBox="0 0 1000 600" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }} transition={{ duration, repeat: Infinity, delay }}>
    <motion.path d={d} fill="none" stroke="url(#about_gradient)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: duration / 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
    <defs>
      <linearGradient id="about_gradient" gradientTransform="rotate(90)">
        <stop offset="0%" stopColor="#E3B619" stopOpacity="0" /><stop offset="50%" stopColor="#E3B619" stopOpacity="1" /><stop offset="100%" stopColor="#E3B619" stopOpacity="0" />
      </linearGradient>
    </defs>
  </motion.svg>
);

const About = () => {
  const lines = [
    { d: "M 50 100 C 200 700, 800 -100, 950 600", duration: 28, delay: 1 },
    { d: "M 100 600 C 300 -100, 700 700, 900 0", duration: 22, delay: 3 },
    { d: "M 950 100 C 800 -200, 200 800, 50 500", duration: 32, delay: 6 },
  ];
  
  const skills = [
    { name: "Next.js", icon: icons.nextjs },
    { name: "React", icon: icons.react },
    { name: "TypeScript", icon: icons.typescript },
    { name: "Python", icon: icons.python },
    { name: "Supabase", icon: icons.supabase },
    { name: "Tailwind CSS", icon: icons.tailwind },
    { name: "Framer Motion", icon: icons.framer },
    { name: "Node.js", icon: icons.node },
    { name: "Git", icon: icons.git },
    { name: "AI / ML", icon: icons.ai },
    { name: "Automation", icon: icons.automation },
  ];

  const pillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className={cn("relative flex flex-col items-center justify-center overflow-hidden bg-black w-full py-24 md:py-48 z-0")}>
      <div className="absolute top-0 left-0 w-full h-full opacity-30 md:opacity-50 [filter:drop-shadow(0_0_10px_rgba(227,182,25,0.15))_md:drop-shadow(0_0_20px_rgba(227,182,25,0.2))]">
        {lines.map((line, i) => (<AnimatedLine key={i} {...line} />))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-5 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: "circOut" }} className="flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent">I Build for Belief.</h2>
          <div className="mt-8 space-y-6 text-base md:text-lg font-normal text-neutral-300">
            <p>For me, code is more than a profession—it&apos;s a medium for creation. I partner with founders and business leaders who have a clear vision and an ambitious mission. My role is to translate that ambition into tangible, high-performance digital platforms.</p>
            <p>My passion lies in seeing a business come to life online, knowing that the technology I’ve built is a core part of its growth and success.{" "}<span className="relative inline-block"><span className="absolute bottom-0 left-0 w-full h-[35%] bg-[#E3B619]/70 -rotate-1"></span><span className="relative">That&apos;s the real metric of a job well done.</span></span></p>
          </div>
          
          <div className="mt-16 w-full">
            <h3 className="text-2xl font-medium bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent mb-8">My Tech Stack</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, index) => (
                <motion.div key={skill.name} variants={pillVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }} viewport={{ once: true }} className="flex items-center gap-3 rounded-lg border border-yellow-400/30 bg-neutral-900/50 px-4 py-2 text-neutral-200 shadow-[0_0_8px_rgba(227,182,25,0.3)] transition-colors hover:bg-neutral-800">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">{skill.icon}</svg>
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

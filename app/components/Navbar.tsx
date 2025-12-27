"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [active, setActive] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'tools', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActive(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-8 py-3">
        <div className="flex items-center gap-8 text-white/90">
          <a href="#about" className={`relative hover:text-white ${active === 'about' ? 'text-white' : ''}`}>
            About
            {active === 'about' && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#E3B619]"
              />
            )}
          </a>
          <a href="#projects" className={`relative hover:text-white ${active === 'projects' ? 'text-white' : ''}`}>
            Projects
            {active === 'projects' && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#E3B619]"
              />
            )}
          </a>
          <a href="#tools" className={`relative hover:text-white ${active === 'tools' ? 'text-white' : ''}`}>
            Tools
            {active === 'tools' && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#E3B619]"
              />
            )}
          </a>
          <a href="#contact" className={`relative hover:text-white ${active === 'contact' ? 'text-white' : ''}`}>
            Contact
            {active === 'contact' && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#E3B619]"
              />
            )}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

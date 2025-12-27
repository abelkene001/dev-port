"use client";
import { motion } from 'framer-motion';
import React from 'react';

const tools = [
  { name: 'Figma', href: 'https://figma.com' },
  { name: 'VS Code', href: 'https://code.visualstudio.com' },
  { name: 'iTerm2', href: 'https://iterm2.com' },
  { name: 'Notion', href: 'https://notion.so' },
  { name: 'Slack', href: 'https://slack.com' },
  { name: 'Linear', href: 'https://linear.app' },
];

const Tools = () => {
  return (
    <motion.section
      id="tools"
      className="py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold text-center mb-12">My Toolkit</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0A0A0A] border border-white/10 rounded-full px-6 py-3 text-white/90 hover:bg-white/5 transition-colors"
          >
            {tool.name}
          </a>
        ))}
      </div>
    </motion.section>
  );
};

export default Tools;

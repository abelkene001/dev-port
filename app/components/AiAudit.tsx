"use client";
import React from 'react';
import { motion } from 'framer-motion';

const AiAudit = () => {
  return (
    <section id="ai-audit" className="py-12 px-4 flex flex-col items-center justify-center relative z-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Is Your Business Leaking Money?
        </h2>
        <p className="text-[#E3B619] font-medium text-lg animate-pulse">
          Check the health of your business now ↓
        </p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-[#0A0A0A] border-2 border-[#E3B619] rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(227,182,25,0.15)] flex flex-col md:flex-row group hover:shadow-[0_0_50px_rgba(227,182,25,0.25)] transition-all duration-300"
      >
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-white/5">
           <img 
             src="https://ik.imagekit.io/quickrank/Kene%20AI%20logo%20?updatedAt=1767088067596" 
             alt="Kene AI Audit" 
             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
        </div>
        
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#E3B619" strokeWidth="1">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-bold text-black bg-[#E3B619] rounded-full uppercase tracking-wide">
              Featured Tool
            </span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Kene AI Audit</h3>
          
          <p className="text-neutral-300 mb-6 leading-relaxed text-sm md:text-base">
              Stop guessing and start growing. Kène audits your daily operations, uncovers hidden bottlenecks, and builds you a custom roadmap to a smoother, more profitable business.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {['Business', 'AI', 'Audit'].map((tag) => (
              <span key={tag} className="text-xs uppercase tracking-wider font-medium text-[#E3B619] bg-[#E3B619]/10 px-2 py-1 rounded border border-[#E3B619]/20">
                {tag}
              </span>
            ))}
          </div>
          
          <a 
            href="https://kene-ai-audit.vercel.app/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#E3B619] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#E3B619]/90 transition-all transform hover:translate-y-[-2px] w-full md:w-auto shadow-lg shadow-[#E3B619]/20"
          >
            Check Business Health
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default AiAudit;

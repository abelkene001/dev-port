"use client";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase-client';
import { handleLike } from '../actions/projectActions';

interface Project {
  id: number;
  title: string;
  description: string;
  href: string;
  status: string;
  likes_count: number;
  image_url?: string;
  tags?: string[];
}

const AnimatedLine = ({ d, duration, delay }: any) => (
  <motion.svg width="1000" height="600" viewBox="0 0 1000 600" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }} transition={{ duration, repeat: Infinity, delay }}>
    <motion.path d={d} fill="none" stroke="url(#projects_gradient)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: duration / 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
    <defs>
      <linearGradient id="projects_gradient" gradientTransform="rotate(90)">
        <stop offset="0%" stopColor="#E3B619" stopOpacity="0" /><stop offset="50%" stopColor="#E3B619" stopOpacity="1" /><stop offset="100%" stopColor="#E3B619" stopOpacity="0" />
      </linearGradient>
    </defs>
  </motion.svg>
);

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const supabase = createClient();

  const lines = [
    { d: "M 50 100 C 200 700, 800 -100, 950 600", duration: 28, delay: 1 },
    { d: "M 100 600 C 300 -100, 700 700, 900 0", duration: 22, delay: 3 },
    { d: "M 950 100 C 800 -200, 200 800, 50 500", duration: 32, delay: 6 },
  ];

  useEffect(() => {
    const getProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching projects:', error);
      } else if (data) {
        const formattedProjects = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          href: item.slug, 
          status: item.status,
          likes_count: item.likes_count,
          image_url: item.image_url,
          tags: item.tags
        }));
        setProjects(formattedProjects);
      }
    };
    getProjects();
  }, []);

  const onLike = async (projectId: number) => {
    // Optimistic update
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, likes_count: p.likes_count + 1 } : p
      )
    );
    
    await handleLike(projectId);
    
    // Re-fetch to ensure sync
    const { data } = await supabase.from('projects').select('likes_count').eq('id', projectId).single();
    if (data) {
        setProjects((prev) =>
            prev.map((p) =>
              p.id === projectId ? { ...p, likes_count: data.likes_count } : p
            )
          );
    }
  };

  return (
    <motion.section
      id="projects"
      className="relative py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Animation */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 md:opacity-50 [filter:drop-shadow(0_0_10px_rgba(227,182,25,0.15))_md:drop-shadow(0_0_20px_rgba(227,182,25,0.2))] pointer-events-none">
        {lines.map((line, i) => (<AnimatedLine key={i} {...line} />))}
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-center mb-12">My Project Vault</h2>
        
        <div className="flex flex-col gap-8 w-full items-center">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full max-w-4xl bg-[#0A0A0A] border border-white/10 hover:border-[#E3B619] rounded-3xl overflow-hidden shadow-lg flex flex-col md:flex-row group hover:shadow-[0_0_30px_rgba(227,182,25,0.15)] transition-all duration-300"
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2 h-64 md:min-h-[320px] relative overflow-hidden bg-white/5">
                {project.image_url ? (
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-white/20">
                    <span className="text-4xl">✨</span>
                   </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
                
                {project.status === 'upcoming' && (
                    <div className="absolute top-4 left-4 text-xs font-bold uppercase text-black bg-[#E3B619] px-3 py-1 rounded-full shadow-lg z-10">
                        Upcoming
                    </div>
                )}
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center relative">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
                    <button 
                        onClick={() => onLike(project.id)}
                        className="flex items-center gap-2 text-white/50 hover:text-red-500 transition-colors group/like"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 transition-transform group-active/like:scale-125"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        >
                        <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                        />
                        </svg>
                        <span className="text-sm font-medium group-hover/like:text-white transition-colors">{project.likes_count}</span>
                    </button>
                </div>

                <p className="text-neutral-300 mb-6 leading-relaxed text-sm md:text-base line-clamp-3">
                    {project.description}
                </p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.slice(0, 4).map((tag, index) => (
                    <span key={index} className="text-xs uppercase tracking-wider font-medium text-[#E3B619] bg-[#E3B619]/10 px-2 py-1 rounded border border-[#E3B619]/20">
                        {tag}
                    </span>
                    ))}
                </div>
                )}

                <a 
                    href={project.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-[#E3B619] hover:text-black text-white border border-white/10 hover:border-[#E3B619] font-bold py-3 px-6 rounded-lg transition-all w-full md:w-auto self-start shadow-lg"
                >
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;

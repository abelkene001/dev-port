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

      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">The Bento Vault</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden hover:brightness-110 transition-all flex flex-col h-full group col-span-1"
            >
              {/* Image Section */}
              {project.image_url && (
                <div className="w-full aspect-video overflow-hidden relative">
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.status === 'upcoming' && (
                    <div className="absolute top-3 right-3 text-[10px] md:text-xs font-bold uppercase text-black bg-[#E3B619] px-2 py-1 rounded-full shadow-lg">
                      Upcoming
                    </div>
                  )}
                </div>
              )}

              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg md:text-2xl font-bold line-clamp-1">{project.title}</h3>
                  {/* Fallback status badge if no image */}
                  {!project.image_url && project.status === 'upcoming' && (
                    <div className="text-[10px] md:text-xs font-bold uppercase text-[#E3B619] bg-[#E3B619]/10 px-2 py-1 rounded-full">
                      Upcoming
                    </div>
                  )}
                </div>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="text-[9px] md:text-[10px] uppercase tracking-wider font-medium text-white/60 bg-white/5 px-2 py-1 rounded border border-white/5">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                        <span className="text-[9px] md:text-[10px] uppercase tracking-wider font-medium text-white/60 bg-white/5 px-2 py-1 rounded border border-white/5">
                            +{project.tags.length - 3}
                        </span>
                    )}
                  </div>
                )}

                <p className="text-white/70 flex-grow text-xs md:text-sm leading-relaxed line-clamp-3 mb-4">{project.description}</p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5 w-full">
                  <a
                    href={project.href}
                    className="text-[#E3B619] hover:underline font-semibold text-xs md:text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See It In Action →
                  </a>
                  <button 
                    onClick={() => onLike(project.id)}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group/like"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 md:h-5 md:w-5 group-hover/like:text-red-500 transition-colors"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs md:text-sm font-medium">{project.likes_count}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;

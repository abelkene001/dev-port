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

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const supabase = createClient();

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
      className="py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold text-center mb-12">The Bento Vault</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden hover:brightness-110 transition-all flex flex-col h-full group"
          >
            {/* Image Section */}
            {project.image_url && (
              <div className="w-full h-48 overflow-hidden relative">
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {project.status === 'upcoming' && (
                  <div className="absolute top-3 right-3 text-xs font-bold uppercase text-black bg-[#E3B619] px-2 py-1 rounded-full shadow-lg">
                    Upcoming
                  </div>
                )}
              </div>
            )}

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                {/* Fallback status badge if no image */}
                {!project.image_url && project.status === 'upcoming' && (
                  <div className="text-xs font-bold uppercase text-[#E3B619] bg-[#E3B619]/10 px-2 py-1 rounded-full">
                    Upcoming
                  </div>
                )}
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="text-[10px] uppercase tracking-wider font-medium text-white/60 bg-white/5 px-2 py-1 rounded border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-white/70 flex-grow text-sm leading-relaxed">{project.description}</p>
              
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 w-full">
                <a
                  href={project.href}
                  className="text-[#E3B619] hover:underline font-semibold text-sm"
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
                    className="h-5 w-5 group-hover/like:text-red-500 transition-colors"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">{project.likes_count}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;

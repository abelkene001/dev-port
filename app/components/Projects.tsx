"use client";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { handleLike } from '../actions/projectActions';

interface Project {
  id: number;
  title: string;
  description: string;
  href: string; // Assuming 'slug' or a specific URL field is used for the link
  status: string;
  likes_count: number;
  image_url?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching projects:', error);
      } else if (data) {
        // Map the database fields to the component's expected structure if necessary
        // For now assuming the structure matches or is close enough
        const formattedProjects = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          href: item.slug ? `/projects/${item.slug}` : '#', // Or use a specific 'demo_url' if available
          status: item.status,
          likes_count: item.likes_count,
          image_url: item.image_url
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
    
    // Re-fetch to ensure sync (optional, but good for consistency)
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
            className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:brightness-110 transition-all flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              {project.status === 'upcoming' && (
                <div className="text-xs font-bold uppercase text-[#E3B619] bg-[#E3B619]/10 px-2 py-1 rounded-full">
                  Upcoming
                </div>
              )}
            </div>
            <p className="text-white/70 flex-grow">{project.description}</p>
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 w-full">
              <a
                href={project.href}
                className="text-[#E3B619] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
              <button 
                onClick={() => onLike(project.id)}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{project.likes_count}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;

"use client";
import React, { useState, useRef } from 'react';
import { createProject, updateProject, deleteProject } from '../actions/projectActions';

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  tags: string | string[]; // Can be array from DB or string from form
  status: string;
  likes_count: number;
}

export default function ProjectManager({ projects }: { projects: any[] }) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    let result;
    try {
        if (editingProject) {
        result = await updateProject(editingProject.id, formData);
        } else {
        result = await createProject(formData);
        }

        if (result?.error) {
        alert(result.error);
        } else {
        alert(editingProject ? "Project updated!" : "Project created!");
        setEditingProject(null);
        formRef.current?.reset();
        }
    } catch (e) {
        alert("An unexpected error occurred.");
        console.error(e);
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
  };

  const handleCancel = () => {
    setEditingProject(null);
    formRef.current?.reset();
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2">Project Manager</h2>
      
      {/* Form */}
      <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl mb-8">
        <h3 className="text-xl font-semibold mb-4">
            {editingProject ? `Edit Project: ${editingProject.title}` : 'Add New Project'}
        </h3>
        <form 
            ref={formRef} 
            action={handleSubmit} 
            className="space-y-4"
            key={editingProject ? editingProject.id : 'new'}
        >
          <div>
            <label className="block text-sm text-white/70 mb-1">Title</label>
            <input 
                name="title" 
                type="text" 
                required 
                defaultValue={editingProject?.title || ''}
                className="w-full bg-black border border-white/10 rounded px-3 py-2 focus:border-[#E3B619] outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Slug (URL)</label>
            <input 
                name="slug" 
                type="text" 
                required 
                defaultValue={editingProject?.slug || ''}
                className="w-full bg-black border border-white/10 rounded px-3 py-2 focus:border-[#E3B619] outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Description</label>
            <textarea 
                name="description" 
                required 
                defaultValue={editingProject?.description || ''}
                className="w-full bg-black border border-white/10 rounded px-3 py-2 focus:border-[#E3B619] outline-none" 
                rows={3} 
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Image URL</label>
            <input 
                name="image_url" 
                type="text" 
                defaultValue={editingProject?.image_url || ''}
                className="w-full bg-black border border-white/10 rounded px-3 py-2 focus:border-[#E3B619] outline-none" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/70 mb-1">Tags (comma separated)</label>
              <input 
                name="tags" 
                type="text" 
                defaultValue={Array.isArray(editingProject?.tags) ? editingProject?.tags.join(', ') : editingProject?.tags || ''}
                className="w-full bg-black border border-white/10 rounded px-3 py-2 focus:border-[#E3B619] outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Status</label>
              <select 
                name="status" 
                defaultValue={editingProject?.status || 'published'}
                className="w-full bg-black border border-white/10 rounded px-3 py-2 focus:border-[#E3B619] outline-none"
              >
                <option value="published">Published</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-[#E3B619] text-black font-bold py-2 rounded hover:bg-[#cda417] transition">
                {editingProject ? 'Update Project' : 'Create Project'}
            </button>
            {editingProject && (
                <button 
                    type="button" 
                    onClick={handleCancel}
                    className="px-6 py-2 border border-white/10 rounded hover:bg-white/5 transition"
                >
                    Cancel
                </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Existing Projects</h3>
        {projects?.map((project) => (
          <div key={project.id} className="flex justify-between items-center bg-[#0A0A0A] border border-white/10 p-4 rounded-lg">
            <div className="flex items-center gap-4">
                {project.image_url && (
                    <img src={project.image_url} alt={project.title} className="w-12 h-12 object-cover rounded" />
                )}
                <div>
                  <h4 className="font-bold">{project.title}</h4>
                  <div className="flex items-center gap-3 text-sm text-white/50">
                    <span>{project.status}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {project.likes_count}
                    </span>
                  </div>
                </div>
            </div>
            <div className="flex gap-3">
                <button 
                    onClick={() => handleEdit(project)}
                    className="text-[#E3B619] hover:text-[#cda417] text-sm font-medium"
                >
                    Edit
                </button>
                <button 
                    onClick={async () => {
                        if(confirm('Delete this project?')) {
                            await deleteProject(project.id);
                        }
                    }}
                    className="text-red-500 hover:text-red-400 text-sm font-medium"
                >
                    Delete
                </button>
            </div>
          </div>
        ))}
        {projects?.length === 0 && <p className="text-white/50">No projects found.</p>}
      </div>
    </section>
  );
}

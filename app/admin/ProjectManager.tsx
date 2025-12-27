"use client";
import React, { useState, useRef } from 'react';
import { createProject, updateProject, deleteProject } from '../actions/projectActions';

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  tags: string; // Supabase might return array, but form uses string. We might need to handle this.
  status: string;
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
    // Manually populate form if needed, or rely on defaultValue with key
    // Using key on form is a good trick to reset it when editingProject changes
    if (formRef.current) {
        // We can't easily set values of uncontrolled inputs without a reset or key change
        // So we will use the 'key' prop on the form to force re-render when editingProject changes
    }
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
                defaultValue={editingProject?.tags || ''}
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
            <div>
              <h4 className="font-bold">{project.title}</h4>
              <p className="text-sm text-white/50">{project.status}</p>
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

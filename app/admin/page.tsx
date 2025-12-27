import React from 'react';
import { createClient } from '../lib/supabase';
import { createProject, deleteProject } from '../actions/projectActions';

export default async function AdminDashboard() {
  const supabase = createClient();

  // Fetch Projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  // Fetch Messages
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <h1 className="text-4xl font-bold mb-12 text-[#E3B619]">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Project Manager Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2">Project Manager</h2>
          
          {/* Add New Project Form */}
          <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
            <form action={createProject} className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-1">Title</label>
                <input name="title" type="text" required className="w-full bg-black border border-white/10 rounded px-3 py-2 focus:border-[#E3B619] outline-none" />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1">Slug (URL)</label>
                <input name="slug" type="text" required className="w-full bg-black border border-white/10 rounded px-3 py-2 focus:border-[#E3B619] outline-none" />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1">Description</label>
                <textarea name="description" required className="w-full bg-black border border-white/10 rounded px-3 py-2 focus:border-[#E3B619] outline-none" rows={3} />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1">Image URL</label>
                <input name="image_url" type="text" className="w-full bg-black border border-white/10 rounded px-3 py-2 focus:border-[#E3B619] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/70 mb-1">Tags (comma separated)</label>
                  <input name="tags" type="text" className="w-full bg-black border border-white/10 rounded px-3 py-2 focus:border-[#E3B619] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1">Status</label>
                  <select name="status" className="w-full bg-black border border-white/10 rounded px-3 py-2 focus:border-[#E3B619] outline-none">
                    <option value="published">Published</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#E3B619] text-black font-bold py-2 rounded hover:bg-[#cda417] transition">
                Create Project
              </button>
            </form>
          </div>

          {/* Existing Projects List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Existing Projects</h3>
            {projects?.map((project) => (
              <div key={project.id} className="flex justify-between items-center bg-[#0A0A0A] border border-white/10 p-4 rounded-lg">
                <div>
                  <h4 className="font-bold">{project.title}</h4>
                  <p className="text-sm text-white/50">{project.status}</p>
                </div>
                <form action={deleteProject.bind(null, project.id)}>
                  <button type="submit" className="text-red-500 hover:text-red-400 text-sm font-medium">
                    Delete
                  </button>
                </form>
              </div>
            ))}
            {projects?.length === 0 && <p className="text-white/50">No projects found.</p>}
          </div>
        </section>

        {/* Inbox Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2">Inquiry Inbox</h2>
          <div className="space-y-4">
            {messages?.map((msg) => (
              <div key={msg.id} className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[#E3B619]">{msg.sender_name}</h3>
                  <span className="text-xs text-white/40">{new Date(msg.created_at).toLocaleDateString()}</span>
                </div>
                <a href={`mailto:${msg.email}`} className="text-sm text-white/60 hover:text-white block mb-3">
                  {msg.email}
                </a>
                <p className="text-white/80 bg-black/50 p-3 rounded border border-white/5">
                  {msg.message_body}
                </p>
              </div>
            ))}
            {messages?.length === 0 && <p className="text-white/50">No messages yet.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}

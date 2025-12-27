import React from 'react';
import { createClient } from '../lib/supabase';
import ProjectManager from './ProjectManager';

export default async function AdminDashboard() {
  const supabase = await createClient();

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
        <ProjectManager projects={projects || []} />

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

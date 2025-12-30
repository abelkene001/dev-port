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
              <div key={msg.id} className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl hover:border-[#E3B619]/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-[#E3B619]">{msg.sender_name}</h3>
                    <div className="flex flex-col gap-1 mt-1">
                      <a href={`mailto:${msg.email}`} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        {msg.email}
                      </a>
                      {msg.phone && (
                        <a href={`tel:${msg.phone}`} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          {msg.phone}
                        </a>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded border border-white/5">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                   {msg.project_type && (
                     <div className="bg-white/5 p-2 rounded border border-white/5">
                       <span className="text-xs text-white/40 block uppercase tracking-wider">Type</span>
                       <span className="text-sm font-medium">{msg.project_type}</span>
                     </div>
                   )}
                   {msg.budget && (
                     <div className="bg-white/5 p-2 rounded border border-white/5">
                       <span className="text-xs text-white/40 block uppercase tracking-wider">Budget</span>
                       <span className="text-sm font-medium">{msg.budget}</span>
                     </div>
                   )}
                   {msg.timeline && (
                     <div className="bg-white/5 p-2 rounded border border-white/5">
                       <span className="text-xs text-white/40 block uppercase tracking-wider">Timeline</span>
                       <span className="text-sm font-medium">{msg.timeline}</span>
                     </div>
                   )}
                </div>

                <div className="bg-black/50 p-4 rounded-lg border border-white/5">
                  <span className="text-xs text-white/40 block uppercase tracking-wider mb-2">Message</span>
                  <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.message_body}
                  </p>
                </div>
              </div>
            ))}
            {messages?.length === 0 && <p className="text-white/50 italic">No messages yet.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}

"use client";
import { motion, AnimatePresence } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { submitInquiry } from '../actions/inquiryActions';

const AnimatedLine = ({ d, duration, delay }: any) => (
  <motion.svg width="1000" height="600" viewBox="0 0 1000 600" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }} transition={{ duration, repeat: Infinity, delay }}>
    <motion.path d={d} fill="none" stroke="url(#contact_gradient)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: duration / 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
    <defs>
      <linearGradient id="contact_gradient" gradientTransform="rotate(90)">
        <stop offset="0%" stopColor="#E3B619" stopOpacity="0" /><stop offset="50%" stopColor="#E3B619" stopOpacity="1" /><stop offset="100%" stopColor="#E3B619" stopOpacity="0" />
      </linearGradient>
    </defs>
  </motion.svg>
);

const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[#0A0A0A] border border-[#E3B619] rounded-2xl p-8 max-w-md w-full shadow-[0_0_30px_rgba(227,182,25,0.15)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#E3B619]/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E3B619]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-white/70 mb-6">
                Thanks for reaching out. I've received your inquiry and will get back to you via WhatsApp or Email in no time.
              </p>
              
              <button
                onClick={onClose}
                className="bg-[#E3B619] text-black font-bold py-3 px-8 rounded-lg hover:bg-[#B59414] transition-colors w-full"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lines = [
    { d: "M 50 100 C 200 700, 800 -100, 950 600", duration: 28, delay: 1 },
    { d: "M 100 600 C 300 -100, 700 700, 900 0", duration: 22, delay: 3 },
    { d: "M 950 100 C 800 -200, 200 800, 50 500", duration: 32, delay: 6 },
  ];

  const handleSubmit = async (formData: FormData) => {
    await submitInquiry(formData);
    formRef.current?.reset();
    setIsModalOpen(true);
  };

  return (
    <motion.section
      id="contact"
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Let's Build Something Great</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Ready to turn your vision into reality? Tell me a bit about your project, and let's see how we can work together.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          {/* Decorative gradient blob */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#E3B619]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <form ref={formRef} action={handleSubmit} className="space-y-6 relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white/80 ml-1">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E3B619] focus:ring-1 focus:ring-[#E3B619] transition-all placeholder:text-white/20"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/80 ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E3B619] focus:ring-1 focus:ring-[#E3B619] transition-all placeholder:text-white/20"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone / WhatsApp */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-white/80 ml-1">Phone / WhatsApp</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E3B619] focus:ring-1 focus:ring-[#E3B619] transition-all placeholder:text-white/20"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* Project Type */}
            <div className="space-y-2">
              <label htmlFor="project_type" className="text-sm font-medium text-white/80 ml-1">Project Type</label>
              <div className="relative">
                <select
                  name="project_type"
                  id="project_type"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E3B619] focus:ring-1 focus:ring-[#E3B619] transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#0A0A0A] text-white/50">Select Project Type</option>
                  <option value="web_app" className="bg-[#0A0A0A]">Web Application</option>
                  <option value="website" className="bg-[#0A0A0A]">Website / Landing Page</option>
                  <option value="ecommerce" className="bg-[#0A0A0A]">E-commerce Store</option>
                  <option value="audit" className="bg-[#0A0A0A]">Code/Performance Audit</option>
                  <option value="other" className="bg-[#0A0A0A]">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Budget */}
              <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-medium text-white/80 ml-1">Budget</label>
                <div className="relative">
                  <select
                    name="budget"
                    id="budget"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E3B619] focus:ring-1 focus:ring-[#E3B619] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0A0A0A] text-white/50">Select Range</option>
                    <option value="<5k" className="bg-[#0A0A0A]">&lt; $5k</option>
                    <option value="5k-10k" className="bg-[#0A0A0A]">$5k - $10k</option>
                    <option value="10k-25k" className="bg-[#0A0A0A]">$10k - $25k</option>
                    <option value="25k+" className="bg-[#0A0A0A]">$25k+</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <label htmlFor="timeline" className="text-sm font-medium text-white/80 ml-1">Timeline</label>
                <div className="relative">
                  <select
                    name="timeline"
                    id="timeline"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E3B619] focus:ring-1 focus:ring-[#E3B619] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0A0A0A] text-white/50">Select Timeline</option>
                    <option value="ASAP" className="bg-[#0A0A0A]">ASAP</option>
                    <option value="1-3 months" className="bg-[#0A0A0A]">1-3 Months</option>
                    <option value="flexible" className="bg-[#0A0A0A]">Flexible</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-white/80 ml-1">Project Details</label>
              <textarea
                name="message"
                id="message"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E3B619] focus:ring-1 focus:ring-[#E3B619] transition-all placeholder:text-white/20 resize-none"
                placeholder="Tell me more about what you want to build..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E3B619] text-black font-bold py-4 px-6 rounded-xl hover:bg-[#B59414] transition-all transform hover:scale-[1.02] shadow-lg shadow-[#E3B619]/20"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
      
      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.section>
  );
};

export default Contact;

"use client";
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { submitInquiry } from '../actions/inquiryActions';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    await submitInquiry(formData);
    formRef.current?.reset();
    alert('Thanks for reaching out! I\'ll get back to you shortly.');
  };

  return (
    <motion.section
      id="contact"
      className="py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Let's Build Something Great</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Ready to turn your vision into reality? Tell me a bit about your project, and let's see how we can work together.
        </p>
      </div>
      
      <form ref={formRef} action={handleSubmit} className="max-w-xl mx-auto space-y-6">
        
        {/* Name */}
        <div className="relative z-0 w-full group">
          <input
            type="text"
            name="name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[#E3B619] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#E3B619] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            What's your name?
          </label>
        </div>

        {/* Email */}
        <div className="relative z-0 w-full group">
          <input
            type="email"
            name="email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[#E3B619] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#E3B619] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            What's your email address?
          </label>
        </div>

        {/* Project Type */}
        <div className="relative z-0 w-full group">
            <select
                name="project_type"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[#E3B619] peer"
            >
                <option value="" className="bg-black text-gray-500">Select Project Type</option>
                <option value="web_app" className="bg-black">Web Application</option>
                <option value="website" className="bg-black">Website / Landing Page</option>
                <option value="ecommerce" className="bg-black">E-commerce Store</option>
                <option value="audit" className="bg-black">Code/Performance Audit</option>
                <option value="other" className="bg-black">Other</option>
            </select>
            <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                What are you looking to build?
            </label>
        </div>

        {/* Budget & Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative z-0 w-full group">
                <select
                    name="budget"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[#E3B619] peer"
                >
                    <option value="" className="bg-black text-gray-500">Select Budget Range</option>
                    <option value="<5k" className="bg-black">&lt; $5k</option>
                    <option value="5k-10k" className="bg-black">$5k - $10k</option>
                    <option value="10k-25k" className="bg-black">$10k - $25k</option>
                    <option value="25k+" className="bg-black">$25k+</option>
                </select>
                <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                    What's your budget?
                </label>
            </div>

            <div className="relative z-0 w-full group">
                <select
                    name="timeline"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[#E3B619] peer"
                >
                    <option value="" className="bg-black text-gray-500">Select Timeline</option>
                    <option value="ASAP" className="bg-black">ASAP (I need it yesterday)</option>
                    <option value="1-3 months" className="bg-black">1-3 Months</option>
                    <option value="flexible" className="bg-black">Flexible</option>
                </select>
                <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">
                    When do you need it by?
                </label>
            </div>
        </div>

        {/* Message */}
        <div className="relative z-0 w-full group">
          <textarea
            name="message"
            id="floating_message"
            rows={4}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-[#E3B619] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_message"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#E3B619] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tell me more about the project...
          </label>
        </div>

        <button
          type="submit"
          className="w-full text-black bg-[#E3B619] hover:bg-[#B59414] focus:ring-4 focus:outline-none focus:ring-yellow-300 font-bold rounded-lg text-sm px-5 py-3 text-center transition-all transform hover:scale-[1.02]"
        >
          Let's Talk
        </button>
      </form>
    </motion.section>
  );
};

export default Contact;

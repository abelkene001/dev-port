"use client";
import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { submitInquiry } from '../actions/inquiryActions';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    await submitInquiry(formData);
    formRef.current?.reset();
    alert('Message sent!');
  };

  return (
    <motion.section
      id="contact"
      className="py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
      <form ref={formRef} action={handleSubmit} className="max-w-xl mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none dark:text-white dark:border-white/10 dark:focus:border-[#E3B619] focus:outline-none focus:ring-0 focus:border-[#E3B619] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#E3B619] peer-focus:dark:text-[#E3B619] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none dark:text-white dark:border-white/10 dark:focus:border-[#E3B619] focus:outline-none focus:ring-0 focus:border-[#E3B619] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#E3B619] peer-focus:dark:text-[#E3B619] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            name="message"
            id="floating_message"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white/10 appearance-none dark:text-white dark:border-white/10 dark:focus:border-[#E3B619] focus:outline-none focus:ring-0 focus:border-[#E3B619] peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_message"
            className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#E3B619] peer-focus:dark:text-[#E3B619] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your message
          </label>
        </div>
        <button
          type="submit"
          className="text-black bg-[#E3B619] hover:bg-[#B59414] focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </motion.section>
  );
};

export default Contact;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Custom hook to detect if an element is in view
function useInView(threshold = 0.15) {
  const ref = useRef();
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const LandingPage = ({ user }) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);
  const navigate = useNavigate();

  // Slide-up hooks for each section
  const [aboutRef, aboutInView] = useInView();
  const [servicesRef, servicesInView] = useInView();
  const [contactRef, contactInView] = useInView();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto w-full px-8 py-16 gap-8">
        {/* Left Content */}
        <div
          className={`flex-1 flex flex-col items-start justify-center gap-6 transition-all duration-700 ease-out ${animate ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 font-poppins text-indigo-700 drop-shadow-sm">Hi, welcome to TaskFlow!</h2>
          <p className="bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent text-2xl md:text-3xl font-poppins font-semibold mb-2">Your daily productivity companion, designed for simplicity and delight. Organize, prioritize, and achieve your goals with style!</p>
          {!user && (
            <div className="flex gap-4">
              <button className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-poppins font-bold text-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-200" onClick={() => navigate('/login', { state: { signup: true } })}>Sign Up</button>
            </div>
          )}
        </div>
        {/* Right Illustration: Replace with glassmorphic daily tasks card */}
        <div
          className={`flex-1 flex items-center justify-center relative min-h-[350px] transition-all duration-700 ease-out delay-200 ${animate ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
        >
          <div className="bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100 p-8 w-full max-w-md relative z-0 flex flex-col gap-4 glass-card">
            <h3 className="text-xl font-bold text-indigo-700 mb-4 font-poppins">Today's Tasks</h3>
            <ul className="flex flex-col gap-3">
              <li className="task-animate group cursor-pointer px-4 py-3 rounded-xl font-semibold text-indigo-800 bg-white/40 shadow">
                <span className="inline-block group-hover:scale-105 group-hover:text-pink-500 transition-transform duration-300">☀️ Morning jog in the park</span>
              </li>
              <li className="task-animate group cursor-pointer px-4 py-3 rounded-xl font-semibold text-indigo-800 bg-white/40 shadow">
                <span className="inline-block group-hover:scale-105 group-hover:text-blue-500 transition-transform duration-300">📚 Read 20 pages of a book</span>
              </li>
              <li className="task-animate group cursor-pointer px-4 py-3 rounded-xl font-semibold text-indigo-800 bg-white/40 shadow">
                <span className="inline-block group-hover:scale-105 group-hover:text-emerald-500 transition-transform duration-300">🛒 Grocery shopping</span>
              </li>
              <li className="task-animate group cursor-pointer px-4 py-3 rounded-xl font-semibold text-indigo-800 bg-white/40 shadow">
                <span className="inline-block group-hover:scale-105 group-hover:text-purple-500 transition-transform duration-300">💻 Finish a coding challenge</span>
              </li>
              <li className="task-animate group cursor-pointer px-4 py-3 rounded-xl font-semibold text-indigo-800 bg-white/40 shadow">
                <span className="inline-block group-hover:scale-105 group-hover:text-yellow-500 transition-transform duration-300">🧘‍♂️ Meditate for 10 minutes</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      {/* About Us Section */}
      <section
        id="about"
        ref={aboutRef}
        className={`max-w-4xl mx-auto px-8 py-16 transition-all duration-700 ease-out ${aboutInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-4 font-poppins">About Us</h2>
        <p className="text-gray-600 text-lg mb-4">We are a passionate team dedicated to building beautiful, modern, and efficient task management solutions. Our mission is to help you organize, prioritize, and achieve your goals with ease and style.</p>
        <p className="text-gray-600 text-lg">TaskFlow is designed with a focus on simplicity, productivity, and a delightful user experience. Thank you for choosing us to help you get things done!</p>
      </section>
      {/* Services Section */}
      <section
        id="services"
        ref={servicesRef}
        className={`max-w-4xl mx-auto px-8 py-16 transition-all duration-700 ease-out ${servicesInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-4 font-poppins">Our Services</h2>
        <ul className="grid md:grid-cols-3 gap-8 text-center">
          <li className="bg-indigo-50 rounded-xl p-6 shadow font-semibold text-indigo-700 transition transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br hover:from-indigo-400 hover:to-blue-400 hover:text-white cursor-pointer">
            Task Management
          </li>
          <li className="bg-pink-50 rounded-xl p-6 shadow font-semibold text-pink-700 transition transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br hover:from-pink-400 hover:to-yellow-400 hover:text-white cursor-pointer">
            Team Collaboration
          </li>
          <li className="bg-blue-50 rounded-xl p-6 shadow font-semibold text-blue-700 transition transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br hover:from-blue-400 hover:to-indigo-400 hover:text-white cursor-pointer">
            Productivity Analytics
          </li>
        </ul>
      </section>
      {/* Contact Us Section */}
      <section
        id="contact"
        ref={contactRef}
        className={`max-w-4xl mx-auto px-8 py-16 transition-all duration-700 ease-out ${contactInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-4 font-poppins">Contact Us</h2>
        <p className="text-gray-600 text-lg mb-6">We'd love to connect with you! Follow us on social media for updates, support, and more. Reach out anytime—we're here to help you succeed with TaskFlow.</p>
        <div className="flex gap-8 justify-center">
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
            <span className="bg-blue-700 text-white rounded-full p-4 shadow-lg group-hover:bg-blue-800 transition">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
            </span>
            <span className="mt-2 text-blue-700 font-semibold group-hover:underline">LinkedIn</span>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
            <span className="bg-gradient-to-br from-pink-500 via-yellow-400 to-purple-600 text-white rounded-full p-4 shadow-lg group-hover:from-pink-600 group-hover:to-purple-700 transition">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm6.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
            </span>
            <span className="mt-2 text-pink-600 font-semibold group-hover:underline">Instagram</span>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
            <span className="bg-blue-600 text-white rounded-full p-4 shadow-lg group-hover:bg-blue-700 transition">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.408 24 22.674V1.326C24 .592 23.405 0 22.675 0"/></svg>
            </span>
            <span className="mt-2 text-blue-600 font-semibold group-hover:underline">Facebook</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 
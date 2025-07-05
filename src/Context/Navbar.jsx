import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ user, isAdmin, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const NavLinks = () => (
    <>
      <Link
        to="/"
        onClick={(e) => {
          if (location.pathname === '/' && location.hash) {
            e.preventDefault();
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.replaceState(null, '', '/');
          }
          closeMobileMenu();
        }}
        className={`relative text-lg font-bold px-4 py-2 rounded-xl transition-all duration-200 group focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 ${location.pathname === '/' && !location.hash ? 'text-transparent bg-gradient-to-r from-pink-500 via-indigo-500 to-blue-500 bg-clip-text' : 'text-indigo-700'}`}
      >
        <span className="group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:via-indigo-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-200">
          Home
        </span>
        <span className={`absolute left-0 bottom-0 h-1 bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 rounded-full transition-all duration-300 mt-1 ${location.pathname === '/' && !location.hash ? 'w-full shadow-lg' : 'w-0 group-hover:w-full group-hover:shadow-lg'}`}></span>
      </Link>
      <Link 
        to={{ pathname: "/", hash: "#about" }} 
        onClick={closeMobileMenu}
        className={`relative text-lg font-bold px-4 py-2 rounded-xl transition-all duration-200 group focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 ${location.hash === '#about' ? 'text-transparent bg-gradient-to-r from-pink-500 via-indigo-500 to-blue-500 bg-clip-text' : 'text-indigo-700'}`}
      >
        <span className="group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:via-indigo-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-200">
          About
        </span>
        <span className={`absolute left-0 bottom-0 h-1 bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 rounded-full transition-all duration-300 mt-1 ${location.hash === '#about' ? 'w-full shadow-lg' : 'w-0 group-hover:w-full group-hover:shadow-lg'}`}></span>
      </Link>
      <Link 
        to={{ pathname: "/", hash: "#services" }} 
        onClick={closeMobileMenu}
        className={`relative text-lg font-bold px-4 py-2 rounded-xl transition-all duration-200 group focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 ${location.hash === '#services' ? 'text-transparent bg-gradient-to-r from-pink-500 via-indigo-500 to-blue-500 bg-clip-text' : 'text-indigo-700'}`}
      >
        <span className="group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:via-indigo-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-200">
          Services
        </span>
        <span className={`absolute left-0 bottom-0 h-1 bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 rounded-full transition-all duration-300 mt-1 ${location.hash === '#services' ? 'w-full shadow-lg' : 'w-0 group-hover:w-full group-hover:shadow-lg'}`}></span>
      </Link>
      <Link 
        to={{ pathname: "/", hash: "#contact" }} 
        onClick={closeMobileMenu}
        className={`relative text-lg font-bold px-4 py-2 rounded-xl transition-all duration-200 group focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 ${location.hash === '#contact' ? 'text-transparent bg-gradient-to-r from-pink-500 via-indigo-500 to-blue-500 bg-clip-text' : 'text-indigo-700'}`}
      >
        <span className="group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:via-indigo-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-200">
          Contact
        </span>
        <span className={`absolute left-0 bottom-0 h-1 bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 rounded-full transition-all duration-300 mt-1 ${location.hash === '#contact' ? 'w-full shadow-lg' : 'w-0 group-hover:w-full group-hover:shadow-lg'}`}></span>
      </Link>
      {user && (
        <Link 
          to="/dashboard" 
          onClick={closeMobileMenu}
          className={`relative text-lg font-bold px-4 py-2 rounded-xl transition-all duration-200 group focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 ${location.pathname === '/dashboard' ? 'text-transparent bg-gradient-to-r from-pink-500 via-indigo-500 to-blue-500 bg-clip-text' : 'text-indigo-700'}`}
        >
          <span className="group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:via-indigo-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-200">
            Dashboard
          </span>
          <span className={`absolute left-0 bottom-0 h-1 bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 rounded-full transition-all duration-300 mt-1 ${location.pathname === '/dashboard' ? 'w-full shadow-lg' : 'w-0 group-hover:w-full group-hover:shadow-lg'}`}></span>
        </Link>
      )}
    </>
  );

  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-5 bg-gradient-to-r from-white/80 via-indigo-100/80 to-white/80 backdrop-blur-xl shadow-xl rounded-b-3xl border-b-4 border-transparent sticky top-0 z-50 relative overflow-visible">
      {/* Gradient border under navbar */}
      <div className="absolute left-0 right-0 -bottom-1 h-1 bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 rounded-b-3xl blur-[1.5px] opacity-80 pointer-events-none" />
      
      {/* Logo */}
      <div className="flex items-center gap-3 select-none">
        <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-400 to-blue-400 transition-transform duration-200 hover:scale-110 shadow-lg">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-7 sm:h-7">
            <rect width="32" height="32" rx="10" fill="url(#tickgrad)"/>
            <defs>
              <linearGradient id="tickgrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ec4899" />
                <stop offset="1" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <path d="M9 17l5 5 9-9" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="text-xl sm:text-2xl font-extrabold font-poppins bg-gradient-to-r from-pink-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent select-none drop-shadow">TaskFlow</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8">
        <NavLinks />
      </div>

      {/* Desktop User Section */}
      <div className="hidden lg:flex items-center gap-4">
        {user ? (
          <>
            <span className="text-indigo-700 font-poppins text-lg flex items-center gap-1">
              <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" /></svg>
              {user}
              {isAdmin && <span className="ml-2 px-2 py-0.5 rounded bg-emerald-700 text-emerald-100 text-xs font-bold">Admin</span>}
            </span>
            <button
              className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-poppins font-bold text-base sm:text-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button 
            onClick={() => navigate('/login')} 
            className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-poppins font-bold text-base sm:text-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center gap-2">
        {user && (
          <span className="text-indigo-700 font-poppins text-sm flex items-center gap-1">
            <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" /></svg>
            {user}
            {isAdmin && <span className="ml-1 px-1.5 py-0.5 rounded bg-emerald-700 text-emerald-100 text-xs font-bold">Admin</span>}
          </span>
        )}
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-xl rounded-b-3xl border-t border-indigo-100 mt-2">
          <div className="flex flex-col p-4 space-y-2">
            <NavLinks />
            <div className="pt-4 border-t border-indigo-100">
              {user ? (
                <button
                  className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-poppins font-bold text-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                >
                  Logout
                </button>
              ) : (
                <button 
                  onClick={() => {
                    navigate('/login');
                    closeMobileMenu();
                  }} 
                  className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-poppins font-bold text-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 
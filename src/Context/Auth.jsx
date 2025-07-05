import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Auth = ({ onLogin }) => {
  const location = useLocation();
  const [isSignup, setIsSignup] = useState(location.state?.signup || false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin1234") {
      setError("");
      onLogin("admin", true);
      navigate("/dashboard");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (isSignup) {
      if (!username || !password) {
        setError("Please enter a username and password.");
        return;
      }
      if (users[username]) {
        setError("Username already exists.");
        return;
      }
      users[username] = password;
      localStorage.setItem("users", JSON.stringify(users));
      setError("");
      onLogin(username, false);
      navigate("/dashboard");
    } else {
      if (users[username] && users[username] === password) {
        setError("");
        onLogin(username, false);
        navigate("/dashboard");
      } else {
        setError("Invalid username or password.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-pink-100 to-blue-100 relative overflow-hidden">
      {/* Floating Particles for Auth */}
      <div className="particles-container">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-300 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-200 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-200 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-indigo-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-center gap-3">
                <span className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-400 to-blue-400 shadow-lg">
                  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
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
                <span className="text-3xl font-extrabold font-poppins bg-gradient-to-r from-pink-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent select-none drop-shadow">TaskFlow</span>
              </div>
            </div>
            <h2 className="text-3xl font-poppins font-bold text-indigo-700 mb-2">
              {isSignup ? "Join TaskFlow" : "Welcome Back"}
            </h2>
            <p className="text-indigo-400 font-inter">
              {isSignup ? "Create your account to get started" : "Sign in to continue"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-pink-100 border border-pink-300 rounded-md text-pink-700 text-center font-inter">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-indigo-700 font-poppins text-sm font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full p-4 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-900 placeholder-indigo-300 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all font-inter"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <label className="text-indigo-700 font-poppins text-sm font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-4 pr-12 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-900 placeholder-indigo-300 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all font-inter"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-300 hover:text-pink-400 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-pink-400 to-indigo-400 hover:from-pink-500 hover:to-indigo-500 text-white font-poppins font-bold py-4 rounded-md shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-200"
            >
              {isSignup ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center mt-8 pt-6 border-t border-indigo-100">
            <p className="text-indigo-400 font-inter">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button 
                type="button" 
                className="ml-2 bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent font-poppins font-bold transition-colors duration-200 hover:underline hover:from-indigo-600 hover:to-pink-600"
                onClick={() => { setIsSignup(!isSignup); setError(""); }}
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth; 
import React, { useState, useEffect } from "react";
import "./App.css";
import TaskDashborad from "./Context/TaskDashborad";
import Auth from "./Context/Auth";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./Context/LandingPage";
import Navbar from "./Context/Navbar";

const App = () => {
  const [user, setUser] = useState(() => localStorage.getItem("currentUser") || "");
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", user);
      localStorage.setItem("isAdmin", isAdmin);
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isAdmin");
    }
  }, [user, isAdmin]);

  const handleLogin = (username, adminFlag) => {
    setUser(username);
    setIsAdmin(adminFlag);
  };

  const handleLogout = () => {
    setUser("");
    setIsAdmin(false);
  };

  const ScrollToHash = () => {
    const location = useLocation();
    useEffect(() => {
      if (location.hash) {
        const el = document.getElementById(location.hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [location]);
    return null;
  };

  return (
    <Router>
      <ScrollToHash />
      <Navbar user={user} isAdmin={isAdmin} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/login" element={<Auth onLogin={handleLogin} />} />
        <Route path="/dashboard" element={user ? (
          <TaskDashborad username={user} isAdmin={isAdmin} />
        ) : <Auth onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;

import React, { useEffect, useState, useRef } from "react";
import Layout from "./Layout";
import PriorityDropdownPortal from "./PriorityDropdownPortal";

const UserDropdown = ({ userList, selectedUser, setSelectedUser }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 font-poppins text-lg shadow hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" /></svg>
        <span>{selectedUser}</span>
        <svg className="w-5 h-5 text-gray-400 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50 animate-fade-in flex flex-col py-2">
          {userList.map((u) => (
            <button
              key={u}
              className={`flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition text-left text-gray-100 font-poppins ${selectedUser === u ? 'bg-gray-800' : ''}`}
              onClick={() => {
                setSelectedUser(u);
                setOpen(false);
              }}
            >
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" /></svg>
              <span>{u}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Custom slider styles for cross-browser support
const sliderStyles = `
  input[type=range].custom-slider-thumb {
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
  }
  input[type=range].custom-slider-thumb:focus {
    outline: none;
  }
  input[type=range].custom-slider-thumb::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    margin-top: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1 0%, #60a5fa 50%, #ec4899 100%);
    box-shadow: 0 1px 4px rgba(99,102,241,0.15);
    border: 2px solid white;
    transition: background 0.3s;
    cursor: pointer;
    position: relative;
    z-index: 2;
  }
  input[type=range].custom-slider-thumb::-webkit-slider-thumb:hover {
    background: linear-gradient(135deg, #ec4899 0%, #60a5fa 50%, #6366f1 100%);
  }
  input[type=range].custom-slider-thumb::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 8px;
    background: linear-gradient(90deg, #6366f1 0%, #60a5fa 50%, #ec4899 100%);
  }
  input[type=range].custom-slider-thumb::-ms-fill-lower {
    background: transparent;
  }
  input[type=range].custom-slider-thumb::-ms-fill-upper {
    background: transparent;
  }
  input[type=range].custom-slider-thumb::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1 0%, #60a5fa 50%, #ec4899 100%);
    box-shadow: 0 1px 4px rgba(99,102,241,0.15);
    border: 2px solid white;
    transition: background 0.3s;
    cursor: pointer;
    position: relative;
    z-index: 2;
  }
  input[type=range].custom-slider-thumb::-moz-range-thumb:hover {
    background: linear-gradient(135deg, #ec4899 0%, #60a5fa 50%, #6366f1 100%);
  }
  input[type=range].custom-slider-thumb::-moz-range-track {
    height: 8px;
    border-radius: 8px;
    background: linear-gradient(90deg, #6366f1 0%, #60a5fa 50%, #ec4899 100%);
  }
  input[type=range].custom-slider-thumb::-ms-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1 0%, #60a5fa 50%, #ec4899 100%);
    box-shadow: 0 1px 4px rgba(99,102,241,0.15);
    border: 2px solid white;
    transition: background 0.3s;
    cursor: pointer;
    position: relative;
    z-index: 2;
  }
  input[type=range].custom-slider-thumb:focus::-webkit-slider-thumb {
    outline: 2px solid #ec4899;
  }
  input[type=range].custom-slider-thumb:focus::-ms-thumb {
    outline: 2px solid #ec4899;
  }
  input[type=range].custom-slider-thumb:focus::-moz-range-thumb {
    outline: 2px solid #ec4899;
  }
  input[type=range].custom-slider-thumb::-ms-tooltip {
    display: none;
  }
`;

const TaskDashborad = ({ username, isAdmin }) => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [selectedTask, setSelectedTask] = useState(null);
  const [priorityDropdownOpen, setPriorityDropdownOpen] = useState(false);
  const priorityDropdownButtonRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(username);
  const [userList, setUserList] = useState([]);
  const [dropdownCoords, setDropdownCoords] = useState({ left: 0, top: 0 });
  const mainTaskListRef = useRef(null);

  // Always enable dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Load user list for admin
  useEffect(() => {
    if (isAdmin) {
      const users = Object.keys(JSON.parse(localStorage.getItem("users") || "{}"));
      setUserList(users.filter(u => u !== "admin"));
      setSelectedUser(users.filter(u => u !== "admin")[0] || "");
    } else {
      setSelectedUser(username);
    }
  }, [isAdmin, username]);

  // UseEffect For StoredTasks in Local Stroage
  useEffect(() => {
    const storedTasks = localStorage.getItem(`tasks_${selectedUser}`);
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      // Add IDs to tasks that don't have them (for backward compatibility)
      const tasksWithIds = parsedTasks.map(task => 
        task.id ? task : { ...task, id: Date.now() + Math.random() }
      );
      setTasks(tasksWithIds);
    } else {
      setTasks([]);
    }
  }, [selectedUser]);
  useEffect(() => {
    localStorage.setItem(`tasks_${selectedUser}`, JSON.stringify(tasks));
  }, [tasks, selectedUser]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if click is outside both the button and the dropdown
      const isOutsideButton = priorityDropdownButtonRef.current && !priorityDropdownButtonRef.current.contains(event.target);
      const isDropdownClick = event.target.closest('.priority-dropdown');
      
      if (isOutsideButton && !isDropdownClick) {
        setPriorityDropdownOpen(false);
      }
    }
    if (priorityDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [priorityDropdownOpen]);

  // Update dropdown position when opened
  useEffect(() => {
    if (priorityDropdownOpen && priorityDropdownButtonRef.current) {
      const rect = priorityDropdownButtonRef.current.getBoundingClientRect();
      setDropdownCoords({
        left: rect.left,
        top: rect.bottom
      });
    }
  }, [priorityDropdownOpen]);

  useEffect(() => {
    function handleGlobalClick(e) {
      if (
        mainTaskListRef.current &&
        !mainTaskListRef.current.contains(e.target)
      ) {
        setSelectedTask(null);
      }
    }
    document.addEventListener("mousedown", handleGlobalClick);
    return () => document.removeEventListener("mousedown", handleGlobalClick);
  }, []);

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleTaskSubmit = () => {
    if (textInput.trim() === "") {
      return;
    }
    const newTask = {
      id: Date.now() + Math.random(),
      text: textInput,
      priority: selectedPriority,
    };
    setTasks([...tasks, newTask]);
    setTextInput("");
    setSelectedPriority("High");
  };

  const getTasksByPriority = (priority) => {
    return tasks.filter((task) => task.priority === priority && !task.completed);
  };

  const getCompletedTasks = () => {
    return tasks.filter((task) => task.completed);
  };

  const handleEditTask = (editedText, task) => {
    const t = task || selectedTask;
    if (!t) return;
    const updatedTasks = tasks.map((tk) =>
      tk.id === t.id ? { ...tk, text: editedText } : tk
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleChangePriority = (newPriority, task) => {
    const t = task || selectedTask;
    if (!t) return;
    const updatedTasks = tasks.map((tk) =>
      tk.id === t.id ? { ...tk, priority: newPriority } : tk
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskToDelete) => {
    const task = taskToDelete || selectedTask;
    if (!task) return;
    setTasks(tasks.filter((t) => t.id !== task.id));
    setSelectedTask(null);
  };

  const handleCompleteTask = (taskToComplete) => {
    // Mark the task as completed
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskToComplete.id) {
        return { ...task, completed: true };
      }
      return task;
    });
    
    setTasks(updatedTasks);
  };

  const priorities = [
    {
      value: "High",
      label: "High",
      icon: <span className="text-pink-500 text-lg">🔥</span>,
      color: "text-pink-500"
    },
    {
      value: "Medium",
      label: "Medium",
      icon: <span className="text-blue-400 text-lg">⚡</span>,
      color: "text-blue-400"
    },
    {
      value: "Low",
      label: "Low",
      icon: <span className="text-indigo-400 text-lg">🌱</span>,
      color: "text-indigo-400"
    }
  ];

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (!document.getElementById('priority-slider-style')) {
      const style = document.createElement('style');
      style.id = 'priority-slider-style';
      style.innerHTML = sliderStyles;
      document.head.appendChild(style);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-8 overflow-hidden">
      {/* Floating Particles Background */}
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
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-indigo-50 to-blue-100 animate-gradient-move" />
      <div className="w-full max-w-6xl mx-auto z-10 font-inter" ref={mainTaskListRef}>
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold font-poppins bg-gradient-to-r from-indigo-500 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
            Hi {username}, welcome to your dashboard!
          </h1>
        </div>
        {isAdmin && (
          <div className="mb-6 flex items-center gap-4">
            <label className="text-indigo-700 font-poppins text-lg">Manage Tasks for:</label>
            <UserDropdown userList={userList} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
          </div>
        )}
        <div className="lg:flex grid gap-4 items-center font-main bg-white/90 backdrop-blur-sm rounded-md shadow-2xl p-6 mb-8 border border-indigo-100 relative z-0 overflow-visible">
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-80 md:w-90">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-indigo-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <input
                type="text"
                value={textInput}
                onChange={handleTextInputChange}
                className="w-full border-2 border-indigo-200 focus:border-pink-400 rounded-md pl-10 pr-4 py-3 transition-all outline-none text-lg bg-indigo-50 text-indigo-900 placeholder-indigo-300 font-inter focus:bg-white focus:shadow-lg"
                placeholder="What needs to be done?"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/4 flex flex-col items-center justify-center">
            <label className="block text-indigo-700 font-poppins text-sm font-semibold mb-2">Priority</label>
            <div className="w-full flex flex-col items-center relative">
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={['Low','Medium','High'].indexOf(selectedPriority)}
                onChange={e => setSelectedPriority(['Low','Medium','High'][parseInt(e.target.value)])}
                className="w-60 md:w-80 h-3 bg-gradient-to-r from-indigo-200 via-blue-200 to-pink-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pink-200 transition custom-slider-thumb mx-auto"
                aria-label="Priority slider"
                style={{ accentColor: selectedPriority === 'High' ? '#ec4899' : selectedPriority === 'Medium' ? '#60a5fa' : '#6366f1' }}
              />
              <div className="w-60 md:w-80 relative mt-2 h-8 select-none">
                <div className="absolute left-0 top-0 w-full flex justify-between">
                  <span className={`flex flex-col items-center font-poppins font-semibold transition-all duration-200 ${selectedPriority==='Low' ? 'text-indigo-600 scale-110' : 'text-indigo-400 opacity-80'}`}>
                    <span className="text-xl">🌱</span>
                    Low
                  </span>
                  <span className={`flex flex-col items-center font-poppins font-semibold transition-all duration-200 ${selectedPriority==='Medium' ? 'text-blue-600 scale-110' : 'text-blue-400 opacity-80'}`}>
                    <span className="text-xl">⚡</span>
                    Medium
                  </span>
                  <span className={`flex flex-col items-center font-poppins font-semibold transition-all duration-200 ${selectedPriority==='High' ? 'text-pink-600 scale-110' : 'text-pink-500 opacity-80'}`}>
                    <span className="text-xl">🔥</span>
                    High
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/4 flex justify-end">
            <button 
              onClick={handleTaskSubmit} 
              className="bg-gradient-to-r from-pink-400 to-indigo-400 hover:from-pink-500 hover:to-indigo-500 text-white font-poppins font-bold px-6 py-3 rounded-md shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-4 text-indigo-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* High Priority */}
            <Layout
              getTasksByPriority={getTasksByPriority}
              setSelectedTask={setSelectedTask}
              selectedTask={selectedTask}
              handleEditTask={handleEditTask}
              handleChangePriority={handleChangePriority}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
              level="High"
            />
            {/* Medium Priority */}
            <Layout
              getTasksByPriority={getTasksByPriority}
              setSelectedTask={setSelectedTask}
              selectedTask={selectedTask}
              handleEditTask={handleEditTask}
              handleChangePriority={handleChangePriority}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
              level="Medium"
            />
            {/* Low Priority */}
            <Layout
              getTasksByPriority={getTasksByPriority}
              setSelectedTask={setSelectedTask}
              selectedTask={selectedTask}
              handleEditTask={handleEditTask}
              handleChangePriority={handleChangePriority}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
              level="Low"
            />
          </div>
          
          {/* Completed Tasks Section */}
          <div className="mt-8">
            <Layout
              getTasksByPriority={getCompletedTasks}
              setSelectedTask={setSelectedTask}
              selectedTask={selectedTask}
              handleEditTask={handleEditTask}
              handleChangePriority={handleChangePriority}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
              level="Completed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashborad;

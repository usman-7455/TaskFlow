import React, { useState } from "react";

const iconBtn = (
  { onClick, icon, color, ringColor, extraProps }
) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center w-10 h-10 rounded bg-gray-800 text-gray-300 hover:${color} hover:bg-gray-700 transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${ringColor}`}
    tabIndex={0}
    {...extraProps}
  >
    {icon}
  </button>
);

const Action = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const showSuccessMessage = () => {
    const message = document.createElement('div');
    message.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 20px 40px;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
        font-size: 18px;
        z-index: 10000;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        animation: successMessage 2s ease-in-out forwards;
      ">
        Task Completed! 🎉
      </div>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes successMessage {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(message);
    
    // Remove message after animation
    setTimeout(() => {
      document.body.removeChild(message);
      document.head.removeChild(style);
    }, 2000);
  };

  const handleDelete = () => {
    if (!props.selectedTask) {
      return;
    }
    
    setIsDeleting(true);
    
    // Show success message
    showSuccessMessage();
    
    // Mark the task as completed
    props.handleCompleteTask(props.selectedTask);
    setIsDeleting(false);
  };

  return (
    <div className="flex gap-2">
      {iconBtn({
        onClick: () => {
          const edited = prompt("Edit task:", props.selectedTask.text);
          if (edited !== null && edited.trim() !== "") props.handleEditTask(edited);
        },
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0V21h8" /></svg>
        ),
        color: "text-blue-400",
        ringColor: "blue-500"
      })}
      {iconBtn({
        onClick: () => {
          console.log("Change priority clicked for task:", props.selectedTask.text);
          const newPriority = prompt("Enter new priority (High/Medium/Low):", props.selectedTask.priority);
          if (newPriority && ["High", "Medium", "Low"].includes(newPriority)) {
            props.handleChangePriority(newPriority);
          }
        },
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2zm3 4h4m-2 0v4" /></svg>
        ),
        color: "text-yellow-400",
        ringColor: "yellow-500"
      })}
      {iconBtn({
        onClick: handleDelete,
        icon: isDeleting ? (
          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        ),
        color: "text-green-400",
        ringColor: "green-500"
      })}
    </div>
  );
};

export default Action;

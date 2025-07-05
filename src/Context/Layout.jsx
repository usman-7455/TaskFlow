import React from "react";
import Action from "./Action";

function getPriorityStyles(level, dark) {
  // Use a white gradient for all cards, regardless of priority or dark mode
  return {
    card: "bg-gradient-to-br from-white via-indigo-50 to-pink-50 border-indigo-100",
    header: dark
      ? "text-indigo-300"
      : "text-indigo-700",
    accent: dark
      ? "bg-indigo-500"
      : "bg-indigo-500"
  };
}

function Layout(props) {
  const isDark = document.documentElement.classList.contains('dark');
  const styles = getPriorityStyles(props.level, isDark);
  return (
    <div className={`rounded-md shadow-lg border-2 p-5 min-h-[350px] flex flex-col ${styles.card} dark:${styles.card}`}> 
      <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${styles.header} dark:${styles.header} font-poppins`}>
        <span className={`w-3 h-3 rounded-full ${styles.accent}`}></span>
        {props.level} Priority
      </h2>
      <div className="flex-1">
        {props.getTasksByPriority(props.level).length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 text-gray-400 dark:text-gray-500">
            <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="font-poppins text-sm font-medium">No tasks yet</p>
            <p className="text-xs opacity-70 mt-1">Add a task to get started</p>
          </div>
        )}
        {props.getTasksByPriority(props.level).map((task, index) => (
          <div
            key={index}
            data-task-id={task.id}
            className={`task-animate group cursor-pointer px-4 py-3 rounded-xl font-semibold flex items-center justify-between shadow border border-indigo-100 mb-3 bg-white/40 backdrop-blur-lg relative z-20 transition-transform duration-300 ${
              props.level === 'High' ? 'hover:text-pink-500' : props.level === 'Medium' ? 'hover:text-blue-500' : props.level === 'Low' ? 'hover:text-indigo-500' : ''
            } ${task.completed || props.level === "Completed" ? 'opacity-60' : ''}`}
          >
            <span
              className={`inline-block transition-transform duration-300 group-hover:scale-105 ${
                props.level === 'High' ? 'group-hover:text-pink-500' : props.level === 'Medium' ? 'group-hover:text-blue-500' : props.level === 'Low' ? 'group-hover:text-indigo-500' : ''
              }`}
              onClick={() => props.setSelectedTask(task)}
            >
              {task.text}
            </span>
            {props.level === "Completed" ? (
              <button
                onClick={() => props.handleDeleteTask(task)}
                className="ml-2 p-2 rounded bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white transition"
                title="Delete permanently"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : (
              props.selectedTask && props.selectedTask.id === task.id && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2 z-50">
                  <Action
                    priority={props.level}
                    handleEditTask={props.handleEditTask}
                    handleChangePriority={props.handleChangePriority}
                    handleDeleteTask={props.handleDeleteTask}
                    handleCompleteTask={props.handleCompleteTask}
                    selectedTask={task}
                  />
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Layout;

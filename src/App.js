import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // The To-Do List function to load and save tasks from local storage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");

  // Svae tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // The function to add a new task (when the button is clicked)
  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  // Function to cross off a task when completed (when the checkbox is clicked)
  const toggleTaskCompletion = (index) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to remove all completed tasks (when the button is clicked all crossed off tasks are removed)
  const handleRemoveCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  // The main return function that displays the To-Do List app
  return (
    <div className="App">
      <div className="container">
        <div className="title">
          <h1>To-Do List</h1>
        </div>

        {/* Add task structure */}
        <div className="inputTask">
          <input type="text" className="addTask" placeholder="Enter a new task" value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddTask()} />
          <button className="addButton" onClick={handleAddTask}>
            Legg til
          </button>
        </div>

        {/* Task list structure */}
        <ul>
          {tasks.map((task, i) => (
            <li key={i} className={task.completed ? "completed" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(i)}
                />
                <span>{task.text}</span>
              </label>
            </li>
          ))}
        </ul>

        {/* Remove completed tasks button */}
        <button className="removeButton" onClick={handleRemoveCompleted}>
          Fjern fullførte oppgaver
        </button>
      </div>
    </div>
  );
}

export default App;

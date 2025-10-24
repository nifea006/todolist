import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load saved tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  // Toggle completed state
  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Remove completed tasks
  const handleRemoveCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="title">
          <h1>To-Do List</h1>
        </div>

        <div className="inputTask">
          <input type="text" name="task" className="addTask" placeholder="Enter a new task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
          <button type="button" className="addButton" onClick={handleAddTask}>
            Legg til
          </button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? "completed" : ""}>
              <label>
                <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(index)} />
                <span>{task.text}</span>
              </label>
            </li>
          ))}
        </ul>

        <button type="button" className="removeButton" onClick={handleRemoveCompleted}>
          Fjern fullførte oppgaver
        </button>
      </div>
    </div>
  );
}

export default App;

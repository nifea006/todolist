import { useState, useEffect } from "react";
import "./App.css";
import TodoAdd from "./components/todo_add/TodoAdd";
import TodoList from "./components/todo_list/TodoList";
import TodoRemove from "./components/todo_remove/TodoRemove";

function App() {
  // The To-Do List function to load and save tasks from local storage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");

  // Save tasks to local storage whenever they change
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
        <TodoAdd newTask={newTask} setNewTask={setNewTask} handleAddTask={handleAddTask} />

        {/* Task list structure */}
        <TodoList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} />

        {/* Remove completed tasks button */}
        <TodoRemove handleRemoveCompleted={handleRemoveCompleted} />
      </div>
    </div>
  );
}

export default App;

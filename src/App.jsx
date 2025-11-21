// Start app with: npm start
import React, { useState, useEffect } from "react";
import "./App.css";
import NavigationBar from "./components/navigation/NavigationBar/NavigationBar";
import Container from "./components/layout/Container/Container";
import Title from "./components/layout/Title/Title";
import TodoList from "./components/todo/TodoList/TodoList";

const API_URL = "http://localhost:3001";

function App() {
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all lists on mount
  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const res = await fetch(`${API_URL}/lists`);
      const data = await res.json();

      setLists(data);
      if (data.length > 0) {
        setSelectedListId((prev) => prev || data[0].id);
      } else {
        setSelectedListId(null);
      }
    } catch (err) {
      console.error("fetchLists error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async (listId) => {
    if (!listId) return;
    try {
      const res = await fetch(`${API_URL}/lists/${listId}/tasks`);
      const tasks = await res.json();
      setLists((prev) => prev.map((l) => (l.id === listId ? { ...l, tasks } : l)));
    } catch (err) {
      console.error("fetchTasks error:", err);
    }
  };

  // Create list
  const createList = async (name = "New List") => {
    try {
      const res = await fetch(`${API_URL}/lists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const newList = await res.json();
      setLists((prev) => [...prev, { ...newList, tasks: [] }]);
      setSelectedListId(newList.id);
    } catch (err) {
      console.error("createList error:", err);
    }
  };

  // Remove list
  const removeList = async (id) => {
    try {
      await fetch(`${API_URL}/lists/${id}`, { method: "DELETE" });
      setLists((prev) => prev.filter((l) => l.id !== id));
      if (selectedListId === id) {
        const remaining = lists.filter((l) => l.id !== id);
        setSelectedListId(remaining[0]?.id ?? null);
      }
    } catch (err) {
      console.error("removeList error:", err);
    }
  };

  // Rename list
  const renameList = async (id, newName) => {
    if (!id) return;
    try {
      await fetch(`${API_URL}/lists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      setLists((prev) => prev.map((l) => (l.id === id ? { ...l, name: newName } : l)));
    } catch (err) {
      console.error("renameList error:", err);
    }
  };

  // Select list and fetch its tasks
  const selectList = (id) => {
    setSelectedListId(id);
    fetchTasks(id);
  };

  // Add task to selected list
  const addTask = async (text) => {
    if (!text?.trim() || !selectedListId) return;
    try {
      const res = await fetch(`${API_URL}/lists/${selectedListId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const task = await res.json()
      setLists((prev) =>
        prev.map((l) => (l.id === selectedListId ? { ...l, tasks: [...(l.tasks || []), task] } : l))
      );
      setNewTask("");
    } catch (err) {
      console.error("addTask error:", err);
    }
  };

  // Toggle task completion
  const toggleTask = async (taskId) => {
    if (!selectedListId) return;
    const list = lists.find((l) => l.id === selectedListId);
    if (!list) return;
    const task = (list.tasks || []).find((t) => t.id === taskId);
    if (!task) return;
    try {
      await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      setLists((prev) =>
        prev.map((l) =>
          l.id === selectedListId ? { ...l, tasks: l.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)) } : l
        )
      );
    } catch (err) {
      console.error("toggleTask error:", err);
    }
  };

  // Remove a single task
  const removeTask = async (taskId) => {
    try {
      await fetch(`${API_URL}/tasks/${taskId}`, { method: "DELETE" });
      setLists((prev) =>
        prev.map((l) => (l.id === selectedListId ? { ...l, tasks: l.tasks.filter((t) => t.id !== taskId) } : l))
      );
    } catch (err) {
      console.error("removeTask error:", err);
    }
  };

  // Remove completed tasks from selected list
  const removeCompleted = async (listId = selectedListId) => {
    if (!listId) return;
    try {
      await fetch(`${API_URL}/lists/${listId}/tasks/completed`, { method: "DELETE" });
      setLists((prev) => prev.map((l) => (l.id === listId ? { ...l, tasks: l.tasks.filter((t) => !t.completed) } : l)));
    } catch (err) {
      console.error("removeCompleted error:", err);
    }
  };

  // Clear all tasks for a list
  const clearAll = async (listId = selectedListId) => {
    if (!listId) return;
    try {
      await fetch(`${API_URL}/lists/${listId}/tasks`, { method: "DELETE" });
      setLists((prev) => prev.map((l) => (l.id === listId ? { ...l, tasks: [] } : l)));
    } catch (err) {
      console.error("clearAll error:", err);
    }
  };

  // Rename task (DB)
  const renameTask = async (taskId, newText) => {
    if (!newText?.trim()) return;
    try {
      await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText }),
      });
      setLists((prev) =>
        prev.map((l) =>
          l.id === selectedListId
            ? { ...l, tasks: l.tasks.map((t) => (t.id === taskId ? { ...t, text: newText } : t)) }
            : l
        )
      );
    } catch (err) {
      console.error("renameTask error:", err);
    }
  };

  const selectedList = lists.find((l) => l.id === selectedListId) || null;

  if (loading) return <div className="loader"></div>;

  return (
    <div className="app">
      <NavigationBar
        lists={lists}
        selectedId={selectedListId}
        onSelect={selectList}
        onCreate={createList}
        onRemove={removeList}
      />
      <Container>
        <Title
          text={selectedList ? selectedList.name : "To-Do List"}
          onRename={(newName) => renameList(selectedListId, newName)}
          selectedList={selectedList}
        />
        <TodoList
          selectedList={selectedList}
          onAddTask={addTask}
          onToggleTask={toggleTask}
          onRemoveTask={removeTask}
          onRenameTask={renameTask}
          onRemoveCompleted={() => removeCompleted(selectedListId)}
          onClearAll={() => clearAll(selectedListId)}
        />
      </Container>
    </div>
  );
}

export default App;
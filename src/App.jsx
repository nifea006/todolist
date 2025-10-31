
import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // Manage multiple lists (tabs) stored as array of { id, title, tasks: [{text,completed}] }
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [newListTitle, setNewListTitle] = useState("");
  const [newTask, setNewTask] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const titleInputRef = useRef(null);

  // Load saved lists from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("todo_lists_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        setLists(parsed);
        if (parsed.length > 0) setSelectedListId(parsed[0].id);
      } else {
        // Optionally initialize with one sample list
        // setLists([{ id: Date.now(), title: "My List", tasks: [] }]);
        // setSelectedListId(Date.now());
      }
    } catch (e) {
      console.error("Failed to load lists:", e);
    }
  }, []);

  // Save lists
  useEffect(() => {
    try {
      localStorage.setItem("todo_lists_v1", JSON.stringify(lists));
    } catch (e) {
      console.error("Failed to save lists:", e);
    }
  }, [lists]);

  // Update document title when selected list changes
  useEffect(() => {
    const selected = lists.find((l) => l.id === selectedListId);
    document.title = selected ? selected.title : "To-Do App";
  }, [selectedListId, lists]);

  // Helpers
  const createList = (title) => {
    const newList = { id: Date.now() + Math.random(), title: title || "New List", tasks: [] };
    setLists((prev) => [...prev, newList]);
    setSelectedListId(newList.id);
    setNewListTitle("");
  };

  const removeList = (id) => {
    const remaining = lists.filter((l) => l.id !== id);
    setLists(remaining);
    if (remaining.length > 0) setSelectedListId(remaining[0].id);
    else setSelectedListId(null);
  };

  const renameSelectedList = (newTitle) => {
    setLists((prev) => prev.map(l => l.id === selectedListId ? { ...l, title: newTitle } : l));
    setEditingTitle(false);
  };

  const addTaskToSelected = () => {
    if (!selectedListId) return;
    if (newTask.trim() === "") return;
    setLists(prev => prev.map(l => {
      if (l.id !== selectedListId) return l;
      return { ...l, tasks: [...l.tasks, { text: newTask.trim(), completed: false }] };
    }));
    setNewTask("");
  };

  const toggleTaskCompletion = (taskIndex) => {
    setLists(prev => prev.map(l => {
      if (l.id !== selectedListId) return l;
      const newTasks = l.tasks.map((t, i) => i === taskIndex ? { ...t, completed: !t.completed } : t);
      return { ...l, tasks: newTasks };
    }));
  };

  const removeCompletedFromSelected = () => {
    setLists(prev => prev.map(l => {
      if (l.id !== selectedListId) return l;
      return { ...l, tasks: l.tasks.filter(t => !t.completed) };
    }));
  };

  // UI helpers
  const selectedList = lists.find((l) => l.id === selectedListId);

  return (
    <div className="App">
      <div className="container">
        <div className="headerRow">
          <div className="tabs">
            {lists.map((l) => (
              <div key={l.id} className={`tab ${l.id === selectedListId ? "active" : ""}`} onClick={() => setSelectedListId(l.id)}>
                <span className="tabTitle">{l.title}</span>
                <button className="smallBtn" onClick={(e) => { e.stopPropagation(); removeList(l.id); }} title="Remove list">✕</button>
              </div>
            ))}
            <div className="addTab">
              <input value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} placeholder="New list title" onKeyDown={(e) => e.key === "Enter" && createList(newListTitle)} />
              <button onClick={() => createList(newListTitle)}>Create</button>
            </div>
          </div>
        </div>

        <div className="titleBar">
          {selectedList ? (
            <div className="titleLeft">
              {!editingTitle ? (
                <>
                  <h1>{selectedList.title}</h1>
                  <button className="iconBtn" title="Edit title" onClick={() => { setEditingTitle(true); setTimeout(() => titleInputRef.current && titleInputRef.current.focus(), 0); }}>✎</button>
                </>
              ) : (
                <input
                  ref={titleInputRef}
                  className="titleEdit"
                  defaultValue={selectedList.title}
                  onBlur={(e) => renameSelectedList(e.target.value || "Untitled")}
                  onKeyDown={(e) => { if (e.key === "Enter") { renameSelectedList(e.target.value || "Untitled"); } }}
                />
              )}
            </div>
          ) : (
            <div className="noSelection">🗒️ No list selected — please create or select a list.</div>
          )}
        </div>

        <div className="inputTask">
          <input
            type="text"
            placeholder={selectedList ? "Enter a new task" : "Create or select a list first"}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTaskToSelected()}
            disabled={!selectedList}
          />
          <button onClick={addTaskToSelected} disabled={!selectedList}>Add</button>
        </div>

        <ul>
          {selectedList && selectedList.tasks.map((task, index) => (
            <li key={index} className={task.completed ? "completed" : ""}>
              <label>
                <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(index)} />
                <span>{task.text}</span>
                <button className="smallBtn removeTaskBtn" onClick={() => {
                  // remove individual task
                  setLists(prev => prev.map(l => {
                    if (l.id !== selectedListId) return l;
                    return { ...l, tasks: l.tasks.filter((_, i) => i !== index) };
                  }));
                }}>🗑️</button>
              </label>
            </li>
          ))}
        </ul>

        <div className="actionsRow">
          <button onClick={removeCompletedFromSelected} disabled={!selectedList}>Remove completed tasks</button>
          {selectedList && <button onClick={() => { if (confirm("Remove all tasks from this list?")) setLists(prev => prev.map(l => l.id === selectedListId ? { ...l, tasks: [] } : l)); }} disabled={!selectedList}>Clear all</button>}
        </div>
      </div>
    </div>
  );
}

export default App;

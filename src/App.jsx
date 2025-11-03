import { useState, useEffect } from "react";
import Container from "./components/layout/Container/Container";
import Title from "./components/layout/Title/Title";
import NavigationBar from "./components/navigation/NavigationBar/NavigationBar";
import TodoList from "./components/todo/TodoList/TodoList";
import "./App.css";

function App() {
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("todo_lists_v1");
    if (raw) {
      const parsed = JSON.parse(raw);
      setLists(parsed);
      if (parsed.length) setSelectedListId(parsed[0].id);
    }
  }, []);

  useEffect(() => localStorage.setItem("todo_lists_v1", JSON.stringify(lists)), [lists]);

  const selectedList = lists.find(l => l.id === selectedListId);

  const createList = (title) => {
    const newList = { id: Date.now() + Math.random(), title, tasks: [] };
    setLists(prev => [...prev, newList]);
    setSelectedListId(newList.id);
  };

  const removeList = (id) => {
    const remaining = lists.filter(l => l.id !== id);
    setLists(remaining);
    setSelectedListId(remaining[0]?.id || null);
  };

  const renameSelectedList = (title) => {
    setLists(prev => prev.map(l => l.id === selectedListId ? { ...l, title } : l));
  };

  const addTaskToSelected = () => {
    if (!selectedList || newTask.trim() === "") return;
    setLists(prev => prev.map(l => l.id === selectedListId ? { ...l, tasks: [...l.tasks, { text: newTask, completed: false }] } : l));
    setNewTask("");
  };

  const toggleTaskCompletion = (index) => {
    setLists(prev => prev.map(l => {
      if (l.id !== selectedListId) return l;
      const tasks = l.tasks.map((t, i) => i === index ? { ...t, completed: !t.completed } : t);
      return { ...l, tasks };
    }));
  };

  const removeTask = (index) => {
    setLists(prev => prev.map(l => l.id === selectedListId ? { ...l, tasks: l.tasks.filter((_, i) => i !== index) } : l));
  };

  const removeCompleted = () => {
    setLists(prev => prev.map(l => l.id === selectedListId ? { ...l, tasks: l.tasks.filter(t => !t.completed) } : l));
  };

  return (
    <div className="App">

      <NavigationBar
        lists={lists}
        selectedId={selectedListId}
        onSelect={setSelectedListId}
        onRemove={removeList}
        onAdd={createList}
      />
      <Container>
        {selectedList ? (
          <>
            <Title title={selectedList.title} onRename={renameSelectedList} />

            <div className="inputTask">
              <input
                type="text"
                value={newTask}
                placeholder="Enter a new task"
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTaskToSelected()}
              />
              <button onClick={addTaskToSelected}>Add</button>
            </div>

            <TodoList tasks={selectedList.tasks} onToggle={toggleTaskCompletion} onRemove={removeTask} />

            <div className="actionsRow">
              <button onClick={removeCompleted}>Remove completed tasks</button>
              <button onClick={() => setLists(prev => prev.map(l => l.id === selectedListId ? { ...l, tasks: [] } : l))}>
                Clear all
              </button>
            </div>
          </>
        ) : (
          <div className="noSelection">🗒️ No list selected — please create or select a list.</div>
        )}
      </Container>
    </div>
  );
}

export default App;
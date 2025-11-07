import React, { useEffect, useRef, useState } from "react";
import Container from "./components/layout/Container/Container";
import Title from "./components/layout/Title/Title";
import NavigationBar from "./components/navigation/NavigationBar/NavigationBar";
import TodoList from "./components/todo/TodoList/TodoList";
import "./App.css";

function App() {
  // Load from localStorage
  const initLists = () => {
    const raw = localStorage.getItem("todo_lists_v1");
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed
    }
    else {
      return []
    }
  }
  const [lists, setLists] = useState(initLists());
  const [selectedListId, setSelectedListId] = useState(null);

  const isInitialized = useRef(false);


  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('todo_lists_v1', JSON.stringify(lists))
  }, [lists])

  const createList = (title = "New List") => {
    const newList = { id: Date.now() + Math.floor(Math.random()), title, tasks: [] };
    setLists((prev) => [...prev, newList]);
    setSelectedListId(newList.id);
  };

  const removeList = (id) => {
    setLists((prev) => prev.filter((l) => l.id !== id));
    setSelectedListId((prevId) => {
      if (prevId === id) {
        const remaining = lists.filter((l) => l.id !== id);
        return remaining.length > 0 ? remaining[0].id : null;
      }
      return prevId;
    });
  };

  const renameList = (id, newTitle) => {
    setLists((prev) => prev.map((l) => (l.id === id ? { ...l, title: newTitle } : l)));
  };

  const selectList = (id) => {
    setSelectedListId(id);
  };

  const addTask = (listId, text) => {
    if (!text || !text.trim()) return;
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId ? { ...l, tasks: [...l.tasks, { text: text.trim(), completed: false }] } : l
      )
    );
  };

  const toggleTask = (listId, taskIndex) => {
    setLists((prev) =>
      prev.map((l) => {
        if (l.id !== listId) return l;
        const tasks = l.tasks.map((t, i) => (i === taskIndex ? { ...t, completed: !t.completed } : t));
        return { ...l, tasks };
      })
    );
  };

  const removeTask = (listId, taskIndex) => {
    setLists((prev) =>
      prev.map((l) => (l.id === listId ? { ...l, tasks: l.tasks.filter((_, i) => i !== taskIndex) } : l))
    );
  };

  const removeCompleted = (listId) => {
    setLists((prev) => prev.map((l) => (l.id === listId ? { ...l, tasks: l.tasks.filter((t) => !t.completed) } : l)));
  };

  const clearAll = (listId) => {
    setLists((prev) => prev.map((l) => (l.id === listId ? { ...l, tasks: [] } : l)));
  };

  // find selected list object
  const selectedList = lists.find((l) => l.id === selectedListId) || null;

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

        <div className="titleBar">
          <Title
            selectedList={selectedList}
            onRename={(newTitle) => selectedList && renameList(selectedList.id, newTitle)}
          />
        </div>

        <TodoList
          selectedList={selectedList}
          onAddTask={(text) => selectedList && addTask(selectedList.id, text)}
          onToggleTask={(index) => selectedList && toggleTask(selectedList.id, index)}
          onRemoveTask={(index) => selectedList && removeTask(selectedList.id, index)}
          onRemoveCompleted={() => selectedList && removeCompleted(selectedList.id)}
          onClearAll={() => selectedList && clearAll(selectedList.id)}
        />
      </Container>
    </div>
  );
}

export default App;
import React, { useState } from "react";
import styles from "./TodoItem.module.css";

const TodoItem = ({ task, onToggle, onRemove, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleRename = () => {
    if (editText.trim() && editText !== task.text) {
      onRename(editText.trim());
    }
    setIsEditing(false);
    setEditText(task.text);
  };

  return (
    <label className={styles.label}>
      <input type="checkbox" checked={task.completed} onChange={onToggle} />
      {isEditing ? (
        <input
          type="text"
          className={styles.editInput}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleRename();
            if (e.key === "Escape") {
              setIsEditing(false);
              setEditText(task.text);
            }
          }}
          autoFocus
          onClick={(e) => e.stopPropagation()}/>
      ) : (
        <span className={styles.text}>{task.text}</span>
      )}
      <button className={styles.editButton} onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>✎</button>
      <button className={styles.buttonRemoveTask} onClick={(e) => { e.stopPropagation(); onRemove(); }}>🗑️</button>
    </label>
  );
};

export default TodoItem;
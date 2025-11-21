import React from "react";
import styles from "./TodoItem.module.css";

const TodoItem = ({ task, onToggle, onRemove }) => {
  return (
    <label className={styles.label}>
      <input type="checkbox" checked={task.completed} onChange={onToggle} />
      <span className={styles.text}>{task.text}</span>
      <button className={styles.buttonRemoveTask} onClick={(e) => { e.stopPropagation(); onRemove(); }}>🗑️</button>
    </label>
  );
};

export default TodoItem;
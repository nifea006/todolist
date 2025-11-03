import React from "react";
import styles from "./TodoItem.module.css";

const TodoItem = ({ task, onToggle, onRemove }) => {
  return (
    <li className={task.completed ? styles.completed : ""}>
      <label>
        <input type="checkbox" checked={task.completed} onChange={onToggle} />
        <span>{task.text}</span>
        <button className={styles.removeBtn} onClick={onRemove}>🗑️</button>
      </label>
    </li>
  );
};

export default TodoItem;
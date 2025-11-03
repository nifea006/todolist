import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";

const TodoList = ({ tasks, onToggle, onRemove }) => {
  return (
    <ul className={styles.todoList}>
      {tasks.map((task, index) => (
        <TodoItem
          key={index}
          task={task}
          onToggle={() => onToggle(index)}
          onRemove={() => onRemove(index)}
        />
      ))}
    </ul>
  );
};

export default TodoList;
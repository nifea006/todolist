import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";

const TodoList = ({ tasks, toggleTaskCompletion }) => {
  return (
    <ul className={styles.todoList}>
      {tasks.map((task, i) => (
        <TodoItem
          key={i}
          taskCompleted={task.completed}
          taskText={task.text}
          toggleTaskCompletion={() => toggleTaskCompletion(i)}
        />
      ))}
    </ul>
  );
};

export default TodoList;
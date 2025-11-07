import React from "react";
import TodoAdd from "../TodoAdd/TodoAdd";
import TodoItem from "../TodoItem/TodoItem";
import TodoCompleted from "../TodoCompleted/TodoCompleted";
import TodoRemove from "../TodoRemove/TodoRemove";
import styles from "./TodoList.module.css";

const TodoList = ({ selectedList, onAddTask, onToggleTask, onRemoveTask, onRemoveCompleted, onClearAll }) => {
  return (
    <div className={styles.todoWrap}>
      <div className={styles.inputTask}>
        <TodoAdd disabled={!selectedList} onAdd={(text) => onAddTask(text)} />
      </div>

      <ul className={styles.ul}>
        {selectedList
          ? selectedList.tasks.map((task, i) => (
            <li key={i} className={`${styles.li} ${task.completed ? styles.completed : ""}`}>
              <TodoItem
                task={task}
                onToggle={() => onToggleTask(i)}
                onRemove={() => onRemoveTask(i)}
              />
            </li>
          ))
          : <div className={styles.noSelectionInner}>Create or select a list to show tasks.</div>}
      </ul>

      <div className={styles.actionsRow}>
        <TodoCompleted disabled={!selectedList} onRemoveCompleted={onRemoveCompleted} />
        <TodoRemove disabled={!selectedList} onClearAll={onClearAll} />
      </div>
    </div>
  );
};

export default TodoList;
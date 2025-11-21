import React from "react";
import TodoAdd from "../TodoAdd/TodoAdd";
import TodoItem from "../TodoItem/TodoItem";
import TodoCompleted from "../TodoCompleted/TodoCompleted";
import TodoRemove from "../TodoRemove/TodoRemove";
import styles from "./TodoList.module.css";

const TodoList = ({ selectedList, onAddTask, onToggleTask, onRemoveTask, onRenameTask, onRemoveCompleted, onClearAll }) => {
  return (
    <div className={styles.todoWrap}>
      <div className={styles.inputTask}>
        <TodoAdd disabled={!selectedList} onAdd={(text) => onAddTask(text)} />
      </div>

      <ul className={styles.ul}>
          {selectedList?.tasks
            ? selectedList.tasks.map((task) => (
              <li key={task.id} className={`${styles.li} ${task.completed ? styles.completed : ""}`}>
                <TodoItem
                  task={task}
                  onToggle={() => onToggleTask(task.id)}
                  onRemove={() => onRemoveTask(task.id)}
                  onRename={(newText) => onRenameTask(task.id, newText)}
                />
              </li>
            ))
        : <div className={styles.noSelectionInner}>Create or select a list to show tasks.</div>}
      </ul>

      <div className={styles.actionsRow}>
        <TodoCompleted disabled={!selectedList?.tasks?.length} onRemoveCompleted={onRemoveCompleted} />
        <TodoRemove disabled={!selectedList?.tasks?.length} onClearAll={onClearAll} />
      </div>
    </div>
  );
};

export default TodoList;
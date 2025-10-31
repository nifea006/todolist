import React from "react";
import TodoCompleted from "../TodoCompleted/TodoCompleted";
import styles from "./TodoItem.module.css";

const TodoItem = ({ taskCompleted, taskText, toggleTaskCompletion }) => {
    return (
        <li className={taskCompleted ? styles.completed : ""}>
            <label>
                <TodoCompleted
                    taskCompleted={taskCompleted}
                    toggleTaskCompletion={toggleTaskCompletion}
                />
                <span>{taskText}</span>
            </label>
        </li>
    );
};

export default TodoItem;
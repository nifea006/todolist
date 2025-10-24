import React from "react";
import TodoComplited from "../todo_complited/TodoComplited";
import styles from "./TodoItem.module.css";

const TodoItem = ({ taskCompleted, taskText, toggleTaskCompletion }) => {
    return (
        <li className={taskCompleted ? styles.completed : ""}>
            <label>
                <TodoComplited taskCompleted={taskCompleted} toggleTaskCompletion={toggleTaskCompletion} />
                <span>{taskText}</span>
            </label>
        </li>
    );
};

export default TodoItem;
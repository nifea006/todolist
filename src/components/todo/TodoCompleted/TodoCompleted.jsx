import React from "react";
import styles from "./TodoCompleted.module.css";

const TodoCompleted = ({ taskCompleted, toggleTaskCompletion }) => {
    return (
        <input 
            type="checkbox" 
            className={styles.checkbox}
            checked={taskCompleted} 
            onChange={toggleTaskCompletion} 
        />
    );
};

export default TodoCompleted;
import React from "react";
import styles from "./TodoCompleted.module.css";

const TodoCompleted = ({ disabled, onRemoveCompleted }) => {
    return (
        <button className={styles.btn} onClick={onRemoveCompleted} disabled={disabled}>
            Remove completed tasks
        </button>
    );
};

export default TodoCompleted;
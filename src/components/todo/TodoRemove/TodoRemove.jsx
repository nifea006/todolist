import React from "react";
import styles from "./TodoRemove.module.css";

const TodoRemove = ({ disabled, onClearAll }) => {
    return (
        <button className={styles.btn} onClick={onClearAll} disabled={disabled}>
            Clear all
        </button>
    );
};

export default TodoRemove;
import React from "react";
import styles from "./TodoRemove.module.css";

const TodoRemove = ({ handleRemoveCompleted }) => {
    return (
        <button className={styles.removeButton} onClick={handleRemoveCompleted}>
            Fjern fullførte oppgaver
        </button>
    );
};

export default TodoRemove;
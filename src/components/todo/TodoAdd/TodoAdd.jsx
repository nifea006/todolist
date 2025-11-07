import React, { useState } from "react";
import styles from "./TodoAdd.module.css";

const TodoAdd = ({ disabled, onAdd }) => {
    const [value, setValue] = useState("");

    const add = () => {
        if (!value.trim()) return;
        onAdd(value.trim());
        setValue("");
    };

    return (
        <>
            <input
                className={styles.input}
                placeholder={disabled ? "Create or select a list first" : "Enter a new task"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && add()}
                disabled={disabled}
            />
            <button className={styles.btn} onClick={add} disabled={disabled}>Add</button>
        </>
    );
};

export default TodoAdd;
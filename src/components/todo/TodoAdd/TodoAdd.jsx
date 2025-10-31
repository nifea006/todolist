import React from "react";
import styles from "./TodoAdd.module.css";

const TodoAdd = ({ newTask, setNewTask, handleAddTask }) => {
    return (
        <div className="addTaskOverlay hidden">
            <input
                type="text"
                name="insertNewTask"
                placeholder="Enter a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            />
            <button className={styles.addButton} onClick={handleAddTask}>
                Legg til
            </button>
        </div>
    );
};

export default TodoAdd;
import React from "react";

const TodoComplited = ({ taskCompleted, toggleTaskCompletion }) => {
    return (
        <>
            <input type="checkbox" checked={taskCompleted} onChange={toggleTaskCompletion} />
        </>
    );
};

export default TodoComplited;
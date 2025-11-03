import React, { useState } from "react";
import styles from "./AddTabButton.module.css";

const AddTabButton = ({ onAdd }) => {
  const [newTitle, setNewTitle] = useState("");

  const handleAdd = () => {
    if (newTitle.trim() === "") return;
    onAdd(newTitle);
    setNewTitle("");
  };

  return (
    <div className={styles.addTab}>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New list title"
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Create</button>
    </div>
  );
};

export default AddTabButton;
import React, { useState } from "react";
import styles from "./AddTabButton.module.css";

const AddTabButton = ({ onCreate }) => {
  const [value, setValue] = useState("");

  const create = () => {
    const title = (value && value.trim()) || "New List";
    onCreate(title);
    setValue("");
  };

  return (
    <div className={styles.addTab}>
      <input className={styles.input} placeholder="New list title" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && create()} />
      <button className={styles.btn} onClick={create}>Create</button>
    </div>
  );
};

export default AddTabButton;
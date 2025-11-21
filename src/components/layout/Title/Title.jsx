import React, { useRef, useState, useEffect } from "react";
import styles from "./Title.module.css";

const Title = ({ selectedList, onRename }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (selectedList) setValue(selectedList.name);
    else setValue("");
    setEditing(false);
  }, [selectedList]);

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  const finish = () => {
    const newTitle = (value && value.trim()) || "Untitled";
    if (selectedList && typeof onRename === "function") onRename(newTitle);
    setEditing(false);
  };

  if (!selectedList) {
    return <div className={styles.noSelection}>🗒️ No list selected — please create or select a list.</div>;
  }

  return (
    <div className={styles.titleContainer}>
      {!editing ? (
        <>
          <h1 className={styles.title}>{selectedList.name}</h1>
          <button className={styles.editButton} aria-label="Edit title" onClick={() => setEditing(true)}>✎</button>
        </>
      ) : (
        <input
          ref={inputRef}
          className={styles.titleEdit}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={finish}
          onKeyDown={(e) => e.key === "Enter" && finish()}
        />
      )}
    </div>
  );
};

export default Title;
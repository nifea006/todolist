import React, { useRef, useState, useEffect } from "react";
import styles from "./Title.module.css";

const Title = ({ title, onRename }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleBlur = (e) => {
    onRename(e.target.value || "Untitled");
    setEditing(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleBlur(e);
  };

  return (
    <div className={styles.titleBar}>
      {!editing ? (
        <>
          <h1>{title}</h1>
          <button className={styles.iconBtn} onClick={() => setEditing(true)}>✎</button>
        </>
      ) : (
        <input
          ref={inputRef}
          defaultValue={title}
          onBlur={handleBlur}
          onKeyDown={handleKey}
          className={styles.titleEdit}
        />
      )}
    </div>
  );
};

export default Title;
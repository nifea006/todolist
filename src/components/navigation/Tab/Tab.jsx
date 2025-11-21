import React from "react";
import styles from "./Tab.module.css";

const Tab = ({ list, active, onSelect, onRemove }) => {
  return (
    <div className={`${styles.tab} ${active ? styles.active : ""}`} onClick={onSelect}>
      <span className={styles.tabTitle}>{list.name}</span>
      <button
        className={styles.removeButton}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        aria-label={`Remove list ${list.name}`}
      >
        ✕
      </button>
    </div>
  );
};

export default Tab;
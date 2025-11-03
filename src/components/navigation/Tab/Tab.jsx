import React from "react";
import styles from "./Tab.module.css";

const Tab = ({ list, active, onSelect, onRemove }) => {
  return (
    <div
      className={`${styles.tab} ${active ? styles.active : ""}`}
      onClick={onSelect}
    >
      <span className={styles.tabTitle}>{list.title}</span>
      <button className={styles.smallBtn} onClick={(e) => { e.stopPropagation(); onRemove(); }}>✕</button>
    </div>
  );
};

export default Tab;
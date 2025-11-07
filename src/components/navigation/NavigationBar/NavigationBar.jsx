import React from "react";
import Tab from "../Tab/Tab";
import AddTabButton from "../AddTabButton/AddTabButton";
import styles from "./NavigationBar.module.css";

const NavigationBar = ({ lists = [], selectedId, onSelect, onCreate, onRemove }) => {
  return (
    <div className={styles.navbar}>
        {lists.map((l) => (
          <Tab key={l.id} list={l} active={l.id === selectedId} onSelect={() => onSelect(l.id)} onRemove={() => onRemove(l.id)} />
        ))}
        <AddTabButton onCreate={(title) => onCreate(title)} />
    </div>
  );
};

export default NavigationBar;
import React from "react";
import Tab from "../Tab/Tab";
import AddTabButton from "../AddTabButton/AddTabButton";
import styles from "./NavigationBar.module.css";

const NavigationBar = ({ lists, selectedId, onSelect, onRemove, onAdd }) => {
  return (
    <div className={styles.tabs}>
      {lists.map((list) => (
        <Tab
          key={list.id}
          list={list}
          active={list.id === selectedId}
          onSelect={() => onSelect(list.id)}
          onRemove={() => onRemove(list.id)}
        />
      ))}
      <AddTabButton onAdd={onAdd} />
    </div>
  );
};

export default NavigationBar;
import React from 'react';
import styles from './NavigationBar.module.css';
import Tab from '../Tab/Tab';
import AddTabButton from '../AddTabButton/AddTabButton';

const NavigationBar = ({ tabs, selectedTabId, addTab, removeTab, selectTab, renameTab }) => {
  return (
    <nav className={styles.navigationBar} role="navigation" aria-label="Lists">
      <div className={styles.tabs} role="tablist">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            tab={tab}
            isActive={tab.id === selectedTabId}
            onSelect={selectTab}
            onRemove={removeTab}
            onRename={renameTab}
          />
        ))}
        <AddTabButton onAdd={() => addTab()} />
      </div>
    </nav>
  );
};

export default NavigationBar;
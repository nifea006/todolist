import React from 'react';
import styles from './Tab.module.css';

const Tab = ({ tab, isActive, onSelect, onRemove, onRename }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(tab.id);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      onRemove(tab.id);
    }
  };

  return (
    <div
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
      className={`${styles.tab} ${isActive ? styles.active : ''}`}
      onClick={() => onSelect(tab.id)}
      onKeyDown={handleKeyDown}
    >
      <span
        className={styles.title}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onRename(tab.id, e.currentTarget.textContent || '')}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
      >
        {tab.title}
      </span>
      <button
        className={styles.closeButton}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(tab.id);
        }}
        aria-label={`Close ${tab.title}`}
      >
        ×
      </button>
    </div>
  );
};

export default Tab;
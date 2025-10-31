import React from 'react';
import styles from './AddTabButton.module.css';

const AddTabButton = ({ onAdd }) => {
  return (
    <button 
      className={styles.addButton} 
      onClick={onAdd}
      aria-label="Add new tab"
    >
      +
    </button>
  );
};

export default AddTabButton;
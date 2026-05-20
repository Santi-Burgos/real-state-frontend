import React from 'react';
import styles from './SuccessToast.module.css';

const SuccessToast = ({ 
  title = 'Action Successful', 
  message = 'The operation was completed successfully.', 
  onClose 
}) => {
  return (
    <div className={styles.toastContainer}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <button onClick={onClose} className={styles.closeButton} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.iconContainer}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default SuccessToast;

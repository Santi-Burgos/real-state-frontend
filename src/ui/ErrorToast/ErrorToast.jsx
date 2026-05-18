import React from 'react';
import styles from './ErrorToast.module.css';

const ErrorToast = ({ 
  title = 'Action Failed', 
  message = 'Unable to delete ticket. Please check your permissions or try again later.', 
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--hard-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default ErrorToast;

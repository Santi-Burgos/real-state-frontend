import React from 'react';
import styles from './ViewHeader.module.css';

export const ViewHeader = ({ breadcrumb, title, description, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerLeft}>
        <nav className={styles.breadcrumb}>
          {breadcrumb.split('>').map((item, index, array) => (
            <React.Fragment key={index}>
              <span className={styles.breadcrumbItem}>{item.trim()}</span>
              {index < array.length - 1 && <span className={styles.separator}>&gt;</span>}
            </React.Fragment>
          ))}
        </nav>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.headerRight}>
        {children}
      </div>
    </div>
  );
};

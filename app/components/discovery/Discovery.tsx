import React from 'react';
import Latest from './Latest';
import styles from './Discovery.css';

export default function Discovery() {
  return (
    <div className={styles.discovery__container}>
      <h4>Discovery</h4>
      <Latest />
    </div>
  );
}

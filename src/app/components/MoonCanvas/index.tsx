'use client';

import styles from './MoonCanvas.module.css';

export default function MoonCanvas() {
  return (
    <div className={styles.canvas}>
      <div className={styles.moon}></div>
    </div>
  );
}

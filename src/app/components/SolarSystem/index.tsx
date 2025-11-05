'use client';

import styles from './SolarSystem.module.css';

export default function SolarSystem() {
  return (
    <div className={styles.container}>
      <div className={styles.sun}>
        <div className={styles.earth}></div>
      </div>
    </div>
  );
}

'use client'

import Dashboard from "./dashboard/page";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.main}>
        <Dashboard></Dashboard>
      </div>
      <footer className={styles.footer} />
    </main>
  );
}

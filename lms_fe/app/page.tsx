'use client'

import CustomerPage from "./customer/page";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.main}>
        <CustomerPage></CustomerPage>
      </div>
      <footer className={styles.footer} />
    </main>
  );
}

import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar/Sidebar';
import styles from './layout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.title}>Dashboard</div>
          <div className={styles.actions}>
            <button className={styles.notifBtn}>🔔</button>
          </div>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}

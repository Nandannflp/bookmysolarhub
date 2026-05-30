'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: '📊' },
  { href: '/dashboard/installation', label: 'Installation Tracker', icon: '🏗️' },
  { href: '/dashboard/subsidy', label: 'Subsidy Tracker', icon: '🏛️' },
  { href: '/dashboard/vault', label: 'Document Vault', icon: '📁' },
  { href: '/dashboard/service', label: 'Service Requests', icon: '🔧' },
  { href: '/dashboard/amc', label: 'AMC Dashboard', icon: '📅' },
  { href: '/dashboard/performance', label: 'Solar Performance', icon: '⚡' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <Link href="/" className={styles.logo}>
          BookMySolar<span className={styles.hub}>Hub</span>
        </Link>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`${styles.link} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.user}>
          <div className={styles.avatar}>RJ</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Rajesh Kumar</div>
            <div className={styles.userRole}>Customer</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

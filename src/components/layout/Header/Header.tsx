import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          BookMySolar<span className={styles.hub}>Hub</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/services" className={styles.link}>Services</Link>
          <Link href="/subsidy" className={styles.link}>Subsidy</Link>
          <Link href="/insurance" className={styles.link}>Insurance</Link>
          <Link href="/about" className={styles.link}>About Us</Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/dashboard" className={styles.loginLink}>Login</Link>
          <Button size="sm">Get Free Estimate</Button>
        </div>
      </div>
    </header>
  );
};

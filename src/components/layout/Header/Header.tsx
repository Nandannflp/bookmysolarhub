'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { Button } from '@/components/ui/Button/Button';
import { ThemeToggle } from '@/components/layout/ThemeToggle/ThemeToggle';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          BookMySolar<span className={styles.hub}>Hub</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="#services" className={styles.navLink}>Services</Link>
          <Link href="#subsidy" className={styles.navLink}>Subsidy Guide</Link>
          <Link href="#testimonials" className={styles.navLink}>Success Stories</Link>
          <Link href="#faq" className={styles.navLink}>FAQ</Link>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <Link href="/dashboard" className={styles.loginLink}>Login</Link>
          <Button variant="primary">Get Free Quote</Button>
        </div>
      </div>
    </header>
  );
};

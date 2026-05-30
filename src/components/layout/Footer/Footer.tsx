import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              BookMySolar<span className={styles.hub}>Hub</span>
            </Link>
            <p className={styles.description}>
              India's Trusted Solar Installation, Service & Subsidy Platform. 
              Powering UP, Bihar, Jharkhand, and Gujarat.
            </p>
          </div>
          
          <div className={styles.linksColumn}>
            <h4 className={styles.heading}>Services</h4>
            <Link href="/services/installation">Solar Installation</Link>
            <Link href="/services/servicing">Solar Servicing</Link>
            <Link href="/services/amc">AMC Plans</Link>
            <Link href="/services/insurance">Insurance Assistance</Link>
          </div>

          <div className={styles.linksColumn}>
            <h4 className={styles.heading}>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/subsidy">Subsidy Guide</Link>
            <Link href="/faq">FAQ</Link>
          </div>

          <div className={styles.linksColumn}>
            <h4 className={styles.heading}>State Coverage</h4>
            <Link href="/state/up">Uttar Pradesh</Link>
            <Link href="/state/bihar">Bihar</Link>
            <Link href="/state/jharkhand">Jharkhand</Link>
            <Link href="/state/gujarat">Gujarat</Link>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} BookMySolarHub. All rights reserved.</p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

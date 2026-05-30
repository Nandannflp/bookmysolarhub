import React from 'react';
import styles from './FloatingWhatsApp.module.css';

export const FloatingWhatsApp = () => {
  return (
    <a 
      href="https://wa.me/919999999999" 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.float}
      aria-label="Chat with us on WhatsApp"
    >
      <span className={styles.icon}>💬</span>
    </a>
  );
};

import React from 'react';
import styles from './FinalCTA.module.css';
import { Button } from '@/components/ui/Button/Button';

export const FinalCTA = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Start Saving With Solar Today</h2>
          <p className={styles.subtitle}>
            Get professional installation, subsidy guidance, servicing support, and long-term peace of mind.
          </p>
          <div className={styles.actions}>
            <Button size="lg">Check Eligibility</Button>
            <Button size="lg" variant="outline" className={styles.outlineBtn}>Book Free Site Survey</Button>
            <Button size="lg" variant="secondary">WhatsApp Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

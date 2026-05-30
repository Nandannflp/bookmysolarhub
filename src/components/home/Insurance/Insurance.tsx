import React from 'react';
import styles from './Insurance.module.css';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';

export const Insurance = () => {
  return (
    <section className={styles.insurance}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Protect Your Solar Investment</h2>
          <p className={styles.subtitle}>
            Your solar system is a long-term asset. BookMySolarHub assists customers with solar protection options and insurance guidance.
          </p>
          
          <div className={styles.coverageGrid}>
            <div className={styles.coverageItem}>
              <span className={styles.check}>✓</span>
              <span>Fire Damage</span>
            </div>
            <div className={styles.coverageItem}>
              <span className={styles.check}>✓</span>
              <span>Storm Damage</span>
            </div>
            <div className={styles.coverageItem}>
              <span className={styles.check}>✓</span>
              <span>Electrical Faults</span>
            </div>
            <div className={styles.coverageItem}>
              <span className={styles.check}>✓</span>
              <span>Natural Disasters</span>
            </div>
            <div className={styles.coverageItem}>
              <span className={styles.check}>✓</span>
              <span>Accidental Damage</span>
            </div>
          </div>
          
          <Button size="lg" className={styles.cta}>Learn About Protection Plans</Button>
        </div>
        
        <div className={styles.visual}>
          <Card className={styles.shieldCard}>
            <div className={styles.shieldIcon}>🛡️</div>
            <h3 className={styles.shieldTitle}>Comprehensive Coverage</h3>
            <p className={styles.shieldDesc}>
              Rest easy knowing your energy independence is secure against unexpected events.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

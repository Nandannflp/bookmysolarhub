import React from 'react';
import styles from './TrustBar.module.css';

export const TrustBar = () => {
  return (
    <section className={styles.trustBar}>
      <div className={styles.container}>
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.icon}>🇮🇳</span>
            <span className={styles.text}>Registered Indian Company</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.icon}>📄</span>
            <span className={styles.text}>Govt. Subsidy Assistance</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.icon}>🤝</span>
            <span className={styles.text}>Approved Vendor Network</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.icon}>📍</span>
            <span className={styles.text}>Pan-State Support</span>
          </div>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>5,000+</div>
            <div className={styles.statLabel}>Families Served</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>15 MW+</div>
            <div className={styles.statLabel}>Solar Installed</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>50+</div>
            <div className={styles.statLabel}>Cities Covered</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>4.9/5</div>
            <div className={styles.statLabel}>Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import styles from './StateCoverage.module.css';

export const StateCoverage = () => {
  return (
    <section className={styles.coverage}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Powering the Heart of India</h2>
          <p className={styles.subtitle}>
            Currently serving homeowners and businesses across multiple cities with expansion planned nationwide.
          </p>
          
          <div className={styles.statesList}>
            <div className={styles.stateItem}>
              <span className={styles.stateIcon}>📍</span>
              <span className={styles.stateName}>Uttar Pradesh</span>
            </div>
            <div className={styles.stateItem}>
              <span className={styles.stateIcon}>📍</span>
              <span className={styles.stateName}>Bihar</span>
            </div>
            <div className={styles.stateItem}>
              <span className={styles.stateIcon}>📍</span>
              <span className={styles.stateName}>Jharkhand</span>
            </div>
            <div className={styles.stateItem}>
              <span className={styles.stateIcon}>📍</span>
              <span className={styles.stateName}>Gujarat</span>
            </div>
          </div>
        </div>
        
        <div className={styles.mapVisual}>
          <div className={styles.mapMockup}>
            {/* Simple CSS representation of an interactive map */}
            <div className={styles.pulseContainer} style={{ top: '40%', left: '45%' }}>
              <div className={styles.pulse}></div>
              <div className={styles.dot}></div>
            </div>
            <div className={styles.pulseContainer} style={{ top: '50%', left: '60%' }}>
              <div className={styles.pulse}></div>
              <div className={styles.dot}></div>
            </div>
            <div className={styles.pulseContainer} style={{ top: '55%', left: '70%' }}>
              <div className={styles.pulse}></div>
              <div className={styles.dot}></div>
            </div>
            <div className={styles.pulseContainer} style={{ top: '60%', left: '20%' }}>
              <div className={styles.pulse}></div>
              <div className={styles.dot}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

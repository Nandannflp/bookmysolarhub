import React from 'react';
import styles from './Servicing.module.css';
import { Card } from '@/components/ui/Card/Card';

const features = [
  { icon: '🧽', title: 'Panel Cleaning', desc: 'Maintain peak efficiency' },
  { icon: '🩺', title: 'Health Checks', desc: 'Comprehensive system diagnostics' },
  { icon: '📊', title: 'Performance Monitoring', desc: 'Real-time output tracking' },
  { icon: '🔌', title: 'Wiring Inspection', desc: 'Safety and connection testing' },
  { icon: '⚡', title: 'Inverter Support', desc: 'Hardware and software updates' },
  { icon: '🔧', title: 'Preventive Maintenance', desc: 'Proactive issue resolution' },
];

export const Servicing = () => {
  return (
    <section className={styles.servicing}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Installation Is Day One. Service Is The Real Test.</h2>
          <p className={styles.subtitle}>
            Protect your investment with our Annual Maintenance Contracts (AMC).
          </p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.grid}>
            {features.map((feat, idx) => (
              <div key={idx} className={styles.featureItem}>
                <div className={styles.icon}>{feat.icon}</div>
                <div>
                  <h4 className={styles.featTitle}>{feat.title}</h4>
                  <p className={styles.featDesc}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.visual}>
            <Card className={styles.dashboardMockup}>
              <div className={styles.mockHeader}>
                <span className={styles.mockDot}></span>
                <span className={styles.mockDot}></span>
                <span className={styles.mockDot}></span>
              </div>
              <div className={styles.mockBody}>
                <div className={styles.mockRow}>
                  <div className={styles.mockStatus}>System Status: <span className={styles.active}>Optimal</span></div>
                  <div className={styles.mockEfficiency}>Efficiency: 98%</div>
                </div>
                <div className={styles.mockChart}>
                  {/* CSS representation of a chart */}
                  <div className={styles.bar} style={{ height: '40%' }}></div>
                  <div className={styles.bar} style={{ height: '60%' }}></div>
                  <div className={styles.bar} style={{ height: '80%' }}></div>
                  <div className={styles.bar} style={{ height: '50%' }}></div>
                  <div className={styles.bar} style={{ height: '90%' }}></div>
                  <div className={styles.bar} style={{ height: '100%' }}></div>
                  <div className={styles.bar} style={{ height: '85%' }}></div>
                </div>
                <div className={styles.mockAlert}>
                  <span className={styles.alertIcon}>ℹ️</span>
                  <span>Next scheduled cleaning in 14 days.</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

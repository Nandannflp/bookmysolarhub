import React from 'react';
import styles from './Comparison.module.css';
import { Card } from '@/components/ui/Card/Card';

export const Comparison = () => {
  return (
    <section className={styles.comparison}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>More Than Installation. A Complete Solar Ecosystem.</h2>
          <p className={styles.subtitle}>
            Why thousands of families and businesses choose BookMySolarHub over traditional dealers.
          </p>
        </div>

        <Card className={styles.tableCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Traditional Dealers</th>
                  <th className={styles.highlightHeader}>BookMySolarHub</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Service Scope</td>
                  <td>Installation only</td>
                  <td className={styles.highlightCell}>End-to-end support</td>
                </tr>
                <tr>
                  <td>Customer Support</td>
                  <td>Limited communication</td>
                  <td className={styles.highlightCell}>Dedicated guidance</td>
                </tr>
                <tr>
                  <td>Maintenance</td>
                  <td>No servicing</td>
                  <td className={styles.highlightCell}>AMC & maintenance</td>
                </tr>
                <tr>
                  <td>Protection</td>
                  <td>No insurance help</td>
                  <td className={styles.highlightCell}>Insurance assistance</td>
                </tr>
                <tr>
                  <td>Vendors</td>
                  <td>Vendor confusion</td>
                  <td className={styles.highlightCell}>Guided vendor network</td>
                </tr>
                <tr>
                  <td>Post-Installation</td>
                  <td>No after-sales support</td>
                  <td className={styles.highlightCell}>Long-term relationship</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
};

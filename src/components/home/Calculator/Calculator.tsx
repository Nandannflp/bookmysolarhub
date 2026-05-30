'use client';

import React, { useState } from 'react';
import styles from './Calculator.module.css';
import { Card } from '@/components/ui/Card/Card';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';

export const Calculator = () => {
  const [bill, setBill] = useState('3000');
  const [state, setState] = useState('Uttar Pradesh');
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculated(true);
  };

  // Mock calculations based on bill
  const numericBill = parseInt(bill) || 0;
  const estimatedSize = Math.max(1, Math.round(numericBill / 1000));
  const estimatedSavings = numericBill * 12 * 0.9;
  const estimatedSubsidy = estimatedSize <= 2 ? estimatedSize * 30000 : 78000;
  const paybackPeriod = 3.5;

  return (
    <section className={styles.calculator}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Solar Savings Calculator</h2>
          <p className={styles.subtitle}>
            Estimate your solar system size, government subsidy, and annual savings in seconds.
          </p>
        </div>

        <div className={styles.grid}>
          <Card className={styles.inputCard}>
            <form onSubmit={handleCalculate} className={styles.form}>
              <Input 
                label="Monthly Electricity Bill (₹)" 
                type="number" 
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholder="E.g. 3000"
              />
              
              <div className={styles.inputGroup}>
                <label className={styles.label}>State</label>
                <select 
                  className={styles.select}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Gujarat">Gujarat</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Roof Type</label>
                <select className={styles.select}>
                  <option value="flat">Flat Roof (Concrete)</option>
                  <option value="slanted">Slanted Roof (Sheet/Tile)</option>
                </select>
              </div>

              <Button type="submit" size="lg" fullWidth style={{ marginTop: '1rem' }}>
                Calculate Now
              </Button>
            </form>
          </Card>

          <Card className={`${styles.resultCard} ${calculated ? styles.showResults : ''}`}>
            {calculated ? (
              <div className={styles.results}>
                <h3 className={styles.resultsTitle}>Your Solar Estimate</h3>
                
                <div className={styles.resultGrid}>
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Estimated System Size</span>
                    <span className={styles.resultValue}>{estimatedSize} kW</span>
                  </div>
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Estimated Annual Savings</span>
                    <span className={styles.resultValue}>₹{estimatedSavings.toLocaleString('en-IN')}</span>
                  </div>
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Estimated Subsidy (PM Surya Ghar)</span>
                    <span className={`${styles.resultValue} ${styles.highlight}`}>₹{estimatedSubsidy.toLocaleString('en-IN')}</span>
                  </div>
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Estimated Payback Period</span>
                    <span className={styles.resultValue}>{paybackPeriod} Years</span>
                  </div>
                </div>

                <Button variant="outline" fullWidth style={{ marginTop: '2rem' }}>
                  Get Detailed Report
                </Button>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📊</span>
                <p>Enter your details and click calculate to see your estimated savings.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

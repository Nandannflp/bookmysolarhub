'use client';

import React from 'react';
import styles from './Hero.module.css';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { Input } from '@/components/ui/Input/Input';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            Power Your Home With <span className="gradient-text">Smart Solar</span>
          </h1>
          <p className={styles.subheadline}>
            Professional solar installation, servicing, insurance support, and subsidy assistance for homeowners and businesses across India.
          </p>
          <div className={styles.actions}>
            <Button size="lg">Check Eligibility</Button>
            <Button size="lg" variant="outline">Book Free Site Survey</Button>
          </div>
          
          <div className={styles.metrics}>
            <div className={styles.metric}>
              <span className={styles.metricValue}>₹50k+</span>
              <span className={styles.metricLabel}>Avg. Annual Savings</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>Up to 78k</span>
              <span className={styles.metricLabel}>Govt. Subsidy</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>25 Yrs</span>
              <span className={styles.metricLabel}>Performance Warranty</span>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <Card glassmorphism className={styles.formCard}>
            <h3 className={styles.formTitle}>Get Your Free Solar Assessment</h3>
            <form className={styles.form}>
              <Input label="Full Name" placeholder="Enter your name" />
              <Input label="Mobile Number" placeholder="+91" />
              <div className={styles.row}>
                <Input label="State" placeholder="E.g., UP" />
                <Input label="City" placeholder="E.g., Lucknow" />
              </div>
              <Input label="Monthly Electricity Bill (₹)" placeholder="E.g., 3000" type="number" />
              <Button fullWidth size="lg" style={{ marginTop: '1rem' }}>
                Calculate Savings
              </Button>
            </form>
          </Card>
          
          {/* Floating UI Elements simulating Apple/Tesla dashboard style */}
          <div className={styles.floatingCard1}>
            <span className={styles.floatIcon}>☀️</span>
            <div>
              <div className={styles.floatTitle}>Energy Production</div>
              <div className={styles.floatValue}>+450 kWh</div>
            </div>
          </div>
          
          <div className={styles.floatingCard2}>
            <span className={styles.floatIcon}>💰</span>
            <div>
              <div className={styles.floatTitle}>Subsidy Approved</div>
              <div className={styles.floatValue}>₹78,000</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

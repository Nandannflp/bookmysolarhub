import React from 'react';
import styles from './Subsidy.module.css';
import { Card } from '@/components/ui/Card/Card';

const steps = [
  {
    number: '01',
    title: 'Register Online',
    requirements: ['Aadhaar', 'Mobile Number', 'Electricity Consumer Details'],
  },
  {
    number: '02',
    title: 'Application Review & Approval',
    requirements: ['Feasibility Assessment', 'Documentation Review', 'Eligibility Verification'],
  },
  {
    number: '03',
    title: 'Installation By Approved Vendor',
    requirements: ['Site Survey', 'System Installation', 'Quality Checks'],
  },
  {
    number: '04',
    title: 'Subsidy To Bank Account',
    requirements: ['Inspection Completion', 'Subsidy Processing', 'Direct Benefit Transfer'],
  }
];

export const Subsidy = () => {
  return (
    <section className={styles.subsidy}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Claim Government Solar Benefits In 4 Simple Steps</h2>
          <p className={styles.subtitle}>
            We guide you through the PM Surya Ghar Yojana subsidy process from start to finish.
          </p>
        </div>

        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <Card className={styles.stepCard}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <ul className={styles.requirementsList}>
                  {step.requirements.map((req, i) => (
                    <li key={i} className={styles.requirement}>
                      <span className={styles.check}>✓</span> {req}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

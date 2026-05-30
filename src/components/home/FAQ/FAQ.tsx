import React from 'react';
import styles from './FAQ.module.css';
import { Accordion } from '@/components/ui/Accordion/Accordion';

const faqItems = [
  {
    title: 'Who is eligible for rooftop solar?',
    content: 'Any homeowner or business with a stable roof and an active electricity connection can install rooftop solar. For the PM Surya Ghar subsidy, residential consumers are eligible.'
  },
  {
    title: 'How much subsidy can I get?',
    content: 'Under PM Surya Ghar Yojana, you can get up to ₹78,000 subsidy for systems up to 3kW and above. For 1kW it is ₹30,000, and for 2kW it is ₹60,000.'
  },
  {
    title: 'What documents are required?',
    content: 'You will need your Aadhaar card, a recent electricity bill, property tax receipt or registry papers, and a cancelled cheque for the subsidy transfer.'
  },
  {
    title: 'How long does installation take?',
    content: 'Once approved, the physical installation typically takes 1-3 days. However, the complete process including net-metering and subsidy approval takes about 3-4 weeks.'
  },
  {
    title: 'Do you provide servicing and AMC plans?',
    content: 'Yes! We offer comprehensive Annual Maintenance Contracts (AMC) that include regular cleaning, performance monitoring, and preventive maintenance.'
  },
  {
    title: 'Which states do you serve?',
    content: 'We currently provide end-to-end solar solutions across Uttar Pradesh (UP), Bihar, Jharkhand, and Gujarat.'
  }
];

export const FAQ = () => {
  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Everything you need to know about switching to solar with BookMySolarHub.
          </p>
        </div>
        
        <div className={styles.accordionWrapper}>
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
};

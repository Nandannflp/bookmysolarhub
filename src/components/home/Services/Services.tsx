import React from 'react';
import styles from './Services.module.css';
import { Card } from '@/components/ui/Card/Card';

const servicesList = [
  {
    icon: '☀️',
    title: 'Rooftop Solar Installation',
    description: 'End-to-end residential and commercial solar solutions tailored to your energy needs.'
  },
  {
    icon: '🔧',
    title: 'Solar Panel Servicing',
    description: 'Professional cleaning, maintenance, repairs, and system inspections.'
  },
  {
    icon: '🛡️',
    title: 'Solar Insurance Assistance',
    description: 'Comprehensive protection guidance and insurance claim support for your solar assets.'
  },
  {
    icon: '🏛️',
    title: 'Government Subsidy Support',
    description: 'Complete assistance with documentation and the PM Surya Ghar subsidy process.'
  },
  {
    icon: '📅',
    title: 'AMC Plans',
    description: 'Long-term maintenance contracts ensuring peak performance year-round.'
  },
  {
    icon: '💡',
    title: 'Solar Consultation',
    description: 'Detailed savings analysis, site assessments, and expert guidance.'
  }
];

export const Services = () => {
  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Complete Solar Solutions</h2>
          <p className={styles.subtitle}>
            From consultation to installation, servicing, insurance support, and subsidy assistance — everything under one roof.
          </p>
        </div>
        
        <div className={styles.grid}>
          {servicesList.map((service, index) => (
            <Card key={index} className={styles.serviceCard}>
              <div className={styles.iconWrapper}>{service.icon}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

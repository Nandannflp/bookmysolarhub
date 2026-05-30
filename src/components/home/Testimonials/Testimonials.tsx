'use client';

import React, { useState } from 'react';
import styles from './Testimonials.module.css';
import { Card } from '@/components/ui/Card/Card';

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Lucknow, UP",
    rating: 5,
    savings: "₹45,000/year",
    quote: "BookMySolarHub made the entire PM Surya Ghar process seamless. They handled everything from the initial survey to the subsidy application. My electricity bill is practically zero now."
  },
  {
    name: "Priya Sharma",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    savings: "₹60,000/year",
    quote: "I was confused by all the local vendors, but this platform provided transparency and guided me to the best option. The dashboard is amazing for tracking my system's daily performance."
  },
  {
    name: "Amit Patel",
    location: "Patna, Bihar",
    rating: 4,
    savings: "₹38,000/year",
    quote: "Highly professional team. The installation was done in 2 days and the quality of the panels is top-notch. Their insurance assistance also gave me peace of mind."
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Trusted By Homeowners</h2>
          <p className={styles.subtitle}>
            See what our customers have to say about their journey to solar independence.
          </p>
        </div>

        <div className={styles.carouselContainer}>
          <button className={styles.navButton} onClick={prev} aria-label="Previous">←</button>
          
          <Card className={styles.testimonialCard}>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < current.rating ? styles.starFilled : styles.starEmpty}>★</span>
              ))}
            </div>
            
            <blockquote className={styles.quote}>
              "{current.quote}"
            </blockquote>
            
            <div className={styles.footer}>
              <div className={styles.author}>
                <div className={styles.avatar}>{current.name.charAt(0)}</div>
                <div>
                  <div className={styles.name}>{current.name}</div>
                  <div className={styles.location}>{current.location}</div>
                </div>
              </div>
              <div className={styles.savings}>
                <span className={styles.savingsLabel}>Savings</span>
                <span className={styles.savingsValue}>{current.savings}</span>
              </div>
            </div>
          </Card>

          <button className={styles.navButton} onClick={next} aria-label="Next">→</button>
        </div>
        
        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button 
              key={i} 
              className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

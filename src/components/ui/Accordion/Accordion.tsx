'use client';

import React, { useState } from 'react';
import styles from './Accordion.module.css';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`${styles.accordion} ${className}`}>
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <div key={index} className={`${styles.item} ${isActive ? styles.active : ''}`}>
            <button
              className={styles.header}
              onClick={() => toggleItem(index)}
              aria-expanded={isActive}
            >
              <span className={styles.title}>{item.title}</span>
              <span className={styles.icon}>
                {isActive ? '−' : '+'}
              </span>
            </button>
            <div
              className={styles.contentWrapper}
              style={{ maxHeight: isActive ? '500px' : '0' }}
            >
              <div className={styles.content}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

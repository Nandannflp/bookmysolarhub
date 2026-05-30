'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className={styles.toggle} aria-label="Toggle theme" disabled><span style={{ width: 20, height: 20 }} /></button>;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={styles.toggle}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className={styles.icon} size={20} />
      ) : (
        <Moon className={styles.icon} size={20} />
      )}
    </button>
  );
}

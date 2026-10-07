import type { CSSProperties } from 'react';
import styles from './sections.module.css';

interface StepsProps {
  steps: { title: string; body: string }[];
}

/** Numbered steps joined by a thin accent line (home "How we work", detail "How it works"). */
export default function Steps({ steps }: StepsProps) {
  return (
    <ol className={styles.steps} style={{ '--steps': steps.length } as CSSProperties}>
      {steps.map((step, i) => (
        <li key={step.title} className={styles.step}>
          <span className={styles.stepNo} aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className={styles.cardTitle}>{step.title}</h3>
          <p className={styles.cardTagline}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

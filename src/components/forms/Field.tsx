import type { ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { mailtoUrl, site } from '../../config/site';
import GlowButton from '../ui/GlowButton';
import Icon from '../ui/Icon';
import styles from './forms.module.css';

/** ARIA wiring for a control: pair with <Field id=…> so errors are announced. */
export function a11y(id: string, error?: string) {
  return {
    id,
    'aria-invalid': error ? (true as const) : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
  };
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  /** Span both columns of the form grid. */
  wide?: boolean;
  children: ReactNode;
}

/** Label + control + inline error. */
export function Field({ id, label, required = false, error, wide = false, children }: FieldProps) {
  return (
    <div className={`${styles.field} ${wide ? styles.wide : ''}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.req} aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface GroupProps {
  id: string;
  legend: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

/** A labelled set of checkboxes. */
export function CheckGroup({ id, legend, required = false, error, children }: GroupProps) {
  return (
    <fieldset className={`${styles.field} ${styles.wide} ${styles.group}`} aria-describedby={error ? `${id}-error` : undefined}>
      <legend className={styles.label}>
        {legend}
        {required && (
          <span className={styles.req} aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </legend>
      {children}
      {error && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function Check({ label, registration, value }: { label: string; registration: UseFormRegisterReturn; value: string }) {
  return (
    <label className={styles.check}>
      <input type="checkbox" value={value} {...registration} />
      <span>{label}</span>
    </label>
  );
}

/**
 * Honeypot: a field real visitors never see or reach. Bots that fill every input
 * give themselves away; the form then pretends to succeed and inserts nothing.
 */
export function Honeypot({ registration }: { registration: UseFormRegisterReturn }) {
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...registration} />
      </label>
    </div>
  );
}

export function FormSuccess({ email }: { email: string }) {
  return (
    <div className={styles.result} role="status">
      <span className={styles.resultIcon}>
        <Icon name="check" size={26} />
      </span>
      <h2>Thanks, we&rsquo;ve received your request.</h2>
      <p>We&rsquo;ll reply to {email} soon.</p>
      <GlowButton to="/">Back to Home</GlowButton>
    </div>
  );
}

export function FormError() {
  return (
    <p className={styles.formError} role="alert">
      Something went wrong. Email us at <a href={mailtoUrl}>{site.email}</a>
    </p>
  );
}

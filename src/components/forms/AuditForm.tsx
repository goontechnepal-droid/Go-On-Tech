import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { INDUSTRIES } from '../../config/site';
import { useSubmitInquiry } from '../../hooks/useSubmitInquiry';
import GlowButton from '../ui/GlowButton';
import { a11y, Check, CheckGroup, Field, FormError, FormSuccess, Honeypot } from './Field';
import styles from './forms.module.css';

const SIZES = ['1–50', '51–200', '201–1000', '1000+'];
const SCOPE = [
  { value: 'network', label: 'Network' },
  { value: 'web-apps', label: 'Web apps' },
  { value: 'mobile-apps', label: 'Mobile apps' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'endpoints', label: 'Endpoints' },
  { value: 'policies-compliance', label: 'Policies / compliance' },
];

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(120, 'Name is too long'),
  email: z.string().trim().min(1, 'Please enter your email').email('Enter a valid email address').max(200, 'Email is too long'),
  phone: z.string().trim().min(5, 'Please enter a phone number').max(40, 'Phone number is too long'),
  organisation: z.string().trim().min(2, 'Please enter your organisation').max(160, 'Organisation name is too long'),
  industry: z.string().min(1, 'Please choose an industry'),
  size: z.string(),
  scope: z.array(z.string()),
  timeframe: z.string().trim().max(120, 'Please keep this short'),
  notes: z.string().trim().max(2000, 'Please keep your notes under 2000 characters'),
  website: z.string(), // honeypot
});
type Values = z.infer<typeof schema>;

export default function AuditForm() {
  const submit = useSubmitInquiry();
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '', email: '', phone: '', organisation: '', industry: '', size: '', scope: [], timeframe: '', notes: '', website: '',
    },
  });

  const onSubmit = handleSubmit(async (v) => {
    setFailed(false);
    if (v.website) {
      setSentTo(v.email); // honeypot filled: pretend it worked, store nothing
      return;
    }
    try {
      await submit.mutateAsync({
        type: 'audit',
        name: v.name,
        email: v.email,
        phone: v.phone,
        company: v.organisation,
        message: v.notes,
        // everything without its own column goes into the jsonb `details`
        details: {
          industry: v.industry,
          organisation_size: v.size || null,
          areas_in_scope: v.scope,
          preferred_timeframe: v.timeframe || null,
        },
      });
      setSentTo(v.email);
    } catch {
      setFailed(true); // values stay in the form
    }
  });

  if (sentTo) return <FormSuccess email={sentTo} />;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <Field id="a-name" label="Name" required error={errors.name?.message}>
        <input type="text" autoComplete="name" {...a11y('a-name', errors.name?.message)} {...register('name')} />
      </Field>
      <Field id="a-email" label="Email" required error={errors.email?.message}>
        <input type="email" autoComplete="email" {...a11y('a-email', errors.email?.message)} {...register('email')} />
      </Field>
      <Field id="a-phone" label="Phone" required error={errors.phone?.message}>
        <input type="tel" autoComplete="tel" {...a11y('a-phone', errors.phone?.message)} {...register('phone')} />
      </Field>
      <Field id="a-org" label="Organisation" required error={errors.organisation?.message}>
        <input type="text" autoComplete="organization" {...a11y('a-org', errors.organisation?.message)} {...register('organisation')} />
      </Field>
      <Field id="a-industry" label="Industry" required error={errors.industry?.message}>
        <select {...a11y('a-industry', errors.industry?.message)} {...register('industry')}>
          <option value="">Select an industry</option>
          {INDUSTRIES.map((i) => (
            <option key={i.slug} value={i.slug}>
              {i.label}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
      </Field>
      <Field id="a-size" label="Organisation size" error={errors.size?.message}>
        <select {...a11y('a-size', errors.size?.message)} {...register('size')}>
          <option value="">Select a size (optional)</option>
          {SIZES.map((s) => (
            <option key={s} value={s}>
              {s} people
            </option>
          ))}
        </select>
      </Field>
      <CheckGroup id="a-scope" legend="Areas in scope" error={errors.scope?.message}>
        <div className={styles.checks}>
          {SCOPE.map((s) => (
            <Check key={s.value} label={s.label} value={s.value} registration={register('scope')} />
          ))}
        </div>
      </CheckGroup>
      <Field id="a-timeframe" label="Preferred timeframe" wide error={errors.timeframe?.message}>
        <input type="text" placeholder="For example: next month" {...a11y('a-timeframe', errors.timeframe?.message)} {...register('timeframe')} />
      </Field>
      <Field id="a-notes" label="Notes" wide error={errors.notes?.message}>
        <textarea rows={4} {...a11y('a-notes', errors.notes?.message)} {...register('notes')} />
      </Field>
      <Honeypot registration={register('website')} />
      {failed && <FormError />}
      <div className={styles.footer}>
        <GlowButton type="submit" loading={isSubmitting}>
          Request free audit
        </GlowButton>
        <span className={styles.note}>Fields marked * are required.</span>
      </div>
    </form>
  );
}

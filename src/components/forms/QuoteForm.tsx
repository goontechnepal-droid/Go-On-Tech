import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CATEGORY_LABEL } from '../../config/site';
import { useServices } from '../../hooks/useServices';
import { useSubmitInquiry } from '../../hooks/useSubmitInquiry';
import GlowButton from '../ui/GlowButton';
import { a11y, Check, CheckGroup, Field, FormError, FormSuccess, Honeypot } from './Field';
import styles from './forms.module.css';

const TIMELINES = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '3-months', label: 'Within 3 months' },
  { value: 'exploring', label: 'Just exploring' },
];

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(120, 'Name is too long'),
  email: z.string().trim().min(1, 'Please enter your email').email('Enter a valid email address').max(200, 'Email is too long'),
  phone: z.string().trim().min(5, 'Please enter a phone number').max(40, 'Phone number is too long'),
  company: z.string().trim().max(160, 'Company name is too long'),
  services: z.array(z.string()).min(1, 'Choose at least one service'),
  quantity: z
    .number({ invalid_type_error: 'Enter a number' })
    .int('Enter a whole number')
    .positive('Enter a number above zero')
    .max(1_000_000, 'That quantity looks too large')
    .optional(),
  timeline: z.string(),
  details: z.string().trim().max(2000, 'Please keep the details under 2000 characters'),
  website: z.string(), // honeypot
});
type Values = z.infer<typeof schema>;

interface QuoteFormProps {
  /** Slug from `?service=`, ticked when the form opens. */
  preselect?: string | null;
}

export default function QuoteForm({ preselect }: QuoteFormProps) {
  const { data: services = [] } = useServices();
  const submit = useSubmitInquiry();
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '', email: '', phone: '', company: '', services: preselect ? [preselect] : [], quantity: undefined, timeline: '', details: '', website: '',
    },
  });

  const selected = watch('services');
  const hardwareSelected = services.some((s) => s.category === 'hardware' && selected.includes(s.slug));

  const onSubmit = handleSubmit(async (v) => {
    setFailed(false);
    if (v.website) {
      setSentTo(v.email); // honeypot filled: pretend it worked, store nothing
      return;
    }
    try {
      await submit.mutateAsync({
        type: 'quote',
        name: v.name,
        email: v.email,
        phone: v.phone,
        company: v.company,
        service_slugs: v.services,
        message: v.details,
        details: {
          quantity: hardwareSelected && v.quantity !== undefined ? v.quantity : null,
          timeline: v.timeline || null,
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
      <Field id="q-name" label="Name" required error={errors.name?.message}>
        <input type="text" autoComplete="name" {...a11y('q-name', errors.name?.message)} {...register('name')} />
      </Field>
      <Field id="q-email" label="Email" required error={errors.email?.message}>
        <input type="email" autoComplete="email" {...a11y('q-email', errors.email?.message)} {...register('email')} />
      </Field>
      <Field id="q-phone" label="Phone" required error={errors.phone?.message}>
        <input type="tel" autoComplete="tel" {...a11y('q-phone', errors.phone?.message)} {...register('phone')} />
      </Field>
      <Field id="q-company" label="Company" error={errors.company?.message}>
        <input type="text" autoComplete="organization" {...a11y('q-company', errors.company?.message)} {...register('company')} />
      </Field>

      <CheckGroup id="q-services" legend="Services" required error={errors.services?.message}>
        <div className={styles.checks}>
          {(['solution', 'hardware'] as const).map((cat) => [
            <p key={cat} className={styles.checksTitle}>
              {CATEGORY_LABEL[cat]}
            </p>,
            ...services
              .filter((s) => s.category === cat)
              .map((s) => <Check key={s.slug} label={s.title} value={s.slug} registration={register('services')} />),
          ])}
        </div>
      </CheckGroup>

      {hardwareSelected && (
        <Field id="q-quantity" label="Quantity (units or cards)" error={errors.quantity?.message}>
          <input
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            {...a11y('q-quantity', errors.quantity?.message)}
            {...register('quantity', {
              setValueAs: (raw: unknown) => (raw === '' || raw === null || raw === undefined ? undefined : Number(raw)),
            })}
          />
        </Field>
      )}
      <Field id="q-timeline" label="Timeline" wide={!hardwareSelected} error={errors.timeline?.message}>
        <select {...a11y('q-timeline', errors.timeline?.message)} {...register('timeline')}>
          <option value="">Select a timeline (optional)</option>
          {TIMELINES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="q-details" label="Details" wide error={errors.details?.message}>
        <textarea rows={4} placeholder="Tell us what you need" {...a11y('q-details', errors.details?.message)} {...register('details')} />
      </Field>
      <Honeypot registration={register('website')} />
      {failed && <FormError />}
      <div className={styles.footer}>
        <GlowButton type="submit" loading={isSubmitting}>
          Request quote
        </GlowButton>
        <span className={styles.note}>Fields marked * are required.</span>
      </div>
    </form>
  );
}

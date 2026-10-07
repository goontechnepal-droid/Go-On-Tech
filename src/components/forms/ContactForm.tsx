import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CATEGORY_LABEL } from '../../config/site';
import { useServices } from '../../hooks/useServices';
import { useSubmitInquiry } from '../../hooks/useSubmitInquiry';
import GlowButton from '../ui/GlowButton';
import { a11y, Field, FormError, FormSuccess, Honeypot } from './Field';
import styles from './forms.module.css';

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(120, 'Name is too long'),
  email: z.string().trim().min(1, 'Please enter your email').email('Enter a valid email address').max(200, 'Email is too long'),
  phone: z.string().trim().max(40, 'Phone number is too long'),
  company: z.string().trim().max(160, 'Company name is too long'),
  service: z.string(),
  message: z
    .string()
    .trim()
    .min(10, 'Please write at least 10 characters')
    .max(2000, 'Please keep your message under 2000 characters'),
  website: z.string(), // honeypot
});
type Values = z.infer<typeof schema>;

export default function ContactForm() {
  const { data: services = [] } = useServices();
  const submit = useSubmitInquiry();
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', company: '', service: '', message: '', website: '' },
  });

  const onSubmit = handleSubmit(async (v) => {
    setFailed(false);
    if (v.website) {
      setSentTo(v.email); // honeypot filled: pretend it worked, store nothing
      return;
    }
    try {
      const isSlug = v.service !== '' && v.service !== 'other';
      await submit.mutateAsync({
        type: 'contact',
        name: v.name,
        email: v.email,
        phone: v.phone,
        company: v.company,
        service_slugs: isSlug ? [v.service] : [],
        message: v.message,
        details: v.service === 'other' ? { service: 'Other' } : {},
      });
      setSentTo(v.email);
    } catch {
      setFailed(true); // values stay in the form
    }
  });

  if (sentTo) return <FormSuccess email={sentTo} />;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <Field id="c-name" label="Name" required error={errors.name?.message}>
        <input type="text" autoComplete="name" {...a11y('c-name', errors.name?.message)} {...register('name')} />
      </Field>
      <Field id="c-email" label="Email" required error={errors.email?.message}>
        <input type="email" autoComplete="email" {...a11y('c-email', errors.email?.message)} {...register('email')} />
      </Field>
      <Field id="c-phone" label="Phone" error={errors.phone?.message}>
        <input type="tel" autoComplete="tel" {...a11y('c-phone', errors.phone?.message)} {...register('phone')} />
      </Field>
      <Field id="c-company" label="Company" error={errors.company?.message}>
        <input type="text" autoComplete="organization" {...a11y('c-company', errors.company?.message)} {...register('company')} />
      </Field>
      <Field id="c-service" label="Service" wide error={errors.service?.message}>
        <select {...a11y('c-service', errors.service?.message)} {...register('service')}>
          <option value="">Select a service (optional)</option>
          {(['solution', 'hardware'] as const).map((cat) => (
            <optgroup key={cat} label={CATEGORY_LABEL[cat]}>
              {services
                .filter((s) => s.category === cat)
                .map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
            </optgroup>
          ))}
          <option value="other">Other</option>
        </select>
      </Field>
      <Field id="c-message" label="Message" required wide error={errors.message?.message}>
        <textarea rows={5} {...a11y('c-message', errors.message?.message)} {...register('message')} />
      </Field>
      <Honeypot registration={register('website')} />
      {failed && <FormError />}
      <div className={styles.footer}>
        <GlowButton type="submit" loading={isSubmitting}>
          Send message
        </GlowButton>
        <span className={styles.note}>Fields marked * are required.</span>
      </div>
    </form>
  );
}

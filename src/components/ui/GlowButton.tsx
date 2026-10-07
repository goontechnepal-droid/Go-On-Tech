import type { MouseEventHandler, ReactNode } from 'react';
import { Link } from 'react-router-dom';

/* The Glow Button (Appendix A §3). All visuals live in hero.css under `.btn`.
   It renders as a router <Link> (internal route), an <a> (external / mailto), or,
   for forms only, a <button type="submit"> with the same CSS. */

interface Common {
  children: ReactNode;
  className?: string;
  /** `md` = flow-layout size for sections and forms; `raw` = sized by its context (nav pill, hero CTA). */
  size?: 'md' | 'raw';
  /** Name the type fitter uses to find the label inside the hero canvas. */
  fit?: string;
}
interface AsLink extends Common {
  to: string;
  href?: undefined;
  type?: undefined;
}
interface AsAnchor extends Common {
  href: string;
  to?: undefined;
  type?: undefined;
  external?: boolean;
}
interface AsButton extends Common {
  type: 'submit' | 'button';
  to?: undefined;
  href?: undefined;
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
type GlowButtonProps = AsLink | AsAnchor | AsButton;

export default function GlowButton(props: GlowButtonProps) {
  const { children, className, size = 'md', fit } = props;
  const cls = ['btn', size === 'md' ? 'btn--md' : '', className ?? ''].filter(Boolean).join(' ');
  const label = <span data-fit={fit}>{children}</span>;

  if (props.to !== undefined) {
    return (
      <Link className={cls} to={props.to}>
        {label}
      </Link>
    );
  }
  if (props.href !== undefined) {
    return (
      <a className={cls} href={props.href} {...(props.external ? { target: '_blank', rel: 'noopener' } : {})}>
        {label}
      </a>
    );
  }
  return (
    <button
      className={cls}
      type={props.type}
      disabled={props.disabled || props.loading}
      aria-busy={props.loading || undefined}
      onClick={props.onClick}
    >
      <span>
        {props.loading && <i className="spin" aria-hidden="true" />}
        {children}
      </span>
    </button>
  );
}

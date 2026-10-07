import { Link } from 'react-router-dom';
import Seo from '../components/page/Seo';
import Backdrop from '../components/ui/Backdrop';
import GlowButton from '../components/ui/GlowButton';
import styles from './pages.module.css';

export default function NotFoundPage() {
  return (
    <section className={styles.notFound}>
      <Seo title="Page not found" noindex />
      <Backdrop />
      <div className={styles.notFoundInner}>
        <h1 className={styles.code} aria-label="404: page not found">
          404
        </h1>
        <p>This page does not exist, or it has moved.</p>
        <div className={styles.notFoundActions}>
          <GlowButton to="/">Home</GlowButton>
          <Link className="ghost" to="/solutions">
            Solutions
          </Link>
          <Link className="ghost" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}

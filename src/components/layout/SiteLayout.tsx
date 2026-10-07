import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import WhatsAppFab from '../ui/WhatsAppFab';
import Footer from './Footer';
import Nav from './Nav';
import ScrollToTop from './ScrollToTop';

/**
 * Shell for every route: skip link, the one fixed navbar, the routed page, footer and
 * WhatsApp button.
 */
export default function SiteLayout() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="route-fallback" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

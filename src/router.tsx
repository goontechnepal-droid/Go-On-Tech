import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';

// Every page is its own chunk; SiteLayout provides the dark Suspense fallback.
const HomePage = lazy(() => import('./pages/HomePage'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const SolutionDetailPage = lazy(() => import('./pages/SolutionDetailPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const ClientsPage = lazy(() => import('./pages/ClientsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AuditRequestPage = lazy(() => import('./pages/AuditRequestPage'));
const QuotePage = lazy(() => import('./pages/QuotePage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export const router = createBrowserRouter(
  [
    {
      element: <SiteLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/solutions', element: <SolutionsPage /> },
        { path: '/solutions/:slug', element: <SolutionDetailPage /> },
        { path: '/services', element: <ServicesPage /> },
        { path: '/services/:slug', element: <ServiceDetailPage /> },
        { path: '/clients', element: <ClientsPage /> },
        { path: '/about', element: <AboutPage /> },
        { path: '/contact', element: <ContactPage /> },
        { path: '/get-audit', element: <AuditRequestPage /> },
        { path: '/quote', element: <QuotePage /> },
        { path: '/privacy', element: <PrivacyPage /> },
        { path: '/terms', element: <TermsPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  {
    // opt in to the v7 behaviours now: no future-flag warnings in the console
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

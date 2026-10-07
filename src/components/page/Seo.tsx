import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { site } from '../../config/site';

interface SeoProps {
  /** Page name; rendered as "{title} | Go On Tech". Omit on the home page. */
  title?: string;
  description?: string;
  /** Use for pages that should stay out of search results (404, drafts). */
  noindex?: boolean;
}

/** Per-page <title>, meta description, Open Graph tags and canonical URL. */
export default function Seo({ title, description = site.description, noindex = false }: SeoProps) {
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} | ${site.shortName}` : site.homeTitle;
  const canonical = `${site.url}${pathname === '/' ? '' : pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
}

import { useParams } from 'react-router-dom';
import type { Service, ServiceCategory } from '../../data/types';
import { useService, useServices } from '../../hooks/useServices';
import NotFoundPage from '../../pages/NotFoundPage';
import ServiceDetail, { ServiceDetailSkeleton } from './ServiceDetail';

/** The next three items in priority order, wrapping round the end of the list. */
function relatedTo(service: Service, siblings: Service[]): Service[] {
  const index = siblings.findIndex((s) => s.slug === service.slug);
  if (index < 0) return siblings.slice(0, 3);
  const out: Service[] = [];
  for (let n = 1; n < siblings.length && out.length < 3; n++) {
    out.push(siblings[(index + n) % siblings.length]);
  }
  return out;
}

/** Resolves `:slug` for a category and renders the detail template, a skeleton, or the 404. */
export default function DetailRoute({ category }: { category: ServiceCategory }) {
  const { slug } = useParams();
  const { data: service, isPending, isPlaceholderData } = useService(slug);
  const { data: siblings = [] } = useServices(category);

  // Loading: nothing yet, or the slug is not in the bundled copy and the database has not answered
  if (isPending || (!service && isPlaceholderData)) return <ServiceDetailSkeleton />;
  // unknown slug, or a slug that belongs to the other category
  if (!service || service.category !== category) return <NotFoundPage />;

  // keyed by slug so accordion state and scroll reveals reset between detail pages
  return <ServiceDetail key={service.slug} service={service} related={relatedTo(service, siblings)} />;
}

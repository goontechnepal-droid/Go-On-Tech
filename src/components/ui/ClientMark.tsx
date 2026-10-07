import { useState } from 'react';
import type { Client } from '../../data/types';

/** A client's logo image when `logo_url` is set and loads; otherwise the client's name as text. */
export default function ClientMark({ client }: { client: Pick<Client, 'name' | 'logo_url'> }) {
  const [broken, setBroken] = useState(false);
  if (client.logo_url && !broken) {
    return <img src={client.logo_url} alt={client.name} loading="lazy" onError={() => setBroken(true)} />;
  }
  return <span>{client.name}</span>;
}

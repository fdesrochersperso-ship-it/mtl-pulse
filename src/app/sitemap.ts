import { MetadataRoute } from 'next';
import { BOROUGHS } from '@/lib/constants/boroughs';
import { getSiteUrl } from '@/lib/config';

const TOPIC_PAGES = [
  'travaux',
  'securite',
  'permis',
  '311',
  'entraves',
  'pompiers',
  'nids-de-poule',
  'punaises',
  'remorquages',
  'air',
  'velo',
  'eau',
  'contrats',
  'politique',
  'routes',
  'pannes',
  'deneigement',
  'winter',
  'trends',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const routes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'hourly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/borough`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/map`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/trends`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ];

  for (const code of Object.keys(BOROUGHS)) {
    routes.push({
      url: `${base}/borough/${code}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    });
  }

  for (const topic of TOPIC_PAGES) {
    routes.push({
      url: `${base}/${topic}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });
  }

  return routes;
}

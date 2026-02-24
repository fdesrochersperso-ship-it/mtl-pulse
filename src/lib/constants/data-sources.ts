export const DATA_SOURCES = {
  CRIME: {
    base: 'https://donnees.montreal.ca/api/3/action/datastore_search',
    resourceId: 'c6f482bf-bf0f-4960-8b2f-9982c211addd',
    format: 'json' as const,
    updateFrequency: 'daily' as const,
    description: 'Criminal acts reported to SPVM',
  },

  INFO_TRAVAUX: {
    base: 'https://donnees.montreal.ca/dataset/info-travaux',
    packageId: 'info-travaux',
    format: 'csv' as const,
    updateFrequency: '4h' as const,
    description: 'Road obstructions and construction work',
  },

  PERMITS: {
    base: 'https://donnees.montreal.ca/dataset/permis-construction',
    packageId: 'permis-construction',
    format: 'csv' as const,
    updateFrequency: 'weekly' as const,
    description: 'Building permits issued by the city',
  },

  REQUESTS_311: {
    base: 'https://donnees.montreal.ca/api/3/action/datastore_search',
    resourceId: '2cfa0e06-9be4-49a6-b7f1-ee9f2363a872',
    packageId: 'requete-311',
    format: 'json' as const,
    updateFrequency: 'daily' as const,
    description: '311 service requests from citizens',
  },

  FIRE: {
    base: 'https://donnees.montreal.ca/dataset/interventions-service-securite-incendie-montreal',
    packageId: 'interventions-service-securite-incendie-montreal',
    format: 'csv' as const,
    updateFrequency: 'daily' as const,
    description: 'Fire department interventions',
  },

  POTHOLES: {
    base: 'https://donnees.montreal.ca/dataset/refection-de-chaussee-par-remplissage-mecanise-de-nid-de-poule',
    packageId: 'refection-de-chaussee-par-remplissage-mecanise-de-nid-de-poule',
    format: 'csv' as const,
    updateFrequency: 'daily' as const,
    description: 'Pothole repairs via mechanized filling',
  },

  SNOW_TOWINGS: {
    base: 'https://donnees.montreal.ca/dataset/remorquages-de-vehicules-genants',
    packageId: 'remorquages-de-vehicules-genants',
    format: 'csv' as const,
    updateFrequency: 'daily' as const,
    description: 'Vehicle towings during snow removal',
  },

  CONTRACTS: {
    base: 'https://ville.montreal.qc.ca/vuesurlescontrats/api/releases',
    format: 'json' as const,
    updateFrequency: 'weekly' as const,
    description: 'City contracts and procurement',
  },

  ELECTED_OFFICIALS: {
    base: 'https://donnees.montreal.ca/dataset/listes-des-elus-de-la-ville-de-montreal',
    packageId: 'listes-des-elus-de-la-ville-de-montreal',
    format: 'csv' as const,
    updateFrequency: 'yearly' as const,
    description: 'List of elected officials',
  },
} as const;

/** CKAN API base — use CKANClient instead of raw URLs; this is for reference only */
export const CKAN_BASE =
  process.env.CKAN_BASE_URL ?? 'https://data.montreal.ca/api/3/action';

/** Standard delay between paginated CKAN requests (ms) */
export const CKAN_REQUEST_DELAY = 500;

/** Standard page size for CKAN datastore queries */
export const CKAN_PAGE_SIZE = 1000;

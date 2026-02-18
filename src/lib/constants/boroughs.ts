export const BOROUGHS = {
  AHU: { name: 'Ahuntsic-Cartierville', population: 134245 },
  ANJ: { name: 'Anjou', population: 44040 },
  CDN: { name: 'Côte-des-Neiges–Notre-Dame-de-Grâce', population: 165031 },
  IBI: { name: "L'Île-Bizard–Sainte-Geneviève", population: 18410 },
  LAC: { name: 'Lachine', population: 44489 },
  LSL: { name: 'LaSalle', population: 79860 },
  PLA: { name: 'Le Plateau-Mont-Royal', population: 104000 },
  LSO: { name: 'Le Sud-Ouest', population: 78151 },
  MHM: { name: 'Mercier–Hochelaga-Maisonneuve', population: 136024 },
  MTN: { name: 'Montréal-Nord', population: 84234 },
  OUT: { name: 'Outremont', population: 23566 },
  PFD: { name: 'Pierrefonds-Roxboro', population: 69297 },
  RPP: { name: 'Rivière-des-Prairies–Pointe-aux-Trembles', population: 107175 },
  RDP: { name: 'Rosemont–La Petite-Patrie', population: 139590 },
  SLR: { name: 'Saint-Laurent', population: 98828 },
  SLE: { name: 'Saint-Léonard', population: 79979 },
  VER: { name: 'Verdun', population: 69229 },
  VSP: { name: 'Villeray–Saint-Michel–Parc-Extension', population: 142222 },
  VMA: { name: 'Ville-Marie', population: 89170 },
} as const;

export type BoroughCode = keyof typeof BOROUGHS;

/** Reverse lookup: borough name → code (for CSV data that uses French names) */
export const BOROUGH_NAME_TO_CODE: Record<string, BoroughCode> = Object.fromEntries(
  Object.entries(BOROUGHS).map(([code, { name }]) => [name, code as BoroughCode]),
) as Record<string, BoroughCode>;

/** Fuzzy borough name lookup — handles common variations in open data */
export function findBoroughCode(name: string | null | undefined): BoroughCode | null {
  if (!name) return null;
  const trimmed = name.trim();
  // Exact match first
  if (BOROUGH_NAME_TO_CODE[trimmed]) return BOROUGH_NAME_TO_CODE[trimmed];
  // Case-insensitive search
  const lower = trimmed.toLowerCase();
  for (const [fullName, code] of Object.entries(BOROUGH_NAME_TO_CODE)) {
    if (fullName.toLowerCase() === lower) return code;
    // Partial match (e.g. "Ville-Marie" matches "Ville-Marie")
    if (lower.includes(fullName.toLowerCase()) || fullName.toLowerCase().includes(lower)) {
      return code;
    }
  }
  return null;
}

/** City-wide aggregate code */
export const CITY_CODE = 'MTL' as const;

/** Map PDQ (police district) numbers to borough codes */
export const PDQ_TO_BOROUGH: Record<number, BoroughCode> = {
  10: 'VMA', // Ville-Marie
  12: 'VMA',
  20: 'LSO', // Le Sud-Ouest
  21: 'LSO',
  22: 'VER', // Verdun
  23: 'LSL', // LaSalle
  24: 'LAC', // Lachine
  26: 'CDN', // CDN-NDG
  11: 'CDN',
  27: 'PLA', // Plateau-Mont-Royal
  31: 'OUT', // Outremont
  33: 'VSP', // Villeray-Saint-Michel-Parc-Extension
  35: 'VSP',
  30: 'AHU', // Ahuntsic-Cartierville
  38: 'MTN', // Montréal-Nord
  39: 'RDP', // Rosemont-La Petite-Patrie
  44: 'MHM', // Mercier-Hochelaga-Maisonneuve
  46: 'MHM',
  48: 'RPP', // RDP-PAT
  49: 'RPP',
  42: 'ANJ', // Anjou
  43: 'SLE', // Saint-Léonard
  45: 'SLR', // Saint-Laurent
  5: 'IBI',  // L'Île-Bizard-Sainte-Geneviève
  4: 'PFD',  // Pierrefonds-Roxboro
  7: 'PFD',
  9: 'PFD',
};

/**
 * Borough-specific digest prompt builder.
 * Compares borough metrics to city average.
 */

import type { DigestLanguage } from '../types';

export interface BoroughDigestMetrics {
  date: string;
  boroughCode: string;
  boroughName: string;
  crime: {
    count7d: number;
    cityAvg: number;
    vsCityPct: number;
    deltaVsPrev7d: number | null;
  };
  travaux: {
    activeCount: number;
    cityTotal: number;
    vsCityPct: number;
    newToday: number;
  };
  requests311: {
    openCount: number;
    cityTotal: number;
    avgResolutionDays: number;
    cityAvgDays: number;
  };
  fire: {
    count7d: number;
    cityTotal: number;
  };
  potholes: {
    repaired7d: number;
    cityTotal: number;
  };
}

const SYSTEM_PROMPT_FR = `Tu es un analyste municipal expert qui rédige des résumés de données pour les citoyens de Montréal. Tu analyses les données par arrondissement et produis des résumés clairs, factuels et accessibles.

Règles:
- Toujours factuel et neutre — pas d'opinion politique
- Comparer l'arrondissement à la moyenne montréalaise
- Signaler quand l'arrondissement se distingue (au-dessus ou en-dessous de la moyenne)
- Utiliser un ton journalistique accessible
- Produire le résumé en français`;

const SYSTEM_PROMPT_EN = `You are an expert municipal analyst who writes data summaries for Montreal citizens. You analyze borough-level data and produce clear, factual, and accessible summaries.

Rules:
- Always factual and neutral — no political opinions
- Compare the borough to Montreal city average
- Highlight when the borough stands out (above or below average)
- Use an accessible journalistic tone
- Produce the summary in English`;

export function buildBoroughDigestPrompt(
  metrics: BoroughDigestMetrics,
  language: DigestLanguage,
): { systemPrompt: string; userPrompt: string } {
  const systemPrompt = language === 'fr' ? SYSTEM_PROMPT_FR : SYSTEM_PROMPT_EN;

  const userPrompt = `Voici les données pour l'arrondissement ${metrics.boroughName} (${metrics.boroughCode}) pour la journée du ${metrics.date}, comparées à la moyenne montréalaise:

## Sécurité publique
- Actes criminels (7j): ${metrics.crime.count7d} (moyenne ville: ${metrics.crime.cityAvg})
- vs moyenne ville: ${metrics.crime.vsCityPct > 0 ? '+' : ''}${Math.round(metrics.crime.vsCityPct)}%
- Variation vs 7j précédents: ${metrics.crime.deltaVsPrev7d != null ? `${metrics.crime.deltaVsPrev7d > 0 ? '+' : ''}${Math.round(metrics.crime.deltaVsPrev7d)}%` : '—'}

## Construction et travaux
- Chantiers actifs: ${metrics.travaux.activeCount} (total ville: ${metrics.travaux.cityTotal})
- Part de la ville: ${Math.round(metrics.travaux.vsCityPct)}%
- Nouveaux aujourd'hui: ${metrics.travaux.newToday}

## Demandes 311
- Demandes ouvertes: ${metrics.requests311.openCount} (ville: ${metrics.requests311.cityTotal})
- Délai moyen résolution: ${metrics.requests311.avgResolutionDays}j (ville: ${metrics.requests311.cityAvgDays}j)

## Pompiers
- Interventions (7j): ${metrics.fire.count7d} (ville: ${metrics.fire.cityTotal})

## Nids-de-poule
- Réparations (7j): ${metrics.potholes.repaired7d} (ville: ${metrics.potholes.cityTotal})

Rédige un résumé de 3-5 paragraphes spécifique à ${metrics.boroughName}. Compare à la moyenne de la ville. Fournis un JSON: {"title": "...", "summary": "...", "highlights": [{"emoji": "🚧", "text_fr": "...", "text_en": "...", "metric": "...", "delta": "..."}]}`;

  return { systemPrompt, userPrompt };
}

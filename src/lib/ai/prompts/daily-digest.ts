/**
 * Daily digest prompt builder.
 * Phase 1 scope: Crime + travaux + 311 + obstructions + fire + potholes
 */

import type { DigestLanguage } from '../types';

export interface DailyDigestMetrics {
  date: string;
  crime: {
    count24h: number;
    count7d: number;
    deltaVsPrev7d: number | null;
    vs30dAvg: number | null;
    topBoroughs: { boroughCode: string; name: string; value: number }[];
  };
  travaux: {
    activeCount: number;
    prevActiveCount: number | null;
    newToday: number;
    closedToday: number | null;
    topBoroughs: { boroughCode: string; name: string; value: number }[];
  };
  obstructions: {
    activeCount: number;
  };
  requests311: {
    newToday: number | null;
    openTotal: number;
    avgResolutionDays: number | null;
    topTypes: string[];
  };
  fire: {
    count7d: number;
  };
  potholes: {
    repaired7d: number;
  };
}

const SYSTEM_PROMPT_FR = `Tu es un analyste municipal expert qui rédige des résumés de données pour les citoyens de Montréal. Tu analyses les données ouvertes de la Ville et produis des résumés clairs, factuels et accessibles.

Règles:
- Toujours factuel et neutre — pas d'opinion politique
- Signaler les changements notables avec des comparaisons chiffrées
- Utiliser un ton journalistique accessible (ni trop formel, ni trop familier)
- Mentionner les arrondissements par leur nom complet
- Arrondir les pourcentages à l'entier le plus proche
- Quand un chiffre est inhabituel, le mettre en contexte (vs moyenne, vs même période l'an dernier)
- Ne jamais inventer de données — si une info manque, le dire
- Produire le résumé en français`;

const SYSTEM_PROMPT_EN = `You are an expert municipal analyst who writes data summaries for Montreal citizens. You analyze the city's open data and produce clear, factual, and accessible summaries.

Rules:
- Always factual and neutral — no political opinions
- Highlight notable changes with quantitative comparisons
- Use an accessible journalistic tone (neither too formal nor too casual)
- Mention boroughs by their full names
- Round percentages to the nearest integer
- When a figure is unusual, put it in context (vs average, vs same period last year)
- Never invent data — if information is missing, say so
- Produce the summary in English`;

export function buildDailyDigestPrompt(
  metrics: DailyDigestMetrics,
  language: DigestLanguage,
): { systemPrompt: string; userPrompt: string } {
  const systemPrompt = language === 'fr' ? SYSTEM_PROMPT_FR : SYSTEM_PROMPT_EN;

  const topBoroughsTravaux = metrics.travaux.topBoroughs
    .slice(0, 5)
    .map((b) => `${b.name} (${b.value})`)
    .join(', ') || '—';
  const topBoroughsCrimes = metrics.crime.topBoroughs
    .slice(0, 5)
    .map((b) => `${b.name} (${b.value})`)
    .join(', ') || '—';

  const crimeDeltaStr =
    metrics.crime.deltaVsPrev7d != null
      ? `${metrics.crime.deltaVsPrev7d > 0 ? '+' : ''}${Math.round(metrics.crime.deltaVsPrev7d)}%`
      : '—';
  const crimeVsAvgStr =
    metrics.crime.vs30dAvg != null && metrics.crime.vs30dAvg > 0
      ? `${Math.round((metrics.crime.vs30dAvg - 1) * 100)}% vs 30j avg`
      : '—';

  const userPrompt = `Voici les données municipales de Montréal pour la journée du ${metrics.date}:

## Construction et travaux
- Chantiers actifs: ${metrics.travaux.activeCount} (hier: ${metrics.travaux.prevActiveCount ?? '—'})
- Nouveaux chantiers: ${metrics.travaux.newToday}
- Chantiers terminés: ${metrics.travaux.closedToday ?? '—'}
- Arrondissements les plus touchés: ${topBoroughsTravaux}
- Entraves routières actives: ${metrics.obstructions.activeCount}

## Sécurité publique
- Actes criminels rapportés (dernières 24h): ${metrics.crime.count24h}
- Crimes (7 derniers jours): ${metrics.crime.count7d}
- Variation vs 7j précédents: ${crimeDeltaStr}
- Variation vs moy. 30 jours: ${crimeVsAvgStr}
- Arrondissements notables: ${topBoroughsCrimes}

## Demandes 311
- Demandes ouvertes total: ${metrics.requests311.openTotal}
- Nouvelles demandes (auj.): ${metrics.requests311.newToday ?? '—'}
- Délai moyen de résolution: ${metrics.requests311.avgResolutionDays ?? '—'} jours
- Types les plus fréquents: ${metrics.requests311.topTypes.join(', ') || '—'}

## Pompiers
- Interventions (7 derniers jours): ${metrics.fire.count7d}

## Nids-de-poule
- Réparations (7 derniers jours): ${metrics.potholes.repaired7d}

Rédige un résumé de 3-5 paragraphes. Commence par le fait le plus marquant. Fournis aussi un JSON "highlights" avec les 3-5 faits les plus notables, format exact:
{"title": "...", "summary": "ton résumé ici...", "highlights": [{"emoji": "🚧", "text_fr": "...", "text_en": "...", "metric": "...", "delta": "..."}]}`;

  return { systemPrompt, userPrompt };
}

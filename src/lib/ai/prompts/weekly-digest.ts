/**
 * Weekly digest prompt builder.
 * Same pattern as daily but with weekly aggregates and trend comparisons.
 */

import type { DigestLanguage } from '../types';

export interface WeeklyDigestMetrics {
  weekStart: string;
  weekEnd: string;
  crime: {
    count7d: number;
    prev7d: number | null;
    deltaPct: number | null;
    topBoroughs: { boroughCode: string; name: string; value: number }[];
  };
  travaux: {
    activeCount: number;
    prevWeek: number | null;
    newThisWeek: number | null;
    topBoroughs: { boroughCode: string; name: string; value: number }[];
  };
  permits: {
    count: number;
    totalValue: number;
    prevCount: number | null;
    prevValue: number | null;
  };
  requests311: {
    openTotal: number;
    newThisWeek: number | null;
    avgResolutionDays: number | null;
  };
  fire: {
    count7d: number;
    prev7d: number | null;
  };
  potholes: {
    repaired7d: number;
  };
}

const SYSTEM_PROMPT_FR = `Tu es un analyste municipal expert qui rédige des résumés de données pour les citoyens de Montréal. Tu analyses les données ouvertes de la Ville et produis des résumés clairs, factuels et accessibles.

Règles:
- Toujours factuel et neutre — pas d'opinion politique
- Signaler les changements notables avec des comparaisons chiffrées
- Utiliser un ton journalistique accessible
- Mentionner les arrondissements par leur nom complet
- Arrondir les pourcentages à l'entier le plus proche
- Produire le résumé en français`;

const SYSTEM_PROMPT_EN = `You are an expert municipal analyst who writes data summaries for Montreal citizens. You analyze the city's open data and produce clear, factual, and accessible summaries.

Rules:
- Always factual and neutral — no political opinions
- Highlight notable changes with quantitative comparisons
- Use an accessible journalistic tone
- Mention boroughs by their full names
- Round percentages to the nearest integer
- Produce the summary in English`;

export function buildWeeklyDigestPrompt(
  metrics: WeeklyDigestMetrics,
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
    metrics.crime.deltaPct != null
      ? `${metrics.crime.deltaPct > 0 ? '+' : ''}${Math.round(metrics.crime.deltaPct)}%`
      : '—';

  const userPrompt = `Voici les données municipales de Montréal pour la semaine du ${metrics.weekStart} au ${metrics.weekEnd}:

## Construction et travaux
- Chantiers actifs: ${metrics.travaux.activeCount} (semaine précédente: ${metrics.travaux.prevWeek ?? '—'})
- Nouveaux chantiers cette semaine: ${metrics.travaux.newThisWeek ?? '—'}
- Arrondissements les plus touchés: ${topBoroughsTravaux}

## Sécurité publique
- Actes criminels (7 derniers jours): ${metrics.crime.count7d} (7j précédents: ${metrics.crime.prev7d ?? '—'})
- Variation: ${crimeDeltaStr}
- Arrondissements notables: ${topBoroughsCrimes}

## Permis de construction (cette semaine)
- Nouveaux permis: ${metrics.permits.count} (sem. précédente: ${metrics.permits.prevCount ?? '—'})
- Valeur estimée: ${metrics.permits.totalValue.toLocaleString('fr-CA')}$ (sem. précédente: ${metrics.permits.prevValue?.toLocaleString('fr-CA') ?? '—'}$)

## Demandes 311
- Demandes ouvertes: ${metrics.requests311.openTotal}
- Nouvelles cette semaine: ${metrics.requests311.newThisWeek ?? '—'}
- Délai moyen de résolution: ${metrics.requests311.avgResolutionDays ?? '—'} jours

## Pompiers
- Interventions (7j): ${metrics.fire.count7d} (7j précédents: ${metrics.fire.prev7d ?? '—'})

## Nids-de-poule
- Réparations (7j): ${metrics.potholes.repaired7d}

Rédige un résumé de 3-5 paragraphes. Commence par le fait le plus marquant. Fournis un JSON avec title, summary, highlights (3-5 faits notables). Format: {"title": "...", "summary": "...", "highlights": [{"emoji": "🚧", "text_fr": "...", "text_en": "...", "metric": "...", "delta": "..."}]}`;

  return { systemPrompt, userPrompt };
}

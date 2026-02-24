/** AI digest output shape from Claude */
export interface DigestOutput {
  title: string;
  summary: string;
  highlights: DigestHighlight[];
}

export interface DigestHighlight {
  emoji: string;
  text_fr: string;
  text_en: string;
  metric: string;
  delta?: string;
}

export type DigestLanguage = 'fr' | 'en';

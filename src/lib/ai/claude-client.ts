/**
 * Wrapper around @anthropic-ai/sdk for digest generation.
 * Handles retries, error handling, and structured output.
 */

import Anthropic from '@anthropic-ai/sdk';
import type { DigestOutput, DigestHighlight, DigestLanguage } from './types';

const MODEL = 'claude-sonnet-4-20250514';
const MAX_TOKENS = 2000;
const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 1000;

export interface GenerateDigestResult {
  title: string;
  summary: string;
  highlights: DigestHighlight[];
  tokensUsed: { promptTokens: number; completionTokens: number };
}

export class ClaudeDigestError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'ClaudeDigestError';
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractJsonFromText(text: string): DigestOutput | null {
  // Try to find JSON in the response (may be wrapped in markdown code blocks)
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) ?? text.match(/\{[\s\S]*\}/);
  const jsonStr = jsonMatch ? (Array.isArray(jsonMatch) ? jsonMatch[1] ?? jsonMatch[0] : jsonMatch) : null;
  if (!jsonStr) return null;
  try {
    const parsed = JSON.parse(jsonStr.trim()) as DigestOutput;
    if (
      typeof parsed.title === 'string' &&
      typeof parsed.summary === 'string' &&
      Array.isArray(parsed.highlights)
    ) {
      return parsed;
    }
  } catch {
    // fall through
  }
  return null;
}

/**
 * Generate a digest using Claude.
 * Parses structured output (title, summary, highlights) from the model response.
 */
export async function generateDigest(
  systemPrompt: string,
  userPrompt: string,
  language: DigestLanguage,
): Promise<GenerateDigestResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new ClaudeDigestError('ANTHROPIC_API_KEY is not set');
  }

  const client = new Anthropic({ apiKey });
  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      });

      const textBlock = response.content.find((b) => b.type === 'text');
      if (!textBlock || textBlock.type !== 'text') {
        throw new ClaudeDigestError('No text in Claude response');
      }

      const usage = response.usage;
      const rawText = textBlock.text;

      // Try to parse as structured JSON first
      const parsed = extractJsonFromText(rawText);
      if (parsed) {
        return {
          title: parsed.title,
          summary: parsed.summary,
          highlights: parsed.highlights,
          tokensUsed: {
            promptTokens: usage.input_tokens,
            completionTokens: usage.output_tokens,
          },
        };
      }

      // Fallback: treat full text as summary, generate minimal title
      const lines = rawText.trim().split('\n');
      const firstLine = lines[0] ?? '';
      const isLikelyTitle = firstLine.length < 150 && !firstLine.includes('.');
      return {
        title: isLikelyTitle ? firstLine : 'Résumé municipal',
        summary: rawText.trim(),
        highlights: [],
        tokensUsed: {
          promptTokens: usage.input_tokens,
          completionTokens: usage.output_tokens,
        },
      };
    } catch (err) {
      lastError = err;

      const isRetryable =
        err instanceof Error &&
        (err.message.includes('rate_limit') ||
          err.message.includes('overloaded') ||
          err.message.includes('529') ||
          err.message.includes('503') ||
          err.message.includes('timeout'));

      if (attempt < MAX_RETRIES - 1 && isRetryable) {
        const backoff = INITIAL_BACKOFF_MS * Math.pow(2, attempt);
        await sleep(backoff);
        continue;
      }

      throw new ClaudeDigestError(
        err instanceof Error ? err.message : 'Unknown Claude API error',
        err,
      );
    }
  }

  throw new ClaudeDigestError('Max retries exceeded', lastError);
}

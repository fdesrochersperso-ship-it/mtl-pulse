"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export interface DigestHighlight {
  emoji?: string;
  text_fr?: string;
  text_en?: string;
  textFr?: string;
  textEn?: string;
  metric?: string;
  delta?: string;
}

export interface DigestCardProps {
  title: string;
  summary: string;
  highlights?: DigestHighlight[];
  modelUsed?: string | null;
  locale: "fr" | "en";
  defaultCollapsed?: boolean;
  className?: string;
}

export function DigestCard({
  title,
  summary,
  highlights = [],
  modelUsed,
  locale,
  defaultCollapsed = true,
  className,
}: DigestCardProps) {
  const t = useTranslations("common");
  const paragraphs = summary.split(/\n\n+/).filter(Boolean);
  const firstParagraph = paragraphs[0] ?? summary;
  const restParagraphs = paragraphs.slice(1);
  const hasMore = restParagraphs.length > 0 || highlights.length > 0;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <Collapsible defaultOpen={!defaultCollapsed}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {hasMore && (
              <CollapsibleTrigger className="inline-flex cursor-pointer items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                {t("readMore")}
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {firstParagraph}
          </p>

          <CollapsibleContent>
            {restParagraphs.map((p, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed text-muted-foreground"
              >
                {p}
              </p>
            ))}

            {highlights.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {highlights.map((h, i) => {
                  const text =
                    locale === "fr"
                      ? (h.text_fr ?? h.textFr)
                      : (h.text_en ?? h.textEn);
                  if (!text) return null;
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium"
                    >
                      {h.emoji && (
                        <span aria-hidden>{h.emoji}</span>
                      )}
                      {text}
                    </span>
                  );
                })}
              </div>
            )}
          </CollapsibleContent>

          {modelUsed && (
            <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                {t("generatedByAI")} — {modelUsed}
              </span>
            </div>
          )}
        </CardContent>
      </Collapsible>
    </Card>
  );
}

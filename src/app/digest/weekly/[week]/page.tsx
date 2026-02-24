import { notFound } from "next/navigation";
import { getLocale } from "@/lib/locale";
import { getDigestByPeriod } from "@/lib/db/queries/digests";
import { DigestCard } from "@/components/digest/DigestCard";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { startOfWeek, addWeeks } from "date-fns";

function parseWeek(weekStr: string): string | null {
  // Format: 2026-W07 (ISO week)
  const m = weekStr.match(/^(\d{4})-W(\d{2})$/i);
  if (!m) return null;
  const year = parseInt(m[1]!, 10);
  const weekNum = parseInt(m[2]!, 10);
  if (weekNum < 1 || weekNum > 53) return null;
  const jan4 = new Date(year, 0, 4);
  const week1Monday = startOfWeek(jan4, { weekStartsOn: 1 });
  const targetMonday = addWeeks(week1Monday, weekNum - 1);
  return targetMonday.toISOString().slice(0, 10);
}

export default async function WeeklyDigestPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week } = await params;
  const weekStartStr = parseWeek(week);
  if (!weekStartStr) notFound();

  const locale = await getLocale();

  const digest = await getDigestByPeriod("weekly", weekStartStr, locale, null);

  if (!digest) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          {locale === "fr" ? "Résumé de la semaine " : "Digest for week "}{week}
        </h1>
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {locale === "fr"
              ? "Aucun résumé disponible pour cette semaine."
              : "No digest available for this week."}
          </CardContent>
        </Card>
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {locale === "fr" ? "Accueil" : "Home"}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {locale === "fr" ? "Accueil" : "Home"}
        </Link>
        <h1 className="mt-2 text-2xl font-bold">
          {locale === "fr" ? "Résumé hebdomadaire — " : "Weekly digest — "}
          {week}
        </h1>
      </div>

      <DigestCard
        title={digest.title}
        summary={digest.summary}
        highlights={
          Array.isArray(digest.highlights)
            ? (digest.highlights as DigestCardProps["highlights"])
            : []
        }
        modelUsed={digest.modelUsed}
        locale={locale}
        defaultCollapsed={false}
      />
    </div>
  );
}

import type { DigestCardProps } from "@/components/digest/DigestCard";

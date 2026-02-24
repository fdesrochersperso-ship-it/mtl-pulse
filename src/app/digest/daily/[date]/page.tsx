import { notFound } from "next/navigation";
import { getLocale } from "@/lib/locale";
import { getDigestByPeriod } from "@/lib/db/queries/digests";
import { DigestCard } from "@/components/digest/DigestCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

function parseDate(dateParam: string): string | null {
  const d = new Date(dateParam);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

export default async function DailyDigestPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const dateStr = parseDate(date);
  if (!dateStr) notFound();

  const locale = await getLocale();

  const digest = await getDigestByPeriod("daily", dateStr, locale, null);

  if (!digest) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          {locale === "fr" ? "Résumé du " : "Digest for "}{dateStr}
        </h1>
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {locale === "fr"
              ? "Aucun résumé disponible pour cette date."
              : "No digest available for this date."}
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
          {locale === "fr" ? "Résumé quotidien — " : "Daily digest — "}
          {dateStr}
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

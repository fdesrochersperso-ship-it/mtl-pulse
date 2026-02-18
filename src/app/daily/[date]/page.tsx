export default async function HistoricalDailyPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy">
        Résumé du {date}
      </h1>
      <p className="mt-2 text-muted">
        Les données historiques seront disponibles une fois la base de données
        connectée.
      </p>
    </div>
  );
}

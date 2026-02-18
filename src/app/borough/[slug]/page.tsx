import { BOROUGHS, type BoroughCode } from "@/lib/constants/boroughs";

export default async function BoroughPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const code = slug.toUpperCase() as BoroughCode;
  const borough = BOROUGHS[code];

  if (!borough) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-navy">Arrondissement introuvable</h1>
        <p className="mt-2 text-muted">Le code &quot;{slug}&quot; ne correspond à aucun arrondissement.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy">{borough.name}</h1>
      <p className="mt-2 text-muted">
        Population: {borough.population.toLocaleString("fr-CA")} — Les
        statistiques détaillées seront disponibles une fois les données
        connectées.
      </p>
    </div>
  );
}

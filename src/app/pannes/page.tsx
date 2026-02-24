import { getLocale } from "@/lib/locale";
import { Card, CardContent } from "@/components/ui/card";

export default async function PannesPage() {
  const locale = await getLocale();
  const isFr = locale === "fr";

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">
          {isFr ? "Pannes de courant" : "Power outages"}
        </h1>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground">
                {isFr ? "État" : "Status"}
              </p>
              <p className="text-2xl font-bold">
                {isFr ? "Pipeline à venir" : "Pipeline coming"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-dashed">
        <CardContent className="py-12 text-center text-muted-foreground">
          <p className="mb-4">
            {locale === "fr"
              ? "Carte des pannes en direct, historique par zone, répartition des causes — nécessite le pipeline Hydro-Québec (pannes.hydroquebec.com)."
              : "Live outage map, historical frequency by area, cause breakdown — requires Hydro-Québec pipeline (pannes.hydroquebec.com)."}
          </p>
          <p className="text-sm">
            {locale === "fr"
              ? "Pipeline hydro-outages à construire. Données temps réel disponibles via l'API publique Hydro-Québec."
              : "hydro-outages pipeline to be built. Real-time data available via Hydro-Québec public API."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

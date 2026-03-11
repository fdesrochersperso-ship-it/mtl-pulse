# MTL Pulse - Semantic Layer Summary
# Montreal Open Data - Report Builder Reference

> Generated: 2026-03-09 22:51
> Total datasets: 390
> Total fields analyzed: 4490

---

## Data Quality Distribution

| Grade | Count | Pct | Description |
|-------|-------|-----|-------------|
| **A** | 116 | 29.7% | Excellent - rich, well-documented, regularly updated |
| **B** | 107 | 27.4% | Good - mostly complete, decent documentation |
| **C** | 30 | 7.7% | Usable - significant gaps but valuable fields |
| **D** | 7 | 1.8% | Sparse - many nulls, limited usability |
| **F** | 130 | 33.3% | Unusable - mostly empty or no API access |
| **Total** | **390** | | |

## Field Roles Distribution

| Role | Count | Pct | Usage |
|------|-------|-----|-------|
| **dimension** | 2215 | 49.3% | Group-by in reports (borough, category, status) |
| **measure** | 789 | 17.6% | Aggregatable numeric fields (count, sum, avg) |
| **date** | 316 | 7.0% | Time-series axis fields |
| **filter** | 390 | 8.7% | Text fields for filtering |
| **geo** | 206 | 4.6% | Geographic coordinates for maps |
| **exclude** | 574 | 12.8% | Empty, internal, or unusable fields |
| **Total** | **4490** | | |

## Top 20 Datasets for Report Builder Launch

| # | Dataset | Grade | Records | Fields | Frequency |
|---|---------|-------|---------|--------|-----------|
| 1 | Temps de parcours sur des segments routiers (histo | A | 9,470,791 | 8 | irregular |
| 2 | Géobase double - côtés de rue du réseau routier | A | 2,361,455 | 1 | weekly |
| 3 | Statistiques d'utilisation du site web de la Ville | A | 2,167,971 | 6 | daily |
| 4 | Imposition annuelle de taxes municipales | B | 1,890,978 | 17 | annual |
| 5 | Comptages des vélos sur les pistes cyclables | B | 1,870,506 | 6 | irregular |
| 6 | Ordres de travail émis pour la signalisation routi | B | 1,690,958 | 8 | daily |
| 7 | Mesure de l'impact des projets de verdissement sur | A | 1,605,120 | 8 | irregular |
| 8 | Géobase - pôles | A | 1,602,750 | 1 | weekly |
| 9 | Compteurs cyclistes permanents | A | 1,274,493 | 12 | daily |
| 10 | RSQA - indice de la qualité de l'air (historique) | A | 1,024,982 | 5 | daily |
| 11 | Élections municipales - Sections de vote par adres | B | 923,103 | 35 | irregular |
| 12 | Interventions des pompiers de Montréal | A | 908,486 | 11 | daily |
| 13 | Comptages des véhicules, cyclistes et piétons aux  | A | 837,600 | 30 | monthly |
| 14 | Vignettes de stationnement | A | 832,841 | 6 | weekly |
| 15 | Arbres publics sur le territoire de la Ville | A | 790,214 | 5 | monthly |
| 16 | Pluviométrie - mesure de la quantité de précipitat | B | 618,476 | 4 | quarterly |
| 17 | Rapport sur les activités de l'inspection des alim | B | 610,414 | 6 | monthly |
| 18 | Kilométrage réalisé par les voitures de métro | A | 559,549 | 14 | monthly |
| 19 | Mesures de niveaux acoustiques | A | 551,402 | 24 | asNeeded |
| 20 | Permis de construction, transformation et démoliti | A | 548,077 | 16 | weekly |

## Cross-Dataset Join Opportunities

| Join Key | Datasets | Sample |
|----------|----------|--------|
| **date** | 140 | firmes-a-rendement-insatisfaisant, rsqa-polluants-metaux, declarations-exterminations-punaises-de-lit, vues-aeriennes-de-montreal-1958-1975, vues-aeriennes-obliques-de-l-ile-de-montreal-1960-1992 |
| **coordinates** | 73 | pluviometre-localisation, velos-comptage, rsma-points-d-echantillonnage-qualo, genotoxicite-de-l-eau-de-surface-nov-2015, patrimoine-architectural-outremont-fiches-immeubles-inventaire-bisson |
| **borough** | 55 | bureaux-vote, ententes-reglement-metropole-mixte, portrait-camps-de-jour2013, rues-pietonnes, programme-inclusion-innovation2008-2014 |

## Category Files

| # | Category | Datasets | JSON | Markdown |
|---|----------|----------|------|----------|
| 01 | Agriculture et alimentation | 6 | [agriculture-alimentation.json](agriculture-alimentation.json) | [agriculture-alimentation.md](agriculture-alimentation.md) |
| 02 | Economie et entreprises | 9 | [economie-entreprises.json](economie-entreprises.json) | [economie-entreprises.md](economie-entreprises.md) |
| 03 | Education et recherche | 2 | [education-recherche.json](education-recherche.json) | [education-recherche.md](education-recherche.md) |
| 04 | Environnement, ressources naturelles et energie | 87 | [environnement-ressources-naturelles-energie.json](environnement-ressources-naturelles-energie.json) | [environnement-ressources-naturelles-energie.md](environnement-ressources-naturelles-energie.md) |
| 05 | Gouvernement et finances | 115 | [gouvernement-finances.json](gouvernement-finances.json) | [gouvernement-finances.md](gouvernement-finances.md) |
| 06 | Infrastructures | 95 | [infrastructures.json](infrastructures.json) | [infrastructures.md](infrastructures.md) |
| 07 | Loi, justice et securite publique | 22 | [loi-justice-securite-publique.json](loi-justice-securite-publique.json) | [loi-justice-securite-publique.md](loi-justice-securite-publique.md) |
| 08 | Politiques sociales | 16 | [politiques-sociales.json](politiques-sociales.json) | [politiques-sociales.md](politiques-sociales.md) |
| 09 | Sante | 6 | [sante.json](sante.json) | [sante.md](sante.md) |
| 10 | Societe et culture | 29 | [societe-culture.json](societe-culture.json) | [societe-culture.md](societe-culture.md) |
| 11 | Tourisme, sports et loisirs | 20 | [tourisme-sports-loisirs.json](tourisme-sports-loisirs.json) | [tourisme-sports-loisirs.md](tourisme-sports-loisirs.md) |
| 12 | Transport | 43 | [transport.json](transport.json) | [transport.md](transport.md) |
| 13 | Non categorise | 20 | [uncategorized.json](uncategorized.json) | [uncategorized.md](uncategorized.md) |

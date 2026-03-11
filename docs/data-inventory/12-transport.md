# 12. Transport
# Transport

> **Nombre de datasets**: 43
> **Catégorie portail**: `transport`
> **Généré le**: 2026-03-09 15:37

---

## Table des matières

1. [Arceaux à vélos](#vmtl-arceaux-velos)
2. [Bilan des estimations - Infrastructures (archives)](#vmtl-bilan-des-estimations-infrastructures)
3. [Bornes de recharge publiques pour voitures électriques](#vmtl-bornes-recharge-publiques)
4. [Collisions routières](#vmtl-collisions-routieres)
5. [Comptages des véhicules, cyclistes et piétons aux intersections munies de feux de circulation](#vmtl-comptage-vehicules-pietons)
6. [Comptages des vélos sur les pistes cyclables](#vmtl-velos-comptage)
7. [Compteurs cyclistes permanents](#vmtl-cyclistes)
8. [Cyclovias - Calendrier des activités](#vmtl-cyclovias)
9. [Déneigement des rues en arrondissements](#vmtl-deneigement)
10. [Déplacements MTL Trajet](#vmtl-mtl-trajet)
11. [Entraves et travaux en cours (anciennement Info-travaux)](#vmtl-info-travaux)
12. [Entraves à la circulation en temps réel](#vmtl-entraves-circulation)
13. [Espaces de stationnement des VNILSSA (véhicules non immatriculés en libre-service sans ancrage)](#vmtl-stationnements-vnilssa)
14. [Feux de circulation – Signaux sonores pour malvoyants](#vmtl-feux-malvoyants)
15. [Feux de circulation – emplacements toutes intersections](#vmtl-feux-tous)
16. [Feux de circulation – feux pour piétons](#vmtl-feux-pietons)
17. [Fréquentation des voies actives sécuritaires (VAS)](#vmtl-frequentation-voies-actives-securitaires)
18. [Géobase - pôles](#vmtl-geobase-pole)
19. [Géobase - réseau routier](#vmtl-geobase)
20. [Géobase double - côtés de rue du réseau routier](#vmtl-geobase-double)
21. [Horaires et positionnement des bus en temps réel (GTFS-realtime)](#vmtl-stm-bus-temps-reel-gtfs-realtime)
22. [Horaires planifiés et trajets des bus et du métro](#vmtl-stm-horaires-planifies-et-trajets-des-bus-et-du-metro)
23. [Images annotées extraites du flux vidéo des caméras de circulation (archives)](#vmtl-images-annotees-cameras-circulation)
24. [Incidents du réseau du métro](#vmtl-incidents-du-reseau-du-metro)
25. [Interventions de l'Escouade mobilité](#vmtl-interventions-escouade-mobilite)
26. [Kilométrage du budget d'exploitation du métro](#vmtl-stm-kilometrage-du-budget-d-exploitation-du-metro-de-la-stm)
27. [Kilométrage métro des périodes de service](#vmtl-stm-kilometrage-metro-des-periodes-de-service)
28. [Kilométrage réalisé par les voitures de métro](#vmtl-stm-kilometrage-realise-par-les-voitures-de-metro-de-la-stm)
29. [Remorquages de véhicules entravant les opérations de la Ville de Montréal](#vmtl-remorquages-de-vehicules-genants)
30. [Rues piétonnes et partagées](#vmtl-rues-pietonnes)
31. [Règlements relatifs à la circulation des véhicules lourds et des véhicules outils sur le territoire de l'agglomération de Montréal](#vmtl-camionnage-reglements)
32. [Réseau cyclable](#vmtl-pistes-cyclables)
33. [Réseau express vélo (REV)](#vmtl-reseau-express-velo)
34. [Segments routiers de collecte des temps de parcours](#vmtl-segments-routiers-de-collecte-des-temps-de-parcours)
35. [Signalisation (stationnement sur rue)](#vmtl-stationnement-sur-rue-signalisation-courant)
36. [Sondage - Expérimentation de mobilité autonome à Montréal](#vmtl-sondage-mobilite-autonome)
37. [Stationnements gratuits et payants (déneigement)](#vmtl-stationnements-deneigement)
38. [Temps de parcours sur des segments routiers (historique)](#vmtl-temps-de-parcours-sur-des-segments-routiers-historique)
39. [Tracés des lignes de bus et de métro](#vmtl-stm-traces-des-lignes-de-bus-et-de-metro)
40. [Trajets individuels à vélo enregistrés par Mon RésoVélo](#vmtl-trajets-individuels-velo-enregistre-mon-resovelo)
41. [Voies ferrées 3D](#vmtl-voies-ferrees-3d)
42. [Véhicules appartenant à la Ville de Montréal ou en location long terme](#vmtl-vehicules-appartenant-a-la-ville-de-montreal)
43. [Véhicules électriques et hybrides](#vmtl-vehicules-electriques-et-hybrides)

---

## Statistiques de la catégorie

| Métrique | Valeur |
|----------|--------|
| Datasets | 43 |
| Ressources totales | 157 |
| Ressources DataStore (requêtables via API) | 75 |
| Enregistrements totaux (DataStore) | 42,118,220 |

---

### Arceaux à vélos

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-arceaux-velos` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-arceaux-velos` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Arceau, SUM, Vélo |

**Description**: Géolocalisation des arceaux à vélos sur le territoire de la Ville de Montréal

**Formats disponibles**: CSV

#### Ressource: Arceaux à vélos (CSV)

- **Resource ID**: `78dd2f91-2e68-4b8b-bb4a-44c1ab5b79b6`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 746
- **Nombre de champs**: 27

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `INV_ID` | decimal | 🟢 | `1551304`, `1551305`, `1551306` |
| 2 | `INV_NO` | text | 🟢 | `INV-1551304`, `INV-1551305`, `INV-1551306` |
| 3 | `ANC_NUM` | text | 🟢 | `6133`, `6191`, `6190` |
| 4 | `INV_CATL_NO` | decimal | 🟢 | `1192`, `688`, `691` |
| 5 | `CATL_MODELE` | text | 🟢 | `24,08`, `24,03`, `24,06` |
| 6 | `MARQ` | text | 🟢 | `Support à bicyclettes à haute densité...`, `Support à bicyclettes à sécurité maxi...`, `Support à bicyclettes "parc-nature"` |
| 7 | `DATE_INSPECTION` | datetime | 🟡 | _vide_ |
| 8 | `CE_NO` | decimal | 🟢 | `61` |
| 9 | `ELEMENT` | text | 🟢 | `Support vélo SUV` |
| 10 | `CATEGORIE` | text | 🟢 | `Support vélo` |
| 11 | `COULEUR` | text | 🟢 | _vide_ |
| 12 | `MATERIAU` | text | 🟢 | _vide_ |
| 13 | `CONDITION` | text | 🟢 | _vide_ |
| 14 | `INTERVENTION` | text | 🟢 | _vide_ |
| 15 | `EMPL_X` | decimal | 🟢 | `271678.259`, `271912.038`, `271679.048` |
| 16 | `EMPL_Y` | decimal | 🟢 | `5036673.406`, `5035868.725`, `5036674.927` |
| 17 | `EMPL_Z` | decimal | 🟢 | `0` |
| 18 | `TERRITOIRE` | text | 🟢 | `6;` |
| 19 | `STATUT` | text | 🟢 | `Actif` |
| 20 | `BASE` | text | 🟢 | `NON` |
| 21 | `ANCRAGE` | text | 🟢 | _vide_ |
| 22 | `PARC` | text | 🟢 | `CAP-SAINT-JACQUES` |
| 23 | `AIRE` | text | 🟢 | _vide_ |
| 24 | `EMPL_ID` | decimal | 🟢 | `1542969`, `1542970`, `1542968` |
| 25 | `ORDRE_AFFICHAGE` | decimal | 🟢 | `2` |
| 26 | `LONG` | decimal | 🟢 | `-73.92358`, `-73.920547`, `-73.923591` |
| 27 | `LAT` | decimal | 🟢 | `45.469216`, `45.461973`, `45.469203` |

---

### Bilan des estimations - Infrastructures (archives)

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-bilan-des-estimations-infrastructures` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-bilan-des-estimations-infrastructures` |
| **Fréquence de mise à jour** | notPlanned |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Contrats, Estimations, SG, Soumissions |

**Description**: Tableau des appels d'offres ouverts en 2014 en travaux de construction et infrastructure. 
Bilan des estimations de coûts des travaux de construction.

**Formats disponibles**: CSV, XLS

#### Ressource: Bilan des estimations - Travaux de construction 2014 (XLS)

- **Resource ID**: `9f0a8e6f-8d50-4ea5-bd8c-b562be6122e2`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 11
- **Nombre de champs**: 10

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `4 Catégories 
Analyse de marché` | text | 🟢 | `Total Égout/Aqueduc`, `Pavage`, `Égout/Aqueduc` |
| 2 | `Soum.` | text | 🟢 | `258206.0`, `228004.0`, `233606.0` |
| 3 | `Nbs de soum.` | text | 🟢 | `3.0`, `2.0` |
| 4 | `Somme de Estimé de travaux (budget)
(A)` | decimal | 🟠 | `1050000` |
| 5 | `Somme de Estimé DEC ou EXT 'TOTAL (B)` | decimal | 🟢 | `1012078.62`, `3401697.41`, `10119817.18` |
| 6 | `Somme de Valeur de la soumission retenue
(C)` | decimal | 🟡 | `3362160.25`, `1742605.94`, `9877160.37` |
| 7 | `Somme de Moyenne des soumissions` | decimal | 🟠 | `3421593.28`, `11649269.91` |
| 8 | `Somme de % écart

(C-B)/B` | decimal | 🟡 | `0.7218088650069497`, `-0.011622773937438529`, `-0.02397837882680016` |
| 9 | `Somme de % écart

(moyenne-B)/B` | decimal | 🟠 | `0.15113442296395324`, `0.005848806522741141` |
| 10 | `Somme de % écart

(plus haute-B)/B` | decimal | 🟠 | `0.03901426964369525`, `0.3169992859495512` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `Somme de Moyenne des soumissions`: 54.5% null
- `Somme de % écart

(moyenne-B)/B`: 54.5% null
- `Somme de % écart

(plus haute-B)/B`: 54.5% null

#### Ressource: Historique des soumissions 2014 (CSV)

- **Resource ID**: `99ec28a4-5eca-4806-aa02-4c68cc4ff83a`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 90
- **Nombre de champs**: 22

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Soum.` | decimal | 🟠 | `214708`, `214707`, `286601` |
| 2 | `Date d'annonce` | decimal | 🟠 | `41617`, `41610` |
| 3 | `Date d'ouverture` | datetime | 🟠 | `2014-01-15T00:00:00` |
| 4 | `Mois de l'ouverture` | text | 🟢 | `janvier` |
| 5 | `No. GDD` | text | 🟢 | _vide_ |
| 6 | `Catégorie de travaux` | text | 🟢 | `Égout/Aqueduc`, `Trottoirs`, `Béton` |
| 7 | `4 Catégories 
Analyse de marché` | text | 🟢 | `Trottoirs`, `Pavage`, `Égout/Aqueduc` |
| 8 | `Nature de travaux` | text | 🟢 | `Reconstruction de la fondation et du ...`, `Reconstruction de conduites d’égout u...`, `Reconstruction d'un égout collecteur,...` |
| 9 | `Description` | text | 🟢 | `là où requis, dans les rues Ottawa, D...`, `Rue William, de la rue Dalhousie à la...`, `Piste cyclable de la Vérendrye du pon...` |
| 10 | `Arrondissement` | text | 🟢 | `Ville-Marie et Le Sud-Ouest`, `Rosemont ─ La Petite-Patrie`, `Verdun` |
| 11 | `Chargé de projet` | text | 🟢 | `Yoel Nessim`, `Louis Beauchemin`, `François Hubert` |
| 12 | `Estimé
DGPEC` | decimal | 🟠 | `22418726`, `1297011203`, `358990165` |
| 13 | `Estimé externe` | decimal | 🔴 | _vide_ |
| 14 | `Estimé DEC ou EXT 'TOTAL (B)` | decimal | 🟠 | `22418726`, `1297011203`, `358990165` |
| 15 | `Adjudicataire` | text | 🟢 | `*Hexagone`, `Entreprise J. Piccioni inc.`, `Michaudville` |
| 16 | `Valeur de la soumission retenue
(C)` | decimal | 🟠 | `4581000`, `1550047`, `1295370856` |
| 17 | `% écart

(C-B)/B` | decimal | 🟠 | `-31`, `0`, `28` |
| 18 | `Nbs de soum.` | decimal | 🟠 | `12`, `3`, `6` |
| 19 | `% écart

(moyenne-B)/B` | decimal | 🟠 | `8`, `51`, `19` |
| 20 | `% écart

(plus haute-B)/B` | decimal | 🟠 | `14`, `8`, `67` |
| 21 | `Moyenne des soumissions` | decimal | 🟠 | `540453591`, `1394561512`, `26639478` |
| 22 | `Plus haute soumission` | decimal | 🟠 | `373355`, `646694996`, `1474162929` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `Estimé externe`: 93.3% null

---

### Bornes de recharge publiques pour voitures électriques

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-bornes-recharge-publiques` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-bornes-recharge-publiques` |
| **Fréquence de mise à jour** | monthly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Réseau électrique, SCAEC, SUM, Véhicule électrique, Zéro émission, Électrique |

**Description**: Localisation des bornes de recharge publiques destinées aux véhicules électriques. Ces informations peuvent également être consultées sur la [carte interactive du Circuit électrique](https://lecircuitelectrique.com/fr/trouver-une-borne/).

**Formats disponibles**: CSV, GEOJSON, SHP

#### Ressource: Bornes de recharge publiques (CSV)

- **Resource ID**: `98ef3ed6-56ca-4d5e-a213-fd72066b18b5`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,299
- **Nombre de champs**: 10

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `NOM_BORNE_RECHARGE` | text | 🟢 | `CEA-10930`, `CEA-10941`, `CEA-12966` |
| 2 | `NOM_PARC` | text | 🟢 | `10080 | BHR  | ANJ | 8621 Avenue Chau...`, `10081 | BBHR | ANJ | 7800 Métropolita...`, `1008 | BSR | AC | 990 Salaberry` |
| 3 | `ADRESSE` | text | 🟢 | `8621 Avenue Chaumont Montréal QC H1K 1N3`, `7800 boul. Métropolitain Est Montréal...`, `990 Salaberry Montréal QC H3L 3L6` |
| 4 | `VILLE` | text | 🟢 | `Montréal` |
| 5 | `PROVINCE` | text | 🟢 | `QC` |
| 6 | `NIVEAU_RECHARGE` | text | 🟢 | `Niveau 2` |
| 7 | `MODE_TARIFICATION` | text | 🟢 | `par heure` |
| 8 | `TYPE_EMPLACEMENT` | text | 🟠 | `sur rue` |
| 9 | `LONGITUDE` | text | 🟢 | `-73.563324`, `-73.692268`, `-73.54809` |
| 10 | `LATITUDE` | text | 🟢 | `45.545777`, `45.610535`, `45.606483` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `TYPE_EMPLACEMENT`: 61.2% null

---

### Collisions routières

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-collisions-routieres` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-collisions-routieres` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Accident, Collision, SUM, Sécurité routière, Transport, Vision zéro |

**Description**: Liste des collisions survenues à Montréal depuis 2012.

Cet ensemble fait état des collisions impliquant au moins un véhicule motorisé circulant sur le réseau et qui ont fait l'objet d'un rapport de police.  Il inclut les éléments descriptifs, contextuels et la localisation des événements, dont la gravité exprimée en décès, blessures graves, blessures légères et dommages matériels seulement.

### IMPORTANT :

Le présent ensemble est un sous-ensemble de celui qui était mis en ligne par la  Société de l'assurance automobile du Québec (SAAQ) sur [Données Québec](https://www.donneesquebec.ca/recherche/fr/dataset/rapports-d-accident) avant décembre 2023.  Il contient l'ensemble des collisions recensées sur le territoire de Montréal, y compris celles dont les dommages matériels seulement (DMS) sont de moins de 2 000 $ comptabilisés par le Service de Police de la Ville de Montréal (SPVM), avec une géolocalisation compilée par la Ville à des fins d'analyses. Les données comptabilisées so

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: CSV, GEOJSON, PDF, SHP, WEB

#### Ressource: Collisions routières  (CSV)

- **Resource ID**: `05deae93-d9fc-4acb-9779-e0942b5e962f`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 218,272
- **Nombre de champs**: 68

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `NO_SEQ_COLL` | text | 🟢 | `SPVM _ 2012 _ 100`, `SPVM _ 2012 _ 1`, `SPVM _ 2012 _ 10` |
| 2 | `JR_SEMN_ACCDN` | text | 🟢 | `VE`, `ME`, `MA` |
| 3 | `DT_ACCDN` | datetime | 🟢 | `2012-02-24T00:00:00`, `2012-01-03T00:00:00`, `2012-02-01T00:00:00` |
| 4 | `CD_MUNCP` | decimal | 🟢 | `66142`, `66102`, `66023` |
| 5 | `NO_CIVIQ_ACCDN` | decimal | 🟠 | `3501`, `11800`, `38` |
| 6 | `SFX_NO_CIVIQ_ACCDN` | text | 🟢 | _vide_ |
| 7 | `BORNE_KM_ACCDN` | text | 🟢 | _vide_ |
| 8 | `RUE_ACCDN` | text | 🟢 | `TERR VILLE DE MTL`, `JACQUES BIZARD`, `ST CHARLES` |
| 9 | `TP_REPRR_ACCDN` | decimal | 🟠 | `1`, `2` |
| 10 | `ACCDN_PRES_DE` | text | 🟢 | `CHERRIER`, `STAT` |
| 11 | `NB_METRE_DIST_ACCD` | decimal | 🔴 | _vide_ |
| 12 | `CD_GENRE_ACCDN` | decimal | 🟢 | `31` |
| 13 | `CD_SIT_PRTCE_ACCDN` | decimal | 🔴 | _vide_ |
| 14 | `CD_ETAT_SURFC` | decimal | 🟡 | `16`, `12`, `11` |
| 15 | `CD_ECLRM` | decimal | 🟡 | `1`, `3` |
| 16 | `CD_ENVRN_ACCDN` | decimal | 🟢 | `1`, `3` |
| 17 | `NO_ROUTE` | decimal | 🔴 | _vide_ |
| 18 | `CD_CATEG_ROUTE` | decimal | 🟢 | `21`, `13` |
| 19 | `CD_ETAT_CHASS` | decimal | 🔴 | _vide_ |
| 20 | `CD_ASPCT_ROUTE` | decimal | 🟢 | `21`, `11` |
| 21 | `CD_LOCLN_ACCDN` | decimal | 🟡 | `40`, `33`, `32` |
| 22 | `CD_POSI_ACCDN` | decimal | 🔴 | _vide_ |
| 23 | `CD_CONFG_ROUTE` | decimal | 🟡 | `4`, `1`, `2` |
| 24 | `CD_ZON_TRAVX_ROUTR` | decimal | 🔴 | _vide_ |
| 25 | `CD_PNT_CDRNL_ROUTE` | text | 🟢 | _vide_ |
| 26 | `CD_PNT_CDRNL_REPRR` | text | 🟢 | `E` |
| 27 | `CD_COND_METEO` | decimal | 🟡 | `12`, `11` |
| 28 | `NB_VEH_IMPLIQUES_ACCDN` | decimal | 🟢 | `2` |
| 29 | `NB_MORTS` | decimal | 🟢 | `0` |
| 30 | `NB_BLESSES_GRAVES` | decimal | 🟢 | `0` |
| 31 | `NB_BLESSES_LEGERS` | decimal | ⚪ | `0` |
| 32 | `HEURE_ACCDN` | text | ⚪ | `Non précisé`, `15:00:00-15:59:00`, `02:00:00-02:59:00` |
| 33 | `AN` | decimal | ⚪ | `2012` |
| 34 | `NB_VICTIMES_TOTAL` | decimal | ⚪ | `0` |
| 35 | `GRAVITE` | text | ⚪ | `Dommages matériels inférieurs au seui...`, `Dommages matériels seulement` |
| 36 | `REG_ADM` | text | ⚪ | `Montréal(06)` |
| 37 | `MRC` | text | ⚪ | `Montréal (66 )` |
| 38 | `nb_automobile_camion_leger` | decimal | ⚪ | `1`, `2` |
| 39 | `nb_camionLourd_tractRoutier` | decimal | ⚪ | `0` |
| 40 | `nb_outil_equipement` | decimal | ⚪ | `0` |
| 41 | `nb_tous_autobus_minibus` | decimal | ⚪ | `0` |
| 42 | `nb_bicyclette` | decimal | ⚪ | `0` |
| 43 | `nb_cyclomoteur` | decimal | ⚪ | `0` |
| 44 | `nb_motocyclette` | decimal | ⚪ | `0` |
| 45 | `nb_taxi` | decimal | ⚪ | `0` |
| 46 | `nb_urgence` | decimal | ⚪ | `0` |
| 47 | `nb_motoneige` | decimal | ⚪ | `0` |
| 48 | `nb_VHR` | decimal | ⚪ | `0` |
| 49 | `nb_autres_types` | decimal | ⚪ | `0` |
| 50 | `nb_veh_non_precise` | decimal | ⚪ | `1`, `0` |
| 51 | `NB_DECES_PIETON` | decimal | ⚪ | `0` |
| 52 | `NB_BLESSES_PIETON` | decimal | ⚪ | `0` |
| 53 | `NB_VICTIMES_PIETON` | decimal | ⚪ | `0` |
| 54 | `NB_DECES_MOTO` | decimal | ⚪ | `0` |
| 55 | `NB_BLESSES_MOTO` | decimal | ⚪ | `0` |
| 56 | `NB_VICTIMES_MOTO` | decimal | ⚪ | `0` |
| 57 | `NB_DECES_VELO` | decimal | ⚪ | `0` |
| 58 | `NB_BLESSES_VELO` | decimal | ⚪ | `0` |
| 59 | `NB_VICTIMES_VELO` | decimal | ⚪ | `0` |
| 60 | `VITESSE_AUTOR` | decimal | ⚪ | `50` |
| 61 | `LOC_X` | decimal | ⚪ | `275759.079`, `275209.46185`, `276517.3795` |
| 62 | `LOC_Y` | decimal | ⚪ | `5035127.484`, `5038619.3752`, `5039027.153` |
| 63 | `LOC_COTE_QD` | text | ⚪ | `A`, `B` |
| 64 | `LOC_COTE_PD` | decimal | ⚪ | `4`, `1`, `3` |
| 65 | `LOC_DETACHEE` | text | ⚪ | `O`, `N` |
| 66 | `LOC_IMPRECISION` | text | ⚪ | `O`, `N` |
| 67 | `LOC_LONG` | decimal | ⚪ | `-73.878549`, `-73.861616`, `-73.871542` |
| 68 | `LOC_LAT` | decimal | ⚪ | `45.486871`, `45.490564`, `45.455505` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `NO_ROUTE`: 99.7% null
- `CD_ZON_TRAVX_ROUTR`: 97.8% null
- `CD_SIT_PRTCE_ACCDN`: 97.6% null
- `CD_POSI_ACCDN`: 77.5% null
- `CD_ETAT_CHASS`: 75.6% null
- `NB_METRE_DIST_ACCD`: 72.2% null
- `NO_CIVIQ_ACCDN`: 57.2% null

---

### Comptages des véhicules, cyclistes et piétons aux intersections munies de feux de circulation

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-comptage-vehicules-pietons` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-comptage-vehicules-pietons` |
| **Fréquence de mise à jour** | monthly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Circulation, Comptage, Feu de circulation, Feu tricolore, Intersection, Piéton, Véhicule, Vélo |

**Description**: Comptages des véhicules, cyclistes et piétons à la majorité des intersections munies de feux de circulation, ainsi que certaines intersections où l’installation de feux était à l’étude. Pour chacune de ces intersections, toutes situées dans les 19 arrondissements, le nombre de véhicules et de piétons a été relevé à différentes périodes d’une journée type. Les comptages peuvent parfois ne pas tenir compte de certains usagers (piétons, cyclistes, camions par exemple). À NOTER : depuis 2009, les relevés comprennent aussi le passage des cyclistes.

Les comptages furent réalisés dans le cadre de la mise aux normes des feux. Ce sont donc des comptages issus des services centraux et ils n'incluent pas les comptages faits par les arrondissements.

**Formats disponibles**: CSV, GEOJSON, ZIP

#### Ressource: Comptages des véhicules, cyclistes et piétons (3 dernières années) (CSV)

- **Resource ID**: `f82f00c0-baed-4fa1-8b01-6ed60146d102`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 309,400
- **Nombre de champs**: 30

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Id_Reference` | text | 🟢 | `11034`, `10906`, `10432` |
| 2 | `Id_Intersection` | text | 🟢 | `1269`, `1217`, `882` |
| 3 | `Nom_Intersection` | text | 🟢 | `Christophe-Colomb / Henri-Bourassa`, `Dudemaine / Élie-Blanchard`, `Denis-Papin / Saint-Michel` |
| 4 | `Date` | text | 🟢 | `2024-03-13`, `2025-02-11`, `2024-12-04` |
| 5 | `Periode` | text | 🟢 | `16:00:00`, `22:30:00`, `09:15:00` |
| 6 | `Heure` | text | 🟢 | `9`, `16`, `22` |
| 7 | `Minute` | text | 🟢 | `0`, `30`, `15` |
| 8 | `Seconde` | text | 🟢 | `0` |
| 9 | `Code_Banque` | text | 🟢 | `16`, `12`, `11` |
| 10 | `Description_Code_Banque` | text | 🟢 | `Velos`, `Bus`, `Camions articules` |
| 11 | `NBLT` | text | 🟢 | `0` |
| 12 | `NBT` | text | 🟢 | `0` |
| 13 | `NBRT` | text | 🟢 | `0` |
| 14 | `SBLT` | text | 🟢 | `0` |
| 15 | `SBT` | text | 🟢 | `0` |
| 16 | `SBRT` | text | 🟢 | `0` |
| 17 | `EBLT` | text | 🟢 | `0` |
| 18 | `EBT` | text | 🟢 | `0` |
| 19 | `EBRT` | text | 🟢 | `0` |
| 20 | `WBLT` | text | 🟢 | `0` |
| 21 | `WBT` | text | 🟢 | `0`, `1` |
| 22 | `WBRT` | text | 🟢 | `0` |
| 23 | `Approche_Nord` | text | 🟢 | `0` |
| 24 | `Approche_Sud` | text | 🟢 | `0` |
| 25 | `Approche_Est` | text | 🟢 | `0` |
| 26 | `Approche_Ouest` | text | 🟢 | `0` |
| 27 | `Localisation_X` | text | 🟢 | `292116.2935`, `289409.179`, `295313.6095` |
| 28 | `Localisation_Y` | text | 🟢 | `5043522.284`, `5046981.151`, `5047692.674` |
| 29 | `Longitude` | text | 🟢 | `-73.662479`, `-73.697049`, `-73.621535` |
| 30 | `Latitude` | text | 🟢 | `45.562626`, `45.531447`, `45.569079` |

#### Ressource: Comptages des véhicules, cyclistes et piétons (2023 à 2025) (CSV)

- **Resource ID**: `c34e0f58-8615-488b-92c2-46a518057be9`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 243,818
- **Nombre de champs**: 30

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Id_Reference` | text | 🟢 | `11034`, `10906`, `10432` |
| 2 | `Id_Intersection` | text | 🟢 | `1269`, `1217`, `882` |
| 3 | `Nom_Intersection` | text | 🟢 | `Christophe-Colomb / Henri-Bourassa`, `Dudemaine / Élie-Blanchard`, `Denis-Papin / Saint-Michel` |
| 4 | `Date` | text | 🟢 | `2024-03-13`, `2025-02-11`, `2024-12-04` |
| 5 | `Periode` | text | 🟢 | `16:00:00`, `22:30:00`, `09:15:00` |
| 6 | `Heure` | text | 🟢 | `9`, `16`, `22` |
| 7 | `Minute` | text | 🟢 | `0`, `30`, `15` |
| 8 | `Seconde` | text | 🟢 | `0` |
| 9 | `Code_Banque` | text | 🟢 | `16`, `12`, `11` |
| 10 | `Description_Code_Banque` | text | 🟢 | `Velos`, `Bus`, `Camions articules` |
| 11 | `NBLT` | text | 🟢 | `0` |
| 12 | `NBT` | text | 🟢 | `0`, `1` |
| 13 | `NBRT` | text | 🟢 | `0` |
| 14 | `SBLT` | text | 🟢 | `0` |
| 15 | `SBT` | text | 🟢 | `0`, `2` |
| 16 | `SBRT` | text | 🟢 | `0` |
| 17 | `EBLT` | text | 🟢 | `0` |
| 18 | `EBT` | text | 🟢 | `0` |
| 19 | `EBRT` | text | 🟢 | `0` |
| 20 | `WBLT` | text | 🟢 | `0` |
| 21 | `WBT` | text | 🟢 | `0`, `1` |
| 22 | `WBRT` | text | 🟢 | `0` |
| 23 | `Approche_Nord` | text | 🟢 | `0` |
| 24 | `Approche_Sud` | text | 🟢 | `0` |
| 25 | `Approche_Est` | text | 🟢 | `0` |
| 26 | `Approche_Ouest` | text | 🟢 | `0` |
| 27 | `Localisation_X` | text | 🟢 | `292116.2935`, `289409.179`, `295313.6095` |
| 28 | `Localisation_Y` | text | 🟢 | `5043522.284`, `5046981.151`, `5047692.674` |
| 29 | `Longitude` | text | 🟢 | `-73.662479`, `-73.697049`, `-73.621535` |
| 30 | `Latitude` | text | 🟢 | `45.562626`, `45.531447`, `45.569079` |

#### Ressource: Comptages des véhicules, cyclistes et piétons (2020 à 2022) (CSV)

- **Resource ID**: `c42c830f-cf4a-4637-8615-a6f6bf49ed36`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 274,177
- **Nombre de champs**: 30

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Id_Reference` | text | 🟢 | `8953` |
| 2 | `Id_Intersection` | text | 🟢 | `1161` |
| 3 | `Nom_Intersection` | text | 🟢 | `Henri-Bourassa / Papineau` |
| 4 | `Date` | text | 🟢 | `2020-01-28` |
| 5 | `Periode` | text | 🟢 | `04:00:00` |
| 6 | `Heure` | text | 🟢 | `4` |
| 7 | `Minute` | text | 🟢 | `0` |
| 8 | `Seconde` | text | 🟢 | `0` |
| 9 | `Code_Banque` | text | 🟢 | `0`, `10`, `11` |
| 10 | `Description_Code_Banque` | text | 🟢 | `Velos`, `Pietons`, `Autos` |
| 11 | `NBLT` | text | 🟢 | `0` |
| 12 | `NBT` | text | 🟢 | `0`, `24` |
| 13 | `NBRT` | text | 🟢 | `0`, `1`, `2` |
| 14 | `SBLT` | text | 🟢 | `0` |
| 15 | `SBT` | text | 🟢 | `0`, `1`, `33` |
| 16 | `SBRT` | text | 🟢 | `0`, `11` |
| 17 | `EBLT` | text | 🟢 | `0`, `2` |
| 18 | `EBT` | text | 🟢 | `1`, `0`, `2` |
| 19 | `EBRT` | text | 🟢 | `1`, `0` |
| 20 | `WBLT` | text | 🟢 | `0` |
| 21 | `WBT` | text | 🟢 | `0`, `1`, `13` |
| 22 | `WBRT` | text | 🟢 | `4`, `0` |
| 23 | `Approche_Nord` | text | 🟢 | `0` |
| 24 | `Approche_Sud` | text | 🟢 | `0`, `1` |
| 25 | `Approche_Est` | text | 🟢 | `0` |
| 26 | `Approche_Ouest` | text | 🟢 | `0` |
| 27 | `Localisation_X` | text | 🟢 | `292431.2223` |
| 28 | `Localisation_Y` | text | 🟢 | `5047826.517` |
| 29 | `Longitude` | text | 🟢 | `-73.65846786` |
| 30 | `Latitude` | text | 🟢 | `45.57024731` |

#### Ressource: Comptages des véhicules, cyclistes et piétons (2017 à 2019) (CSV)

- **Resource ID**: `344631f8-487a-4a33-ac29-be7d9ad06471`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 837,600
- **Nombre de champs**: 30

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Id_Reference` | decimal | 🟢 | `6457`, `6458` |
| 2 | `Id_Intersection` | decimal | 🟢 | `641` |
| 3 | `Nom_Intersection` | text | 🟢 | `Lorimier / Ontario` |
| 4 | `Date` | datetime | 🟢 | `2017-04-25T00:00:00`, `2017-04-26T00:00:00` |
| 5 | `Periode` | text | 🟢 | `05:15:00`, `05:30:00`, `05:00:00` |
| 6 | `Heure` | decimal | 🟢 | `5` |
| 7 | `Minute` | decimal | 🟢 | `0`, `30`, `15` |
| 8 | `Seconde` | decimal | 🟢 | `0` |
| 9 | `Code_Banque` | decimal | 🟢 | `1` |
| 10 | `Description_Code_Banque` | text | 🟢 | `Camions legers` |
| 11 | `NBLT` | decimal | 🟢 | `1`, `0` |
| 12 | `NBT` | decimal | 🟢 | `5`, `3`, `7` |
| 13 | `NBRT` | decimal | 🟢 | `0`, `1` |
| 14 | `SBLT` | decimal | 🟢 | `0` |
| 15 | `SBT` | decimal | 🟢 | `0` |
| 16 | `SBRT` | decimal | 🟢 | `0` |
| 17 | `EBLT` | decimal | 🟢 | `0` |
| 18 | `EBT` | decimal | 🟢 | `0` |
| 19 | `EBRT` | decimal | 🟢 | `0` |
| 20 | `WBLT` | decimal | 🟢 | `0` |
| 21 | `WBT` | decimal | 🟢 | `0`, `1`, `4` |
| 22 | `WBRT` | decimal | 🟢 | `1`, `0` |
| 23 | `Approche_Nord` | decimal | 🟢 | `0` |
| 24 | `Approche_Sud` | decimal | 🟢 | `0` |
| 25 | `Approche_Est` | decimal | 🟢 | `0` |
| 26 | `Approche_Ouest` | decimal | 🟢 | `0` |
| 27 | `Localisation_X` | decimal | 🟢 | `300317.895` |
| 28 | `Localisation_Y` | decimal | 🟢 | `5043130.094` |
| 29 | `Longitude` | decimal | 🟢 | `-73.557381` |
| 30 | `Latitude` | decimal | 🟢 | `45.528074` |

#### Ressource: Comptages des véhicules, cyclistes et piétons (2014 à 2016) (CSV)

- **Resource ID**: `14003bb3-6cba-4cb7-8e6d-0935a0ec186d`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 452,398
- **Nombre de champs**: 30

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Id_Reference` | decimal | 🟢 | `5591` |
| 2 | `Id_Intersection` | decimal | 🟢 | `8877` |
| 3 | `Nom_Intersection` | text | 🟢 | `boulevard Henri-Bourassa / avenue de ...` |
| 4 | `Date` | datetime | 🟢 | `2014-01-09T00:00:00` |
| 5 | `Periode` | text | 🟢 | `00:30:00`, `00:00:00`, `00:15:00` |
| 6 | `Heure` | decimal | 🟢 | `0`, `1` |
| 7 | `Minute` | decimal | 🟢 | `0`, `30`, `15` |
| 8 | `Seconde` | decimal | 🟢 | `0` |
| 9 | `Code_Banque` | decimal | 🟢 | `1` |
| 10 | `Description_Code_Banque` | text | 🟢 | `Camions legers` |
| 11 | `NBLT` | decimal | 🟢 | `0` |
| 12 | `NBT` | decimal | 🟢 | `0` |
| 13 | `NBRT` | decimal | 🟢 | `0` |
| 14 | `SBLT` | decimal | 🟢 | `0` |
| 15 | `SBT` | decimal | 🟢 | `0` |
| 16 | `SBRT` | decimal | 🟢 | `0` |
| 17 | `EBLT` | decimal | 🟢 | `0` |
| 18 | `EBT` | decimal | 🟢 | `0` |
| 19 | `EBRT` | decimal | 🟢 | `0` |
| 20 | `WBLT` | decimal | 🟢 | `0` |
| 21 | `WBT` | decimal | 🟢 | `0` |
| 22 | `WBRT` | decimal | 🟢 | `0` |
| 23 | `Approche_Nord` | decimal | 🟢 | `0` |
| 24 | `Approche_Sud` | decimal | 🟢 | `0` |
| 25 | `Approche_Est` | decimal | 🟢 | `0` |
| 26 | `Approche_Ouest` | decimal | 🟢 | `0` |
| 27 | `Localisation_X` | decimal | 🟢 | `293491.282` |
| 28 | `Localisation_Y` | decimal | 🟢 | `5050345.392` |
| 29 | `Longitude` | decimal | 🟢 | `-73.644943` |
| 30 | `Latitude` | decimal | 🟢 | `45.592922` |

#### Ressource: Comptages des véhicules, cyclistes et piétons (2011 à 2013) (CSV)

- **Resource ID**: `83f95a90-a505-4257-886d-c84aea7b14fa`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 229,472
- **Nombre de champs**: 30

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Id_Reference` | decimal | 🟢 | `1975`, `1976`, `1974` |
| 2 | `Id_Intersection` | decimal | 🟢 | `4864`, `561`, `2233` |
| 3 | `Nom_Intersection` | text | 🟢 | `avenue de l' Esplanade / rue Villeneuve`, `rue Jeanne-Mance / rue Villeneuve`, `Berri / Saint-Joseph` |
| 4 | `Date` | datetime | 🟢 | `2011-05-05T00:00:00`, `2011-03-15T00:00:00`, `2011-02-24T00:00:00` |
| 5 | `Periode` | text | 🟢 | `00:00:00`, `00:15:00` |
| 6 | `Heure` | decimal | 🟢 | `0` |
| 7 | `Minute` | decimal | 🟢 | `0`, `15` |
| 8 | `Seconde` | decimal | 🟢 | `0` |
| 9 | `Code_Banque` | decimal | 🟢 | `1` |
| 10 | `Description_Code_Banque` | text | 🟢 | `Camions legers` |
| 11 | `NBLT` | decimal | 🟢 | `0` |
| 12 | `NBT` | decimal | 🟢 | `0` |
| 13 | `NBRT` | decimal | 🟢 | `0` |
| 14 | `SBLT` | decimal | 🟢 | `0` |
| 15 | `SBT` | decimal | 🟢 | `0` |
| 16 | `SBRT` | decimal | 🟢 | `0` |
| 17 | `EBLT` | decimal | 🟢 | `0` |
| 18 | `EBT` | decimal | 🟢 | `0` |
| 19 | `EBRT` | decimal | 🟢 | `0` |
| 20 | `WBLT` | decimal | 🟢 | `0` |
| 21 | `WBT` | decimal | 🟢 | `0` |
| 22 | `WBRT` | decimal | 🟢 | `0` |
| 23 | `Approche_Nord` | decimal | 🟢 | `0` |
| 24 | `Approche_Sud` | decimal | 🟢 | `0` |
| 25 | `Approche_Est` | decimal | 🟢 | `0` |
| 26 | `Approche_Ouest` | decimal | 🟢 | `0` |
| 27 | `Localisation_X` | decimal | 🟢 | `297634.913`, `297681.812`, `298015.6545` |
| 28 | `Localisation_Y` | decimal | 🟢 | `5042182.075`, `5042109.575`, `5043056.9265` |
| 29 | `Longitude` | decimal | 🟢 | `-73.591714`, `-73.586854`, `-73.591115` |
| 30 | `Latitude` | decimal | 🟢 | `45.518868`, `45.519521`, `45.527397` |

#### Ressource: Comptages des véhicules, cyclistes et piétons (2008 à 2010) (CSV)

- **Resource ID**: `21f56a1e-8398-43a7-b8c3-f30625392014`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 212,000
- **Nombre de champs**: 30

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Id_Reference` | decimal | 🟢 | `725`, `732`, `726` |
| 2 | `Id_Intersection` | decimal | 🟢 | `3667`, `142`, `4253` |
| 3 | `Nom_Intersection` | text | 🟢 | `avenue Broadway / rue Sherbrooke`, `Côte-des-Neiges / Edouard-Montpetit`, `avenue Marien / rue Sherbrooke` |
| 4 | `Date` | datetime | 🟢 | `2008-03-18T00:00:00`, `2008-03-17T00:00:00`, `2008-04-02T00:00:00` |
| 5 | `Periode` | text | 🟢 | `06:00:00` |
| 6 | `Heure` | decimal | 🟢 | `6` |
| 7 | `Minute` | decimal | 🟢 | `0` |
| 8 | `Seconde` | decimal | 🟢 | `0` |
| 9 | `Code_Banque` | decimal | 🟢 | `1` |
| 10 | `Description_Code_Banque` | text | 🟢 | `Camions legers` |
| 11 | `NBLT` | decimal | 🟢 | `1`, `0` |
| 12 | `NBT` | decimal | 🟢 | `1`, `0` |
| 13 | `NBRT` | decimal | 🟢 | `1`, `0` |
| 14 | `SBLT` | decimal | 🟢 | `1`, `0` |
| 15 | `SBT` | decimal | 🟢 | `0`, `1`, `3` |
| 16 | `SBRT` | decimal | 🟢 | `1`, `0` |
| 17 | `EBLT` | decimal | 🟢 | `0`, `2` |
| 18 | `EBT` | decimal | 🟢 | `0`, `3`, `6` |
| 19 | `EBRT` | decimal | 🟢 | `0` |
| 20 | `WBLT` | decimal | 🟢 | `0`, `2` |
| 21 | `WBT` | decimal | 🟢 | `0`, `2` |
| 22 | `WBRT` | decimal | 🟢 | `0` |
| 23 | `Approche_Nord` | decimal | 🟢 | `0` |
| 24 | `Approche_Sud` | decimal | 🟢 | `0` |
| 25 | `Approche_Est` | decimal | 🟢 | `0` |
| 26 | `Approche_Ouest` | decimal | 🟢 | `0` |
| 27 | `Localisation_X` | decimal | 🟢 | `303552.214`, `303515.4`, `295084.662` |
| 28 | `Localisation_Y` | decimal | 🟢 | `5039709.046`, `5054847.35`, `5055098` |
| 29 | `Longitude` | decimal | 🟢 | `-73.516477`, `-73.516004`, `-73.62431` |
| 30 | `Latitude` | decimal | 🟢 | `45.635778`, `45.633522`, `45.497236` |

#### Ressource: Comptages des véhicules, cyclistes et piétons (2026 à 2028) (CSV)

- **Resource ID**: `c1447072-882a-4fec-878c-9dff4bc4b134`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 0
- **Nombre de champs**: 30

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Id_Reference` | text | ⚪ | _vide_ |
| 2 | `Id_Intersection` | text | ⚪ | _vide_ |
| 3 | `Nom_Intersection` | text | ⚪ | _vide_ |
| 4 | `Date` | text | ⚪ | _vide_ |
| 5 | `Periode` | text | ⚪ | _vide_ |
| 6 | `Heure` | text | ⚪ | _vide_ |
| 7 | `Minute` | text | ⚪ | _vide_ |
| 8 | `Seconde` | text | ⚪ | _vide_ |
| 9 | `Code_Banque` | text | ⚪ | _vide_ |
| 10 | `Description_Code_Banque` | text | ⚪ | _vide_ |
| 11 | `NBLT` | text | ⚪ | _vide_ |
| 12 | `NBT` | text | ⚪ | _vide_ |
| 13 | `NBRT` | text | ⚪ | _vide_ |
| 14 | `SBLT` | text | ⚪ | _vide_ |
| 15 | `SBT` | text | ⚪ | _vide_ |
| 16 | `SBRT` | text | ⚪ | _vide_ |
| 17 | `EBLT` | text | ⚪ | _vide_ |
| 18 | `EBT` | text | ⚪ | _vide_ |
| 19 | `EBRT` | text | ⚪ | _vide_ |
| 20 | `WBLT` | text | ⚪ | _vide_ |
| 21 | `WBT` | text | ⚪ | _vide_ |
| 22 | `WBRT` | text | ⚪ | _vide_ |
| 23 | `Approche_Nord` | text | ⚪ | _vide_ |
| 24 | `Approche_Sud` | text | ⚪ | _vide_ |
| 25 | `Approche_Est` | text | ⚪ | _vide_ |
| 26 | `Approche_Ouest` | text | ⚪ | _vide_ |
| 27 | `Localisation_X` | text | ⚪ | _vide_ |
| 28 | `Localisation_Y` | text | ⚪ | _vide_ |
| 29 | `Longitude` | text | ⚪ | _vide_ |
| 30 | `Latitude` | text | ⚪ | _vide_ |

---

### Comptages des vélos sur les pistes cyclables

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-velos-comptage` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-velos-comptage` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Comptage, Piste cyclable, SUM, Vélo |

**Description**: Nombre de passages calculé au quotidien

**Formats disponibles**: CSV

#### Ressource: Localisation des compteurs (CSV)

- **Resource ID**: `c7d0546a-a218-479e-bc9f-ce8f13ca972c`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 66
- **Nombre de champs**: 7

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID` | text | 🟢 | `100041114`, `100003032`, `100002880` |
| 2 | `Ancien_ID` | text | 🔴 | `6`, `3`, `10` |
| 3 | `Nom` | text | 🟢 | `Pont Jacques-Cartier`, `Eco-Display Parc Stanley`, `Berri1` |
| 4 | `Statut` | text | 🟢 | `Actif`, `En maintenance` |
| 5 | `Latitude` | decimal | 🟢 | `45.55759296561201`, `45.516216`, `45.5255082563413` |
| 6 | `Longitude` | text | 🟢 | `-73.67322198070093`, `-73.5544220271119`, `-73.56297` |
| 7 | `Annee_implante` | decimal | 🟢 | `2018`, `2011`, `2010` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `Ancien_ID`: 71.2% null

#### Ressource: Vélos - comptage sur les pistes cyclables, 2026 (CSV)

- **Resource ID**: `f3eab3d7-f313-42f1-a5f1-353e26fe5ff9`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 227,524
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `date` | text | 🟢 | `2026-01-01` |
| 2 | `heure` | text | 🟢 | `00:00:00` |
| 3 | `id_compteur` | text | 🟢 | `300021685`, `100054073`, `100003040` |
| 4 | `nb_passages` | text | 🟢 | `0` |
| 5 | `longitude` | text | 🟢 | `-73.544410`, `-73.590636`, `-73.613370` |
| 6 | `latitude` | text | 🟢 | `45.501270`, `45.631590`, `45.560713` |

#### Ressource: Vélos - comptage sur les pistes cyclables, 2025 (CSV)

- **Resource ID**: `607715d2-4bb9-4f8e-bd05-13365e241dc6`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,404,316
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `date` | text | 🟢 | `2025-01-01` |
| 2 | `heure` | text | 🟢 | `00:00:00` |
| 3 | `id_compteur` | text | 🟢 | `300021685`, `100054073`, `100003040` |
| 4 | `nb_passages` | text | 🟢 | `0`, `2` |
| 5 | `longitude` | text | 🟢 | `-73.544410`, `-73.590636`, `-73.613370` |
| 6 | `latitude` | text | 🟢 | `45.501270`, `45.631590`, `45.560713` |

#### Ressource:  Vélos - comptage sur les pistes cyclables, 2024 (CSV)

- **Resource ID**: `59ce7ec4-f398-43b5-9311-ebad77b782c3`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,626,015
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `date` | text | 🟢 | `2024-01-01` |
| 2 | `heure` | text | 🟢 | `00:00:00` |
| 3 | `id_compteur` | text | 🟢 | `300021685`, `100054073`, `100003040` |
| 4 | `nb_passages` | text | 🟢 | `0`, `1` |
| 5 | `longitude` | text | 🟢 | `-73.544410`, `-73.590636`, `-73.613370` |
| 6 | `latitude` | text | 🟢 | `45.501270`, `45.631590`, `45.560713` |

#### Ressource: Vélos - comptage sur les pistes cyclables, 2023 (CSV)

- **Resource ID**: `65a37da8-a7cf-4812-a3b5-5edff31c45f6`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,708,250
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `date` | text | 🟢 | `2023-01-01` |
| 2 | `heure` | text | 🟢 | `00:00:00` |
| 3 | `id_compteur` | text | 🟢 | `300021685`, `100054073`, `100003040` |
| 4 | `longitude` | text | 🟢 | `-73.544410`, `-73.590636`, `-73.613370` |
| 5 | `latitude` | text | 🟢 | `45.501270`, `45.631590`, `45.560713` |
| 6 | `nb_passages` | text | 🟢 | `0` |

#### Ressource: Vélos - comptage sur les pistes cyclables, 2022 (CSV)

- **Resource ID**: `fd3da18e-8f87-44e4-890b-30dff05c12b8`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,870,506
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `date` | text | 🟢 | `2022-01-01` |
| 2 | `heure` | text | 🟢 | `00:00:00` |
| 3 | `id_compteur` | text | 🟢 | `300021685`, `100054073`, `100003040` |
| 4 | `longitude` | text | 🟢 | `-73.544410`, `-73.590636`, `-73.613370` |
| 5 | `latitude` | text | 🟢 | `45.501270`, `45.631590`, `45.560713` |
| 6 | `nb_passages` | text | 🟢 | `0` |

#### Ressource: Vélos - comptage sur les pistes cyclables, 2021 (CSV)

- **Resource ID**: `b463fa29-8549-4664-ae68-b17ab604e0a5`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,791,818
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `date` | text | 🟢 | `2021-01-01` |
| 2 | `heure` | text | 🟢 | `00:00:00` |
| 3 | `id_compteur` | text | 🟢 | `100052606`, `100054073`, `100003040` |
| 4 | `longitude` | text | 🟢 | `-73.538819`, `-73.544410`, `-73.590636` |
| 5 | `latitude` | text | 🟢 | `45.555084`, `45.501270`, `45.560713` |
| 6 | `nb_passages` | text | 🟢 | `1`, `0` |

#### Ressource: Vélos - comptage sur les pistes cyclables, 2020 (CSV)

- **Resource ID**: `eec17749-1a50-47b2-bc4e-1960ddc09eff`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,506,877
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `date` | text | 🟢 | `2020-01-01` |
| 2 | `heure` | text | 🟢 | `00:00:00` |
| 3 | `id_compteur` | text | 🟢 | `100052606`, `100054073`, `100003040` |
| 4 | `longitude` | text | 🟢 | `-73.538819`, `-73.544410`, `-73.590636` |
| 5 | `latitude` | text | 🟢 | `45.555084`, `45.501270`, `45.560713` |
| 6 | `nb_passages` | text | 🟢 | `0`, `1` |

#### Ressource: Vélos - comptage sur les pistes cyclables, 2019 (CSV)

- **Resource ID**: `2cd0e082-f818-4014-9390-8e1c197ba806`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,019,862
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `date` | text | 🟢 | `2019-01-01` |
| 2 | `heure` | text | 🟢 | `00:00:00` |
| 3 | `id_compteur` | text | 🟢 | `100035408`, `100003032`, `100003040` |
| 4 | `longitude` | text | 🟢 | `-73.616683`, `-73.544410`, `-73.562970` |
| 5 | `latitude` | text | 🟢 | `45.501270`, `45.516216`, `45.543461` |
| 6 | `nb_passages` | text | 🟢 | `0` |

#### Ressource: Vélos - comptage sur les pistes cyclables, 2014 (CSV)

- **Resource ID**: `868b4bc8-ff55-4c48-ab3b-d80615445595`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 365
- **Nombre de champs**: 20

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Date` | datetime | 🟢 | `2014-01-02T00:00:00`, `2014-01-01T00:00:00`, `2014-01-03T00:00:00` |
| 2 | `Rachel / Papineau` | decimal | 🟢 | `73`, `21`, `43` |
| 3 | `Berri1` | decimal | 🟢 | `9`, `27`, `28` |
| 4 | `Maisonneuve_1` | decimal | 🟢 | `34`, `18`, `22` |
| 5 | `Maisonneuve_2` | decimal | 🟢 | `41`, `28`, `64` |
| 6 | `Brébeuf` | decimal | 🟢 | `0` |
| 7 | `Parc` | decimal | 🟢 | `14`, `32`, `22` |
| 8 | `PierDup` | decimal | 🟢 | `0`, `3`, `2` |
| 9 | `CSC (Côte Sainte-Catherine)` | decimal | 🟢 | `0` |
| 10 | `Pont_Jacques_Cartier` | text | 🟢 | _vide_ |
| 11 | `Totem_Laurier` | decimal | 🟢 | `115`, `77`, `179` |
| 12 | `Notre-Dame` | decimal | 🟢 | `5`, `6`, `2` |
| 13 | `Rachel / Hôtel de Ville` | decimal | 🟢 | `27`, `8`, `18` |
| 14 | `Saint-Antoine` | decimal | 🟢 | `0` |
| 15 | `René-Lévesque` | decimal | 🟢 | `9`, `14`, `16` |
| 16 | `Viger` | decimal | 🟢 | `1`, `13`, `4` |
| 17 | `Boyer` | decimal | 🟢 | `1`, `6`, `4` |
| 18 | `Maisonneuve_3` | decimal | 🟢 | `9`, `3`, `18` |
| 19 | `University` | decimal | 🟢 | `32`, `6`, `22` |
| 20 | `Saint-Urbain` | decimal | 🔴 | _vide_ |

**⚠️ Champs avec >50% de valeurs nulles:**
- `Saint-Urbain`: 86.6% null

#### Ressource: Vélos - comptage sur les pistes cyclables, 2013 (CSV)

- **Resource ID**: `ec12447d-6b2a-45d0-b0e7-fd69c382e368`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 365
- **Nombre de champs**: 19

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Date` | datetime | 🟢 | `2013-01-02T00:00:00`, `2013-01-01T00:00:00`, `2013-01-03T00:00:00` |
| 2 | `Rachel / Papineau` | decimal | 🟢 | `1`, `0`, `2` |
| 3 | `Berri1` | decimal | 🟢 | `69`, `0`, `80` |
| 4 | `Maisonneuve_1` | decimal | 🟢 | `1`, `21`, `13` |
| 5 | `Maisonneuve_2` | decimal | 🟢 | `0`, `6`, `4` |
| 6 | `Brébeuf` | decimal | 🔴 | _vide_ |
| 7 | `Parc` | decimal | 🟢 | `22`, `6`, `18` |
| 8 | `PierDup` | decimal | 🟢 | `0`, `1` |
| 9 | `CSC (Côte Sainte-Catherine)` | decimal | 🟢 | `0`, `4`, `2` |
| 10 | `Pont_Jacques_Cartier` | text | 🟢 | _vide_ |
| 11 | `Totem_Laurier` | decimal | 🟡 | _vide_ |
| 12 | `Notre-Dame` | decimal | 🔴 | _vide_ |
| 13 | `Rachel / Hôtel de Ville` | decimal | 🔴 | _vide_ |
| 14 | `Saint-Antoine` | decimal | 🟡 | _vide_ |
| 15 | `René-Lévesque` | decimal | 🔴 | _vide_ |
| 16 | `Viger` | decimal | 🔴 | _vide_ |
| 17 | `Boyer` | decimal | 🔴 | _vide_ |
| 18 | `Maisonneuve_3` | decimal | 🔴 | _vide_ |
| 19 | `University` | decimal | 🔴 | _vide_ |

**⚠️ Champs avec >50% de valeurs nulles:**
- `Maisonneuve_3`: 83.8% null
- `René-Lévesque`: 83.6% null
- `Viger`: 83.6% null
- `Boyer`: 83.6% null
- `University`: 83.6% null
- `Brébeuf`: 80.5% null
- `Rachel / Hôtel de Ville`: 80.0% null
- `Notre-Dame`: 79.7% null

#### Ressource: Vélos - comptage sur les pistes cyclables, 2011 (CSV)

- **Resource ID**: `f2e43419-ebb2-4e38-80b6-0644c8344338`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 365
- **Nombre de champs**: 10

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Date` | datetime | 🟢 | `2011-01-01T00:00:00`, `2011-02-01T00:00:00`, `2011-03-01T00:00:00` |
| 2 | `Rachel / Papineau` | text | 🟢 | `85`, `124`, `242` |
| 3 | `Berri1` | decimal | 🟢 | `95`, `150`, `81` |
| 4 | `Maisonneuve_2` | decimal | 🟢 | `169`, `329`, `110` |
| 5 | `Maisonneuve_1` | decimal | 🟢 | `62`, `115`, `79` |
| 6 | `Brébeuf` | decimal | 🟢 | `0` |
| 7 | `Parc` | decimal | 🟢 | `205`, `41`, `68` |
| 8 | `PierDup` | decimal | 🟢 | `0`, `3`, `6` |
| 9 | `CSC (Côte Sainte-Catherine)` | decimal | 🟢 | `5`, `21`, `30` |
| 10 | `Pont_Jacques_Cartier` | decimal | 🔴 | _vide_ |

**⚠️ Champs avec >50% de valeurs nulles:**
- `Pont_Jacques_Cartier`: 87.9% null

#### Ressource: Vélos - comptage sur les pistes cyclables, 2010 (CSV)

- **Resource ID**: `f23e1c88-cd04-467f-a64a-48f5eb1b6c9e`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 365
- **Nombre de champs**: 9

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Date` | datetime | 🟢 | `2010-02-01T00:00:00`, `2010-01-01T00:00:00`, `2010-03-01T00:00:00` |
| 2 | `Rachel / Papineau` | text | 🔴 | _vide_ |
| 3 | `Berri1` | decimal | 🟢 | `36`, `28`, `39` |
| 4 | `Maisonneuve_1` | decimal | 🟢 | `17`, `24`, `22` |
| 5 | `Maisonneuve_2` | decimal | 🟢 | `56`, `37`, `47` |
| 6 | `Brébeuf` | decimal | 🟢 | `0` |
| 7 | `Parc` | decimal | 🔴 | _vide_ |
| 8 | `CSC (Côte Sainte-Catherine)` | decimal | 🔴 | _vide_ |
| 9 | `PierDup` | decimal | 🔴 | _vide_ |

**⚠️ Champs avec >50% de valeurs nulles:**
- `PierDup`: 76.7% null
- `Parc`: 76.2% null
- `CSC (Côte Sainte-Catherine)`: 75.9% null
- `Rachel / Papineau`: 75.3% null

---

### Compteurs cyclistes permanents

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-cyclistes` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-cyclistes` |
| **Fréquence de mise à jour** | daily |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Comptage, Compteur, SUM, circulation, piste cyclable, vélo |

**Description**: Les jeux de données analysés proviennent de détecteurs de comptage vélo installés sur différents sites par le SUM -DIGD. Ces capteurs enregistrent le nombre de passages de cyclistes à chaque minute, permettant une observation fine de la fréquentation. Sur certains emplacements, les détecteurs fournissent également des données de vitesse, enrichissant l’analyse comportementale. 

Afin de faciliter l’interprétation et de dégager des tendances, les données brutes sont agrégées de plusieurs façons :
### 
* -15min
* -1hr
* -quotidien
* -mensuel
* -annuel 

Cette méthodologie permet de suivre l’évolution du trafic cycliste, d’identifier les variations saisonnières et d’évaluer l’impact d’aménagements ou d’événements spécifiques. L’agrégation est réalisée à l’aide de traitements automatisés, garantissant la cohérence des séries temporelles et la qualité des analyses.

**Formats disponibles**: CSV

#### Ressource: Cyclistes CSV (CSV)

- **Resource ID**: `a8e463ab-d334-4714-81d5-8da0310d80c0`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,274,493
- **Nombre de champs**: 12

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `agg_code` | text | 🟢 | `d` |
| 2 | `instance` | text | 🟢 | `det-00077-01` |
| 3 | `longitude` | text | 🟢 | `-73.63901615` |
| 4 | `latitude` | text | 🟢 | `45.488279` |
| 5 | `arrondissement` | text | 🟢 | `Côte-des-Neiges–Notre-Dame-de-Grâce` |
| 6 | `rue_1` | text | 🟢 | `Bourret` |
| 7 | `rue_2` | text | 🟢 | `Décarie inter. Est` |
| 8 | `numeroVoie` | text | 🟢 | `1` |
| 9 | `direction` | text | 🟢 | `Ouest` |
| 10 | `periode` | text | 🟢 | `2025-11-06 00:00:00-05`, `2025-11-04 00:00:00-05`, `2025-11-05 00:00:00-05` |
| 11 | `volume` | text | 🟢 | `63`, `140`, `134` |
| 12 | `vitesseMoyenne` | text | 🔴 | `17.19402985074627`, `15.664285714285716`, `16.714285714285715` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `vitesseMoyenne`: 73.8% null

---

### Cyclovias - Calendrier des activités

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-cyclovias` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-cyclovias` |
| **Fréquence de mise à jour** | annual |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Calendrier, Piéton, SGPMRS, Transport actif, Vélo, Événement |

**Description**: Cyclovia est avant tout un événement rassembleur, gratuit et récurrent permettant aux usagers de se promener en vélo, en patins ou à pied. Il s'agit d'un ensemble d'activités durant lesquelles les rues sont fermées à la circulation automobile au profit des cyclistes. Cet ensemble de données contient un calendrier des événements Cyclovias qui se déroulent sur le territoire montréalais.

**Formats disponibles**: CSV

#### Ressource: Événements cyclovias (CSV)

- **Resource ID**: `59a1c97d-441c-45c8-9327-321044dc07a4`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 118
- **Nombre de champs**: 5

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `TITRE` | text | 🟢 | `Cyclovia du Sud-Ouest`, `Cyclovia du Parc Jean-Drapeau`, `Cyclovia de la voie Camilien-Houde` |
| 2 | `DATE` | text | 🟢 | `2021-06-20`, `2021-06-27`, `2021-06-23` |
| 3 | `ARRONDISSEMENT_ORGANISATION` | text | 🟢 | `Parc Jean-Drapeau`, `Ville-Marie`, `Le Sud-Ouest` |
| 4 | `PARCOURS_KM` | text | 🟢 | `2.2`, `4.4`, `2` |
| 5 | `TYPE_CYCLOVIA` | text | 🟢 | `Festive`, `Sportive` |

---

### Déneigement des rues en arrondissements

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-deneigement` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-deneigement` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | 311 Montréal, Arr., Arrondissement, Déneigement |

**Description**: API permettant de récupérer les données sur la planification du chargement de la neige suite à une tempête. L'API est sécurisé et requiert un jeton. Pour obtenir un jeton, les développeurs doivent transmettre un courriel à [donneesouvertes@montreal.ca](mailto:donneesouvertes@montreal.ca).

*La signalisation en vigueur dans les rues pour le stationnement en période de chargement de la neige prévaut toujours sur les données transmises par l'API.*

**Formats disponibles**: PDF, XML

---

### Déplacements MTL Trajet

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-mtl-trajet` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-mtl-trajet` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Déplacement, MTL Trajet, Piéton, SUM, Trajet, Transport, Transport en commun, Vélo |

**Description**: Dans un contexte de chantiers nombreux, Montréal a déployé tous les efforts nécessaires pour améliorer la mobilité des usagers, tous modes de transport confondu. L’application [MTL Trajet](https://ville.montreal.qc.ca/mtltrajet/) est l’une des nombreuses mesures mises de l’avant afin de mieux comprendre et faciliter les déplacements à Montréal.

Le présent ensemble contient les données filtrées recueillies lors de cette étude. Les données sont divisées sous deux jeux différents pour offrir le maximum de données sans pour autant compromettre la confidentialité des utilisateurs de l'application MTL Trajet.

__Points__

Le jeu de données “points_mtl_trajet” comprend chacun des points, possédant une qualité de positionnement acceptable, recueilli lors de l’enquête sur les déplacements MTL Trajet. Ces points ont été traités et filtrés pour y enlever tous les éléments sensibles sur un utilisateur.

__Trajets__ 

Ce fichier comprend chacun des trajets obtenus à l’aide des données fi

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: GEOJSON, SHP

---

### Entraves et travaux en cours (anciennement Info-travaux)

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-info-travaux` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-info-travaux` |
| **Fréquence de mise à jour** | daily |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Chantier, Circulation, Entrave, Info-travaux, SCAEC, Travaux |

**Description**: Renseignements sur la nature, la durée ainsi que sur les entraves qu'occasionnent les travaux en cours des grands chantiers sur le réseau routier de la Ville de Montréal.

**Formats disponibles**: CSV, JSON

#### Ressource: Entraves et travaux en cours (CSV)

- **Resource ID**: `cc41b532-f12d-40fb-9f55-eb58c9a2b12b`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,115
- **Nombre de champs**: 43

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `id` | text | 🟢 | `6722842681073d0019ed46ca`, `6740a6236669d60012e1746b`, `66858b3b36fb47001994a9ac` |
| 2 | `permit_permit_id` | text | 🟢 | `OCC-2411YW18727818`, `OCC-2410IP26341911`, `OCC-2407DB02432206` |
| 3 | `contractnumber` | text | 🔴 | `1234`, `240575 - C`, `15881` |
| 4 | `boroughid` | text | 🟢 | `Ville-Marie`, `Montréal-Nord`, `Verdun` |
| 5 | `permitcategory` | text | 🟢 | `Travaux` |
| 6 | `currentstatus` | text | 🟢 | `Permis émis` |
| 7 | `duration_start_date` | text | 🟢 | `2024-10-30T20:00:00Z`, `2024-11-24T19:00:00Z`, `2024-07-07T20:00:00Z` |
| 8 | `duration_end_date` | text | 🟢 | `2027-11-12T18:59:59Z`, `2027-10-30T19:59:59Z`, `2026-07-17T19:59:59Z` |
| 9 | `reason_category` | text | 🟢 | `Autre`, `Construction/rénovation sans excavation` |
| 10 | `occupancy_name` | text | 🟢 | `Parc Duquette`, `Henri-Bourassa entre J.-J.-Gagnier et...`, `Gordon entre Wellington et Verdun` |
| 11 | `submittercategory` | text | 🟢 | `Entreprise`, `Organisation publique ou son sous-tra...`, `Entrepreneur sous contrat avec la Vil...` |
| 12 | `organizationname` | text | 🟡 | `MGB Associés Inc.`, `Magil Construction est du Canada inc.`, `PME MTL Grand Sud-Ouest` |
| 13 | `duration_days_mon_active` | text | 🟢 | `t` |
| 14 | `duration_days_mon_all_day_round` | text | 🟢 | `t` |
| 15 | `duration_days_tue_active` | text | 🟢 | `t` |
| 16 | `duration_days_tue_all_day_round` | text | 🟢 | `t` |
| 17 | `duration_days_wed_active` | text | 🟢 | `t` |
| 18 | `duration_days_wed_all_day_round` | text | 🟢 | `t` |
| 19 | `duration_days_thu_active` | text | 🟢 | `t` |
| 20 | `duration_days_thu_all_day_round` | text | 🟢 | `t` |
| 21 | `duration_days_fri_active` | text | 🟢 | `t` |
| 22 | `duration_days_fri_all_day_round` | text | 🟢 | `t` |
| 23 | `duration_days_sat_active` | text | 🟢 | `t` |
| 24 | `duration_days_sat_all_day_round` | text | 🟢 | `t` |
| 25 | `duration_days_sun_active` | text | 🟢 | `t` |
| 26 | `duration_days_sun_all_day_round` | text | 🟢 | `t` |
| 27 | `duration_days_sat_start_time` | text | 🔴 | _vide_ |
| 28 | `duration_days_sat_end_time` | text | 🔴 | _vide_ |
| 29 | `duration_days_mon_start_time` | text | 🟠 | _vide_ |
| 30 | `duration_days_mon_end_time` | text | 🟠 | _vide_ |
| 31 | `duration_days_tue_start_time` | text | ⚪ | _vide_ |
| 32 | `duration_days_tue_end_time` | text | ⚪ | _vide_ |
| 33 | `duration_days_wed_start_time` | text | ⚪ | _vide_ |
| 34 | `duration_days_wed_end_time` | text | ⚪ | _vide_ |
| 35 | `duration_days_thu_start_time` | text | ⚪ | _vide_ |
| 36 | `duration_days_thu_end_time` | text | ⚪ | _vide_ |
| 37 | `duration_days_fri_start_time` | text | ⚪ | _vide_ |
| 38 | `duration_days_fri_end_time` | text | ⚪ | _vide_ |
| 39 | `duration_days_sun_start_time` | text | ⚪ | _vide_ |
| 40 | `duration_days_sun_end_time` | text | ⚪ | _vide_ |
| 41 | `load_date` | text | ⚪ | `2024-11-02T00:01:24Z`, `2024-11-24T00:01:25Z`, `2024-10-29T19:06:02Z` |
| 42 | `longitude` | text | ⚪ | `-73.56810097062612`, `-73.57532216878346`, `-73.65066134966027` |
| 43 | `latitude` | text | ⚪ | `45.46104407577799`, `45.465649419534`, `45.582496632261645` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `duration_days_sat_start_time`: 96.8% null
- `duration_days_sat_end_time`: 96.8% null
- `contractnumber`: 77.3% null
- `duration_days_mon_start_time`: 53.3% null
- `duration_days_mon_end_time`: 53.3% null

#### Ressource: Impacts des entraves et travaux en cours (CSV)

- **Resource ID**: `a2bc8014-488c-495d-941b-e7ae1999d1bd`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,173
- **Nombre de champs**: 19

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `id_request` | text | 🟢 | `66e4405d1e0e0e00190091f4`, `6931e288dee8ef00126493f0`, `6933012edee8ef001264a7d5` |
| 2 | `streetid` | text | 🟢 | `rue Alexandre-DeSève`, `boulevard Édouard-Montpetit`, `rue Ontario Est` |
| 3 | `streetimpactwidth` | text | 🟢 | `9-12 mètres`, `0-3 mètres` |
| 4 | `streetimpacttype` | text | 🟢 | `Voie de stationnement obstruée`, `Voie de stationnement et voie de circ...` |
| 5 | `nbfreeparkingplace` | text | 🟢 | `0`, `10` |
| 6 | `sidewalk_blockedtype` | text | 🟢 | `Aucun impact / non applicable`, `Obstrué (un passage piéton de 1,5 m e...` |
| 7 | `backsidewalk_blockedtype` | text | 🟢 | `Aucun impact / non applicable`, `Obstrué` |
| 8 | `bikepath_blockedtype` | text | 🟢 | `Aucun impact / non applicable`, `Barrée` |
| 9 | `name` | text | 🟢 | `rue Alexandre-DeSève`, `boulevard Édouard-Montpetit`, `rue Ontario Est` |
| 10 | `shortname` | text | 🟢 | `Édouard-Montpetit`, `Ontario`, `Alexandre-DeSève` |
| 11 | `fromname` | text | 🟢 | `avenue Viger Est`, `avenue Vincent-d'Indy`, `rue Saint-Christophe` |
| 12 | `fromshortname` | text | 🟢 | `Viger`, `Saint-Christophe`, `Vincent-d'Indy` |
| 13 | `toname` | text | 🟢 | `avenue de Stirling`, `rue Amherst`, `boulevard René-Lévesque Est` |
| 14 | `toshortname` | text | 🟢 | `Stirling`, `Amherst`, `René-Lévesque` |
| 15 | `length` | text | 🟢 | `359.78`, `211.54`, `185.72` |
| 16 | `isarterial` | text | 🟢 | `f`, `t` |
| 17 | `stmimpact_blockedtype` | text | 🟢 | `Aucun impact / non applicable` |
| 18 | `otherproviderimpact_blockedtype` | text | 🟢 | `Aucun impact / non applicable` |
| 19 | `reservedlane_blockedtype` | text | 🟢 | `Aucun impact / non applicable` |

---

### Entraves à la circulation en temps réel

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-entraves-circulation` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-entraves-circulation` |
| **Fréquence de mise à jour** | continuous |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | SUM, circulation, entrave, mobilité |

**Description**: Entraves à la circulation sur le réseau routier de la Ville de Montréal mises à jour en temps réel et normalisées selon le standard CIFS. Les données sont saisies par des équipes de la Ville. Ces données permettent la prise de décision en temps réel en connaissance de l’état du réseau.

**Formats disponibles**: JSON, XML

---

### Espaces de stationnement des VNILSSA (véhicules non immatriculés en libre-service sans ancrage)

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-stationnements-vnilssa` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-stationnements-vnilssa` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Mobilité, SUM, Stationnement, Transport, Trottinette, Vélo |

**Description**: Cet ensemble de données présente la localisation géographique des espaces de stationnement autorisés pour les véhicules non immatriculés en libre-service sans ancrage (VNILSSA) sur le territoire de la Ville de Montréal.

**Formats disponibles**: CSV

#### Ressource: Espaces de stationnement des véhicules non immatriculés en libre service sans ancrage (CSV)

- **Resource ID**: `115a8d97-c37a-4a7e-bebb-7534809a11ff`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 423
- **Nombre de champs**: 10

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `Rue` | text | 🟢 | `Mile End`, `Entrée Principale Stade`, `Gary-Carter` |
| 3 | `Intersection` | text | 🟢 | `Arrière Trottoir`, `Devant Les Bornes D'Incendies`, `Gary-Carter` |
| 4 | `Orientation` | text | 🟢 | `Côté Sud Bi`, `Nord-Est`, `Sud-Est` |
| 5 | `Arrondissement` | text | 🟢 | `Villeray–Saint-Michel–Parc-Extension` |
| 6 | `Type d'espace` | text | 🟢 | `Sur rue à +5m`, `Sur trottoir près des supports à vélo`, `Dégagement de 5m` |
| 7 | `Latitude` | decimal | 🟢 | `45.534183`, `45.536122`, `45.535475` |
| 8 | `Longitude` | decimal | 🟢 | `-73.623679`, `-73.622312`, `-73.622658` |
| 9 | `X` | decimal | 🟢 | `295247.40105537`, `295140.30603922`, `295220.26851061` |
| 10 | `Y` | decimal | 🟢 | `5043814.88171208`, `5043958.34076755`, `5044030.20137971` |

---

### Feux de circulation – Signaux sonores pour malvoyants

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-feux-malvoyants` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-feux-malvoyants` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Accessibilité, Feu de circulation, Feu sonore, Feu tricolore, Intersection, Malvoyant, Piéton, SUM, Signalisation, Traverse |

**Description**: Ce fichier contient l’emplacement de tous les feux de circulation gérés par la Ville de Montréal dont au moins une traverse est munie d’un feu sonore pour malvoyants.

**Formats disponibles**: CSV, GEOJSON, SHP

#### Ressource: Feux sonores pour les personnes malvoyantes (CSV)

- **Resource ID**: `7bb553f2-6c9c-442e-b426-09fdab4c61d9`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 316
- **Nombre de champs**: 10

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `INT_NO` | text | 🟢 | `50`, `53`, `49` |
| 2 | `RUE_1` | text | 🟢 | `Girouard`, `Elmhurst`, `Grand Boulevard` |
| 3 | `RUE_2` | text | 🟢 | `Monkland`, `Saint-Jacques`, `Sherbrooke` |
| 4 | `NO_ARRONDISSEMENT` | text | 🟢 | `7` |
| 5 | `ARRONDISSEMENT` | text | 🟢 | `Côte-des-Neiges - Notre-Dame-de-Grâce` |
| 6 | `PERMANENT_OU_TEMPORAIRE` | text | 🟢 | `Permanent` |
| 7 | `LOC_X` | text | 🟢 | `294066.935`, `296044.392`, `295287.251` |
| 8 | `LOC_Y` | text | 🟢 | `5034838.004`, `5036962.386`, `5037445.335` |
| 9 | `Longitude` | text | 🟢 | `-73.637226`, `-73.621674`, `-73.611981` |
| 10 | `Latitude` | text | 🟢 | `45.45339`, `45.476869`, `45.472533` |

---

### Feux de circulation – emplacements toutes intersections

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-feux-tous` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-feux-tous` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Circulation, Coordonnées géoréférencées, Feu, Feu tricolor, Intersection, SUM, Signalisation |

**Description**: Ce fichier contient l’emplacement de tous les feux de circulation gérés par la Ville de Montréal. Le fichier contient le numéro de référence de l’intersection où se situe le feu, le nom des deux rues qui forment l’intersection et les coordonnées géographiques du point central de l’intersection.

**Formats disponibles**: CSV, GEOJSON, SHP

#### Ressource: Feux de circulation (CSV)

- **Resource ID**: `e69f6f40-8241-4f21-b104-b2091d1cf122`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,347
- **Nombre de champs**: 10

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `INT_NO` | text | 🟢 | `50`, `51`, `49` |
| 2 | `RUE_1` | text | 🟢 | `Girouard`, `Elmhurst` |
| 3 | `RUE_2` | text | 🟢 | `Notre-Dame-de-Grâce`, `Monkland`, `Saint-Jacques` |
| 4 | `NO_ARRONDISSEMENT` | text | 🟢 | `7` |
| 5 | `ARRONDISSEMENT` | text | 🟢 | `Côte-des-Neiges - Notre-Dame-de-Grâce` |
| 6 | `PERMANENT_OU_TEMPORAIRE` | text | 🟢 | `Permanent` |
| 7 | `LOC_X` | text | 🟢 | `294066.935`, `295621.009`, `295287.251` |
| 8 | `LOC_Y` | text | 🟢 | `5037231.263`, `5034838.004`, `5037445.335` |
| 9 | `Longitude` | text | 🟢 | `-73.637226`, `-73.621674`, `-73.617401` |
| 10 | `Latitude` | text | 🟢 | `45.45339`, `45.474947`, `45.476869` |

---

### Feux de circulation – feux pour piétons

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-feux-pietons` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-feux-pietons` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Feu de circulation, Feu tricolore, Intersection, Piéton, SUM, Signalisation, Traverse |

**Description**: Ce fichier contient l’emplacement de tous les feux de circulation gérés par la Ville de Montréal dont au moins une traverse est munie d’un feu pour piétons. Le fichier contient le numéro de référence de l’intersection où se situe le feu, le nom des deux rues qui forment l’intersection et les coordonnées géographiques du point central de l’intersection.

**Formats disponibles**: CSV, GEOJSON, PDF, SHP

#### Ressource: Feux de circulation pour piétons (CSV)

- **Resource ID**: `d43d1887-ff76-4b39-b961-6150535eb52c`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,196
- **Nombre de champs**: 10

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `INT_NO` | text | 🟢 | `50`, `51`, `49` |
| 2 | `RUE_1` | text | 🟢 | `Girouard`, `Elmhurst` |
| 3 | `RUE_2` | text | 🟢 | `Notre-Dame-de-Grâce`, `Monkland`, `Saint-Jacques` |
| 4 | `NO_ARRONDISSEMENT` | text | 🟢 | `7` |
| 5 | `ARRONDISSEMENT` | text | 🟢 | `Côte-des-Neiges - Notre-Dame-de-Grâce` |
| 6 | `PERMANENT_OU_TEMPORAIRE` | text | 🟢 | `Permanent` |
| 7 | `LOC_X` | text | 🟢 | `294066.935`, `295621.009`, `295287.251` |
| 8 | `LOC_Y` | text | 🟢 | `5037231.263`, `5034838.004`, `5037445.335` |
| 9 | `Longitude` | text | 🟢 | `-73.637226`, `-73.621674`, `-73.617401` |
| 10 | `Latitude` | text | 🟢 | `45.45339`, `45.474947`, `45.476869` |

---

### Fréquentation des voies actives sécuritaires (VAS)

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-frequentation-voies-actives-securitaires` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-frequentation-voies-actives-securitaires` |
| **Fréquence de mise à jour** | notPlanned |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | COVID-19, Comptage, Piéton, SUM, Vélo |

**Description**: Les voies actives sécuritaires (VAS) ont été implantées afin de donner plus d’espace aux piétons et cyclistes dans le respect des mesures de distanciation physique dans le contexte de la COVID-19. Elles ont pris différentes formes selon le contexte dans lequel elles ont été implantées. Plus d’espace a été donné aux piétons par l’aménagement de corridors piétons ou de rues piétonnes et de nouvelles voies cyclables ont également été créées. Pour en évaluer l'impact, plusieurs stations automatisées de comptages ont été installées pendant une période de temps variable en marge des VAS. Cet ensemble de données présente une compilation des comptages effectués.

**Formats disponibles**: CSV

#### Ressource: Liste des stations de comptage (CSV)

- **Resource ID**: `69881868-2cbc-4cc0-b7cd-1a94e1985d21`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 31
- **Nombre de champs**: 5

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `id_station` | text | 🟢 | `P01`, `P03`, `P02` |
| 2 | `nom_station` | text | 🟢 | `Mt-Royal / de la Roche`, `de la Commune / Place Jacques Cartier`, `Mt-Royal / Papineau` |
| 3 | `nom_vas` | text | 🟢 | `Mt-Royal`, `de la Commune` |
| 4 | `latitude` | text | 🟢 | `45.507153`, `45.528653`, `45.532827` |
| 5 | `longtitude` | text | 🟢 | `-73.574594`, `-73.578567`, `-73.552102` |

#### Ressource: Comptages vélos (VAS) (CSV)

- **Resource ID**: `1e67f446-ed92-4f58-9586-113fcf5b6a73`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 84,762
- **Nombre de champs**: 7

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `id_station` | text | 🟢 | `V01` |
| 2 | `timestamp_local` | datetime | 🟢 | `2020-06-16T20:15:00`, `2020-06-16T19:45:00`, `2020-06-16T20:00:00` |
| 3 | `compte_dir_nord` | text | 🟢 | _vide_ |
| 4 | `compte_dir_sud` | text | 🟢 | _vide_ |
| 5 | `compte_dir_est` | decimal | 🟠 | `14`, `6`, `4` |
| 6 | `compte_dir_ouest` | decimal | 🟠 | `5`, `0`, `3` |
| 7 | `compte_total` | decimal | 🟢 | `9`, `4`, `17` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `compte_dir_est`: 52.0% null
- `compte_dir_ouest`: 52.0% null

#### Ressource: Comptages piétons (VAS) (CSV)

- **Resource ID**: `0738af6c-be20-49d0-b598-06052725290a`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 121,033
- **Nombre de champs**: 7

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `id_station` | text | 🟢 | `P01` |
| 2 | `timestamp_local` | datetime | 🟢 | `2020-06-26T08:45:00`, `2020-06-26T08:30:00`, `2020-06-26T08:15:00` |
| 3 | `compte_dir_nord` | text | 🟢 | _vide_ |
| 4 | `compte_dir_sud` | text | 🟢 | _vide_ |
| 5 | `compte_dir_est` | decimal | 🟢 | `0`, `37`, `6` |
| 6 | `compte_dir_ouest` | decimal | 🟢 | `9`, `0`, `7` |
| 7 | `compte_total` | decimal | 🟢 | `13`, `0`, `44` |

---

### Géobase - pôles

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-geobase-pole` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-geobase-pole` |
| **Fréquence de mise à jour** | weekly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Adresse, Géobase, Rue, Réseau routier, SIRR, Secteur |

**Description**: Les pôles de géobase sont une représentation ponctuelle des côtés gauche et droit des tronçons segmentés du réseau routier.  Ils sont connexes à la [géobase double](/ville-de-montreal/geobase-double) qui présente la même information  sous forme linéaire.

Ensembles de données connexes:

- [Géobase - réseau routier](http://donnees.montreal.ca/dataset/geobase)
- [Géobase double - côtés de rue du réseau routier](http://donnees.montreal.ca/dataset/geobase-double)
- [Géobase - tronçons détruits](http://donnees.montreal.ca/dataset/geobase-troncon-detruit)
- [Géobase - gestion tronçons](http://donnees.montreal.ca/dataset/geobase-gestion-troncon)
- [Géobase - noeuds](http://donnees.montreal.ca/dataset/geobase-noeud)

 __Avertissements__

- Les données diffusées (Géobase - pôles) doivent être utilisées en respectant la politique et la licence en matière de données ouvertes de la Ville de Montréal.
- Les données diffusées (Géobase - pôles) sont celles qui se trouvent en notre posses

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: CSV, JSON, ZIP

#### Ressource: Pôles de géobase (points) (JSON)

- **Resource ID**: `efc1c061-a05d-43ed-86f6-58cbcd33e283`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,602,750
- **Nombre de champs**: 1

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `{` | text | 🟢 | `"name" : "pole"`, `"type" : "FeatureCollection"`, `"features" : [` |

#### Ressource: Pôles de géobase (liste) (CSV)

- **Resource ID**: `79fa1da4-0355-4ecf-8306-31361bf101c2`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 95,900
- **Nombre de champs**: 10

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `COTE_RUE_ID` | text | 🟢 | `10100011`, `10100012`, `10100041` |
| 2 | `ID_TRC` | text | 🟢 | `1010005`, `1010004`, `1010001` |
| 3 | `ID_VOIE` | text | 🟢 | `300196`, `300867`, `300191` |
| 4 | `NOM_VOIE` | text | 🟢 | `Albert-LeSage`, `D'Aiguillon`, `Adhémar-Mailhiot` |
| 5 | `NOM_VILLE` | text | 🟢 | `MTL` |
| 6 | `DEBUT_ADRESSE` | text | 🟢 | `5475`, `12323`, `12320` |
| 7 | `FIN_ADRESSE` | text | 🟢 | `12335`, `5625`, `12340` |
| 8 | `COTE` | text | 🟢 | `DROITE`, `GAUCHE` |
| 9 | `TYPE_F` | text | 🟢 | `avenue`, `place` |
| 10 | `SENS_CIR` | text | 🟢 | `0` |

---

### Géobase - réseau routier

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-geobase` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-geobase` |
| **Fréquence de mise à jour** | weekly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Adresse, Géobase, Quartier, Reseau routier, Route, Rue, SIRR, Toponyme, Tronçon |

**Description**: La géobase se présente comme  un réseau filamentaire de segments de droite nommés communément « tronçons » dont la numérisation se fait généralement au centre de rue. Un tronçon est alors une portion de route possédant des caractéristiques homogènes décrites principalement par les attributs suivants : un toponyme officiel et en vigueur, des plages d’adresses et une référence aux limites administratives (arrondissements, limites municipales, quartiers selon le cas).

Tableau de la classification des voies:

- classe 0 - Rues locales
- classe 1 - Certaines voies piétonnières
- classe 2 - Places d'affaires
- classe 3 - Quai
- classe 4 - Privée
- classe 5 - Collectrices
- classe 6 - Artères secondaires
- classe 7 - Artères principales
- classe 8 - Autoroutes
- classe 9 - Rue projetée

Ensembles de données connexes:

- [Géobase double - côtés de rue du réseau routier](http://donnees.montreal.ca/dataset/geobase-double)
- [Géobase - pôles](http://donnees.montreal.ca/dataset/

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: CSV, GEOJSON, ZIP

#### Ressource: Géobase (CSV)

- **Resource ID**: `cdf491fa-bf3d-4eb1-8692-c9aa1df462cd`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 47,950
- **Nombre de champs**: 17

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_TRC` | text | 🟢 | `1010005`, `1010004`, `1010001` |
| 2 | `DEB_GCH` | text | 🟢 | `7750`, `5530`, `12320` |
| 3 | `FIN_GCH` | text | 🟢 | `7830`, `12340`, `5570` |
| 4 | `ARR_GCH` | text | 🟢 | `Ahuntsic-Cartierville` |
| 5 | `SENS_CIR` | text | 🟢 | `0` |
| 6 | `CLASSE` | text | 🟢 | `0` |
| 7 | `LIE_VOIE` | text | 🔴 | _vide_ |
| 8 | `TYP_VOIE` | text | 🟢 | `avenue`, `place` |
| 9 | `DIR_VOIE` | text | 🔴 | _vide_ |
| 10 | `NOM_VOIE` | text | 🟢 | `Albert-LeSage`, `D'Aiguillon`, `Adhémar-Mailhiot` |
| 11 | `DEB_DRT` | text | 🟢 | `5475`, `12323`, `7745` |
| 12 | `FIN_DRT` | text | 🟢 | `12335`, `5625`, `7805` |
| 13 | `ARR_DRT` | text | 🟢 | `Ahuntsic-Cartierville` |
| 14 | `LIM_GCH` | text | 🟢 | `Montréal` |
| 15 | `LIM_DRT` | text | 🟢 | `Montréal` |
| 16 | `POSITION` | text | 🟢 | `5` |
| 17 | `ODONYME` | text | 🟢 | `Avenue Adhémar-Mailhiot`, `Avenue Albert-LeSage`, `Place D'Aiguillon` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `DIR_VOIE`: 90.6% null
- `LIE_VOIE`: 87.0% null

---

### Géobase double - côtés de rue du réseau routier

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-geobase-double` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-geobase-double` |
| **Fréquence de mise à jour** | weekly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Adresse, Géobase, Route, Rue, Réseau routier, SIRR, Sens, Toponymie, Voie |

**Description**: La géobase double se présente comme une projection du réseau filamentaire de la géobase qui simule approximativement les limites des trottoirs et bordures.  Les [pôles de géobase](/ville-de-montreal/geobase-pole), une représentation ponctuelle des côtés gauche et droit des tronçons segmentés du réseau routier, sont également disponibles sur le portail.

L'[API de Planif-Neige](https://donnees.montreal.ca/ville-de-montreal/deneigement) fait référence à une version statique des données de la géobase double extraite en début de saison. Pour suivre les modifications apportées durant la saison hivernale, vous pouvez vous référer aux ensembles de données suivants: [Géobase - gestion tronçons](https://donnees.montreal.ca/ville-de-montreal/geobase-gestion-troncon) et [Géobase - tronçons détruits](https://donnees.montreal.ca/ville-de-montreal/geobase-troncon-detruit).

Ensembles de données connexes:

- [Géobase - réseau routier](http://donnees.montreal.ca/dataset/geobase)
- [Géobase - pô

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: CSV, JSON, ZIP

#### Ressource: Géobase double (JSON)

- **Resource ID**: `16f7fa0a-9ce6-4b29-a7fc-00842c593927`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,361,455
- **Nombre de champs**: 1

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `{` | text | 🟢 | `"name" : "geobase_double"`, `"type" : "FeatureCollection"`, `"features" : [` |

#### Ressource: Géobase double (CSV)

- **Resource ID**: `2f1717e9-0141-48ef-8943-ea348373667f`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 91,445
- **Nombre de champs**: 10

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `COTE_RUE_ID` | text | 🟢 | `10100011`, `10100012`, `10100042` |
| 2 | `ID_TRC` | text | 🟢 | `1010005`, `1010004`, `1010001` |
| 3 | `ID_VOIE` | text | 🟢 | `300196`, `300867`, `300191` |
| 4 | `NOM_VOIE` | text | 🟢 | `Albert-LeSage`, `D'Aiguillon`, `Adhémar-Mailhiot` |
| 5 | `NOM_VILLE` | text | 🟢 | `MTL` |
| 6 | `DEBUT_ADRESSE` | text | 🟢 | `12323`, `5530`, `12320` |
| 7 | `FIN_ADRESSE` | text | 🟢 | `12335`, `12340`, `5570` |
| 8 | `COTE` | text | 🟢 | `Gauche`, `Droite` |
| 9 | `TYPE_F` | text | 🟢 | `avenue`, `place` |
| 10 | `SENS_CIR` | text | 🟢 | `0` |

---

### Horaires et positionnement des bus en temps réel (GTFS-realtime)

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-stm-bus-temps-reel-gtfs-realtime` |
| **Organisation** | Société de transport de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-stm-bus-temps-reel-gtfs-realtime` |
| **Fréquence de mise à jour** | continuous |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Autobus, Bus, GTFS, Real-time, STM, Temps réel, Transport collectif, iBUS |

**Description**: Cet ensemble fournit aux usagers du transport collectif de la Société  de Transport de Montréal (STM) les horaires, le positionnement des bus en temps réel et, depuis sa version 2, la donnée du taux d’occupation à bord des bus. 

*Pour accéder aux GTFS–realtime et à l’API i3, inscrivez-vous sur le portail [Développeurs](https://www.stm.info/fr/a-propos/developpeurs)*.

Note:
Le présent ensemble de données est la propriété de la Société de transport de Montréal. Conséquemment, selon la clause d'attribution de la licence Creative Commons 4.0, la paternité des données doit être attribuée à la Société de transport de Montréal.
Veuillez communiquer avec la Société de transport de Montréal (dev@stm.info) si vous avez des questions sur cet ensemble.

Les tracés des lignes de bus et de métro ainsi que les horaires planifiés de leurs trajets sont aussi [disponibles](https://donnees.montreal.ca/organization/societe-de-transport-de-montreal) en données ouvertes.

__Avertissement__: l'AP

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: GTFS

---

### Horaires planifiés et trajets des bus et du métro

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-stm-horaires-planifies-et-trajets-des-bus-et-du-metro` |
| **Organisation** | Société de transport de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-stm-horaires-planifies-et-trajets-des-bus-et-du-metro` |
| **Fréquence de mise à jour** | quarterly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Autobus, Bus, GTFS, Métro, STM, Transport collectif |

**Description**: Ensemble de fichiers présentant les horaires, les informations géographiques et d'autres attributs du réseau de bus et de métro opéré par la Société de transport de Montréal.

### Important

Le présent ensemble de données est la propriété de la Société de transport de Montréal. Conséquemment, selon la clause d'attribution de la licence Creative Commons 4.0, la paternité des données doit être attribuée à la Société de transport de Montréal.

Veuillez [communiquer](	
http://www.stm.info/fr/nous-joindre) avec la Société de transport de Montréal si vous avez des questions sur cet ensemble de données.

**Formats disponibles**: GTFS

---

### Images annotées extraites du flux vidéo des caméras de circulation (archives)

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-images-annotees-cameras-circulation` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-images-annotees-cameras-circulation` |
| **Fréquence de mise à jour** | notPlanned |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Algorithme, Apprentissage automatique, Apprentissage profond, Deep learning, Intelligence artificielle, Machine learning, Mobilité, Recherche, STI, Segmentation |

**Description**: Images extraites des captations des [caméras d'observation routière](http://ville.montreal.qc.ca/circulation/) accompagnées  d’annotations pour la segmentation sémantique et pour la détection d’objets.

Pour la __segmentation sémantique__, chaque image de circulation source est accompagnée d’une image contenant la segmentation sémantique. La segmentation comporte 13 classes: poteaux, panneaux de signalisation, véhicules, végétation, terre-pleins, bâtiments, espaces privés, trottoirs, voies, piétons, structures, construction, néant.

Pour la __détection d’objets__, un fichier _.xml_ contenant la localisation des objets (i.e. cadre englobant)  est fourni avec chaque image de circulation. L’annotation comporte 5 classes : véhicules, piétons, objets de construction, cyclistes et autobus.

**Formats disponibles**: JPEG

---

### Incidents du réseau du métro

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-incidents-du-reseau-du-metro` |
| **Organisation** | Société de transport de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-incidents-du-reseau-du-metro` |
| **Fréquence de mise à jour** | monthly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Incidents, Métro, STM, Station |

**Description**: Cet ensemble fait état de tous les incidents qui touchent les trains, y compris ceux qui n'ont pas causé de ralentissement ou d'interruption du service réseau du métro, ainsi que les incidents qui touchent les stations (les incidents stations n'affectent pas le service métro).

Si vous avez des questions sur cet ensemble, veuillez communiquer avec la Société de transport de Montréal à l'adresse [ccia@stm.info](mailto:ccia@stm.info).

**Formats disponibles**: CSV

#### Ressource: Incidents - réseau du métro (CSV)

- **Resource ID**: `518d9c92-89a3-408a-8ac4-04ee43e2ac9e`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 45,561
- **Nombre de champs**: 26

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Numero d'incident` | text | 🟢 | `S01011902`, `S01011903`, `S01011901` |
| 2 | `Type d'incident` | text | 🟢 | `S` |
| 3 | `Cause primaire` | text | 🟢 | `Autres` |
| 4 | `Cause secondaire` | text | 🟢 | `Autres` |
| 5 | `Symptome` | text | 🟢 | `Clientèle` |
| 6 | `Ligne` | text | 🟢 | `Ligne verte`, `Ligne orange` |
| 7 | `Numero de tournee` | text | 🟢 | `#` |
| 8 | `Heure de l'incident` | text | 🟢 | `03:35`, `04:56`, `02:56` |
| 9 | `Heure de reprise` | text | 🟢 | `03:32`, `03:42`, `04:41` |
| 10 | `Incident en minutes` | text | 🟢 | `02 min et moins` |
| 11 | `Vehicule` | text | 🟢 | `#` |
| 12 | `Porte de voiture` | text | 🟢 | `#` |
| 13 | `Type de materiel` | text | 🟢 | `Non affecté` |
| 14 | `Code de lieu` | text | 🟢 | `Lionel-Groulx`, `Snowdon`, `Place-des-Arts` |
| 15 | `Dommage materiel` | text | 🟢 | `0` |
| 16 | `KFS` | text | 🟢 | `0` |
| 17 | `Porte` | text | 🟢 | `0` |
| 18 | `Urgence metro` | text | 🟢 | `0` |
| 19 | `CAT` | text | 🟢 | `0` |
| 20 | `Evacuation` | text | 🟢 | `#` |
| 21 | `Annee civile` | text | 🟢 | `2019` |
| 22 | `Annee civile/mois` | text | 🟢 | `janv-19` |
| 23 | `Mois calendrier` | text | 🟢 | `1` |
| 24 | `Jour du mois` | text | 🟢 | `1` |
| 25 | `Jour de la semaine` | text | 🟢 | `2` |
| 26 | `Jour calendaire` | text | 🟢 | `2019-01-01` |

---

### Interventions de l'Escouade mobilité

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-interventions-escouade-mobilite` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-interventions-escouade-mobilite` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Circulation, Entrave, Mobilité, SCAEC |

**Description**: L’Escouade mobilité travaille de façon proactive, et collabore étroitement avec le Centre de gestion de la mobilité urbaine (CGMU), le Service de police de la Ville de Montréal (SPVM) et les arrondissements pour débloquer les situations de congestion qui ont un impact direct sur les usagers du domaine public (piétons, cyclistes et automobilistes). À travers ses différentes interventions, elle assure la fluidité de la circulation et elle limite les entraves non autorisées.

Cet ensemble de données propose une liste de toutes les interventions effectuées par l'Escouade Mobilité depuis sa mise en place en juin 2018.

_Les données sont mises à jour de façon bimensuel. La mise à jour en temps réel est planifiée pour plus tard, accompagnée de la géolocalisation des données._

**Formats disponibles**: CSV, WEB

#### Ressource: Liste des interventions de l'escouade mobilité (CSV)

- **Resource ID**: `ff81ecc4-d3b0-4661-806f-a27870e63a4e`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 53,411
- **Nombre de champs**: 20

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `CLÉ` | text | 🟢 | `BdMByysS`, `Ak2JanD8`, `y6n3Q8Sb` |
| 2 | `QUART DE TRAVAIL` | text | 🟢 | `Quart de jour` |
| 3 | `SECTEUR.ABR` | text | 🟢 | `PMR`, `VMA` |
| 4 | `SECTEUR` | text | 🟢 | `Nord-Est de René-Lévesque/Saint-Laurent`, `Sud de René-Lévesque`, `Plateau-Mont-Royal` |
| 5 | `DATE` | datetime | 🟢 | `2018-06-05T00:00:00`, `2018-06-06T00:00:00`, `2018-06-04T00:00:00` |
| 6 | `HEURE` | text | 🟢 | `15:32:00`, `09:33:00`, `07:06:00` |
| 7 | `ADRESSE` | text | 🟢 | `455 Boulevard René-Lévesque O, Montré...`, `2396 Rue Beaubien E, Montréal, QC H2G...`, `5060 Boul St-Laurent, Montréal, QC H2...` |
| 8 | `NATURE ENTRAVE` | text | 🟢 | `Entrave autorisée mais non conforme`, `Obstruction`, `Signalisation` |
| 9 | `OPERATION SPECIALE` | text | 🟢 | _vide_ |
| 10 | `SOURCE ENTRAVE` | text | 🟢 | `Escouade`, `CGMU` |
| 11 | `NATURE INTERVENTION` | text | 🟢 | `Action de l'Escouade auprès de l'entr...`, `Support arrondissement , Support urge...`, `Action de l'Escouade auprès du problème` |
| 12 | `ENDROITS` | text | 🟢 | `Piste cyclable`, `Voie de circulation` |
| 13 | `CONSTATS` | text | 🟢 | `NON` |
| 14 | `EQUIPE_CONSTAT` | text | 🟢 | `Sans constat` |
| 15 | `CRITICITÉ` | text | 🟢 | `Moyen`, `Élevé`, `Faible` |
| 16 | `STATUT ENTRAVE` | text | 🟢 | `Entrave réglée` |
| 17 | `VELO_AUTO` | text | 🟢 | _vide_ |
| 18 | `SIGNALISATION` | text | 🟢 | _vide_ |
| 19 | `SIGNALISATION_BALISE` | text | 🟢 | _vide_ |
| 20 | `SIGNALISATION_PANNEAU` | text | 🟢 | _vide_ |

---

### Kilométrage du budget d'exploitation du métro

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-stm-kilometrage-du-budget-d-exploitation-du-metro-de-la-stm` |
| **Organisation** | Société de transport de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-stm-kilometrage-du-budget-d-exploitation-du-metro-de-la-stm` |
| **Fréquence de mise à jour** | annual |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Kilométrage, Métro, STM |

**Description**: Ensemble de données décrivant le kilométrage calculé pour la préparation du budget d'exploitation du métro de la Société de transport de Montréal.

Si vous avez des questions sur cet ensemble, veuillez communiquer avec la Société de transport de Montréal à l'adresse [ccia@stm.info](mailto:ccia@stm.info).

**Formats disponibles**: CSV

#### Ressource: Kilométrage métro budgété (CSV)

- **Resource ID**: `45fbf2fd-4ce6-49bc-b8d1-3a5dc9778644`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 720
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Ligne` | text | 🟢 | `Ligne bleue,Semaine,001,73,2019,2,201...`, `Ligne bleue,Semaine,001,73,2019,1,201...`, `Ligne bleue,Semaine,001,73,2019,3,201...` |
| 2 | `Type de Jour` | text | 🔴 | _vide_ |
| 3 | `Tournee` | decimal | 🔴 | _vide_ |
| 4 | `Type de materiel` | decimal | 🔴 | _vide_ |
| 5 | `Annee civile` | decimal | 🔴 | _vide_ |
| 6 | `Mois calendrier` | decimal | 🔴 | _vide_ |
| 7 | `Annee civile/mois` | datetime | 🔴 | _vide_ |
| 8 | `Km budgete` | decimal | 🔴 | _vide_ |

**⚠️ Champs avec >50% de valeurs nulles:**
- `Type de Jour`: 89.2% null
- `Tournee`: 89.2% null
- `Type de materiel`: 89.2% null
- `Annee civile`: 89.2% null
- `Mois calendrier`: 89.2% null
- `Annee civile/mois`: 89.2% null
- `Km budgete`: 89.2% null

---

### Kilométrage métro des périodes de service

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-stm-kilometrage-metro-des-periodes-de-service` |
| **Organisation** | Société de transport de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-stm-kilometrage-metro-des-periodes-de-service` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Kilométrage, Métro, Planifié, STM |

**Description**: Ensemble de données décrivant le kilométrage planifié du métro de la Société de transport de Montréal pour les périodes de service.

Le kilométrage du budget d'exploitation est séparé selon les cinq périodes de service (appelée périodes de liste) de l'année (janvier, mars, juin septembre et novembre) et peut être ajusté, avant chaque liste, afin de ternir compte de nouvelles informations (chantiers, travaux, évènements, etc.).

Si vous avez des questions sur cet ensemble, veuillez communiquer avec la Société de transport de Montréal à l'adresse [ccia@stm.info](mailto:ccia@stm.info).

**Formats disponibles**: CSV

#### Ressource: Kilométrage métro planifié (CSV)

- **Resource ID**: `534cdfd9-41e5-4e11-8675-738485509cce`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 8,472
- **Nombre de champs**: 11

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Ligne` | text | 🟢 | `Ligne bleue` |
| 2 | `Periode Exploitation` | text | 🟢 | `18N` |
| 3 | `Type de Jour` | text | 🟢 | `Samedi`, `Dimanche`, `Quatrième pér. fête` |
| 4 | `Tournee` | text | 🟢 | `001` |
| 5 | `Annee civile` | text | 🟢 | `2019` |
| 6 | `Annee civile/mois` | text | 🟢 | `2019-01` |
| 7 | `Annee civile/semaine` | text | 🟢 | `2018-12-31` |
| 8 | `Jour calendaire` | text | 🟢 | `2019-01-05`, `2019-01-06`, `2019-01-02` |
| 9 | `Jour de la semaine` | text | 🟢 | `Mercredi`, `Dimanche`, `Samedi` |
| 10 | `Mois calendrier` | text | 🟢 | `1` |
| 11 | `KM planifie` | text | 🟢 | `16315,92`, `15810`, `26940,24` |

---

### Kilométrage réalisé par les voitures de métro

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-stm-kilometrage-realise-par-les-voitures-de-metro-de-la-stm` |
| **Organisation** | Société de transport de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-stm-kilometrage-realise-par-les-voitures-de-metro-de-la-stm` |
| **Fréquence de mise à jour** | monthly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Kilométrage, Métro, STM, Voiture |

**Description**: Ensemble de données décrivant le kilométrage parcouru par les voitures de métro de la Société de transport de Montréal.

Si vous avez des questions sur cet ensemble, veuillez communiquer avec la Société de transport de Montréal à l'adresse [ccia@stm.info](mailto:ccia@stm.info).

**Formats disponibles**: CSV

#### Ressource: Kilométrage réalisé par les voitures de métro (CSV)

- **Resource ID**: `c35e14b7-31b7-410d-9773-158bc30749df`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 559,549
- **Nombre de champs**: 14

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Composition du train` | text | 🟢 | `001-000-000` |
| 2 | `Type materiel` | text | 🟢 | `10` |
| 3 | `Ligne` | text | 🟢 | `Ligne bleue` |
| 4 | `Tournee Metro` | text | 🟢 | `069`, `070`, `000` |
| 5 | `Code degradation` | text | 🟢 | `CMC` |
| 6 | `Periode exploitation` | text | 🟢 | `18N`, `19J` |
| 7 | `Type de jour` | text | 🟢 | `Samedi`, `Dimanche`, `Semaine` |
| 8 | `Annee` | text | 🟢 | `2019` |
| 9 | `Annee/mois` | text | 🟢 | `2019-01` |
| 10 | `Annee/semaine` | text | 🟢 | `201901`, `201902` |
| 11 | `Annee/Trimestre` | text | 🟢 | `2019-1` |
| 12 | `Jour calendaire` | text | 🟢 | `2019-01-04`, `2019-01-06`, `2019-01-05` |
| 13 | `Mois` | text | 🟢 | `1` |
| 14 | `Km voiture` | text | 🟢 | `25,875`, `23,931`, `24,651` |

---

### Remorquages de véhicules entravant les opérations de la Ville de Montréal

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-remorquages-de-vehicules-genants` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-remorquages-de-vehicules-genants` |
| **Fréquence de mise à jour** | daily |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Déneigement, Neige, Remorquage, SCAEC, Transport |

**Description**: L'ensemble de données présente une liste des remorquages de véhicules gênants effectués par la Ville de Montréal. Ces remorquages sont effectués, par exemple lors des opérations de déneigement, des travaux ou encore lors d'événements spéciaux.

**Formats disponibles**: CSV, WEB

#### Ressource: Remorquages après le 15 nov 2015 (CSV)

- **Resource ID**: `65dd096f-7296-40e8-8cfe-e26b928bcce5`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 516,783
- **Nombre de champs**: 13

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `DATE_ORIGINE` | text | 🟢 | `2015-11-16T19:35:00`, `2015-11-16T20:09:00`, `2015-11-16T13:13:00` |
| 2 | `LONGITUDE_ORIGINE` | text | 🟢 | `-73.5693411139059`, `-73.5971179862804`, `-73.5692271519482` |
| 3 | `LATITUDE_ORIGINE` | text | 🟢 | `45.4931103649656`, `45.5566266494817`, `45.4930464058777` |
| 4 | `RUE_ORIGINE` | text | 🟢 | `rue de Versailles`, `9e avenue`, `rue Lucien-Thimens` |
| 5 | `SECTEUR_ORIGINE` | text | 🟡 | _vide_ |
| 6 | `ARRONDISSEMENT_ORIGINE` | text | 🟢 | `Saint-Laurent`, `Ville-Marie`, `Villeray-Saint-Michel - Parc-Extension` |
| 7 | `DATE_DESTINATION` | text | 🟢 | `2015-12-30T11:20:00`, `2015-12-30T09:55:00`, `2015-11-16T20:10:00` |
| 8 | `LONGITUDE_DESTINATION` | text | 🟢 | `-73.5682681863395`, `-73.6304309397981`, `-73.6939189729802` |
| 9 | `LATITUDE_DESTINATION` | text | 🟢 | `45.5105009189792`, `45.60088642401`, `45.4930769112417` |
| 10 | `RUE_DESTINATION` | text | 🟢 | `rue Saint-Jacques`, `rue Lucien-Thimens`, `boulevard Sainte-Gertrude` |
| 11 | `SECTEUR_DESTINATION` | text | 🟡 | _vide_ |
| 12 | `ARRONDISSEMENT_DESTINATION` | text | 🟢 | `Saint-Laurent`, `Ville-Marie`, `Montréal-Nord` |
| 13 | `MOTIF_REMORQUAGE` | text | 🟢 | `Constat d'infraction` |

#### Ressource: Remorquages de 2005 au 15 nov 2015 (CSV)

- **Resource ID**: `2edcdba3-ba83-470f-a441-01fd72dd965e`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 250
- **Nombre de champs**: 5

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `DATE_ORIGINE` | datetime | 🟢 | `2015-11-13T13:03:00`, `2015-11-13T13:51:00`, `2015-11-14T16:18:00` |
| 2 | `RUE_ORIGINE` | text | 🟢 | `rue Robin`, `avenue Christophe-Colomb`, `avenue Harvard` |
| 3 | `ARRONDISSEMENT_ORIGINE` | text | 🟢 | `Côte-des-Neiges - Notre-Dame-de-Grâce`, `Ville-Marie`, `Le Plateau-Mont-Royal` |
| 4 | `RUE_DESTINATION` | text | 🟢 | `rue Robin`, `avenue Christophe-Colomb`, `avenue Harvard` |
| 5 | `MOTIF_REMORQUAGE` | text | 🟢 | `Constat d'infraction` |

---

### Rues piétonnes et partagées

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-rues-pietonnes` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-rues-pietonnes` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Arr., Banc public, Piéton, Piétonnisation, Place publique, Placottoir, Rue piétonne, SUM |

**Description**: Liste des rues piétonnes à Montréal, incluant leurs coordonnées géographiques et plusieurs éléments descriptifs des projets. On y retrouve entre autres les projets faisant partie du Programme de rues piétonnes et partagées de la Ville de Montréal.

**Formats disponibles**: CSV, GEOJSON, KML, SHP

#### Ressource: Liste des rues piétonnes (CSV)

- **Resource ID**: `ef2a8162-0644-47e7-bd03-bea33f14a5d2`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 53
- **Nombre de champs**: 28

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_PROJET` | text | 🟢 | `RP0002`, `RP0003`, `RP0001` |
| 2 | `TYPE_AXE` | text | 🟢 | `Chemin`, `Voie ferrée`, `Avenue` |
| 3 | `TOPONYME` | text | 🟢 | `Frère André`, `Promenade Luc Larivée et Place Valois...`, `Park Stanley` |
| 4 | `NOM_PROJET` | text | 🟢 | `Placette de la Côte-des-Neiges`, `Promenade Luc-Larivée`, `Avenue Park Stanley` |
| 5 | `DATE_OUVERTURE` | text | 🟢 | `2017-06-19`, `2017-06-01`, `Permanent` |
| 6 | `ANNEE_IMPLANTATION_1` | text | 🟢 | `2015`, `2016`, `2004-2009` |
| 7 | `ANNEE_IMPLANTATION_2` | text | 🟢 | `2018`, `2017`, `2013-2014` |
| 8 | `ARRONDISSEMENT` | text | 🟢 | `Côte-des-Neiges–Notre-Dame-de-Grâce`, `Ahuntsic-Cartierville`, `Mercier–Hochelaga-Maisonneuve` |
| 9 | `HIERARCHIE_ROUTIERE` | text | 🟢 | `Artère`, `Locale`, `Voie ferrée` |
| 10 | `VOIE_CYCLABLE` | text | 🟢 | `Non`, `Oui` |
| 11 | `VOIE_CYCLABLE_AXES_ADJACENTS` | text | 🟢 | `Non`, `Oui` |
| 12 | `PASSAGE_BUS` | text | 🟢 | `Non`, `Oui` |
| 13 | `PASSAGE_BUS_AXES_ADJACENTS` | text | 🟢 | `Non`, `Oui` |
| 14 | `TYPE_SITE_INTERVENTION` | text | 🟢 | `5. Rue en bordure ou entre deux parcs...`, `2. Rue commerciale de quartier, d’amb...`, `3. Rue transversale à une rue commerc...` |
| 15 | `TYPE_REPARTAGE` | text | 🟢 | `2. Place publique sur rue en empiétan...`, `1. Piétonnisation complète de la rue` |
| 16 | `MODE_IMPLANTATION` | text | 🟢 | `Temporaire à permanent`, `Permanent`, `Temporaire saisonnière` |
| 17 | `PROGRAMME` | text | 🟢 | `Non`, `Oui` |
| 18 | `LIMITES_1` | text | 🟢 | `rue Basile Routhier`, `ch Queen Mary`, `rue de Chambly` |
| 19 | `LIMITES_2` | text | 🟢 | `ave Durham`, `rue du Frère André`, `ave Charlemagne` |
| 20 | `LONGUEUR_TRONCON` | decimal | 🟢 | `557.54`, `181.23`, `49.68` |
| 21 | `PHOTO` | text | 🟢 | `http://depot.ville.montreal.qc.ca/rue...`, `http://depot.ville.montreal.qc.ca/rue...`, `http://depot.ville.montreal.qc.ca/rue...` |
| 22 | `CREDIT_PHOTO` | text | 🟢 | `Mélanie Dusseault`, `Ville de Montréal`, `Corentin Hignoul` |
| 23 | `OBJECTIF_THEMATIQUE` | text | 🟢 | `Pique-nique Agriculture urbaine Date ...`, `Photo Date Insolite`, `Pique-nique Insolite Lecture` |
| 24 | `ATTRAIT` | text | 🟢 | `parc Maurice-Richard parc Basile-Rout...`, `emprise ferroviaire anciennes usines`, `Oratoire Saint-Joseph restaurants` |
| 25 | `LATITUDE` | decimal | 🟢 | `45.547953`, `45.55834`, `45.494668` |
| 26 | `LONGITUDE` | decimal | 🟢 | `-73.618346`, `-73.672874`, `-73.543845` |
| 27 | `X` | decimal | 🟢 | `295550.357941755`, `301376.412223519`, `291303.813848193` |
| 28 | `Y` | decimal | 🟢 | `5046506.57760237`, `5045338.65339963`, `5039422.92377208` |

---

### Règlements relatifs à la circulation des véhicules lourds et des véhicules outils sur le territoire de l'agglomération de Montréal

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-camionnage-reglements` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-camionnage-reglements` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Camion, Camionnage, Poid lourd, Règlement, SUM, Transport, Véhicule outil, véhicule lourd |

**Description**: Ensemble de données géographiques concernant les règlements de camionnage de la Ville de Montréal et de l'agglomération de Montréal. Un jeu de données filaires identifie les prescriptions réglementaires et un jeu de données surfaciques identifiant les zones interdites aux camions excepté pour y effectuer une livraison locale.

**Formats disponibles**: GEOJSON, GPKG, SHP

---

### Réseau cyclable

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-pistes-cyclables` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-pistes-cyclables` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Bande cyclable, Cyclable, Mobilité, Mobilité active, Piste, Reseau, SIRR, Transport, Voie cyclable, Vélo |

**Description**: Réseau cyclable sur le territoire de l'agglomération de Montréal incluant les types d'infrastructures cyclables et les informations liées à l'accessibilité 4 saisons.

**Formats disponibles**: GEOJSON, PDF, SHP, WEB

---

### Réseau express vélo (REV)

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-reseau-express-velo` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-reseau-express-velo` |
| **Fréquence de mise à jour** | asNeeded |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Bande cyclable, Cyclable, Mobilité, Mobilité active, Piste, Réseau, SUM, Transport, Voie cyclable |

**Description**: Le REV, Réseau express vélo, est un projet de voie cyclable de 184 km qui sera réparti sur l’ensemble du territoire de l’île de Montréal. Il comptera 17 axes accessibles 12 mois par année. Cet ensemble présente les liens réalisés dans le cadre de ce projet.

Pour plus d'informations sur le REV, consultez la section [Le REV : un réseau express vélo](https://montreal.ca/articles/le-rev-un-reseau-express-velo-4666) sur le site web de la Ville de Montréal. Vous pouvez également consulter le [réseau cyclable montréalais](https://donnees.montreal.ca/ville-de-montreal/pistes-cyclables) disponible en données ouvertes.

**Formats disponibles**: GEOJSON, SHP

---

### Segments routiers de collecte des temps de parcours

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-segments-routiers-de-collecte-des-temps-de-parcours` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-segments-routiers-de-collecte-des-temps-de-parcours` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Congestion, Route, SUM, Temps de parcours, Traffic, Vitesse |

**Description**: De manière à collecter des données sur l'état de la circulation, la Ville de Montréal déploie un réseau de capteurs utilisant la technologie Bluetooth sur certains segments routiers stratégiques et permettant de calculer le temps de parcours sur ces segments. Cet ensemble de données fournit des informations sur les segments routiers pour lesquels des temps de parcours sont générés; les temps de parcours sont disponibles dans l'ensemble de données [Temps de parcours sur des segments routiers (historique)](/ville-de-montreal/temps-de-parcours-sur-des-segments-routiers-historique)

**Formats disponibles**: CSV, XLSX

#### Ressource: Segments de temps de parcours au format CSV (CSV)

- **Resource ID**: `5c342221-14c1-4593-9e2e-d1044b41dd90`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 330
- **Nombre de champs**: 16

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `IdLink` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `channel_name` | text | 🟢 | `Papineau-Henri-Bourassa`, `Saint-Michel-Industriel`, `Papineau-charland` |
| 3 | `active` | decimal | 🟢 | `1` |
| 4 | `LinkID` | text | 🟢 | `LCh_16-10`, `LHB_15-20`, `LCh_10-16` |
| 5 | `SrcDetectorId` | text | 🟢 | `16`, `15`, `10` |
| 6 | `SrcLatitude` | decimal | 🟢 | `455760283333333`, `45564785`, `455702683333333` |
| 7 | `SrcLongitude` | decimal | 🟢 | `-736364616666667`, `-736588066666667`, `-736449433333333` |
| 8 | `DestDetectorId` | text | 🟢 | `20`, `16`, `10` |
| 9 | `DestLatitude` | decimal | 🟢 | `455760283333333`, `45564785`, `45555365` |
| 10 | `DestLongitude` | decimal | 🟢 | `-736683933333333`, `-736364616666667`, `-736449433333333` |
| 11 | `LinkName` | text | 🟢 | `Charland:Papineau a Saint-Michel`, `Henri-Bourassa:Papineau a Lajeunesse`, `Charland:Saint-Michel a Papineau` |
| 12 | `RouteDirectionName` | text | 🟢 | `O`, `N` |
| 13 | `SrcChannelId` | decimal | 🟢 | `16`, `17`, `11` |
| 14 | `DestChannelId` | decimal | 🟢 | `21`, `17`, `11` |
| 15 | `LineDistance_m` | decimal | 🟢 | `1410`, `1414`, `1818` |
| 16 | `last_poll_time` | datetime | 🟡 | `2019-07-02T18:44:58`, `2019-07-02T18:44:57`, `2019-07-02T18:44:59` |

#### Ressource: Segments de temps de parcours au format MS Excel (XLSX)

- **Resource ID**: `93227aa5-8061-4001-859e-53d25951f3b0`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 274
- **Nombre de champs**: 16

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `IdLink` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `channel_name` | text | 🟢 | `Papineau-Henri-Bourassa`, `Saint-Michel-Industriel`, `Papineau-charland` |
| 3 | `active` | decimal | 🟢 | `1` |
| 4 | `LinkID` | text | 🟢 | `LCh_16-10`, `LHB_15-20`, `LCh_10-16` |
| 5 | `SrcDetectorId` | decimal | 🟢 | `16`, `15`, `10` |
| 6 | `SrcLatitude` | decimal | 🟢 | `45.564785`, `45.570268`, `45.576028` |
| 7 | `SrcLongitude` | decimal | 🟢 | `-73.644943`, `-73.658807`, `-73.636462` |
| 8 | `DestDetectorId` | decimal | 🟢 | `20`, `16`, `10` |
| 9 | `DestLatitude` | decimal | 🟢 | `45.564785`, `45.555365`, `45.576028` |
| 10 | `DestLongitude` | decimal | 🟢 | `-73.644943`, `-73.636462`, `-73.668393` |
| 11 | `LinkName` | text | 🟢 | `Charland:Papineau a Saint-Michel`, `Henri-Bourassa:Papineau a Lajeunesse`, `Charland:Saint-Michel a Papineau` |
| 12 | `RouteDirectionName` | text | 🟢 | `O`, `N` |
| 13 | `SrcChannelId` | decimal | 🟢 | `16`, `17`, `11` |
| 14 | `DestChannelId` | decimal | 🟢 | `21`, `17`, `11` |
| 15 | `LineDistance_m` | decimal | 🟢 | `1410`, `1414`, `1818` |
| 16 | `last_poll_time` | datetime | 🟡 | `2017-02-28T16:20:52`, `2017-02-28T16:20:48`, `2017-02-28T16:20:51` |

---

### Signalisation (stationnement sur rue)

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-stationnement-sur-rue-signalisation-courant` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-stationnement-sur-rue-signalisation-courant` |
| **Fréquence de mise à jour** | daily |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Arr., Panneau, Rue, SUM, Signalisation, Stationnement |

**Description**: Ensemble de données géolocalisant les panneaux de signalisation régulant le stationnement sur rue.

Il est à noter que [les panneaux de signalisation routière](/ville-de-montreal/panneaux-de-signalisation) ainsi que d'autres fichiers supplémentaires qui fournissent plus de détails sur les codifications des panneaux sont disponibles dans un ensemble distinct. 

Les images et le catalogue visuel de l'ensemble des panneaux sont également disponibles.

**Formats disponibles**: CSV, GEOJSON, JSON, PDF, ZIP

#### Ressource: Signalisation- Stationnement (CSV)

- **Resource ID**: `7f1d4ae9-1a12-46d7-953e-6b9c18c78680`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 160,759
- **Nombre de champs**: 21

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `POTEAU_ID_POT` | text | 🟢 | `41`, `44` |
| 2 | `POSITION_POP` | text | 🟢 | `5`, `6`, `7` |
| 3 | `PANNEAU_ID_PAN` | text | 🟢 | `1698180`, `1698179`, `1698181` |
| 4 | `PANNEAU_ID_RPA` | text | 🟢 | `2413`, `14327`, `1637` |
| 5 | `DESCRIPTION_RPA` | text | 🟢 | `\P 08h30-11h30 MER. 1 AVRIL AU 1 DEC.`, `\P EN TOUT TEMPS`, `\P 9h30-18h EXCEPTE S3R` |
| 6 | `CODE_RPA` | text | 🟢 | `SD-TT`, `SU-AE-A`, `R-QW` |
| 7 | `FLECHE_PAN` | text | 🟢 | `0`, `3`, `2` |
| 8 | `TOPONYME_PAN` | text | 🔴 | _vide_ |
| 9 | `DESCRIPTION_CAT` | text | 🟢 | `STATIONNEMENT` |
| 10 | `POTEAU_VERSION_POT` | text | 🟢 | `3`, `6` |
| 11 | `DATE_CONCEPTION_POT` | text | 🟢 | `2021-09-29`, `2022-05-04` |
| 12 | `DESCRIPTION_RAC` | text | 🟢 | `Aucune`, `Installer` |
| 13 | `DATE_EXECUTION_ACT` | text | 🟡 | `2022-05-26`, `2021-10-05` |
| 14 | `PAS_SUR_RUE` | text | 🔴 | _vide_ |
| 15 | `DESCRIPTION_REP` | text | 🟢 | `Réel` |
| 16 | `DESCRIPTION_RTP` | text | 🟢 | `1- Tige (Gazon, asphalte)`, `4- Poteau en bois` |
| 17 | `X` | text | 🟢 | `301134.875`, `301199.938` |
| 18 | `Y` | text | 🟢 | `5048247`, `5048277.5` |
| 19 | `Longitude` | text | 🟢 | `-73.54696`, `-73.546126` |
| 20 | `Latitude` | text | 🟢 | `45.574122`, `45.574396` |
| 21 | `NOM_ARROND` | text | 🟢 | `Mercier - Hochelaga-Maisonneuve` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `TOPONYME_PAN`: 99.1% null
- `PAS_SUR_RUE`: 98.7% null

#### Ressource: Signalisation-codification RPA des panneaux  (CSV)

- **Resource ID**: `1baac760-4311-4b4f-8996-db93d348cc24`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 3,982
- **Nombre de champs**: 3

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `PANNEAU_ID_RPA` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `DESCRIPTION_RPA` | text | 🟢 | `\A 07h-19h`, `\A 22h-07h`, `INTERDICTION DE STAT. S3R (GR. R) 9H ...` |
| 3 | `CODE_RPA` | text | 🟢 | `R-XD`, `AD-JA`, `AD-NM` |

#### Ressource: Signalisation-codification RTP des panneaux  (CSV)

- **Resource ID**: `5b381343-121d-478e-8328-7698063d1f57`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 21
- **Nombre de champs**: 1

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `DESCRIPTION_RTP` | text | 🟢 | `1- Tige et base`, `12- Balise`, `18- Viaduc` |

---

### Sondage - Expérimentation de mobilité autonome à Montréal

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-sondage-mobilite-autonome` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-sondage-mobilite-autonome` |
| **Fréquence de mise à jour** | notPlanned |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Innovation, Mobilité, SPSPO, Sondage, Véhicule autonome |

**Description**: Cet ensemble de données présente deux sondages effectués dans le cadre des projets pilotes de navettes autonomes ayant eu lieu sur le territoire de Montréal depuis 2018 portés par la Ville ou auxquels la Ville a collaboré. 

Le premier a été fait l'automne 2018 auprès des utilisateurs des navettes ayant opéré au Parc Olympique et passants sur le site. La [documentation](
https://parcolympique.qc.ca/nouvelles/2019/12/navette-electriques-autonomes-au-parc-olympique-publication-du-rapport-du-projet-pilote/) est disponible sur le site de l'organisation.

Le second a été réalisé à l’automne 2019 auprès des utilisateurs du premier projet sur voies publiques à Montréal entre le Parc Olympique et le Marché Maisonneuve. 

En 2021 et 2022, c’est au sein de l’arrondissement de Rosemont-La Petite-Patrie, plus précisément sur les rues Saint-Hubert et Saint-André, qu’a eu lieu un troisième projet pilote de navettes autonomes. L’INRS a publié les résultats d’une étude sur la perception des uti

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: CSV, PDF

#### Ressource: Sondage sur les navettes autonomes - Marché Maisonneuve (2019) (CSV)

- **Resource ID**: `b3fdbfb5-4f3c-4c9e-bc1b-748b76c53ce7`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 151
- **Nombre de champs**: 30

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Id` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `date` | datetime | 🟢 | `2019-07-11T14:19:54`, `2019-07-11T14:24:45`, `2019-07-11T14:31:08` |
| 3 | `evaluation_service_motivation_prise_navette` | text | 🟢 | `Pour l'expérience de monter dans une ...`, `Pour l'expérience de monter dans une ...`, `Pour l'expérience de monter dans une ...` |
| 4 | `evaluation_service_but_deplacement` | text | 🟢 | `Loisir / promenade` |
| 5 | `evaluation_service_transport_remplace` | text | 🟢 | `À vélo`, `À pied` |
| 6 | `evaluation_service_planification_trajet` | text | 🟢 | `Non`, `Oui` |
| 7 | `evaluation_service_appreciation` | decimal | 🟢 | `5`, `4` |
| 8 | `evaluation_service_avantages` | text | 🟢 | `Accroitre la fréquence des transports...`, `Accroitre la fréquence des transports...`, `Accroitre la fréquence des transports...` |
| 9 | `evaluation_service_besoins_mobilite` | text | 🟢 | `Oui, lesquels, Personne âgée`, `Oui, lesquels` |
| 10 | `evaluation_service_arrets_plus_frequents` | text | 🟢 | `Marché Maisonneuve`, `Stade Olympique` |
| 11 | `evaluation_service_apport` | text | 🟢 | `Non`, `Pas régulièrement plus circuit plus é...`, `Oui` |
| 12 | `evaluation_service_obstacles_integration` | text | 🟢 | `Fiabilité de la technologie, Peur des...`, `Fiabilité de la technologie`, `Sécurité des passagers de la navette,...` |
| 13 | `habitudes_transport_frequence` | text | 🟢 | `Tous les jours ou presque`, `Quelques fois par semaine` |
| 14 | `habitudes_transport_temps` | text | 🟢 | `0 - 30 min`, `30 min - 1h`, `1h - 1h30` |
| 15 | `habitudes_transport_irritants` | text | 🟢 | `Fiabilité (panne, accident, non prése...`, `Confort, Distance à pied totale sur l...`, `Fréquence, Confort, Achalandage, Dist...` |
| 16 | `relation_navette_premiere_experience` | text | 🟢 | `Non` |
| 17 | `relation_navette_confort_autonomie` | decimal | 🟢 | `5`, `4`, `3` |
| 18 | `relation_navette_confiance_technologie` | decimal | 🟢 | `5`, `4`, `3` |
| 19 | `relation_navette_confort_absence_operateur` | text | 🟢 | `Aucun problème`, `Je me demande qui assurera la sécurit...` |
| 20 | `relation_navette_confort_controleur_a_distance` | text | 🟢 | `Oui` |
| 21 | `relation_navette_pieton` | decimal | 🟢 | `4`, `3` |
| 22 | `relation_navette_cycliste` | decimal | 🟢 | `4`, `3` |
| 23 | `relation_navette_voiture` | decimal | 🟢 | `4`, `3` |
| 24 | `relation_navette_perception` | text | 🟢 | `de manière plutôt positive`, `de manière très positive` |
| 25 | `classement_groupe_age` | text | 🟢 | `35 à 50 ans`, `18 à 34 ans`, `51 à 64 ans` |
| 26 | `classement_genre` | text | 🟢 | `Femme`, `Ne souhaite pas répondre`, `Homme` |
| 27 | `classement_niveau_etude` | text | 🟢 | `Diplôme d'études secondaires`, `Diplôme d'études collégiales` |
| 28 | `classement_mobilite_reduite` | text | 🟢 | `Non` |
| 29 | `classement_statut_emploi` | text | 🟢 | `Travailleur à temps plein`, `Étudiant`, `Retraité` |
| 30 | `commentaire` | text | 🟢 | `En banlieue ce serait pratique` |

#### Ressource: Sondage sur les navettes autonomes - Parc Olympique (2018) (CSV)

- **Resource ID**: `a8315937-4e51-4f86-aeab-6b219dd27cef`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 182
- **Nombre de champs**: 48

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Id` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `date` | datetime | 🟢 | `2018-10-23T00:00:00` |
| 3 | `provenance` | text | 🟢 | `Par courriel` |
| 4 | `relation_navette_connaissance` | text | 🟢 | `Oui` |
| 5 | `relation_navette_premiere_experience` | text | 🟢 | `Non`, `Oui` |
| 6 | `relation_navette_confort_autonomie` | decimal | 🟡 | `5`, `4` |
| 7 | `relation_navette_confiance_technologie` | decimal | 🟢 | `5`, `4`, `3` |
| 8 | `relation_avec _technologie` | text | 🟢 | `J'adopte rapidement les technologies ...`, `J'ai besoin d'être convaincu pour ado...` |
| 9 | `relation_navette_meilleur_usage` | text | 🟢 | `Transport de personnes à mobilité réd...`, `À la sortie des stations de transport...`, `À la sortie des stations de transport...` |
| 10 | `relation_navette_avantages` | text | 🟢 | `Ne pas avoir à me stationner (la nave...`, `Ne pas avoir à me stationner (la nave...`, `Aide au transport de personnes qui ne...` |
| 11 | `relation_navette_barrieres_utilisation` | text | 🟢 | `non utilisable s'il y a beaucoup de p...`, `Sécurité des passants, Fiabilité des ...`, `Cybersécurité, Fiabilité des technolo...` |
| 12 | `relation_navette_integration_rue` | text | 🟢 | `Oui`, `Pas convaincu` |
| 13 | `relation_navette_integration_transport` | text | 🟢 | `Oui` |
| 14 | `relation_navette_voiture` | text | 🟢 | `Confortable`, `Très confortable` |
| 15 | `relation_navette_cycliste` | text | 🟢 | `Confortable`, `Très confortable` |
| 16 | `relation_navette_pieton` | text | 🟢 | `Confortable`, `Très confortable` |
| 17 | `navette_parc_olympique_connaissance` | text | 🟢 | `Oui` |
| 18 | `navette_parc_olympique_essaie` | text | 🟢 | `Non`, `Oui` |
| 19 | `navette_parc_olympique_non_essaie` | text | 🟢 | `Trop lent`, `Elle circule trop lentement, toujours...`, `L'occasion ne s'est pas encore présentée` |
| 20 | `navette_parc_olympique_evaluation_experience` | decimal | 🔴 | `3` |
| 21 | `navette_parc_olympique_confort_autonomie` | decimal | 🔴 | `5`, `4` |
| 22 | `navette_parc_olympique_securite_en_mouvement` | text | 🟢 | `Oui` |
| 23 | `navette_parc_olympique_sentiment_sans_controleur` | decimal | 🔴 | `3` |
| 24 | `navette_parc_olympique_comparaison_autre_transport` | decimal | 🔴 | `4`, `3` |
| 25 | `navette_parc_olympique_integration` | text | 🟢 | `Oui` |
| 26 | `navette_parc_olympique_evaluation_trajet` | text | 🟢 | `1`, `2` |
| 27 | `navette_parc_olympique_evaluation_confort` | text | 🟢 | `5`, `4` |
| 28 | `navette_parc_olympique_evaluation_vitesse` | text | 🟢 | `2` |
| 29 | `navette_parc_olympique_evaluation_emplacement_arrets` | text | 🟢 | `4`, `1` |
| 30 | `navette_parc_olympique_evaluation_nbre_arrets` | text | 🟢 | `5`, `1` |
| 31 | `navette_parc_olympique_evaluation_cortoisie_operateur` | text | ⚪ | `3`, `Pas d'opinion` |
| 32 | `navette_parc_olympique_evaluation_horaire` | text | ⚪ | `4` |
| 33 | `relation_voiture_pocession` | text | ⚪ | `Non`, `Oui` |
| 34 | `relation_voiture_frequence_usage` | text | ⚪ | `Quelques fois par semaine`, `Quelques fois par année` |
| 35 | `relation_voiture_conduite` | text | ⚪ | `Je n'ai pas d'opinion`, `Je ne conduis pas`, `Oui` |
| 36 | `relation_tranport_en_commun_usage` | text | ⚪ | `Non`, `Oui` |
| 37 | `relation_tranport_en_commun_frequence` | text | ⚪ | `Quelques fois par année`, `Quelques fois par semaine`, `Tous les jours` |
| 38 | `relation_transport_en_commun_nature` | text | ⚪ | `Autobus, Métro`, `Autobus`, `Métro` |
| 39 | `relation_tranport_en_commun_appreciation` | decimal | ⚪ | `1`, `3`, `4` |
| 40 | `classement_groupe_age` | text | ⚪ | `35 - 50 ans`, `51 - 65`, `16 ans à 24 ans` |
| 41 | `classement_genre` | text | ⚪ | `Femme`, `Homme` |
| 42 | `classement_niveau_etude` | text | ⚪ | `Baccalauréat`, `Études supérieures (DESS, Maitrise, D...`, `Diplome d'études secondaire` |
| 43 | `classement_mobilite_reduite` | text | ⚪ | `Non` |
| 44 | `classement_statut_emploi` | text | ⚪ | `Employé à temps plein`, `Employé à temps partiel` |
| 45 | `classement_duree_trajet` | text | ⚪ | `20 minutes`, `15 minutes à pied`, `1h` |
| 46 | `classement_frequence_teletravail` | text | ⚪ | `Jamais`, `Moins d'une fois par mois` |
| 47 | `classement_statut_familial` | text | ⚪ | `Famille avec enfant (1 ou 2 parents)`, `Personne seule ou en couple` |
| 48 | `commentaire` | text | ⚪ | _vide_ |

**⚠️ Champs avec >50% de valeurs nulles:**
- `navette_parc_olympique_comparaison_autre_transport`: 78.0% null
- `navette_parc_olympique_confort_autonomie`: 76.9% null
- `navette_parc_olympique_sentiment_sans_controleur`: 76.9% null
- `navette_parc_olympique_evaluation_experience`: 76.4% null

---

### Stationnements gratuits et payants (déneigement)

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-stationnements-deneigement` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-stationnements-deneigement` |
| **Fréquence de mise à jour** | annual |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | 311 Montréal, Arr., Déneigement, INFO-Neige MTL, Neige, SCAEC, Stationnement |

**Description**: Localisation des stationnements gratuits et payants disponibles durant les opérations de déneigement.

Les données sont également visibles sur l'application [311 Montréal](https://donnees.montreal.ca/fr/showcase/311-montreal-info-deneigement-alertes) et sur la [carte des opérations du déneigement](https://montreal.ca/services/carte-des-operations-de-deneigement).

**Formats disponibles**: CSV, GEOJSON

#### Ressource: Stationnements (déneigement) - Saison 2025-2026 (CSV)

- **Resource ID**: `e922fc9f-a2de-4712-bc51-bc1a220ce920`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 126
- **Nombre de champs**: 14

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_STA` | text | 🟢 | `174`, `175`, `176` |
| 2 | `ARRONDISSEMENT` | text | 🟢 | `Ahunstic-Cartierville`, `Anjou` |
| 3 | `BOROUGH` | text | 🟢 | `Ahunstic-Cartierville`, `Anjou` |
| 4 | `NBR_PLA` | text | 🟢 | `41`, `200`, `72` |
| 5 | `X` | text | 🟢 | `294222,12`, `294345,35`, `294247,76` |
| 6 | `Y` | text | 🟢 | `5045614,27`, `5045775,93`, `5045861,39` |
| 7 | `JURIDICTION` | text | 🟢 | `Municipale`, `Agence mobilité durable` |
| 8 | `EMPLACEMENT` | text | 🟢 | `Complexe sportif Claude-Robillard no....`, `Complexe sportif Claude-Robillard no....`, `Complexe sportif Claude-Robillard no....` |
| 9 | `LOCATION` | text | 🟢 | `Complexe sportif Claude-Robillard no....`, `Complexe sportif Claude-Robillard no....`, `Complexe sportif Claude-Robillard no....` |
| 10 | `HEURES` | text | 🟢 | `19:00 à 07:00`, `06:00 à 18:00` |
| 11 | `HOURS` | text | 🟢 | `7:00 pm to 7:00 am`, `6:00 am to 6:00 pm` |
| 12 | `NOTE_FR` | text | 🔴 | `Sauf places réservées - Restriction d...` |
| 13 | `NOTE_EN` | text | 🔴 | `Except reserved spaces Restriction fr...` |
| 14 | `TYPE_PAY` | text | 🟢 | `0` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `NOTE_FR`: 82.5% null
- `NOTE_EN`: 82.5% null

#### Ressource: Stationnements (déneigement) - Saison 2024-2025 (CSV)

- **Resource ID**: `3fa557d2-c3b2-49a9-8d32-081c64d20d89`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 131
- **Nombre de champs**: 14

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_STA` | text | 🟢 | `174`, `175`, `176` |
| 2 | `ARRONDISSEMENT` | text | 🟢 | `Ahunstic-Cartierville`, `Anjou` |
| 3 | `BOROUGH` | text | 🟢 | `Ahunstic-Cartierville`, `Anjou` |
| 4 | `NBR_PLA` | text | 🟢 | `41`, `200`, `72` |
| 5 | `X` | text | 🟢 | `294222.12`, `294247.76`, `294345.35` |
| 6 | `Y` | text | 🟢 | `5045775.93`, `5045614.27`, `5045861.39` |
| 7 | `JURIDICTION` | text | 🟢 | `Municipale`, `Agence mobilité durable` |
| 8 | `EMPLACEMENT` | text | 🟢 | `Complexe sportif Claude-Robillard (AM...`, `Complexe sportif Claude-Robillard (AM...`, `Complexe sportif Claude-Robillard (AM...` |
| 9 | `LOCATION` | text | 🟢 | `Complexe sportif Claude-Robillard (AM...`, `Complexe sportif Claude-Robillard (AM...`, `Complexe sportif Claude-Robillard (AM...` |
| 10 | `HEURES` | text | 🟢 | `21:00 à 07:00`, `06:00 à 18:00` |
| 11 | `HOURS` | text | 🟢 | `9:00 pm to 7:00 am`, `6:00 am to 6:00 pm` |
| 12 | `NOTE_FR` | text | 🔴 | `Sauf places réservées Restriction de ...` |
| 13 | `NOTE_EN` | text | 🔴 | `Except reserved spaces Restriction fr...` |
| 14 | `TYPE_PAY` | text | 🟢 | `0` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `NOTE_FR`: 80.2% null
- `NOTE_EN`: 80.2% null

#### Ressource: Stationnements (déneigement) - Saison 2023-2024 (CSV)

- **Resource ID**: `ca607f13-a8a5-4fbf-a390-ffa5fa7d94d3`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 125
- **Nombre de champs**: 16

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_STA` | text | 🟢 | `91`, `92`, `58` |
| 2 | `ARRONDISSEMENT` | text | 🟢 | `Ahunstic-Cartierville`, `Anjou` |
| 3 | `BOROUGH` | text | 🟢 | `Ahunstic-Cartierville`, `Anjou` |
| 4 | `NBR_PLA` | text | 🟢 | `20`, `22` |
| 5 | `X` | text | 🟢 | `299399.1`, `298302.08`, `292433` |
| 6 | `Y` | text | 🟢 | `5051493.88`, `5051468.32`, `5046689.31` |
| 7 | `JURIDICTION` | text | 🟢 | `Municipale`, `Agence mobilité durable` |
| 8 | `EMPLACEMENT` | text | 🟢 | `Parc André-Laurendeau - 8361 av. Andr...`, `Parc Lucie-Bruneau - 7051 av. de l'Al...`, `Rue Fleury près de la rue Chambord (#...` |
| 9 | `LOCATION` | text | 🟢 | `Lucie-Bruneau Park - 7051 de l'Alsace...`, `Rue Fleury near Chambord St. (parking...`, `André-Laurendeau Park - 8361 André-La...` |
| 10 | `HEURES` | text | 🟢 | `21:00 à 07:00`, `06:00 à 18:00` |
| 11 | `HOURS` | text | 🟢 | `9:00 pm to 7:00 am`, `6:00 am to 6:00 pm` |
| 12 | `NOTE_FR` | text | 🔴 | `Sauf places réservées Restriction de ...` |
| 13 | `NOTE_EN` | text | 🔴 | `Except reserved spaces Restriction fr...` |
| 14 | `TYPE_PAY` | text | 🟢 | `false` |
| 15 | `Latitude` | text | 🟢 | `45.603097`, `45.603318`, `45.560005` |
| 16 | `Longitude` | text | 🟢 | `-73.583299`, `-73.658415`, `-73.569236` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `NOTE_FR`: 83.2% null
- `NOTE_EN`: 83.2% null

#### Ressource: Stationnements (déneigement) - Saison 2022-2023 (CSV)

- **Resource ID**: `656b01d5-b91c-434d-9c37-007aef93f3a1`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 127
- **Nombre de champs**: 16

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_STA` | text | 🟢 | `91`, `92`, `58` |
| 2 | `ARRONDISSEMENT` | text | 🟢 | `Ahunstic-Cartierville`, `Anjou` |
| 3 | `BOROUGH` | text | 🟢 | `Ahunstic-Cartierville`, `Anjou` |
| 4 | `NBR_PLA` | text | 🟢 | `20`, `22` |
| 5 | `X` | text | 🟢 | `299399.1`, `298302.08`, `292433` |
| 6 | `Y` | text | 🟢 | `5046689.3074128`, `5051493.88`, `5051468.32` |
| 7 | `JURIDICTION` | text | 🟢 | `Municipale`, `Agence mobilité durable` |
| 8 | `EMPLACEMENT` | text | 🟢 | `Parc André-Laurendeau - 8361 av. Andr...`, `Parc Lucie-Bruneau - 7051 av. de l'Al...`, `Rue Fleury près de la rue Chambord (#...` |
| 9 | `LOCATION` | text | 🟢 | `Lucie-Bruneau Park - 7051 de l'Alsace...`, `Rue Fleury near Chambord St. (parking...`, `André-Laurendeau Park - 8361 André-La...` |
| 10 | `HEURES` | text | 🟢 | `21:00 à 07:00`, `06:00 à 18:00` |
| 11 | `HOURS` | text | 🟢 | `9:00 pm to 7:00 am`, `6:00 am to 6:00 pm` |
| 12 | `NOTE_FR` | text | 🔴 | `Section horaire` |
| 13 | `NOTE_EN` | text | 🔴 | `Hourly spaces` |
| 14 | `TYPE_PAY` | text | 🟢 | `0` |
| 15 | `Latitude` | text | 🟢 | `45.603097`, `45.603318`, `45.560005` |
| 16 | `Longitude` | text | 🟢 | `-73.583299`, `-73.658415`, `-73.569236` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `NOTE_FR`: 85.0% null
- `NOTE_EN`: 85.0% null

#### Ressource: Stationnements (déneigement) - Saison 2021-2022 (CSV)

- **Resource ID**: `4d007708-0bff-4f69-95c7-697f1232f482`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 126
- **Nombre de champs**: 16

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_STA` | decimal | 🟢 | `7`, `4`, `6` |
| 2 | `ARRONDISSEMENT` | text | 🟢 | `Mercier - Hochelaga-Maisonneuve`, `Outremont` |
| 3 | `BOROUGH` | text | 🟢 | `Mercier - Hochelaga-Maisonneuve`, `Outremont` |
| 4 | `NBR_PLA` | decimal | 🟢 | `485`, `5`, `10` |
| 5 | `X` | decimal | 🟢 | `296066`, `295917`, `300900` |
| 6 | `Y` | decimal | 🟢 | `5042596.0222308`, `5047006.0179893`, `5042529.0157618` |
| 7 | `JURIDICTION` | text | 🟢 | `Municipale` |
| 8 | `EMPLACEMENT` | text | 🟢 | `nord de Van Horne entre Champagneur e...`, `3000, rue Viau`, `sud de Van Horne entre Querbes et Épé...` |
| 9 | `LOCATION` | text | 🟢 | `North of Van Horne, between Champagne...`, `South of Van Horne, between Querbes a...`, `3000, Viau St` |
| 10 | `HEURES` | text | 🟢 | `19:00 à 08:00`, `18:00 à 08:00` |
| 11 | `HOURS` | text | 🟢 | `7:00 pm to 8:00 am`, `6:00 pm to 8:00 am` |
| 12 | `NOTE_FR` | text | 🟢 | _vide_ |
| 13 | `NOTE_EN` | text | 🟢 | _vide_ |
| 14 | `TYPE_PAY` | decimal | 🟢 | `0` |
| 15 | `Latitude` | decimal | 🟢 | `45.522623`, `45.562954`, `45.523227` |
| 16 | `Longitude` | decimal | 🟢 | `-73.54996`, `-73.611805`, `-73.613711` |

#### Ressource: Stationnements (déneigement) - Saison 2020-2021 (CSV)

- **Resource ID**: `16288929-b544-47c8-9e2f-93b162fc04c6`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 137
- **Nombre de champs**: 18

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `OBJECTID` | decimal | 🟢 | `91`, `92`, `58` |
| 2 | `ARRONDISSEMENT` | text | 🟢 | `Ahunstic-Cartierville`, `Anjou` |
| 3 | `NBR_PLA` | decimal | 🟢 | `20`, `17` |
| 4 | `X` | decimal | 🟢 | `299399.1`, `298302.08`, `292433` |
| 5 | `Y` | decimal | 🟢 | `5051493.88`, `5051468.32`, `5046689.31` |
| 6 | `ID_STA` | decimal | 🟢 | `91`, `92`, `58` |
| 7 | `JURIDICTION` | text | 🟢 | `Municipale`, `Stationnement de Montréal` |
| 8 | `EMPLACEMENT` | text | 🟢 | `Parc André-Laurendeau - 8361 av. Andr...`, `Parc Lucie-Bruneau - 7051 av. de l'Al...`, `Rue Fleury près de la rue Chambord (#...` |
| 9 | `LOCATION` | text | 🟢 | `Lucie-Bruneau Park - 7051 de l'Alsace...`, `Rue Fleury near Chambord St. (parking...`, `André-Laurendeau Park - 8361 André-La...` |
| 10 | `HEURES` | text | 🟢 | `15:00 à 07:00`, `06:00 à 18:00` |
| 11 | `HOURS` | text | 🟢 | `3:00 pm to 07:00 am`, `6:00 am to 6:00 pm` |
| 12 | `BOROUGH` | text | 🟢 | `Ahunstic-Cartierville`, `Anjou` |
| 13 | `NBR_PLA_I` | decimal | 🟢 | `20`, `17` |
| 14 | `NOTE_FR` | text | 🟢 | `Section horaire` |
| 15 | `NOTE_EN` | text | 🟢 | `Hourly spaces` |
| 16 | `TYPE_PAY` | decimal | 🟢 | `0` |
| 17 | `Latitude` | decimal | 🟢 | `45.6033`, `45.56`, `45.6031` |
| 18 | `Longitude` | decimal | 🟢 | `-73.5833`, `-73.5692`, `-73.6584` |

#### Ressource: Stationnements (déneigement) - Saison 2019-2020 (CSV)

- **Resource ID**: `363b07ad-ae00-4090-b778-949aa1b36a31`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 75
- **Nombre de champs**: 15

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_STA` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `ARRONDISSEMENT` | text | 🟢 | `LaSalle`, `Mercier - Hochelaga-Maisonneuve`, `Le Plateau-Mont-Royal` |
| 3 | `NBR_PLA` | decimal | 🟢 | `150`, `90`, `70` |
| 4 | `X` | decimal | 🟢 | `299138`, `292122`, `299335` |
| 5 | `Y` | decimal | 🟢 | `5032097.0186154`, `5043043.0153853`, `5043732.0219048` |
| 6 | `JURIDICTION` | text | 🟢 | `Municipale` |
| 7 | `EMPLACEMENT` | text | 🟢 | `55, av. Dupras`, `3815, av. Calixa-Lavallée`, `4375, rue Cartier` |
| 8 | `LOCATION` | text | 🟢 | `55, av. Dupras`, `3815, av. Calixa-Lavallée`, `4375, rue Cartier` |
| 9 | `HEURES` | text | 🟢 | `23h à 7h`, `22h à 7h`, `20h à 8h` |
| 10 | `HOURS` | text | 🟢 | `10 p.m to 7 a.m`, `8 p.m to 8 a.m`, `11 p.m to 7 a.m` |
| 11 | `BOROUGH` | text | 🟢 | `LaSalle`, `Mercier - Hochelaga-Maisonneuve`, `Le Plateau-Mont-Royal` |
| 12 | `Note_FR` | text | 🟢 | _vide_ |
| 13 | `Note_EN` | text | 🟢 | _vide_ |
| 14 | `Longitude` | decimal | 🟢 | `-73.6620215842`, `-73.5724931646`, `-73.5699631986` |
| 15 | `Latitude` | decimal | 🟢 | `45.5272829764`, `45.4286922709`, `45.5334813463` |

#### Ressource: Stationnements (déneigement) - Saison 2018-2019 (CSV)

- **Resource ID**: `38a0e4af-e7eb-4708-814a-fd62f4095bb2`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 83
- **Nombre de champs**: 17

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `OBJECTID` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `ARRONDISSEMENT` | text | 🟢 | `LaSalle`, `Mercier - Hochelaga-Maisonneuve`, `Le Plateau-Mont-Royal` |
| 3 | `NBR_PLA` | decimal | 🟢 | `150`, `90`, `70` |
| 4 | `X` | decimal | 🟢 | `299138`, `292122`, `299335` |
| 5 | `Y` | decimal | 🟢 | `5032097.01861536`, `5043732.02190475`, `5043043.01538533` |
| 6 | `ID_STA` | decimal | 🟢 | `1`, `3`, `2` |
| 7 | `JURIDICTION` | text | 🟢 | `Municipale` |
| 8 | `EMPLACEMENT` | text | 🟢 | `55, av. Dupras`, `3815, av. Calixa-Lavallée`, `4375, rue Cartier` |
| 9 | `LOCATION` | text | 🟢 | `55, av. Dupras`, `3815, av. Calixa-Lavallée`, `4375, rue Cartier` |
| 10 | `HEURES` | text | 🟢 | `23h à 7h`, `22h à 7h`, `20h à 8h` |
| 11 | `HOURS` | text | 🟢 | `10 p.m to 7 a.m`, `8 p.m to 8 a.m`, `11 p.m to 7 a.m` |
| 12 | `BOROUGH` | text | 🟢 | `LaSalle`, `Mercier - Hochelaga-Maisonneuve`, `Le Plateau-Mont-Royal` |
| 13 | `NBR_PLA_I` | decimal | 🟢 | `150`, `90`, `70` |
| 14 | `Note_FR` | text | 🟢 | _vide_ |
| 15 | `Note_EN` | text | 🟢 | _vide_ |
| 16 | `Longitude` | decimal | 🟢 | `-73.66202325`, `-73.5724947`, `-73.56996486` |
| 17 | `Latitude` | decimal | 🟢 | `45.52728302`, `45.42869228`, `45.53348133` |

#### Ressource: Stationnements (déneigement) - Saison 2017-2018 (CSV)

- **Resource ID**: `ec519f1e-9f3a-48c5-9c00-b83c6392c41b`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 60
- **Nombre de champs**: 16

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_STA` | decimal | 🟢 | `1`, `3`, `4` |
| 2 | `ARROND` | text | 🟢 | `LaSalle`, `Mercier - Hochelaga-Maisonneuve`, `Le Plateau-Mont-Royal` |
| 3 | `NBR_PLA` | decimal | 🟢 | `150`, `90`, `70` |
| 4 | `X` | decimal | 🟢 | `299138`, `292122`, `299335` |
| 5 | `Y` | decimal | 🟢 | `5043731`, `5032096`, `5043042` |
| 6 | `LONG` | decimal | 🟢 | `-73.5699648629258`, `-73.5724947009445`, `-73.6620232455977` |
| 7 | `LAT` | decimal | 🟢 | `45.5334813281651`, `45.5272830169117`, `45.4286922810093` |
| 8 | `JURIDICTIO` | text | 🟢 | `Municipale` |
| 9 | `EMPLACEMEN` | text | 🟢 | `55, av. Dupras`, `3815, av. Calixa-Lavallée`, `4375, rue Cartier` |
| 10 | `LOCATION` | text | 🟢 | `55, av. Dupras`, `3815, av. Calixa-Lavallée`, `4375, rue Cartier` |
| 11 | `HEURES` | text | 🟢 | `23h à 7h`, `22h à 7h`, `20h à 8h` |
| 12 | `HOURS` | text | 🟢 | `10 p.m to 7 a.m`, `8 p.m to 8 a.m`, `11 p.m to 7 a.m` |
| 13 | `BOROUGH` | text | 🟢 | `LaSalle`, `Mercier - Hochelaga-Maisonneuve`, `Le Plateau-Mont-Royal` |
| 14 | `NBR_PLA_I` | decimal | 🟢 | `150`, `90`, `70` |
| 15 | `Note_FR` | text | 🟢 | _vide_ |
| 16 | `Note_EN` | text | 🟢 | _vide_ |

#### Ressource: Stationnements (déneigement) - Saison 2016-2017 (CSV)

- **Resource ID**: `262fb84f-53b7-479c-a3ff-b8a897d6eab4`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 60
- **Nombre de champs**: 9

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_STA` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `ARRONDISSEMENT` | text | 🟢 | `LaSalle`, `Mercier - Hochelaga-Maisonneuve`, `Le Plateau-Mont-Royal` |
| 3 | `NBR_PLACE` | decimal | 🟢 | `130`, `150`, `90` |
| 4 | `JURIDICTION` | text | 🟢 | `Municipale` |
| 5 | `EMPLACEMENT` | text | 🟢 | `707, 75e Avenue`, `55, av. Dupras`, `3815, av. Calixa-Lavallée` |
| 6 | `HEURES` | text | 🟢 | `23h à 7h`, `22h à 7h`, `20h à 8h` |
| 7 | `Latitude` | decimal | 🟢 | `4542132812`, `4552727384`, `454286831` |
| 8 | `Longitude` | decimal | 🟢 | `-7356996319`, `-7366202156`, `-7362921196` |
| 9 | `Note FR` | text | 🟢 | _vide_ |

---

### Temps de parcours sur des segments routiers (historique)

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-temps-de-parcours-sur-des-segments-routiers-historique` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-temps-de-parcours-sur-des-segments-routiers-historique` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Congestion, Route, SUM, Temps de parcours, Trafic, Vitesse |

**Description**: De manière à collecter des données sur l'état de la circulation, la Ville de Montréal déploie un réseau de capteurs utilisant la technologie Bluetooth sur certains segments routiers stratégiques et permettant de calculer le temps de parcours sur ces segments. Cet ensemble de données présente les temps de parcours. L'ensemble de données [Segments routiers de collecte des temps de parcours](/dataset/segments-routiers-de-collecte-des-temps-de-parcours) décrit les segments du réseau de collecte.

**Formats disponibles**: CSV

#### Ressource: Temps de parcours 2019 (CSV)

- **Resource ID**: `9b266e6d-bd3c-42d6-973f-cf09fa07bd05`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 7,221,500
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `LinkId` | text | 🟢 | `LSD_50-30`, `LSD_89-87`, `LRL_37-1B` |
| 2 | `SrcDetectorId` | text | 🟢 | `50`, `89`, `37` |
| 3 | `DestDetectorId` | text | 🟢 | `87`, `30`, `1B` |
| 4 | `PathDistance_m` | decimal | 🟢 | `435`, `308`, `476` |
| 5 | `TripStart_dt` | datetime | 🟢 | `2019-01-01T04:41:31`, `2019-01-01T04:42:33`, `2019-01-01T04:42:17` |
| 6 | `TripEnd_dt` | datetime | 🟢 | `2019-01-01T04:43:44`, `2019-01-01T04:43:42`, `2019-01-01T04:43:43` |
| 7 | `Speed_kmh` | decimal | 🟢 | `11.8636364`, `13.0447059`, `24.1352113` |
| 8 | `TravelTime_s` | decimal | 🟢 | `85`, `71`, `132` |

#### Ressource: Temps de parcours 2018 (CSV)

- **Resource ID**: `6fcb45d7-9c98-4081-a56c-cf99e4e7b923`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 3,692,545
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `LinkId` | text | 🟢 | `LSC_92-93`, `LRo_32-35`, `LSH_81-93` |
| 2 | `SrcDetectorId` | text | 🟢 | `92`, `32`, `81` |
| 3 | `DestDetectorId` | text | 🟢 | `93`, `02`, `35` |
| 4 | `PathDistance_m` | text | 🟢 | `208`, `222`, `508` |
| 5 | `TripStart_dt` | text | 🟢 | `2018-01-08 16:35:52`, `2018-01-08 16:52:31`, `2018-01-08 16:54:51` |
| 6 | `TripEnd_dt` | text | 🟢 | `2018-01-08 16:55:09`, `2018-01-08 16:55:13`, `2018-01-08 16:55:14` |
| 7 | `Speed_kmh` | text | 🟢 | `1.5751938`, `44.4000000`, `4.7392405` |
| 8 | `TravelTime_s` | text | 🟢 | `1161`, `158`, `18` |

#### Ressource: Temps de parcours 2017 (CSV)

- **Resource ID**: `960d7d6f-5c86-4eca-ae96-167440d5656c`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 9,470,791
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `LinkId` | text | 🟢 | `LCC_35-36`, `LCC_35-34`, `LLo_41-42` |
| 2 | `SrcDetectorId` | text | 🟢 | `41`, `35` |
| 3 | `DestDetectorId` | text | 🟢 | `36`, `42`, `34` |
| 4 | `PathDistance_m` | text | 🟢 | `448`, `1570`, `1115` |
| 5 | `TripStart_dt` | text | 🟢 | `2017-08-22 23:59:44`, `2017-08-22 23:58:58`, `2017-08-22 23:58:02` |
| 6 | `TripEnd_dt` | text | 🟢 | `2017-08-23 00:00:10`, `2017-08-23 00:00:07`, `2017-08-23 00:00:14` |
| 7 | `Speed_kmh` | text | 🟢 | `52.8157895`, `44.1562500`, `70.1217391` |
| 8 | `TravelTime_s` | text | 🟢 | `76`, `23`, `128` |

#### Ressource: Temps de parcours 2016 (CSV)

- **Resource ID**: `6542cee3-28b6-4b45-b62b-377fbb31c733`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 757,250
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `LinkId` | text | 🟢 | `LSh_05-06`, `LCC_35-34`, `LSh_02-01` |
| 2 | `SrcDetectorId` | decimal | 🟢 | `5`, `2`, `35` |
| 3 | `DestDetectorId` | decimal | 🟢 | `1`, `6`, `34` |
| 4 | `PathDistance_m` | decimal | 🟢 | `1192`, `448`, `403` |
| 5 | `TripStart_dt` | datetime | 🟢 | `2016-01-25T15:40:53`, `2016-01-25T15:40:49`, `2016-01-25T15:40:52` |
| 6 | `TripEnd_dt` | datetime | 🟢 | `2016-01-25T15:41:19`, `2016-01-25T15:41:16`, `2016-01-25T15:41:21` |
| 7 | `Speed_kmh` | decimal | 🟢 | `518142857`, `523317073`, `597333333` |
| 8 | `TravelTime_s` | decimal | 🟢 | `82`, `27`, `28` |

---

### Tracés des lignes de bus et de métro

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-stm-traces-des-lignes-de-bus-et-de-metro` |
| **Organisation** | Société de transport de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-stm-traces-des-lignes-de-bus-et-de-metro` |
| **Fréquence de mise à jour** | quarterly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Arrêt de bus, Autobus, Bus, Métro, STM, Transport collectif |

**Description**: Ensemble de données contenant les informations géospatiales des tracés et des arrêts des lignes de bus et de métro de la Société de transport de Montréal.

### Important

Le présent ensemble de données est la propriété de la Société de transport de Montréal. Conséquemment, selon la clause d'attribution de la licence Creative Commons 4.0, la paternité des données doit être attribuée à la Société de transport de Montréal.

Veuillez [communiquer](http://www.stm.info/fr/nous-joindre) avec la Société de transport de Montréal si vous avez des questions sur cet ensemble de données.

#### *Ne pas tenir compte de la date de dernière modification de la ressource. Celle-ci pointe toujours vers les [données GTFS](https://www.stm.info/fr/a-propos/developpeurs) les plus récentes de la STM.*

**Formats disponibles**: SHP

---

### Trajets individuels à vélo enregistrés par Mon RésoVélo

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-trajets-individuels-velo-enregistre-mon-resovelo` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-trajets-individuels-velo-enregistre-mon-resovelo` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | SUM, Transport, Vélo |

**Description**: Trajets individuels tel qu'enregistrés par l'application Mon RésoVélo de la Ville de Montréal. Cette application mobile a été développée pour collecter des informations sur les déplacements à vélo sur le territoire de l'agglomération montréalaise. Les utilisateurs de l'application ont installé l'application sur leur téléphone et devaient activer l'application pour enregistrer un trajet.

Les données fournies ici sont les trajets individuels enregistrés par l'application et traités pour préserver la vie privée des utilisateurs.

De part la méthode de collecte (collecte volontaire sans sélection des utilisateurs), il n’est pas possible de garantir que ces données sont pleinement représentatives de l’usage du vélo (p. ex. biais de représentation dans les utilisateurs de l’application, etc.) D’autres limitations quant à ces données sont listées dans la section méthodologie.

**Formats disponibles**: ZIP

---

### Voies ferrées 3D

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-voies-ferrees-3d` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-voies-ferrees-3d` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | SIRR, chemin de fer, voie ferrée |

**Description**: Représentation géométrique et conventionnelle du système ferroviaire pour des fins de planification.

Ces données géospatiales sont structurées selon les couches d’informations suivantes;

- CARTO-FER-ACCESSOIRE : barrière de passage à niveau & lanterne de passe à niveau
- CARTO-FER-DEBARCADERE : quai pour l’embarquement / débarquement de marchandises ou passagers
- CARTO-FER-PONT : ouvrage d’art ferroviaire permettant de franchir un obstacle
- CARTO-FER-VOIE : chemin de fer

Ces éléments constituent une partie des calques de la compilation cartographique numérique.

**Formats disponibles**: GPKG, SHP

---

### Véhicules appartenant à la Ville de Montréal ou en location long terme

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-vehicules-appartenant-a-la-ville-de-montreal` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-vehicules-appartenant-a-la-ville-de-montreal` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Camion, Camion léger, SMRA, Voiture, Véhicule, Véhicule-outil |

**Description**: Ensemble de données contenant le nombre de véhicules par type de véhicule et par unité administrative que la Ville de Montréal possède ou loue selon des contrats long terme.

**Formats disponibles**: CSV

#### Ressource: Liste des véhicules au format CSV (CSV)

- **Resource ID**: `b01f31e1-ec26-4d2d-92f5-e2eeb46b6e30`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 42
- **Nombre de champs**: 15

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `unite-administrative` | text | 🟢 | `Arr. Côte-des-Neiges–Notre-Dame-de-Grâce`, `Arr. Anjou`, `Arr. Ahuntsic-Cartierville` |
| 2 | `auto-appartenant` | decimal | 🟢 | `16`, `10`, `18` |
| 3 | `auto-loc-lt` | decimal | 🟢 | `5`, `0`, `3` |
| 4 | `camion-legers-appartenant` | decimal | 🟢 | `25`, `40`, `39` |
| 5 | `camion-leger-loc-lt` | decimal | 🟢 | `0`, `8` |
| 6 | `camion-lourd-appartenant` | decimal | 🟢 | `21`, `46`, `66` |
| 7 | `camion-lourd-loc-lt` | decimal | 🟢 | `9`, `0`, `6` |
| 8 | `veh-outil-leger-appartenant` | decimal | 🟢 | `19`, `12`, `6` |
| 9 | `veh-outil-leger-loc-lt` | decimal | 🟢 | `0` |
| 10 | `veh-outil-lourd-appartenant` | decimal | 🟢 | `30`, `22`, `26` |
| 11 | `veh-outil-lourd-loc-lt` | decimal | 🟢 | `9`, `0`, `4` |
| 12 | `autre-leger-appartenant` | decimal | 🟢 | `56`, `33`, `66` |
| 13 | `autre-leger-loc-lt` | decimal | 🟢 | `1`, `0` |
| 14 | `autre-lourd-appartenant` | decimal | 🟢 | `23`, `3`, `24` |
| 15 | `autre-lourd-loc-lt` | decimal | 🟢 | `0`, `1` |

---

### Véhicules électriques et hybrides

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-vehicules-electriques-et-hybrides` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-vehicules-electriques-et-hybrides` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Hybride, Réseau électrique, Véhicule hybride, Véhicule électrique, Zéro émission, Électrique |

**Description**: Ensemble de données contenant le nombre de véhicules électriques et hybrides par type de véhicule et par unité administrative.

**Formats disponibles**: CSV, XLSX

#### Ressource: Nombre de véhicules électriques et hybrides au format MS Excel (XLSX)

- **Resource ID**: `32d74c10-a270-4b04-ac83-0fa05f68d6e9`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 30
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `unite_administrative` | text | 🟢 | `Arr. Côte-des-Neiges–Notre-Dame-de-Grâce`, `Arr. Anjou`, `Arr. Ahuntsic-Cartierville` |
| 2 | `automobile_electrique` | decimal | 🟠 | `1` |
| 3 | `automobile_hybride` | decimal | 🟡 | `1`, `2` |
| 4 | `camion_leger_electrique` | decimal | 🔴 | _vide_ |
| 5 | `veh_outil_leger_electrique` | decimal | 🔴 | _vide_ |
| 6 | `veh_outil_lourd_electrique` | decimal | 🟠 | `1`, `2` |
| 7 | `autre_equipement_leger_electrique` | decimal | 🟠 | `1` |
| 8 | `total_general` | decimal | 🟢 | `5`, `4`, `1` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `camion_leger_electrique`: 83.3% null
- `veh_outil_leger_electrique`: 76.7% null
- `autre_equipement_leger_electrique`: 60.0% null
- `automobile_electrique`: 53.3% null

#### Ressource: Nombre de véhicules électriques et hybrides au format CSV (CSV)

- **Resource ID**: `04e04cd7-96e3-4aed-bc5a-d30dc08c08fc`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 30
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `unite_administrative` | text | 🟢 | `Arr. Côte-des-Neiges–Notre-Dame-de-Grâce`, `Arr. Anjou`, `Arr. Ahuntsic-Cartierville` |
| 2 | `automobile_electrique` | decimal | 🟢 | `0`, `1` |
| 3 | `automobile_hybride` | decimal | 🟢 | `1`, `0`, `2` |
| 4 | `camion_leger_electrique` | decimal | 🟢 | `0` |
| 5 | `veh_outil_leger_electrique` | decimal | 🟢 | `0` |
| 6 | `veh_outil_lourd_electrique` | decimal | 🟢 | `0`, `1`, `2` |
| 7 | `autre_equipement_leger_electrique` | decimal | 🟢 | `0`, `1` |
| 8 | `total_general` | decimal | 🟢 | `5`, `4`, `1` |

---

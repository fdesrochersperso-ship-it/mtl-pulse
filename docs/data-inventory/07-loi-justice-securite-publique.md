# 07. Loi, justice et sécurité publique
# Law, Justice and Public Safety

> **Nombre de datasets**: 22
> **Catégorie portail**: `loi-justice-securite-publique`
> **Généré le**: 2026-03-09 15:37

---

## Table des matières

1. [Actes criminels](#vmtl-actes-criminels)
2. [Avis de détérioration](#vmtl-avis-deterioration)
3. [Avis et alertes](#vmtl-avis-alertes)
4. [Casernes de pompiers sur l’île de Montréal](#vmtl-casernes-pompiers)
5. [Collisions routières](#vmtl-collisions-routieres)
6. [Communiqués de presse](#vmtl-communique-presse)
7. [Interventions des pompiers de Montréal](#vmtl-interventions-service-securite-incendie-montreal)
8. [Lieux et bâtiments à vocation publique](#vmtl-lieux-batiments-vocation-publique)
9. [Limite des secteurs de poste de quartier de police](#vmtl-limites-pdq-spvm)
10. [Personnes élues ayant suivi la formation obligatoire en éthique (archives)](#vmtl-formation-ethique-personnes-elues)
11. [Plan d'urbanisme - Densité de construction](#vmtl-plan-urbanisme-densite)
12. [Postes de police de quartier sur l’île de Montréal](#vmtl-carte-postes-quartier)
13. [Règlements municipaux](#vmtl-reglements-municipaux)
14. [Schéma d'aménagement et de développement - Affectation du sol et densité d'occupation](#vmtl-schema-affectation-densite)
15. [Schéma d'aménagement et de développement - Environnement et milieux naturels](#vmtl-schema-environnement-milieux-naturels)
16. [Schéma d'aménagement et de développement - Patrimoine et paysage](#vmtl-schema-patrimoine-paysage)
17. [Schéma d'aménagement et de développement - Transport](#vmtl-schema-transport)
18. [Schéma d'aménagement et de développement - Économie](#vmtl-schema-economie)
19. [Schéma d'aménagement et de développement - Équipements collectifs](#vmtl-schema-equipements-collectifs)
20. [Signalements de coyotes](#vmtl-signalements-de-coyotes)
21. [Territoires administratifs des casernes](#vmtl-territoires-administratifs-des-casernes)
22. [Vidéos des séances des instances décisionnelles](#vmtl-videodiffusion-seances-instances-politiques)

---

## Statistiques de la catégorie

| Métrique | Valeur |
|----------|--------|
| Datasets | 22 |
| Ressources totales | 147 |
| Ressources DataStore (requêtables via API) | 28 |
| Enregistrements totaux (DataStore) | 3,095,347 |

---

### Actes criminels

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-actes-criminels` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-actes-criminels` |
| **Fréquence de mise à jour** | daily |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Crime, Criminalité, Police, SPVM, Sécurité publique |

**Description**: Liste des actes criminels enregistrés par le Service de police de la Ville de Montréal (SPVM).

Un outil de visualisation des données permet également d'afficher sur les données sous forme de carte : [Vue sur la sécurité publique](https://ville.montreal.qc.ca/vuesurlasecuritepublique/)

**Formats disponibles**: CSV, GEOJSON, ZIP

#### Ressource: Actes criminels (CSV)

- **Resource ID**: `c6f482bf-bf0f-4960-8b2f-9982c211addd`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 344,031
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `CATEGORIE` | text | 🟢 | `Vol de véhicule à moteur`, `Méfait` |
| 2 | `DATE` | text | 🟢 | `2018-09-01`, `2018-09-13`, `2018-04-30` |
| 3 | `QUART` | text | 🟢 | `jour`, `nuit` |
| 4 | `PDQ` | text | 🟢 | `21`, `30`, `7` |
| 5 | `X` | text | 🟡 | `294904.159001211`, `290274.565` |
| 6 | `Y` | text | 🟡 | `5042150.474`, `5047548.92099452` |
| 7 | `LONGITUDE` | text | 🟡 | `-73.685928`, `-73.626778` |
| 8 | `LATITUDE` | text | 🟡 | `45.56778`, `45.519122` |

---

### Avis de détérioration

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-avis-deterioration` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-avis-deterioration` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Avis, Détérioration, Habitation, SH, SUM, Salubrité |

**Description**: L’avis de détérioration permet de rattacher des infractions au _Règlement 23-016 sur l'occupation et l'entretien des bâtiments_ à des bâtiments précis par le biais d'une inscription au registre foncier du Québec. Il sert à empêcher qu'un propriétaire n'évite des sanctions en vendant son immeuble à une société apparentée ou à un autre acheteur. Ce pouvoir est utilisé dans le cas de bâtiments sujets à une détérioration susceptible de porter atteinte à la santé ou à la sécurité des occupants, et dont le propriétaire n’effectue pas les travaux de réfection, de réparation ou d'entretien exigés dans les délais prescrits. Un avis de régularisation est émis lorsque toutes les infractions rattachées au bâtiment sont corrigées et a comme effet le retrait de l'avis de détérioration.

**Formats disponibles**: CSV

#### Ressource: Avis de détérioration (CSV)

- **Resource ID**: `a64d54b0-6c20-4d5d-a9b8-3593170e2a9e`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 38
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `identifiant` | text | 🟢 | `AD_2511_2517_rue_de_Chateauguay_SO`, `AD_6914_rue_Hutchison_VSMPE`, `AD_4651_4657_rue_St_Andre_PMR` |
| 2 | `adresse` | text | 🟢 | `2511-2517, rue de Châteauguay`, `4651-4657, rue St-André`, `6914, rue Hutchison` |
| 3 | `numero_lot` | text | 🟢 | `1380977`, `2249754`, `1444888` |
| 4 | `arrondissement` | text | 🟢 | `Le Plateau–Mont-Royal`, `Le Sud-Ouest`, `Villeray–Saint-Michel–Parc-Extension` |
| 5 | `date_inscription` | text | 🟢 | `4/15/2019`, `12/7/2012`, `9/11/2014` |
| 6 | `nom_proprio` | text | 🟢 | `3971147 Canada inc.`, `Stevens Coulombe`, `Rikva Sebag` |
| 7 | `nombre_logement` | text | 🟢 | `7`, `3`, `8` |
| 8 | `lien_avis` | text | 🟢 | `https://depot.ville.montreal.qc.ca/av...`, `https://depot.ville.montreal.qc.ca/av...`, `https://depot.ville.montreal.qc.ca/av...` |

---

### Avis et alertes

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-avis-alertes` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-avis-alertes` |
| **Fréquence de mise à jour** | daily |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | 311 Montréal, Alerte, Avis, Eau, SCAEC, Urgence, circulation, déchets, déneigement, parc |

**Description**: Cet ensemble de données présente les avis et alertes publiés sur [le site web de la Ville de Montréal](https://montreal.ca/avis-et-alertes).  Les avis et alertes communiquent les renseignements importants à la population en cas d'urgence et en situations pouvant avoir un impact sur la vie quotidienne (avis d’ébullition d’eau, travaux, fermeture de piscine, etc.).

**Formats disponibles**: CSV, GEOJSON

#### Ressource: Avis et alertes (CSV)

- **Resource ID**: `fc6e5f85-7eba-451c-8243-bdf35c2ab336`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 217
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `titre` | text | 🟢 | `Coupure d'eau – Rue Forsyth et 58e Av...`, `Fermeture de la circulation – Bouleva...`, `Collecte des déchets domestiques est ...` |
| 2 | `date_debut` | text | 🟢 | `2026-02-05T22:27:29.255000`, `2026-02-06T14:40:42.953000`, `2026-02-05T21:45:47.854000` |
| 3 | `date_fin` | text | 🟢 | `2026-06-05T23:27:29.255000`, `2026-06-05T22:45:47.854000`, `2026-06-06T15:40:42.953000` |
| 4 | `type` | text | 🟢 | `Circulation et transport`, `Eau et aqueduc`, `Déchets et recyclage` |
| 5 | `service_publieur` | text | 🟢 | `Services des communications` |
| 6 | `lien` | text | 🟢 | `https://montreal.ca/alertes/coupure-d...`, `https://montreal.ca/alertes/fermeture...`, `https://montreal.ca/alertes/collecte-...` |

---

### Casernes de pompiers sur l’île de Montréal

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-casernes-pompiers` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-casernes-pompiers` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Caserne, Géolocalisation, Incendie, Intervention, Pompier, Ponctuelle, Première ligne, SIM, Saint-Laurent, Sapeur |

**Description**: Cet ensemble de données comprend les coordonnées des casernes de pompier du service incendie de la Ville de Montréal.  
L'ensemble de données [Territoires administratifs des casernes](/ville-de-montreal/territoires-administratifs-des-casernes) fournit le territoire couvert par les casernes.

**Formats disponibles**: CSV, GEOJSON, SHP

#### Ressource: Casernes des pompiers  (CSV)

- **Resource ID**: `5b9c0e1d-3f75-4e98-b53d-6e979c18cc98`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 68
- **Nombre de champs**: 11

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `CASERNE` | text | 🟢 | `23`, `03`, `15` |
| 2 | `NO_CIVIQUE` | text | 🟢 | `523`, `1255`, `256` |
| 3 | `RUE` | text | 🟢 | `place Saint-Henri`, `rue de la Sucrerie`, `rue  Young` |
| 4 | `LATITUDE` | text | 🟢 | `45.4934543793718`, `45.477820050794`, `45.4844194758814` |
| 5 | `LONGITUDE` | text | 🟢 | `-73.5601720032226`, `-73.5852566191264`, `-73.5609171345086` |
| 6 | `ARRONDISSEMENT` | text | 🟡 | `VILLERAY-SAINT-MICHEL-PARC-EXTENSION`, `LE SUD-OUEST` |
| 7 | `VILLE` | text | 🔴 | _vide_ |
| 8 | `DATE_DEBUT` | text | 🟢 | `2015-01-01T07:00:00`, `2019-05-06T07:00:00` |
| 9 | `DATE_FIN` | text | 🔴 | _vide_ |
| 10 | `MTM8_X` | text | 🟢 | `300038`, `300097`, `298134.6` |
| 11 | `MTM8_Y` | text | 🟢 | `5037547.3`, `5039283`, `5038279` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `DATE_FIN`: 98.5% null
- `VILLE`: 79.4% null

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

### Communiqués de presse

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-communique-presse` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-communique-presse` |
| **Fréquence de mise à jour** | daily |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | DG |

**Description**: Cet ensemble de données présente les communiqués de presse publiés par la Ville de Montréal.

**Formats disponibles**: CSV

#### Ressource: Communiqués de presse (2023 à aujourd'hui) (CSV)

- **Resource ID**: `f518b91b-1b9f-4224-bfeb-dff785e74952`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,328
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `titre` | text | 🟢 | `L’administration Martinez Ferrada veu...`, `L’administration Martinez Ferrada ins...`, `Vague de grand froid à venir : la mai...` |
| 2 | `date_publication` | text | 🟢 | `2025-11-26`, `2025-12-04`, `2025-12-01` |
| 3 | `url` | text | 🟢 | `https://montreal.ca/communiques-de-pr...`, `https://montreal.ca/communiques-de-pr...`, `https://montreal.ca/communiques-de-pr...` |
| 4 | `description` | text | 🟢 | `MONTRÉAL, le 4 décembre 2025 – L’admi...`, `MONTRÉAL, le 26 novembre 2025 – Soray...`, `MONTRÉAL, le 1er décembre 2025 – La m...` |
| 5 | `service_arrondissement` | text | 🟢 | `Ville de Montréal` |
| 6 | `source_unite_affaire` | text | 🟠 | `Service de l'habitation`, `Cabinet de la mairesse et du comité e...`, `Service de l'urbanisme et de la mobilité` |

---

### Interventions des pompiers de Montréal

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-interventions-service-securite-incendie-montreal` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-interventions-service-securite-incendie-montreal` |
| **Fréquence de mise à jour** | daily |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Incendie, Pompier, Premier répondant, SIM, Sécurité civile, Sécurité publique |

**Description**: Ensemble de données listant les interventions réalisées par le Service de sécurité incendie de Montréal (SIM) avec notamment la location des interventions et les unités déployées depuis 2005. Ces données sont tirées du système de répartition assisté par Poste de travail (RAO), un sous-système central du système de gestion des interventions qui permet la gestion en temps réel, la répartition des véhicules et du suivi opérationnel des interventions.  Ces données sont collectées pour produire des rapports requis par le ministère de la Sécurité publique et nécessaire pour le SIM.  Il permet également de compiler des statistiques afin de diffuser des informations aux citoyens, aux médias et aux assureurs.

**Formats disponibles**: CSV, GEOJSON, SHP

#### Ressource: Interventions du SIM - courant (2 dernières années) (CSV)

- **Resource ID**: `71e86320-e35c-4b4c-878a-e52124294355`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 147,889
- **Nombre de champs**: 13

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `INCIDENT_NBR` | text | 🟢 | `1`, `3`, `2` |
| 2 | `CREATION_DATE_TIME` | text | 🟢 | `2026-01-01T00:00:09`, `2025-01-01T00:03:18`, `2025-01-01T00:02:31` |
| 3 | `INCIDENT_TYPE_DESC` | text | 🟢 | `10-22 sans feu`, `Appel de Cie de détection`, `Ascenseur` |
| 4 | `DESCRIPTION_GROUPE` | text | 🟢 | `SANS FEU`, `Alarmes-incendies`, `1-REPOND` |
| 5 | `CASERNE` | text | 🟢 | `64`, `63`, `10` |
| 6 | `NOM_VILLE` | text | 🟢 | `Montréal`, `Dorval` |
| 7 | `NOM_ARROND` | text | 🟢 | `Lachine`, `Indéterminé`, `Ville-Marie` |
| 8 | `DIVISION` | text | 🟢 | `1`, `6`, `2` |
| 9 | `NOMBRE_UNITES` | text | 🟢 | `3`, `6`, `2` |
| 10 | `MTM8_X` | text | 🟢 | `298221.3`, `290865.2`, `283233.9` |
| 11 | `MTM8_Y` | text | 🟢 | `5039611.1`, `5033951.1`, `5034016.9` |
| 12 | `LONGITUDE` | text | 🟢 | `-73.584175`, `-73.77569`, `-73.678138` |
| 13 | `LATITUDE` | text | 🟢 | `45.445944`, `45.496391`, `45.445159` |

#### Ressource: Interventions du SIM - 2020 à 2024 (CSV)

- **Resource ID**: `4a46d93f-9fd9-4cce-8952-424918edeafe`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 539,203
- **Nombre de champs**: 13

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `INCIDENT_NBR` | text | 🟢 | `4579`, `17503`, `24768` |
| 2 | `CREATION_DATE_TIME` | text | 🟢 | `2022-03-01T14:24:44`, `2022-03-29T09:42:01`, `2022-01-16T09:45:45` |
| 3 | `INCIDENT_TYPE_DESC` | text | 🟢 | `Feu / 4e Alerte`, `Premier répondant` |
| 4 | `DESCRIPTION_GROUPE` | text | 🟢 | `INCENDIE`, `1-REPOND` |
| 5 | `CASERNE` | text | 🟢 | `45`, `34`, `53` |
| 6 | `NOM_VILLE` | text | 🟢 | `Montréal`, `Beaconsfield` |
| 7 | `NOM_ARROND` | text | 🟢 | `Mercier-Hochelaga-Maisonneuve`, `Côte-des-Neiges-Notre-Dame-de-Grâce`, `Indéterminé` |
| 8 | `DIVISION` | text | 🟢 | `5`, `1`, `3` |
| 9 | `NOMBRE_UNITES` | text | 🟢 | `80`, `1` |
| 10 | `MTM8_X` | text | 🟢 | `276414.2`, `294702`, `301939.7` |
| 11 | `MTM8_Y` | text | 🟢 | `5037802.7`, `5032320.4`, `5046439.7` |
| 12 | `LONGITUDE` | text | 🟢 | `-73.862773`, `-73.536637`, `-73.629167` |
| 13 | `LATITUDE` | text | 🟢 | `45.480077`, `45.430241`, `45.557863` |

#### Ressource: Interventions du SIM - 2015 à 2022 (CSV)

- **Resource ID**: `005e4eb6-0377-45bf-a911-7077fd3b5ed0`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 894,970
- **Nombre de champs**: 13

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `INCIDENT_NBR` | text | 🟢 | `130918`, `130922`, `7977` |
| 2 | `CREATION_DATE_TIME` | text | 🟢 | `2018/01/19`, `2017/12/30` |
| 3 | `INCIDENT_TYPE_DESC` | text | 🟢 | `Premier répondant` |
| 4 | `DESCRIPTION_GROUPE` | text | 🟢 | `1-REPOND` |
| 5 | `CASERNE` | text | 🟢 | `21`, `65`, `49` |
| 6 | `NOM_VILLE` | text | 🟢 | `Montréal` |
| 7 | `NOM_ARROND` | text | 🟢 | `Saint-Léonard`, `LaSalle`, `Ahuntsic-Cartierville` |
| 8 | `DIVISION` | text | 🟢 | `5`, `3`, `8` |
| 9 | `NOMBRE_UNITES` | text | 🟢 | `1` |
| 10 | `MTM8_X` | text | 🟢 | `297345.2`, `291219.4`, `296661.6` |
| 11 | `MTM8_Y` | text | 🟢 | `5050150.6`, `5032063`, `5043822.5` |
| 12 | `LONGITUDE` | text | 🟢 | `-73.604306`, `-73.59527`, `-73.673881` |
| 13 | `LATITUDE` | text | 🟢 | `45.591214`, `45.428462`, `45.534186` |

#### Ressource: Interventions du SIM - 2005 à 2014 (CSV)

- **Resource ID**: `0a778ac0-9b5a-42cb-8557-167f7f9b8feb`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 908,486
- **Nombre de champs**: 11

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `INCIDENT_NBR` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `CREATION_DATE_TIME` | datetime | 🟢 | `2005-01-01T00:03:56`, `2005-01-01T00:03:57`, `2005-01-01T00:03:47` |
| 3 | `INCIDENT_TYPE_DESC` | text | 🟢 | `Alarme privé ou locale`, `Inondation` |
| 4 | `DESCRIPTION_GROUPE` | text | 🟢 | `Sans incendie`, `Alarmes-incendies` |
| 5 | `CASERNE` | decimal | 🟢 | `10`, `18`, `72` |
| 6 | `NOM_VILLE` | text | 🟢 | `Saint-Laurent`, `Montréal`, `Montréal-Nord` |
| 7 | `NOM_ARROND` | text | 🟢 | `Ville-Marie / Parc Jean-Drapeau / Cen...`, `Montréal-Nord`, `St-Laurent` |
| 8 | `DIVISION` | decimal | 🟢 | `21`, `13`, `18` |
| 9 | `LATITUDE` | decimal | 🟢 | `45.4844061554197`, `45.6202743134406`, `45.4940870599786` |
| 10 | `LONGITUDE` | decimal | 🟢 | `-73.5825873217504`, `-73.6199555455142`, `-73.6930380818537` |
| 11 | `NOMBRE_UNITES` | decimal | 🟢 | `1`, `6`, `7` |

#### Ressource: Tableau concordance : Type incident - Description (CSV)

- **Resource ID**: `4f236894-3fdc-4b04-8d11-80f451ffd70d`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 170
- **Nombre de champs**: 2

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `INCIDENT_TYPE_DESCRIPTION` | text | 🟢 | `10-22 avec feu`, `10-22 pour appel aéroport`, `10-22 PR effon de structure` |
| 2 | `Description` | text | 🟢 | `Service non requis pour intervention ...`, `Service non requis pour une intervent...`, `Service non requis pour une intervent...` |

---

### Lieux et bâtiments à vocation publique

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-lieux-batiments-vocation-publique` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-lieux-batiments-vocation-publique` |
| **Fréquence de mise à jour** | daily |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Accessibilité universelle, Bâtiment, Lieux accessibles, Lieux publics, SCAEC, Service public |

**Description**: Cet ensemble présente les lieux et bâtiments à vocation publique et leurs principaux attributs tels que leurs adresses et horaires ainsi que la disponibilité d'installations et de commodités, notamment en matière de services en accessibilité universelle.

**Formats disponibles**: CSV, GEOJSON, SHP

#### Ressource: Lieux (français) (CSV)

- **Resource ID**: `4731b64f-29cc-4e08-bc44-8752ae2fcafb`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,602
- **Nombre de champs**: 28

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `titre_lieu` | text | 🟢 | `Piano public du Marché Jean-Talon`, `Maison Robert-Bélanger`, `Centre Hortense-Duclos` |
| 2 | `url_fiche` | text | 🟢 | `https://montreal.ca/lieux/piano-publi...`, `https://montreal.ca/lieux/centre-hort...`, `https://montreal.ca/lieux/maison-robe...` |
| 3 | `description` | text | 🟡 | `Venez participer à diverses activités...`, `Des organismes dédiés aux citoyen(ne)...`, `Durant la belle saison, un piano droi...` |
| 4 | `date_cree` | text | 🟢 | `2023-03-29`, `2022-08-31`, `2023-08-28` |
| 5 | `date_revision` | text | 🟢 | `2025-12-11` |
| 6 | `arrondissements` | text | 🟢 | `Rosemont–La Petite-Patrie`, `Saint-Laurent`, `Le Sud-Ouest` |
| 7 | `types` | text | 🟢 | `Culturels et communautaires` |
| 8 | `installations` | text | 🟢 | `Centre communautaire`, `Piano public` |
| 9 | `activites` | text | 🟠 | _vide_ |
| 10 | `commodites` | text | 🟠 | `Air climatisé,Fontaine d'eau potable,...`, `Aire de pique-nique,Fontaine d'eau po...`, `Café,Casse-croûte,Table à langer,Toil...` |
| 11 | `accessibilite` | text | 🔴 | `Accessible en fauteuil roulant,Ascens...`, `Accessible en fauteuil roulant`, `Accessible en fauteuil roulant,Adapté...` |
| 12 | `categories` | text | 🟢 | `Communauté` |
| 13 | `statut_ouverture` | text | 🔴 | `Fermé temporairement` |
| 14 | `horaire_par_jour` | text | 🟡 | `Horaire habituel d’été à partir du 4 ...`, `Horaire habituel d’été à partir du 19...`, `Horaire habituel: [lundi 07:30-16:00,...` |
| 15 | `commentaires_horaire` | text | 🔴 | _vide_ |
| 16 | `reglementation` | text | 🔴 | _vide_ |
| 17 | `paiement` | text | 🔴 | `Argent comptant,Carte de crédit Maste...` |
| 18 | `telephone` | text | 🔴 | `numéro: 5147448333`, `numéro: 4385205659` |
| 19 | `courriel` | text | 🔴 | `59saint-pierre@concertactionlachine.org`, `info@vertcite.ca` |
| 20 | `titre_lieu_adresse_postale` | text | 🟢 | `Piano public du Marché Jean-Talon`, `Maison Robert-Bélanger`, `Centre Hortense-Duclos` |
| 21 | `adresse_principale` | text | 🟢 | `5599, rue Laurendeau`, `3900, chemin du Bois-Franc`, `Place du Marché-du-Nord` |
| 22 | `adresse_secondaire` | text | 🔴 | `Au coin des avenues Casgrain et Shamrock` |
| 23 | `code_postal` | text | 🟡 | `H2S1A1`, `H4S1A7`, `H4E3W2` |
| 24 | `ville` | text | 🟢 | `Montréal` |
| 25 | `long` | text | 🟢 | `-73.61576096483245`, `-73.588216`, `-73.729368` |
| 26 | `lat` | text | 🟢 | `45.53528018947768`, `45.503559`, `45.462064` |
| 27 | `X` | text | 🟢 | `297901.3`, `295758.9`, `286876.0` |
| 28 | `Y` | text | 🟢 | `5043935.9`, `5040429.8`, `5035796.6` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `adresse_secondaire`: 96.5% null
- `paiement`: 93.6% null
- `courriel`: 92.0% null
- `reglementation`: 91.6% null
- `commentaires_horaire`: 87.9% null
- `statut_ouverture`: 85.9% null
- `telephone`: 79.9% null
- `accessibilite`: 71.0% null
- `activites`: 61.0% null

#### Ressource: Lieux (anglais) (CSV)

- **Resource ID**: `81080d62-5c89-41e6-a401-99f77c459594`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,495
- **Nombre de champs**: 28

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `titre_lieu` | text | 🟢 | `Piano public in parc Molson`, `Piano public at the Marché Jean-Talon`, `Centre Hortense-Duclos` |
| 2 | `url_fiche` | text | 🟢 | `https://montreal.ca/en/places/piano-p...`, `https://montreal.ca/en/places/piano-p...`, `https://montreal.ca/en/places/centre-...` |
| 3 | `description` | text | 🟡 | `It is located at the corner of Rue La...`, `In the summertime, an upright piano a...`, `An upright piano awaits budding piani...` |
| 4 | `date_cree` | text | 🟢 | `2023-03-29`, `2023-06-28`, `2022-09-02` |
| 5 | `date_revision` | text | 🟢 | `2026-01-20`, `2025-12-11`, `2026-01-08` |
| 6 | `arrondissements` | text | 🟢 | `Rosemont–La Petite-Patrie`, `L'Île-Bizard–Sainte-Geneviève`, `Le Sud-Ouest` |
| 7 | `types` | text | 🟢 | `Points of service`, `Arts, culture and community` |
| 8 | `installations` | text | 🟢 | `Public piano`, `Community centre`, `Permit counter` |
| 9 | `activites` | text | 🟠 | _vide_ |
| 10 | `commodites` | text | 🟠 | `Air conditioning,Drinking fountain,Fr...` |
| 11 | `accessibilite` | text | 🔴 | `Wheelchair accessible,Elevator,Grab b...` |
| 12 | `categories` | text | 🟢 | `Business,Urban Planning and Development`, `Community` |
| 13 | `statut_ouverture` | text | 🔴 | _vide_ |
| 14 | `horaire_par_jour` | text | 🟡 | `Regular summer schedule à partir du 1...`, `Regular schedule: [lundi 08:30-11:30,...`, `Regular summer schedule à partir du 2...` |
| 15 | `commentaires_horaire` | text | 🔴 | `Please arrive no later than 15 minute...` |
| 16 | `reglementation` | text | 🔴 | _vide_ |
| 17 | `paiement` | text | 🔴 | `MasterCard and Visa credit cards ($5,...`, `Cash (daily limit: $500),MasterCard a...` |
| 18 | `telephone` | text | 🔴 | `numéro: 311` |
| 19 | `courriel` | text | 🔴 | `ibsg.permisurbanisme@montreal.ca`, `permismtlnord@montreal.ca` |
| 20 | `titre_lieu_adresse_postale` | text | 🟢 | `Piano public in parc Molson`, `Piano public at the Marché Jean-Talon`, `Centre Hortense-Duclos` |
| 21 | `adresse_principale` | text | 🟢 | `5599 Rue Laurendeau`, `Place du Marché-du-Nord`, `2473 Rue Beaubien Est` |
| 22 | `adresse_secondaire` | text | 🔴 | `On the corner of Rue Beaubien Est and...`, `Corner Avenue Casgrain and Avenue Sha...`, `(on the 2nd floor, rear door of the c...` |
| 23 | `code_postal` | text | 🟡 | `H2S1A1`, `H1Y1G2`, `H4E3W2` |
| 24 | `ville` | text | 🟢 | `Montréal` |
| 25 | `long` | text | 🟢 | `-73.61576096483245`, `-73.588216`, `-73.59217981472626` |
| 26 | `lat` | text | 🟢 | `45.53528018947768`, `45.548548304645266`, `45.462064` |
| 27 | `X` | text | 🟢 | `297901.3`, `295758.9`, `297602.3` |
| 28 | `Y` | text | 🟢 | `5043935.9`, `5035796.6`, `5045408.0` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `adresse_secondaire`: 96.8% null
- `paiement`: 93.6% null
- `courriel`: 92.1% null
- `reglementation`: 91.8% null
- `commentaires_horaire`: 87.9% null
- `statut_ouverture`: 85.3% null
- `telephone`: 79.5% null
- `accessibilite`: 70.7% null
- `activites`: 60.7% null

---

### Limite des secteurs de poste de quartier de police

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-limites-pdq-spvm` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-limites-pdq-spvm` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | PDQ, Police, Poste de quartier, SPVM |

**Description**: Le territoire de l'île de Montréal est découpé en secteurs correspondant à des postes de quartier du Service de police de la Ville de Montréal. L'ensemble de données fournit, sous forme de polygones, les informations géographiques des limites des secteurs couverts par chaque poste de quartier.

L'ensemble de données des [postes de quartier](/ville-de-montreal/carte-postes-quartier) fournit la localisation du poste de quartier.

**Formats disponibles**: CSV, GEOJSON, SHP, WEB

#### Ressource: Limites des postes de quartier (CSV)

- **Resource ID**: `d3836ea6-8a74-444c-8a82-a48dec91d8f0`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 28
- **Nombre de champs**: 3

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `PDQ` | text | 🟢 | `1`, `3`, `4` |
| 2 | `NOM_PDQ` | text | 🟢 | `PDQ-1`, `PDQ-4`, `PDQ-3` |
| 3 | `wkt` | text | 🟢 | `MULTIPOLYGON (((270411.3388 5036779.9...`, `MULTIPOLYGON (((278169.5481 5035275.3...`, `MULTIPOLYGON (((280113.475 5040346.13...` |

#### Ressource: Limites des postes de quartier (GEOJSON)

- **Resource ID**: `e18f0da9-3a16-4ba4-b378-59f698b47261`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 37
- **Nombre de champs**: 1

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `{` | text | 🟢 | `crs: { "type": "name"`, `name: "Limites_PDQ"`, `type: "FeatureCollection"` |

---

### Personnes élues ayant suivi la formation obligatoire en éthique (archives)

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-formation-ethique-personnes-elues` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-formation-ethique-personnes-elues` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Déontologie, Formation, SG, Éthique |

**Description**: Les personnes élues de la Ville de Montréal doivent participer à une formation en éthique et déontologie dans les six mois du début de mandat. Ces données présentent la liste des personnes élues ayant participé à la formation.

**Formats disponibles**: CSV

#### Ressource: Personnes élues formation éthique (CSV)

- **Resource ID**: `c975d284-e8f1-4395-ba37-d1f4d1ffe404`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 206
- **Nombre de champs**: 3

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Titre_formation` | text | 🟢 | `Éthique et déontologie en matière mun...` |
| 2 | `Personnes_elues` | text | 🟢 | `ALNEUS, Ericka`, `A. MUNRO, Kaïla`, `AUGER, Benoit` |
| 3 | `Date_participation` | datetime | 🟢 | `2022-01-18T00:00:00`, `2022-01-28T00:00:00`, `2022-02-07T00:00:00` |

---

### Plan d'urbanisme - Densité de construction

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-plan-urbanisme-densite` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-plan-urbanisme-densite` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | SUM, construction, densité, plan urbanisme, urbansime |

**Description**: Note : Le Plan d'urbanisme (règlement 04-047) a été __abrogé le 16 juin 2025__, ces données sont maintenant caduques, veuillez vous référez aux ensembles de données du Plan d'urbanisme et de mobilité 2050 (règlement 24-017).

La [carte 3.1.2](https://mtl.ged.montreal.ca/constellio/?collection=mtlca&portal=REPDOCVDM#!displayDocument/00000019294) exprime la  densité de construction  pour l'ensemble de la ville selon une échelle de 17 couleurs qui intègrent les différents paramètres de densité. Elle est disponible à la [section 3.1.2](https://mtl.ged.montreal.ca/constellio/?collection=mtlca&portal=REPDOCVDM#!searchResults/s/9f45f91f-af33-11ee-9b08-4b10d95b597d) du Plan d'urbanisme.

Les paramètres de densité de construction permettent d'encadrer la production architecturale et de déterminer l'échelle de la forme urbaine de même que l'intensité des activités sur les différentes portions du territoire.

Pour chacun des secteurs à construire ou à transformer, les paramètres énoncés tra

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: GEOJSON, SHP

---

### Postes de police de quartier sur l’île de Montréal

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-carte-postes-quartier` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-carte-postes-quartier` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | PDQ, Police, Poste de quartier, SPVM |

**Description**: Cet ensemble de données comprend l'adresse et les coordonnées géospatiales des postes de quartiers du Service de police de la Ville de Montréal (SPVM).

Voir également l'ensemble [Limite des secteurs de poste de quartier de police](./limites-pdq-spvm).

**Formats disponibles**: CSV, GEOJSON, SHP

#### Ressource: Postes de quartier (CSV)

- **Resource ID**: `c9f296dd-596e-48ed-9c76-37230b2c916d`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 28
- **Nombre de champs**: 9

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `OBJECTID` | text | 🟢 | `1`, `3`, `2` |
| 2 | `NO_CIV_LIE` | text | 🟢 | `4139.00000000000`, `8930.00000000000`, `4555.00000000000` |
| 3 | `PREFIX_TEM` | text | 🟢 | `BOUL`, `RUE` |
| 4 | `NOM_TEMP` | text | 🟢 | `SOURCES DES`, `HOCHELAGA`, `PIE-IX` |
| 5 | `DIR_TEMP` | text | 🔴 | _vide_ |
| 6 | `MUN_TEMP` | text | 🟢 | `DDO`, `MTN`, `MTL` |
| 7 | `DESC_LIEU` | text | 🟢 | `POSTE DE QUARTIER 23`, `POSTE DE QUARTIER 30`, `POSTE DE QUARTIER 4` |
| 8 | `LATITUDE` | text | 🟢 | `45.57773517660`, `45.49437068520`, `45.55685714600` |
| 9 | `LONGITUDE` | text | 🟢 | `-73.80730193150`, `-73.61743103330`, `-73.54591371410` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `DIR_TEMP`: 89.3% null

---

### Règlements municipaux

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-reglements-municipaux` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-reglements-municipaux` |
| **Fréquence de mise à jour** | daily |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Arr., Bylaw, Ordonnance, Règlement, Résolution, SG |

**Description**: Cet ensemble présente les règlements municipaux répertoriés par le site web de la Ville de Montréal, y compris les ordonnances et certaines résolutions.

**Formats disponibles**: CSV

#### Ressource: Règlements municipaux (CSV)

- **Resource ID**: `5802b643-487b-49c7-955e-7d61ad38f1c8`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 29,188
- **Nombre de champs**: 9

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `title_fr` | text | 🟢 | `Règlement sur la subvention à la réal...`, `1333 - O.209 - ORDONNANCE SUR L’APPLI...`, `1333 - O.210 - ORDONNANCE SUR L’APPLI...` |
| 2 | `title_en` | text | 🟢 | `1333 - O.209 - ORDONNANCE SUR L’APPLI...`, `1333 - O.210 - ORDONNANCE SUR L’APPLI...`, `By-law concerning the subsidy for the...` |
| 3 | `id` | text | 🟢 | `69a223e460b48cbd015f3900`, `615b392fee486000110b28d5`, `69a22462c9c96c7cbb29d481` |
| 4 | `type` | text | 🟢 | `Règlement`, `Ordonnance` |
| 5 | `adoptionDate` | text | 🟡 | `2021-09-30`, `2026-03-03` |
| 6 | `comingIntoForceDate` | text | 🟢 | `2026-03-05`, `2099-12-31` |
| 7 | `geographicalApplication` | text | 🟢 | `Anjou`, `Tous les arrondissements` |
| 8 | `competentAuthority` | text | 🟢 | `Arrondissement`, `Conseil d'agglomération` |
| 9 | `modifiedBylaws` | text | 🟠 | `{'id': '60d7e90dfd6531feae5a417e'}`, `{'id': '60d7e910fd653154095a418e'}` |

---

### Schéma d'aménagement et de développement - Affectation du sol et densité d'occupation

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-schema-affectation-densite` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-schema-affectation-densite` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Affectation, Agglomération, Aménagement, Construire, Densification, Densité, Développement, Planification, SUM, Schéma aménagement développement |

**Description**: L’affectation du territoire et la densité d’occupation traduisent, sur le plan normatif, les grandes orientations de l’aménagement du territoire de l’agglomération de Montréal.  Les données disponibles dans le présent ensemble découlent principalement de la cartographie du Chapitre 3 du Schéma d’aménagement et de développement de l’agglomération de Montréal, soit __l'affectation du sol__ et la __densité d'occupation__.

Ce Schéma d’aménagement et de développement de l’agglomération de Montréal esquisse les grands paramètres qui guideront le conseil d’agglomération de Montréal dans les décisions relatives à l’aménagement du territoire au cours des prochaines années. Dans une perspective de développement durable, ce document oriente les décisions qui façonnent le territoire en vue de favoriser des quartiers compacts et plus verts, d’accroître les déplacements en transports collectif et actif, de soutenir le dynamisme économique de l’agglomération et de mettre en valeur les territoires 

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: GEOJSON, SHP

---

### Schéma d'aménagement et de développement - Environnement et milieux naturels

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-schema-environnement-milieux-naturels` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-schema-environnement-milieux-naturels` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Bois, Corridor forestier, Espace vert, Falaise, Pente, Plaine inondable, SUM, Schéma aménagement développement, Urbanisme, Îlot de chaleur |

**Description**: Le schéma d'aménagement et de développement met de l'avant un cadre de référence visant à mieux connaître, protéger et mettre en valeur le patrimoine. Les données disponibles dans le présent ensemble découlent principalement de la cartographie des sections 2.1, 2.3 et 3.1 du Schéma d’aménagement et de développement de l’agglomération de Montréal, soit l'adaptation aux changements climatiques, les territoires d'intérêt écologique, la Trame verte et bleue ainsi que les contraintes et les nuisances.

En janvier 2025, la carte 15.1 – Milieux humides d'intérêt a été ajoutée au Schéma. Les ressources en lien avec cette carte sont maintenant disponibles :
- Milieu humide d'intérêt à protéger ou à restaurer
- Aire de protection d'un milieu humide
- Milieu humide d'intérêt pour une utilisation durable
- Milieu humide en littoral ou zone inondable

Ce Schéma d’aménagement et de développement de l’agglomération de Montréal esquisse les grands paramètres qui guideront le conseil d’agglomér

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: GEOJSON, SHP, ZIP

---

### Schéma d'aménagement et de développement - Patrimoine et paysage

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-schema-patrimoine-paysage` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-schema-patrimoine-paysage` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Agglomération, Aménagement, Archéologie, Développement, Intérêt, Mont-Royal, Patrimoine, Paysage, SUM, Schéma aménagement développement |

**Description**: Le schéma d'aménagement et de développement met de l'avant un cadre de référence visant à mieux connaître, protéger et mettre en valeur le patrimoine.  Les données disponibles dans le présent ensemble découlent principalement de la cartographie de la section 2.3 du Schéma d’aménagement et de développement de l’agglomération de Montréal, soit le __patrimoine bâti ou archéologique__, les __paysages emblématiques et identitaires__, ainsi que les __vues d'intérêt__.

Ce Schéma d’aménagement et de développement de l’agglomération de Montréal esquisse les grands paramètres qui guideront le conseil d’agglomération de Montréal dans les décisions relatives à l’aménagement du territoire au cours des prochaines années. Dans une perspective de développement durable, ce document oriente les décisions qui façonnent le territoire en vue de favoriser des quartiers compacts et plus verts, d’accroître les déplacements en transports collectif et actif, de soutenir le dynamisme économique de l’aggloméra

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: GEOJSON, SHP

---

### Schéma d'aménagement et de développement - Transport

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-schema-transport` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-schema-transport` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Agglomération, Autobus, Entrée de ville, Piste cyclable, Pont, Projet routier, SRB, SUM, Schéma aménagement développement, Train |

**Description**: Le présent ensemble de données rassemble une série de données axées sur la thématique du transport. On retrouve ces données dans différentes sections du Schéma d’aménagement et de développement. Le descriptif de chacun de ces jeux contient le numéro de carte auquel il réfère.

Ce Schéma d’aménagement et de développement de l’agglomération de Montréal esquisse les grands paramètres qui guideront le conseil d’agglomération de Montréal dans les décisions relatives à l’aménagement du territoire au cours des prochaines années. Dans une perspective de développement durable, ce document oriente les décisions qui façonnent le territoire en vue de favoriser des quartiers compacts et plus verts, d’accroître les déplacements en transports collectif et actif, de soutenir le dynamisme économique de l’agglomération et de mettre en valeur les territoires d’intérêt.

Consultez la [carte interactive](https://smvt.maps.arcgis.com/apps/webappviewer/index.html?id=d152aaa85b6f4e9086cecdf10c7456db) du S

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: GEOJSON, SHP

---

### Schéma d'aménagement et de développement - Économie

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-schema-economie` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-schema-economie` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Agglomération, Centre commercial, Commerce, Emploi, Pôle, SUM, Schéma, Schéma aménagement développement, Urbanisme, Économie |

**Description**: La consolidation et la valorisation des pôles commerciaux indiqués à la __carte 4 – Concentrations d'établissements commerciaux__, ainsi que l'activité commerciale des rues, des axes et des centres commerciaux doivent être privilégiés.

Par ailleurs, les pôles économiques représentés à la __carte 8 – Pôles économiques de l'agglomération de Montréal__ est une particularité de la région de Montréal. Ces pôles totalisent d'importants bassins d'emplois et présentent un potentiel de croissance et de création de la richesse.

Les données disponibles dans le présent ensemble proviennent des sections 2.1 et 2.2 du Schéma d’aménagement et de développement de l’agglomération de Montréal.

Ce Schéma d’aménagement et de développement de l’agglomération de Montréal esquisse les grands paramètres qui guideront le conseil d’agglomération de Montréal dans les décisions relatives à l’aménagement du territoire au cours des prochaines années. Dans une perspective de développement durable, ce docume

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: GEOJSON, SHP

---

### Schéma d'aménagement et de développement - Équipements collectifs

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-schema-equipements-collectifs` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-schema-equipements-collectifs` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Affaires, Collège, Culture, Lieu culturel, Marina, Musée, Plage, SUM, Santé, Schéma aménagement développement |

**Description**: Les __équipements collectifs__ rassemblent les immeubles abritant des activités qui répondent à différents besoins de la population en matière de santé, d’éducation, de culture, de sport et de tourisme.

La classification des équipements collectifs selon leur intérêt métropolitain ou d’agglomération est effectuée uniquement à des fins d’aménagement du territoire et n’affecte aucunement le partage des compétences établi selon les lois applicables.

Les données disponibles dans le présent ensemble proviennent de la section 2.1 du Schéma d’aménagement et de développement de l’agglomération de Montréal, elles sont représentées aux __cartes 34 à 38__, situées à l’annexe I.

Présentés à la section 2.3 et illustrés à la __carte 44__, les __équipements et infrastructures en lien avec l’eau__ permettent la pratique d’activités nautiques diverses sur les grands plans d’eau ceinturant l’agglomération de Montréal.

Ce Schéma d’aménagement et de développement de l’agglomération de Montréal 

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: GEOJSON, SHP

---

### Signalements de coyotes

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-signalements-de-coyotes` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-signalements-de-coyotes` |
| **Fréquence de mise à jour** | daily |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Animal sauvage, SGPMRS, Sécurité publique |

**Description**: Le présent ensemble de données contient les observations de coyotes documentées par la Ville de Montréal depuis 2017. La plupart de ces informations proviennent des observations des citoyens qui ont été signalées à la Ville de Montréal. Elles sont récoltées dans le cadre de la mise en oeuvre du 
Plan de gestion du coyote de la Ville de Montréal, dévoilé en 2018. Son objectif est de favoriser la coexistence avec les coyotes vivant en milieu urbain en misant sur l’éducation du public, sur des méthodes de modification comportementale des coyotes et sur des interventions ciblées visant les animaux agressifs pour assurer la sécurité de la population montréalaise.

**Formats disponibles**: CSV, GEOJSON, PDF, SHP

#### Ressource: Signalement de coyotes (CSV)

- **Resource ID**: `f5183819-098c-418a-ae2e-d8011970adf5`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,380
- **Nombre de champs**: 19

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Entry_Id` | text | 🟢 | `0` |
| 2 | `OBJ_ID` | text | 🟢 | `8`, `9`, `7` |
| 3 | `Dat_obs` | text | 🟢 | `2017-07-16`, `2017-07-19`, `2017-07-18` |
| 4 | `Hr_obs` | text | 🟡 | `01:16:37`, `01:15:29`, `04:07:24` |
| 5 | `Nb_coyotes` | text | 🟢 | `1` |
| 6 | `Alimentation` | text | 🔴 | _vide_ |
| 7 | `Statut_animal` | text | 🔴 | _vide_ |
| 8 | `Periode` | text | 🟢 | `nuit` |
| 9 | `Comp_class` | text | 🟢 | `5`, `inconnue` |
| 10 | `Com_code` | text | 🟢 | `1`, `10` |
| 11 | `Cote` | text | 🟢 | `0`, `8.6` |
| 12 | `Territoire` | text | 🟢 | `Ahuntsic-Cartierville` |
| 13 | `Statut_mention` | text | 🟢 | `Valide` |
| 14 | `Provenance` | text | 🟡 | `SPVM` |
| 15 | `Verif` | text | 🟢 | `oui` |
| 16 | `X` | text | 🟢 | `293963.8187`, `293843.3138`, `292148.4158` |
| 17 | `Y` | text | 🟢 | `5046319.458`, `5045952.301`, `5046237.826` |
| 18 | `Lat` | text | 🟢 | `45.5566721`, `45.55596629`, `45.55339892` |
| 19 | `Long` | text | 🟢 | `-73.66205061`, `-73.64033938`, `-73.63878957` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `Statut_animal`: 98.9% null
- `Alimentation`: 92.1% null

---

### Territoires administratifs des casernes

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-territoires-administratifs-des-casernes` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-territoires-administratifs-des-casernes` |
| **Fréquence de mise à jour** | monthly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Caserne, Incendie, Intervention, Pompier, SIM, Territoire administratif |

**Description**: Ensemble décrivant les territoires administratifs des casernes sur l'ensemble de l'île de Montréal.

L'ensemble de données des [Casernes des pompiers sur l’île de Montréal ](casernes-pompiers) fournit la localisation des casernes.

**Formats disponibles**: CSV, GEOJSON, SHP

#### Ressource: Territoires administratifs des casernes (CSV)

- **Resource ID**: `16c8198c-8adc-47e6-8db9-44cba01bfe33`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 66
- **Nombre de champs**: 4

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `NOM_CAS_AD` | text | 🟢 | `Caserne 72`, `Caserne 32`, `Caserne 71` |
| 2 | `NO_CAS_ADM` | decimal | 🟢 | `71`, `32`, `72` |
| 3 | `OBJECTID` | decimal | 🟢 | `297`, `296`, `298` |
| 4 | `WKT` | text | 🟢 | `POLYGON ((306751.5689000002457760 506...`, `POLYGON ((286445.6159000003826804 504...`, `POLYGON ((287732.1200999995344318 504...` |

---

### Vidéos des séances des instances décisionnelles

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-videodiffusion-seances-instances-politiques` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-videodiffusion-seances-instances-politiques` |
| **Fréquence de mise à jour** | weekly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Comité exécutif, Commission permanente, Conseil d agglomération, Conseil municipal, SG |

**Description**: Cet ensemble recense les vidéos des séances enregistrées des différentes instances politiques de la Ville de Montréal, soit les conseils d'agglomération, les conseils municipaux, les comités exécutifs et les commissions permanentes.

**Formats disponibles**: CSV

#### Ressource: Conseil d'agglomération (2020 à ce jour) (CSV)

- **Resource ID**: `170464b4-e31e-4666-9629-a3c82fea0ae1`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 38
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_SEANCE` | text | 🟢 | `CA_2025-12-19_R`, `CA_2025-08-29_R`, `CA_2025-11-28_R` |
| 2 | `NOM_SEANCE` | text | 🟢 | `Conseil d'agglomération` |
| 3 | `TYPE_ASSEMBLEE` | text | 🟢 | `Ordinaire` |
| 4 | `DATE_VIDEO` | text | 🟢 | `2025-12-19T10:16:31`, `2025-11-28T09:40:09`, `2025-08-29T09:38:45` |
| 5 | `TITRE_VIDEO` | text | 🟢 | `2025-12-18 16 H 00 - Conseil d'agglom...`, `2025-08-28 16 H 00 - Conseil d'agglom...`, `2025-11-27 16 H 00 - Conseil d'agglom...` |
| 6 | `DESCRIPTION_VIDEO` | text | 🔴 | _vide_ |
| 7 | `DUREE` | text | 🟢 | `1:17:16`, `1:37:11`, `0:43:45` |
| 8 | `URL` | text | 🟢 | `https://www.youtube.com/watch?v=CzpIy...`, `https://www.youtube.com/watch?v=-UCIK...`, `https://www.youtube.com/watch?v=3X3-M...` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `DESCRIPTION_VIDEO`: 97.4% null

#### Ressource: Conseil d'agglomération (2018 à 2019)  (CSV)

- **Resource ID**: `7df67add-f218-4a42-aebd-81233231d960`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 194
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_SEANCE` | text | 🟢 | `CAG_2020-11-19_R`, `CAG_2020-11-12_R` |
| 2 | `NOM_SEANCE` | text | 🟢 | `Conseil d’agglomération` |
| 3 | `TYPE_ASSEMBLEE` | text | 🟢 | `Ordinaire` |
| 4 | `DATE_VIDEO` | text | 🟢 | `2020-11-12`, `2020-11-19` |
| 5 | `POSITION_VIDEO` | text | 🟢 | `1`, `3`, `2` |
| 6 | `TITRE_VIDEO` | text | 🟢 | `Période de questions du public`, `Ordre du jour et procès-verbal`, `Administration et finances` |
| 7 | `DUREE` | text | 🟢 | `00:08:37`, `00:06:38`, `00:05:05` |
| 8 | `URL` | text | 🟢 | `https://media.montreal.ca/videos/cons...`, `https://media.montreal.ca/videos/cons...`, `https://media.montreal.ca/videos/cons...` |

#### Ressource: Comité exécutif (2020 à ce jour) (CSV)

- **Resource ID**: `fb1ce005-2267-4ffd-8ac7-de4bc252ea12`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 87
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_SEANCE` | text | 🟢 | `CE_2026-02-12_R`, `CE_2025-12-11_R`, `CE_2026-01-15_R` |
| 2 | `NOM_SEANCE` | text | 🟢 | `Comité exécutif` |
| 3 | `TYPE_ASSEMBLEE` | text | 🟢 | `Ordinaire` |
| 4 | `DATE_VIDEO` | text | 🟢 | `2026-02-12T02:31:27`, `2026-01-15T02:30:52`, `2025-12-11T02:33:13` |
| 5 | `TITRE_VIDEO` | text | 🟢 | `2026-01-14 9 H 00 - Comité exécutif`, `2025-12-10 9 H 00 - Comité exécutif`, `2026-02-11 9 H 00 - Comité exécutif` |
| 6 | `DESCRIPTION_VIDEO` | text | 🔴 | _vide_ |
| 7 | `DUREE` | text | 🟢 | `0:30:36`, `0:29:36`, `0:31:06` |
| 8 | `URL` | text | 🟢 | `https://www.youtube.com/watch?v=kOi0J...`, `https://www.youtube.com/watch?v=NyhsP...`, `https://www.youtube.com/watch?v=Ss-uY...` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `DESCRIPTION_VIDEO`: 100.0% null

#### Ressource: Comité exécutif (2012 à 2019) (CSV)

- **Resource ID**: `07dc2dc3-371a-4336-964a-8d4280e28927`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,066
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_SEANCE` | text | 🟢 | `CE_2020-12-02_R` |
| 2 | `NOM_SEANCE` | text | 🟢 | `Conseil exécutif` |
| 3 | `TYPE_ASSEMBLEE` | text | 🟢 | `Ordinaire` |
| 4 | `DATE_VIDEO` | datetime | 🟢 | `2020-12-02T00:00:00` |
| 5 | `POSITION_VIDEO` | decimal | 🟢 | `1`, `3`, `2` |
| 6 | `TITRE_VIDEO` | text | 🟢 | `Ordre du jour et affaires contractuelles`, `Présentation publique`, `Administration et finances` |
| 7 | `DUREE` | text | 🟢 | `00:17:25`, `00:03:31`, `00:31:04` |
| 8 | `URL` | text | 🟢 | `https://media.montreal.ca/videos/cons...`, `https://media.montreal.ca/videos/cons...`, `https://media.montreal.ca/videos/cons...` |

#### Ressource: Conseil municipal (2020 à ce jour) (CSV)

- **Resource ID**: `4451abba-bfd6-4760-9e3d-89e163cdc52a`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 39
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_SEANCE` | text | 🟢 | `CM_2026-01-27_R`, `CM_2025-09-23_R`, `CM_2026-02-17_R` |
| 2 | `NOM_SEANCE` | text | 🟢 | `Conseil municipal` |
| 3 | `TYPE_ASSEMBLEE` | text | 🟢 | `Ordinaire` |
| 4 | `DATE_VIDEO` | text | 🟢 | `2026-01-27T01:54:06`, `2025-09-23T01:26:18`, `2026-02-17T01:55:41` |
| 5 | `TITRE_VIDEO` | text | 🟢 | `2026-02-16 13 H 00 - Conseil municipa...`, `2026-01-26 13 H 00 - Conseil municipa...`, `2025-09-22 13 H 00 - Conseil municipa...` |
| 6 | `DESCRIPTION_VIDEO` | text | 🟡 | `00:00:00 CONSEIL MUNICIPAL lundi 22 s...`, `00:00:00 00:07:00 CONSEIL MUNICIPAL 2...`, `00:17:13 ASSEMBLÉE ORDINAIRE DU CONSE...` |
| 7 | `DUREE` | text | 🟢 | `7:24:59`, `8:05:21`, `7:37:30` |
| 8 | `URL` | text | 🟢 | `https://www.youtube.com/watch?v=0tbWF...`, `https://www.youtube.com/watch?v=iVuNz...`, `https://www.youtube.com/watch?v=IH0wC...` |

#### Ressource: Conseil municipal (2012 à 2019) (CSV)

- **Resource ID**: `b8468ad8-a011-4044-9157-2d119048f96b`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,306
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_SEANCE` | text | 🟢 | `CM_2020-11-16_R` |
| 2 | `NOM_SEANCE` | text | 🟢 | `Conseil municipal` |
| 3 | `TYPE_ASSEMBLEE` | text | 🟢 | `Ordinaire` |
| 4 | `DATE_VIDEO` | datetime | 🟢 | `2020-11-16T00:00:00` |
| 5 | `POSITION_VIDEO` | decimal | 🟢 | `1`, `3`, `2` |
| 6 | `TITRE_VIDEO` | text | 🟢 | `Période de questions du public`, `Questions des membres du conseil`, `Ordre du jour et procès verbal` |
| 7 | `DUREE` | text | 🟢 | `00:52:32`, `01:29:15`, `00:06:33` |
| 8 | `URL` | text | 🟢 | `https://media.montreal.ca/videos/cons...`, `https://media.montreal.ca/videos/cons...`, `https://media.montreal.ca/videos/cons...` |

#### Ressource: Commissions permanentes (2020 à ce jour) (CSV)

- **Resource ID**: `67459264-cebe-4c7c-82c7-f263922ebfb7`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 96
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_SEANCE` | text | 🟢 | `CP_2026-01-22_R`, `CP_2026-01-16_R`, `CP_2026-01-19_R` |
| 2 | `NOM_SEANCE` | text | 🟢 | `Commission Permanente` |
| 3 | `TYPE_ASSEMBLEE` | text | 🟢 | `Ordinaire` |
| 4 | `DATE_VIDEO` | text | 🟢 | `2026-01-19T22:30:03`, `2026-01-22T19:19:01`, `2026-01-22T09:41:40` |
| 5 | `TITRE_VIDEO` | text | 🟢 | `2026-01-21 13 H 00 - Commission sur l...`, `2026-01-22 9 H 00 - Commission sur le...`, `2026-01-19 9 H 00 - Commission sur le...` |
| 6 | `DESCRIPTION_VIDEO` | text | 🟡 | `Étude publique du budget de la Ville ...` |
| 7 | `DUREE` | text | 🟢 | `8:14:05`, `5:09:40`, `3:26:46` |
| 8 | `URL` | text | 🟢 | `https://www.youtube.com/watch?v=mv3nn...`, `https://www.youtube.com/watch?v=5-ijM...`, `https://www.youtube.com/watch?v=8KJYd...` |

#### Ressource: Commissions permanentes (2018 à 2019) (CSV)

- **Resource ID**: `83090d3c-7f17-49c6-affa-4441bc7a4aff`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 819
- **Nombre de champs**: 10

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_SEANCE` | text | 🟢 | `CP_2020-11-26_R` |
| 2 | `NOM_SEANCE` | text | 🟢 | `Commission permanente` |
| 3 | `NOM_SEANCE_TYPE` | text | 🟢 | `Budget et administration` |
| 4 | `NOM_SEANCE_DETAIL` | text | 🟢 | `Budget 2021 et PDI 2021-2030` |
| 5 | `TYPE_ASSEMBLEE` | text | 🟢 | `Ordinaire` |
| 6 | `DATE_VIDEO` | datetime | 🟢 | `2020-11-26T00:00:00` |
| 7 | `POSITION_VIDEO` | decimal | 🟢 | `1`, `3`, `2` |
| 8 | `TITRE_VIDEO` | text | 🟢 | `Questions des membres de la commission`, `Questions du public`, `Présentation` |
| 9 | `DUREE` | text | 🟢 | `00:34:51`, `00:03:43`, `00:30:47` |
| 10 | `URL` | text | 🟢 | `https://media.montreal.ca/videos/cons...`, `https://media.montreal.ca/videos/cons...`, `https://media.montreal.ca/videos/cons...` |

---

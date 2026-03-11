# 02. Économie et entreprises
# Economy and Business

> **Nombre de datasets**: 9
> **Catégorie portail**: `economie-entreprises`
> **Généré le**: 2026-03-09 15:37

---

## Table des matières

1. [Indicateurs de l'état du centre-ville (archives)](#vmtl-indicateurs-de-l-etat-du-centre-ville)
2. [J'informe les commerçants](#vmtl-informe-commercants)
3. [Lieux et bâtiments à vocation publique](#vmtl-lieux-batiments-vocation-publique)
4. [Liste des baux actifs](#vmtl-liste-des-baux-sous-gestion)
5. [Liste des transactions immobilières](#vmtl-liste-des-transactions-immobilieres)
6. [Locaux commerciaux et statuts d'occupation](#vmtl-locaux-commerciaux)
7. [Requêtes des entreprises dans le cadre de la COVID-19](#vmtl-requetes-entreprises-covid-19)
8. [Sondage Écho sur l'inclusion des personnes immigrantes](#vmtl-sondage-inclusion-personnes-immigrantes)
9. [Étude sur les barrières d'accès à l'entrepreneuriat chez les populations vulnérables](#vmtl-etude-barrieres-entrepreneuriat-populations-vulnerables)

---

## Statistiques de la catégorie

| Métrique | Valeur |
|----------|--------|
| Datasets | 9 |
| Ressources totales | 44 |
| Ressources DataStore (requêtables via API) | 21 |
| Enregistrements totaux (DataStore) | 161,648 |

---

### Indicateurs de l'état du centre-ville (archives)

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-indicateurs-de-l-etat-du-centre-ville` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-indicateurs-de-l-etat-du-centre-ville` |
| **Fréquence de mise à jour** | notPlanned |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Bureau, COVID-19, Commerce, Enseignement supérieur, Habitation, Immobilier, Mobilité, SDÉ |

**Description**: L’état du centre-ville est un rapport trimestriel gratuit et accessible à tous qui donne le pouls de l’activité socioéconomique du centre-ville de Montréal. L’état du centre-ville vise à suivre l’évolution de la crise liée à la COVID-19 et à éclairer les efforts de relance.

**Formats disponibles**: XLSX

#### Ressource: Indicateurs (XLSX)

- **Resource ID**: `eae25e9a-3ca8-4d81-9c25-d09ef4ae2b97`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 32
- **Nombre de champs**: 5

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Sources` | text | 🟢 | _vide_ |
| 2 | `Fréquence` | text | 🟢 | `Mois`, `Mois/ trimestre` |
| 3 | `Dernière période de référence` | text | 🟢 | `2020-08-01 00:00:00`, `Données`, `10232.0` |
| 4 | `Période de comparaison` | text | 🟢 | `2019.0`, `Donnée` |
| 5 | `Variation  (fleche / couleur/ %)` | text | 🟢 | _vide_ |

---

### J'informe les commerçants

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-informe-commercants` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-informe-commercants` |
| **Fréquence de mise à jour** | notPlanned |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | COVID-19, Entreprise, Programme, SDÉ, Soutien, Économie |

**Description**: Pour soutenir les entreprises montréalaises durant cette situation exceptionnelle, le Service du développement économique de la Ville de Montréal a mis en place une initiative visant à informer de façon proactive les commerçants montréalais des programmes d'aides disponibles. Un court appel a permis de mieux comprendre leurs préoccupations dans le contexte particulier de la COVID-19 et de partager les informations susceptibles de les aider à s'adapter à la situation. Cet ensemble de données rassemble certains des éléments de réponse des entreprises qui ont discuté avec la Ville de Montréal, permettant de dresser un certain portrait de la réalité vécue par les entreprises montréalaises.

Pour plus de détails sur les mesures mises de l'avant par la Ville de Montréal et les programmes d'aide disponibles, visitez la [section dédiée sur le site internet de la Ville](https://montreal.ca/articles/covid-19-mesures-en-soutien-aux-entreprises-montrealaises).

**Formats disponibles**: CSV

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

### Liste des baux actifs

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-liste-des-baux-sous-gestion` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-liste-des-baux-sous-gestion` |
| **Fréquence de mise à jour** | annual |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Immeuble, Immobilier, Locataire, Location, SSI, Édifice |

**Description**: Cet ensemble de données présente les baux en vigueur (incluant la Ville locataire, la Ville locateur et les emphytéoses) comprenant les informations s’y rapportant : type de location, signataire (nom), adresse, arrondissement, date de début de bail et date de fin de bail.

**Formats disponibles**: CSV

#### Ressource: Liste des baux sous gestion en 2023 (CSV)

- **Resource ID**: `73963596-657e-4634-9f9f-9f3ff374e8ce`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 736
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Type de location` | text | 🟢 | `Locateur` |
| 2 | `Signataire (Nom)` | text | 🟢 | `DIFFUSION BIPLAN INC.`, `SOCOTROP SENC`, `ARTS EN MOUVEMENT DU QUEBEC INC` |
| 3 | `Adresse` | text | 🟢 | `330, rue Saint-Paul E` |
| 4 | `Arrondissement` | text | 🟢 | `VILLE-MARIE` |
| 5 | `Date de debut de bail` | text | 🟢 | `2020-01-01` |
| 6 | `Date de fin de bail` | text | 🟢 | `2027-05-31`, `2028-12-31`, `2025-12-31` |

#### Ressource: Liste des baux sous gestion en 2024 (CSV)

- **Resource ID**: `2815b942-a5b2-430b-9834-b57169de1680`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 736
- **Nombre de champs**: 7

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Numero de bail` | text | 🟢 | `0005-106`, `0005-103`, `0005-102` |
| 2 | `Type de location` | text | 🟢 | `Locateur` |
| 3 | `Signataire` | text | 🟢 | `DIFFUSION BIPLAN INC.`, `SOCOTROP SENC`, `ARTS EN MOUVEMENT DU QUEBEC INC` |
| 4 | `Adresse` | text | 🟢 | `330, rue Saint-Paul E` |
| 5 | `Arrondissement` | text | 🟢 | `VILLE-MARIE` |
| 6 | `Date de debut de bail` | text | 🟢 | `2020-01-01` |
| 7 | `Date de fin de bail` | text | 🟢 | `2027-05-31`, `2028-12-31`, `2025-12-31` |

---

### Liste des transactions immobilières

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-liste-des-transactions-immobilieres` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-liste-des-transactions-immobilieres` |
| **Fréquence de mise à jour** | annual |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Cession, Contrat, Immeuble, Immobilier, SSI, Servitude, Transaction, acquisition, emphytéose, préemption |

**Description**: Cet ensemble de données présente les transactions conclues au cours de la période du 1er janvier 2023 au 31 décembre 2024 (incluant les ventes, les acquisitions, les servitudes, droit de préemption, etc.) comprenant les informations s’y rapportant : catégorie, nom du contractant, description et montant de transaction, arrondissement, numéro de décision/ou de résolution et numéro d’acte notarié.

**Formats disponibles**: CSV

#### Ressource: Liste des transactions 2023 (CSV)

- **Resource ID**: `2f7a72a3-b941-43a6-943f-5a975dcf880c`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 0
- **Nombre de champs**: 7

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `categorie` | text | ⚪ | _vide_ |
| 2 | `nom_contractant` | text | ⚪ | _vide_ |
| 3 | `description` | text | ⚪ | _vide_ |
| 4 | `montant_transaction` | text | ⚪ | _vide_ |
| 5 | `arrondissement` | text | ⚪ | _vide_ |
| 6 | `numero_decision-resolution` | text | ⚪ | _vide_ |
| 7 | `numero_acte_notarie` | text | ⚪ | _vide_ |

#### Ressource: Liste des transaction 2024 (CSV)

- **Resource ID**: `615c52d7-a8f3-4d7b-a274-bc6ca9c843a5`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 71
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Categorie` | text | 🟢 | `Échange`, `Transfert de ruelle`, `Acquisition de servitude` |
| 2 | `cocontractant` | text | 🟢 | `Commerce d'Automobiles GPA inc. / GPA...`, `S.O.`, `Couche-Tard Inc` |
| 3 | `Description` | text | 🟢 | `Approuver un projet d'acte par lequel...`, `Approuver un projet d'acte par lequel...`, `Adopter un règlement intitulé « Règle...` |
| 4 | `montant_transaction` | text | 🟢 | `$0`, `$94,889` |
| 5 | `arrondissement` | text | 🟢 | `Saint-Laurent`, `Rosemont - La Petite-Patrie`, `Ahuntsic - Cartierville` |
| 6 | `numero_decision-resolution` | text | 🟢 | `DA218703004`, `CM24 0918`, `DA198295002` |
| 7 | `no_acte_notarie` | text | 🟢 | `28538365`, `29018692`, `28985093` |
| 8 | `date_signature` | text | 🟢 | `2024-09-30`, `2024-02-15`, `2024-10-16` |

---

### Locaux commerciaux et statuts d'occupation

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-locaux-commerciaux` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-locaux-commerciaux` |
| **Fréquence de mise à jour** | annual |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Artère commerciale, Commerce, Commerce de rue, Entreprise, Local commercial, SDC, SDÉ, Vacance commerciale |

**Description**: L’enquête terrain des locaux commerciaux vise à élaborer un portrait du commerce de rue sur le territoire de l’agglomération de Montréal afin de répertorier les locaux destinés à la pratique d’une activité économique (excluant les activités industrielles et institutionnelles).

Ce jeu de données permet notamment de mesurer le statut d’occupation des locaux commerciaux, de suivre l’évolution du commerce de rue ainsi que de produire diverses analyses et cartes thématiques.

Les [Portraits du commerce de rue à Montréal](https://ville.montreal.qc.ca/portal/page?_pageid=6897,68149735&_dad=portal&_schema=PORTAL) sont également disponibles pour l'agglomération de Montréal, la Ville de Montréal ainsi que les arrondissements et les villes liées.

**Formats disponibles**: CSV, GEOJSON, GPKG, PDF, SHP, WEB

#### Ressource: Enquête sur l'occupation commerciale 2025 (CSV)

- **Resource ID**: `01ded48e-f982-4703-975e-4be0769ef3ee`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 28,621
- **Nombre de champs**: 34

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID` | text | 🟢 | `{c5186c37-74d6-4c13-9932-69cb194d44c6}`, `{c0535606-0a3f-4d90-ae48-ea19ffff0c93}`, `{6dfe0507-07c0-4ee6-a66f-67835a41df1c}` |
| 2 | `ORIGINE` | text | 🟢 | `HORS_SDC` |
| 3 | `T_COMMERCE` | text | 🟢 | `Commerce rue` |
| 4 | `DATE_CREATION` | text | 🟢 | `2025-05-30` |
| 5 | `CIVIQUE` | text | 🟢 | `120`, `130`, `121` |
| 6 | `TYPE_VOIE` | text | 🟢 | `rue`, `avenue` |
| 7 | `LIEN_VOIE` | text | 🔴 | _vide_ |
| 8 | `NOM_VOIE` | text | 🟢 | `Duluth`, `De Bullion` |
| 9 | `ORIENTATION` | text | 🟠 | `E` |
| 10 | `ADRESSE` | text | 🟢 | `121 avenue Duluth E`, `130 avenue Duluth E`, `120 avenue Duluth E` |
| 11 | `SUITE` | text | 🔴 | _vide_ |
| 12 | `ETAGE` | text | 🟢 | `RC` |
| 13 | `NOM_CENTRE` | text | 🟢 | `N/A` |
| 14 | `NOM_ETAB` | text | 🟢 | `Mollie`, `SOARES ET FILS ÉPICERIE`, `MAISON DE L'AMITIÉ` |
| 15 | `ID_USAGE1` | text | 🟢 | `D`, `A`, `I` |
| 16 | `USAGE1` | text | 🟢 | `Restauration, divertissement et hôtel...`, `Autres`, `Biens courants` |
| 17 | `ID_USAGE2` | text | 🟢 | `38`, `4`, `49` |
| 18 | `USAGE2` | text | 🟢 | `Restauration`, `Alimentation`, `Organismes religieux, fondations, gro...` |
| 19 | `ID_USAGE3` | text | 🟢 | `120`, `59`, `66` |
| 20 | `USAGE3` | text | 🟢 | `Restaurants`, `Fondations et associations communauta...`, `Épicerie` |
| 21 | `SCIAN` | text | 🟢 | `722511`, `445110`, `813990` |
| 22 | `ACCES_MOBILITE_REDUITE` | text | 🟢 | `Non`, `Accès au niveau du sol` |
| 23 | `VACANT_A_LOUER` | text | 🟢 | `Non` |
| 24 | `ARRONDISSEMENT` | text | 🟢 | `Le Plateau-Mont-Royal` |
| 25 | `QUARTIER` | text | 🟢 | `Saint-Louis` |
| 26 | `SDC_NOM` | text | 🟢 | `N/A` |
| 27 | `SECTEUR_PME` | text | 🟢 | `Centre-Ville` |
| 28 | `ENFANT` | text | 🟢 | `Non` |
| 29 | `MULTIUSAGE` | text | 🟢 | `Non` |
| 30 | `MULTIOCCUPANT` | text | 🟢 | `Non` |
| 31 | `COORDY` | text | ⚪ | `5042030.14`, `5042014.48`, `5042035.13` |
| 32 | `COORDX` | text | ⚪ | `298699.53`, `298697.19`, `298672.29` |
| 33 | `LAT` | text | ⚪ | `45.51803166651622`, `45.518217265060244`, `45.51817260193368` |
| 34 | `LONG` | text | ⚪ | `-73.57811713126736`, `-73.57843610798044`, `-73.57808737432167` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `LIEN_VOIE`: 85.6% null
- `SUITE`: 85.6% null
- `ORIENTATION`: 64.8% null

#### Ressource: Enquête sur l'occupation commerciale 2024 (CSV)

- **Resource ID**: `fb2e534a-c573-45b5-b62b-8f99e3a37cd1`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 28,462
- **Nombre de champs**: 34

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID` | text | 🟢 | `{f870dccd-6de3-4c7f-96b9-2f9b3c19669d}`, `{1c7d5c11-2180-48f3-bfb0-5282192528e1}`, `{84d6983b-891c-4160-a84c-3cc6aa65c2dd}` |
| 2 | `ORIGINE` | text | 🟢 | `HORS_SDC` |
| 3 | `T_COMMERCE` | text | 🟢 | `Commerce rue` |
| 4 | `DATE_CREATION` | text | 🟢 | `2024/05/21`, `2024/08/17`, `2024/05/16` |
| 5 | `CIVIQUE` | text | 🟢 | `9210`, `9630`, `9660` |
| 6 | `TYPE_VOIE` | text | 🟢 | `boulevard`, `rue` |
| 7 | `LIEN_VOIE` | text | 🔴 | _vide_ |
| 8 | `NOM_VOIE` | text | 🟢 | `5e`, `4e`, `Maurice-Duplessis` |
| 9 | `ORIENTATION` | text | 🟠 | _vide_ |
| 10 | `ADRESSE` | text | 🟢 | `9210 boulevard Maurice-Duplessis`, `9660 4e rue`, `9630 4e rue` |
| 11 | `SUITE` | text | 🔴 | _vide_ |
| 12 | `ETAGE` | text | 🟢 | `RC` |
| 13 | `NOM_CENTRE` | text | 🟢 | `N/A` |
| 14 | `NOM_ETAB` | text | 🟢 | `Pizza promo`, `Marché Iliamise`, `FITFORM` |
| 15 | `ID_USAGE1` | text | 🟢 | `A`, `E`, `D` |
| 16 | `USAGE1` | text | 🟢 | `Restauration, divertissement et hôtel...`, `Biens courants`, `Services aux consommateurs` |
| 17 | `ID_USAGE2` | text | 🟢 | `16`, `4`, `49` |
| 18 | `USAGE2` | text | 🟢 | `Alimentation`, `Restauration`, `Centres de conditionnement et studios...` |
| 19 | `ID_USAGE3` | text | 🟢 | `121`, `59`, `35` |
| 20 | `USAGE3` | text | 🟢 | `Restaurants rapides, Cantines`, `Centres de conditionnement physique`, `Épicerie` |
| 21 | `SCIAN` | text | 🟢 | `713940`, `722512`, `445110` |
| 22 | `ACCES_MOBILITE_REDUITE` | text | 🟢 | `Non`, `Accès au niveau du sol` |
| 23 | `VACANT_A_LOUER` | text | 🟢 | `Non` |
| 24 | `ARRONDISSEMENT` | text | 🟢 | `Rivière-des-Prairies–Pointe-aux-Trembles` |
| 25 | `QUARTIER` | text | 🟢 | `Rivière-des-Prairies` |
| 26 | `SDC_NOM` | text | 🟢 | `N/A` |
| 27 | `SECTEUR_PME` | text | 🟢 | `Est-de-l'Île` |
| 28 | `ENFANT` | text | 🟢 | `Non` |
| 29 | `MULTIUSAGE` | text | 🟢 | `Non` |
| 30 | `MULTIOCCUPANT` | text | 🟢 | `Non` |
| 31 | `COORDY` | text | ⚪ | `5056284.209879688`, `5057220.799879679`, `5057227.40987968` |
| 32 | `COORDX` | text | ⚪ | `299489.09999995533`, `299571.29999995633`, `299570.51999995566` |
| 33 | `LAT` | text | ⚪ | `45.64645063988463`, `45.65487887492915`, `45.65493835873739` |
| 34 | `LONG` | text | ⚪ | `-73.56710281220408`, `-73.56813742725471`, `-73.56709300329757` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `SUITE`: 86.0% null
- `LIEN_VOIE`: 85.3% null
- `ORIENTATION`: 64.8% null

#### Ressource: Enquête sur l'occupation commerciale 2023 (CSV)

- **Resource ID**: `0c1981f8-e238-4709-8ac4-acdd1fdb7502`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 28,256
- **Nombre de champs**: 34

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID` | text | 🟢 | `{f870dccd-6de3-4c7f-96b9-2f9b3c19669d}`, `{1c7d5c11-2180-48f3-bfb0-5282192528e1}`, `{84d6983b-891c-4160-a84c-3cc6aa65c2dd}` |
| 2 | `ORIGINE` | text | 🟢 | `HORS_SDC` |
| 3 | `T_COMMERCE` | text | 🟢 | `Commerce rue` |
| 4 | `DATE_CREATION` | text | 🟢 | `2023/06/07` |
| 5 | `CIVIQUE` | text | 🟢 | `9210`, `9630`, `9660` |
| 6 | `TYPE_VOIE` | text | 🟢 | `boulevard`, `rue` |
| 7 | `LIEN_VOIE` | text | 🔴 | _vide_ |
| 8 | `NOM_VOIE` | text | 🟢 | `5e`, `4e`, `Maurice-Duplessis` |
| 9 | `ORIENTATION` | text | 🟠 | _vide_ |
| 10 | `ADRESSE` | text | 🟢 | `9210 boulevard Maurice-Duplessis`, `9660 4e rue`, `9630 4e rue` |
| 11 | `SUITE` | text | 🔴 | _vide_ |
| 12 | `ETAGE` | text | 🟢 | `RC` |
| 13 | `NOM_CENTRE` | text | 🟢 | `N/A` |
| 14 | `NOM_ETAB` | text | 🟢 | `Pizza promo`, `Marché Iliamise`, `FITFORM` |
| 15 | `ID_USAGE1` | text | 🟢 | `A`, `E`, `D` |
| 16 | `USAGE1` | text | 🟢 | `Restauration, divertissement et hôtel...`, `Biens courants`, `Services aux consommateurs` |
| 17 | `ID_USAGE2` | text | 🟢 | `16`, `4`, `49` |
| 18 | `USAGE2` | text | 🟢 | `Alimentation`, `Restauration`, `Centres de conditionnement et studios...` |
| 19 | `ID_USAGE3` | text | 🟢 | `149`, `121`, `134` |
| 20 | `USAGE3` | text | 🟢 | `Restaurants rapides, Cantines`, `Centres de conditionnement physique`, `Épicerie` |
| 21 | `SCIAN` | text | 🟢 | `713940`, `722512`, `445110` |
| 22 | `ACCES_MOBILITE_REDUITE` | text | 🟢 | `Non`, `Accès au niveau du sol` |
| 23 | `VACANT_A_LOUER` | text | 🟢 | `Non` |
| 24 | `ARRONDISSEMENT` | text | 🟢 | `Rivière-des-Prairies–Pointe-aux-Trembles` |
| 25 | `QUARTIER` | text | 🟢 | `Rivière-des-Prairies` |
| 26 | `SDC_NOM` | text | 🟢 | `N/A` |
| 27 | `SECTEUR_PME` | text | 🟢 | `Est-de-l'Île` |
| 28 | `ENFANT` | text | 🟢 | `Non` |
| 29 | `MULTIUSAGE` | text | 🟢 | `Non` |
| 30 | `MULTIOCCUPPANT` | text | 🟢 | `Non` |
| 31 | `COORDY` | text | ⚪ | `5056285.23`, `5057221.82`, `5057228.43` |
| 32 | `COORDX` | text | ⚪ | `299571.18`, `299570.41`, `299488.98` |
| 33 | `LAT` | text | ⚪ | `45.64645063988463`, `45.65487887492915`, `45.65493835873739` |
| 34 | `LONG` | text | ⚪ | `-73.56710281220408`, `-73.56813742725471`, `-73.56709300329757` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `SUITE`: 86.4% null
- `LIEN_VOIE`: 85.1% null
- `ORIENTATION`: 64.8% null

#### Ressource: Enquête sur l'occupation commerciale 2022 (CSV)

- **Resource ID**: `2f8d12aa-f338-4a4f-a516-3438142074a9`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 29,203
- **Nombre de champs**: 34

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID` | text | 🟢 | `{81e6c3c3-2213-4729-8f28-b51325c66142}`, `{d01b3230-6ba9-452f-afe2-59617a51646a}`, `{483df3aa-f663-4f3e-b53d-38a4373c351a}` |
| 2 | `ORIGINE` | text | 🟢 | `SDC` |
| 3 | `T_COMMERCE` | text | 🟢 | `Commerce rue` |
| 4 | `DATE_CREATION` | text | 🟢 | `2022-07-04` |
| 5 | `CIVIQUE` | text | 🟢 | `603`, `3285`, `605` |
| 6 | `TYPE_VOIE` | text | 🟢 | `rue` |
| 7 | `LIEN_VOIE` | text | 🔴 | _vide_ |
| 8 | `NOM_VOIE` | text | 🟢 | `Notre-Dame`, `Atwater`, `Saint-Jacques` |
| 9 | `ORIENTATION` | text | 🟠 | `O` |
| 10 | `ADRESSE` | text | 🟢 | `603 rue Atwater`, `605 rue Atwater`, `3285 rue Saint-Jacques` |
| 11 | `SUITE` | text | 🔴 | `102` |
| 12 | `ETAGE` | text | 🟢 | `2e` |
| 13 | `NOM_CENTRE` | text | 🟢 | `N/A` |
| 14 | `NOM_ETAB` | text | 🟢 | `Chez Éditeur`, `VACANT`, `SDC - Les Quartiers du Canal` |
| 15 | `ID_USAGE1` | text | 🟢 | `D`, `Z`, `I` |
| 16 | `USAGE1` | text | 🟢 | `Restauration, divertissement et hôtel...`, `Autres`, `VACANT` |
| 17 | `ID_USAGE2` | text | 🟢 | `62`, `67`, `49` |
| 18 | `USAGE2` | text | 🟢 | `Organismes publiques`, `Restauration`, `VACANT` |
| 19 | `ID_USAGE3` | text | 🟢 | `31`, `143`, `155` |
| 20 | `USAGE3` | text | 🟢 | `Organismes publiques`, `VACANT`, `Café, Salon de thé` |
| 21 | `SCIAN` | text | 🟢 | `91`, `N/A`, `722512` |
| 22 | `ACCES_MOBILITE_REDUITE` | text | 🟢 | `Non` |
| 23 | `VACANT_A_LOUER` | text | 🟢 | `Non`, `Oui` |
| 24 | `ARRONDISSEMENT` | text | 🟢 | `Le Sud-Ouest` |
| 25 | `QUARTIER` | text | 🟢 | `Saint-Henri`, `Petite-Bourgogne` |
| 26 | `SDC_NOM` | text | 🟢 | `SDC Les Quartiers du Canal` |
| 27 | `SECTEUR_PME` | text | 🟢 | `Grand Sud-Ouest` |
| 28 | `ENFANT` | text | 🟢 | `Non` |
| 29 | `MULTIUSAGE` | text | 🟢 | `Non` |
| 30 | `MULTIOCCUPPANT` | text | 🟢 | `Non` |
| 31 | `COORDX` | text | ⚪ | `298650,69`, `298421,07`, `298652,1` |
| 32 | `COORDY` | text | ⚪ | `5038095,15`, `5038117,17`, `5038095,78` |
| 33 | `LAT` | text | ⚪ | `45.48295035`, `45.48275425`, `45.48276005` |
| 34 | `LONG` | text | ⚪ | `-73.57866160`, `-73.58159925`, `-73.57864353` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `SUITE`: 85.4% null
- `LIEN_VOIE`: 85.3% null
- `ORIENTATION`: 64.9% null

#### Ressource: Enquête sur l'occupation commerciale 2021 (CSV)

- **Resource ID**: `ef70f2e5-6f97-4f10-a609-3525ffbf6c98`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 28,497
- **Nombre de champs**: 33

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID` | text | 🟢 | `{f870dccd-6de3-4c7f-96b9-2f9b3c19669d}`, `{1c7d5c11-2180-48f3-bfb0-5282192528e1}`, `{84d6983b-891c-4160-a84c-3cc6aa65c2dd}` |
| 2 | `ORIGINE` | text | 🟢 | `HORS_SDC` |
| 3 | `T_COMMERCE` | text | 🟢 | `Commerce rue` |
| 4 | `DATE_CREATION` | text | 🟢 | `2021-07-12` |
| 5 | `CIVIQUE` | text | 🟢 | `9210`, `9630`, `9660` |
| 6 | `TYPE_VOIE` | text | 🟢 | `boulevard`, `rue`, `avenue` |
| 7 | `LIEN_VOIE` | text | 🔴 | _vide_ |
| 8 | `NOM_VOIE` | text | 🟢 | `5e`, `4e`, `Maurice-Duplessis` |
| 9 | `ORIENTATION` | text | 🟠 | `S` |
| 10 | `ADRESSE` | text | 🟢 | `9210 boulevard Maurice-Duplessis`, `9660 4e avenue S`, `9630 4e avenue S` |
| 11 | `SUITE` | text | 🔴 | _vide_ |
| 12 | `ETAGE` | text | 🟢 | `RC` |
| 13 | `NOM_CENTRE` | text | 🟢 | `N/A` |
| 14 | `NOM_ETAB` | text | 🟢 | `Pizza promo`, `Marché Iliamise`, `FITFORM` |
| 15 | `ID_USAGE1` | text | 🟢 | `A`, `E`, `D` |
| 16 | `USAGE1` | text | 🟢 | `Restauration, divertissement et hôtel...`, `Biens courants`, `Services aux consommateurs` |
| 17 | `ID_USAGE2` | text | 🟢 | `16`, `4`, `49` |
| 18 | `USAGE2` | text | 🟢 | `Alimentation`, `Restauration`, `Centres de conditionnement et studios...` |
| 19 | `ID_USAGE3` | text | 🟢 | `121`, `52`, `35` |
| 20 | `USAGE3` | text | 🟢 | `Restaurants rapides, Cantines`, `Dépanneur (incluant tabagie)`, `Centres de conditionnement physique` |
| 21 | `SCIAN` | text | 🟢 | `713940`, `722512`, `445120` |
| 22 | `ARRONDISSEMENT` | text | 🟢 | `Rivière-des-Prairies - Pointe-aux-Tre...` |
| 23 | `QUARTIER` | text | 🟢 | `Rivière-des-Prairies` |
| 24 | `SDC_NOM` | text | 🟢 | `N/A` |
| 25 | `SECTEUR_PME` | text | 🟢 | `PME Est-de-l'île` |
| 26 | `ENFANT` | text | 🟢 | `Non` |
| 27 | `COMMERCE_HABITATION` | text | 🟢 | `Non` |
| 28 | `MULTIUSAGE` | text | 🟢 | `Non` |
| 29 | `MULTIOCCUPPANT` | text | 🟢 | `Non` |
| 30 | `COORDX` | text | 🟢 | `299570,400763`, `299571,176105`, `299488,981606` |
| 31 | `COORDY` | text | ⚪ | `5056285,233842`, `5057221,814263`, `5057228,434902` |
| 32 | `LAT` | text | ⚪ | `45.65492919`, `45.64644147`, `45.65486970` |
| 33 | `LONG` | text | ⚪ | `-73.56813595`, `-73.56709152`, `-73.56710133` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `SUITE`: 85.4% null
- `LIEN_VOIE`: 85.1% null
- `ORIENTATION`: 64.0% null

#### Ressource: Liste des usages commerciaux (CSV)

- **Resource ID**: `bb891287-3690-4a5a-9641-09cea02a8cc7`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 168
- **Nombre de champs**: 9

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_USAGE1` | text | 🟢 | `A` |
| 2 | `USAGE1` | text | 🟢 | `Biens courants` |
| 3 | `ID_USAGE2` | text | 🟢 | `4`, `3` |
| 4 | `USAGE2` | text | 🟢 | `Alimentation`, `Biens récréatifs` |
| 5 | `70` | text | 🟢 | `27`, `28`, `10` |
| 6 | `USAGE3` | text | 🟢 | `Boucherie`, `Boulangerie, Chocolaterie, Confiserie...`, `Alcool` |
| 7 | `SCIAN` | text | 🟢 | `445310`, `44529`, `445210` |
| 8 | `ECONOMIE_CIRCULAIRE` | text | 🔴 | _vide_ |
| 9 | `DETAILS` | text | 🔴 | `SAQ, Alcool du terroir, Produit de vi...` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `ECONOMIE_CIRCULAIRE`: 82.7% null
- `DETAILS`: 76.2% null

---

### Requêtes des entreprises dans le cadre de la COVID-19

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-requetes-entreprises-covid-19` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-requetes-entreprises-covid-19` |
| **Fréquence de mise à jour** | notPlanned |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | COVID-19, Entreprise, Mesure, Programme, SDÉ, Soutien, Économie |

**Description**: Pour soutenir les entreprises montréalaises durant cette situation exceptionnelle, le Service du développement économique de la Ville de Montréal a mis à la disposition des entreprises et des organisations montréalaises une ligne téléphonique dédiée, ainsi qu'un formulaire web afin de faciliter le cheminement des demandes d'information, de répondre aux besoins des entreprises et de mieux comprendre leurs préoccupations dans le contexte particulier de la COVID-19. Cet ensemble de données rassemble certains des éléments de réponse des entreprises qui ont communiqué avec la Ville de Montréal, permettant de dresser un certain portrait de la réalité vécue par les entreprises montréalaises.

Pour plus de détails sur les mesures mises de l'avant par la Ville de Montréal et les programmes d'aide disponibles, visitez la [section dédiée sur le site internet de la Ville](https://montreal.ca/articles/covid-19-mesures-en-soutien-aux-entreprises-montrealaises).

**Formats disponibles**: CSV

#### Ressource: Requêtes des entreprises dans le cadre de la COVID-19 (CSV)

- **Resource ID**: `b3b062d9-9c3b-4d0e-99fb-179d71d755c5`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,695
- **Nombre de champs**: 14

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID` | decimal | 🟢 | `904`, `1`, `2` |
| 2 | `Date` | datetime | 🟢 | `2020-03-24T00:00:00`, `2020-03-27T00:00:00`, `2020-03-19T00:00:00` |
| 3 | `Localisation à Montréal` | text | 🟢 | `Non`, `Localisation inconnue`, `Oui` |
| 4 | `Secteur d'activité de l'entreprise` | text | 🟢 | `Services divers (ex. : garage, salon ...`, `Commerce de détail`, `Autres` |
| 5 | `Nombre d'employés de l'entreprise au 1er mars 2020` | text | 🟢 | `Taille inconnue` |
| 6 | `Sujet de la demande: Soutien financier` | text | 🟢 | `Soutien financier` |
| 7 | `Sujet de la demande: Maintien des opérations` | text | 🟢 | _vide_ |
| 8 | `Sujet de la demande: Fiscalité (taxes et impôts)` | text | 🟢 | _vide_ |
| 9 | `Sujet de la demande: Ressources humaines` | text | 🟢 | _vide_ |
| 10 | `Sujet de la demande: Réglementation` | text | 🟢 | `Réglementation` |
| 11 | `Sujet de la demande: Marketing` | text | 🟢 | `Marketing` |
| 12 | `Sujet de la demande: Santé et sécurité` | text | 🟢 | `Santé et sécurité` |
| 13 | `Source de la demande` | text | 🟢 | `Formulaire`, `Téléphone` |
| 14 | `Arrondissement ou ville liée` | text | 🟢 | `Inconnu(e)` |

---

### Sondage Écho sur l'inclusion des personnes immigrantes

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-sondage-inclusion-personnes-immigrantes` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-sondage-inclusion-personnes-immigrantes` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | ADS, Immigration, Inclusion, Intégration économique, SDIS, Sondage |

**Description**: Résultats de la deuxième édition du rapport Écho - le Baromètre de la Ville de Montréal sur l’inclusion des personnes immigrantes.  

Cette recherche s’inscrit dans le cadre du Plan d’action solidarité, équité et inclusion 2021-2025 de la Ville de Montréal.  

Le sondage a pour objectif de :   

* Dresser un portrait comparatif des besoins des personnes immigrantes et non immigrantes montréalaises de manière intersectionnelle. 

* Suivre et analyser des indicateurs d’inclusion et d’intégration dans le temps. 

* Orienter les décisions, les politiques et les programmes de la métropole avec des données probantes.

**Formats disponibles**: CSV

#### Ressource: Sondage Écho 2023 le baromètre sur l'inclusion des personnes immigrantes (CSV)

- **Resource ID**: `f1fcf2a3-7323-47ff-8c88-4d8f8f0ce20f`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,087
- **Nombre de champs**: 121

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `caseid` | text | 🟢 | `175`, `343`, `67` |
| 2 | `mode` | text | 🟢 | `1`, `2` |
| 3 | `q1a` | text | 🟢 | `1` |
| 4 | `q1b` | text | 🟢 | `14`, `17`, `10` |
| 5 | `q2` | text | 🟢 | `6`, `3`, `7` |
| 6 | `age5` | text | 🟢 | `5`, `2` |
| 7 | `q3a` | text | 🟢 | `1` |
| 8 | `q3b` | text | 🟢 | `1` |
| 9 | `classc` | text | 🟢 | `1` |
| 10 | `q4` | text | 🟠 | _vide_ |
| 11 | `q4t` | text | 🟢 | `1` |
| 12 | `q4a` | text | 🔴 | _vide_ |
| 13 | `q5` | text | 🟠 | _vide_ |
| 14 | `qquot_m1` | text | 🟢 | `1` |
| 15 | `qquot_m2` | text | 🟠 | _vide_ |
| 16 | `qquot_m3` | text | 🔴 | _vide_ |
| 17 | `q6` | text | 🟢 | `1`, `2` |
| 18 | `q7` | text | 🟠 | `1` |
| 19 | `q7t_m1` | text | 🟢 | `1`, `2` |
| 20 | `q7t_m2` | text | 🟢 | `11` |
| 21 | `q8` | text | 🟢 | `1`, `3`, `2` |
| 22 | `q9` | text | 🟢 | `1`, `2` |
| 23 | `q10a` | text | 🟠 | `2` |
| 24 | `q10b` | text | 🟠 | `2` |
| 25 | `q10c` | text | 🟠 | `2` |
| 26 | `q10d` | text | 🟠 | `2` |
| 27 | `q10e` | text | 🟠 | `2` |
| 28 | `q10f` | text | 🟠 | `2` |
| 29 | `nbq10` | text | 🟠 | `0` |
| 30 | `q11a` | text | 🟠 | `2` |
| 31 | `q11b` | text | ⚪ | `2` |
| 32 | `q11c` | text | ⚪ | `2` |
| 33 | `q11d` | text | ⚪ | `2` |
| 34 | `q11e` | text | ⚪ | `2` |
| 35 | `q11f` | text | ⚪ | `2` |
| 36 | `q11g` | text | ⚪ | `2` |
| 37 | `q11h` | text | ⚪ | `2` |
| 38 | `q11i` | text | ⚪ | `2` |
| 39 | `nbq11` | text | ⚪ | `0` |
| 40 | `q12` | text | ⚪ | `1`, `8` |
| 41 | `q13` | text | ⚪ | `1`, `2` |
| 42 | `q14a` | text | ⚪ | `2` |
| 43 | `q14b` | text | ⚪ | `2` |
| 44 | `q14c` | text | ⚪ | `2` |
| 45 | `q14d` | text | ⚪ | `2` |
| 46 | `q14e` | text | ⚪ | `2` |
| 47 | `q14f` | text | ⚪ | `2` |
| 48 | `q14g` | text | ⚪ | `2` |
| 49 | `q14h` | text | ⚪ | `2` |
| 50 | `q14i` | text | ⚪ | `2` |
| 51 | `nbq14` | text | ⚪ | `0` |
| 52 | `q15a` | text | ⚪ | `1` |
| 53 | `q15b` | text | ⚪ | `1` |
| 54 | `q15c` | text | ⚪ | `2` |
| 55 | `q15d` | text | ⚪ | `2` |
| 56 | `q15e` | text | ⚪ | `2` |
| 57 | `q15f` | text | ⚪ | `2` |
| 58 | `q15g` | text | ⚪ | `1` |
| 59 | `q15h` | text | ⚪ | `1` |
| 60 | `q15i` | text | ⚪ | `2` |
| 61 | `nbq15` | text | ⚪ | `5` |
| 62 | `q16` | text | ⚪ | `4`, `3` |
| 63 | `q17` | text | ⚪ | `4` |
| 64 | `q18` | text | ⚪ | `1`, `3`, `2` |
| 65 | `q19` | text | ⚪ | `1`, `3` |
| 66 | `q20` | text | ⚪ | `1`, `3`, `2` |
| 67 | `q21` | text | ⚪ | `1`, `3`, `2` |
| 68 | `q22a` | text | ⚪ | `1`, `2` |
| 69 | `q22b` | text | ⚪ | `2` |
| 70 | `q22c` | text | ⚪ | `1`, `2` |
| 71 | `q22d` | text | ⚪ | `2` |
| 72 | `q22e` | text | ⚪ | `1`, `2` |
| 73 | `q22f` | text | ⚪ | `1`, `2` |
| 74 | `q22g` | text | ⚪ | `1`, `2` |
| 75 | `q22h` | text | ⚪ | `1`, `2` |
| 76 | `q22i` | text | ⚪ | `1`, `2` |
| 77 | `q22j` | text | ⚪ | `2` |
| 78 | `q22k` | text | ⚪ | `2` |
| 79 | `q22k_o` | text | ⚪ | _vide_ |
| 80 | `nbq22` | text | ⚪ | `0`, `7` |
| 81 | `q23a` | text | ⚪ | `5`, `4`, `2` |
| 82 | `q23b` | text | ⚪ | `5`, `4`, `3` |
| 83 | `q23c` | text | ⚪ | `5`, `4`, `3` |
| 84 | `q25a` | text | ⚪ | `4`, `3`, `2` |
| 85 | `q25b` | text | ⚪ | `5`, `4` |
| 86 | `q25c` | text | ⚪ | `5`, `4`, `3` |
| 87 | `q25d` | text | ⚪ | `5`, `4`, `3` |
| 88 | `q25e` | text | ⚪ | `4`, `1`, `3` |
| 89 | `q25f` | text | ⚪ | `5`, `4`, `3` |
| 90 | `q26a` | text | ⚪ | `1`, `3`, `2` |
| 91 | `q26b` | text | ⚪ | `1`, `3`, `2` |
| 92 | `q26c` | text | ⚪ | `1`, `3`, `2` |
| 93 | `q26d` | text | ⚪ | `3`, `2` |
| 94 | `q26e` | text | ⚪ | `3`, `2` |
| 95 | `q26f` | text | ⚪ | `3`, `2` |
| 96 | `q26g` | text | ⚪ | `3`, `2` |
| 97 | `q27a` | text | ⚪ | `1`, `2` |
| 98 | `q27b` | text | ⚪ | `1`, `2` |
| 99 | `q27c` | text | ⚪ | `1`, `2` |
| 100 | `q27d` | text | ⚪ | `1`, `2` |
| 101 | `q27e` | text | ⚪ | `1`, `2` |
| 102 | `q27f` | text | ⚪ | `1`, `2` |
| 103 | `nbq27` | text | ⚪ | `0`, `1`, `6` |
| 104 | `q28a` | text | ⚪ | `2` |
| 105 | `q28b` | text | ⚪ | `1` |
| 106 | `q28c` | text | ⚪ | `2` |
| 107 | `q28d` | text | ⚪ | `2` |
| 108 | `q28e` | text | ⚪ | `2` |
| 109 | `q28f` | text | ⚪ | `2` |
| 110 | `nbq28` | text | ⚪ | `0`, `1` |
| 111 | `q29` | text | ⚪ | `1`, `2` |
| 112 | `q30` | text | ⚪ | `4` |
| 113 | `q31` | text | ⚪ | _vide_ |
| 114 | `q32` | text | ⚪ | _vide_ |
| 115 | `q3132_m1` | text | ⚪ | _vide_ |
| 116 | `q3132_m2` | text | ⚪ | _vide_ |
| 117 | `q3132_m3` | text | ⚪ | _vide_ |
| 118 | `q33` | text | ⚪ | `2` |
| 119 | `q34` | text | ⚪ | `1`, `2` |
| 120 | `q35` | text | ⚪ | `5`, `3`, `7` |
| 121 | `poids` | text | ⚪ | `0,158832654356956`, `0,282999515533447`, `2,32961440086365` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `q4a`: 95.2% null
- `qquot_m3`: 82.9% null

#### Ressource: Description des variables 2023 (CSV)

- **Resource ID**: `ea2efeb8-e0e8-4dc2-8959-7bc787b45cbd`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 500
- **Nombre de champs**: 4

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `champ` | text | 🟢 | `q1a`, `q1b`, `mode` |
| 2 | `description_question` | text | 🟢 | `Q1B) Dans quel arrondissement de la V...`, `MODE) Mode de collecte`, `Q1A) Habitez-vous dans l'un ou l'autr...` |
| 3 | `variable_reponse` | text | 🟢 | `1`, `2` |
| 4 | `description_reponse` | text | 🟢 | `Web (non probabiliste)`, `Téléphonique (probabiliste)`, `Oui` |

#### Ressource: Sondage Écho 2020 le baromètre sur l'inclusion des personnes immigrantes (CSV)

- **Resource ID**: `88bb6a18-54fa-4789-82e8-14888a933a4a`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,503
- **Nombre de champs**: 361

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `record` | decimal | 🟢 | `5`, `4`, `3` |
| 2 | `date` | datetime | 🟢 | `2020-02-20T15:59:00`, `2020-02-20T15:48:00`, `2020-02-20T16:49:00` |
| 3 | `sexe` | decimal | 🟢 | `1` |
| 4 | `age` | decimal | 🟢 | `5`, `4`, `1` |
| 5 | `ARRON` | decimal | 🟢 | `13`, `10`, `9` |
| 6 | `NAISS` | decimal | 🟢 | `1`, `2` |
| 7 | `NAISSANCE2` | text | 🟢 | `Grce` |
| 8 | `NAIS2r9` | decimal | 🟠 | `0` |
| 9 | `LANGU` | decimal | 🟢 | `1`, `2` |
| 10 | `LANGUr96oe` | text | 🟢 | _vide_ |
| 11 | `LGBTQ` | decimal | 🟢 | `2` |
| 12 | `MINO` | decimal | 🟢 | `2` |
| 13 | `MINO2` | decimal | 🟡 | `2` |
| 14 | `SCOL` | decimal | 🟢 | `5`, `3`, `6` |
| 15 | `SCOL2` | decimal | 🟠 | `1` |
| 16 | `SCOL3` | decimal | 🟠 | `1` |
| 17 | `SCOL2r1oe` | text | 🟢 | `Qubec` |
| 18 | `SCOL2r2oe` | text | 🟢 | _vide_ |
| 19 | `Q1` | decimal | 🟢 | `1`, `2` |
| 20 | `Q2r1` | decimal | 🟢 | `1`, `2` |
| 21 | `Q2r2` | decimal | 🟢 | `1`, `2` |
| 22 | `Q2r3` | decimal | 🟢 | `1`, `2` |
| 23 | `Q2r4` | decimal | 🟢 | `1`, `3` |
| 24 | `Q2r5` | decimal | 🟢 | `1`, `3`, `2` |
| 25 | `Q2r6` | decimal | 🟢 | `4`, `1`, `3` |
| 26 | `Q2r7` | decimal | 🟢 | `1`, `3`, `2` |
| 27 | `Q2r8` | decimal | 🟢 | `1`, `3`, `4` |
| 28 | `FOY1` | decimal | 🟡 | `4`, `3`, `2` |
| 29 | `FOY1_r1` | decimal | 🟢 | `0` |
| 30 | `FOY1_r99` | decimal | 🟢 | `0` |
| 31 | `APPAR1` | decimal | ⚪ | `0` |
| 32 | `APP1_r97` | decimal | ⚪ | `1`, `0` |
| 33 | `APP1_r99` | decimal | ⚪ | `0` |
| 34 | `ENFAN` | decimal | ⚪ | `4`, `1` |
| 35 | `CHARGE` | decimal | ⚪ | `2` |
| 36 | `CHAR_r0` | decimal | ⚪ | `0` |
| 37 | `CHAR_r99` | decimal | ⚪ | `0` |
| 38 | `Q3r1` | decimal | ⚪ | `1969` |
| 39 | `Q4` | decimal | ⚪ | `1` |
| 40 | `Q5` | decimal | ⚪ | `2` |
| 41 | `Q5O` | decimal | ⚪ | `1975` |
| 42 | `Q6` | decimal | ⚪ | `2` |
| 43 | `Q7` | decimal | ⚪ | _vide_ |
| 44 | `Q7O` | decimal | ⚪ | _vide_ |
| 45 | `OCCUP` | decimal | ⚪ | `3`, `7`, `11` |
| 46 | `Q10` | decimal | ⚪ | _vide_ |
| 47 | `Q11` | decimal | ⚪ | _vide_ |
| 48 | `Q13` | decimal | ⚪ | `1` |
| 49 | `Q14` | decimal | ⚪ | `2` |
| 50 | `Q15r1` | decimal | ⚪ | `38`, `35` |
| 51 | `Q16` | decimal | ⚪ | `1` |
| 52 | `Q17r1` | decimal | ⚪ | `1`, `0` |
| 53 | `Q17r2` | decimal | ⚪ | `1`, `0` |
| 54 | `Q17r3` | decimal | ⚪ | `1`, `0` |
| 55 | `Q17r4` | decimal | ⚪ | `1`, `0` |
| 56 | `Q17r5` | decimal | ⚪ | `0`, `1` |
| 57 | `Q17r6` | decimal | ⚪ | `0`, `1` |
| 58 | `Q17r97` | decimal | ⚪ | `0` |
| 59 | `Q17r98` | decimal | ⚪ | `0` |
| 60 | `Q17r99` | decimal | ⚪ | `0` |
| 61 | `Q18Ar1` | decimal | ⚪ | `0` |
| 62 | `Q18Ar2` | decimal | ⚪ | `0` |
| 63 | `Q18Ar3` | decimal | ⚪ | `0` |
| 64 | `Q18Ar4` | decimal | ⚪ | `0` |
| 65 | `Q18Ar5` | decimal | ⚪ | `0`, `1` |
| 66 | `Q18Ar6` | decimal | ⚪ | `0` |
| 67 | `Q18Ar96` | decimal | ⚪ | `0` |
| 68 | `Q18Ar97` | decimal | ⚪ | `1`, `0` |
| 69 | `Q18Ar98` | decimal | ⚪ | `0` |
| 70 | `Q18Ar99` | decimal | ⚪ | `0` |
| 71 | `Q18B` | decimal | ⚪ | `2` |
| 72 | `REVEN` | decimal | ⚪ | `5`, `4`, `6` |
| 73 | `REVEN2` | decimal | ⚪ | `5`, `3`, `2` |
| 74 | `Q19` | decimal | ⚪ | `1979` |
| 75 | `Q19_r0` | decimal | ⚪ | `0` |
| 76 | `Q20r1` | decimal | ⚪ | `1` |
| 77 | `Q20r2` | decimal | ⚪ | `1` |
| 78 | `Q20r3` | decimal | ⚪ | `0` |
| 79 | `Q20r4` | decimal | ⚪ | `0` |
| 80 | `Q20r5` | decimal | ⚪ | `0` |
| 81 | `Q20r6` | decimal | ⚪ | `0` |
| 82 | `Q20r7` | decimal | ⚪ | `0` |
| 83 | `Q20r8` | decimal | ⚪ | `1` |
| 84 | `Q20r9` | decimal | ⚪ | `0` |
| 85 | `Q20r96` | decimal | ⚪ | `0` |
| 86 | `Q20r97` | decimal | ⚪ | `0` |
| 87 | `Q20r98` | decimal | ⚪ | `0` |
| 88 | `Q20r99` | decimal | ⚪ | `0` |
| 89 | `Q21` | decimal | ⚪ | `2` |
| 90 | `Q22r1` | decimal | ⚪ | `0`, `1` |
| 91 | `Q22r2` | decimal | ⚪ | `0` |
| 92 | `Q22r3` | decimal | ⚪ | `1`, `0` |
| 93 | `Q22r4` | decimal | ⚪ | `0` |
| 94 | `Q22r5` | decimal | ⚪ | `0` |
| 95 | `Q22r6` | decimal | ⚪ | `0`, `1` |
| 96 | `Q22r7` | decimal | ⚪ | `0`, `1` |
| 97 | `Q22r8` | decimal | ⚪ | `0` |
| 98 | `Q22r96` | decimal | ⚪ | `0`, `1` |
| 99 | `Q22r97` | decimal | ⚪ | `0` |
| 100 | `Q22r98` | decimal | ⚪ | `0` |
| 101 | `Q22r99` | decimal | ⚪ | `0` |
| 102 | `Q23r1` | decimal | ⚪ | `0`, `1` |
| 103 | `Q23r2` | decimal | ⚪ | `0`, `1` |
| 104 | `Q23r3` | decimal | ⚪ | `0` |
| 105 | `Q23r4` | decimal | ⚪ | `0`, `1` |
| 106 | `Q23r5` | decimal | ⚪ | `0`, `1` |
| 107 | `Q23r6` | decimal | ⚪ | `0` |
| 108 | `Q23r7` | decimal | ⚪ | `0` |
| 109 | `Q23r8` | decimal | ⚪ | `0` |
| 110 | `Q23r9` | decimal | ⚪ | `0` |
| 111 | `Q23r96` | decimal | ⚪ | `0` |
| 112 | `Q23r97` | decimal | ⚪ | `1`, `0` |
| 113 | `Q23r98` | decimal | ⚪ | `0` |
| 114 | `Q23r99` | decimal | ⚪ | `0` |
| 115 | `Q24r1` | decimal | ⚪ | _vide_ |
| 116 | `Q24r2` | decimal | ⚪ | _vide_ |
| 117 | `Q24r3` | decimal | ⚪ | _vide_ |
| 118 | `Q24r4` | decimal | ⚪ | _vide_ |
| 119 | `Q24r5` | decimal | ⚪ | _vide_ |
| 120 | `Q24r6` | decimal | ⚪ | _vide_ |
| 121 | `Q24r7` | decimal | ⚪ | _vide_ |
| 122 | `Q24r8` | decimal | ⚪ | _vide_ |
| 123 | `Q24r96` | decimal | ⚪ | _vide_ |
| 124 | `Q24r97` | decimal | ⚪ | _vide_ |
| 125 | `Q24r98` | decimal | ⚪ | _vide_ |
| 126 | `Q24r99` | decimal | ⚪ | _vide_ |
| 127 | `Q25` | decimal | ⚪ | `1`, `2` |
| 128 | `Q26` | decimal | ⚪ | `1`, `2` |
| 129 | `Q27` | decimal | ⚪ | `1`, `2` |
| 130 | `PROP` | decimal | ⚪ | `1`, `2` |
| 131 | `Q28` | decimal | ⚪ | `96`, `4`, `6` |
| 132 | `Q29` | decimal | ⚪ | `1`, `2` |
| 133 | `Q30` | decimal | ⚪ | `4` |
| 134 | `Q31r1` | decimal | ⚪ | `800`, `750`, `1600` |
| 135 | `Q31_r0` | decimal | ⚪ | `0`, `1` |
| 136 | `Q32` | decimal | ⚪ | `1`, `2` |
| 137 | `Q33r1` | decimal | ⚪ | `0` |
| 138 | `Q33r2` | decimal | ⚪ | `0` |
| 139 | `Q33r3` | decimal | ⚪ | `1`, `0` |
| 140 | `Q33r4` | decimal | ⚪ | `1`, `0` |
| 141 | `Q33r5` | decimal | ⚪ | `0` |
| 142 | `Q33r6` | decimal | ⚪ | `0` |
| 143 | `Q33r97` | decimal | ⚪ | `0`, `1` |
| 144 | `Q34r1` | decimal | ⚪ | `1`, `3`, `2` |
| 145 | `Q34_r0` | decimal | ⚪ | `0` |
| 146 | `Q35r1` | decimal | ⚪ | `4`, `3`, `2` |
| 147 | `Q35r2` | decimal | ⚪ | `1`, `2` |
| 148 | `Q35r3` | decimal | ⚪ | `1`, `3`, `4` |
| 149 | `Q35r4` | decimal | ⚪ | `1`, `3`, `2` |
| 150 | `Q35r5` | decimal | ⚪ | `4`, `3`, `2` |
| 151 | `Q35r6` | decimal | ⚪ | `1`, `3`, `2` |
| 152 | `Q36r1` | decimal | ⚪ | `0`, `1` |
| 153 | `Q36r2` | decimal | ⚪ | `0`, `1` |
| 154 | `Q36r3` | decimal | ⚪ | `0` |
| 155 | `Q36r4` | decimal | ⚪ | `0` |
| 156 | `Q36r5` | decimal | ⚪ | `0` |
| 157 | `Q36r6` | decimal | ⚪ | `0` |
| 158 | `Q36r7` | decimal | ⚪ | `0`, `1` |
| 159 | `Q36r8` | decimal | ⚪ | `0`, `1` |
| 160 | `Q36r96` | decimal | ⚪ | `0` |
| 161 | `Q36r97` | decimal | ⚪ | `1`, `0` |
| 162 | `Q36r98` | decimal | ⚪ | `0` |
| 163 | `Q36r99` | decimal | ⚪ | `0` |
| 164 | `Q37` | decimal | ⚪ | `1`, `8`, `2` |
| 165 | `Q38r1` | decimal | ⚪ | `0` |
| 166 | `Q38r2` | decimal | ⚪ | `0` |
| 167 | `Q38r3` | decimal | ⚪ | `0` |
| 168 | `Q38r4` | decimal | ⚪ | `0` |
| 169 | `Q38r5` | decimal | ⚪ | `1` |
| 170 | `Q38r6` | decimal | ⚪ | `0` |
| 171 | `Q38r7` | decimal | ⚪ | `1` |
| 172 | `Q38r8` | decimal | ⚪ | `0` |
| 173 | `Q38r9` | decimal | ⚪ | `0` |
| 174 | `Q38r96` | decimal | ⚪ | `0` |
| 175 | `Q38r98` | decimal | ⚪ | `0` |
| 176 | `Q38r99` | decimal | ⚪ | `0` |
| 177 | `Q39r1` | decimal | ⚪ | `50`, `20`, `7` |
| 178 | `Q39_r0` | decimal | ⚪ | `0` |
| 179 | `Q40r1` | decimal | ⚪ | `2` |
| 180 | `Q40_r0` | decimal | ⚪ | `0` |
| 181 | `Q41` | decimal | ⚪ | `1`, `8`, `2` |
| 182 | `Q42` | decimal | ⚪ | `1`, `2` |
| 183 | `Q43` | decimal | ⚪ | `1`, `2` |
| 184 | `Q44` | decimal | ⚪ | `1`, `8`, `2` |
| 185 | `Q45` | decimal | ⚪ | `4`, `1`, `2` |
| 186 | `Q46` | decimal | ⚪ | `4`, `3`, `2` |
| 187 | `Q47` | decimal | ⚪ | `1`, `4`, `2` |
| 188 | `Q47B` | decimal | ⚪ | `4`, `1`, `2` |
| 189 | `Q48` | decimal | ⚪ | `1`, `2` |
| 190 | `Q49r1` | decimal | ⚪ | `0` |
| 191 | `Q49r2` | decimal | ⚪ | `0`, `1` |
| 192 | `Q49r3` | decimal | ⚪ | `0` |
| 193 | `Q49r4` | decimal | ⚪ | `0`, `1` |
| 194 | `Q49r97` | decimal | ⚪ | `1`, `0` |
| 195 | `Q49r98` | decimal | ⚪ | `0` |
| 196 | `Q49r99` | decimal | ⚪ | `0` |
| 197 | `Q50r1` | decimal | ⚪ | `1`, `0` |
| 198 | `Q50r2` | decimal | ⚪ | `0` |
| 199 | `Q50r3` | decimal | ⚪ | `0`, `1` |
| 200 | `Q50r4` | decimal | ⚪ | `0` |
| 201 | `Q50r96` | decimal | ⚪ | `0` |
| 202 | `Q50r97` | decimal | ⚪ | `0`, `1` |
| 203 | `Q50r98` | decimal | ⚪ | `0`, `1` |
| 204 | `Q50r99` | decimal | ⚪ | `0` |
| 205 | `Q51A` | decimal | ⚪ | `4`, `1`, `2` |
| 206 | `Q51Br2` | decimal | ⚪ | `0`, `1` |
| 207 | `Q51Br3` | decimal | ⚪ | `0`, `1` |
| 208 | `Q51Br4` | decimal | ⚪ | `0`, `1` |
| 209 | `Q51Br5` | decimal | ⚪ | `0`, `1` |
| 210 | `Q51Br6` | decimal | ⚪ | `0`, `1` |
| 211 | `Q51Br96` | decimal | ⚪ | `0` |
| 212 | `Q51Br97` | decimal | ⚪ | `1`, `0` |
| 213 | `Q51Br98` | decimal | ⚪ | `0` |
| 214 | `Q51Br99` | decimal | ⚪ | `0` |
| 215 | `Q52r1` | decimal | ⚪ | `1`, `2` |
| 216 | `Q52r2` | decimal | ⚪ | `1`, `2` |
| 217 | `Q52r3` | decimal | ⚪ | `2` |
| 218 | `Q52r4` | decimal | ⚪ | `1`, `2` |
| 219 | `Q52r5` | decimal | ⚪ | `2` |
| 220 | `Q52r6` | decimal | ⚪ | `1`, `2` |
| 221 | `Q52r7` | decimal | ⚪ | `1`, `2` |
| 222 | `Q52r8` | decimal | ⚪ | `1`, `2` |
| 223 | `Q52r9` | decimal | ⚪ | `1`, `2` |
| 224 | `Q52r96` | decimal | ⚪ | `8`, `2` |
| 225 | `Q53r1` | decimal | ⚪ | `1`, `0` |
| 226 | `Q53r2` | decimal | ⚪ | `1`, `0` |
| 227 | `Q53r3` | decimal | ⚪ | `1` |
| 228 | `Q53r4` | decimal | ⚪ | `0` |
| 229 | `Q53r5` | decimal | ⚪ | `0` |
| 230 | `Q53r6` | decimal | ⚪ | `0` |
| 231 | `Q53r7` | decimal | ⚪ | `1`, `0` |
| 232 | `Q53r8` | decimal | ⚪ | `1`, `0` |
| 233 | `Q53r96` | decimal | ⚪ | `0` |
| 234 | `Q53r98` | decimal | ⚪ | `0` |
| 235 | `Q53r99` | decimal | ⚪ | `0` |
| 236 | `Q54r1` | decimal | ⚪ | `1`, `3` |
| 237 | `Q54r2` | decimal | ⚪ | _vide_ |
| 238 | `Q54r3` | decimal | ⚪ | `1`, `3`, `2` |
| 239 | `Q54r4` | decimal | ⚪ | _vide_ |
| 240 | `Q54r5` | decimal | ⚪ | `3` |
| 241 | `Q54r6` | decimal | ⚪ | `1`, `2` |
| 242 | `Q54r96` | decimal | ⚪ | _vide_ |
| 243 | `Q54_r98` | decimal | ⚪ | `0` |
| 244 | `Q54_r99` | decimal | ⚪ | `0` |
| 245 | `Q54Top1` | decimal | ⚪ | `1`, `3`, `6` |
| 246 | `Q55r1` | decimal | ⚪ | `1`, `2` |
| 247 | `Q55r2` | decimal | ⚪ | `2` |
| 248 | `Q55r3` | decimal | ⚪ | `2` |
| 249 | `Q56` | decimal | ⚪ | `75`, `65`, `30` |
| 250 | `Q56_r0` | decimal | ⚪ | `0` |
| 251 | `Q57r1` | decimal | ⚪ | `0` |
| 252 | `Q57r2` | decimal | ⚪ | `0` |
| 253 | `Q57r3` | decimal | ⚪ | `0` |
| 254 | `Q57r4` | decimal | ⚪ | `0` |
| 255 | `Q57r5` | decimal | ⚪ | `0` |
| 256 | `Q57r6` | decimal | ⚪ | `0` |
| 257 | `Q57r7` | decimal | ⚪ | `1` |
| 258 | `Q57r8` | decimal | ⚪ | `0` |
| 259 | `Q57r9` | decimal | ⚪ | `0` |
| 260 | `Q57r10` | decimal | ⚪ | `0` |
| 261 | `Q57r96` | decimal | ⚪ | `0` |
| 262 | `Q57r98` | decimal | ⚪ | `0` |
| 263 | `Q57r99` | decimal | ⚪ | `0` |
| 264 | `Q58r1` | decimal | ⚪ | `1`, `0` |
| 265 | `Q58r2` | decimal | ⚪ | `1`, `0` |
| 266 | `Q58r3` | decimal | ⚪ | `1`, `0` |
| 267 | `Q58r4` | decimal | ⚪ | `0`, `1` |
| 268 | `Q58r5` | decimal | ⚪ | `1`, `0` |
| 269 | `Q58r6` | decimal | ⚪ | `0`, `1` |
| 270 | `Q58r96` | decimal | ⚪ | `0` |
| 271 | `Q58r98` | decimal | ⚪ | `0` |
| 272 | `Q58r99` | decimal | ⚪ | `0` |
| 273 | `Q58X` | decimal | ⚪ | `97`, `4`, `2` |
| 274 | `Q59r1` | decimal | ⚪ | `0` |
| 275 | `Q59r2` | decimal | ⚪ | `1`, `0` |
| 276 | `Q59r3` | decimal | ⚪ | `0` |
| 277 | `Q59r4` | decimal | ⚪ | `0` |
| 278 | `Q59r5` | decimal | ⚪ | `0` |
| 279 | `Q59r6` | decimal | ⚪ | `0`, `1` |
| 280 | `Q59r7` | decimal | ⚪ | `0` |
| 281 | `Q59r8` | decimal | ⚪ | `0` |
| 282 | `Q59r9` | decimal | ⚪ | `0` |
| 283 | `Q59r10` | decimal | ⚪ | `0` |
| 284 | `Q59r11` | decimal | ⚪ | `0` |
| 285 | `Q59r12` | decimal | ⚪ | `0` |
| 286 | `Q60` | decimal | ⚪ | `97`, `4`, `2` |
| 287 | `Q61r1` | decimal | ⚪ | `1`, `0` |
| 288 | `Q61r2` | decimal | ⚪ | `0` |
| 289 | `Q61r3` | decimal | ⚪ | `0` |
| 290 | `Q61r4` | decimal | ⚪ | `1`, `0` |
| 291 | `Q61r5` | decimal | ⚪ | `0` |
| 292 | `Q61r6` | decimal | ⚪ | `0`, `1` |
| 293 | `Q61r7` | decimal | ⚪ | `0` |
| 294 | `Q61r8` | decimal | ⚪ | `0`, `1` |
| 295 | `Q61r9` | decimal | ⚪ | `0` |
| 296 | `Q61r10` | decimal | ⚪ | `0` |
| 297 | `Q61r96` | decimal | ⚪ | `0` |
| 298 | `Q61r98` | decimal | ⚪ | `0` |
| 299 | `Q61r99` | decimal | ⚪ | `0` |
| 300 | `Q62` | decimal | ⚪ | `1`, `8`, `2` |
| 301 | `Q63` | decimal | ⚪ | `1` |
| 302 | `Q64` | decimal | ⚪ | `3`, `2` |
| 303 | `Q65r1` | decimal | ⚪ | `0` |
| 304 | `Q65r2` | decimal | ⚪ | `0` |
| 305 | `Q65r3` | decimal | ⚪ | `0` |
| 306 | `Q65r4` | decimal | ⚪ | `0` |
| 307 | `Q65r5` | decimal | ⚪ | `0` |
| 308 | `Q65r6` | decimal | ⚪ | `0` |
| 309 | `Q65r7` | decimal | ⚪ | `0` |
| 310 | `Q65r8` | decimal | ⚪ | `0` |
| 311 | `Q65r9` | decimal | ⚪ | `0` |
| 312 | `Q65r10` | decimal | ⚪ | `0` |
| 313 | `Q65r11` | decimal | ⚪ | `1` |
| 314 | `Q65r98` | decimal | ⚪ | `0` |
| 315 | `Q65r99` | decimal | ⚪ | `0` |
| 316 | `Q66` | decimal | ⚪ | `1`, `2` |
| 317 | `Q67` | decimal | ⚪ | `2` |
| 318 | `Q68r1` | decimal | ⚪ | _vide_ |
| 319 | `Q68r2` | decimal | ⚪ | _vide_ |
| 320 | `Q68r3` | decimal | ⚪ | _vide_ |
| 321 | `Q68r4` | decimal | ⚪ | _vide_ |
| 322 | `Q68r5` | decimal | ⚪ | _vide_ |
| 323 | `Q68r6` | decimal | ⚪ | _vide_ |
| 324 | `Q68r7` | decimal | ⚪ | _vide_ |
| 325 | `Q68r8` | decimal | ⚪ | _vide_ |
| 326 | `Q68r9` | decimal | ⚪ | _vide_ |
| 327 | `Q68r10` | decimal | ⚪ | _vide_ |
| 328 | `Q68r11` | decimal | ⚪ | _vide_ |
| 329 | `Q68r98` | decimal | ⚪ | _vide_ |
| 330 | `Q68r99` | decimal | ⚪ | _vide_ |
| 331 | `Q69` | decimal | ⚪ | `1`, `2` |
| 332 | `Q70` | decimal | ⚪ | `1`, `2` |
| 333 | `Q71r1` | decimal | ⚪ | _vide_ |
| 334 | `Q71r2` | decimal | ⚪ | _vide_ |
| 335 | `Q71r3` | decimal | ⚪ | _vide_ |
| 336 | `Q71r4` | decimal | ⚪ | _vide_ |
| 337 | `Q71r5` | decimal | ⚪ | _vide_ |
| 338 | `Q71r6` | decimal | ⚪ | _vide_ |
| 339 | `Q71r7` | decimal | ⚪ | _vide_ |
| 340 | `Q71r8` | decimal | ⚪ | _vide_ |
| 341 | `Q71r9` | decimal | ⚪ | _vide_ |
| 342 | `Q71r10` | decimal | ⚪ | _vide_ |
| 343 | `Q71r11` | decimal | ⚪ | _vide_ |
| 344 | `Q71r98` | decimal | ⚪ | _vide_ |
| 345 | `Q71r99` | decimal | ⚪ | _vide_ |
| 346 | `Q72` | decimal | ⚪ | `1`, `2` |
| 347 | `Q73` | decimal | ⚪ | `1`, `2` |
| 348 | `Q74` | decimal | ⚪ | `1`, `2` |
| 349 | `Q75` | decimal | ⚪ | `1`, `2` |
| 350 | `Q76r1` | decimal | ⚪ | `1`, `0` |
| 351 | `Q76r2` | decimal | ⚪ | `0`, `1` |
| 352 | `Q76r3` | decimal | ⚪ | `0`, `1` |
| 353 | `Q76r4` | decimal | ⚪ | `0`, `1` |
| 354 | `Q76r5` | decimal | ⚪ | `0`, `1` |
| 355 | `Q76r6` | decimal | ⚪ | `1`, `0` |
| 356 | `Q76r7` | decimal | ⚪ | `0`, `1` |
| 357 | `Q76r96` | decimal | ⚪ | `0` |
| 358 | `Q76r98` | decimal | ⚪ | `0` |
| 359 | `Q76r99` | decimal | ⚪ | `0` |
| 360 | `Q77` | decimal | ⚪ | `1`, `2` |
| 361 | `weight` | decimal | ⚪ | `0.53`, `0.48`, `1.89` |

#### Ressource: Description des variables 2020 (CSV)

- **Resource ID**: `05e2c30e-c388-4fd4-b16a-1de911acf23c`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 960
- **Nombre de champs**: 4

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `champ` | text | 🟢 | `sexe`, `record`, `date` |
| 2 | `description_question` | text | 🟢 | `identifiant unique du répondant`, `sexe: Vous identifiez-vous comme:`, `date` |
| 3 | `variable_reponse` | text | 🟢 | `1`, `6`, `2` |
| 4 | `description_reponse` | text | 🟢 | `identifiant unique du répondant`, `date`, `Un homme` |

---

### Étude sur les barrières d'accès à l'entrepreneuriat chez les populations vulnérables

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-etude-barrieres-entrepreneuriat-populations-vulnerables` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-etude-barrieres-entrepreneuriat-populations-vulnerables` |
| **Fréquence de mise à jour** | notPlanned |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Aide, Entrepreneur, Levier, Outil, Ressource, SDÉ, Vulnérabilité |

**Description**: Résultats d'une étude menée en 2021 par la Ville de Montréal sur l'accès aux services entrepreneuriaux pour les populations vulnérables. Ce sondage visait à 1) identifier les principales barrières d’accès à l’entrepreneuriat sur l’île de Montréal, 2) dresser le portrait des entrepreneurs selon leur niveau potentiel de vulnérabilité à accéder aux outils, services et ressources d’aide disponibles et 3) identifier les principaux leviers d’accès à l’entrepreneuriat.

**Formats disponibles**: CSV

#### Ressource: Barrières d'accès à l'entrepreneuriat (version courte) (CSV)

- **Resource ID**: `00ce9d7b-90ba-4eb1-8e64-feca737784aa`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,443
- **Nombre de champs**: 38

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `record` | decimal | 🟢 | `50`, `46`, `48` |
| 2 | `SEXE` | decimal | 🟢 | `1`, `2` |
| 3 | `AGE` | decimal | 🟢 | `1`, `3`, `10` |
| 4 | `LANGU` | decimal | 🟢 | `4`, `7`, `2` |
| 5 | `Q0QC` | decimal | 🟢 | `6` |
| 6 | `Q0QCP` | decimal | 🟢 | `7`, `18`, `2` |
| 7 | `Q1Ar1` | decimal | 🟢 | `0`, `1` |
| 8 | `Q1Ar2` | decimal | 🟢 | `1`, `0` |
| 9 | `Q1Ar3` | decimal | 🟢 | `0`, `1` |
| 10 | `Q1Ar4` | decimal | 🟢 | `1`, `0` |
| 11 | `Q1Ar5` | decimal | 🟢 | `0`, `1` |
| 12 | `Q1Ar6` | decimal | 🟢 | `0` |
| 13 | `Q1Ar7` | decimal | 🟢 | `0` |
| 14 | `Q1Ar8` | decimal | 🟢 | `0` |
| 15 | `Q1Ar9` | decimal | 🟢 | `0` |
| 16 | `Q1Ar96` | decimal | 🟢 | `0` |
| 17 | `Q1C` | decimal | 🟢 | `1`, `3`, `2` |
| 18 | `Q1B` | decimal | 🟠 | `1`, `98`, `2` |
| 19 | `Q2` | decimal | 🟢 | `5`, `3` |
| 20 | `Q3` | decimal | 🟢 | `1`, `2` |
| 21 | `Q4r1` | decimal | 🟢 | `5`, `4`, `3` |
| 22 | `Q4r2` | decimal | 🟢 | `5`, `4`, `3` |
| 23 | `Q5` | decimal | 🟢 | `5`, `7` |
| 24 | `Q6` | decimal | 🟢 | `9`, `8`, `11` |
| 25 | `Q7` | decimal | 🟢 | `1`, `2` |
| 26 | `Q8r1` | decimal | 🟢 | `4`, `3` |
| 27 | `Q8r2` | decimal | 🟢 | `4`, `3` |
| 28 | `Q8r3` | decimal | 🟢 | `4`, `3`, `2` |
| 29 | `Q8r4` | decimal | 🟢 | `4`, `3`, `2` |
| 30 | `Q9r1` | decimal | 🟢 | `1`, `2` |
| 31 | `Q9r2` | decimal | ⚪ | `1`, `2` |
| 32 | `Q9r3` | decimal | ⚪ | `1`, `2` |
| 33 | `Q9r4` | decimal | ⚪ | `1`, `2` |
| 34 | `Q9r5` | decimal | ⚪ | `1`, `2` |
| 35 | `Q9r6` | decimal | ⚪ | `1`, `2` |
| 36 | `Q10` | decimal | ⚪ | `1`, `2` |
| 37 | `N_BARRIERES` | decimal | ⚪ | `5`, `1`, `2` |
| 38 | `pond` | decimal | ⚪ | `1.1766`, `1.41986`, `3.26386` |

#### Ressource: Barrières d'accès à l'entrepreneuriat (version longue) (CSV)

- **Resource ID**: `7a84331f-8b5d-41dd-8e53-0bf92ab675e7`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 906
- **Nombre de champs**: 237

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `record` | decimal | 🟢 | `50`, `51`, `54` |
| 2 | `SEXE` | decimal | 🟢 | `1`, `2` |
| 3 | `AGE` | decimal | 🟢 | `1`, `13`, `4` |
| 4 | `LANGU` | decimal | 🟢 | `1`, `7` |
| 5 | `Q0QC` | decimal | 🟢 | `6` |
| 6 | `Q0QCP` | decimal | 🟢 | `30`, `6`, `18` |
| 7 | `Q1Ar1` | decimal | 🟢 | `1`, `0` |
| 8 | `Q1Ar2` | decimal | 🟢 | `0` |
| 9 | `Q1Ar3` | decimal | 🟢 | `1`, `0` |
| 10 | `Q1Ar4` | decimal | 🟢 | `0`, `1` |
| 11 | `Q1Ar5` | decimal | 🟢 | `0`, `1` |
| 12 | `Q1Ar6` | decimal | 🟢 | `0` |
| 13 | `Q1Ar7` | decimal | 🟢 | `0` |
| 14 | `Q1Ar8` | decimal | 🟢 | `0` |
| 15 | `Q1Ar9` | decimal | 🟢 | `0`, `1` |
| 16 | `Q1Ar96` | decimal | 🟢 | `0` |
| 17 | `Q1C` | decimal | 🟢 | `1`, `3`, `2` |
| 18 | `Q1B` | decimal | 🟠 | `1`, `2` |
| 19 | `Q2` | decimal | 🟢 | `5`, `3`, `2` |
| 20 | `Q3` | decimal | 🟢 | `1`, `2` |
| 21 | `Q4r1` | decimal | 🟢 | `5`, `3` |
| 22 | `Q4r2` | decimal | 🟢 | `5`, `4`, `3` |
| 23 | `Q5` | decimal | 🟢 | `5`, `3`, `7` |
| 24 | `Q6` | decimal | 🟢 | `7`, `6`, `8` |
| 25 | `Q7` | decimal | 🟢 | `1`, `4`, `2` |
| 26 | `Q8r1` | decimal | 🟢 | `4`, `1`, `3` |
| 27 | `Q8r2` | decimal | 🟢 | `1`, `3`, `4` |
| 28 | `Q8r3` | decimal | 🟢 | `4`, `2` |
| 29 | `Q8r4` | decimal | 🟢 | `1`, `3`, `2` |
| 30 | `Q9r1` | decimal | 🟢 | `1`, `2` |
| 31 | `Q9r2` | decimal | ⚪ | `2` |
| 32 | `Q9r3` | decimal | ⚪ | `2` |
| 33 | `Q9r4` | decimal | ⚪ | `1`, `2` |
| 34 | `Q9r5` | decimal | ⚪ | `1`, `2` |
| 35 | `Q9r6` | decimal | ⚪ | `1`, `2` |
| 36 | `Q10` | decimal | ⚪ | `1`, `2` |
| 37 | `N_BARRIERES` | decimal | ⚪ | `5`, `4`, `10` |
| 38 | `Q11` | decimal | ⚪ | `1`, `3`, `2` |
| 39 | `Q12r1` | decimal | ⚪ | `0`, `1` |
| 40 | `Q12r2` | decimal | ⚪ | `0` |
| 41 | `Q12r3` | decimal | ⚪ | `0` |
| 42 | `Q12r4` | decimal | ⚪ | `1`, `0` |
| 43 | `Q12r5` | decimal | ⚪ | `0` |
| 44 | `Q12r6` | decimal | ⚪ | `0` |
| 45 | `Q12r7` | decimal | ⚪ | `0` |
| 46 | `Q12r8` | decimal | ⚪ | `0` |
| 47 | `Q12r9` | decimal | ⚪ | `0` |
| 48 | `Q12r10` | decimal | ⚪ | `0`, `1` |
| 49 | `Q12r11` | decimal | ⚪ | `0` |
| 50 | `Q12r12` | decimal | ⚪ | `0` |
| 51 | `Q12r13` | decimal | ⚪ | `0` |
| 52 | `Q12r14` | decimal | ⚪ | `0` |
| 53 | `Q12r15` | decimal | ⚪ | `0`, `1` |
| 54 | `Q12r16` | decimal | ⚪ | `0` |
| 55 | `Q12r17` | decimal | ⚪ | `0` |
| 56 | `Q12r18` | decimal | ⚪ | `0` |
| 57 | `Q12r19` | decimal | ⚪ | `0`, `1` |
| 58 | `Q12r20` | decimal | ⚪ | `0` |
| 59 | `Q12r21` | decimal | ⚪ | `0` |
| 60 | `Q12r22` | decimal | ⚪ | `0` |
| 61 | `Q12r96` | decimal | ⚪ | `0`, `1` |
| 62 | `FOY1` | decimal | ⚪ | `3`, `2` |
| 63 | `FOY2` | decimal | ⚪ | `1` |
| 64 | `Q13` | decimal | ⚪ | `3` |
| 65 | `Q14` | decimal | ⚪ | `1`, `2` |
| 66 | `Q14Br1` | decimal | ⚪ | _vide_ |
| 67 | `Q14Br2` | decimal | ⚪ | _vide_ |
| 68 | `Q14Br3` | decimal | ⚪ | _vide_ |
| 69 | `Q14Br4` | decimal | ⚪ | _vide_ |
| 70 | `Q14Br5` | decimal | ⚪ | _vide_ |
| 71 | `Q14Br6` | decimal | ⚪ | _vide_ |
| 72 | `incapacite_total` | decimal | ⚪ | `0`, `1` |
| 73 | `SEXE_1r5` | decimal | ⚪ | `1`, `0` |
| 74 | `SEXE_1r2` | decimal | ⚪ | `0`, `1` |
| 75 | `SEXE_1r1` | decimal | ⚪ | `0` |
| 76 | `SEXE_1r3` | decimal | ⚪ | `0` |
| 77 | `SEXE_1r4` | decimal | ⚪ | `0` |
| 78 | `SEXE_1r6` | decimal | ⚪ | `0` |
| 79 | `SEXE_1r7` | decimal | ⚪ | `0` |
| 80 | `SEXE_1r8` | decimal | ⚪ | `0` |
| 81 | `SEXE_1r9` | decimal | ⚪ | `0` |
| 82 | `SEXE_1r97` | decimal | ⚪ | `0` |
| 83 | `SEXE_2r8` | decimal | ⚪ | `1`, `0` |
| 84 | `SEXE_2r2` | decimal | ⚪ | `0` |
| 85 | `SEXE_2r1` | decimal | ⚪ | `0` |
| 86 | `SEXE_2r3` | decimal | ⚪ | `0`, `1` |
| 87 | `SEXE_2r4` | decimal | ⚪ | `0` |
| 88 | `SEXE_2r5` | decimal | ⚪ | `0` |
| 89 | `SEXE_2r6` | decimal | ⚪ | `0` |
| 90 | `SEXE_2r7` | decimal | ⚪ | `0` |
| 91 | `SEXE_2r9` | decimal | ⚪ | `0` |
| 92 | `SEXE_2r97` | decimal | ⚪ | `0` |
| 93 | `Q15` | decimal | ⚪ | `5` |
| 94 | `Q16` | decimal | ⚪ | `1` |
| 95 | `Q17` | decimal | ⚪ | `10` |
| 96 | `Q18` | decimal | ⚪ | `1` |
| 97 | `Q19` | decimal | ⚪ | `4` |
| 98 | `Q20r1` | decimal | ⚪ | `0` |
| 99 | `Q20r2` | decimal | ⚪ | `0` |
| 100 | `Q20r3` | decimal | ⚪ | `0` |
| 101 | `Q20r4` | decimal | ⚪ | `0` |
| 102 | `Q20r5` | decimal | ⚪ | `0` |
| 103 | `Q20r6` | decimal | ⚪ | `0` |
| 104 | `Q20r7` | decimal | ⚪ | `0` |
| 105 | `Q20r8` | decimal | ⚪ | `0` |
| 106 | `Q20r9` | decimal | ⚪ | `1` |
| 107 | `Q20r10` | decimal | ⚪ | `0` |
| 108 | `Q20r11` | decimal | ⚪ | `0` |
| 109 | `Q20r12` | decimal | ⚪ | `0` |
| 110 | `Q20r96` | decimal | ⚪ | `0` |
| 111 | `Q21r1` | decimal | ⚪ | `0`, `1` |
| 112 | `Q21r2` | decimal | ⚪ | `0` |
| 113 | `Q21r3` | decimal | ⚪ | `0`, `1` |
| 114 | `Q21r4` | decimal | ⚪ | `0` |
| 115 | `Q21r5` | decimal | ⚪ | `1`, `0` |
| 116 | `Q21r6` | decimal | ⚪ | `0` |
| 117 | `Q21r7` | decimal | ⚪ | `1`, `0` |
| 118 | `Q21r8` | decimal | ⚪ | `0`, `1` |
| 119 | `Q21r9` | decimal | ⚪ | `0` |
| 120 | `Q21r10` | decimal | ⚪ | `1`, `0` |
| 121 | `Q21r11` | decimal | ⚪ | `0`, `1` |
| 122 | `Q21r12` | decimal | ⚪ | `0` |
| 123 | `Q21r96` | decimal | ⚪ | `0` |
| 124 | `Q21Br1` | decimal | ⚪ | `97`, `3`, `2` |
| 125 | `Q21Br2` | decimal | ⚪ | `97`, `3`, `2` |
| 126 | `Q21Br3` | decimal | ⚪ | `97`, `1`, `3` |
| 127 | `Q21Br4` | decimal | ⚪ | `97`, `3` |
| 128 | `Q21Br5` | decimal | ⚪ | `97`, `3`, `2` |
| 129 | `Q21Br6` | decimal | ⚪ | `97`, `3`, `2` |
| 130 | `Q21Br7` | decimal | ⚪ | `97`, `3`, `2` |
| 131 | `Q21Br8` | decimal | ⚪ | `97`, `3` |
| 132 | `Q22` | decimal | ⚪ | `4`, `1`, `3` |
| 133 | `Q23` | decimal | ⚪ | `1`, `2` |
| 134 | `Q24` | decimal | ⚪ | `1` |
| 135 | `Q25r1` | decimal | ⚪ | `0` |
| 136 | `Q25r2` | decimal | ⚪ | `0` |
| 137 | `Q25r3` | decimal | ⚪ | `0` |
| 138 | `Q25r4` | decimal | ⚪ | `0` |
| 139 | `Q25r5` | decimal | ⚪ | `0` |
| 140 | `Q25r6` | decimal | ⚪ | `0` |
| 141 | `Q25r7` | decimal | ⚪ | `0` |
| 142 | `Q25r8` | decimal | ⚪ | `1` |
| 143 | `Q25r9` | decimal | ⚪ | `0` |
| 144 | `Q25r96` | decimal | ⚪ | `0` |
| 145 | `Q25r97` | decimal | ⚪ | `0` |
| 146 | `Q26r1` | decimal | ⚪ | _vide_ |
| 147 | `Q26r2` | decimal | ⚪ | _vide_ |
| 148 | `Q26r3` | decimal | ⚪ | _vide_ |
| 149 | `Q26r4` | decimal | ⚪ | _vide_ |
| 150 | `Q26r5` | decimal | ⚪ | _vide_ |
| 151 | `Q26r6` | decimal | ⚪ | _vide_ |
| 152 | `Q26r7` | decimal | ⚪ | _vide_ |
| 153 | `Q26r8` | decimal | ⚪ | `1` |
| 154 | `Q26r9` | decimal | ⚪ | _vide_ |
| 155 | `Q26r96` | decimal | ⚪ | _vide_ |
| 156 | `Q27_Lr1r1` | decimal | ⚪ | _vide_ |
| 157 | `Q27_Lr1r2` | decimal | ⚪ | _vide_ |
| 158 | `Q27_Lr1r3` | decimal | ⚪ | _vide_ |
| 159 | `Q27_Lr1r4` | decimal | ⚪ | _vide_ |
| 160 | `Q27_Lr1r96` | decimal | ⚪ | _vide_ |
| 161 | `Q27_Lr2r1` | decimal | ⚪ | _vide_ |
| 162 | `Q27_Lr2r2` | decimal | ⚪ | _vide_ |
| 163 | `Q27_Lr2r3` | decimal | ⚪ | _vide_ |
| 164 | `Q27_Lr2r4` | decimal | ⚪ | _vide_ |
| 165 | `Q27_Lr2r96` | decimal | ⚪ | _vide_ |
| 166 | `Q27_Lr3r1` | decimal | ⚪ | _vide_ |
| 167 | `Q27_Lr3r2` | decimal | ⚪ | _vide_ |
| 168 | `Q27_Lr3r3` | decimal | ⚪ | _vide_ |
| 169 | `Q27_Lr3r4` | decimal | ⚪ | _vide_ |
| 170 | `Q27_Lr3r96` | decimal | ⚪ | _vide_ |
| 171 | `Q27_Lr4r1` | decimal | ⚪ | _vide_ |
| 172 | `Q27_Lr4r2` | decimal | ⚪ | _vide_ |
| 173 | `Q27_Lr4r3` | decimal | ⚪ | _vide_ |
| 174 | `Q27_Lr4r4` | decimal | ⚪ | _vide_ |
| 175 | `Q27_Lr4r96` | decimal | ⚪ | _vide_ |
| 176 | `Q27_Lr5r1` | decimal | ⚪ | _vide_ |
| 177 | `Q27_Lr5r2` | decimal | ⚪ | _vide_ |
| 178 | `Q27_Lr5r3` | decimal | ⚪ | _vide_ |
| 179 | `Q27_Lr5r4` | decimal | ⚪ | _vide_ |
| 180 | `Q27_Lr5r96` | decimal | ⚪ | _vide_ |
| 181 | `Q27_Lr6r1` | decimal | ⚪ | _vide_ |
| 182 | `Q27_Lr6r2` | decimal | ⚪ | _vide_ |
| 183 | `Q27_Lr6r3` | decimal | ⚪ | _vide_ |
| 184 | `Q27_Lr6r4` | decimal | ⚪ | _vide_ |
| 185 | `Q27_Lr6r96` | decimal | ⚪ | _vide_ |
| 186 | `Q27_Lr7r1` | decimal | ⚪ | _vide_ |
| 187 | `Q27_Lr7r2` | decimal | ⚪ | _vide_ |
| 188 | `Q27_Lr7r3` | decimal | ⚪ | _vide_ |
| 189 | `Q27_Lr7r4` | decimal | ⚪ | _vide_ |
| 190 | `Q27_Lr7r96` | decimal | ⚪ | _vide_ |
| 191 | `Q27_Lr8r1` | decimal | ⚪ | _vide_ |
| 192 | `Q27_Lr8r2` | decimal | ⚪ | _vide_ |
| 193 | `Q27_Lr8r3` | decimal | ⚪ | _vide_ |
| 194 | `Q27_Lr8r4` | decimal | ⚪ | _vide_ |
| 195 | `Q27_Lr8r96` | decimal | ⚪ | _vide_ |
| 196 | `Q27_Lr9r1` | decimal | ⚪ | _vide_ |
| 197 | `Q27_Lr9r2` | decimal | ⚪ | _vide_ |
| 198 | `Q27_Lr9r3` | decimal | ⚪ | _vide_ |
| 199 | `Q27_Lr9r4` | decimal | ⚪ | _vide_ |
| 200 | `Q27_Lr9r96` | decimal | ⚪ | _vide_ |
| 201 | `Q27_Lr96r1` | decimal | ⚪ | _vide_ |
| 202 | `Q27_Lr96r2` | decimal | ⚪ | _vide_ |
| 203 | `Q27_Lr96r3` | decimal | ⚪ | _vide_ |
| 204 | `Q27_Lr96r4` | decimal | ⚪ | _vide_ |
| 205 | `Q27_Lr96r96` | decimal | ⚪ | _vide_ |
| 206 | `Q28` | decimal | ⚪ | `1`, `2` |
| 207 | `Q29r1` | decimal | ⚪ | `0` |
| 208 | `Q29r2` | decimal | ⚪ | `1`, `0` |
| 209 | `Q29r3` | decimal | ⚪ | `0`, `1` |
| 210 | `Q29r4` | decimal | ⚪ | `0` |
| 211 | `Q29r5` | decimal | ⚪ | `0` |
| 212 | `Q29r6` | decimal | ⚪ | `0`, `1` |
| 213 | `Q29r7` | decimal | ⚪ | _vide_ |
| 214 | `Q29r8` | decimal | ⚪ | _vide_ |
| 215 | `Q29r9` | decimal | ⚪ | _vide_ |
| 216 | `Q29r96` | decimal | ⚪ | `0` |
| 217 | `Q31r1` | decimal | ⚪ | `1`, `3`, `2` |
| 218 | `Q31r2` | decimal | ⚪ | `1`, `3`, `2` |
| 219 | `Q31r3` | decimal | ⚪ | `4`, `3`, `2` |
| 220 | `Q31r4` | decimal | ⚪ | `3`, `2` |
| 221 | `Q31r5` | decimal | ⚪ | `4`, `2` |
| 222 | `Q31r6` | decimal | ⚪ | `4`, `3`, `2` |
| 223 | `Q31r7` | decimal | ⚪ | `1`, `3`, `2` |
| 224 | `Q31r8` | decimal | ⚪ | `1`, `2` |
| 225 | `Q31r9` | decimal | ⚪ | `1`, `3` |
| 226 | `Q32r1` | decimal | ⚪ | `1`, `0` |
| 227 | `Q32r2` | decimal | ⚪ | `0`, `1` |
| 228 | `Q32r3` | decimal | ⚪ | `0`, `1` |
| 229 | `Q32r4` | decimal | ⚪ | `0` |
| 230 | `Q32r5` | decimal | ⚪ | `1`, `0` |
| 231 | `Q32r6` | decimal | ⚪ | `0` |
| 232 | `Q32r7` | decimal | ⚪ | `0` |
| 233 | `Q32r8` | decimal | ⚪ | `1`, `0` |
| 234 | `Q32r9` | decimal | ⚪ | `0` |
| 235 | `Q32r96` | decimal | ⚪ | `0` |
| 236 | `Q32r97` | decimal | ⚪ | `0`, `1` |
| 237 | `pond` | decimal | ⚪ | `0.829273`, `1.300874`, `3.038978` |

#### Ressource: Description des variables (CSV)

- **Resource ID**: `9eecc8e6-b16f-4e9e-9625-6de825c0fe5f`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 675
- **Nombre de champs**: 4

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `champ` | text | 🟢 | `SEXE`, `AGE`, `record` |
| 2 | `description_question` | text | 🟢 | `Quel est votre sexe à la naissance ?`, `Quel âge avez-vous?` |
| 3 | `variable_reponse` | decimal | 🟢 | `1`, `2` |
| 4 | `description_reponse` | text | 🟢 | `Identifiant unique du répondant`, `Masculin`, `Féminin` |

---

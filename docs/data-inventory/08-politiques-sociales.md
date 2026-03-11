# 08. Politiques sociales
# Social Policy

> **Nombre de datasets**: 16
> **Catégorie portail**: `politiques-sociales`
> **Généré le**: 2026-03-09 15:37

---

## Table des matières

1. [Bâtiments certifiés « qualité famille »](#vmtl-batiments-certifies-qualite-famille)
2. [Cartes pour l'application du Règlement pour une métropole mixte](#vmtl-cartes-reglement-metropole-mixte)
3. [Ententes conclues dans le cadre du Règlement pour une métropole mixte](#vmtl-ententes-reglement-metropole-mixte)
4. [Immeubles et terrains assujettis au droit de préemption](#vmtl-immeubles-terrains-assujettis-droit-preemption)
5. [Indice d'équité des milieux de vie](#vmtl-indice-equite-milieux-vie)
6. [Inspections préventives en salubrité du Service de l'habitation](#vmtl-inspections-preventives-salubrite-service-habitation)
7. [Logements hors marché dans l'agglomération de Montréal](#vmtl-logements-sociaux)
8. [Organismes ayant reconnaissance PANAM](#vmtl-reconnaissance-panam)
9. [Programmes et subventions destinés à la population et aux organismes](#vmtl-programmes-subventions-destines-population)
10. [Quartiers de référence en habitation](#vmtl-quartiers)
11. [Quartiers sociologiques](#vmtl-quartiers-sociologiques)
12. [Règlements municipaux](#vmtl-reglements-municipaux)
13. [Résultats du Budget participatif de Montréal](#vmtl-budget-participatif-montreal)
14. [Sondage Écho sur l'inclusion des personnes immigrantes](#vmtl-sondage-inclusion-personnes-immigrantes)
15. [Subventions en habitation destinées aux citoyennes et citoyens](#vmtl-subvention-habitation)
16. [Zone de revitalisation urbaine intégrée (RUI)](#vmtl-rui)

---

## Statistiques de la catégorie

| Métrique | Valeur |
|----------|--------|
| Datasets | 16 |
| Ressources totales | 61 |
| Ressources DataStore (requêtables via API) | 29 |
| Enregistrements totaux (DataStore) | 87,170 |

---

### Bâtiments certifiés « qualité famille »

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-batiments-certifies-qualite-famille` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-batiments-certifies-qualite-famille` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Bâtiment, Certification, Famille, Qualité famille, SDIS, Équipement |

**Description**: Le programme de certification « qualité famille » a été lancé publiquement en mai 2013. La Ville de Montréal compte plus de 230 bâtiments certifiés « qualité famille ». Ceux-ci sont munis d’un ou de plusieurs équipements qui facilitent la vie des familles tels que des tables à langer et des fauteuils de boire et d’allaitement.

**Formats disponibles**: KML, PDF

---

### Cartes pour l'application du Règlement pour une métropole mixte

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-cartes-reglement-metropole-mixte` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-cartes-reglement-metropole-mixte` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Carte, Habitation, Logement, Logement abordable, Logement familial, Logement social, Projet résidentiel, SH |

**Description**: En vertu du Règlement pour une métropole mixte, toute personne qui réalise un projet résidentiel de plus de 450 m² (équivalant à environ 5 logements) doit conclure une entente avec la Ville afin de contribuer à l’offre de logements sociaux, abordables et familiaux.

Pour obtenir de plus amples informations sur le règlement et pour connaître les définitions des types de logement (social, abordable et familial), veuillez vous référer [au site de la Ville de Montréal](https://montreal.ca/articles/metropole-mixte-les-grandes-lignes-du-reglement-7816).

**Formats disponibles**: GEOJSON, SHP, ZIP

---

### Ententes conclues dans le cadre du Règlement pour une métropole mixte

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-ententes-reglement-metropole-mixte` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-ententes-reglement-metropole-mixte` |
| **Fréquence de mise à jour** | weekly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Logement abordable, Logement familial, Logement social, SH |

**Description**: Ensemble de données sur les ententes conclues en vertu du Règlement pour une métropole mixte visant à améliorer l'offre en matière de logement social, abordable et familial (20-041). Depuis le 1er avril 2021, pour tous les permis assujettis, la conclusion d’une entente conforme au Règlement est requise. Ce règlement vise à améliorer l'offre de logement social, abordable et familial dans la métropole.

**Formats disponibles**: CSV, GEOJSON, SHP

#### Ressource: Ententes conclues (CSV)

- **Resource ID**: `1b5a181d-11d4-4491-b3fa-b6e5264a2f47`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 263
- **Nombre de champs**: 24

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `id_entente` | text | 🟢 | `1000005`, `1000514`, `1000577` |
| 2 | `date_signature_sys` | text | 🟢 | `2023-11-24`, `2021-05-20`, `2024-08-24` |
| 3 | `nom_entente` | text | 🟡 | `Pierrefonds`, `8624 Champagneur`, `5495-5497, boul. Henri-Bourassa` |
| 4 | `arrondissement` | text | 🟢 | `Villeray - Saint-Michel - Parc-Extension`, `Anjou`, `Pierrefonds - Roxboro` |
| 5 | `adr_emplacement` | text | 🟠 | `8624, avenue Champagneur, H3N2L2`, `6480, avenue Azilda, H1K2Z9` |
| 6 | `lot` | text | 🟢 | `1843193`, `1111539`, `2247545` |
| 7 | `superf_resid_ajout` | text | 🟢 | `15649`, `881`, `629` |
| 8 | `nb_log_ajout` | text | 🟢 | `161`, `4`, `8` |
| 9 | `contrib_social_fin` | text | 🟢 | `Oui` |
| 10 | `mnt_contrib_social_fin` | text | 🟢 | `17671`, `552893`, `4539` |
| 11 | `contrib_social_tss` | text | 🟢 | `Non` |
| 12 | `superf_resid_social_tss` | text | 🔴 | _vide_ |
| 13 | `prix_achat_tss` | text | 🔴 | _vide_ |
| 14 | `contrib_social_ths` | text | 🟢 | `Non` |
| 15 | `superf_resid_social_prevu_ths` | text | 🔴 | _vide_ |
| 16 | `prix_achat_ths` | text | 🔴 | _vide_ |
| 17 | `contrib_social_cem` | text | 🟢 | `Non` |
| 18 | `contrib_abord_fin` | text | 🟢 | `Oui` |
| 19 | `mnt_contrib_abord_fin` | text | 🟢 | `0` |
| 20 | `real_log_abord_ss` | text | 🟢 | `Non` |
| 21 | `superf_tot_ss_entente` | text | 🔴 | _vide_ |
| 22 | `real_log_abord_hs` | text | 🟢 | `Non` |
| 23 | `superf_tot_hs_entente` | text | 🔴 | _vide_ |
| 24 | `nb_log_famil_scdp` | text | 🟢 | `0` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `superf_tot_hs_entente`: 100.0% null
- `superf_tot_ss_entente`: 99.6% null
- `superf_resid_social_prevu_ths`: 98.9% null
- `prix_achat_ths`: 98.9% null
- `superf_resid_social_tss`: 98.1% null
- `prix_achat_tss`: 98.1% null
- `adr_emplacement`: 55.5% null

---

### Immeubles et terrains assujettis au droit de préemption

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-immeubles-terrains-assujettis-droit-preemption` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-immeubles-terrains-assujettis-droit-preemption` |
| **Fréquence de mise à jour** | monthly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Immeuble, SGPI, Terrain |

**Description**: Inventaire des immeubles et terrains assujettis au droit de préemption. Le droit de préemption permet à la Ville de Montréal d’acheter en priorité sur tout autre acheteur certains immeubles ou terrains afin d’y réaliser des projets au bénéfice de la communauté.

**Formats disponibles**: CSV, GEOJSON, ZIP

#### Ressource: Immeubles et terrains assujettis au droit de préemption (CSV)

- **Resource ID**: `dae5fa74-5ab3-4479-be6f-f4b5e29c0f6d`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 963
- **Nombre de champs**: 10

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `NUMERO_DE_LOT` | text | 🟢 | `3362057`, `3362007`, `3362058` |
| 2 | `ETAT` | text | 🟢 | `Assujetti` |
| 3 | `SERVICE_RESPONSABLE` | text | 🟢 | `Urbanisme` |
| 4 | `ARRONDISSEMENT` | text | 🟢 | `Mercier - Hochelaga-Maisonneuve`, `Plateau-Mont-Royal` |
| 5 | `NUMERO_UEV` | text | 🟢 | `-` |
| 6 | `PUBLICATION_ASSUJ` | text | 🟢 | `24401634`, `24420396`, `24401633` |
| 7 | `LOC_X` | text | 🟢 | `299742.6`, `299851.12`, `299552.73` |
| 8 | `LOC_Y` | text | 🟢 | `5044480.16`, `5044467.73`, `5044513.63` |
| 9 | `LONGITUDE` | text | 🟢 | `-73.56337`, `-73.567192`, `-73.56476` |
| 10 | `LATITUDE` | text | 🟢 | `45.540518`, `45.540218`, `45.540107` |

---

### Indice d'équité des milieux de vie

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-indice-equite-milieux-vie` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-indice-equite-milieux-vie` |
| **Fréquence de mise à jour** | annual |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Indice composite, Milieu de vie, SDIS, Vulnérabilité, Équité territoriale |

**Description**: L'indice d’équité des milieux de vie est un indice territorial qui vise à localiser les milieux de vie cumulant des vulnérabilités urbaines afin de susciter la priorisation et la convergence des investissements municipaux. Cet indice représente les milieux qui cumulent les vulnérabilités sociales, économiques, environnementales, d'accès aux ressources de proximité, d'accès aux ressources de culture, sport et loisir et de sécurité urbaine. Le présent ensemble de données regroupe :

* 23 indicateurs répartis en 6 dimensions de l'équité
* 6 sous-indices représentant les dimensions de l'équité
* l'indice d'équité des milieux de vie

 

__Interagissez avec les données sur la visualisation [Indice d'équité des milieux de vie - 2024](https://services.montreal.ca/indice-equite-milieux-vie).__

**Formats disponibles**: CSV, GEOJSON, PDF, SHP, XLS

#### Ressource: Indice d'équité des milieux de vie, 2024 (CSV)

- **Resource ID**: `0f0f8c6a-b503-4565-9583-d4f21db9e6fe`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,822
- **Nombre de champs**: 41

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `adidu` | text | 🟢 | `24660001`, `24660002`, `24660003` |
| 2 | `arr_ville` | text | 🟢 | `Rivière-des-Prairies-Pointe-aux-Trembles` |
| 3 | `type` | text | 🟢 | `Arrondissement` |
| 4 | `pop2021` | text | 🟢 | `542`, `303`, `651` |
| 5 | `log_priv2021` | text | 🟢 | `130`, `198`, `266` |
| 6 | `mono_pr` | text | 🟢 | `14.7058823529412`, `12.5`, `11.7647058823529` |
| 7 | `imm_recent_pr` | text | 🟢 | `0`, `1.92307692307692` |
| 8 | `autoch_minor_pr` | text | 🟢 | `10.1694915254237`, `11.5384615384615`, `7.6271186440678` |
| 9 | `sans_diplome_pr` | text | 🟢 | `11.864406779661`, `15.1515151515152`, `10.3448275862069` |
| 10 | `pr_men_bil` | text | 🟢 | `0` |
| 11 | `pr_ind_mpc` | text | 🟢 | `0`, `5.1` |
| 12 | `pr_log_autor_axes_ps` | text | 🟢 | `0` |
| 13 | `pr_laeq60pl` | text | 🟢 | `0` |
| 14 | `pr_nocanop` | text | 🟢 | `100`, `24.2424242424242` |
| 15 | `pr_indust300m` | text | 🟢 | `0` |
| 16 | `pr_logchaleur` | text | 🟢 | `0` |
| 17 | `mefaits_pond` | text | 🟢 | `8`, `6`, `10` |
| 18 | `collisions_rt` | text | 🟢 | `1` |
| 19 | `crimes_pond` | text | 🟢 | `16`, `28`, `39` |
| 20 | `nb_commerces_alimentaires_moyenne_ponderee` | text | 🟢 | `0.507518796992481`, `1` |
| 21 | `nb_organismes_communautaires_moyenne_ponderee` | text | 🟢 | `1.46153846153846`, `2.24812030075188`, `3` |
| 22 | `nb_pharmacies_moyenne_ponderee` | text | 🟢 | `1`, `0.740601503759398`, `0.230769230769231` |
| 23 | `nb_ecoles_primaires_moyenne_ponderee` | text | 🟢 | `0.757575757575758`, `0`, `0.233082706766917` |
| 24 | `nb_pass_tc` | text | 🟢 | `257.919191919192`, `209.384615384615`, `217.281954887218` |
| 25 | `nb_emplois_acces_tc_30min` | text | 🟢 | `16825`, `18510`, `18675` |
| 26 | `nb_biblio_lieux_cult_principaux_moy_pond` | text | 🟢 | `0` |
| 27 | `nb_equipement_distinct_moy_pond` | text | 🟢 | `6.59022556390977`, `7.78787878787879`, `2.56153846153846` |
| 28 | `superficie_parc_accessible_moy_pond` | text | 🟢 | `9.19245509278566`, `9.12759763446439`, `8.14383035956054` |
| 29 | `ACP_sociale` | text | 🟢 | `-1.42238142909727`, `-1.37528810904473`, `-1.27988569107875` |
| 30 | `ACP_econo` | text | 🟢 | `-1.71247283903518`, `-1.27528564037273` |
| 31 | `ACP_environn` | text | ⚪ | `-0.533246990878123`, `-0.53324699087889`, `-1.50197428574109` |
| 32 | `ACP_securite` | text | ⚪ | `-1.54776358119888`, `-1.36536346305002`, `-1.45425625104742` |
| 33 | `ACP_proximite` | text | ⚪ | `-1.98522991011735`, `-2.27099549958804`, `-2.42984613025008` |
| 34 | `ACP_CultSportLoisir` | text | ⚪ | `-0.854066986545635`, `-0.641476160868361`, `-1.56124976576043` |
| 35 | `ACP_sociale_2quintiles` | text | ⚪ | `0` |
| 36 | `ACP_econo_2quintiles` | text | ⚪ | `0` |
| 37 | `ACP_enviro_2quintiles` | text | ⚪ | `0` |
| 38 | `ACP_securite_2quintiles` | text | ⚪ | `0` |
| 39 | `ACP_proximite_2quintiles` | text | ⚪ | `1` |
| 40 | `ACP_CultSportLoisir_2quintiles` | text | ⚪ | `1` |
| 41 | `Indice_emv` | text | ⚪ | `2` |

#### Ressource: Indice d'équité des milieux de vie - calcul de l'indice à l'échelle de l'arrondissement, 2024 (CSV)

- **Resource ID**: `78a059c5-ad40-4778-8b3d-85355cc9944d`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,822
- **Nombre de champs**: 41

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `adidu` | text | 🟢 | `24660001`, `24660002`, `24660003` |
| 2 | `arr_ville` | text | 🟢 | `Rivière-des-Prairies-Pointe-aux-Trembles` |
| 3 | `type` | text | 🟢 | `Arrondissement` |
| 4 | `pop2021` | text | 🟢 | `542`, `303`, `651` |
| 5 | `log_priv2021` | text | 🟢 | `130`, `198`, `266` |
| 6 | `mono_pr` | text | 🟢 | `14.7058823529412`, `12.5`, `11.7647058823529` |
| 7 | `imm_recent_pr` | text | 🟢 | `0`, `1.92307692307692` |
| 8 | `autoch_minor_pr` | text | 🟢 | `10.1694915254237`, `11.5384615384615`, `7.6271186440678` |
| 9 | `sans_diplome_pr` | text | 🟢 | `11.864406779661`, `15.1515151515152`, `10.3448275862069` |
| 10 | `pr_men_bil` | text | 🟢 | `0` |
| 11 | `pr_ind_mpc` | text | 🟢 | `0`, `5.1` |
| 12 | `pr_log_autor_axes_ps` | text | 🟢 | `0` |
| 13 | `pr_laeq60pl` | text | 🟢 | `0` |
| 14 | `pr_nocanop` | text | 🟢 | `100`, `24.2424242424242` |
| 15 | `pr_indust300m` | text | 🟢 | `0` |
| 16 | `pr_logchaleur` | text | 🟢 | `0` |
| 17 | `mefaits_pond` | text | 🟢 | `8`, `6`, `10` |
| 18 | `collisions_rt` | text | 🟢 | `1` |
| 19 | `crimes_pond` | text | 🟢 | `16`, `28`, `39` |
| 20 | `nb_commerces_alimentaires_moyenne_ponderee` | text | 🟢 | `0.507518796992481`, `1` |
| 21 | `nb_organismes_communautaires_moyenne_ponderee` | text | 🟢 | `1.46153846153846`, `2.24812030075188`, `3` |
| 22 | `nb_pharmacies_moyenne_ponderee` | text | 🟢 | `1`, `0.740601503759398`, `0.230769230769231` |
| 23 | `nb_ecoles_primaires_moyenne_ponderee` | text | 🟢 | `0.757575757575758`, `0`, `0.233082706766917` |
| 24 | `nb_pass_tc` | text | 🟢 | `257.919191919192`, `209.384615384615`, `217.281954887218` |
| 25 | `nb_emplois_acces_tc_30min` | text | 🟢 | `16825`, `18510`, `18675` |
| 26 | `nb_biblio_lieux_cult_principaux_moy_pond` | text | 🟢 | `0` |
| 27 | `nb_equipement_distinct_moy_pond` | text | 🟢 | `6.59022556390977`, `7.78787878787879`, `2.56153846153846` |
| 28 | `superficie_parc_accessible_moy_pond` | text | 🟢 | `9.19245509278566`, `9.12759763446439`, `8.14383035956054` |
| 29 | `ACP_sociale` | text | 🟢 | `-1.42238142909727`, `-1.37528810904473`, `-1.27988569107875` |
| 30 | `ACP_econo` | text | 🟢 | `-1.71247283903518`, `-1.27528564037273` |
| 31 | `ACP_environn` | text | ⚪ | `-0.533246990878123`, `-0.53324699087889`, `-1.50197428574109` |
| 32 | `ACP_securite` | text | ⚪ | `-1.54776358119888`, `-1.36536346305002`, `-1.45425625104742` |
| 33 | `ACP_proximite` | text | ⚪ | `-1.98522991011735`, `-2.27099549958804`, `-2.42984613025008` |
| 34 | `ACP_CultSportLoisir` | text | ⚪ | `-0.854066986545635`, `-0.641476160868361`, `-1.56124976576043` |
| 35 | `ACP_sociale_2quintiles` | text | ⚪ | `0` |
| 36 | `ACP_econo_2quintiles` | text | ⚪ | `0` |
| 37 | `ACP_enviro_2quintiles` | text | ⚪ | `0` |
| 38 | `ACP_securite_2quintiles` | text | ⚪ | `0`, `1` |
| 39 | `ACP_proximite_2quintiles` | text | ⚪ | `0` |
| 40 | `ACP_CultSportLoisir_2quintiles` | text | ⚪ | `1`, `0` |
| 41 | `Indice_emv` | text | ⚪ | `1`, `0`, `2` |

#### Ressource: Indice d'équité des milieux de vie, 2023 (CSV)

- **Resource ID**: `5ca26973-7df6-472e-9bc0-5213a2445082`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,822
- **Nombre de champs**: 41

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `adidu` | text | 🟢 | `24660001`, `24660002`, `24660003` |
| 2 | `arr_ville` | text | 🟢 | `Rivière-des-Prairies-Pointe-aux-Trembles` |
| 3 | `type` | text | 🟢 | `Arrondissement` |
| 4 | `pop2021` | text | 🟢 | `542`, `303`, `651` |
| 5 | `log_priv2021` | text | 🟢 | `130`, `198`, `266` |
| 6 | `mono_pr` | text | 🟢 | `14.70588235294118`, `12.5`, `11.76470588235294` |
| 7 | `imm_recent_pr` | text | 🟢 | `0`, `1.923076923076923` |
| 8 | `autoch_minor_pr` | text | 🟢 | `11.53846153846154`, `7.627118644067797`, `10.16949152542373` |
| 9 | `sans_diplome_pr` | text | 🟢 | `11.86440677966102`, `15.15151515151515`, `10.3448275862069` |
| 10 | `pr_men_bil` | text | 🟢 | `0`, `NA` |
| 11 | `pr_ind_mpc` | text | 🟢 | `0`, `5.1`, `NA` |
| 12 | `pr_log_autor_axes_ps` | text | 🟢 | `0` |
| 13 | `pr_laeq60pl` | text | 🟢 | `0` |
| 14 | `pr_nocanop` | text | 🟢 | `100`, `0`, `55.55555555555556` |
| 15 | `pr_indust300m` | text | 🟢 | `0` |
| 16 | `pr_logchaleur` | text | 🟢 | `0` |
| 17 | `mefaits_pond` | text | 🟢 | `34.76315789`, `53.02020202`, `35.53846154` |
| 18 | `collisions_rt` | text | 🟢 | `1.714285714`, `1.338461538`, `2` |
| 19 | `crimes_pond` | text | 🟢 | `114.7307692`, `156.2878788`, `115.5676692` |
| 20 | `nb_commerces_alimentaires_moyenne_ponderee` | text | 🟢 | `0.3120300752`, `1`, `0.2307692308` |
| 21 | `nb_organismes_communautaires_moyenne_ponderee` | text | 🟢 | `3`, `2.338461538`, `1.781954887` |
| 22 | `nb_pharmacies_moyenne_ponderee` | text | 🟢 | `0.507518797`, `1`, `0.6692307692` |
| 23 | `nb_ecoles_primaires_moyenne_ponderee` | text | 🟢 | `0.7575757576`, `0`, `0.4661654135` |
| 24 | `nb_pass_tc` | text | 🟢 | `203.688258`, `253.133836`, `210.011436` |
| 25 | `nb_emplois_acces_tc_30min` | text | 🟢 | `3860` |
| 26 | `nb_biblio_lieux_cult_principaux_moy_pond` | text | 🟢 | `0` |
| 27 | `nb_equipement_distinct_moy_pond` | text | 🟢 | `7.030075188`, `4`, `7.787878788` |
| 28 | `superficie_parc_accessible_moy_pond` | text | 🟢 | `8.609630433083556`, `7.912477354606866`, `9.046088815294567` |
| 29 | `ACP_sociale` | text | 🟢 | `-0.9283188876524805`, `-0.960107254117761`, `-0.86392227194403` |
| 30 | `ACP_econo` | text | 🟢 | `-1.473600012332629`, `-1.4736000123326305`, `-1.1090253130413907` |
| 31 | `ACP_environn` | text | ⚪ | `-0.36150806238438465`, `-0.3615080623840756`, `-0.7757431081685019` |
| 32 | `ACP_securite` | text | ⚪ | `-1.18148142630323`, `-1.0947566992129931`, `-1.175247725105851` |
| 33 | `ACP_proximite` | text | ⚪ | `-0.9494088122115699`, `-1.1671719298445964`, `-1.1396899256759287` |
| 34 | `ACP_CultSportLoisir` | text | ⚪ | `-0.33340095006758497`, `-0.8902218026939613`, `-0.4491573374691347` |
| 35 | `ACP_sociale_2quintiles` | text | ⚪ | `0` |
| 36 | `ACP_econo_2quintiles` | text | ⚪ | `0` |
| 37 | `ACP_enviro_2quintiles` | text | ⚪ | `0` |
| 38 | `ACP_securite_2quintiles` | text | ⚪ | `0` |
| 39 | `ACP_proximite_2quintiles` | text | ⚪ | `1` |
| 40 | `ACP_CultSportLoisir_2quintiles` | text | ⚪ | `1`, `0` |
| 41 | `Indice_emv` | text | ⚪ | `1`, `2` |

#### Ressource: Indice d'équité des milieux de vie - calcul de l'indice à l'échelle de l'arrondissement, 2023 (XLS)

- **Resource ID**: `e9069256-eb59-439c-b3e7-04055fb28096`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,822
- **Nombre de champs**: 41

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `adidu` | text | 🟢 | `24660001`, `24660002`, `24660003` |
| 2 | `arr_ville` | text | 🟢 | `Rivière-des-Prairies-Pointe-aux-Trembles` |
| 3 | `type` | text | 🟢 | `Arrondissement` |
| 4 | `pop2021` | text | 🟢 | `651.0`, `542.0`, `303.0` |
| 5 | `log_priv2021` | text | 🟢 | `198.0`, `266.0`, `130.0` |
| 6 | `mono_pr` | text | 🟢 | `14.7058823529412`, `12.5`, `11.7647058823529` |
| 7 | `imm_recent_pr` | text | 🟢 | `1.92307692307692`, `0.0` |
| 8 | `autoch_minor_pr` | text | 🟢 | `10.1694915254237`, `11.5384615384615`, `7.6271186440678` |
| 9 | `sans_diplome_pr` | text | 🟢 | `11.864406779661`, `15.1515151515152`, `10.3448275862069` |
| 10 | `pr_men_bil` | text | 🟡 | `0.0` |
| 11 | `pr_ind_mpc` | text | 🟢 | `5.1`, `0.0` |
| 12 | `pr_log_autor_axes_ps` | text | 🟢 | `0.0` |
| 13 | `pr_laeq60pl` | text | 🟢 | `0.0` |
| 14 | `pr_nocanop` | text | 🟢 | `55.5555555555556`, `100.0`, `0.0` |
| 15 | `pr_indust300m` | text | 🟢 | `0.0` |
| 16 | `pr_logchaleur` | text | 🟢 | `0.0` |
| 17 | `mefaits_pond` | text | 🟢 | `34.76315789`, `53.02020202`, `35.53846154` |
| 18 | `collisions_rt` | text | 🟢 | `1.714285714`, `1.338461538`, `2.0` |
| 19 | `crimes_pond` | text | 🟢 | `114.7307692`, `156.2878788`, `115.5676692` |
| 20 | `nb_commerces_alimentaires_moyenne_ponderee` | text | 🟢 | `0.3120300752`, `1.0`, `0.2307692308` |
| 21 | `nb_organismes_communautaires_moyenne_ponderee` | text | 🟢 | `3.0`, `2.338461538`, `1.781954887` |
| 22 | `nb_pharmacies_moyenne_ponderee` | text | 🟢 | `0.507518797`, `1.0`, `0.6692307692` |
| 23 | `nb_ecoles_primaires_moyenne_ponderee` | text | 🟢 | `0.7575757576`, `0.0`, `0.4661654135` |
| 24 | `nb_pass_tc` | text | 🟢 | `203.688258`, `253.133836`, `210.011436` |
| 25 | `nb_emplois_acces_tc_30min` | text | 🟢 | `3860.0` |
| 26 | `nb_biblio_lieux_cult_principaux_moy_pond` | text | 🟢 | `0.0` |
| 27 | `nb_equipement_distinct_moy_pond` | text | 🟢 | `7.030075188`, `4.0`, `7.787878788` |
| 28 | `superficie_parc_accessible_moy_pond` | text | 🟢 | `8.60963043308356`, `9.04608881529457`, `7.91247735460687` |
| 29 | `ACP_sociale` | text | 🟢 | `-0.960107254117761`, `-0.92831888765248`, `-0.86392227194403` |
| 30 | `ACP_econo` | text | 🟢 | `-1.47360001233263`, `-1.14331181905696`, `-1.10902531304139` |
| 31 | `ACP_environn` | text | ⚪ | `-0.361508062384076`, `-0.361508062384385`, `-0.775743108168502` |
| 32 | `ACP_securite` | text | ⚪ | `-1.17524772510585`, `-1.18148142630323`, `-1.09475669921299` |
| 33 | `ACP_proximite` | text | ⚪ | `-0.94940881221157`, `-1.1671719298446`, `-1.13968992567593` |
| 34 | `ACP_CultSportLoisir` | text | ⚪ | `-0.449157337469135`, `-0.333400950067585`, `-0.890221802693961` |
| 35 | `ACP_sociale_2quintiles` | text | ⚪ | `0.0` |
| 36 | `ACP_econo_2quintiles` | text | ⚪ | `1.0`, `0.0` |
| 37 | `ACP_enviro_2quintiles` | text | ⚪ | `0.0` |
| 38 | `ACP_securite_2quintiles` | text | ⚪ | `0.0` |
| 39 | `ACP_proximite_2quintiles` | text | ⚪ | `1.0`, `0.0` |
| 40 | `ACP_CultSportLoisir_2quintiles` | text | ⚪ | `1.0`, `0.0` |
| 41 | `Indice_emv_AHUNTSIC` | text | ⚪ | `1.0`, `0.0`, `2.0` |

#### Ressource: Dictionnaire de données (CSV)

- **Resource ID**: `cf0dbcaf-4734-4551-81e2-6b8a7813ca41`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 42
- **Nombre de champs**: 3

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Nom_champ` | text | 🟢 | `ADIDU`, `Type`, `Arr_Ville` |
| 2 | `Type_donnees` | text | 🟢 | `Texte`, `Numérique` |
| 3 | `Description` | text | 🟢 | `Identifiant unique à 8 chiffres des a...`, `Statut (arrondissement ou ville liée)`, `Ville ou arrondissement ou se retrouv...` |

---

### Inspections préventives en salubrité du Service de l'habitation

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-inspections-preventives-salubrite-service-habitation` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-inspections-preventives-salubrite-service-habitation` |
| **Fréquence de mise à jour** | weekly |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Habitation, Inspection, Logement, SH, Salubrité |

**Description**: Les données représentent le résultat des inspections préventives effectuées par le Service de l'habitation. Les données incluent : l'état physique des parties inspectées du bâtiment sur une échelle de 1 (excellent) à 6 (très mauvais), le transfert ou non du bâtiment pour une inspection complète et la signification ou non d'un constat d'infraction sans préavis. La période du 1er janvier au 1er juin 2024 a servi de projet pilote au cours duquel plusieurs processus ont été testés et optimisés.

**Formats disponibles**: CSV, GEOJSON, SHP

#### Ressource: Inspections préventives de salubrité du Service de l'habitation (CSV)

- **Resource ID**: `760cda5d-5c58-4899-8bff-e8119edd6ab3`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 1,934
- **Nombre de champs**: 21

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `no_demande` | text | 🟢 | `3003445134`, `3003445037`, `3003445095` |
| 2 | `date_inspection` | text | 🟢 | `2024-08-23`, `2024-07-29` |
| 3 | `fondation` | text | 🟡 | `3`, `2` |
| 4 | `structure` | text | 🔴 | _vide_ |
| 5 | `enveloppe` | text | 🟢 | `3`, `2` |
| 6 | `ouvertures` | text | 🟢 | `3`, `2` |
| 7 | `saillies` | text | 🟢 | `4`, `3`, `2` |
| 8 | `interieur` | text | 🟡 | `2` |
| 9 | `moy_composants_inspectes` | text | 🟢 | `2.2`, `2.4`, `3` |
| 10 | `constat_signifie` | text | 🟢 | `non` |
| 11 | `indicateur_insp_integrale` | text | 🟢 | `oui`, `non` |
| 12 | `adresse` | text | 🟢 | `11940 av. Allard`, `11960 av. Allard`, `11935 av. Allard` |
| 13 | `arrondissement` | text | 🟢 | `Montréal-Nord` |
| 14 | `nombre_unite_logement` | text | 🟢 | `8` |
| 15 | `statut_dem` | text | 🟢 | `FR` |
| 16 | `code_type_demande` | text | 🟢 | `PX` |
| 17 | `no_ident_uev` | text | 🟢 | `02088800`, `02088810`, `02088802` |
| 18 | `longitude` | text | 🟢 | `-73.61525211595102`, `-73.61551817367464`, `-73.61476106277736` |
| 19 | `latitude` | text | 🟢 | `45.61866054128743`, `45.61840888856545`, `45.61867445903247` |
| 20 | `X` | text | 🟢 | `295791.20878227`, `295811.9173321826`, `295850.2549858009` |
| 21 | `Y` | text | 🟢 | `5053202.083865516`, `5053203.545781476`, `5053174.0871437015` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `structure`: 85.5% null

---

### Logements hors marché dans l'agglomération de Montréal

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-logements-sociaux` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-logements-sociaux` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Communautaire, Coop, HLM, Logement, Logement communautaire, Logement social, OBNL, OMHM, SH, SHDM |

**Description**: Liste des projets et/ou bâtiments associés aux logements hors marché. Inventaire construit à partir de différentes sources de données de qualité variable au début des années 2000 et entretenue, depuis, sur une base annuelle. Données utilisées pour mieux connaître la desserte en logements hors marché sur le territoire.  

Le logement hors marché correspond à tous les logements détenus par une entité qui ne vise pas à réaliser de profits : OBNL, coopérative, gouvernement, société paramunicipale. 

Les données sont catégorisées par type de projet, soit: 

HLM : Logements publics gérés par l'Office municipal d'habitation de Montréal, dont le loyer est fixé à 25 % des revenus du ménage. Cette catégorie inclut la Corporation des Habitations Jeanne-Mance. 

OMHM : Logements publics abordables issus de projets de l'Office municipal d'habitation de Montréal hors programme HLM et gérés sous une forme s'apparentant aux OBNL avec la participation des résidents. 

SHDM : Logements locatif

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: CSV, GEOJSON, SHP

#### Ressource: Liste des logements hors marché (CSV)

- **Resource ID**: `bb380faa-1ba5-458b-b520-9e2287bcc07f`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 2,832
- **Nombre de champs**: 20

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `OBJECTID` | text | 🟢 | `1`, `3`, `2` |
| 2 | `IdGeom` | text | 🟢 | `1`, `3`, `2` |
| 3 | `Projetnom` | text | 🟢 | `Saint-Sulpice`, `Montmorency`, `Adrien Trudeau` |
| 4 | `phase` | text | 🔴 | _vide_ |
| 5 | `nlog` | text | 🟢 | `150`, `80`, `32` |
| 6 | `nbchambre` | text | 🟢 | `0` |
| 7 | `unites_typ` | text | 🟢 | `logement` |
| 8 | `type` | text | 🟢 | `HLM` |
| 9 | `an_program` | text | 🟢 | `1994`, `1978`, `1971` |
| 10 | `nomrue` | text | 🟡 | `10e`, `Grand Trunk`, `Louvain` |
| 11 | `arrond` | text | 🟢 | `Lachine`, `Le Sud-Ouest`, `Ahuntsic-Cartierville` |
| 12 | `villelie` | text | 🔴 | _vide_ |
| 13 | `qr2008` | text | 🟡 | `5`, `47`, `70` |
| 14 | `loghlm_fam` | text | 🟢 | `148`, `0`, `167` |
| 15 | `loghlm_pa` | text | 🟢 | `0`, `32`, `74` |
| 16 | `loghlm_aut` | text | 🟢 | `0`, `6`, `2` |
| 17 | `xnad83_ts` | text | 🟢 | `300111`, `291242`, `293381` |
| 18 | `ynad83_ts` | text | 🟢 | `5033940`, `5046316`, `5038206` |
| 19 | `Long_x` | text | 🟢 | `-73.6462628`, `-73.5599826`, `-73.6733185` |
| 20 | `Latitud_y` | text | 🟢 | `45.4452598`, `45.4837631`, `45.5566623` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `villelie`: 98.6% null
- `phase`: 85.5% null

---

### Organismes ayant reconnaissance PANAM

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-reconnaissance-panam` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-reconnaissance-panam` |
| **Fréquence de mise à jour** | annual |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Accessibilité universelle, OBNL, SDIS, Services |

**Description**: Cet ensemble présente la liste des organismes reconnus dans le cadre du programme PANAM. Un organisme reconnu PANAM (pan-montréalais) est un organisme montréalais à but non lucratif en sport, loisir ou culture desservant des citoyens ayant une déficience, un handicap ou une limitation fonctionnelle et qui provient d’au moins 10 arrondissements de la Ville de Montréal.

**Formats disponibles**: CSV

#### Ressource: Organismes PANAM (CSV)

- **Resource ID**: `afedd652-f414-4344-9dd2-386325340db8`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 331
- **Nombre de champs**: 3

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `annee` | text | 🟢 | `2016` |
| 2 | `organisme` | text | 🟢 | `Association de développement des arts...`, `Association d'Entraide des Personnes ...`, `Association de Montréal pour la défic...` |
| 3 | `site_internet` | text | 🟢 | `https://adamacanada.org/`, `http://www.amdi.info`, `http://alpha-montreal.com` |

---

### Programmes et subventions destinés à la population et aux organismes

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-programmes-subventions-destines-population` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-programmes-subventions-destines-population` |
| **Fréquence de mise à jour** | daily |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | SCAEC, aide financière, appel à projet, concours, soutien, subventions |

**Description**: La Ville de Montréal offre une multitude de programmes destinés à la population montréalaise et aux organismes établis sur le territoire. Cet ensemble de données permet de consulter la liste des programmes telle que publiée sur [le site web de la Ville de Montréal](https://montreal.ca/recherche?dc_type.machine_name=programs).

**Formats disponibles**: CSV

#### Ressource: Programmes (CSV)

- **Resource ID**: `5a2bef39-3b3e-4d7d-82cf-658f7821e141`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 187
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `titre` | text | 🟢 | `Aide aux personnes aînées pour le pai...`, `Citoyens et citoyennes d'honneur`, `RénoPlex : subventions à la rénovatio...` |
| 2 | `url_fiche` | text | 🟢 | `https://montreal.ca/programmes/aide-a...`, `https://montreal.ca/programmes/renopl...`, `https://montreal.ca/programmes/citoye...` |
| 3 | `service_publieur` | text | 🟢 | `Ville de Montréal` |
| 4 | `date_cree` | text | 🟢 | `2021-02-14`, `2021-05-20`, `2021-01-27` |
| 5 | `type` | text | 🟢 | `Subvention`, `Prix et concours` |
| 6 | `statut` | text | 🔴 | `En cours` |

**⚠️ Champs avec >50% de valeurs nulles:**
- `statut`: 77.5% null

---

### Quartiers de référence en habitation

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-quartiers` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-quartiers` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Habitation, Milieu de vie, Quartier, Référence, SH, Territoire, Urbanisme |

**Description**: Couche géographique découpant le territoire montréalais en entités historiques et analytiques, répondant aux besoins d'analyse en habitation. De plus, ces quartiers sont des milieux de vie relativement homogènes socio-économiquement.

**Formats disponibles**: CSV, GEOJSON, SHP

#### Ressource: Quartiers de référence en habitation (CSV)

- **Resource ID**: `1c142277-53f7-4801-9d19-c54acce747d8`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 91
- **Nombre de champs**: 5

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `no_qr` | text | 🟢 | `23`, `24`, `53` |
| 2 | `nom_qr` | text | 🟢 | `Rivière-des-Prairies`, `Beaurivage`, `Tétreaultville` |
| 3 | `no_arr` | decimal | 🟡 | `33`, `22` |
| 4 | `nom_arr` | text | 🟢 | `Rivière-des-Prairies–Pointe-aux-Trembles`, `Mercier–Hochelaga-Maisonneuve` |
| 5 | `nom_mun` | text | 🟢 | `Montréal` |

#### Ressource: Nombre de logements dans les quartiers de référence (CSV)

- **Resource ID**: `58ca829c-ffb6-4cb8-8582-9ff796209fd4`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 91
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `No_QR` | text | 🟢 | `01`, `02`, `03` |
| 2 | `Nom_QR` | text | 🟢 | `Cartierville`, `Nicolas-Viel`, `Nouveau-Bordeaux` |
| 3 | `No_arr` | text | 🟡 | `23` |
| 4 | `Nom_arr_Montreal` | text | 🟡 | `Ahuntsic-Cartierville` |
| 5 | `Nom_mun` | text | 🟢 | `Montréal` |
| 6 | `Nb_log` | text | 🟢 | `13251`, `9392`, `9779` |

---

### Quartiers sociologiques

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-quartiers-sociologiques` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-quartiers-sociologiques` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Concertation, Découpage, Développement, Développement local, Intervention, Milieu de vie, Mobilisation, SDIS, Table de quartier, Table multisectorielle |

**Description**: Ce fichier contient le découpage des 32 quartiers sociologique à Montréal en 2014.

La notion de quartier sociologique ne renvoie pas à un découpage administratif formel. Elle illustre les territoires montréalais (quartier) identifiés et reconnus par les acteurs locaux sur la base de l’historique, de l’appartenance et de l’organisation sociocommunautaire et des enjeux en présence.

Les quartiers sociologiques sont notamment en lien avec les territoires de référence des tables locales de concertation.

**Formats disponibles**: CSV, GEOJSON, SHP

#### Ressource: Quartiers sociologiques (CSV)

- **Resource ID**: `055b46c1-4c3d-4af4-9c3b-1ff4b4ec39f6`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 32
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `id` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `Q_sociologique` | text | 🟢 | `Anjou`, `Bordeaux-Cartierville`, `Ahuntsic` |
| 3 | `Arrondissement` | text | 🟢 | `Anjou`, `Côte-des-Neiges–Notre-Dame-de-Grâce`, `Ahuntsic-Cartierville` |
| 4 | `Abreviation` | text | 🟢 | `AJ`, `CDN`, `AHU` |
| 5 | `nbr_RUI` | decimal | 🟢 | `0`, `1` |
| 6 | `Table` | text | 🟢 | `Solidarité Ahuntsic`, `Conseil local des intervenants commun...`, `Regroupement des organismes communaut...` |

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

### Résultats du Budget participatif de Montréal

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-budget-participatif-montreal` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-budget-participatif-montreal` |
| **Fréquence de mise à jour** | irregular |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Investissement, Participation citoyenne, SCAEC, Vote citoyen |

**Description**: Cet ensemble de données contient les informations recueillies dans le cadre des trois éditions du budget participatif de la Ville de Montréal. Les données présentent les résultats récoltés pour chaque édition à chaque phase de la démarche, de la collecte d'idées, jusqu'au vote citoyen. 

Pour la première édition du budget participatif (BP1), la Ville a d'abord consacré une somme de 10 M$ de dollars de son budget d'investissement 2020-2022. Le budget total accordé aux projets a été bonifié de 15 M$, passant de 10 M$ à 25 M$. Le montant additionnel a permis de financer 5 projets supplémentaires. Pour les deuxième (BP2) troisième (BP3) éditions, elle a respectivement réservé une somme de 31,5 M$ de dollars de son Programme décennal d’immobilisations 2023-2032 et 45 M$ de dollars dans celui 2024-2033. Ces montants visent à réaliser des projets issus de propositions citoyennes et choisis par la population. Parmi ces sommes, pour les deux dernières éditions, au moins 10 M$ de dollars seron

_(description tronquée — voir le portail pour la version complète)_

**Formats disponibles**: CSV

#### Ressource: BP3 - Liste des propositions citoyennes recueillies lors de la collecte d'idées et leur cheminement en cours de processus (CSV)

- **Resource ID**: `7e2d1886-676f-43e3-a3dc-e41e041a3bb5`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 880
- **Nombre de champs**: 16

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Numero_idee` | text | 🟢 | `1`, `3`, `2` |
| 2 | `Nom _idee` | text | 🟢 | `Soccerplex à LaSalle`, `Piste pour bmx & planche à roulette t...`, `Jeunesses Musical` |
| 3 | `Description_idee` | text | 🟢 | `Aménagement de piste de type pump tra...`, `Construire un soccerplex pour les jeu...`, `Ouvrir centre communautaires pour l’a...` |
| 4 | `Pourquoi_idee` | text | 🟢 | `De création de développement de soi ê...`, `Créer un lieu rassbleur des fans de s...`, `Créer des lieux pour la pratique de s...` |
| 5 | `Types_amenagements_proposes` | text | 🟢 | `Salles de pratique musical dans établ...`, `Construire un bâtiment en acier, tel ...`, `Terre pour faire la piste et asphalte...` |
| 6 | `Personnes_visees` | text | 🟢 | `4 ans et plus. À tous les groupes d'âge.`, `4 a 60 ans`, `À tous car le développement d’assidui...` |
| 7 | `Arrondissements` | text | 🟢 | `L’Île-Bizard–Sainte-Geneviève Pierref...`, `LaSalle`, `Le Sud-Ouest Mercier–Hochelaga-Maison...` |
| 8 | `Lieu_precis` | text | 🟢 | `s/o`, `Parc de la Rive-Boisée (P-R) Parc Gri...`, `Le complexe de soccer pourrait être c...` |
| 9 | `Sceau_jeunesse` | text | 🟢 | `Non`, `Oui` |
| 10 | `Theme_principal` | text | 🟢 | `Équité - Mon idée vise à rendre plus ...`, `Jeunesse - Mon idée vise à répondre a...`, `Sécurité - Mon idée vise à améliorer ...` |
| 11 | `Categorie_principale` | text | 🟢 | `Art et culture`, `Déplacements (à pied, en vélo, en tro...`, `Sports et loisirs` |
| 12 | `Idee_criteres_admissibilite` | text | 🟢 | `Non`, `Oui` |
| 13 | `Raison_principale_non_recevabilite` | text | 🟢 | `s/o`, `Les coûts de construction de nouveaux...`, `Cette idée présente des limites fonct...` |
| 14 | `comite_idee_soumise` | text | 🟢 | `s/o`, `Le Plateau-Mont-Royal​, Le Sud-Ouest,...`, `Anjou​, L’Île-Bizard–Sainte-Geneviève...` |
| 15 | `Idee_priorisee` | text | 🟢 | `Non`, `s/o` |
| 16 | `Nom_projet_developpe` | text | 🟢 | `s/o` |

#### Ressource: BP3 - Cheminement des projets issus des idées citoyennes de l'analyse de faisabilité au bulletin de vote (CSV)

- **Resource ID**: `f20b492b-5207-4940-8507-3f4808f31e59`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 94
- **Nombre de champs**: 12

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `numero` | text | 🟢 | `1`, `3`, `2` |
| 2 | `nom_projet` | text | 🟢 | `La véloroute des tout-petits`, `Parcours d'entraînement au parc Villeray`, `Aménagements pour ados dans les parcs!` |
| 3 | `Description-projet-propose` | text | 🟢 | `Réaménager l'ancienne piste cyclable ...`, `Mettre en place des espaces de rafraî...`, `Aménagement convivial d'équipements p...` |
| 4 | `Numeros-idees-servie-conception-projet 
(voir liste des idees)` | text | 🟢 | `430, 466, 594, 680`, `167, 221, 354, 678`, `262, 682` |
| 5 | `arrondissement-servic-analyse` | text | 🟢 | `Ahuntsic-Cartierville`, `Villeray–Saint-Michel–Parc-Extension` |
| 6 | `Verdict-analyse` | text | 🟢 | `Non faisable`, `Faisable` |
| 7 | `Raison-non-faisabilite
(le cas echant)` | text | 🟢 | `s/o`, `Localisation - Projet visant un ou de...` |
| 8 | `Numero-projet-soumis-vote` | text | 🟢 | `s/o`, `9`, `1` |
| 9 | `Nom-projet-soumis-vote` | text | 🟢 | `s/o`, `Havres urbains pour les jeunes`, `Parcours d'entraînement au parc Villeray` |
| 10 | `Description-projet-soumis-vote` | text | 🟢 | `s/o`, `Réaménager des parcs et des places pu...`, `Installer des équipements d'entraînem...` |
| 11 | `Arrondissements-lieux-implantation` | text | 🟢 | `s/o`, `Montréal-Nord (parcs Henri-Bourassa, ...`, `Villeray–Saint-Michel–Parc-Extension ...` |
| 12 | `budget-prevu` | text | 🟢 | `s/o`, `5,2 millions $`, `2,5 millions $` |

#### Ressource: BP3 - Classement des projets finalistes soumis au vote citoyen (CSV)

- **Resource ID**: `e522ed84-525b-4507-87d7-3a5ea2d0486a`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 41
- **Nombre de champs**: 7

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Rang` | text | 🟢 | `1`, `3`, `2` |
| 2 | `Titre` | text | 🟢 | `5 - Prendre des grandes marches sans ...`, `28 - Ville nourricière`, `7 - Des parcs propres et pratiques : ...` |
| 3 | `Descriptifs` | text | 🟢 | `Aménager ou préserver des espaces au ...`, `Donner accès à la population à des to...`, `Installer des toilettes publiques acc...` |
| 4 | `Lieux` | text | 🟢 | `- Côte-des-Neiges–Notre-Dame-de-Grâce...`, `- Lachine (parcs Noël-Spinelli, Stone...`, `- Côte-des-Neiges–Notre-Dame-de-Grâce...` |
| 5 | `Budjet_inscript` | text | 🟢 | `9 430 000 $`, `4 900 000 $`, `8 247 704 $` |
| 6 | `Nombre_votes` | text | 🟢 | `12778`, `12637`, `10309` |
| 7 | `Pourcentage_vote` | text | 🟢 | `44,81 %`, `44,32 %`, `36,15 %` |

#### Ressource: BP3 - Liste des projets lauréats (CSV)

- **Resource ID**: `63e6ee7b-0b89-41f9-87a9-c37aa801629d`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 7
- **Nombre de champs**: 9

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Rang` | text | 🟢 | `1`, `3`, `2` |
| 2 | `Titre` | text | 🟢 | `Des parcs propres et pratiques : des ...`, `Ville nourricière`, `Prendre des grandes marches sans souc...` |
| 3 | `Descriptif` | text | 🟢 | `Aménager ou préserver des espaces au ...`, `Donner accès à la population à des to...`, `Installer des toilettes publiques acc...` |
| 4 | `Benefices_attendus` | text | 🟢 | `Faciliter l'accès aux espaces publics...`, `Favoriser la réappropriation d'espace...`, `Améliorer la qualité de vie : offrir ...` |
| 5 | `Sceau_jeunnesse` | text | 🟢 | `Non`, `Oui` |
| 6 | `Budget` | text | 🟢 | `9 430 000 $`, `4 900 000 $`, `8 247 704 $` |
| 7 | `Lieux` | text | 🟢 | `- Côte-des-Neiges–Notre-Dame-de-Grâce...`, `- Côte-des-Neiges–Notre-Dame-deGrâce ...`, `- Lachine (parcs Noël-Spinelli, Stone...` |
| 8 | `Nombre_votes` | text | 🟢 | `12778`, `12637`, `10309` |
| 9 | `Pourcentage_vote` | text | 🟢 | `44,81 %`, `44,32 %`, `36,15 %` |

#### Ressource: BP2 - Cheminement des projets issus des_idées citoyennes de l'analyse de faisabilité au bulletin de vote (CSV)

- **Resource ID**: `6b3e5674-8587-4e06-8d9f-5a846fb6e097`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 66
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Numero du projet` | text | 🟢 | `1`, `3`, `2` |
| 2 | `Nom du projet` | text | 🟢 | `Jeux d’eau quartier St Sulpice`, `Ligne verte Millen`, `Promenons-Nous sur la rue Fleury` |
| 3 | `Description du projet` | text | 🟢 | `Aménagement de jeux d'eau pour les en...`, `Transformation de l'avenue Millen en ...`, `Piétonnisation et ajout de nouveaux a...` |
| 4 | `Idees qui ont servi a la conception du projet 
(voir tableau de` | text | 🟢 | `111, 112`, `568`, `110, 524, 661, 666` |
| 5 | `Arrondissements pour lesquels 
le projet n'est pas juge faisabl` | text | 🟢 | `L’Île-Bizard–Sainte-Geneviève`, `n/a`, `Ahuntsic–Cartierville` |
| 6 | `Raisons de non-faisabilite` | text | 🟢 | `n/a`, `Projet déjà planifié.`, `Capacité interne de mise en oeuvre in...` |
| 7 | `Arrondissements pour lesquels 
le projet est juge faisable` | text | 🟢 | `n/a`, `Ahuntsic–Cartierville, Montréal-Nord`, `Ahuntsic–Cartierville` |
| 8 | `Nom du projet soumi au vote` | text | 🟢 | `n/a`, `18 - Promenons-nous sur la rue Fleury...`, `27 - Ligne verte Millen` |

#### Ressource: BP1 - Liste des propositions citoyennes recueillies lors de la collecte d'idées et leur cheminement en cours de processus (CSV)

- **Resource ID**: `b82d71f4-8882-421d-a49e-99278207b402`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 620
- **Nombre de champs**: 11

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Numero_idee` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `Nom _idee` | text | 🟢 | `Espace socioculturel intergénérationnel`, `Espace collectif extérieur éducatif e...`, `Atelier Vélo - Parcours Gouin` |
| 3 | `Description_idee` | text | 🟢 | `Ma conception du projet est la suivan...`, `Le projet a pour objectif l'aménageme...`, `Offrir un kiosque de réparation somma...` |
| 4 | `Pourquoi_idee` | text | 🟢 | `L'éducation relative à l'environnemen...`, `L'été dernier a vu un accroissement d...`, `Je propose cette idée d'abord pour te...` |
| 5 | `Lieu_realisation` | text | 🟢 | `Mon idée vise un lieu précis (ex. un ...`, `Mon idée vise tout Montréal` |
| 6 | `Lieu_precis` | text | 🟢 | `Boisé Saint-Sulpice`, `Parc Maurice-Richard près du site nau...` |
| 7 | `Arrondissements` | text | 🟢 | `Ahunstic-Cartierville` |
| 8 | `Verdict_recevabilite` | text | 🟢 | `Recevable ou potentiellement recevabl...`, `Non recevable en vertu des critères e...`, `Recevable ou potentiellement recevabl...` |
| 9 | `Raison_principale_non_recevabilite` | text | 🟢 | `Idée qui présente des limites fonctio...`, `Idée qui ne représente pas une dépens...`, `Idée qui relève de la réglementation ...` |
| 10 | `Verdict_cheminement` | text | 🟢 | `Idée non développée en comité pour l'...`, `Idée développée en comité et intégrée...` |
| 11 | `Nom_projet_developpe` | text | 🟢 | `Zones nourricières écologiques (forêt...` |

#### Ressource: BP1 - Liste des projets soumis à l’analyse de faisabilité et de coûts (CSV)

- **Resource ID**: `5e58c64f-b4e1-4402-9e1e-278415de4ca4`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 63
- **Nombre de champs**: 9

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Numero_projet_temporaire` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `Titre` | text | 🟢 | `Parcours verts locaux pour favoriser ...`, `Parcs à vélo sécurisés (ou vélostations)`, `Carrousel à vélos sécurisé` |
| 3 | `Descriptif` | text | 🟢 | `Installation de carrousels automatisé...`, `Piétonisation partielle de rues pour ...`, `Installation d'abris multifonctionnel...` |
| 4 | `Verdict` | text | 🟢 | `Faisable - joint au projet 1`, `Faisable` |
| 5 | `Arrondissements_services_analyse_favorable` | text | 🟢 | `Ahunstic-Cartierville L'Île-Bizard-Sa...`, `Ahuntsic-Cartierville Outremont`, `Côte-des-Neiges-Notre-Dame-de-Grâce` |
| 6 | `Principale_raison_non_faisabilite` | text | 🟢 | `n/a` |
| 7 | `Projet_approuve_conseils_arrondissements` | text | 🟢 | `oui` |
| 8 | `Theme_associe` | text | 🟢 | `Mobilité durable et active`, `Milieux de vie inclusifs` |
| 9 | `Titre_bulletin_vote` | text | 🟢 | `3 - Chemins verts et locaux`, `1 - Vélostations de proximité`, `26 - Au fil de ma contemplation` |

#### Ressource: BP1 - Classement et résultats des projets soumis au vote  (CSV)

- **Resource ID**: `b14c9fd0-f48e-49f5-9c7a-f3d861fedd77`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 35
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Rang` | decimal | 🟢 | `1`, `3`, `2` |
| 2 | `Titre` | text | 🟢 | `34 - Mobilier festif inclusif et sécu...`, `25 - De l’eau dans ta gourde!`, `12 - Les mini-forêts de Montréal` |
| 3 | `Descriptif` | text | 🟢 | `Ajout de plus de 125 fontaines d’eau ...`, `Création de 7 mini-forêts protégées e...`, `Bonification de l’offre d’équipements...` |
| 4 | `Benefices_attendus` | text | 🟢 | `- Ajouter plus de 1200 m2 de forêts à...`, `- Rendre inclusifs les événements de ...`, `- Offrir un meilleur accès à l’eau po...` |
| 5 | `Budget_inscrit` | text | 🟢 | `650 000 $`, `2 700 000 $`, `1 400 000 $` |
| 6 | `Lieux` | text | 🟢 | `Tous les arrondissements`, `Montréal-Nord, Outremont, Pierrefonds...`, `Côte-des-Neiges-Notre-Dame-de-Grâce, ...` |
| 7 | `Nombre_votes` | decimal | 🟢 | `4868`, `4633`, `8553` |
| 8 | `Pourcentage_vote` | text | 🟢 | `23,1%`, `42,7%`, `24,3%` |

#### Ressource: BP1 - Liste des projets lauréats (CSV)

- **Resource ID**: `5cb92114-b054-463a-9096-39555325a22c`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 12
- **Nombre de champs**: 8

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `Rang` | text | 🟢 | `1`, `3`, `2` |
| 2 | `Titre` | text | 🟢 | `Mobilier festif inclusif et sécuritaire`, `Les mini-forêts de Montréal`, `De l’eau dans ta gourde!` |
| 3 | `Descriptif` | text | 🟢 | `Ajout de plus de 125 fontaines d’eau ...`, `Création de 7 mini-forêts protégées e...`, `Bonification de l’offre d’équipements...` |
| 4 | `Benefices_attendus` | text | 🟢 | `Ajouter plus de 1200 m2 de forêts à M...`, `- Rendre inclusifs les événements de ...`, `- Offrir un meilleur accès à l’eau po...` |
| 5 | `Budget` | text | 🟢 | `650 000 $`, `2 700 000 $`, `1 400 000 $` |
| 6 | `Lieux` | text | 🟢 | `Tous les arrondissements`, `Montréal-Nord, Outremont, Pierrefonds...`, `Côte-des-Neiges-Notre-Dame-de-Grâce, ...` |
| 7 | `Nombre_votes` | text | 🟢 | `4868`, `4633`, `8553` |
| 8 | `Pourcentage_vote` | text | 🟢 | `23,1%`, `42,7%`, `24,3%` |

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

### Subventions en habitation destinées aux citoyennes et citoyens

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-subvention-habitation` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-subvention-habitation` |
| **Fréquence de mise à jour** | annual |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | Habitation, Logement, SH, Subvention |

**Description**: La Ville de Montréal administre des programmes de subventions en habitation destinés à aider les citoyennes et les citoyens. Ces programmes ont entre autres pour objectif de préserver la qualité du parc résidentiel montréalais, d’offrir des logements adaptés aux personnes en situation de handicap et d'aider les ménages à acquérir une propriété.

**Formats disponibles**: CSV

#### Ressource: Subventions en habitation (CSV)

- **Resource ID**: `a2f43996-87f9-4423-b800-2f2c41ac326e`
- **DataStore actif**: ✅ Oui
- **Nombre d'enregistrements**: 32,060
- **Nombre de champs**: 6

| # | Champ brut | Type | Qualité | Exemples de valeurs |
|---|-----------|------|---------|---------------------|
| 1 | `ID_SDSR` | text | 🟢 | `960019381`, `960002354`, `930099104` |
| 2 | `DATE` | text | 🟢 | `2013-06-26`, `2013-06-21`, `2013-06-28` |
| 3 | `MONTANT` | text | 🟢 | `-176`, `0`, `-2943` |
| 4 | `TRANSACTION` | text | 🟢 | `REVI`, `ANNU` |
| 5 | `ARRONDISSEMENT` | text | 🟢 | `Rivière-des-Prairies - Pointe-aux-Tre...`, `LaSalle`, `Anjou` |
| 6 | `CATEGORIE` | text | 🟢 | `Adaptation de domicile` |

---

### Zone de revitalisation urbaine intégrée (RUI)

| Propriété | Valeur |
|-----------|--------|
| **Slug** | `vmtl-rui` |
| **Organisation** | Ville de Montréal |
| **URL portail** | `donnees.montreal.ca/dataset/vmtl-rui` |
| **Fréquence de mise à jour** | notPlanned |
| **Licence** | Attribution (CC-BY 4.0) |
| **Tags** | ATI, Approche territoriale intégrée, Découpage, Développement local, Intervention, Local, Milieu de vie, Quartier, RUI, Revitalisation urbaine intégrée |

**Description**: Ce fichier contient le découpage des douze RUI à Montréal en 2014.

« La RUI est une stratégie d'intervention qui se distingue des stratégies sectorielles de développement urbain, économique et social, par les objectifs qu’elle poursuit et l’approche concertée et participative qu’elle privilégie.

L’objectif ultime de la démarche est d’améliorer de façon notable et durable le sort des résidents des territoires défavorisés. L’atteinte de cet objectif ultime dépend de la réalisation d’objectifs « intermédiaires » très divers et qui varient selon le territoire. »
Source : Ville de Montréal

**Formats disponibles**: GEOJSON, GML, SHP

---

import type {
  SemanticCategory,
  SemanticDataset,
  SemanticField,
  FieldRole,
} from './types';

// Import semantic layer JSONs (copied to src/data/ at build time)
import agricultureData from '@/data/semantic-layer/agriculture-alimentation.json';
import economieData from '@/data/semantic-layer/economie-entreprises.json';
import educationData from '@/data/semantic-layer/education-recherche.json';
import environnementData from '@/data/semantic-layer/environnement-ressources-naturelles-energie.json';
import gouvernementData from '@/data/semantic-layer/gouvernement-finances.json';
import infrastructuresData from '@/data/semantic-layer/infrastructures.json';
import loiData from '@/data/semantic-layer/loi-justice-securite-publique.json';
import politiquesData from '@/data/semantic-layer/politiques-sociales.json';
import santeData from '@/data/semantic-layer/sante.json';
import societeData from '@/data/semantic-layer/societe-culture.json';
import tourismeData from '@/data/semantic-layer/tourisme-sports-loisirs.json';
import transportData from '@/data/semantic-layer/transport.json';
import uncategorizedData from '@/data/semantic-layer/uncategorized.json';
import resourceIds from '@/data/resource-ids.json';

// Raw category file shape
interface RawCategoryFile {
  category_slug: string;
  category_name_fr: string;
  category_name_en: string;
  datasets: RawDataset[];
}

interface RawDataset {
  slug: string;
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  publisher: string;
  update_frequency: string;
  total_records: number;
  temporal_range: { min: string; max: string } | null;
  temporal_range_note?: string;
  methodology_fr: string;
  data_quality_score: string;
  usable_in_report_builder: boolean;
  available_formats: string[];
  fields: SemanticField[];
  recommended_joins?: string[];
  warnings_fr: string[];
  warnings_en: string[];
}

const CATEGORY_FILES: RawCategoryFile[] = [
  agricultureData,
  economieData,
  educationData,
  environnementData,
  gouvernementData,
  infrastructuresData,
  loiData,
  politiquesData,
  santeData,
  societeData,
  tourismeData,
  transportData,
  uncategorizedData,
] as unknown as RawCategoryFile[];

const RESOURCE_IDS = resourceIds as Record<string, string>;

const USABLE_GRADES = new Set(['A', 'B', 'C']);

// ── Build master indexes at module load time ──

const categoryIndex = new Map<string, SemanticCategory>();
const datasetsByCategory = new Map<string, SemanticDataset[]>();
const datasetBySlug = new Map<string, SemanticDataset>();
// Track slugs we've already indexed to avoid duplicates across categories
const indexedSlugs = new Set<string>();

for (const catFile of CATEGORY_FILES) {
  const catSlug = catFile.category_slug;

  const usableDatasets: SemanticDataset[] = [];

  for (const rawDs of catFile.datasets) {
    // Skip non-usable or already-indexed datasets
    if (!rawDs.usable_in_report_builder) continue;
    if (!USABLE_GRADES.has(rawDs.data_quality_score)) continue;
    if (indexedSlugs.has(rawDs.slug)) continue;

    // Look up resource_id from our generated map
    const resourceId = RESOURCE_IDS[rawDs.slug] ?? '';
    if (!resourceId) continue; // No DataStore resource, skip

    const dataset: SemanticDataset = {
      slug: rawDs.slug,
      title_fr: rawDs.title_fr,
      title_en: rawDs.title_en,
      description_fr: rawDs.description_fr,
      description_en: rawDs.description_en,
      publisher: rawDs.publisher,
      category: catSlug,
      data_quality_score: rawDs.data_quality_score as SemanticDataset['data_quality_score'],
      total_records: rawDs.total_records,
      update_frequency: rawDs.update_frequency,
      temporal_range: rawDs.temporal_range,
      temporal_range_note: rawDs.temporal_range_note,
      usable_in_report_builder: true,
      fields: rawDs.fields.filter((f) => f.report_builder_role !== 'exclude'),
      warnings_fr: rawDs.warnings_fr,
      warnings_en: rawDs.warnings_en,
      methodology_fr: rawDs.methodology_fr,
      available_formats: rawDs.available_formats,
      recommended_joins: rawDs.recommended_joins,
      resource_id: resourceId,
    };

    usableDatasets.push(dataset);
    datasetBySlug.set(rawDs.slug, dataset);
    indexedSlugs.add(rawDs.slug);
  }

  if (usableDatasets.length > 0) {
    datasetsByCategory.set(catSlug, usableDatasets);
    categoryIndex.set(catSlug, {
      slug: catSlug,
      name_fr: catFile.category_name_fr,
      name_en: catFile.category_name_en,
      dataset_count: usableDatasets.length,
      usable_count: usableDatasets.length,
    });
  }
}

// ── Public API ──

export function getCategories(): SemanticCategory[] {
  return Array.from(categoryIndex.values()).sort((a, b) =>
    a.name_fr.localeCompare(b.name_fr, 'fr'),
  );
}

export function getCategory(slug: string): SemanticCategory | undefined {
  return categoryIndex.get(slug);
}

export function getDatasetsByCategory(categorySlug: string): SemanticDataset[] {
  return datasetsByCategory.get(categorySlug) ?? [];
}

export function getDataset(slug: string): SemanticDataset | undefined {
  return datasetBySlug.get(slug);
}

export function getFieldsByRole(slug: string, role: FieldRole): SemanticField[] {
  const ds = datasetBySlug.get(slug);
  if (!ds) return [];
  return ds.fields.filter((f) => f.report_builder_role === role);
}

export function getAllDatasets(): SemanticDataset[] {
  return Array.from(datasetBySlug.values());
}

/** Get the category slug that contains a given dataset */
export function getCategoryForDataset(datasetSlug: string): string | undefined {
  const ds = datasetBySlug.get(datasetSlug);
  return ds?.category;
}

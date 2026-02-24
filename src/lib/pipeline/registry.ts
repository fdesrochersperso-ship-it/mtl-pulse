/**
 * Pipeline registry — maps pipeline names to Pipeline instances.
 */

import type { Pipeline } from './types';
import { ActesCriminelsPipeline } from './pipelines/actes-criminels';
import { InfoTravauxPipeline } from './pipelines/info-travaux';
import { EntravesCirculationPipeline } from './pipelines/entraves-circulation';
import { Requetes311Pipeline } from './pipelines/requetes-311';
import { PermisConstructionPipeline } from './pipelines/permis-construction';
import { FireInterventionsPipeline } from './pipelines/fire-interventions';
import { PotholeRepairsPipeline } from './pipelines/pothole-repairs';
import { RemorquagesPipeline } from './pipelines/remorquages';
import { BedbugReportsPipeline } from './pipelines/bedbug-reports';
import { ElectedOfficialsPipeline } from './pipelines/elected-officials';
import { BoroughsPipeline } from './pipelines/boroughs';
import { AirQualityPipeline } from './pipelines/air-quality';
import { CyclingCountsPipeline } from './pipelines/cycling-counts';
import { WaterBreaksPipeline } from './pipelines/water-breaks';
import { RoadConditionPipeline } from './pipelines/road-condition';
import { ContractsPipeline } from './pipelines/contracts';

export const pipelineRegistry = new Map<string, Pipeline>();

pipelineRegistry.set('actes_criminels', new ActesCriminelsPipeline());
pipelineRegistry.set('info_travaux', new InfoTravauxPipeline());
pipelineRegistry.set('entraves_circulation', new EntravesCirculationPipeline());
pipelineRegistry.set('requetes_311', new Requetes311Pipeline());
pipelineRegistry.set('permis_construction', new PermisConstructionPipeline());
pipelineRegistry.set('fire_interventions', new FireInterventionsPipeline());
pipelineRegistry.set('pothole_repairs', new PotholeRepairsPipeline());
pipelineRegistry.set('remorquages', new RemorquagesPipeline());
pipelineRegistry.set('bedbug_reports', new BedbugReportsPipeline());
pipelineRegistry.set('elected_officials', new ElectedOfficialsPipeline());
pipelineRegistry.set('boroughs', new BoroughsPipeline());

// Phase 4 pipelines
pipelineRegistry.set('air_quality', new AirQualityPipeline());
pipelineRegistry.set('cycling_counts', new CyclingCountsPipeline());
pipelineRegistry.set('water_breaks', new WaterBreaksPipeline());
pipelineRegistry.set('road_condition', new RoadConditionPipeline());
pipelineRegistry.set('contracts', new ContractsPipeline());

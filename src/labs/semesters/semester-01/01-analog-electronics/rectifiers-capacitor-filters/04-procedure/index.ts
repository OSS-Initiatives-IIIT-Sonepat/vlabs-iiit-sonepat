import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step as s01 } from "./01-no-filter-baseline";
import { step as s02 } from "./02-add-10uf";
import { step as s03 } from "./03-replace-capacitors";
import { step as s04 } from "./04-plot-ripple-vs-capacitance";
import { step as s05 } from "./05-observe-peak-diode-current";
import { rectifiersCapacitorFiltersStepSchematics } from "@/labs/schematics/rectifiers-capacitor-filters-schematics";

export const procedureSteps: SceneProcedureStep[] = [
  { ...s01, schematic: rectifiersCapacitorFiltersStepSchematics[0] },
  { ...s02, schematic: rectifiersCapacitorFiltersStepSchematics[1] },
  { ...s03, schematic: rectifiersCapacitorFiltersStepSchematics[2] },
  { ...s04, schematic: rectifiersCapacitorFiltersStepSchematics[3] },
  { ...s05, schematic: rectifiersCapacitorFiltersStepSchematics[4] },
];

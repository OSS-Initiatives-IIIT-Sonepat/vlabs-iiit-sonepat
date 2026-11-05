import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { pipelineOverlapStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/pipeline-overlap";

const headers = ["Clock", "Where I1 is", "Pipe"];
const rows = [
  ["1", "S1", "S2, S3, S4 empty"],
  ["2", "S2", "I2 enters S1"],
  ["3", "S3", "I3 enters S1"],
  ["4", "S4", "speedup approaches 4"],
];

const copy = [
  ["First clock", "Four segments, each a circuit plus a register: S1 R1, S2 R2, S3 R3, S4 R4. I1 enters S1.", 1],
  ["Second clock", "I1 moves into S2 and I2 enters S1. The register after each segment holds that segment's output.", 2],
  ["Third clock", "I1 is in S3, I2 is in S2, and I3 is in S1. S4 is still empty.", 3],
  ["Fourth clock", "I1 reaches S4. Once the pipe is full, one result leaves each clock, so the speedup approaches 4.", 4],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, count], i) => ({
  label,
  body,
  show: [],
  schematic: fig[i],
  table: revealedTable(headers, rows, count),
}));

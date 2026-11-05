import { type SceneProcedureStep } from "@/labs/experiments/types";
import { cacheVirtualStepSchematics as fig } from "@/labs/schematics/semester-03/07-memory-and-io/cache-virtual";
export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Associative",
    body: "Every line is eligible. The tag is compared with all of them. A match in any line is a hit.",
    show: [],
    schematic: fig[0],
  },
  {
    label: "Direct mapped",
    body: "A 15-bit address reaches 32K words. The index names the only cache line this address may occupy. The tag is compared with that one line and with no other.",
    show: [],
    schematic: fig[1],
  },
  {
    label: "Set associative",
    body: "The index names a set. The tag is compared with each way in the set. A hit is a match in one of those ways.",
    show: [],
    schematic: fig[2],
  },
  {
    label: "One page in, one page out",
    body: "Page 0 has a frame number, so it is in memory. Page 1 has no frame, so the word is still on disk. Asking for page 1 is a page fault.",
    show: [],
    schematic: fig[3],
  },
];

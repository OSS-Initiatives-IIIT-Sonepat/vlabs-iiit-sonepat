import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { addressSequencingStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/address-sequencing";

const headers = ["Way", "Source", "CAR"];
const rows = [
  ["Map", "opcode", "40"],
  ["Increment", "CAR + 1", "41"],
  ["Branch", "AD field", "60"],
  ["Return", "saved address", "16"],
];

const copy = [
  [
    "Mapping",
    "The machine opcode is mapped to control address 40. The microprogram for that opcode begins there.",
    1,
  ],
  [
    "Increment",
    "The next microinstruction is in sequence, so CAR becomes 41.",
    2,
  ],
  [
    "Branch",
    "The address field says 60. CAR is loaded with 60 instead of 42.",
    3,
  ],
  [
    "Return",
    "A micro-subroutine saved 16. The return loads CAR from that saved address.",
    4,
  ],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(
  ([label, body, count], i) => ({
    label,
    body,
    show: [],
    schematic: fig[i],
    table: revealedTable(headers, rows, count),
  }),
);

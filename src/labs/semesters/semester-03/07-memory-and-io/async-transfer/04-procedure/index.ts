import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { asyncTransferStepSchematics as fig } from "@/labs/schematics/semester-03/07-memory-and-io/async-transfer";

const headers = ["Method","Wires","0101 arrives"];
const rows = [
  [
    "Strobe",
    "data and one pulse",
    "on the pulse"
  ],
  [
    "Valid",
    "source raises DAV",
    "destination sees data"
  ],
  [
    "Ack",
    "destination answers",
    "source may drop"
  ]
];

const copy = [
  [
    "Strobe",
    "The source puts 0101 on the lines and pulses the strobe. The destination samples the lines.",
    1
  ],
  [
    "Data valid",
    "For a handshake the source raises DAV and holds 0101 until the destination responds.",
    2
  ],
  [
    "Acknowledge",
    "The destination raises ACK, then both wires drop. 0101 has been accepted.",
    3
  ]
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, count], i) => ({
  label,
  body,
  show: [],
  schematic: fig[i],
  table: revealedTable(headers, rows, count),
}));

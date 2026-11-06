import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { adderSubtractorStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/adder-subtractor";
import { boardShow } from "../components";

const headers = ["M", "Mode", "C0", "B ⊕ M", "C4 S"];
const rows = [
  ["0", "Adder", "0", "B", "—"],
  ["1", "Subtractor", "1", "B'", "—"],
  ["—", "Four full adders", "—", "cascade", "—"],
  ["M", "XOR in front of B", "—", "B ⊕ M", "—"],
  ["M", "M drives C0", "M", "—", "—"],
  ["—", "A skips the XOR", "—", "—", "—"],
  ["0", "1010 + 0011", "0", "0011", "0 1101"],
  ["1", "1010 − 0011", "1", "1100", "1 0111"],
];
const counts = [2, 3, 4, 5, 6, 7, 8];

const copy = [
  [
    "Two modes",
    "M = 0 makes an adder: C0 = 0 and B ⊕ 0 = B. M = 1 makes a subtractor: C0 = 1 and B ⊕ 1 = B', so the adder forms A + B' + 1.",
    "psu",
  ],
  [
    "Four full adders",
    "Bit 3 is the left stage and bit 0 is the right stage. The 74HC283 on the right of the board is those four adders.",
    "fa",
  ],
  [
    "XOR on B",
    "Each B bit enters an XOR. B = 0011, so the four XOR data pins are 0, 0, 1, 1 from bit 3 down to bit 0. The XOR output is the adder's B input.",
    "x0",
  ],
  [
    "M is also C0",
    "One yellow wire is M. It enters every XOR and continues into C0. M = 0 passes B and adds nothing. M = 1 inverts B and adds one.",
    "w_m_x3",
  ],
  [
    "A goes straight in",
    "A = 1010 does not pass through an XOR. A3 A2 A1 A0 = 1 0 1 0 is tied to the adder.",
    "w_a4",
  ],
  [
    "Add",
    "Set M to 0. C4 stays dark. The sum lamps, bit 3 down to bit 0, read 1 1 0 1. Upper lamps are C4, S3, and S2. Lower lamps are S1 and S0. 10 + 3 = 13.",
    "led_s3",
  ],
  [
    "Subtract",
    "Set M to 1. C4 lights. The sum lamps read 0 1 1 1. B' is 1100, and C0 adds the extra 1. 10 − 3 = 7.",
    "led_c4",
  ],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(
  ([label, body, highlight], i) => ({
    label,
    body,
    show: boardShow[i],
    highlight,
    activeInputs: { m: i === 6 ? 1 : 0 },
    schematic: fig[i],
    table: revealedTable(headers, rows, counts[i]),
  }),
);

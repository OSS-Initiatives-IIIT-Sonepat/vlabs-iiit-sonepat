import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { magnitudeAddSubStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/magnitude-add-sub";

const headers = ["Step", "Test", "Result"];
const rows = [
  ["Start", "A = +5, B = +7", "signs 0 and 0"],
  ["Signs", "As ⊕ Bs", "0, subtract magnitudes"],
  ["Other arm", "signs differ", "would add magnitudes"],
  ["Subtract", "0101 + 1001", "1110, E = 0, AVF = 0"],
  ["End carry", "E = 1?", "no, A < B"],
  ["Correct", "complement and +1", "0010, sign 1, result −2"],
  ["Add", "+9 + +9", "E = 1, AVF = 1"],
];

const copy = [
  [
    "Load the operands",
    "Subtract +5 − +7. A holds sign 0 and magnitude 0101. B holds sign 0 and magnitude 0111.",
    1,
  ],
  [
    "Compare the signs",
    "As ⊕ Bs is 0 ⊕ 0 = 0. Equal signs on a subtract mean the magnitudes are subtracted. The = 1 arm would add them.",
    2,
  ],
  [
    "The other sign case",
    "If the signs differed, EA ← A + B and AVF would take the carry. This pair does not take that arm.",
    3,
  ],
  [
    "Subtract the magnitudes",
    "B' + 1 is 1001. 0101 + 1001 = 1110, so E = 0 and AVF stays 0.",
    4,
  ],
  [
    "Test the end carry",
    "E = 0, so A was smaller than B. The = 1 arm would keep the sign because A ≥ B.",
    5,
  ],
  [
    "Complement the result",
    "A' of 1110 is 0001, plus 1 is 0010, and the sign flips to 1. The result is −2, and 5 − 7 = −2.",
    6,
  ],
  [
    "Addition overflow",
    "For addition, equal signs use EA ← A + B. +9 + +9 is 1001 + 1001 = 10010, so E = 1 and AVF ← E.",
    7,
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

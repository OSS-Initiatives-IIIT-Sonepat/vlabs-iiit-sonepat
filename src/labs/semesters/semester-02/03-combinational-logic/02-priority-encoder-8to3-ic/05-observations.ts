import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const observations: Section = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Levels are written as on the pins: 0 = LOW, 1 = HIGH, X = don't care. An input is active when it is 0. EI' = 0 except in the last row. The decimal value is read from the lit A2 A1 A0 LEDs (the complement of the output levels).",
  ],
  table: {
    headers: ["EI'", "I7", "I6", "I5", "I4", "I3", "I2", "I1", "I0", "A2", "A1", "A0", "GS'", "EO'", "Decimal"],
    rows: [
      ["0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "none"],
      ["0", "1", "1", "1", "1", "1", "1", "1", "0", "1", "1", "1", "0", "1", "0"],
      ["0", "1", "1", "1", "1", "1", "1", "0", "X", "1", "1", "0", "0", "1", "1"],
      ["0", "1", "1", "1", "1", "1", "0", "X", "X", "1", "0", "1", "0", "1", "2"],
      ["0", "1", "1", "1", "1", "0", "X", "X", "X", "1", "0", "0", "0", "1", "3"],
      ["0", "1", "1", "1", "0", "X", "X", "X", "X", "0", "1", "1", "0", "1", "4"],
      ["0", "1", "1", "0", "X", "X", "X", "X", "X", "0", "1", "0", "0", "1", "5"],
      ["0", "1", "0", "X", "X", "X", "X", "X", "X", "0", "0", "1", "0", "1", "6"],
      ["0", "0", "X", "X", "X", "X", "X", "X", "X", "0", "0", "0", "0", "1", "7"],
      ["1", "X", "X", "X", "X", "X", "X", "X", "X", "1", "1", "1", "1", "1", "disabled"],
    ],
  },
};

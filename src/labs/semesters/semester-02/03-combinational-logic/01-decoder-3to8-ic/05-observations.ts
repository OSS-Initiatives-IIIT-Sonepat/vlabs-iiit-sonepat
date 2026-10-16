import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

const row = (n: number | null, en: string): string[] => {
  const bits = n === null ? ["X", "X", "X"] : [(n >> 2) & 1, (n >> 1) & 1, n & 1].map(String);
  const outs = Array.from({ length: 8 }, (_, i) => (i === n ? "0" : "1"));
  return [en, ...bits, ...outs, n === null ? "None" : `Y${n}`];
};

export const observations: Section = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Enables: E1 = 1, E2' = E3' = 0 unless stated. 1 = HIGH (LED off), 0 = LOW (LED on). Verify every row and note which LED lights.",
  ],
  table: {
    headers: ["E1", "A2", "A1", "A0", "Y0", "Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "LED on"],
    rows: [
      ...Array.from({ length: 8 }, (_, n) => row(n, "1")),
      row(null, "0"),
    ],
  },
};

import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

const bits = (n: number) => [(n >> 3) & 1, (n >> 2) & 1, (n >> 1) & 1, n & 1].map(String);

export const observations: Section = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Record the outputs after each rising clock edge, starting from 0000 after a clear. 1 = LED on. For the MOD-10 column, note the state after the same number of clock pulses with LD' = (Q3·Q0)'.",
  ],
  table: {
    headers: ["Clock pulses", "Q3", "Q2", "Q1", "Q0", "Decimal", "RCO", "MOD-10 state (decimal)"],
    rows: Array.from({ length: 17 }, (_, i) => {
      const n = i % 16;
      return [String(i), ...bits(n), String(n), n === 15 ? "1" : "0", String(i % 10)];
    }),
  },
};

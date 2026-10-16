import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

const bits = (n: number) => [(n >> 3) & 1, (n >> 2) & 1, (n >> 1) & 1, n & 1].map(String);

export const observations: Section = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Record the outputs after each falling clock edge, starting from 0000 after a reset, with QA connected to CKB. 1 = LED on. For the decade column, note the state after the same number of clock pulses with R0(1) = QB and R0(2) = QD.",
  ],
  table: {
    headers: ["Clock pulses", "QD", "QC", "QB", "QA", "Decimal (MOD-16)", "Decade state (decimal)"],
    rows: Array.from({ length: 17 }, (_, i) => {
      const n = i % 16;
      return [String(i), ...bits(n), String(n), String(i % 10)];
    }),
  },
};

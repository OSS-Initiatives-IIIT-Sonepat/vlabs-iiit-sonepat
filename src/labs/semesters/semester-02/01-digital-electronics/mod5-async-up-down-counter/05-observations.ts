import { type LabSection } from "@/labs/lab-content.types";

export const observations: LabSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Apply clock pulses one at a time and record the LED states $Q_C Q_B Q_A$ (lit = 1) after each pulse. Compare your readings with the expected values below.",
    "Frequency division check: with a 1 kHz clock, measure the period of $Q_C$ on the CRO. It should be 5 ms, which is $f_{clk}/5$.",
  ],
  table: {
    headers: ["Mode", "Clock pulse", "Q_C", "Q_B", "Q_A", "Decimal"],
    rows: [
      ["UP", "0", "0", "0", "0", "0"],
      ["UP", "1", "0", "0", "1", "1"],
      ["UP", "2", "0", "1", "0", "2"],
      ["UP", "3", "0", "1", "1", "3"],
      ["UP", "4", "1", "0", "0", "4"],
      ["UP", "5", "0", "0", "0", "0"],
      ["DOWN", "0", "1", "0", "0", "4"],
      ["DOWN", "1", "0", "1", "1", "3"],
      ["DOWN", "2", "0", "1", "0", "2"],
      ["DOWN", "3", "0", "0", "1", "1"],
      ["DOWN", "4", "0", "0", "0", "0"],
      ["DOWN", "5", "1", "0", "0", "4"],
    ],
  },
};

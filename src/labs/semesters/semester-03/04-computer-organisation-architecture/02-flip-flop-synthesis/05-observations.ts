import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "The JK excitation table is the characteristic table read backwards. The don't-cares are what make the JK-to-D wiring a single inverter.",
  ],
  table: {
    headers: ["Q", "Q+", "J", "K", "D", "T"],
    rows: [
      ["0", "0", "0", "X", "0", "0"],
      ["0", "1", "1", "X", "1", "1"],
      ["1", "0", "X", "1", "0", "1"],
      ["1", "1", "X", "0", "1", "0"],
    ],
  },
};

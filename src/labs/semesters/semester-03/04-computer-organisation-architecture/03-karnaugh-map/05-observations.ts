import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Three groups cover all ten minterms. The two quads and one pair give a three-term sum of products; no 0-cell was pulled into a group.",
  ],
  table: {
    headers: ["Group (cells)", "Size", "Term"],
    rows: [
      ["0, 1, 8, 9", "4", "B' C'"],
      ["2, 6, 10, 14", "4", "C D'"],
      ["5, 7", "2", "A' B D"],
    ],
  },
};

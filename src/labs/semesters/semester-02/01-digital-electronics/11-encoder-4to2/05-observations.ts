import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "4:2 Priority Encoder truth table. A = I3 + I2 (MSB), B = I3 + I1·I2′ (LSB). The last two rows have more than one input active: the higher-numbered input wins.",
  ],
  table: {
    headers: [
      "I3",
      "I2",
      "I1",
      "I0",
      "A (observed)",
      "B (observed)",
      "A (expected)",
      "B (expected)",
      "Binary code",
    ],
    rows: [
      [0, 0, 0, 1, 0, 0, 0, 0, "00 → I0"],
      [0, 0, 1, 0, 0, 1, 0, 1, "01 → I1"],
      [0, 1, 0, 0, 1, 0, 1, 0, "10 → I2"],
      [1, 0, 0, 0, 1, 1, 1, 1, "11 → I3"],
      [0, 1, 1, 0, 1, 0, 1, 0, "10 → I2 wins"],
      [1, 0, 1, 1, 1, 1, 1, 1, "11 → I3 wins"],
    ],
  },
};

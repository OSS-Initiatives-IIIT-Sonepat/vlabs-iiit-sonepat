import { type ObservationSection } from "@/labs/lab-content.types";
export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Partial load currents add to the two-source current. The same check on the node voltage is $5.12 + 1.55 = 6.67$ V.",
  ],
  table: {
    headers: [
      "Condition",
      "$I_{R3}$ (mA)",
      "$V_{R3}$ (V)",
      "Sum check",
    ],
    rows: [
      ["Both sources", 2.02, 6.67, "—"],
      ["V1 alone", 1.55, 5.12, "—"],
      ["V2 alone", 0.47, 1.55, "—"],
      ["Superposition sum", 2.02, 6.67, "1.55 + 0.47 = 2.02 mA"],
    ],
  },
};

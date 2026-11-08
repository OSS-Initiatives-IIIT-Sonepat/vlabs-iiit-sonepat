import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Branch currents are positive when they enter node A. $I_2$ is negative because node A is above V2, so that current leaves the node. " +
      "The current column $I_1 + I_2 - I_3$ and both loop sums are zero.",
  ],
  table: {
    headers: [
      "Condition",
      "$I_1$ (mA)",
      "$I_2$ (mA)",
      "$I_3$ (mA)",
      "$I_1+I_2-I_3$ (mA)",
      "$V_{R1}$ (V)",
      "$V_{R2}$ (V)",
      "$V_{R3}$ (V)",
      "KVL L1 (V)",
      "KVL L2 (V)",
    ],
    rows: [
      ["V1=9 V, V2=6 V", 2.33, -0.31, 2.02, 0.0, 2.33, -0.67, 6.67, 0.0, 0.0],
      [
        "V1=12 V, V2=6 V",
        3.62,
        -1.08,
        2.54,
        0.0,
        3.62,
        -2.38,
        8.38,
        0.0,
        0.0,
      ],
    ],
  },
};

import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "A is tied to 1101, written A0 A1 A2 A3. H0 and H1 are the upper lamps, left then right. H2 and H3 are the lower lamps, left then right. Read the four lamps as H0 H1 H2 H3.",
    "With S = 0 and IR = 0 the lamps read 0110, a logical shift right. With S = 1 and IL = 0 they read 1010, a logical shift left.",
    "Circular right ties IR to A3, so IR = 1 and the lamps read 1110. Circular left ties IL to A0, so IL = 1 and the lamps read 1011.",
    "Arithmetic right also reads 1110, because the sign bit A0 is 1, the same value A3 happens to have. Arithmetic left reads 1010, the same pattern as the logical shift left.",
  ],
  table: {
    headers: ["S", "H0", "H1", "H2", "H3"],
    rows: [
      ["0", "IR", "A0", "A1", "A2"],
      ["1", "A1", "A2", "A3", "IL"],
    ],
  },
};

import { type ObservationSection } from "@/labs/lab-content.types";
export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Open-circuit voltage, Thevenin resistance, and the two load checks. The original network and the equivalent read the same load voltage and current.",
  ],
  table: {
    headers: ["Parameter", "Value"],
    rows: [
      ["$V_{th}$", "6.19 V"],
      ["$R_{th}$", "688 Ω"],
      ["$V_L$, $I_L$ with 3.3 kΩ", "5.12 V, 1.55 mA"],
      ["$V_L$, $I_L$ with 4.7 kΩ", "5.40 V, 1.15 mA"],
    ],
  },
};

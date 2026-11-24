import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "The tank voltage is held at 2 V peak-to-peak. Line current is a minimum at $f_0$. $Q = f_0 / (f_2 - f_1)$ and also $Q = I_C / I$ at resonance.",
  ],
  table: {
    headers: [
      "R",
      "L",
      "C",
      "f0 (kHz)",
      "Imin (mA)",
      "f1 (kHz)",
      "f2 (kHz)",
      "Q",
    ],
    rows: [
      ["1 kΩ", "10 mH", "0.1 µF", "5.03", "2.00", "4.30", "5.89", "3.16"],
      ["470 Ω", "10 mH", "0.1 µF", "5.03", "4.26", "3.62", "7.00", "1.49"],
      ["1 kΩ", "10 mH", "0.22 µF", "3.39", "2.00", "3.05", "3.77", "4.69"],
    ],
  },
};

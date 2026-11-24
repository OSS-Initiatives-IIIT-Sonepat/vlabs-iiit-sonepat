import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Each secondary half is 12 V rms, 50 Hz. $V_m = 16.97\\,\\mathrm{V}$. The load is $1\\,\\mathrm{k}\\Omega$. Ripple frequency of the unfiltered output is 100 Hz.",
  ],
  table: {
    headers: ["Condition", "Vdc (V)", "Ripple", "Idc (mA)"],
    rows: [
      ["No filter", "10.36", "16.3 V peak, 100 Hz", "10.36"],
      ["100 µF across the load", "15.75", "1.04 V peak-to-peak", "15.75"],
    ],
  },
};

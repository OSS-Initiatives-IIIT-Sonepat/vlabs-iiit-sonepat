import { type ObservationSection } from "@/labs/lab-content.types";
export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Short-circuit current, Norton resistance, and the load check. $6.19\\,\\text{V} / 688\\,\\Omega$ is 9.00 mA.",
  ],
  table: {
    headers: ["Parameter", "Reading"],
    rows: [
      ["$V_{oc} = V_{th}$", "6.19 V"],
      ["$I_N$", "9.00 mA"],
      ["$R_N$", "688 Ω"],
      ["$V_L$ with $R_L = 3.3\\,\\text{k}\\Omega$", "5.12 V"],
      ["$I_L$ with $R_L = 3.3\\,\\text{k}\\Omega$", "1.55 mA"],
    ],
  },
};

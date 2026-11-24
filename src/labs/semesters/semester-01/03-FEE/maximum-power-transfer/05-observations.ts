import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "$V_s = 9.00\\,\\mathrm{V}$ and $R_s = 100\\,\\Omega$. Load power is $P_L = V_L I_L$. The theorem says $P_L$ is greatest when $R_L = R_s$, and $P_{max} = V_s^2 / (4 R_s) = 202.5\\,\\mathrm{mW}$.",
  ],
  table: {
    headers: ["RL (Ω)", "IL (mA)", "VL (V)", "PL (mW)", "PL / Pmax"],
    rows: [
      ["47", "61.2", "2.88", "176.3", "0.87"],
      ["100", "45.0", "4.50", "202.5", "1.00"],
      ["220", "28.1", "6.19", "174.0", "0.86"],
    ],
  },
};

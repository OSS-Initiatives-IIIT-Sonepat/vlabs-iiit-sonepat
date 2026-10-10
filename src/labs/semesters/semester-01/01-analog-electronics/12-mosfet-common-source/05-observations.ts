import { type LabSection } from "@/labs/lab-content.types";

export const observations: LabSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "DC characteristics: set V_DD = 10 V and R_D = 1 kΩ. Vary V_GG and record V_GS, I_D and V_DS in the table. Identify the region of operation from the readings.",
    "AC response: with the Q-point at V_GS ≈ 3 V, apply a 1 kHz sine wave of 100 mV peak-to-peak and record the peak-to-peak output voltage and the phase relation between input and output.",
  ],
  table: {
    headers: ["S.No.", "V_GS (V)", "I_D (mA)", "V_DS (V)", "Region"],
    rows: [
      ["1", "2.0", "", "", ""],
      ["2", "2.5", "", "", ""],
      ["3", "2.8", "", "", ""],
      ["4", "3.0", "", "", ""],
      ["5", "3.2", "", "", ""],
      ["6", "3.4", "", "", ""],
    ],
  },
};

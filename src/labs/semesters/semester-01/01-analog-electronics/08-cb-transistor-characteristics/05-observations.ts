import { type ObservationSection } from "@/labs/lab-content.types";

export const observationsInput: ObservationSection = {
  id: "observations-input",
  type: "observation",
  title: "Observations: Input Characteristics",
  paragraphs: [
    "Keep $V_{CB}$ constant (0 V, then 5 V). Vary $V_{EE}$ and record $V_{EB}$ and $I_E$. Plot $I_E$ (y-axis) against $V_{EB}$ (x-axis) for both values of $V_{CB}$.",
  ],
  table: {
    headers: [
      "S.No.",
      "VEB (V)",
      "IE (mA) at VCB = 0 V",
      "VEB (V)",
      "IE (mA) at VCB = 5 V",
    ],
    rows: [
      ["1", "", "", "", ""],
      ["2", "", "", "", ""],
      ["3", "", "", "", ""],
      ["4", "", "", "", ""],
      ["5", "", "", "", ""],
      ["6", "", "", "", ""],
      ["7", "", "", "", ""],
      ["8", "", "", "", ""],
    ],
  },
};

export const observationsOutput: ObservationSection = {
  id: "observations-output",
  type: "observation",
  title: "Observations: Output Characteristics",
  paragraphs: [
    "Keep $I_E$ constant (2 mA, 4 mA, then 6 mA) by adjusting $V_{EE}$. Vary $V_{CC}$ so that $V_{CB}$ takes the values below and record $I_C$. Plot $I_C$ (y-axis) against $V_{CB}$ (x-axis) for each $I_E$.",
    "Calculations: $r_i = \\Delta V_{EB} / \\Delta I_E$ (at constant $V_{CB}$), $r_o = \\Delta V_{CB} / \\Delta I_C$ (at constant $I_E$), $\\alpha = \\Delta I_C / \\Delta I_E$ (at constant $V_{CB}$).",
  ],
  table: {
    headers: [
      "S.No.",
      "VCB (V)",
      "IC (mA) at IE = 2 mA",
      "IC (mA) at IE = 4 mA",
      "IC (mA) at IE = 6 mA",
    ],
    rows: [
      ["1", "0", "", "", ""],
      ["2", "0.5", "", "", ""],
      ["3", "1", "", "", ""],
      ["4", "2", "", "", ""],
      ["5", "4", "", "", ""],
      ["6", "6", "", "", ""],
      ["7", "8", "", "", ""],
      ["8", "10", "", "", ""],
    ],
  },
};

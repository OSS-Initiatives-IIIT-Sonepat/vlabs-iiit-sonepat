import { type ObservationSection } from "@/labs/lab-content.types";

export const observationsInput: ObservationSection = {
  id: "observations-input",
  type: "observation",
  title: "Observations: Input Characteristics",
  paragraphs: [
    "$R_B = 100\\,\\mathrm{k}\\Omega$. $I_B = (V_{BB} - V_{BE}) / R_B$. The $V_{CE} = 0$ curve sits about $0.02\\,\\mathrm{V}$ to the right of the active curve.",
  ],
  table: {
    headers: ["VBB (V)", "VBE (V)", "IB (µA)", "VCE (V)"],
    rows: [
      ["2.67", "0.67", "20", "5"],
      ["4.69", "0.69", "40", "5"],
      ["6.70", "0.70", "60", "5"],
      ["4.71", "0.71", "40", "0"],
    ],
  },
};

export const observationsOutput: ObservationSection = {
  id: "observations-output",
  type: "observation",
  title: "Observations: Output Characteristics",
  paragraphs: [
    "At $I_B = 40\\,\\mu\\mathrm{A}$, $r_o = (5.00 - 2.00)\\,\\mathrm{V} / (4.10 - 4.04)\\,\\mathrm{mA} = 50\\,\\mathrm{k}\\Omega$. At $V_{CE} = 5\\,\\mathrm{V}$, $\\beta = 4.10\\,\\mathrm{mA} / 40\\,\\mu\\mathrm{A} = 102.5$. $r_i = (0.69 - 0.67)\\,\\mathrm{V} / 20\\,\\mu\\mathrm{A} = 1.0\\,\\mathrm{k}\\Omega$.",
  ],
  table: {
    headers: ["IB (µA)", "VCE (V)", "IC (mA)"],
    rows: [
      ["40", "2.00", "4.04"],
      ["20", "5.00", "2.05"],
      ["40", "5.00", "4.10"],
      ["60", "5.00", "6.15"],
    ],
  },
};

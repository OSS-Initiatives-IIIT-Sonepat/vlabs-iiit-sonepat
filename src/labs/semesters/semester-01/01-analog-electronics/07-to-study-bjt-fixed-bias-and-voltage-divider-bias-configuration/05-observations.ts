import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Transistor: BC547 NPN ($h_{FE} = \\beta \\approx 200$, $V_{BE} \\approx 0.70\\text{ V}$), Supply: $V_{CC} = 12.0\\text{ V}$.",
    "Measurements were recorded for both biasing configurations at room temperature ($25^\\circ\\text{C}$) and under thermal disturbance ($50^\\circ\\text{C}$) to observe Q-point displacement.",
  ],
  table: {
    headers: [
      "Parameter",
      "Fixed Bias (Theoretical)",
      "Fixed Bias (Measured)",
      "Voltage Divider (Theoretical)",
      "Voltage Divider (Measured)",
    ],
    rows: [
      ["Base Voltage $V_B$ (V)", "0.70", "0.71", "1.09", "1.10"],
      ["Base Current $I_B$ ($\\mu$A)", "24.0", "23.8", "2.1", "2.0"],
      ["Emitter Voltage $V_E$ (V)", "0.00", "0.00", "0.39", "0.40"],
      ["Collector Current $I_C$ (mA)", "4.80", "2.40 (sat)", "0.39", "0.39"],
      [
        "Collector-Emitter Voltage $V_{CE}$ (V)",
        "0.20 (sat)",
        "0.72",
        "9.78",
        "9.75",
      ],
      [
        "Operating Region",
        "Saturation",
        "Near Saturation",
        "Active (Linear)",
        "Active (Linear)",
      ],
      [
        "Shift in $I_C$ with $\\Delta T = +25^\\circ\\text{C}$",
        "+110%",
        "+95%",
        "+4.8%",
        "+4.2%",
      ],
      ["Stability Factor $S$", "201", "201", "1.95", "1.98"],
    ],
  },
};

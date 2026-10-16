import { type TheorySection } from "@/labs/lab-content.types";
import { step04 as circuitDiagram } from "@/labs/schematics/semester-01/03-FEE/thevenin-theorem";
export const theory: TheorySection = {
  circuitDiagram,
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Thevenin's Theorem: any linear two-terminal network can be replaced by a single voltage source $V_{th}$ (open-circuit voltage at the terminals) in series with a single resistance $R_{th}$ (equivalent resistance with all sources killed).",
    "This simplifies analysis of circuits with varying loads. Load current: $I_L = V_{th}/(R_{th} + R_L)$. Load voltage: $V_L = I_L \\cdot R_L$.",
    "Finding $V_{th}$ experimentally: remove load, measure open-circuit voltage. Finding $R_{th}$: kill all sources, measure resistance at terminals. Alternative: $R_{th} = V_{th}/I_{sc}$.",
    "In this experiment $V_{th}$ and $R_{th}$ are found both theoretically and experimentally. The Thevenin equivalent is rebuilt on the breadboard and load voltages are compared with the original network for two load values.",
  ],
};

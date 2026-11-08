import { type TheorySection } from "@/labs/lab-content.types";
import { theoryDiagram as circuitDiagram } from "@/labs/schematics/semester-01/03-FEE/norton-theorem";
export const theory: TheorySection = {
  id: "theory",
  circuitDiagram,
  type: "text",
  title: "Theory",
  paragraphs: [
    "Norton's Theorem: any linear two-terminal network can be replaced by a current source $I_N$ (short-circuit current between the terminals) in parallel with resistance $R_N$ (same as $R_{th}$).",
    "Norton's and Thevenin's theorems are dual representations. They are related by source transformation: $V_{th} = I_N \\cdot R_N$ and $R_{th} = R_N$.",
    "To find $I_N$ experimentally: short-circuit the output terminals A-B with an ammeter and measure $I_{sc} = I_N$. To find $R_N$: kill sources and measure resistance at A-B.",
    "In this experiment $V_{oc}$, $I_N$, and $R_N$ are measured on the one divider. $I_N = V_{oc}/R_N$ is checked, then the 3.3 k$\\Omega$ load is connected. A Norton source of $I_N$ in parallel with $R_N$ predicts that same load voltage.",
  ],
};

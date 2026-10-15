import { type TheorySection } from "@/labs/lab-content.types";
import { step01 as circuitDiagram } from "@/labs/schematics/superposition-theorem-schematics";
export const theory: TheorySection = {
  circuitDiagram,
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The Superposition Theorem: in any linear bilateral network with multiple independent sources, the response at any element equals the algebraic sum of responses produced by each source acting alone, with all other sources replaced by their internal impedances.",
    "The theorem is valid because linearity guarantees the response to multiple simultaneous inputs equals the sum of individual responses. It does **not** apply to non-linear elements (diodes, transistors in active region).",
    "Procedure: (1) Kill all sources except one — voltage sources → short circuit, current sources → open circuit. (2) Analyse the simplified circuit. (3) Repeat for each source. (4) Sum all partial responses algebraically.",
    "This experiment uses a two-source resistor network. Load current is measured with both sources active, then with each alone. The algebraic sum of the partial currents is compared with the total to verify the theorem.",
  ],
};

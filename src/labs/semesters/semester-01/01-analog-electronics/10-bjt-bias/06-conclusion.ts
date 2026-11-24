import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "Both biasing configurations were assembled and their Q-points measured. The fixed-bias circuit produced a collector current strongly dependent on $\\beta$: when $\\beta$ doubled from 100 to 200, the base current called for twice the collector current — more than the 2.5 mA that $R_C$ allows — so the transistor went into saturation. This confirms that fixed bias is unsuitable for mass-production circuits where transistor parameters vary.",
    "The voltage-divider bias circuit maintained $I_C \\approx 0.39\\,\\text{mA}$ and $V_{CE} \\approx 9.8\\,\\text{V}$ regardless of whether $\\beta = 100$, 200, or 300. The emitter degeneration resistor $R_E$ provides negative feedback that stabilises the Q-point thermally — a cornerstone of practical BJT amplifier design.",
    "The experiment validates that VDB is the preferred biasing method for discrete BJT circuits. The design rule $R_{TH} \\leq 0.1 \\beta R_E$ was satisfied ($R_{TH} = 9.1\\,\\text{k}\\Omega$, $0.1 \\times 200 \\times 1\\,\\text{k} = 20\\,\\text{k}\\Omega$), ensuring the Thévenin voltage source approximation holds and the Q-point remains $\\beta$-independent.",
  ],
};

import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const conclusion: Section = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The current in the series RLC circuit rose to a sharp maximum at about 5 kHz and fell on either side. At this frequency the current was in phase with the applied voltage, which confirms resonance at f0 = 1 / (2π√LC) ≈ 5.03 kHz.",
    "The half-power frequencies were about 4.3 kHz and 5.9 kHz, giving a bandwidth of about 1.6 kHz and a quality factor of about 3.2, close to the theoretical Q = (1/R)√(L/C). Below resonance the circuit behaved capacitively (current leading) and above resonance inductively (current lagging). The voltage across the capacitor at resonance was about Q times the input voltage.",
    "The measured peak current and Q are slightly lower than the ideal values because the winding resistance of the inductor and the output resistance of the generator add to R. Component tolerances shift f0 slightly.",
  ],
};

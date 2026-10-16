import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const conclusion: Section = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The capacitor voltage rose and fell exponentially rather than instantly when the square-wave input switched. The capacitor reached 63.2% of the final voltage after one time constant while charging, and fell to 36.8% after one time constant while discharging.",
    "The measured time constant was about 1 ms for R = 10 kΩ and about 0.47 ms for R = 4.7 kΩ with C = 0.1 µF, which agrees with τ = RC. The time constant is proportional to R, and the capacitor was effectively fully charged after 5τ.",
    "Errors arise from component tolerances, the output resistance of the generator (which adds to R), the 10 MΩ input resistance and capacitance of the CRO probe, and the difficulty of reading the 63.2% crossing on the graticule.",
  ],
};

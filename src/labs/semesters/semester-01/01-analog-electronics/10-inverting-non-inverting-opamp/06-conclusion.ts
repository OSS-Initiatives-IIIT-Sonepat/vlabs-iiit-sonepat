import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const conclusion: Section = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The inverting amplifier built with the LM741 gave an output that was 180° out of phase with the input, and its gain agreed with the theoretical value −Rf / Rin for Rf = 100 kΩ, 47 kΩ and 22 kΩ with Rin = 10 kΩ.",
    "The non-inverting amplifier gave an output that was in phase with the input, and its gain agreed with the theoretical value 1 + Rf / R1 for the same values of Rf with R1 = 10 kΩ.",
    "The small differences between measured and theoretical gains arise from the ±5% tolerance of the resistors, the finite open-loop gain of the op-amp at 1 kHz (of the order of 1% for the gains used here) and the reading accuracy of the oscilloscope. The gain of both circuits is fixed by the ratio of the external resistors, which is the benefit of negative feedback. When the amplified peaks would exceed the supply limits the output is clipped, so the input amplitude must be kept small enough to avoid saturation.",
  ],
};

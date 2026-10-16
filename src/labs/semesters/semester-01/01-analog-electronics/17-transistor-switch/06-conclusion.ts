import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const conclusion: Section = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "With 0 V at the input the transistor was in cut-off: VBE was about 0 V, VCE was about 5 V and the LED was off. With 5 V at the input through 10 kΩ the transistor was saturated: VBE was about 0.7 V, VCE fell to about 0.1 V and the LED was fully on with about 9 mA flowing. The transistor therefore worked as a switch controlled by the base input.",
    "With a 1 MΩ base resistor the base current (about 4 µA) was too small to saturate the transistor. It stayed in the active region with Ic ≈ hFE × Ib, VCE was about 3 V and the LED was only dimly lit. For reliable switching the base resistor must supply more than Ic(sat) / hFE, with a margin for the spread of hFE.",
  ],
};

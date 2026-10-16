import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const conclusion: Section = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The RC low-pass filter passed low frequencies with almost no attenuation and attenuated high frequencies, with the output lagging the input. The RC high-pass filter did the opposite, with the output leading the input.",
    "For both filters the output fell to 0.707 of the input (−3 dB) and the phase shift was ±45° at about 1.59 kHz, which agrees with the theoretical cut-off frequency fc = 1 / (2πRC). Well beyond the cut-off the response changed by about 20 dB per decade, as expected for a first-order filter.",
    "Differences between measured and theoretical values come from the tolerance of the resistor (±5%) and capacitor (±10%), the output impedance of the generator, the input capacitance of the CRO probe at high frequencies and the reading accuracy of the CRO graticule.",
  ],
};

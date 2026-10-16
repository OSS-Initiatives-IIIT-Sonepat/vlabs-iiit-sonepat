import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const aim: Section = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To construct first-order RC low-pass and high-pass filters, to measure their output voltage and phase shift over a range of input frequencies, to plot the frequency response (gain in dB against log frequency) and to verify that the cut-off frequency is fc = 1 / (2πRC).",
  ],
};

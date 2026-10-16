import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const aim: Section = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To study the frequency response of a series RLC circuit, to determine its resonant frequency f0, half-power frequencies f1 and f2, bandwidth and quality factor Q, and to compare them with the theoretical values f0 = 1 / (2π√LC) and Q = (1/R)√(L/C).",
  ],
};

import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const aim: Section = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To study the charging and discharging of a capacitor through a resistor using a square-wave input, to measure the time constant τ of the RC circuit on the CRO, and to verify that τ = RC.",
  ],
};

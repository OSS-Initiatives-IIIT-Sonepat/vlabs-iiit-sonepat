import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const bcdXs3ConverterExperiment: ExperimentDefinition = {
  id: "bcd-xs3-converter",
  title: "BCD to Excess-3 Code Converter",
  description:
    "Design and verify BCD to Excess-3 code converter using standard 74HC series logic gate ICs on a solderless breadboard.",
  truthTable: {
    inputs: ["A", "B", "C", "D"],
    outputs: ["W", "X", "Y", "Z"],
    rows: [
      {
        inputs: { A: 0, B: 0, C: 0, D: 0 },
        outputs: { W: 0, X: 0, Y: 1, Z: 1 },
      },
      {
        inputs: { A: 0, B: 0, C: 0, D: 1 },
        outputs: { W: 0, X: 1, Y: 0, Z: 0 },
      },
      {
        inputs: { A: 0, B: 0, C: 1, D: 0 },
        outputs: { W: 0, X: 1, Y: 0, Z: 1 },
      },
      {
        inputs: { A: 0, B: 0, C: 1, D: 1 },
        outputs: { W: 0, X: 1, Y: 1, Z: 0 },
      },
      {
        inputs: { A: 0, B: 1, C: 0, D: 0 },
        outputs: { W: 0, X: 1, Y: 1, Z: 1 },
      },
      {
        inputs: { A: 0, B: 1, C: 0, D: 1 },
        outputs: { W: 1, X: 0, Y: 0, Z: 0 },
      },
      {
        inputs: { A: 0, B: 1, C: 1, D: 0 },
        outputs: { W: 1, X: 0, Y: 0, Z: 1 },
      },
      {
        inputs: { A: 0, B: 1, C: 1, D: 1 },
        outputs: { W: 1, X: 0, Y: 1, Z: 0 },
      },
      {
        inputs: { A: 1, B: 0, C: 0, D: 0 },
        outputs: { W: 1, X: 0, Y: 1, Z: 1 },
      },
      {
        inputs: { A: 1, B: 0, C: 0, D: 1 },
        outputs: { W: 1, X: 1, Y: 0, Z: 0 },
      },
    ],
  },
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const BcdXs3ConverterCircuit = buildCircuit(bcdXs3ConverterExperiment);
export const BcdXs3ConverterContent = buildLabContent(
  bcdXs3ConverterExperiment,
);

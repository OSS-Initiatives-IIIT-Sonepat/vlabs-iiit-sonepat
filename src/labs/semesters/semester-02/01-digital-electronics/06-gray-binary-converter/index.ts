import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const grayBinaryConverterExperiment: ExperimentDefinition = {
  id: "gray-binary-converter",
  title: "Gray Code to Binary and Binary to Gray Code Converters",
  description:
    "Design and verify 4-bit Binary to Gray code converter and Gray code to binary converter using 74HC86 XOR gate ICs on a solderless breadboard.",
  truthTable: {
    inputs: ["B3", "B2", "B1", "B0"],
    outputs: ["G3", "G2", "G1", "G0"],
    rows: [
      {
        inputs: { B3: 0, B2: 0, B1: 0, B0: 0 },
        outputs: { G3: 0, G2: 0, G1: 0, G0: 0 },
      },
      {
        inputs: { B3: 0, B2: 0, B1: 0, B0: 1 },
        outputs: { G3: 0, G2: 0, G1: 0, G0: 1 },
      },
      {
        inputs: { B3: 0, B2: 0, B1: 1, B0: 0 },
        outputs: { G3: 0, G2: 0, G1: 1, G0: 1 },
      },
      {
        inputs: { B3: 0, B2: 0, B1: 1, B0: 1 },
        outputs: { G3: 0, G2: 0, G1: 1, G0: 0 },
      },
      {
        inputs: { B3: 0, B2: 1, B1: 0, B0: 0 },
        outputs: { G3: 0, G2: 1, G1: 1, G0: 0 },
      },
      {
        inputs: { B3: 0, B2: 1, B1: 0, B0: 1 },
        outputs: { G3: 0, G2: 1, G1: 1, G0: 1 },
      },
      {
        inputs: { B3: 0, B2: 1, B1: 1, B0: 0 },
        outputs: { G3: 0, G2: 1, G1: 0, G0: 1 },
      },
      {
        inputs: { B3: 0, B2: 1, B1: 1, B0: 1 },
        outputs: { G3: 0, G2: 1, G1: 0, G0: 0 },
      },
      {
        inputs: { B3: 1, B2: 0, B1: 0, B0: 0 },
        outputs: { G3: 1, G2: 1, G1: 0, G0: 0 },
      },
      {
        inputs: { B3: 1, B2: 0, B1: 0, B0: 1 },
        outputs: { G3: 1, G2: 1, G1: 0, G0: 1 },
      },
      {
        inputs: { B3: 1, B2: 0, B1: 1, B0: 0 },
        outputs: { G3: 1, G2: 1, G1: 1, G0: 1 },
      },
      {
        inputs: { B3: 1, B2: 0, B1: 1, B0: 1 },
        outputs: { G3: 1, G2: 1, G1: 1, G0: 0 },
      },
      {
        inputs: { B3: 1, B2: 1, B1: 0, B0: 0 },
        outputs: { G3: 1, G2: 0, G1: 1, G0: 0 },
      },
      {
        inputs: { B3: 1, B2: 1, B1: 0, B0: 1 },
        outputs: { G3: 1, G2: 0, G1: 1, G0: 1 },
      },
      {
        inputs: { B3: 1, B2: 1, B1: 1, B0: 0 },
        outputs: { G3: 1, G2: 0, G1: 0, G0: 1 },
      },
      {
        inputs: { B3: 1, B2: 1, B1: 1, B0: 1 },
        outputs: { G3: 1, G2: 0, G1: 0, G0: 0 },
      },
    ],
  },
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const GrayBinaryConverterCircuit = buildCircuit(
  grayBinaryConverterExperiment,
);
export const GrayBinaryConverterContent = buildLabContent(
  grayBinaryConverterExperiment,
);

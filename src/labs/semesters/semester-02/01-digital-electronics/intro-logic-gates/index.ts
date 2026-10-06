import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const introLogicGatesExperiment: ExperimentDefinition = {
  id: "intro-logic-gates",
  title: "Introduction of Digital Logic Gates",
  description:
    "Investigate the logic behaviour of NOT, AND, OR, NAND, NOR, EX-OR and EX-NOR gates by verifying their truth tables on a breadboard.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
  truthTable: {
    inputs: ["A", "B"],
    outputs: ["NOT", "AND", "OR", "NAND", "NOR", "XOR", "XNOR"],
    rows: [
      {
        inputs: { A: 0, B: 0 },
        outputs: { NOT: 1, AND: 0, OR: 0, NAND: 1, NOR: 1, XOR: 0, XNOR: 1 },
      },
      {
        inputs: { A: 0, B: 1 },
        outputs: { NOT: 1, AND: 0, OR: 1, NAND: 1, NOR: 0, XOR: 1, XNOR: 0 },
      },
      {
        inputs: { A: 1, B: 0 },
        outputs: { NOT: 0, AND: 0, OR: 1, NAND: 1, NOR: 0, XOR: 1, XNOR: 0 },
      },
      {
        inputs: { A: 1, B: 1 },
        outputs: { NOT: 0, AND: 1, OR: 1, NAND: 0, NOR: 0, XOR: 0, XNOR: 1 },
      },
    ],
  },
};

export const IntroLogicGatesCircuit = buildCircuit(introLogicGatesExperiment);
export const IntroLogicGatesContent = buildLabContent(
  introLogicGatesExperiment,
);

import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const fullAdderExperiment: ExperimentDefinition = {
  id: "full-adder",
  title: "Full Adder",
  description:
    "Study of a 1-bit full adder built from XOR, AND and OR gates: Sum = A ⊕ B ⊕ Cin, Cout = A·B + Cin·(A ⊕ B).",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
  truthTable: {
    inputs: ["A", "B", "Cin"],
    outputs: ["Sum", "Cout"],
    rows: [
      { inputs: { A: 0, B: 0, Cin: 0 }, outputs: { Sum: 0, Cout: 0 } },
      { inputs: { A: 0, B: 0, Cin: 1 }, outputs: { Sum: 1, Cout: 0 } },
      { inputs: { A: 0, B: 1, Cin: 0 }, outputs: { Sum: 1, Cout: 0 } },
      { inputs: { A: 0, B: 1, Cin: 1 }, outputs: { Sum: 0, Cout: 1 } },
      { inputs: { A: 1, B: 0, Cin: 0 }, outputs: { Sum: 1, Cout: 0 } },
      { inputs: { A: 1, B: 0, Cin: 1 }, outputs: { Sum: 0, Cout: 1 } },
      { inputs: { A: 1, B: 1, Cin: 0 }, outputs: { Sum: 0, Cout: 1 } },
      { inputs: { A: 1, B: 1, Cin: 1 }, outputs: { Sum: 1, Cout: 1 } },
    ],
  },
};

export const FullAdderCircuit = buildCircuit(fullAdderExperiment);
export const FullAdderContent = buildLabContent(fullAdderExperiment);

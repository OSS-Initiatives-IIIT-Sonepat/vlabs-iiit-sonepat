import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { procedureSteps } from "./04-procedure";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";

export const fullSubtractorExperiment: ExperimentDefinition = {
  id: "full-subtractor",
  title: "Full Subtractor",
  description:
    "Study of a 1-bit full subtractor: Difference = A ⊕ B ⊕ Bin and Borrow = A'·B + Bin·(A ⊕ B)', built from XOR and AND gates.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
  truthTable: {
    inputs: ["A", "B", "Bin"],
    outputs: ["Diff", "Bout"],
    rows: [
      { inputs: { A: 0, B: 0, Bin: 0 }, outputs: { Diff: 0, Bout: 0 } },
      { inputs: { A: 0, B: 0, Bin: 1 }, outputs: { Diff: 1, Bout: 1 } },
      { inputs: { A: 0, B: 1, Bin: 0 }, outputs: { Diff: 1, Bout: 1 } },
      { inputs: { A: 0, B: 1, Bin: 1 }, outputs: { Diff: 0, Bout: 1 } },
      { inputs: { A: 1, B: 0, Bin: 0 }, outputs: { Diff: 1, Bout: 0 } },
      { inputs: { A: 1, B: 0, Bin: 1 }, outputs: { Diff: 0, Bout: 0 } },
      { inputs: { A: 1, B: 1, Bin: 0 }, outputs: { Diff: 0, Bout: 0 } },
      { inputs: { A: 1, B: 1, Bin: 1 }, outputs: { Diff: 1, Bout: 1 } },
    ],
  },
};

export const FullSubtractorCircuit = buildCircuit(fullSubtractorExperiment);
export const FullSubtractorContent = buildLabContent(fullSubtractorExperiment);

import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const wallaceTreeExperiment: ExperimentDefinition = {
  id: "wallace-tree",
  title: "Wallace Tree Multiplier",
  description:
    "Sum partial products in a Wallace tree so an n-bit multiply finishes in O(log n) adder stages.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const WallaceTreeCircuit = buildCircuit(wallaceTreeExperiment);
export const WallaceTreeContent = buildLabContent(wallaceTreeExperiment);

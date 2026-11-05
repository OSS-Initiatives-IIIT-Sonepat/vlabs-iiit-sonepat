import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const triStateBusExperiment: ExperimentDefinition = {
  id: "tri-state-bus",
  title: "Common Bus System using Decoder and Tri-State Buffer",
  description:
    "Put A0, B0, C0, or D0 on one bus line. A 2×4 decoder enables a single tri-state buffer and leaves the other three in high impedance.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const TriStateBusCircuit = buildCircuit(triStateBusExperiment);
export const TriStateBusContent = buildLabContent(triStateBusExperiment);

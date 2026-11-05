import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const boothAlgorithmExperiment: ExperimentDefinition = {
  id: "booth-algorithm",
  title: "Booth's Algorithm",
  description: "Multiply (−9) by (−13) by inspecting Q0 and Q−1. The product is 117.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const BoothAlgorithmCircuit = buildCircuit(boothAlgorithmExperiment);
export const BoothAlgorithmContent = buildLabContent(boothAlgorithmExperiment);

import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const microprogrammedControlExperiment: ExperimentDefinition = {
  id: "microprogrammed-control",
  title: "Microprogrammed Control",
  description: "Use a counter as the control address register and read one control word from a ROM.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};
export const MicroprogrammedControlCircuit = buildCircuit(microprogrammedControlExperiment);
export const MicroprogrammedControlContent = buildLabContent(microprogrammedControlExperiment);

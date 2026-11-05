import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const basicComputerExperiment: ExperimentDefinition = {
  id: "basic-computer",
  title: "Basic Computer",
  description: "Clock a small CPU through two memory words, then read direct and indirect addressing.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};
export const BasicComputerCircuit = buildCircuit(basicComputerExperiment);
export const BasicComputerContent = buildLabContent(basicComputerExperiment);

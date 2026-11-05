import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const timingAndControlExperiment: ExperimentDefinition = {
  id: "timing-and-control",
  title: "Timing and Control",
  description: "Follow a direct ADD from T0 through T5, and watch the sequence counter reset.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const TimingAndControlCircuit = buildCircuit(timingAndControlExperiment);
export const TimingAndControlContent = buildLabContent(timingAndControlExperiment);

import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const osiModelJourneyExperiment: ExperimentDefinition = {
  id: "osi-model-journey",
  title: "Step-by-Step Journey Through the OSI Model",
  description:
    "Follow one web request from a laptop to a web server, and watch each of the seven layers add its block on the way down and remove it on the way up.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const OsiModelJourneyCircuit = buildCircuit(osiModelJourneyExperiment);
export const OsiModelJourneyContent: LabContent = {
  ...buildLabContent(osiModelJourneyExperiment),
  scene: "osi",
};

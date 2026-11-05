import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const ioOrganisationExperiment: ExperimentDefinition = {
  id: "io-organisation",
  title: "I/O Organisation",
  description: "Strobe a byte into an I/O port, watch the flag, and then read the transfer methods.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};
export const IoOrganisationCircuit = buildCircuit(ioOrganisationExperiment);
export const IoOrganisationContent = buildLabContent(ioOrganisationExperiment);

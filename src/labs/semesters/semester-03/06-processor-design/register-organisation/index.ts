import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const registerOrganisationExperiment: ExperimentDefinition = {
  id: "register-organisation",
  title: "Register Organisation",
  description: "Read one of two registers through a multiplexer, then follow a memory stack and three addressing modes.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};
export const RegisterOrganisationCircuit = buildCircuit(registerOrganisationExperiment);
export const RegisterOrganisationContent = buildLabContent(registerOrganisationExperiment);

import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const addressSequencingExperiment: ExperimentDefinition = {
  id: "address-sequencing",
  title: "Address Sequencing",
  description: "Choose the next microaddress by increment, mapping, branch, or return.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const AddressSequencingCircuit = buildCircuit(addressSequencingExperiment);
export const AddressSequencingContent = buildLabContent(addressSequencingExperiment);

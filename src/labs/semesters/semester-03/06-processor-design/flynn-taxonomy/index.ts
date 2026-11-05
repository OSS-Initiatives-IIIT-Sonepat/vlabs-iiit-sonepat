import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const flynnTaxonomyExperiment: ExperimentDefinition = {
  id: "flynn-taxonomy",
  title: "Flynn's Taxonomy",
  description: "Classify a single CPU as SISD and an array as SIMD.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const FlynnTaxonomyCircuit = buildCircuit(flynnTaxonomyExperiment);
export const FlynnTaxonomyContent = buildLabContent(flynnTaxonomyExperiment);

import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const boothTraceExperiment: ExperimentDefinition = {
  id: "booth-trace",
  title: "Booth Multiplication Trace",
  description:
    "Step through Booth's algorithm for (−9) × (−13) and read the product 117.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const BoothTraceCircuit = buildCircuit(boothTraceExperiment);
export const BoothTraceContent = buildLabContent(boothTraceExperiment);

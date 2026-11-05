import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const boothsMultiplierExperiment: ExperimentDefinition = {
  id: "booths-multiplier",
  title: "Booth's Multiplication Algorithm",
  description:
    "Multiply signed two's-complement numbers with Booth's radix-2 recoding of the multiplier bits.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const BoothsMultiplierCircuit = buildCircuit(boothsMultiplierExperiment);
export const BoothsMultiplierContent = buildLabContent(
  boothsMultiplierExperiment,
);

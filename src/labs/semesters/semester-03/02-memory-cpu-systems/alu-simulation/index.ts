import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type ExperimentDefinition } from "@/labs/experiments/types";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { components } from "./components";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { procedureSteps } from "./04-procedure";

export const aluSimulationExperiment: ExperimentDefinition = {
  id: "alu-simulation",
  title: "Arithmetic Logic Unit",
  description:
    "Build a 1-bit ALU from AND, OR, and XOR, and select the operation with a 74HC153.",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const AluSimulationCircuit = buildCircuit(aluSimulationExperiment);
export const AluSimulationContent = buildLabContent(aluSimulationExperiment);

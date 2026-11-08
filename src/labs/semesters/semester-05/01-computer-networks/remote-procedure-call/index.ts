import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { SOCKET_BENCH } from "@/labs/networks/rpc";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const remoteProcedureCallExperiment: ExperimentDefinition = {
  id: "remote-procedure-call",
  title: "Call a Procedure on Another Machine with RPC",
  description:
    "Describe an add() procedure in an RPC interface, generate the stubs with rpcgen, register the server with rpcbind, and follow one call and its reply across the network.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const RemoteProcedureCallCircuit = buildCircuit(
  remoteProcedureCallExperiment,
);
export const RemoteProcedureCallContent: LabContent = {
  ...buildLabContent(remoteProcedureCallExperiment),
  scene: "net",
  bench: SOCKET_BENCH,
};

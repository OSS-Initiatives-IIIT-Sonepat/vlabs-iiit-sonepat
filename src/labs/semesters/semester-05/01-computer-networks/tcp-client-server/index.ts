import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { SOCKET_BENCH } from "@/labs/networks/tcp-socket";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const tcpClientServerExperiment: ExperimentDefinition = {
  id: "tcp-client-server",
  title: "Connection-Oriented Client and Server with TCP Sockets",
  description:
    "Write a TCP echo server and client with sockets, and watch the three-way handshake, the data and its acknowledgements, a lost segment being resent, and the connection closing.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const TcpClientServerCircuit = buildCircuit(tcpClientServerExperiment);
export const TcpClientServerContent: LabContent = {
  ...buildLabContent(tcpClientServerExperiment),
  scene: "net",
  bench: SOCKET_BENCH,
};

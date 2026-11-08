import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { SOCKET_BENCH } from "@/labs/networks/udp-socket";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const udpClientServerExperiment: ExperimentDefinition = {
  id: "udp-client-server",
  title: "Connectionless Client and Server with UDP Sockets",
  description:
    "Write a UDP echo server and client, send datagrams with no connection at all, and see what UDP leaves to the program: lost datagrams, many clients on one socket, and broadcast.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const UdpClientServerCircuit = buildCircuit(udpClientServerExperiment);
export const UdpClientServerContent: LabContent = {
  ...buildLabContent(udpClientServerExperiment),
  scene: "net",
  bench: SOCKET_BENCH,
};

import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ONE_CLIENT } from "@/labs/networks/rpc";
import { theoryDiagram } from "@/labs/schematics/semester-05/01-computer-networks/rpc";

export const step: SceneProcedureStep = {
  label: "One call, two machines",
  body: "The client program will call add(5, 7). The addition will run on the server, and 12 will come back as the return value.\n\nThe corner card shows the layers on each side: the program, a stub generated from the interface, and the RPC library that encodes and sends the messages. On the server, rpcbind keeps track of which port each RPC program uses.",
  show: [],
  schematic: theoryDiagram,
  net: {
    show: ONE_CLIENT,
    note: {
      at: "server",
      title: "Runs here",
      text: "add() executes on the server. The client only sees the return value.",
    },
  },
};

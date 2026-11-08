import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ONE_CLIENT,
  RPC_TABLE_HEADERS,
  RPC_TABLE_ROWS,
} from "@/labs/networks/rpc";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/rpc";

const net: NetFrame = {
  show: ONE_CLIENT,
  hot: ["client"],
  tags: { client: "5 + 7 = 12" },
  consoles: [
    {
      at: "client",
      title: "Terminal · client",
      lines: ["$ ./add_client 192.168.1.20", "5 + 7 = 12"],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "The call returns 12",
  body: "The client stub decodes the REPLY and add_1() returns a pointer to 12. The program prints 5 + 7 = 12.\n\nFrom the program's point of view it called a function and got its result. The network, the port lookup and the encoding were all inside the stub and the RPC library.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(RPC_TABLE_HEADERS, RPC_TABLE_ROWS, 4),
};

import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ONE_CLIENT,
  C_TO_S,
  S_TO_C,
  RPC_TABLE_HEADERS,
  RPC_TABLE_ROWS,
} from "@/labs/networks/rpc";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/rpc";

const net: NetFrame = {
  show: ONE_CLIENT,
  hot: ["server"],
  tags: { server: "✕ add_server stopped" },
  packets: [
    { path: C_TO_S, label: "GETPORT :111", color: "blue" },
    { path: S_TO_C, label: "not registered", color: "red" },
  ],
  consoles: [
    {
      at: "client",
      title: "Terminal · client",
      lines: [
        "$ ./add_client 192.168.1.20",
        "192.168.1.20: RPC: Program not registered",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "When the server is down",
  body: "Stop add_server and run the client again. The server took its entry out of rpcbind as it stopped, so the port lookup fails, and clnt_pcreateerror() prints RPC: Program not registered. If the whole server machine were off, the client would wait for the timeout and print RPC: Timed out instead.\n\nA local function never fails like this. Every RPC client must check for errors and handle a server that is down or a network that lost the message.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(RPC_TABLE_HEADERS, RPC_TABLE_ROWS, 5),
};

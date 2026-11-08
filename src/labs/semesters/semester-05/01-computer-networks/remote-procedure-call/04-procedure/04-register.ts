import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ONE_CLIENT,
  RPC_TABLE_HEADERS,
  RPC_TABLE_ROWS,
} from "@/labs/networks/rpc";
import { rpcFigure } from "@/labs/schematics/semester-05/01-computer-networks/rpc";

export const step: SceneProcedureStep = {
  label: "Start the server: it registers with rpcbind",
  body: "Start rpcbind, then run ./add_server. The server stub opens a socket on a free port, 40123, and tells rpcbind: program 0x23451111, version 1, TCP, port 40123.\n\nrpcinfo -p lists it in decimal, 591728913, next to the portmapper itself on port 111.",
  show: [],
  schematic: rpcFigure(["sstub", "bind"], "set"),
  net: {
    show: ONE_CLIENT,
    hot: ["server"],
    focus: ["server", "sw"],
    tags: { server: "rpcbind :111 · add :40123" },
    consoles: [
      {
        at: "server",
        title: "Terminal · server",
        lines: [
          "$ sudo ./add_server &",
          "$ rpcinfo -p",
          "   program vers proto   port  service",
          "    100000    4   tcp    111  portmapper",
          " 591728913    1   tcp  40123",
        ],
      },
    ],
  },
  table: revealedTable(RPC_TABLE_HEADERS, RPC_TABLE_ROWS, 1),
};

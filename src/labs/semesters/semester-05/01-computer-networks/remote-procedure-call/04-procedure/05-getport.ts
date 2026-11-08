import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ONE_CLIENT,
  C_TO_S,
  S_TO_C,
  RPC_TABLE_HEADERS,
  RPC_TABLE_ROWS,
} from "@/labs/networks/rpc";
import { rpcFigure } from "@/labs/schematics/semester-05/01-computer-networks/rpc";

export const step: SceneProcedureStep = {
  label: "The client asks rpcbind for the port",
  body: "Run ./add_client 192.168.1.20. clnt_create() first asks rpcbind on the server, at port 111, where program 0x23451111 version 1 is. rpcbind answers 40123.\n\nThe client library then connects to port 40123. The client program never sees any of this; it only has a CLIENT handle.",
  show: [],
  schematic: rpcFigure(["crt", "bind"], "getport"),
  net: {
    show: ONE_CLIENT,
    hot: ["client", "server"],
    tags: { server: "rpcbind :111 · add :40123" },
    packets: [
      { path: C_TO_S, label: "GETPORT :111", color: "blue" },
      { path: S_TO_C, label: "port 40123", color: "blue" },
    ],
  },
  table: revealedTable(RPC_TABLE_HEADERS, RPC_TABLE_ROWS, 2),
};

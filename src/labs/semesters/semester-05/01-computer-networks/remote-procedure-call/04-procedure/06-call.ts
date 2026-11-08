import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  ONE_CLIENT,
  C_TO_S,
  RPC_TABLE_HEADERS,
  RPC_TABLE_ROWS,
} from "@/labs/networks/rpc";
import { rpcFigure } from "@/labs/schematics/semester-05/01-computer-networks/rpc";

export const step: SceneProcedureStep = {
  label: "add_1(5, 7): the stub sends a CALL",
  body: "The client program calls add_1(&n, clnt) with a = 5 and b = 7. The client stub encodes them in XDR as two 4-byte big-endian integers, 00 00 00 05 and 00 00 00 07, and sends a CALL message: a transaction id, program 0x23451111, version 1, procedure 1, then the arguments.\n\nThe client program is now blocked inside add_1(), just as in a local call.",
  show: [],
  schematic: rpcFigure(["prog", "cstub", "crt"], "call"),
  net: {
    show: ONE_CLIENT,
    hot: ["client"],
    tags: { server: "rpcbind :111 · add :40123" },
    packets: [{ path: C_TO_S, label: "CALL add 5, 7" }],
    consoles: [
      {
        at: "client",
        title: "add_client.c",
        lines: [
          'CLIENT *clnt = clnt_create(host, ADD_PROG, ADD_VERS, "tcp");',
          "numbers n = { 5, 7 };",
          "int *r = add_1(&n, clnt);",
          'printf("5 + 7 = %d\\n", *r);',
        ],
      },
    ],
  },
  table: revealedTable(RPC_TABLE_HEADERS, RPC_TABLE_ROWS, 3),
};

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
  label: "The server runs add() and replies",
  body: "The server stub decodes the XDR into a numbers struct and calls add_1_svc(), which returns 12. The stub encodes 12 as 00 00 00 0C and sends a REPLY with the same transaction id.\n\nThe server program contains no networking code at all; the stub did it.",
  show: [],
  schematic: rpcFigure(["srt", "sstub", "proc"], "reply"),
  net: {
    show: ONE_CLIENT,
    hot: ["server"],
    tags: { server: "add(5, 7) = 12" },
    packets: [
      { path: C_TO_S, label: "CALL add 5, 7" },
      { path: S_TO_C, label: "REPLY 12", color: "green" },
    ],
  },
  table: revealedTable(RPC_TABLE_HEADERS, RPC_TABLE_ROWS, 4),
};

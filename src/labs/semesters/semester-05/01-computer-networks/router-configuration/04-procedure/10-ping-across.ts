import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  R_ADDR,
  RCLI_TABLE_HEADERS,
  RCLI_TABLE_ROWS,
} from "@/labs/networks/router-cli";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/router-cli";

const net: NetFrame = {
  hot: ["r1"],
  addr: R_ADDR,
  packets: [
    { path: ["pcA", "sw10", "r1", "sw20", "pcC"], label: "echo request" },
    {
      path: ["pcC", "sw20", "r1", "sw10", "pcA"],
      label: "echo reply",
      color: "green",
    },
  ],
  consoles: [
    {
      at: "pcA",
      title: "Command Prompt · PC A",
      lines: [
        "C:\\>ping 192.168.20.11",
        "Reply from 192.168.20.11: bytes=32 time<1ms TTL=127",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Set the gateways and ping across",
  body: "On PC A and PC B set the default gateway to 192.168.10.1, and on PC C and PC D to 192.168.20.1.\n\nFrom PC A, ping PC C at 192.168.20.11. The packet goes to R1, which finds 192.168.20.0/24 connected on Gi0/1 and forwards it. The replies come back with TTL 127. In Packet Tracer, the simulation mode shows the same envelopes moving hop by hop.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(RCLI_TABLE_HEADERS, RCLI_TABLE_ROWS, 8),
};

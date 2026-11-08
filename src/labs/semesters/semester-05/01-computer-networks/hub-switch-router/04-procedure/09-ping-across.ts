import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  HSR_ALL,
  ROUTER_ADDR,
  HSR_TABLE_HEADERS,
  HSR_TABLE_ROWS,
} from "@/labs/networks/hub-switch-router";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/hub-switch-router";

const net: NetFrame = {
  show: HSR_ALL,
  hot: ["r1"],
  addr: ROUTER_ADDR,
  packets: [
    { path: ["pc1", "hub", "r1", "sw", "pc6"], label: "echo request" },
    {
      path: ["pc6", "sw", "r1", "hub", "pc1"],
      label: "echo reply",
      color: "green",
    },
  ],
  consoles: [
    {
      at: "pc1",
      title: "Command Prompt · PC 1",
      lines: [
        "C:\\>ping 192.168.2.16",
        "Reply from 192.168.2.16: bytes=32 time=1ms TTL=127",
        "Reply from 192.168.2.16: bytes=32 time<1ms TTL=127",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Set gateways and ping across",
  body: "On each PC in Room 1 set the default gateway to 192.168.1.1, and in Room 2 to 192.168.2.1.\n\nFrom PC 1, ping PC 6. PC 1 sees that 192.168.2.16 is in another network and sends the packet to its gateway. The router forwards it out of Gi0/1 in a new frame, with the TTL lowered by one. The reply comes back the same way. Broadcasts from Room 1 never reach Room 2.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(HSR_TABLE_HEADERS, HSR_TABLE_ROWS, 3),
};

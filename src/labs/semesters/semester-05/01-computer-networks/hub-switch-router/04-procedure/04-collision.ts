import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  HSR_DEVICES,
  ROOM1,
  HSR_TABLE_HEADERS,
  HSR_TABLE_ROWS,
} from "@/labs/networks/hub-switch-router";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/hub-switch-router";

const net: NetFrame = {
  show: [...HSR_DEVICES, ...ROOM1],
  hot: ["hub"],
  focus: ["hub", "pc1", "pc2", "pc3"],
  busy: ["hub"],
  packets: [
    { path: ["pc1", "hub"], label: "frame", drop: true, at: 0.3 },
    { path: ["pc2", "hub"], label: "frame", drop: true, at: 0.3 },
    { path: ["pc1", "hub", "pc3"], label: "retry", at: 1.9 },
  ],
  note: {
    at: "hub",
    title: "Collision",
    text: "One shared channel. Both back off for a random time and resend.",
  },
};

export const step: SceneProcedureStep = {
  label: "Two senders collide",
  body: "Now PC 1 and PC 2 send at the same moment. Both signals reach the hub together and mix on the shared channel: a collision.\n\nBoth NICs detect it, send a short jam signal, and wait a random time before trying again. This is CSMA/CD. All three PCs share one collision domain, and the table shows it.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(HSR_TABLE_HEADERS, HSR_TABLE_ROWS, 1),
};

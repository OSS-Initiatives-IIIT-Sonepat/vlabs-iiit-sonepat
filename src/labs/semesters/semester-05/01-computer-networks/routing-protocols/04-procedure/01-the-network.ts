import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/routing";

const net: NetFrame = {
  note: {
    at: "r2",
    title: "Two ways to R3",
    text: "One slow hop across, or two fast hops round through R2.",
  },
};

export const step: SceneProcedureStep = {
  label: "Three routers, two paths",
  body: "PC A in LAN A must reach Server B in LAN B. Between them are three routers. R1 to R3 is a direct serial link at 1.544 Mbit/s. R1 to R2 and R2 to R3 are gigabit Ethernet links.\n\nEvery router port already has its address, and every link is up. No routes have been configured yet.",
  show: [],
  schematic: figure(net, "Fast way round, or slow way across"),
  net,
};

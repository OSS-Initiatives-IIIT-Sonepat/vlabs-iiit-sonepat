import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/routing";

const net: NetFrame = {
  hot: ["r1", "r2", "r3"],
  packets: [
    { path: ["r1", "r2"], label: "RIP update", color: "purple", at: 0.3 },
    { path: ["r3", "r2"], label: "RIP update", color: "purple", at: 0.3 },
    { path: ["r1", "r3"], label: "RIP update", color: "purple", at: 0.3 },
  ],
  consoles: [
    {
      at: "r1",
      title: "R1 (same on R2, R3)",
      lines: [
        "R1(config)#router rip",
        "R1(config-router)#version 2",
        "R1(config-router)#no auto-summary",
        "R1(config-router)#network 192.168.1.0",
        "R1(config-router)#network 10.0.0.0",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Turn on RIP version 2",
  body: "On each router, start RIP version 2 and list the networks on its ports. Turn off auto-summary so the subnets are sent as they are.\n\nEvery 30 seconds each router now sends its whole routing table to its neighbours, to the multicast address 224.0.0.9.",
  show: [],
  schematic: figure(net),
  net,
};

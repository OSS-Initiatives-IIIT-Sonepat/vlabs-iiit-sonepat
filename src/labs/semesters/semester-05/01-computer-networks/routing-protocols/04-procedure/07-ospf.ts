import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/routing";

const net: NetFrame = {
  hot: ["r1", "r2", "r3"],
  packets: [
    { path: ["r1", "r2"], label: "Hello", color: "blue", at: 0.3 },
    { path: ["r2", "r3"], label: "Hello", color: "blue", at: 0.3 },
    { path: ["r1", "r3"], label: "Hello", color: "blue", at: 0.3 },
  ],
  consoles: [
    {
      at: "r1",
      title: "R1 (same on R2, R3)",
      lines: [
        "R1(config)#no router rip",
        "R1(config)#router ospf 1",
        "R1(config-router)#network 192.168.1.0 0.0.0.255 area 0",
        "R1(config-router)#network 10.0.0.0 0.255.255.255 area 0",
        "R1#show ip ospf neighbor",
        "2.2.2.2  1  FULL/DR  10.0.12.2  Gi0/1",
        "3.3.3.3  0  FULL/ -  10.0.13.2  Se0/0/0",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Replace RIP with OSPF",
  body: "Remove RIP with no router rip. Start OSPF process 1 on each router and put every network in area 0.\n\nThe routers send Hello packets to 224.0.0.5 every 10 seconds. Neighbours that hear each other swap their link-state databases and become FULL. show ip ospf neighbor lists R2 and R3 on R1.",
  show: [],
  schematic: figure(net),
  net,
};

import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/routing";

const net: NetFrame = {
  hot: ["r1"],
  packets: [{ path: ["pcA", "r1"], label: "to 192.168.3.10", drop: true }],
  consoles: [
    {
      at: "r1",
      title: "R1",
      lines: [
        "R1#show ip route | include C",
        "C   192.168.1.0/24 is directly connected, Gi0/0",
        "C   10.0.12.0/30 is directly connected, Gi0/1",
        "C   10.0.13.0/30 is directly connected, Se0/0/0",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Only connected routes",
  body: "On R1, run show ip route. It lists only the networks on R1's own ports: LAN A and the two links to R2 and R3. There is no route to 192.168.3.0.\n\nPing Server B from PC A. The packet reaches R1, which has nowhere to send it, drops it, and returns Destination host unreachable.",
  show: [],
  schematic: figure(net),
  net,
};

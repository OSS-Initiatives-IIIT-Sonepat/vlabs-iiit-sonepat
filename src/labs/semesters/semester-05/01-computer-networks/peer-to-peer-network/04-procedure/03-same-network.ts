import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { DIRECT, SAME_NET } from "@/labs/networks/peer-to-peer";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/peer-to-peer";

const net: NetFrame = {
  show: DIRECT,
  hot: ["pcA", "pcB"],
  addr: SAME_NET,
};

export const step: SceneProcedureStep = {
  label: "Give both an address in one network",
  body: "In each PC's IPv4 properties, set PC A to 192.168.0.1 and PC B to 192.168.0.2, both with mask 255.255.255.0. No gateway is needed, because the two are in the same network.\n\nPut both PCs in the same workgroup, and turn on network discovery and file sharing.",
  show: [],
  schematic: figure(net),
  net,
};

import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { DIRECT } from "@/labs/networks/peer-to-peer";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/peer-to-peer";

const net: NetFrame = {
  show: DIRECT,
  hot: ["a-b"],
  tags: { pcA: "✓ link", pcB: "✓ link" },
};

export const step: SceneProcedureStep = {
  label: "Join them with a crossover cable",
  body: "Plug a crossover cable into both PCs. Both are PCs, so both send on pins 1 and 2. The crossover joins those pins to the other PC's receive pins, 3 and 6.\n\nThe link LEDs at both NICs light. There is nothing between the PCs: this is the smallest possible network.",
  show: [],
  schematic: figure(net),
  net,
};

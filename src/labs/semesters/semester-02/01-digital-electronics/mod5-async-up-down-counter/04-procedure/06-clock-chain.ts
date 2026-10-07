import { type SceneProcedureStep } from "@/labs/experiments/types";
import { S6 } from "./show-sets";

export const step: SceneProcedureStep = {
  label: "Wire the up/down ripple clock chain.",
  body: "Feed $Q_0$ and the U/D control into the first XOR gate; its output clocks FF1. Feed $Q_1$ and U/D into the second XOR gate; its output clocks FF2. Since $CLK_{n+1} = Q_n \\oplus U/\\bar{D}$, U/D = 1 passes $\\bar{Q}_n$ (up counting) and U/D = 0 passes $Q_n$ (down counting). Connect the U/D tie-point to VCC for up mode.",
  show: S6,
  highlight: "xor1",
  supplyVoltage: 5.0,
};

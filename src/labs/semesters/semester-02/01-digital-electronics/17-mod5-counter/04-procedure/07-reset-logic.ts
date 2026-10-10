import { type SceneProcedureStep } from "@/labs/experiments/types";
import { S7 } from "./show-sets";

export const step: SceneProcedureStep = {
  label: "Wire the MOD-5 reset logic.",
  body: "AND $Q_0$ with $Q_2$. OR U/D with $Q_1$. NAND the two results to form $\\overline{CLR_{01}}$ (to FF0 and FF1). NAND U/D with the AND output to form $\\overline{CLR_2}$ (to FF2). Up mode clears all stages at state 101; down mode clears only $Q_0$ and $Q_1$ at state 111, leaving 100.",
  show: S7,
  highlight: "nand1",
  supplyVoltage: 5.0,
};

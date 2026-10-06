import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "UP counter: connect the ripple clock chain.",
  body: "Apply the external clock to the CLK input of flip-flop $A$ only. Connect $Q_A$ to the CLK of $B$, and $Q_B$ to the CLK of $C$. Every stage now clocks from the **Q** output of the stage before it, which makes the counter count **up**.",
  show: [],
};

import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Check the ICs and plan the pins.",
  body: "Test the ICs on the trainer first. Name the three flip-flops $A$ (LSB), $B$ and $C$ (MSB). Use **IC1** (74HC76) for $A$ and $B$, and the first flip-flop of **IC2** (74HC76) for $C$. Each 74HC76 flip-flop has CLK, PRE, CLR, J, K, Q and $\\overline{Q}$ pins, and PRE and CLR are active LOW. Confirm every pin number against the datasheet before wiring.",
  show: [],
};

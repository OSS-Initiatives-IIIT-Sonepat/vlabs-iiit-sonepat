import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BB, allIcIds, inputWireIds } from "../gates";

export const step: SceneProcedureStep = {
  label: "Wire the common inputs A and B.",
  body: "Use **red** wires to carry input $A$ (tie point at column 1) to the A pin of every gate, and **blue** wires to carry input $B$ (tie point at column 2) to the B pin of every two-input gate. The NOT gate has only input $A$. Set each input to logic 0 (GND) or logic 1 (+5 V) from the input panel.",
  show: [BB, ...allIcIds, ...inputWireIds],
  highlight: "w_a_and",
  activeInputs: { A: 0, B: 0 },
};

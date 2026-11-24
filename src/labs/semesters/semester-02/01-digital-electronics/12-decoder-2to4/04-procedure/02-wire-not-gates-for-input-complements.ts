import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire NOT gates for input complements",
  body: "Wire NOT gate 1 (74HC04, pin 1→2): connect input A to pin 1. A' appears on pin 2. Wire NOT gate 2 (74HC04, pin 3→4): connect input B to pin 3. B' appears on pin 4. These two complement signals, together with the original A and B, provide all four literals needed for the four AND gates. Verify the NOT outputs toggle correctly with a multimeter.",
  show: ["bb", "psu", "w_rail_link", "not_a", "w_vcc_not_a", "w_gnd_not_a"],
  highlight: "psu",
};

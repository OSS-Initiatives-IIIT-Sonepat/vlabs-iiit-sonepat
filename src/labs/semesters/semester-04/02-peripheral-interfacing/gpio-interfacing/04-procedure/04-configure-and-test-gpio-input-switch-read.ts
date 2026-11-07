import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the supply side",
  body: "Connect the top supply rail to each resistor, and each resistor to its LED anode. The cathodes are still open, so the lamps stay dark. A floating input on a real pin is the same kind of unfinished path: without the 10 kΩ pull-down in the Theory figure, an open switch does not have a definite 0.",
  show: [
    "bb",
    "r1",
    "r2",
    "r3",
    "led1",
    "led2",
    "led3",
    "w_vcc_r1",
    "w_vcc_r2",
    "w_vcc_r3",
    "w_r1_led1",
    "w_r2_led2",
    "w_r3_led3",
  ],
};

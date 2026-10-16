import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/ohms-law";

export const step: SceneProcedureStep = {
  label: "Record zero reading and energise circuit.",
  body:
    "With the supply set to **0 V**, switch it on. " +
    "Confirm both meters read zero (or very close). " +
    "This validates there are no offsets or loose connections before measurements begin. " +
    "If the ammeter shows a non-zero reading at 0 V, check for a wiring error.",
  show: [
    "bb",
    "r1",
    "led1",
    "w_vcc",
    "w_r1_led",
    "w_gnd",
    "w_vm_pos",
    "w_vm_neg",
  ],
  schematic,
};

import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const step: SceneProcedureStep = {
  label: "Vary supply voltages and repeat.",
  body:
    "Change V1 to 12 V (keeping V2 = 6 V) and repeat all current and voltage measurements. " +
    "Verify KCL and KVL still hold for the modified supply conditions, " +
    "demonstrating that the laws are universal and not specific to one operating point.",
  show: [
    "bb",
    "r1",
    "r2",
    "r3",
    "led1",
    "w_vcc_r1",
    "w_vcc_r2",
    "w_r2_nodeA",
    "w_nodeA_link",
    "w_nodeA_r3",
    "w_r3_led",
    "w_led_gnd",
  ],
  schematic,
};

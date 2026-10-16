import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/ohms-law";

export const step: SceneProcedureStep = {
  label: "Vary supply voltage in 1 V steps and record readings.",
  body:
    "Slowly increase the DC supply from **1 V to 10 V** in steps of ~1 V. " +
    "At each step wait for readings to stabilise, then record the ammeter reading ($I$ in mA) " +
    "and voltmeter reading ($V$ in volts) in the observation table. " +
    "Do not exceed the resistor's power rating: $P = V^2/R \\leq 0.25\\,\\text{W}$.",
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

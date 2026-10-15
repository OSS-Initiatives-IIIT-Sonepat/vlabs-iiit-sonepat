import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step03 as schematic } from "@/labs/schematics/ohms-law-schematics";

export const step: SceneProcedureStep = {
  label: "Connect the voltmeter in parallel across the resistor.",
  body:
    "Connect the voltmeter (**20 V DC** range) directly across the two leads of the resistor — " +
    "positive probe to the junction between ammeter and resistor, " +
    "negative probe to the junction between resistor and the negative rail. " +
    "A voltmeter must always be connected in **parallel** (high internal impedance) " +
    "so it draws negligible current and does not disturb the circuit.",
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

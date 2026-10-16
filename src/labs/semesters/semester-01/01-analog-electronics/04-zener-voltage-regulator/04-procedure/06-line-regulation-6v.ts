import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/04-zener-voltage-regulator";

export const step: SceneProcedureStep = {
  label: "Line regulation: set Vin = 6 V.",
  body: "Switch on the supply and slowly raise Vin to 6 V, checking the value on the supply display. Note Vout. Here Vin is below the breakdown threshold of about 6.78 V, so the Zener diode is not conducting and the circuit is only a voltage divider: Vout = Vin × RL / (Rs + RL) = 6 × 1000 / 1330 ≈ 4.51 V. The output follows the input and is not regulated.",
  show: [
    "bb",
    "psu",
    "rs",
    "w_vcc_rs",
    "dz",
    "w_rs_dz",
    "w_dz_gnd",
    "rl1",
    "w_dz_rl1",
    "w_rl1_gnd",
    "dmm",
  ],
  highlight: "dmm",
  supplyVoltage: 6,
  readings: { dmm: "4.51 V" },
  schematic,
};

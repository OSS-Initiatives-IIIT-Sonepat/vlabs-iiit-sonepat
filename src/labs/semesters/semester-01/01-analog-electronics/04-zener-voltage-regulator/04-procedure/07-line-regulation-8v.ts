import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step07 as schematic } from "@/labs/schematics/zener-voltage-regulator-schematics";

export const step: SceneProcedureStep = {
  label: "Line regulation: set Vin = 8 V.",
  body: "Raise Vin to 8 V and note Vout. The Zener diode is now in breakdown and Vout stays at about Vz = 5.10 V. IR = (8 - 5.1) / 330 ≈ 8.79 mA, IL = 5.1 / 1000 = 5.10 mA, so IZ = IR - IL ≈ 3.69 mA.",
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
  supplyVoltage: 8,
  readings: { dmm: "5.10 V" },
  schematic,
};

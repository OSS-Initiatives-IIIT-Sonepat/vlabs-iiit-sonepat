import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step08 as schematic } from "@/labs/schematics/zener-voltage-regulator-schematics";

export const step: SceneProcedureStep = {
  label: "Line regulation: set Vin = 10 V.",
  body: "Raise Vin to 10 V and note Vout. It stays at about 5.10 V. IR = (10 - 5.1) / 330 ≈ 14.85 mA, IL = 5.10 mA, so IZ ≈ 9.75 mA. The extra input current flows through the Zener diode, not through the load.",
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
  supplyVoltage: 10,
  readings: { dmm: "5.10 V" },
  schematic,
};

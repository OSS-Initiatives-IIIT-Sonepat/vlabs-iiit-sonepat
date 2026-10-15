import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step09 as schematic } from "@/labs/schematics/zener-voltage-regulator-schematics";

export const step: SceneProcedureStep = {
  label: "Line regulation: set Vin = 12 V.",
  body: "Raise Vin to 12 V and note Vout. It still stays at about 5.10 V although Vin has risen by 4 V since the 8 V reading. IR = (12 - 5.1) / 330 ≈ 20.91 mA, IL = 5.10 mA, so IZ ≈ 15.81 mA, which is well within the 500 mW rating of the Zener diode. A real Zener diode shows a small rise in Vout because of its dynamic resistance. Calculate the line regulation from the readings at 8 V and 12 V.",
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
  supplyVoltage: 12,
  readings: { dmm: "5.10 V" },
  schematic,
};

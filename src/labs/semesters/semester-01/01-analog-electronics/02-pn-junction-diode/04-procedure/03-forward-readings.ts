import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Record forward-bias readings.",
  body: "Increase the supply voltage gradually. For each setting, record the voltage across the diode and the corresponding forward current. Take smaller voltage steps near the knee region.",
  show: ["bb", "d1", "r1", "psu", "am1", "vm1", "w_diode_r", "w_r_gnd"],
  highlight: "am1",
  supplyVoltage: 0.7,
  readings: {
    am1: "2.00 mA",
    vm1: "0.70 V",
  },
};

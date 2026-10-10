import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Record reverse-bias readings.",
  body: "Increase the reverse voltage gradually within the safe operating range of the diode and record the reverse voltage and reverse current. Do not exceed the diode's rated reverse voltage.",
  show: ["bb", "d1", "r1", "psu", "am1", "vm1", "w_diode_r", "w_r_gnd"],
  highlight: "vm1",
  supplyVoltage: 10.0,
  readings: {
    am1: "0.02 mA",
    vm1: "10.00 V",
  },
};

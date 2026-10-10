import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect the diode in forward bias.",
  body: "Connect the positive supply rail to the diode anode through the milliammeter and connect the diode cathode through the 1 kΩ resistor to ground. Connect the voltmeter across the diode.",
  show: ["bb", "d1", "r1", "psu", "am1", "vm1", "w_diode_r", "w_r_gnd"],
  highlight: "d1",
  supplyVoltage: 0.5,
  readings: {
    am1: "0.00 mA",
    vm1: "0.50 V",
  },
};

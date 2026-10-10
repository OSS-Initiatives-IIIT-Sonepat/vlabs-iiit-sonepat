import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Study the reverse-bias characteristic.",
  body: "Power down the circuit before changing polarity. Reverse the diode connections so that the cathode is connected toward the positive supply and the anode toward the negative side. Keep the current-limiting resistor in series and reconnect the meters with correct polarity.",
  show: ["bb", "d1", "r1", "psu", "am1", "vm1", "w_diode_r", "w_r_gnd"],
  highlight: "d1",
  supplyVoltage: 5.0,
  readings: {
    am1: "0.01 mA",
    vm1: "5.00 V",
  },
};

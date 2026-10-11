import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Check the resistors and set up the ±12 V supply.",
  body: "Measure the 10 kΩ and 100 kΩ resistors (and the 47 kΩ and 22 kΩ spares) with the digital multimeter and confirm that each is within ±5% of its marked value. Use two supply channels: channel 1 gives +12 V on the bottom red rail, and channel 2 gives −12 V on the top red rail. The positive terminal of channel 2 and the negative terminal of channel 1 are the common ground (0 V): join the top and bottom ground rails with the black link wire. Set each channel to 12 V and the current limit to about 50 mA, and keep the outputs off until the circuit is wired.",
  show: ["bb", "op_inv", "psu", "psu_neg", "w_gnd_link"],
  highlight: "w_gnd_link",
  readings: { psu: "+12 V", psu_neg: "−12 V" },
};

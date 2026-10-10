import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Check the resistors and set the power supply.",
  body: "Measure the 10 kΩ, 22 kΩ, 47 kΩ and 100 kΩ resistors with the digital multimeter and confirm that each is within ±5% of its marked value. Obtain +12 V and −12 V about a common ground from the dual supply. If the two channels are independent, join the negative terminal of channel 1 to the positive terminal of channel 2 and treat this joint as the common ground (0 V); the positive terminal of channel 1 is then +12 V and the negative terminal of channel 2 is −12 V. Set each channel to 12 V, set the current limit of each channel to about 50 mA, and keep the outputs switched off until the circuit is wired.",
  show: [
    "bb",
    "opamp1",
    "psu",
    "fg",
  ],
};

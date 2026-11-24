import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Verify deselected peripheral is not enabled",
  body: "Set S=0. The green LED (Y0, Device 0) should be ON and the red LED (Y1, Device 1) should be OFF. Measure the voltage at Y0 (should be ≈5 V) and Y1 (should be ≈0 V). This confirms that only Device 0 is selected and Device 1 is fully deselected — its CS input sees a LOW, keeping it inactive on the shared bus.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "not1",
    "w_vcc_not1",
    "w_gnd_not1",
    "and1",
    "w_vcc_and1",
    "w_gnd_and1",
  ],
  activeInputs: { A0: 0 },
  ledBrightness: { led_y0: 1, led_y1: 0 },
  highlight: "and1",
};

import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Switch address and verify other device selected",
  body: "Set S=1. The red LED (Y1, Device 1) should now be ON and the green LED (Y0, Device 0) should be OFF. Measure Y0 (≈0 V) and Y1 (≈5 V). This confirms Device 1 is now selected while Device 0 is deselected. Record both readings. Toggle S several times and observe the clean switching behaviour — only one device is active at any instant.",
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
    "w_a0_not",
    "w_na0_and1",
    "w_a0_and2",
    "w_en_and1",
    "w_en_and2",
  ],
  activeInputs: { A0: 1 },
  ledBrightness: { led_y0: 0, led_y1: 1 },
};

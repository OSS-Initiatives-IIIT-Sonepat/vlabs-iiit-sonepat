import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the ICs and power them",
  body: "Connect the +5 V supply to the top rails and link the top and bottom +5 V rails. Insert the 74HC86 at column 12 and the 74HC283 at column 22, both straddling the centre gap. Power both: the 74HC86 pin 14 and the 74HC283 pin 16 to +5 V (purple), the 74HC86 pin 7 and the 74HC283 pin 8 to GND (black). Tie the second input of each XOR gate (pins 2, 5, 10, 13) to the +5 V rail with a red wire so each gate works as an inverter.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "xor_b",
    "w_vcc_xor_b",
    "w_gnd_xor_b",
    "w_vcc_xb1",
    "w_vcc_xb2",
    "w_vcc_xb3",
    "w_vcc_xb4",
    "adder_sub",
    "w_vcc_adder_sub",
    "w_gnd_adder_sub",
  ],
  highlight: "adder_sub",
  supplyVoltage: 5.0,
};

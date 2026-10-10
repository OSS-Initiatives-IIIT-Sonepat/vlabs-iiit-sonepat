import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the AND and OR gates (74HC08, 74HC32)",
  body: "Insert two AND gates (74HC08) and one OR gate (74HC32). AND1 forms A · B, AND2 forms Cin · (A ⊕ B) and the OR gate combines them into the carry-out. Keep at least two free columns between ICs, and power each one: purple wire to VCC, black wire to ground.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "xor1",
    "xor2",
    "and1",
    "and2",
    "or1",
    "w_vcc_xor1",
    "w_gnd_xor1",
    "w_vcc_xor2",
    "w_gnd_xor2",
    "w_vcc_and1",
    "w_gnd_and1",
    "w_vcc_and2",
    "w_gnd_and2",
    "w_vcc_or1",
    "w_gnd_or1",
  ],
  highlight: "or1",
};

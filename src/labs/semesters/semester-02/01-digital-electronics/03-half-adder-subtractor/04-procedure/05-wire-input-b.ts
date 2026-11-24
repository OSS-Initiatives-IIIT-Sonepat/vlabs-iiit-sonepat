import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire input B (blue).",
  body: "Use blue jumpers to connect the B tie-point (column 4) to input B of the XOR gate and of both AND gates in the 74HC08 (pins 2 and 5). Again use rows $a$, $b$ and $c$ so the three wires stay separate.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "xor1",
    "and1",
    "w_vcc_xor1",
    "w_gnd_xor1",
    "w_vcc_and1",
    "w_gnd_and1",
    "not1",
    "w_vcc_not1",
    "w_gnd_not1",
    "w_a_xor",
    "w_a_and",
    "w_a_not",
    "w_b_xor",
    "w_b_and",
    "w_b_and2",
  ],
  highlight: "w_b_xor",
  audioPath:
    "/semesters/semester-02/01-digital-electronics/half-adder-subtractor/05_wire_input_b_english.mp3",
};

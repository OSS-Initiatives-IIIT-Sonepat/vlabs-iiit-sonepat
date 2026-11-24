import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Wire input A (red).",
  body: "Use red jumpers to connect the A tie-point (column 2) to input A of the XOR gate, the first AND gate and the NOT gate. Use rows $a$, $b$ and $c$ of column 2 so each wire starts from its own hole.",
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
  ],
  highlight: "w_a_xor",
  audioPath:
    "/semesters/semester-02/01-digital-electronics/half-adder-subtractor/04_procedure_english.mp3",
};

import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Connect NOT A to the Borrow AND gate (white).",
  body: "Use a white jumper to connect the output of the NOT gate ($\\overline{A}$) to input A of the second AND gate (pin 4 of the 74HC08). This internal signal is what turns a plain AND into the Borrow function $\\overline{A} \\cdot B$.",
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
    "w_not_and2",
  ],
  highlight: "w_not_and2",
  audioPath:
    "/semesters/semester-02/01-digital-electronics/half-adder-subtractor/06_procedure_english.mp3",
};

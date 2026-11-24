import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the NOT IC (subtractor section).",
  body: "Insert the NOT IC (74HC04) at column 28 and power it. The NOT gate inverts A, and the **second** AND gate of the 74HC08 already on the board combines $\\overline{A}$ with B to give the Borrow, so no fourth IC is needed.",
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
  ],
  highlight: "not1",
  audioPath:
    "/semesters/semester-02/01-digital-electronics/half-adder-subtractor/03_procedure_english.mp3",
};

import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the XOR and AND ICs (adder section).",
  body: "Insert the XOR IC (74HC86) at column 8 and the AND IC (74HC08) at column 18, and power each with a purple jumper to pin 14 and a black jumper from pin 7. Both straddle the centre gap in row $e$. The XOR gives $A \\oplus B$ (Sum/Difference) and the first AND gate of the 74HC08 gives the Carry $A \\cdot B$.",
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
  ],
  highlight: "xor1",
  audioPath:
    "/semesters/semester-02/01-digital-electronics/half-adder-subtractor/02_procedure_english.mp3",
};

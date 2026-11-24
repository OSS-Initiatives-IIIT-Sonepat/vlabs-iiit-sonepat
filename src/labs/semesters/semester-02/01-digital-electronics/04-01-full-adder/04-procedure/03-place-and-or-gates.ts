import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the AND and OR ICs (74HC08, 74HC32)",
  body: "Insert one 74HC08 (columns 18 to 24) and one 74HC32 (columns 28 to 34). Both AND gates come from the one 74HC08: gate 1 (AND1) forms A · B and gate 2 (AND2) forms Cin · (A ⊕ B). Gate 1 of the 74HC32 combines them into the carry-out. Power each IC: purple wire to VCC, black wire to ground.",
  show: [
    "bb",
    "psu",
    "w_rail_link",
    "xor1",
    "and1",
    "or1",
    "w_vcc_xor1",
    "w_gnd_xor1",
    "w_vcc_and1",
    "w_gnd_and1",
    "w_vcc_or1",
    "w_gnd_or1",
  ],
  highlight: "or1",
};

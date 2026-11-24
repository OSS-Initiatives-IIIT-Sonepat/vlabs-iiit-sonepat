import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Mount the four logic ICs across the centre groove.",
  body: "Insert the ICs on row e, straddling the centre groove: 74HC32 (OR, columns 10–16), 74HC08 (AND, 18–24), 74HC86 (XOR, 26–32) and 74HC04 (NOT, 34–40). Each package holds several gates, so the seven gates of the converter fit in four ICs: two ORs in the 74HC32 (T = C + D and W), one AND, two XORs in the 74HC86 (X and C ⊕ D) and two NOTs in the 74HC04 (Y and Z).",
  show: ["bb", "psu", "w_rail_link", "or_cd", "and_b_t", "xor_x", "not_y"],
  highlight: "or_cd",
};

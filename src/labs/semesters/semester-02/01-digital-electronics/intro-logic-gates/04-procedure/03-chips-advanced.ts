import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BB, icId } from "../gates";

export const step: SceneProcedureStep = {
  label: "Mount the NAND, NOR, EX-OR and EX-NOR ICs.",
  body: "Insert the **74HC00** (NAND), **74HC02** (NOR), **74HC86** (EX-OR) and **74HC266** (EX-NOR) in the same way, in line with the first three ICs. Check that no IC overlaps another and that each straddles the centre gap.",
  show: [
    BB,
    icId("not"),
    icId("and"),
    icId("or"),
    icId("nand"),
    icId("nor"),
    icId("xor"),
    icId("xnor"),
  ],
  highlight: icId("nand"),
};

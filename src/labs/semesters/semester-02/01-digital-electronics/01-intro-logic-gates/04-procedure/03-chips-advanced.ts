import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BB, icId } from "../gates";

export const step: SceneProcedureStep = {
  label: "Mount the NAND, NOR, EX-OR and EX-NOR ICs.",
  body: "Insert the **74HC00** (NAND), **74HC02** (NOR), **74HC86** (EX-OR) and **74HC7266** (EX-NOR — the push-pull version; a 74HC266 has open-drain outputs and cannot light an LED without a pull-up resistor) in the same way, in line with the first three ICs, and power them the same way. Note that the 74HC02 NOR has a different pinout: its output 1Y is pin 1 and its inputs are pins 2 and 3. Check that no IC overlaps another and that each straddles the centre gap.",
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

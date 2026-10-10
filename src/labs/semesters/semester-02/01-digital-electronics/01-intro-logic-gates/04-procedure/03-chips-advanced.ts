import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BB, powerIds, powerWireIds, allIcIds, icId } from "../gates";

export const step: SceneProcedureStep = {
  label: "Mount the NAND, NOR, EX-OR and EX-NOR ICs.",
  body: "Insert the **74HC00** (NAND), **74HC02** (NOR), **74HC86** (EX-OR) and **74HC266** (EX-NOR) in the same way, in line with the first three ICs, and power each one with a purple VCC wire and a black ground wire. Check that no IC overlaps another and that each straddles the centre gap.",
  show: [BB, ...powerIds, ...allIcIds, ...powerWireIds],
  highlight: icId("nand"),
};

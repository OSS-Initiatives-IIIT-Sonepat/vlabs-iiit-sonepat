import { type SceneProcedureStep } from "@/labs/experiments/types";

import { BB, powerIds, icId, wireVccId, wireIcGndId } from "../gates";

export const step: SceneProcedureStep = {
  label: "Mount the NOT, AND and OR ICs.",
  body: "Insert the **74HC04** (NOT), **74HC08** (AND) and **74HC32** (OR) so that each straddles the centre gap of the breadboard on row $e$. Pin 1 of each IC faces the left. Power each one as you fit it: a **purple** wire from the bottom +5 V rail to its VCC pin (pin 14, bottom half) and a **black** wire from its GND pin (pin 7) to the ground rail. Only one gate of each package is used; the rest of its inputs may be tied to GND.",
  show: [
    BB,
    ...powerIds,
    icId("not"),
    icId("and"),
    icId("or"),
    wireVccId("not"),
    wireIcGndId("not"),
    wireVccId("and"),
    wireIcGndId("and"),
    wireVccId("or"),
    wireIcGndId("or"),
  ],
  highlight: icId("not"),
};

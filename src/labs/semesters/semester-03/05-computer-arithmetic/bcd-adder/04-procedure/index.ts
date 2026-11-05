import { type SceneProcedureStep } from "@/labs/experiments/types";
import { bcdAdderStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/bcd-adder";

import { stages } from "../components";

const nine = { a4: 1, a3: 0, a2: 0, a1: 1, b4: 0, b3: 1, b2: 0, b1: 1 } as const;
const placed = [...stages.power, ...stages.add1];
const withAnd = [...placed, ...stages.and];
const withOr = [...withAnd, ...stages.or];
const all = [...withOr, ...stages.add2];

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Power the board",
    body: "Seat the supply and join the two power rails. Every chip on this board takes +5 V and ground from those rails.",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "Place the first adder",
    body: "The first 74HC283 adds the two BCD digits as ordinary binary. A1 and B1 are the least significant bits. Tie its carry-in to ground. Z8 is S4, Z4 is S3, Z2 is S2, and Z1 is S1. K is C4.",
    show: placed,
    highlight: "add1",
    schematic: fig[0],
  },
  {
    label: "Detect a digit above 9",
    body: "A nibble from 10 to 15 has Z8 set together with Z4, or Z8 set together with Z2. Wire Z8 and Z4 into the first AND, and Z8 and Z2 into the second AND.",
    show: withAnd,
    highlight: "and1",
    schematic: fig[1],
  },
  {
    label: "Build C",
    body: "C = K + Z8·Z4 + Z8·Z2. OR the two AND outputs together, then OR that result with K. The output of the second OR is C.",
    show: withOr,
    highlight: "or1",
    schematic: fig[2],
  },
  {
    label: "Add 6 when C is 1",
    body: "The second 74HC283 adds the first sum to 0110 times C. Its B1 and B4 are tied to ground, and B2 and B3 are tied to C. The lamps are the unit bits S1 to S4 and the tens carry.",
    show: all,
    highlight: "add2",
    schematic: fig[3],
  },
  {
    label: "Add 9 and 5",
    body: "Set A to 1001 and B to 0101. The binary sum is 1110, so C becomes 1 and the second adder computes 1110 + 0110 = 10100. The tens lamp lights and the unit lamps read 0100.",
    show: all,
    highlight: "led_tens",
    activeInputs: nine,
    schematic: fig[4],
  },
];

import { type ComponentInstance } from "@/labs/types";

import {
  BB,
  GATES,
  gndId,
  icId,
  ledId,
  resId,
  vccId,
  wireAId,
  wireBId,
  wireGndId,
  wireYId,
} from "./gates";

const supply: ComponentInstance[] = [
  { id: BB, type: "wide-breadboard" },
  {
    id: "psu",
    type: "dc-jack",
    label: "+5 V",
    mountedAt: { board: BB, col: 1, row: "a" },
    terminals: [
      { board: BB, rail: "vcc_top", col: 1 },
      { board: BB, rail: "gnd_top", col: 1 },
    ],
  },
  {
    id: "w_rail_link",
    type: "wire",
    color: "red",
    from: { board: BB, rail: "vcc_top", col: 100 },
    to: { board: BB, rail: "vcc_bot", col: 100 },
  },
];

// Each IC straddles the centre gap; VCC (pin 14) is on the bottom bank, GND (pin 7) on the top.
const chips: ComponentInstance[] = GATES.flatMap((g): ComponentInstance[] => [
  {
    id: icId(g.key),
    type: g.type,
    mountedAt: { board: BB, col: g.col, row: "e" },
  },
  {
    id: vccId(g.key),
    type: "wire",
    color: "red",
    from: { board: BB, rail: "vcc_bot", col: g.col },
    to: { ic: icId(g.key), pin: "VCC" },
  },
  {
    id: gndId(g.key),
    type: "wire",
    color: "black",
    from: { board: BB, rail: "gnd_top", col: g.col + 6 },
    to: { ic: icId(g.key), pin: "GND" },
  },
]);

// Inputs: A = tie column 1, B = tie column 2 (rows a–e). A column has five
// holes, so the last gates take A and B from the previous IC's input strip.
const ROWS = ["a", "b", "c", "d", "e"] as const;
const inputWires: ComponentInstance[] = [];
{
  let a = 0;
  let b = 0;
  GATES.forEach((g, i) => {
    const prev = GATES[i - 1];
    inputWires.push({
      id: wireAId(g.key),
      type: "wire",
      color: "red",
      from:
        a < ROWS.length
          ? { board: BB, col: 1, row: ROWS[a] }
          : { ic: icId(prev.key), pin: "A:2" },
      to: { ic: icId(g.key), pin: "A" },
    });
    a++;
    if (g.twoInput) {
      inputWires.push({
        id: wireBId(g.key),
        type: "wire",
        color: "blue",
        from:
          b < ROWS.length
            ? { board: BB, col: 2, row: ROWS[b] }
            : { ic: icId(prev.key), pin: "B:2" },
        to: { ic: icId(g.key), pin: "B" },
      });
      b++;
    }
  });
}

// Indicator right of each IC: 330 Ω at cols +7…+10, LED anode in the
// resistor's col +10 strip, cathode at +11.
const indicators: ComponentInstance[] = GATES.flatMap(
  (g): ComponentInstance[] => [
    {
      id: resId(g.key),
      type: "resistor",
      ohms: 330,
      mountedAt: { board: BB, col: g.col + 7, row: "b" },
    },
    {
      id: ledId(g.key),
      type: "led",
      color: g.led,
      mountedAt: { board: BB, col: g.col + 10, row: "c" },
    },
  ],
);

// Output: IC Y → resistor; LED cathode → GND rail.
const outputWires: ComponentInstance[] = GATES.flatMap(
  (g): ComponentInstance[] => [
    {
      id: wireYId(g.key),
      type: "wire",
      color: "green",
      from: { ic: icId(g.key), pin: "Y" },
      to: { component: resId(g.key), end: "p1" },
    },
    {
      id: wireGndId(g.key),
      type: "wire",
      color: "black",
      from: { led: ledId(g.key), end: "cathode" },
      to: { board: BB, rail: "gnd_top", col: g.col + 11 },
    },
  ],
);

export const components: ComponentInstance[] = [
  ...supply,
  ...chips,
  ...inputWires,
  ...indicators,
  ...outputWires,
];

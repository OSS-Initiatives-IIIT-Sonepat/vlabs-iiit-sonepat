import { type ComponentInstance } from "@/labs/types";

import {
  BB,
  GATES,
  icId,
  ledId,
  resId,
  wireAId,
  wireBId,
  wireGndId,
  wireRId,
  wireYId,
} from "./gates";

const boardAndChips: ComponentInstance[] = [
  { id: BB, type: "long-breadboard" },
  ...GATES.map((g): ComponentInstance => ({
    id: icId(g.key),
    type: g.type,
    mountedAt: { board: BB, col: g.col, row: "e" },
  })),
];

// Inputs: A = tie point (col 1, row a), B = tie point (col 2, row a).
const inputWires: ComponentInstance[] = GATES.flatMap((g) => {
  const wires: ComponentInstance[] = [
    {
      id: wireAId(g.key),
      type: "wire",
      color: "red",
      from: { board: BB, col: 1, row: "a" },
      to: { ic: icId(g.key), pin: "A" },
    },
  ];
  if (g.twoInput) {
    wires.push({
      id: wireBId(g.key),
      type: "wire",
      color: "blue",
      from: { board: BB, col: 2, row: "a" },
      to: { ic: icId(g.key), pin: "B" },
    });
  }
  return wires;
});

// Indicators: 330 ohm resistor + LED on row h under each IC's columns.
const indicators: ComponentInstance[] = GATES.flatMap(
  (g): ComponentInstance[] => [
    {
      id: resId(g.key),
      type: "resistor",
      ohms: 330,
      mountedAt: { board: BB, col: g.col, row: "h" },
    },
    {
      id: ledId(g.key),
      type: "led",
      color: g.led,
      mountedAt: { board: BB, col: g.col + 2, row: "h" },
    },
  ],
);

// Output chain: IC Y -> resistor -> LED anode, LED cathode -> GND rail.
const outputWires: ComponentInstance[] = GATES.flatMap(
  (g, i): ComponentInstance[] => [
    {
      id: wireYId(g.key),
      type: "wire",
      color: "green",
      from: { ic: icId(g.key), pin: "Y" },
      to: { component: resId(g.key), end: "p1" },
    },
    {
      id: wireRId(g.key),
      type: "wire",
      color: "yellow",
      from: { component: resId(g.key), end: "p2" },
      to: { led: ledId(g.key), end: "anode" },
    },
    {
      id: wireGndId(g.key),
      type: "wire",
      color: "black",
      from: { led: ledId(g.key), end: "cathode" },
      to: { board: BB, rail: "gnd_top", col: i + 1 },
    },
  ],
);

export const components: ComponentInstance[] = [
  ...boardAndChips,
  ...inputWires,
  ...indicators,
  ...outputWires,
];

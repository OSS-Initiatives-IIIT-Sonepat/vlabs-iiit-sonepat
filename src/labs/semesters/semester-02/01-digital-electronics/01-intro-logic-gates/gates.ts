// Shared gate table: one source of truth for components.ts and procedure steps.
// Layout: wide breadboard (100 cols). Each gate gets a 13-column unit: the IC
// (7 cols) followed by its indicator (330 Ω at cols +7…+10, LED at +10/+11) and
// one free column. Inputs A / B are tie columns 1 and 2, wired to every IC.

export const GATES = [
  {
    key: "not",
    name: "NOT",
    type: "not-gate",
    chip: "74HC04",
    col: 4,
    twoInput: false,
    led: "red",
  },
  {
    key: "and",
    name: "AND",
    type: "and-gate",
    chip: "74HC08",
    col: 17,
    twoInput: true,
    led: "green",
  },
  {
    key: "or",
    name: "OR",
    type: "or-gate",
    chip: "74HC32",
    col: 30,
    twoInput: true,
    led: "yellow",
  },
  {
    key: "nand",
    name: "NAND",
    type: "nand-gate",
    chip: "74HC00",
    col: 43,
    twoInput: true,
    led: "blue",
  },
  {
    key: "nor",
    name: "NOR",
    type: "nor-gate",
    chip: "74HC02",
    col: 56,
    twoInput: true,
    led: "white",
  },
  {
    key: "xor",
    name: "EX-OR",
    type: "xor-gate",
    chip: "74HC86",
    col: 69,
    twoInput: true,
    led: "red",
  },
  {
    key: "xnor",
    name: "EX-NOR",
    type: "xnor-gate",
    chip: "74HC7266",
    col: 82,
    twoInput: true,
    led: "green",
  },
] as const;

export type GateKey = (typeof GATES)[number]["key"];

export const icId = (k: GateKey) => `ic_${k}`;
export const resId = (k: GateKey) => `r_${k}`;
export const ledId = (k: GateKey) => `led_${k}`;
export const wireAId = (k: GateKey) => `w_a_${k}`;
export const wireBId = (k: GateKey) => `w_b_${k}`;
export const wireYId = (k: GateKey) => `w_y_${k}`;
export const wireGndId = (k: GateKey) => `w_gnd_${k}`;

export const BB = "bb";

export const vccId = (k: GateKey) => `w_vcc_${icId(k)}`;
export const gndId = (k: GateKey) => `w_gnd_${icId(k)}`;

/** Chips, the supply and every chip's VCC / GND jumper. */
export const allIcIds = [
  "psu",
  "w_rail_link",
  ...GATES.flatMap((g) => [icId(g.key), vccId(g.key), gndId(g.key)]),
];

export const inputWireIds = GATES.flatMap((g) =>
  g.twoInput ? [wireAId(g.key), wireBId(g.key)] : [wireAId(g.key)],
);

export const indicatorIds = GATES.flatMap((g) => [resId(g.key), ledId(g.key)]);

export const outputWireIds = GATES.flatMap((g) => [
  wireYId(g.key),
  wireGndId(g.key),
]);

/** Every component id in the circuit, in build order. */
export const everyId = [
  BB,
  ...allIcIds,
  ...inputWireIds,
  ...indicatorIds,
  ...outputWireIds,
];

/** Boolean output of every gate for inputs (a, b). NOT uses A only. */
export function gateOutputs(a: 0 | 1, b: 0 | 1): Record<GateKey, 0 | 1> {
  return {
    not: a ? 0 : 1,
    and: a & b ? 1 : 0,
    or: a | b ? 1 : 0,
    nand: a & b ? 0 : 1,
    nor: a | b ? 0 : 1,
    xor: a ^ b ? 1 : 0,
    xnor: a ^ b ? 0 : 1,
  };
}

/** LED brightness map (1 = lit) for inputs (a, b). */
export function ledStates(a: 0 | 1, b: 0 | 1): Record<string, number> {
  const out = gateOutputs(a, b);
  return Object.fromEntries(GATES.map((g) => [ledId(g.key), out[g.key]]));
}

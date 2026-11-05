import {
  type ComponentInstance,
  type LedColor,
  type WireColor,
} from "@/labs/types";

const B = "bb";

export type Chip =
  | "not-gate"
  | "and-gate"
  | "or-gate"
  | "nand-gate"
  | "nor-gate"
  | "xor-gate"
  | "not-hex"
  | "and-quad"
  | "or-quad"
  | "nand-quad"
  | "xor-quad"
  | "adder-4bit"
  | "jk-ff"
  | "dff"
  | "mux-4to1"
  | "buffer-gate"
  | "demux-1to4"
  | "decoder-3to8"
  | "counter-4bit-sync"
  | "ram"
  | "rom"
  | "cpu"
  | "io-port";

export function ids(parts: readonly ComponentInstance[]): string[] {
  return parts.map((p) => p.id);
}

export function power(
  boardType: "long-breadboard" | "wide-breadboard" = "long-breadboard",
): ComponentInstance[] {
  return [
    { id: "bb", type: boardType },
    {
      id: "psu",
      type: "dc-jack",
      mountedAt: { board: B, col: 1, row: "a" },
      terminals: [
        { board: B, rail: "vcc_top", col: 1 },
        { board: B, rail: "gnd_top", col: 1 },
      ],
    },
    {
      id: "w_vcc_link",
      type: "wire",
      color: "red",
      from: { board: B, rail: "vcc_top", col: 2 },
      to: { board: B, rail: "vcc_bot", col: 2 },
    },
    {
      id: "w_gnd_link",
      type: "wire",
      color: "black",
      from: { board: B, rail: "gnd_top", col: 3 },
      to: { board: B, rail: "gnd_bot", col: 3 },
    },
  ];
}

export function chip(id: string, type: Chip, col: number): ComponentInstance {
  return {
    id,
    type,
    mountedAt: { board: B, col, row: "e" },
  } as ComponentInstance;
}

/** RAM or ROM with a fixed word table. Address 0 is `words[0]`. */
export function memory(
  id: string,
  type: "ram" | "rom",
  col: number,
  words: number[],
): ComponentInstance {
  return { id, type, mountedAt: { board: B, col, row: "e" }, words };
}

/** A labeled DIP that stands for a pipeline stage. Pin `out` is a tie point. */
export function stage(id: string, name: string, col: number): ComponentInstance {
  return {
    id,
    type: "block-module",
    name,
    mountedAt: { board: B, col, row: "e" },
  };
}

export function powers(id: string, col: number): ComponentInstance[] {
  return [
    {
      id: `w_vcc_${id}`,
      type: "wire",
      color: "red",
      from: { board: B, rail: "vcc_bot", col },
      to: { ic: id, pin: "VCC" },
    },
    {
      id: `w_gnd_${id}`,
      type: "wire",
      color: "black",
      from: { board: B, rail: "gnd_top", col: col + 1 },
      to: { ic: id, pin: "GND" },
    },
  ];
}

export function rail(
  id: string,
  ic: string,
  pin: string,
  level: "vcc" | "gnd",
  col: number,
): ComponentInstance {
  const high = level === "vcc";
  return {
    id,
    type: "wire",
    color: high ? "red" : "black",
    from: { board: B, rail: high ? "vcc_top" : "gnd_top", col },
    to: { ic, pin },
  };
}

/** Hole → IC pin. The wire id's second word is the activeInputs key. */
export function input(
  name: string,
  ic: string,
  pin: string,
  col: number,
  color: WireColor = "blue",
  row: "a" | "j" = "a",
): ComponentInstance {
  return {
    id: `w_${name}_${ic}`,
    type: "wire",
    color,
    from: { board: B, col, row },
    to: { ic, pin },
  };
}

export function link(
  id: string,
  fromIc: string,
  fromPin: string,
  toIc: string,
  toPin: string,
  color: WireColor = "yellow",
): ComponentInstance {
  return {
    id,
    type: "wire",
    color,
    from: { ic: fromIc, pin: fromPin },
    to: { ic: toIc, pin: toPin },
  };
}

/** 330 Ω from an IC pin into an LED, cathode to ground. */
export function lamp(
  name: string,
  ic: string,
  pin: string,
  col: number,
  row: "c" | "h",
  color: LedColor,
): ComponentInstance[] {
  return [
    {
      id: `r_${name}`,
      type: "resistor",
      ohms: 330,
      mountedAt: { board: B, col, row },
    },
    {
      id: `led_${name}`,
      type: "led",
      color,
      mountedAt: { board: B, col: col + 4, row },
    },
    {
      id: `w_${name}_r`,
      type: "wire",
      color: "green",
      from: { ic, pin },
      to: { component: `r_${name}`, end: "p1" },
    },
    {
      id: `w_${name}_led`,
      type: "wire",
      color: "green",
      from: { component: `r_${name}`, end: "p2" },
      to: { led: `led_${name}`, end: "anode" },
    },
    {
      id: `w_${name}_gnd`,
      type: "wire",
      color: "black",
      from: { led: `led_${name}`, end: "cathode" },
      to: {
        board: B,
        rail: row === "c" ? "gnd_top" : "gnd_bot",
        col: col + 5,
      },
    },
  ];
}

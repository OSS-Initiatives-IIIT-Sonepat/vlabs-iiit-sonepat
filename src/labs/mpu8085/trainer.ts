/**
 * The 8085 trainer kit: what its keys, displays and register panel show at
 * one procedure step. The scene draws a `KitFrame`; `trainer-steps.ts`
 * builds the frames from a program.
 */

export type TrainerKey =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "RESET"
  | "VCT"
  | "SHIFT"
  | "GO"
  | "SI"
  | "EXREG"
  | "EXMEM"
  | "INS"
  | "PREV"
  | "NEXT"
  | "DEL"
  | "FILL"
  | "BM"
  | "REL"
  | "STR"
  | "EXEC";

/** Function keys, left of the hex keys, top row first. */
export const FN_KEYS: readonly (readonly TrainerKey[])[] = [
  ["RESET", "VCT", "SHIFT", "GO"],
  ["SI", "EXREG", "EXMEM", "INS"],
  ["PREV", "NEXT", "DEL", "FILL"],
  ["BM", "REL", "STR", "EXEC"],
];

export const HEX_KEYS: readonly (readonly TrainerKey[])[] = [
  ["C", "D", "E", "F"],
  ["8", "9", "A", "B"],
  ["4", "5", "6", "7"],
  ["0", "1", "2", "3"],
];

/** What is printed on each key. */
export const KEY_LEGEND: Record<TrainerKey, string> = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
  RESET: "RESET",
  VCT: "VCT INT",
  SHIFT: "SHIFT",
  GO: "GO",
  SI: "SI",
  EXREG: "EX REG",
  EXMEM: "EX MEM",
  INS: "INS",
  PREV: "PREV",
  NEXT: "NEXT ,",
  DEL: "DEL",
  FILL: "FILL",
  BM: "B.M",
  REL: "REL",
  STR: "STRING",
  EXEC: "EXEC .",
};

export type Reg8 = "A" | "B" | "C" | "D" | "E" | "H" | "L";
export const REG8: readonly Reg8[] = ["A", "B", "C", "D", "E", "H", "L"];

/** The programmer's registers, plus the opcode last fetched (IR). */
export type KitRegs = Record<Reg8, number> & {
  /** S Z - AC - P - CY, as PUSH PSW stores it. */
  F: number;
  SP: number;
  PC: number;
  IR: number;
};

/**
 * A place a byte can come from or go to. `M8000` is the memory cell at
 * 8000H: on the memory panel when that row is shown, else the RAM chip.
 * CODE is the program listing on the LCD, where the next bytes are read.
 */
export type KitSpot =
  | Reg8
  | "F"
  | "SP"
  | "PC"
  | "IR"
  | "ALU"
  | "CODE"
  | "RAM"
  | "KEYS"
  | `M${string}`;

/** One byte (or word) moving from one place to another. */
export type KitMove = { from: KitSpot; to: KitSpot; text: string };

export type KitLcd =
  | { mode: "off" }
  | { mode: "sign-on" }
  /** Typing in: bytes up to `upto` are stored, `at` is the open address. */
  | { mode: "edit"; at: number; upto: number }
  /** Single step: `pc` is the next instruction. */
  | { mode: "run"; pc: number; halted: boolean }
  | { mode: "read"; at: number };

export type KitState = {
  power: boolean;
  regs: KitRegs;
  /** The memory panel, row by row, eight cells a row. */
  mem: number[];
  /** Six digits: four of address, two of data. */
  digits: string;
  lcd: KitLcd;
  /** Address and data bus LEDs. Null leaves them dark. */
  abus: number | null;
  dbus: number | null;
};

/** One key press and what the kit shows once it is taken. */
export type KitPress = {
  key: TrainerKey;
  digits: string;
  lcd: KitLcd;
  mem: number[];
};

export type KitFrame = {
  before: KitState;
  after: KitState;
  /** Keys pressed in this step, in order. */
  keys: KitPress[];
  /** Moves after the keys. The moves of one stage fly together. */
  stages: KitMove[][];
  /** Shown on the ALU while it works, such as "25H + 17H = 3CH". */
  alu?: string;
  /** What changed in this step, outlined in blue. */
  hot: KitSpot[];
  /** Which part of the kit the camera favours. */
  focus: "all" | "keys" | "run";
};

export type KitListingLine = {
  address: number;
  bytes: number[];
  /** The instruction, without its comment, such as "LDA 8000H". */
  text: string;
  label?: string;
};

/** What a lab's kit holds for every step: the program and the memory rows. */
export type KitProgram = {
  listing: KitListingLine[];
  /** Base address of each memory panel row (eight cells each). */
  rows: number[];
};

export const hex2 = (n: number) =>
  (n & 0xff).toString(16).toUpperCase().padStart(2, "0");
export const hex4 = (n: number) =>
  (n & 0xffff).toString(16).toUpperCase().padStart(4, "0");

/** The cell index of `address` on the memory panel, or -1. */
export function cellOf(rows: readonly number[], address: number): number {
  for (let r = 0; r < rows.length; r++) {
    const off = address - rows[r];
    if (off >= 0 && off < 8) return r * 8 + off;
  }
  return -1;
}

export const FLAG_BITS = [
  ["S", 0x80],
  ["Z", 0x40],
  ["AC", 0x10],
  ["P", 0x04],
  ["CY", 0x01],
] as const;

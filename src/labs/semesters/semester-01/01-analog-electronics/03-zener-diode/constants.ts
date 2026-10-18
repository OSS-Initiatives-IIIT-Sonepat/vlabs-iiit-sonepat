import {
  holePos,
  railPos,
  resistorP1,
  resistorP2,
  TOP_Y,
} from "@/labs/marker-helpers";

// ── Zener diode circuit layout on the breadboard ───────────────────────────
//   r1: resistor at col 5, row c  (p1=col5, p2=col8)
//   zener: col 10, row c  (anode=col10, cathode=col13, same footprint as a resistor)
//   vcc rail tap at col 5 (top red rail)
//   gnd rail tap at col 13 (top blue rail)

export const R1_COL = 5;
export const R1_ROW = "c";
export const ZD_COL = 10;
export const ZD_ROW = "c";
export const HOVER = 0.55;

const hover = ([x, , z]: [number, number, number]): [number, number, number] => [x, TOP_Y + HOVER, z];

export const M = {
  r1_p1: hover(resistorP1(R1_COL, R1_ROW)),
  r1_p2: hover(resistorP2(R1_COL, R1_ROW)),
  zd_anode: hover(resistorP1(ZD_COL, ZD_ROW)),
  zd_cathode: hover(resistorP2(ZD_COL, ZD_ROW)),
  vcc_rail: hover(railPos(R1_COL, "vcc_top")),
  gnd_rail: hover(railPos(ZD_COL + 3, "gnd_top")),
  vm_pos: hover(holePos(ZD_COL, "a")),
  vm_neg: hover(holePos(ZD_COL + 3, "a")),
};

export const DOWN: [number, number, number] = [0, -1, 0];

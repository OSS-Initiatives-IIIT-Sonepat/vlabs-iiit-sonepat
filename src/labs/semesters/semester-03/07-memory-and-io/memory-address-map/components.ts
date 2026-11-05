import { type ComponentInstance } from "@/labs/types";
import {
  chip,
  ids,
  input,
  lamp,
  link,
  memory,
  power,
  powers,
  rail,
} from "@/labs/semesters/semester-03/_coa/breadboard";

const powerParts = power();
const decoderParts: ComponentInstance[] = [
  chip("dec", "decoder-3to8", 8),
  ...powers("dec", 8),
  input("a0", "dec", "a0", 4, "blue"),
  rail("w_a1_gnd", "dec", "a1", "gnd", 16),
  rail("w_a2_gnd", "dec", "a2", "gnd", 17),
  rail("w_e1_vcc", "dec", "e1", "vcc", 18),
  rail("w_e2_gnd", "dec", "e2", "gnd", 19),
  rail("w_e3_gnd", "dec", "e3", "gnd", 20),
];

function rom(id: string, col: number, word: number, select: "y0" | "y1"): ComponentInstance[] {
  return [
    memory(id, "rom", col, [word]),
    ...powers(id, col),
    rail(`w_oe_${id}`, id, "oe", "gnd", col + 8),
    rail(`w_a0_${id}`, id, "a0", "gnd", col + 9),
    rail(`w_a1_${id}`, id, "a1", "gnd", col + 10),
    rail(`w_a2_${id}`, id, "a2", "gnd", col + 11),
    rail(`w_a3_${id}`, id, "a3", "gnd", col + 12),
    link(`w_${select}_${id}`, "dec", select, id, "cs"),
  ];
}

const rom0 = rom("rom0", 24, 0b0011, "y0");
const rom1 = rom("rom1", 40, 0b1100, "y1");
const bus: ComponentInstance[] = [
  link("w_d0", "rom0", "d0", "rom1", "d0"),
  link("w_d1", "rom0", "d1", "rom1", "d1"),
  link("w_d2", "rom0", "d2", "rom1", "d2"),
  link("w_d3", "rom0", "d3", "rom1", "d3"),
  ...lamp("d0", "rom0", "d0", 49, "c", "green"),
  ...lamp("d1", "rom0", "d1", 55, "c", "green"),
  ...lamp("d2", "rom0", "d2", 49, "h", "yellow"),
  ...lamp("d3", "rom0", "d3", 55, "h", "yellow"),
];

export const stages = {
  power: ids(powerParts),
  decoder: ids(decoderParts),
  roms: ids([...rom0, ...rom1, ...bus]),
};

export const components: ComponentInstance[] = [
  ...powerParts,
  ...decoderParts,
  ...rom0,
  ...rom1,
  ...bus,
];

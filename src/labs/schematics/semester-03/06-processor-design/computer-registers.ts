import { type SchematicElement } from "@/labs/CircuitSchematic";
import { block, frames, label } from "../diagram";

const W = 1040;

/** One register bar. `left` is the left edge, so 12-bit and 16-bit bars share that edge. */
function regBar(
  id: string,
  left: number,
  y: number,
  width: number,
  bits: [string, string],
  name: string,
  role: string,
  hot: boolean,
  caption: "beside" | "below",
): SchematicElement[] {
  const x = left + width / 2;
  const nameEl =
    caption === "beside"
      ? [
          label(`${id}name`, left + width + 160, y - 6, name),
          label(`${id}role`, left + width + 160, y + 12, role),
        ]
      : [
          label(`${id}name`, x, y + 32, name),
          label(`${id}role`, x, y + 48, role),
        ];
  return [
    label(`${id}hi`, left + 8, y - 22, bits[0]),
    label(`${id}lo`, left + width - 8, y - 22, bits[1]),
    block(id, x, y, width, 28, id.toUpperCase(), hot),
    ...nameEl,
  ];
}

function registerMap(show: string[], hot: string[]): SchematicElement[] {
  const on = (id: string) => hot.includes(id);
  const has = (id: string) => show.includes(id);
  const els: SchematicElement[] = [];
  const left = 70;
  if (has("pc"))
    els.push(
      ...regBar("pc", left, 78, 150, ["11", "0"], "Program Counter (12)", "Holds address of instruction", on("pc"), "beside"),
    );
  if (has("ar"))
    els.push(
      ...regBar("ar", left, 158, 150, ["11", "0"], "Address Register (12)", "Holds address for memory", on("ar"), "beside"),
    );
  if (has("ir"))
    els.push(
      ...regBar("ir", left, 238, 200, ["15", "0"], "Instruction Register (16)", "Holds instruction code", on("ir"), "beside"),
    );
  if (has("tr"))
    els.push(
      ...regBar("tr", left, 318, 200, ["15", "0"], "Temporary Register (16)", "Holds temporary data", on("tr"), "beside"),
    );
  if (has("dr"))
    els.push(
      ...regBar("dr", left, 398, 200, ["15", "0"], "Data Register (16)", "Holds memory operand", on("dr"), "beside"),
    );
  if (has("ac"))
    els.push(
      ...regBar("ac", 680, 78, 200, ["15", "0"], "Accumulator (16)", "Processor register", on("ac"), "below"),
    );
  if (has("outr"))
    els.push(
      ...regBar("outr", 700, 250, 120, ["7", "0"], "Output Register (8)", "Holds output character", on("outr"), "below"),
    );
  if (has("inpr"))
    els.push(
      ...regBar("inpr", 700, 360, 120, ["7", "0"], "Input Register (8)", "Holds input character", on("inpr"), "below"),
    );
  if (has("mem")) {
    els.push(block("mem", 860, 180, 150, 70, "Memory", on("mem")));
    els.push(label("mw", 860, 232, "4096 words"));
    els.push(label("mb", 860, 248, "16 bits per word"));
  }
  return els;
}

const RED = "#dc2626";
const BLUE = "#2563eb";
const GRAY = "#d4d4d4";
const BAR = "#8a8a8a";
const BUSX = 860;

const RX = 530;
const RW = 148;
const PIN_L = RX - RW / 2;
const PIN_R = RX + RW / 2;
const FRAME_L = 250;
const FRAME_R = 980;
const FRAME_T = 44;
const FRAME_B = 732;
const FRAME_W = 28;
const RAIL_R = FRAME_L + FRAME_W;
const BUS_L = FRAME_R - FRAME_W;
const NUM_X = FRAME_R + 18;
const DROP = 700;
const INK = "#171717";

function box(id: string, x: number, y: number, w: number, h: number, name: string, fill = GRAY): SchematicElement {
  return { type: "block", id, x, y, w, h, label: name, fill };
}

function ink(id: string, pts: [number, number][], color?: string): SchematicElement {
  return { type: "wire", id, points: pts.map(([x, y]) => ({ x, y })), color };
}

function head(id: string, pts: [number, number][], color?: string, size = 12): SchematicElement {
  return { type: "arrow", id, points: pts.map(([x, y]) => ({ x, y })), color, size };
}

function text(id: string, x: number, y: number, value: string, size = 11, color = INK): SchematicElement {
  return { type: "label", id, x, y, text: value, size, color };
}

function dot(id: string, x: number, y: number, color?: string): SchematicElement {
  return { type: "junction", id, x, y, color };
}

/** LD, or LD INR CLR, under a register. */
function controls(id: string, y: number, all: boolean): SchematicElement[] {
  if (!all) return [text(`${id}ld`, RX, y, "LD")];
  return [
    text(`${id}ld`, RX - 40, y, "LD"),
    text(`${id}inr`, RX + 18, y, "INR"),
    text(`${id}clr`, RX + 52, y, "CLR"),
  ];
}

/** Arrow from inside the left bar into the left side of a box. The dot stays in the bar. */
function intoBox(id: string, y: number, pinX: number): SchematicElement[] {
  const start = RAIL_R - 5;
  return [
    dot(`jin_${id}`, start, y, BAR),
    head(`ain_${id}`, [[start, y], [pinX, y]], undefined, 11),
  ];
}

/** From the left rail into the register, and the elbow out to a numbered bus dot. */
function hooked(id: string, y: number, tapY: number, color?: string): SchematicElement[] {
  return [
    ...intoBox(id, y, PIN_L),
    ink(`wout_${id}`, [[PIN_R, y], [DROP, y], [DROP, tapY], [BUS_L, tapY]], color),
    dot(`jout_${id}`, BUS_L, tapY, color),
    text(`n_${id}`, NUM_X, tapY, id),
  ];
}

/**
 * The common-bus slide.
 * Bus numbers are the select codes. Blue is AC ← DR. Red is DR ← AC.
 */
function busSystem(show: string[], colors: boolean): SchematicElement[] {
  const has = (id: string) => show.includes(id);
  const els: SchematicElement[] = [];
  const y = { mem: 74, ar: 152, pc: 208, dr: 264, ac: 364, inpr: 436, ir: 492, tr: 548, outr: 604 };

  els.push({
    type: "panel",
    id: "frame",
    x: (FRAME_L + FRAME_R) / 2,
    y: (FRAME_T + FRAME_B) / 2,
    w: FRAME_R - FRAME_L,
    h: FRAME_B - FRAME_T,
    t: FRAME_W,
    fill: BAR,
  });
  els.push(text("busname", FRAME_R - FRAME_W / 2, FRAME_T + 22, "Bus", 13));

  const bits: [string, string, number][] = [
    ["1", "S2", 68],
    ["0", "S1", 86],
    ["0", "S0", 104],
  ];
  for (const [bit, name, by] of bits) {
    els.push(text(`bit_${name}`, 860, by, bit, 14, RED));
    els.push(text(`sel_${name}`, 892, by, name, 11));
    els.push(dot(`jsel_${name}`, BUS_L, by, BAR));
    els.push(head(`arr_${name}`, [[904, by], [BUS_L, by]], undefined, 12));
  }

  if (has("mem")) {
    const memW = 168;
    els.push(box("mem", RX, y.mem, memW, 42, "Memory\n4096 x 16"));
    els.push(text("write", RX - 48, y.mem + 36, "Write"));
    els.push(text("read", RX + 8, y.mem + 36, "Read"));
    els.push(text("addr", RX + 62, y.mem + 36, "Address"));
    const memR = RX + memW / 2;
    const memDrop = DROP + 40;
    els.push(...intoBox("7", y.mem, RX - memW / 2));
    els.push(ink("wout_7", [[memR, y.mem], [memDrop, y.mem], [memDrop, y.mem + 36], [BUS_L, y.mem + 36]]));
    els.push(dot("jout_7", BUS_L, y.mem + 36));
    els.push(text("n_7", NUM_X, y.mem + 36, "7"));
  }
  if (has("ar")) {
    els.push(box("ar", RX, y.ar, RW, 22, "AR"));
    els.push(...controls("ar", y.ar + 22, true));
    els.push(...hooked("1", y.ar, y.ar + 38));
  }
  if (has("pc")) {
    els.push(box("pc", RX, y.pc, RW, 22, "PC"));
    els.push(...controls("pc", y.pc + 22, true));
    els.push(...hooked("2", y.pc, y.pc + 38));
  }
  if (has("dr")) {
    const tapY = y.dr + 34;
    const near = PIN_R + 16;
    const drColor = colors ? BLUE : undefined;
    const bend = colors && has("ac") ? near : DROP;
    els.push(box("dr", RX, y.dr, RW, 22, "DR"));
    els.push(...controls("dr", y.dr + 22, true));
    els.push(text("actag", FRAME_L - 24, y.dr, "AC"));
    els.push(...intoBox("3", y.dr, PIN_L));
    els.push(ink("wdrop_3", [[PIN_R, y.dr], [bend, y.dr], [bend, tapY]], drColor));
    els.push(ink("wout_3", [[colors && has("ac") ? 310 : DROP, tapY], [BUS_L, tapY]], drColor));
    els.push(dot("jout_3", BUS_L, tapY, drColor));
    els.push(text("n_3", NUM_X, tapY, "3"));
    if (colors && has("ac")) {
      els.push(dot("jdrop_3", near, tapY));
      els.push(text("ld1", RX - 62, y.dr + 22, "1", 13, RED));
      els.push(head("w_blue", [[310, tapY], [310, y.ac], [337, y.ac]], BLUE, 14));
    }
  }
  if (has("ac")) {
    const acColor = colors ? RED : undefined;
    els.push(box("add", 385, y.ac, 96, 34, "Adder\n& Logic"));
    els.push(box("e", 422, y.ac - 25, 22, 16, "E"));
    els.push(box("ac", RX, y.ac, RW, 22, "AC"));
    els.push(...controls("ac", y.ac + 22, true));
    els.push(ink("w_alu", [[433, y.ac], [PIN_L, y.ac]]));
    els.push(ink("w_acbus", [[PIN_R, y.ac], [BUS_L, y.ac]], acColor));
    els.push(dot("j_4", BUS_L, y.ac, acColor));
    els.push(text("n_4", NUM_X, y.ac, "4"));
    const elbowY = y.ac + 52;
    els.push(ink("w_acelbow", [[594, y.ac + 28], [736, y.ac + 28], [736, elbowY], [BUS_L, elbowY]]));
    els.push(dot("j_acelbow", BUS_L, elbowY));
  }
  if (has("inpr")) {
    els.push(box("inpr", RX, y.inpr, 108, 22, "INPR"));
    els.push(...controls("inpr", y.inpr + 20, false));
    els.push(...intoBox("in", y.inpr, RX - 54));
  }
  if (has("ir")) {
    els.push(box("ir", RX, y.ir, RW, 22, "IR"));
    els.push(...controls("ir", y.ir + 20, false));
    els.push(...hooked("5", y.ir, y.ir + 34));
  }
  if (has("tr")) {
    els.push(box("tr", RX, y.tr, RW, 22, "TR"));
    els.push(...controls("tr", y.tr + 22, true));
    els.push(...hooked("6", y.tr, y.tr + 38));
  }
  if (has("outr")) {
    els.push(box("outr", RX, y.outr, 108, 22, "OUTR"));
    els.push(...controls("outr", y.outr + 20, false));
    els.push(...intoBox("out", y.outr, RX - 54));
  }
  if (has("clock")) {
    const clockY = FRAME_B - FRAME_W - 56;
    els.push(text("clock", 860, clockY, "Clock"));
    els.push(dot("j_clk", BUS_L, clockY));
    els.push(ink("w_clk", [[880, clockY], [BUS_L, clockY]]));
    els.push(text("acfoot", RX, FRAME_B - FRAME_W - 16, "AC", 14));
  }
  if (colors) {
    els.push(text("title1", 118, 150, "Common Bus", 26));
    els.push(text("title2", 118, 186, "System of", 26));
    els.push(text("title3", 118, 222, "Basic", 26));
    els.push(text("title4", 118, 258, "Computer", 26));
    els.push(text("t_drac", 118, 430, "DR  ←  AC", 18, RED));
    els.push(text("t_acdr", 118, 472, "AC  ←  DR", 18, BLUE));
  }
  return els;
}

const allRegs = ["mem", "pc", "ar", "ir", "tr", "dr", "ac", "outr", "inpr"];
const busAll = ["mem", "ar", "pc", "dr", "ac", "inpr", "ir", "tr", "outr", "clock", "drac", "acdr"];

export const computerRegistersStepSchematics = frames([
  {
    title: "Memory",
    width: W,
    height: 360,
    notes: ["4096 words, 16 bits each. Instructions and operands both live here."],
    elements: registerMap(["mem"], ["mem"]),
  },
  {
    title: "Address registers",
    width: W,
    height: 420,
    notes: ["PC holds the address of the next instruction. AR holds the address sent to memory."],
    elements: registerMap(["mem", "pc", "ar"], ["pc", "ar"]),
  },
  {
    title: "Instruction and data registers",
    width: W,
    height: 480,
    notes: ["IR holds the 16-bit instruction. DR holds the operand read from memory. TR holds a temporary word."],
    elements: registerMap(["mem", "pc", "ar", "ir", "tr", "dr"], ["ir", "tr", "dr"]),
  },
  {
    title: "Accumulator and input-output",
    width: W,
    height: 500,
    notes: ["AC is the processor register. INPR and OUTR hold one 8-bit character each."],
    elements: registerMap(allRegs, ["ac", "inpr", "outr"]),
  },
  {
    title: "Common bus",
    width: 1080,
    height: 760,
    notes: ["S2 S1 S0 choose which unit places its word on the single bus. 111 selects memory."],
    elements: busSystem(["mem"], false),
  },
  {
    title: "AR and PC",
    width: 1080,
    height: 760,
    notes: ["001 selects AR. 010 selects PC. The address into memory comes from AR."],
    elements: busSystem(["mem", "ar", "pc"], false),
  },
  {
    title: "DR, adder, and AC",
    width: 1080,
    height: 760,
    notes: ["011 selects DR. 100 selects AC. The adder and logic operate on AC, and E keeps the carry."],
    elements: busSystem(["mem", "ar", "pc", "dr", "ac"], false),
  },
  {
    title: " ",
    width: 1080,
    height: 760,
    notes: [],
    elements: busSystem(busAll, true),
  },
  {
    title: " ",
    width: 1080,
    height: 760,
    notes: [],
    elements: busSystem(busAll, true),
  },
  {
    title: " ",
    width: 1080,
    height: 760,
    notes: [],
    elements: busSystem(busAll, true),
  },
]);

export const computerRegistersTheoryDiagram = computerRegistersStepSchematics[7];

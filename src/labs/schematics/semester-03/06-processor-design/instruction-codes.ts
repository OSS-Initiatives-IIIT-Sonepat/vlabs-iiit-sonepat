import { type SchematicElement } from "@/labs/CircuitSchematic";
import { arrow, block, frames, label, terminal } from "../diagram";

const W = 1040;

/** Slide: ADD 1547, the opcode name, and the unique binary code. */
function example(hot: string[]): SchematicElement[] {
  const on = (id: string) => hot.includes(id);
  return [
    label("ex", 560, 116, "Example"),
    block("code", 560, 180, 170, 52, "ADD 1547", on("code")),
    block("opname", 210, 180, 300, 52, "Operation Code (Opcode)", on("opname")),
    terminal("unique", 830, 78, 240, 52, "Unique binary code", on("unique")),
    arrow("w_ex", [[560, 124], [560, 154]], on("w_ex")),
    arrow("w_op", [[475, 180], [360, 180]], on("w_op")),
    arrow("w_uniq", [[645, 180], [830, 180], [830, 104]], on("w_uniq")),
  ];
}

/** Slide: I | Opcode | Address, with the 16 bits of ADD 457 underneath. */
function basicFormat(hot: string[]): SchematicElement[] {
  const on = (id: string) => hot.includes(id);
  const bits = "0001010001010111";
  const bitW = 26;
  const bitH = 30;
  const left = 312;
  const bitY = 214;
  const fieldY = 128;
  const fieldH = 42;
  const cells: SchematicElement[] = [];
  for (let i = 0; i < bits.length; i++) {
    const cx = left + bitW / 2 + i * bitW;
    cells.push(block(`bit${i}`, cx, bitY, bitW, bitH, bits[i], on("bits")));
  }
  const iX = left + bitW / 2;
  const opX = left + bitW + (3 * bitW) / 2;
  const adX = left + 4 * bitW + (12 * bitW) / 2;
  return [
    label("n15", left, 92, "15"),
    label("n14", left + bitW, 92, "14"),
    label("n12", left + 4 * bitW, 92, "12"),
    label("n11", left + 4 * bitW + 22, 92, "11"),
    label("n0", left + 16 * bitW, 92, "0"),
    block("i", iX, fieldY, bitW, fieldH, "I", on("i")),
    block("opcode", opX, fieldY, 3 * bitW, fieldH, "Opcode", on("opcode")),
    block("address", adX, fieldY, 12 * bitW, fieldH, "Address", on("address")),
    label("fmt", 520, 78, "Instruction Format"),
    ...cells,
    arrow("w_i", [[iX, fieldY + fieldH / 2], [iX, bitY - bitH / 2]], on("w_i")),
    arrow("w_op", [[opX, fieldY + fieldH / 2], [opX, bitY - bitH / 2]], on("w_op")),
    { type: "junction", id: "j_ad", x: adX, y: bitY - bitH / 2 },
    arrow("w_ad", [[adX, fieldY + fieldH / 2], [adX, bitY - bitH / 2]], on("w_ad")),
    label("cap", 520, 268, "Add Instruction – ADD 457"),
  ];
}

/** Slide: one wavy memory, 4096 x 16, split into program and data. */
function stored(parts: "memory" | "full", hot: string[]): SchematicElement[] {
  const on = (id: string) => hot.includes(id);
  const mx = 800;
  const my = 210;
  const mw = 210;
  const mh = 180;
  const memory: SchematicElement[] = [
    { type: "stack", id: "mem", x: mx, y: my, w: mw, h: mh, split: true, highlight: on("mem") },
    label("memtitle", mx, 62, "Memory"),
    label("memsize", mx, 80, "4096 x 16"),
    label("instr", mx, my - 45, "Instructions (program)"),
    label("data", mx, my + 45, "Operand (data)"),
  ];
  if (parts === "memory") return memory;
  const edge = mx - mw / 2;
  return [
    ...memory,
    label("f15", 175, 118, "15"),
    label("f12", 305, 118, "12"),
    label("f11", 345, 118, "11"),
    label("f0", 655, 118, "0"),
    block("opcode", 240, 165, 150, 46, "Opcode", on("opcode")),
    block("address", 490, 165, 350, 46, "Address", on("address")),
    label("fmt", 400, 206, "Instruction Format"),
    label("o15", 175, 218, "15"),
    label("o0", 655, 218, "0"),
    block("operand", 415, 255, 480, 46, "Binary Operand", on("operand")),
    { type: "junction", id: "j_fmt", x: edge, y: 165 },
    { type: "junction", id: "j_opnd", x: edge, y: 255 },
    arrow("w_fmt", [[edge, 165], [665, 165]], on("w_fmt")),
    arrow("w_opnd", [[edge, 255], [655, 255]], on("w_opnd")),
    block("ac", mx, 400, 300, 56, "Processor Register (accumulator or AC)", on("ac")),
  ];
}

/**
 * One memory column from the direct / indirect slide.
 * Addresses sit outside the stack. The arrow drops from the address cell,
 * through each next word, then left and down into the circled plus and AC.
 */
function column(prefix: string, x: number, mode: "direct" | "indirect", hot: string[]): SchematicElement[] {
  const on = (id: string) => hot.includes(id);
  const stackW = 220;
  const stackH = 196;
  const stackY = 168;
  const left = x - stackW / 2;
  const cellsLeft = left + 20;
  const rowH = 30;
  const iW = 34;
  const addW = 64;
  const addrW = 74;
  const iX = cellsLeft + iW / 2;
  const addX = cellsLeft + iW + addW / 2;
  const addrX = cellsLeft + iW + addW + addrW / 2;
  const wordW = iW + addW + addrW;
  const opX = cellsLeft + wordW / 2;
  const instrY = mode === "direct" ? 124 : 102;
  const midY = 160;
  const opY = 216;
  const opH = 32;
  const plusY = 352;
  const plusH = 40;
  const acY = 424;
  const turnY = 312;
  const elements: SchematicElement[] = [
    { type: "stack", id: `${prefix}mem`, x, y: stackY, w: stackW, h: stackH, highlight: on(`${prefix}mem`) },
    label(`${prefix}la`, left - 16, instrY, mode === "direct" ? "22" : "35"),
    block(`${prefix}i`, iX, instrY, iW, rowH, mode === "direct" ? "0" : "1", on(`${prefix}i`)),
    block(`${prefix}add`, addX, instrY, addW, rowH, "ADD", on(`${prefix}add`)),
    block(`${prefix}addr`, addrX, instrY, addrW, rowH, mode === "direct" ? "457" : "300", on(`${prefix}addr`)),
    label(`${prefix}lop`, left - 18, opY, mode === "direct" ? "457" : "1350"),
    block(`${prefix}op`, opX, opY, wordW, opH, "Operand", on(`${prefix}op`)),
    { type: "junction", id: `${prefix}jtop`, x: addrX, y: opY - opH / 2 },
    { type: "junction", id: `${prefix}jbot`, x: addrX, y: opY + opH / 2 },
    terminal(`${prefix}plus`, x, plusY, plusH, plusH, "+", on(`${prefix}plus`)),
    block(`${prefix}ac`, x, acY, 140, 40, "AC", on(`${prefix}ac`)),
    arrow(
      `${prefix}wac`,
      [[addrX, opY + opH / 2], [addrX, turnY], [x, turnY], [x, plusY - plusH / 2]],
      on(`${prefix}wac`),
    ),
    arrow(`${prefix}wdn`, [[x, plusY + plusH / 2], [x, acY - 20]], on(`${prefix}wdn`)),
  ];
  if (mode === "direct") {
    elements.push(
      arrow(`${prefix}wop`, [[addrX, instrY + rowH / 2], [addrX, opY - opH / 2]], on(`${prefix}wop`)),
    );
  } else {
    elements.push(
      label(`${prefix}lptr`, left - 18, midY, "300"),
      block(`${prefix}ptr`, addrX, midY, 84, 32, "1350", on(`${prefix}ptr`)),
      arrow(`${prefix}w0`, [[addrX, instrY + rowH / 2], [addrX, midY - 16]], on(`${prefix}w0`)),
      arrow(`${prefix}wop`, [[addrX, midY + 16], [addrX, opY - opH / 2]], on(`${prefix}wop`)),
    );
  }
  return elements;
}

export const instructionCodesStepSchematics = frames([
  {
    title: "Program",
    width: W,
    height: 220,
    notes: ["A program is the sequence of instructions the computer will follow."],
    elements: [block("program", 520, 110, 280, 52, "Program", true)],
  },
  {
    title: "Computer instruction",
    width: W,
    height: 460,
    notes: ["Memory is read into the control register, which then issues micro-operations."],
    elements: [
      block("program", 520, 90, 260, 48, "Program"),
      block("instruction", 520, 180, 320, 48, "Computer instruction", true),
      block("control", 520, 270, 280, 48, "Control register"),
      block("micro", 520, 360, 300, 48, "Micro-operations"),
      arrow("w0", [[520, 114], [520, 156]]),
      arrow("w1", [[520, 204], [520, 246]], true),
      arrow("w2", [[520, 294], [520, 336]]),
    ],
  },
  {
    title: "Instruction code",
    width: W,
    height: 340,
    notes: ["ADD 1547 is one instruction. ADD is the opcode and 1547 is the address."],
    elements: example(["code", "w_ex", "w_op", "w_uniq"]),
  },
  {
    title: "Instruction format of the basic computer",
    width: W,
    height: 360,
    notes: ["Bit 15 is I, bits 14-12 are the opcode, bits 11-0 are the address. ADD 457 is 0001 0100 0101 0111."],
    elements: basicFormat(["i", "opcode", "address", "bits", "w_i", "w_op", "w_ad"]),
  },
  {
    title: "Stored program",
    width: W,
    height: 420,
    notes: ["4096 words of 16 bits. Instructions and operands share this memory."],
    elements: stored("memory", ["instr", "data"]),
  },
  {
    title: "Instruction format",
    width: W,
    height: 490,
    notes: ["Bits 15-12 are the opcode. Bits 11-0 are the address. The AC is a processor register."],
    elements: stored("full", ["opcode", "address", "w_fmt", "operand", "w_opnd", "ac"]),
  },
  {
    title: "Direct address",
    width: 1080,
    height: 520,
    notes: ["I is 0, so 457 is the operand address. That word is added to AC."],
    elements: [
      label("dtitle", 250, 42, "Direct"),
      ...column("d", 250, "direct", ["dmem", "di", "dadd", "daddr", "dop", "dwop", "dwac", "dplus", "dac", "dwdn"]),
    ],
  },
  {
    title: "Direct and indirect address",
    width: 1080,
    height: 520,
    notes: ["I is 1, so address 300 holds 1350. The operand at 1350 is added to AC."],
    elements: [
      label("dtitle", 250, 42, "Direct"),
      label("ititle", 790, 42, "Indirect"),
      ...column("d", 250, "direct", []),
      ...column("i", 790, "indirect", ["imem", "ii", "iadd", "iaddr", "iptr", "iop", "iw0", "iwop", "iwac", "iplus", "iac", "iwdn"]),
    ],
  },
]);

export const instructionCodesTheoryDiagram = instructionCodesStepSchematics[5];

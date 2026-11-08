import { CPU8085, assemble, entryAddress } from "@/labs/emulator";
import { type SceneProcedureStep } from "@/labs/experiments/types";

import {
  FLAG_BITS,
  REG8,
  cellOf,
  hex2,
  hex4,
  type KitFrame,
  type KitLcd,
  type KitListingLine,
  type KitMove,
  type KitPress,
  type KitProgram,
  type KitRegs,
  type KitSpot,
  type KitState,
  type Reg8,
  type TrainerKey,
} from "./trainer";

export type TrainerLab = {
  program: KitProgram;
  steps: SceneProcedureStep[];
  /** The kit signed on, before any program is typed. */
  overview: KitFrame;
  /** The kit after the last step, with nothing moving. */
  final: KitFrame;
};

/** Execution steps shown one instruction at a time before loops are run as passes. */
const MAX_PASSES = 6;
/** Most key presses drawn for one step. */
const MAX_KEYS = 64;
/** Instructions per "type in" step. */
const CHUNK = 4;

const v = (n: number) => `${hex2(n)}H`;
const w = (n: number) => `${hex4(n)}H`;

function parseBytes(text: string): number[] {
  return text.trim()
    ? text
        .trim()
        .split(/\s+/)
        .map((b) => parseInt(b, 16))
    : [];
}

/** Source line without its comment and label: "LOOP: MOV A,M ; x" → "MOV A,M". */
function splitSource(source: string): { label?: string; text: string } {
  const code = source.split(";")[0];
  const m = /^\s*([A-Za-z_][\w]*):(.*)$/.exec(code);
  const label = m ? m[1].toUpperCase() : undefined;
  const text = (m ? m[2] : code).trim().replace(/\s+/g, " ");
  const parts = /^(\S+)\s*(.*)$/.exec(text);
  if (!parts) return { label, text: "" };
  const ops = parts[2].replace(/\s*,\s*/g, ",");
  return {
    label,
    text: ops ? `${parts[1].toUpperCase()} ${ops}` : parts[1].toUpperCase(),
  };
}

const isData = (text: string) => /^D[BW]\b/i.test(text);

function flagsByte(f: {
  S: boolean;
  Z: boolean;
  AC: boolean;
  P: boolean;
  CY: boolean;
}): number {
  return (
    (f.S ? 0x80 : 0) |
    (f.Z ? 0x40 : 0) |
    (f.AC ? 0x10 : 0) |
    (f.P ? 0x04 : 0) |
    0x02 |
    (f.CY ? 0x01 : 0)
  );
}

function regsOf(cpu: CPU8085, ir: number): KitRegs {
  const s = cpu.getState();
  return {
    A: s.A,
    B: s.B,
    C: s.C,
    D: s.D,
    E: s.E,
    H: s.H,
    L: s.L,
    F: flagsByte(s.flags),
    SP: s.SP,
    PC: s.PC,
    IR: ir,
  };
}

const flag = (f: number, name: string) =>
  (f & (FLAG_BITS.find(([n]) => n === name)?.[1] ?? 0) ? 1 : 0) as 0 | 1;

function flagLine(before: number, after: number): string {
  const all = FLAG_BITS.map(([n]) => `${n} ${flag(after, n)}`).join(", ");
  const moved = FLAG_BITS.filter(([, bit]) => (before ^ after) & bit).map(
    ([n]) => n,
  );
  return moved.length
    ? `Flags: ${all}. ${moved.join(" and ")} changed.`
    : `Flags: ${all}. None changed.`;
}

// ── One instruction: what moves, and what to say ──────────────────────────

type Pair = "B" | "D" | "H" | "SP" | "PSW";
const PAIR_REGS: Record<Exclude<Pair, "SP">, [KitSpot, KitSpot]> = {
  B: ["B", "C"],
  D: ["D", "E"],
  H: ["H", "L"],
  PSW: ["A", "F"],
};
const PAIR_NAME: Record<Pair, string> = {
  B: "BC",
  D: "DE",
  H: "HL",
  SP: "SP",
  PSW: "PSW",
};

const COND: Record<string, { flag: string; when: 0 | 1; say: string }> = {
  NZ: { flag: "Z", when: 0, say: "Z = 0" },
  Z: { flag: "Z", when: 1, say: "Z = 1" },
  NC: { flag: "CY", when: 0, say: "CY = 0" },
  C: { flag: "CY", when: 1, say: "CY = 1" },
  PO: { flag: "P", when: 0, say: "P = 0" },
  PE: { flag: "P", when: 1, say: "P = 1" },
  P: { flag: "S", when: 0, say: "S = 0" },
  M: { flag: "S", when: 1, say: "S = 1" },
};

type Effect = {
  stages: KitMove[][];
  alu?: string;
  lines: string[];
  /** Memory the instruction reads or writes, for the bus LEDs. */
  bus?: { addr: number; data: number };
};

type Ctx = {
  text: string;
  bytes: number[];
  at: number;
  b: KitRegs;
  a: KitRegs;
  /** Memory before the instruction ran. */
  rd: (addr: number) => number;
  /** Memory after it ran. */
  rdAfter: (addr: number) => number;
  labelOf: (addr: number) => string | undefined;
};

const pairValue = (r: KitRegs, p: Pair) =>
  p === "SP"
    ? r.SP
    : p === "PSW"
      ? (r.A << 8) | r.F
      : ((r[PAIR_REGS[p][0] as Reg8] << 8) | r[PAIR_REGS[p][1] as Reg8]) &
        0xffff;

function effectOf(c: Ctx): Effect {
  const [mn, opText = ""] = c.text.split(" ");
  const ops = opText ? opText.split(",") : [];
  const { b, a } = c;
  const imm8 = c.bytes[1] ?? 0;
  const imm16 = ((c.bytes[2] ?? 0) << 8) | (c.bytes[1] ?? 0);
  const hl = pairValue(b, "H");
  const fetch: KitMove = { from: "CODE", to: "IR", text: hex2(c.bytes[0]) };
  const src = (r: string): { spot: KitSpot; val: number; name: string } =>
    r === "M"
      ? { spot: `M${hex4(hl)}`, val: c.rd(hl), name: `M (${w(hl)})` }
      : { spot: r as Reg8, val: b[r as Reg8], name: r };
  const target = (addr: number) => c.labelOf(addr) ?? w(addr);
  const fl = () => flagLine(b.F, a.F);
  const out = (
    stages: KitMove[][],
    lines: string[],
    extra?: Partial<Effect>,
  ) => ({
    stages: [[fetch], ...stages],
    lines,
    ...extra,
  });

  switch (mn) {
    case "MOV": {
      const [d, s] = ops;
      const from = src(s);
      const to: KitSpot = d === "M" ? `M${hex4(hl)}` : (d as Reg8);
      const into = d === "M" ? `memory at ${w(hl)}, the cell HL points to` : d;
      return out(
        [[{ from: from.spot, to, text: hex2(from.val) }]],
        [
          `MOV ${d},${s} copies ${from.name} into ${into}: ${v(from.val)}. The source keeps its copy.`,
          "MOV does not touch the flags.",
        ],
        d === "M" || s === "M"
          ? { bus: { addr: hl, data: from.val } }
          : undefined,
      );
    }
    case "MVI": {
      const d = ops[0];
      const to: KitSpot = d === "M" ? `M${hex4(hl)}` : (d as Reg8);
      return out(
        [[{ from: "CODE", to, text: hex2(imm8) }]],
        [
          `${c.text} puts ${v(imm8)}, the byte after the opcode, into ${d === "M" ? `memory at ${w(hl)}` : d}.`,
          "No flags change.",
        ],
        { bus: { addr: c.at + 1, data: imm8 } },
      );
    }
    case "LXI": {
      const p = ops[0] as Pair;
      if (p === "SP")
        return out(
          [[{ from: "CODE", to: "SP", text: hex4(imm16) }]],
          [
            `LXI SP sets the stack pointer to ${w(imm16)}. PUSH and CALL will store below it.`,
            `The two bytes after the opcode come low first: ${hex2(imm16)} then ${hex2(imm16 >> 8)}.`,
          ],
        );
      const [hi, lo] = PAIR_REGS[p as "B" | "D" | "H"];
      return out(
        [
          [
            { from: "CODE", to: lo, text: hex2(imm16) },
            { from: "CODE", to: hi, text: hex2(imm16 >> 8) },
          ],
        ],
        [
          `LXI ${p} loads the pair ${PAIR_NAME[p]} with ${w(imm16)}: ${hi} = ${v(imm16 >> 8)}, ${lo} = ${v(imm16)}.`,
          p === "H"
            ? `HL now points at ${w(imm16)}. M means that cell from here on.`
            : `The low byte, ${v(imm16)}, was stored first in the program.`,
        ],
      );
    }
    case "LDA":
      return out(
        [[{ from: `M${hex4(imm16)}`, to: "A", text: hex2(a.A) }]],
        [
          `LDA ${w(imm16)} reads the byte at ${w(imm16)} into A. A = ${v(a.A)}.`,
          "The address bus carries " +
            w(imm16) +
            ", the data bus brings back " +
            v(a.A) +
            ". No flags change.",
        ],
        { bus: { addr: imm16, data: a.A } },
      );
    case "STA":
      return out(
        [[{ from: "A", to: `M${hex4(imm16)}`, text: hex2(b.A) }]],
        [
          `STA ${w(imm16)} writes A (${v(b.A)}) into memory at ${w(imm16)}.`,
          "A keeps its value. No flags change.",
        ],
        { bus: { addr: imm16, data: b.A } },
      );
    case "LHLD":
      return out(
        [
          [
            { from: `M${hex4(imm16)}`, to: "L", text: hex2(a.L) },
            { from: `M${hex4(imm16 + 1)}`, to: "H", text: hex2(a.H) },
          ],
        ],
        [
          `LHLD ${w(imm16)} loads L from ${w(imm16)} and H from ${w(imm16 + 1)}. HL = ${w(pairValue(a, "H"))}.`,
        ],
        { bus: { addr: imm16, data: a.L } },
      );
    case "SHLD":
      return out(
        [
          [
            { from: "L", to: `M${hex4(imm16)}`, text: hex2(b.L) },
            { from: "H", to: `M${hex4(imm16 + 1)}`, text: hex2(b.H) },
          ],
        ],
        [
          `SHLD ${w(imm16)} stores L (${v(b.L)}) at ${w(imm16)} and H (${v(b.H)}) at ${w(imm16 + 1)}: low byte first.`,
          "No flags change.",
        ],
        { bus: { addr: imm16, data: b.L } },
      );
    case "LDAX":
    case "STAX": {
      const p = ops[0] as Pair;
      const addr = pairValue(b, p);
      const load = mn === "LDAX";
      return out(
        [
          [
            load
              ? { from: `M${hex4(addr)}`, to: "A", text: hex2(a.A) }
              : { from: "A", to: `M${hex4(addr)}`, text: hex2(b.A) },
          ],
        ],
        [
          load
            ? `LDAX ${p} reads the byte that ${PAIR_NAME[p]} points to (${w(addr)}) into A. A = ${v(a.A)}.`
            : `STAX ${p} writes A (${v(b.A)}) to the cell ${PAIR_NAME[p]} points to, ${w(addr)}.`,
        ],
        { bus: { addr, data: load ? a.A : b.A } },
      );
    }
    case "XCHG":
      return out(
        [
          [
            { from: "H", to: "D", text: hex2(b.H) },
            { from: "D", to: "H", text: hex2(b.D) },
            { from: "L", to: "E", text: hex2(b.L) },
            { from: "E", to: "L", text: hex2(b.E) },
          ],
        ],
        [
          `XCHG swaps HL and DE. HL = ${w(pairValue(a, "H"))}, DE = ${w(pairValue(a, "D"))}.`,
          "No flags change.",
        ],
      );
    case "PUSH": {
      const p = ops[0] as Pair;
      const [hi, lo] = PAIR_REGS[p as Exclude<Pair, "SP">];
      const sp = b.SP;
      return out(
        [
          [
            {
              from: hi,
              to: `M${hex4(sp - 1)}`,
              text: hex2(pairValue(b, p) >> 8),
            },
          ],
          [{ from: lo, to: `M${hex4(sp - 2)}`, text: hex2(pairValue(b, p)) }],
        ],
        [
          `PUSH ${p} saves ${PAIR_NAME[p]} (${w(pairValue(b, p))}) on the stack: ${hi} goes to ${w(sp - 1)}, ${lo} to ${w(sp - 2)}.`,
          `SP drops by two, ${w(sp)} → ${w(a.SP)}.`,
        ],
        { bus: { addr: sp - 2, data: pairValue(b, p) & 0xff } },
      );
    }
    case "POP": {
      const p = ops[0] as Pair;
      const [hi, lo] = PAIR_REGS[p as Exclude<Pair, "SP">];
      const sp = b.SP;
      return out(
        [
          [{ from: `M${hex4(sp)}`, to: lo, text: hex2(c.rd(sp)) }],
          [{ from: `M${hex4(sp + 1)}`, to: hi, text: hex2(c.rd(sp + 1)) }],
        ],
        [
          `POP ${p} takes ${PAIR_NAME[p]} back off the stack: ${lo} from ${w(sp)}, ${hi} from ${w(sp + 1)}. ${PAIR_NAME[p]} = ${w(pairValue(a, p))}.`,
          `SP rises by two, ${w(sp)} → ${w(a.SP)}.`,
        ],
        { bus: { addr: sp, data: c.rd(sp) } },
      );
    }
    case "HLT":
      return out(
        [],
        [
          "HLT stops the 8085. The program is finished, and every register keeps its last value.",
          "Press RESET to get back to the monitor. RAM is not cleared.",
        ],
      );
    case "NOP":
      return out([], ["NOP does nothing for four clock cycles."]);
    case "STC":
    case "CMC":
      return out(
        [[{ from: "ALU", to: "F", text: `CY${flag(a.F, "CY")}` }]],
        [mn === "STC" ? "STC sets CY to 1." : "CMC flips CY.", fl()],
      );
  }

  // ALU work.
  const two: Record<
    string,
    { sym: string; say: string; keep?: boolean; carry?: boolean }
  > = {
    ADD: { sym: "+", say: "adds" },
    ADI: { sym: "+", say: "adds" },
    ADC: { sym: "+", say: "adds, with the carry,", carry: true },
    ACI: { sym: "+", say: "adds, with the carry,", carry: true },
    SUB: { sym: "−", say: "subtracts" },
    SUI: { sym: "−", say: "subtracts" },
    SBB: { sym: "−", say: "subtracts, with the borrow,", carry: true },
    SBI: { sym: "−", say: "subtracts, with the borrow,", carry: true },
    ANA: { sym: "AND", say: "ANDs" },
    ANI: { sym: "AND", say: "ANDs" },
    ORA: { sym: "OR", say: "ORs" },
    ORI: { sym: "OR", say: "ORs" },
    XRA: { sym: "XOR", say: "XORs" },
    XRI: { sym: "XOR", say: "XORs" },
    CMP: { sym: "−", say: "compares", keep: true },
    CPI: { sym: "−", say: "compares", keep: true },
  };
  if (two[mn]) {
    const op = two[mn];
    const immediate = /I$/.test(mn);
    const s = immediate
      ? { spot: "CODE" as KitSpot, val: imm8, name: v(imm8) }
      : src(ops[0]);
    const cy = flag(b.F, "CY");
    const result = op.keep ? (b.A - s.val) & 0xff : a.A;
    const operand = immediate
      ? v(imm8)
      : ops[0] === "M"
        ? `M (${v(s.val)} at ${w(hl)})`
        : `${ops[0]} (${v(s.val)})`;
    const alu = `${hex2(b.A)} ${op.sym} ${hex2(s.val)}${op.carry ? ` ${op.sym} ${cy}` : ""} = ${hex2(result)}`;
    const lines: string[] = [];
    if (op.keep) {
      lines.push(
        `${mn} ${opText} compares A (${v(b.A)}) with ${operand}: the ALU works out A − ${immediate ? v(imm8) : ops[0]} = ${v(result)} and keeps only the flags. A is unchanged.`,
      );
      if (flag(a.F, "Z")) lines.push("Z = 1: the two are equal.");
      else if (flag(a.F, "CY"))
        lines.push(`CY = 1: A is smaller, so the subtraction needed a borrow.`);
      else lines.push("Z = 0 and CY = 0: A is larger.");
    } else if (mn === "ORA" && ops[0] === "A") {
      lines.push(
        "ORA A ORs A with itself. A does not change, but the flags now describe A: a quick test for zero.",
      );
      lines.push(
        flag(a.F, "Z")
          ? "Z = 1: A is 00H."
          : `Z = 0: A (${v(a.A)}) is not zero. CY is cleared.`,
      );
    } else {
      lines.push(
        `${mn} ${opText} ${op.say} ${operand} ${op.sym === "+" ? "to" : op.sym === "−" ? "from" : "with"} A (${v(b.A)}). A = ${v(a.A)}.`,
      );
      if (op.sym === "+" && flag(a.F, "CY"))
        lines.push("CY = 1: the sum passed FFH, so its ninth bit is in CY.");
      if (op.sym === "−" && flag(a.F, "CY"))
        lines.push(
          "CY = 1: the number taken away was larger, so a borrow was needed.",
        );
      if (flag(a.F, "Z")) lines.push("Z = 1: the result is 00H.");
    }
    lines.push(fl());
    return out(
      [
        [
          { from: "A", to: "ALU", text: hex2(b.A) },
          { from: s.spot, to: "ALU", text: hex2(s.val) },
        ],
        op.keep
          ? [{ from: "ALU", to: "F", text: "flags" }]
          : [
              { from: "ALU", to: "A", text: hex2(a.A) },
              { from: "ALU", to: "F", text: "flags" },
            ],
      ],
      lines,
      {
        alu,
        bus:
          ops[0] === "M"
            ? { addr: hl, data: s.val }
            : immediate
              ? { addr: c.at + 1, data: imm8 }
              : undefined,
      },
    );
  }

  // Jumps, calls and returns.
  const jump = /^(J|C|R)(MP|ALL|ET|NZ|Z|NC|C|PO|PE|P|M)$/.exec(mn);
  if (jump) {
    const kind = jump[1];
    const cc = ["MP", "ALL", "ET"].includes(jump[2]) ? null : jump[2];
    const cond = cc ? COND[cc] : null;
    const taken = !cond || flag(b.F, cond.flag) === cond.when;
    const why = cond
      ? taken
        ? `${cond.say}, so it is taken.`
        : `${cond.flag} = ${flag(b.F, cond.flag)}, not ${cond.when}, so it is not taken: the next instruction runs.`
      : "";
    if (kind === "J") {
      return out(
        taken ? [[{ from: "CODE", to: "PC", text: hex4(imm16) }]] : [],
        [
          `${mn} ${target(imm16)} jumps to ${w(imm16)}${cond ? ` only when ${cond.say}` : ""}. ${why}`.trim(),
          "Jumps read the flags but do not change them.",
        ],
      );
    }
    if (kind === "C") {
      const ret = (c.at + 3) & 0xffff;
      return out(
        taken
          ? [
              [
                { from: "PC", to: `M${hex4(b.SP - 1)}`, text: hex2(ret >> 8) },
                { from: "PC", to: `M${hex4(b.SP - 2)}`, text: hex2(ret) },
              ],
              [{ from: "CODE", to: "PC", text: hex4(imm16) }],
            ]
          : [],
        [
          `${mn} ${target(imm16)} calls the subroutine at ${w(imm16)}. ${why}`.trim(),
          taken
            ? `The return address, ${w(ret)}, goes on the stack (SP ${w(b.SP)} → ${w(a.SP)}), and PC = ${w(imm16)}.`
            : "",
        ].filter(Boolean),
        taken ? { bus: { addr: b.SP - 2, data: ret & 0xff } } : undefined,
      );
    }
    const back = c.rd(b.SP) | (c.rd(b.SP + 1) << 8);
    return out(
      taken
        ? [
            [
              { from: `M${hex4(b.SP)}`, to: "PC", text: hex2(c.rd(b.SP)) },
              { from: `M${hex4(b.SP + 1)}`, to: "PC", text: hex2(back >> 8) },
            ],
          ]
        : [],
      [
        `${mn} returns from the subroutine. ${why}`.trim(),
        taken
          ? `The return address ${w(back)} comes off the stack, so PC = ${w(back)} and SP = ${w(a.SP)}.`
          : "",
      ].filter(Boolean),
      taken ? { bus: { addr: b.SP, data: c.rd(b.SP) } } : undefined,
    );
  }

  if (mn === "INR" || mn === "DCR") {
    const r = ops[0];
    const s = src(r);
    const to: KitSpot = s.spot;
    const now = r === "M" ? c.rdAfter(hl) : a[r as Reg8];
    const lines = [
      `${mn} ${r} ${mn === "INR" ? "adds 1 to" : "takes 1 from"} ${s.name}: ${v(s.val)} → ${v(now)}.`,
    ];
    if (flag(a.F, "Z")) lines.push(`Z = 1: ${r} has reached 00H.`);
    lines.push(`${fl()} ${mn} leaves CY alone.`);
    return out(
      [
        [{ from: s.spot, to: "ALU", text: hex2(s.val) }],
        [
          { from: "ALU", to, text: hex2(now) },
          { from: "ALU", to: "F", text: "flags" },
        ],
      ],
      lines,
      {
        alu: `${hex2(s.val)} ${mn === "INR" ? "+" : "−"} 1 = ${hex2(now)}`,
        bus: r === "M" ? { addr: hl, data: now } : undefined,
      },
    );
  }

  if (mn === "INX" || mn === "DCX") {
    const p = ops[0] as Pair;
    const was = pairValue(b, p);
    const now = pairValue(a, p);
    const stages: KitMove[][] =
      p === "SP"
        ? [
            [{ from: "SP", to: "ALU", text: hex4(was) }],
            [{ from: "ALU", to: "SP", text: hex4(now) }],
          ]
        : (() => {
            const [hi, lo] = PAIR_REGS[p as "B" | "D" | "H"];
            return [
              [
                { from: hi, to: "ALU", text: hex2(was >> 8) },
                { from: lo, to: "ALU", text: hex2(was) },
              ],
              [
                { from: "ALU", to: hi, text: hex2(now >> 8) },
                { from: "ALU", to: lo, text: hex2(now) },
              ],
            ];
          })();
    return out(
      stages,
      [
        `${mn} ${p} ${mn === "INX" ? "adds 1 to" : "takes 1 from"} the pair ${PAIR_NAME[p]}: ${w(was)} → ${w(now)}.${p === "H" ? ` HL now points at ${w(now)}.` : ""}`,
        `${mn} does not change any flag, not even Z. A loop counter needs DCR, not ${mn}.`,
      ],
      { alu: `${hex4(was)} ${mn === "INX" ? "+" : "−"} 1 = ${hex4(now)}` },
    );
  }

  if (mn === "DAD") {
    const p = ops[0] as Pair;
    const add = pairValue(b, p);
    return out(
      [
        [
          { from: "H", to: "ALU", text: hex4(hl) },
          {
            from: p === "SP" ? "SP" : PAIR_REGS[p as "B"][0],
            to: "ALU",
            text: hex4(add),
          },
        ],
        [
          { from: "ALU", to: "H", text: hex2(a.H) },
          { from: "ALU", to: "L", text: hex2(a.L) },
          { from: "ALU", to: "F", text: "CY" },
        ],
      ],
      [
        `DAD ${p} adds ${PAIR_NAME[p]} (${w(add)}) to HL (${w(hl)}). HL = ${w(pairValue(a, "H"))}.`,
        `Only CY can change: CY = ${flag(a.F, "CY")}.`,
      ],
      { alu: `${hex4(hl)} + ${hex4(add)} = ${hex4(pairValue(a, "H"))}` },
    );
  }

  const single: Record<string, string> = {
    DAA: "DAA corrects A after a BCD addition: a digit above 9, or a carry out of it, gets 6 added.",
    RLC: "RLC rotates A one bit left. Bit 7 goes round to bit 0 and into CY.",
    RRC: "RRC rotates A one bit right. Bit 0 goes round to bit 7 and into CY.",
    RAL: "RAL rotates A left through CY: CY goes into bit 0, bit 7 into CY.",
    RAR: "RAR rotates A right through CY: CY goes into bit 7, bit 0 into CY.",
    CMA: "CMA flips every bit of A.",
  };
  if (single[mn]) {
    return out(
      [
        [{ from: "A", to: "ALU", text: hex2(b.A) }],
        mn === "CMA"
          ? [{ from: "ALU", to: "A", text: hex2(a.A) }]
          : [
              { from: "ALU", to: "A", text: hex2(a.A) },
              { from: "ALU", to: "F", text: "flags" },
            ],
      ],
      [single[mn], `A: ${v(b.A)} → ${v(a.A)}.`, fl()],
      { alu: `${mn} ${hex2(b.A)} = ${hex2(a.A)}` },
    );
  }

  return out([], [`${c.text} runs.`, fl()]);
}

// ── The lab ────────────────────────────────────────────────────────────────

function chunkLines(
  lines: KitListingLine[],
  blocks: number[],
): KitListingLine[][] {
  const chunks: KitListingLine[][] = [];
  let cur: KitListingLine[] = [];
  lines.forEach((line, i) => {
    const gap =
      cur.length > 0 &&
      (blocks[i] !== blocks[i - 1] ||
        line.address !==
          cur[cur.length - 1].address + cur[cur.length - 1].bytes.length);
    if (cur.length >= CHUNK || (gap && cur.length >= 2)) {
      chunks.push(cur);
      cur = [];
    }
    cur.push(line);
  });
  if (cur.length) chunks.push(cur);
  return chunks;
}

/** The registers that differ, as "A 25H → 3CH". */
function changes(
  b: KitRegs,
  a: KitRegs,
  memB: (x: number) => number,
  memA: (x: number) => number,
  cells: number[],
): { text: string[]; hot: KitSpot[] } {
  const text: string[] = [];
  const hot: KitSpot[] = [];
  for (const r of REG8)
    if (b[r] !== a[r]) {
      text.push(`${r} ${v(b[r])} → ${v(a[r])}`);
      hot.push(r);
    }
  if (b.SP !== a.SP) {
    text.push(`SP ${w(b.SP)} → ${w(a.SP)}`);
    hot.push("SP");
  }
  if (b.F !== a.F) hot.push("F");
  for (const addr of cells)
    if (memB(addr) !== memA(addr)) {
      text.push(`${w(addr)} ${v(memB(addr))} → ${v(memA(addr))}`);
      hot.push(`M${hex4(addr)}`);
    }
  return { text, hot };
}

/**
 * Every procedure step for one program on the trainer: power on, type the
 * program and its data in on the keypad, single-step it with SI and NEXT,
 * then read the results back with EX MEM.
 */
export function buildTrainerLab(
  source: string,
  memoryInit: Record<string, number> = {},
  expected = "",
): TrainerLab {
  const asm = assemble(source);
  if (asm.errors.length)
    throw new Error(
      `trainer: ${asm.errors.map((e) => `line ${e.line}: ${e.message}`).join("; ")}`,
    );

  // The listing: instructions, and the data the program starts with.
  const listing: KitListingLine[] = [];
  const blocks: number[] = [];
  const data = new Map<number, number>();
  let pending: string | undefined;
  let block = 0;
  for (const row of asm.listing) {
    const { label, text } = splitSource(row.source);
    const bytes = parseBytes(row.bytes);
    if (!text && !bytes.length) {
      if (label) pending = label;
      else if (!row.source.trim()) block++;
      continue;
    }
    if (isData(text) || /^(ORG|EQU|END)\b/i.test(text)) {
      bytes.forEach((byte, i) => data.set(row.address + i, byte));
      continue;
    }
    if (!bytes.length) continue;
    listing.push({
      address: row.address,
      bytes,
      text,
      label: label ?? pending,
    });
    blocks.push(block);
    pending = undefined;
  }
  for (const [raw, value] of Object.entries(memoryInit))
    data.set(parseInt(raw, 16) & 0xffff, value & 0xff);

  const lineAt = new Map(listing.map((l, i) => [l.address, i]));
  const labelAt = new Map(
    listing.filter((l) => l.label).map((l) => [l.address, l.label!]),
  );
  const labelOf = (addr: number) => labelAt.get(addr & 0xffff);
  const entry = asm.symbols.get("START") ?? entryAddress(asm);

  // Run once to learn which memory the program touches.
  const trial = new CPU8085();
  for (const l of listing) trial.loadProgram(l.bytes, l.address);
  for (const [addr, byte] of data) trial.writeMem(addr, byte);
  trial.setState({ PC: entry });
  const startSP = trial.getState().SP;
  const touched = new Map<number, number>();
  const note = (addr: number, weight: number) => {
    const base = addr & 0xfff8;
    touched.set(base, (touched.get(base) ?? 0) + weight);
  };
  for (const addr of data.keys()) note(addr, 3);
  const codeLo = Math.min(...listing.map((l) => l.address));
  const codeHi = Math.max(...listing.map((l) => l.address + l.bytes.length));
  {
    const snap = new Uint8Array(trial.getState().memory);
    trial.run(200000);
    const mem = trial.getState().memory;
    for (let addr = 0; addr < 0x10000; addr++)
      if (mem[addr] !== snap[addr] && (addr < codeLo || addr >= codeHi)) {
        const sp = trial.getState().SP;
        // Stack traffic is not what the program is for.
        if (Math.abs(addr - sp) < 16 || Math.abs(addr - startSP) < 16) continue;
        note(addr, 2);
      }
  }
  const ranked = [...touched.entries()]
    .sort((x, y) => y[1] - x[1] || x[0] - y[0])
    .map(([base]) => base);
  let rows = ranked.slice(0, 2).sort((x, y) => x - y);
  if (rows.length === 0) rows = [0x8000, 0x8008];
  if (rows.length === 1) rows = [rows[0], (rows[0] + 8) & 0xffff];
  const cells = rows.flatMap((base) =>
    Array.from({ length: 8 }, (_, i) => base + i),
  );

  const program: KitProgram = { listing, rows };

  // ── The kit, as the student works it ──────────────────────────────────
  const ram = new Uint8Array(65536);
  const zero: KitRegs = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    H: 0,
    L: 0,
    F: 0x02,
    SP: startSP,
    PC: 0,
    IR: 0,
  };
  let st: KitState = {
    power: false,
    regs: zero,
    mem: cells.map(() => 0),
    digits: "      ",
    lcd: { mode: "off" },
    abus: null,
    dbus: null,
  };
  const copy = (s: KitState): KitState => ({
    ...s,
    regs: { ...s.regs },
    mem: [...s.mem],
  });
  const memNow = () => cells.map((addr) => ram[addr]);

  const steps: SceneProcedureStep[] = [];
  let keys: KitPress[] = [];
  let before = copy(st);
  const begin = () => {
    before = copy(st);
    keys = [];
  };
  const press = (key: TrainerKey, digits: string, lcd: KitLcd = st.lcd) => {
    st.digits = digits;
    st.lcd = lcd;
    st.mem = memNow();
    keys.push({ key, digits, lcd, mem: [...st.mem] });
  };
  const commit = (
    label: string,
    body: string[],
    rest: Partial<Pick<KitFrame, "stages" | "alu" | "hot" | "focus">> = {},
  ) => {
    st.mem = memNow();
    const shown =
      keys.length > MAX_KEYS
        ? [...keys.slice(0, MAX_KEYS - 1), keys[keys.length - 1]]
        : keys;
    const kit: KitFrame = {
      before,
      after: copy(st),
      keys: shown,
      stages: rest.stages ?? [],
      alu: rest.alu,
      hot: rest.hot ?? [],
      focus: rest.focus ?? "keys",
    };
    steps.push({ label, body: body.join("\n"), show: [], kit });
    return kit;
  };
  /** Type an address one digit at a time into the address field. */
  const typeAddress = (addr: number, lcd: (a: number) => KitLcd) => {
    const text = hex4(addr);
    for (let d = 0; d < 4; d++)
      press(
        text[d] as TrainerKey,
        `${text.slice(0, d + 1).padEnd(4, "-")}  `,
        d === 3 ? lcd(addr) : st.lcd,
      );
  };

  // 1. Power and RESET.
  begin();
  st.power = true;
  press("RESET", " UP 85", { mode: "sign-on" });
  const overview = commit(
    "Switch on and press RESET",
    [
      "Switch the trainer on and press RESET. The monitor program in the EPROM starts and the display signs on: UP 85.",
      "The kit holds an 8085, the monitor EPROM, 8 KB of RAM from 8000H, and the keyboard and display controller.",
      "The panel under the chips shows every register of the 8085 as it changes: A and the flags, B to L, SP, PC, and IR, the opcode just fetched. The memory panel shows the RAM cells this program uses.",
    ],
    { focus: "all" },
  );

  // 2. The program, a few instructions at a time.
  const chunks = chunkLines(listing, blocks);
  let open = -1; // address open in EX MEM, or -1
  const edit = (at: number): KitLcd => ({ mode: "edit", at, upto: at - 1 });
  chunks.forEach((chunk, ci) => {
    begin();
    const lines: string[] = [];
    const first = chunk[0].address;
    if (open !== first) {
      if (open >= 0) press("EXEC", "      ", st.lcd);
      press("EXMEM", "----  ", edit(first));
      typeAddress(first, edit);
      press("NEXT", `${hex4(first)}${hex2(ram[first])}`, edit(first));
      lines.push(
        `Press EX MEM, type ${hex4(first)}, and press NEXT. The display opens ${w(first)}: four digits of address, two of data.`,
      );
    }
    for (const line of chunk) {
      line.bytes.forEach((byte, i) => {
        const addr = line.address + i;
        const hx = hex2(byte);
        press(hx[0] as TrainerKey, `${hex4(addr)}${hx[0]}-`);
        ram[addr] = byte;
        press(hx[1] as TrainerKey, `${hex4(addr)}${hx}`, {
          mode: "edit",
          at: addr,
          upto: addr,
        });
        const next = addr + 1;
        press("NEXT", `${hex4(next)}${hex2(ram[next])}`, {
          mode: "edit",
          at: next,
          upto: addr,
        });
      });
      open = line.address + line.bytes.length;
    }
    const first3 = chunk.find((l) => l.bytes.length === 3);
    lines.push(
      ...chunk.map(
        (l) =>
          `${hex4(l.address)}: ${l.text} → ${l.bytes.map(hex2).join(" ")}${l.label ? `  (${l.label})` : ""}`,
      ),
    );
    if (ci === 0)
      lines.push(
        "For each byte: two hex keys, then NEXT, which stores it and opens the next address.",
      );
    if (first3 && ci < 2)
      lines.push(
        `A 16-bit address or number goes in low byte first: ${first3.text} is ${first3.bytes.map(hex2).join(" ")}.`,
      );
    const last = chunk[chunk.length - 1];
    commit(`Type ${chunk.map((l) => l.text.split(" ")[0]).join(", ")}`, [
      `Type ${chunk.length === 1 ? "this instruction" : `these ${chunk.length} instructions`} in at ${w(first)}–${w(last.address + last.bytes.length - 1)}.`,
      ...lines,
    ]);
  });

  // 3. The data.
  const dataSpans: { address: number; bytes: number[] }[] = [];
  for (const addr of [...data.keys()].sort((x, y) => x - y)) {
    const span = dataSpans[dataSpans.length - 1];
    if (span && addr === span.address + span.bytes.length)
      span.bytes.push(data.get(addr)!);
    else dataSpans.push({ address: addr, bytes: [data.get(addr)!] });
  }
  if (dataSpans.length) {
    begin();
    const lines: string[] = [];
    for (const span of dataSpans) {
      press("EXEC", "      ", st.lcd);
      press("EXMEM", "----  ", edit(span.address));
      typeAddress(span.address, edit);
      press(
        "NEXT",
        `${hex4(span.address)}${hex2(ram[span.address])}`,
        edit(span.address),
      );
      span.bytes.forEach((byte, i) => {
        const addr = span.address + i;
        const hx = hex2(byte);
        press(hx[0] as TrainerKey, `${hex4(addr)}${hx[0]}-`);
        ram[addr] = byte;
        press(hx[1] as TrainerKey, `${hex4(addr)}${hx}`);
        press("NEXT", `${hex4(addr + 1)}${hex2(ram[addr + 1])}`);
      });
      lines.push(`${w(span.address)}: ${span.bytes.map(hex2).join(" ")}`);
    }
    press("EXEC", "      ", { mode: "sign-on" });
    commit(
      "Type the data",
      [
        `End the program with EXEC, then open ${w(dataSpans[0].address)} with EX MEM and type the numbers the program works on.`,
        ...lines,
        "Watch the memory panel: each cell fills as its NEXT is pressed. EXEC closes the command.",
      ],
      {
        hot: dataSpans.flatMap((s) =>
          s.bytes.map((_, i) => `M${hex4(s.address + i)}` as KitSpot),
        ),
      },
    );
  } else if (open >= 0) {
    // Close the memory command before running.
    st.lcd = { mode: "sign-on" };
  }

  // 4. Single step.
  const cpu = new CPU8085();
  for (let addr = 0; addr < 0x10000; addr++)
    if (ram[addr]) cpu.writeMem(addr, ram[addr]);
  cpu.setState({ PC: entry });
  st.regs = { ...regsOf(cpu, 0) };
  begin();
  press("SI", "----  ", st.lcd);
  typeAddress(entry, (pc) => ({ mode: "run", pc, halted: false }));
  st.digits = `${hex4(entry)}${hex2(ram[entry])}`;
  st.lcd = { mode: "run", pc: entry, halted: false };
  keys[keys.length - 1].digits = st.digits;
  st.regs.PC = entry;
  commit(
    "Start single-step at START",
    [
      `Press SI (single instruction) and type ${hex4(entry)}, where START is. The display shows ${w(entry)} and the opcode stored there, ${v(ram[entry])}.`,
      "From now on every NEXT runs exactly one instruction, then stops so you can see what it did.",
      "Watch the register panel and the memory panel. A blue bead carries each byte from where it is read to where it is written.",
    ],
    { hot: ["PC"], focus: "run" },
  );

  const seen = new Map<number, number>();
  const written = new Set<number>();
  let passes = 0;
  let group: {
    from: KitState;
    head: number;
    count: number;
    lastText: string;
    b: KitRegs;
    mem: (addr: number) => number;
  } | null = null;
  const flush = (final: boolean) => {
    if (!group) return;
    const g = group;
    group = null;
    passes++;
    const memA = (x: number) => cpu.readMem(x);
    const ch = changes(g.b, st.regs, g.mem, memA, cells);
    before = g.from;
    keys = [];
    const n = Math.min(g.count, 8);
    for (let i = 0; i < n; i++)
      keys.push({
        key: "NEXT",
        digits: g.from.digits,
        lcd: g.from.lcd,
        mem: g.from.mem,
      });
    keys[keys.length - 1] = {
      key: "NEXT",
      digits: st.digits,
      lcd: st.lcd,
      mem: memNow(),
    };
    const head = g.head;
    const where = labelOf(head) ? `${labelOf(head)} (${w(head)})` : w(head);
    commit(
      final
        ? "Run the remaining passes"
        : `Loop again from ${labelOf(head) ?? w(head)}`,
      [
        final
          ? `Keep pressing NEXT: ${g.count} more instructions finish the remaining passes of the loop.`
          : `The jump went back to ${where}, so the same instructions run again. Press NEXT ${g.count} times for this pass, ending at ${g.lastText}.`,
        ch.text.length
          ? `Changed: ${ch.text.join(", ")}.`
          : "No register or memory cell on the panel changed.",
        flagLine(g.b.F, st.regs.F),
      ],
      { hot: [...ch.hot, "PC"], focus: "run" },
    );
  };

  for (let guard = 0; guard < 200000; guard++) {
    const at = cpu.getState().PC;
    const li = lineAt.get(at);
    if (cpu.getState().halted || li === undefined) break;
    const line = listing[li];
    const b = { ...st.regs, PC: at };
    // Only the cells the panel shows and the ones this instruction can reach.
    const s0 = cpu.getState();
    const near = [
      ...cells,
      (s0.H << 8) | s0.L,
      (s0.B << 8) | s0.C,
      (s0.D << 8) | s0.E,
      s0.SP,
      s0.SP + 1,
      ((line.bytes[2] ?? 0) << 8) | (line.bytes[1] ?? 0),
      (((line.bytes[2] ?? 0) << 8) | (line.bytes[1] ?? 0)) + 1,
    ];
    const memBefore = new Map(near.map((x) => [x & 0xffff, cpu.readMem(x)]));
    const rd = (x: number) => memBefore.get(x & 0xffff) ?? cpu.readMem(x);
    cpu.step();
    const a = regsOf(cpu, line.bytes[0]);
    const count = (seen.get(at) ?? 0) + 1;
    seen.set(at, count);
    const halted = cpu.getState().halted;
    const pcNext = a.PC;
    const eff = effectOf({
      text: line.text,
      bytes: line.bytes,
      at,
      b,
      a,
      rd,
      rdAfter: (x) => cpu.readMem(x),
      labelOf,
    });
    for (const move of eff.stages.flat())
      if (move.to.startsWith("M")) {
        const addr = parseInt(move.to.slice(1), 16);
        if (cells.includes(addr)) written.add(addr);
      }

    if (count > 1) {
      // A repeat: fold it into a pass.
      if (group && group.head === at && passes < MAX_PASSES - 1) flush(false);
      if (!group)
        group = {
          from: copy(st),
          head: at,
          count: 0,
          lastText: line.text,
          b: { ...st.regs },
          mem: rd,
        };
      group.count++;
      group.lastText = line.text;
      st.regs = a;
      st.digits = `${hex4(pcNext)}${hex2(cpu.readMem(pcNext))}`;
      st.lcd = { mode: "run", pc: pcNext, halted };
      st.abus = at;
      st.dbus = line.bytes[0];
      if (halted) break;
      continue;
    }
    flush(passes >= MAX_PASSES - 1);

    begin();
    press("NEXT", st.digits, st.lcd);
    st.regs = a;
    st.digits = `${hex4(pcNext)}${hex2(cpu.readMem(pcNext))}`;
    st.lcd = { mode: "run", pc: pcNext, halted };
    st.abus = eff.bus?.addr ?? at;
    st.dbus = eff.bus?.data ?? line.bytes[0];
    const ch = changes(b, a, rd, (x) => cpu.readMem(x), cells);
    commit(
      line.text,
      [
        `NEXT runs ${line.text} at ${w(at)}${line.label ? `, labelled ${line.label}` : ""}. The 8085 fetches the opcode ${v(line.bytes[0])} into IR${line.bytes.length > 1 ? `, then reads the ${line.bytes.length === 2 ? "byte" : "two bytes"} after it` : ""}.`,
        ...eff.lines,
        halted
          ? ""
          : `PC = ${w(pcNext)}: NEXT will run ${listing[lineAt.get(pcNext) ?? -1]?.text ?? "the byte there"}.`,
      ].filter(Boolean),
      {
        stages: eff.stages,
        alu: eff.alu,
        hot: [...ch.hot, "PC", "IR"],
        focus: "run",
      },
    );
    if (halted) break;
  }
  flush(true);

  // 5. Read the results back.
  const results = cells.filter(
    (addr) => written.has(addr) || cpu.readMem(addr) !== (data.get(addr) ?? 0),
  );
  const spans: number[][] = [];
  for (const addr of results) {
    const span = spans[spans.length - 1];
    if (span && addr === span[span.length - 1] + 1) span.push(addr);
    else spans.push([addr]);
  }
  for (let addr = 0; addr < 0x10000; addr++) ram[addr] = cpu.readMem(addr);
  if (spans.length) {
    begin();
    press("RESET", " UP 85", { mode: "sign-on" });
    const lines: string[] = [];
    for (const span of spans) {
      press("EXMEM", "----  ", { mode: "read", at: span[0] });
      typeAddress(span[0], (at) => ({ mode: "read", at }));
      press("NEXT", `${hex4(span[0])}${hex2(ram[span[0]])}`, {
        mode: "read",
        at: span[0],
      });
      for (const addr of span.slice(1))
        press("NEXT", `${hex4(addr)}${hex2(ram[addr])}`, {
          mode: "read",
          at: addr,
        });
      press("EXEC", " UP 85", { mode: "read", at: span[span.length - 1] });
      lines.push(span.map((addr) => `${w(addr)} = ${v(ram[addr])}`).join(", "));
    }
    commit(
      "Read the results",
      [
        "Press RESET to leave single step. RAM keeps everything. Open each result with EX MEM and step through it with NEXT.",
        ...lines,
        expected ? `Expected: ${expected}` : "",
      ].filter(Boolean),
      {
        hot: results.map((addr) => `M${hex4(addr)}` as KitSpot),
        focus: "keys",
      },
    );
  }

  const lastKit = steps[steps.length - 1].kit!;
  const final: KitFrame = {
    before: lastKit.after,
    after: lastKit.after,
    keys: [],
    stages: [],
    hot: lastKit.hot,
    focus: "all",
  };
  return {
    program,
    steps,
    overview: { ...overview, keys: [], before: overview.after, hot: [] },
    final,
  };
}

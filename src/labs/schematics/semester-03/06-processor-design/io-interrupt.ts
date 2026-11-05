import { type SchematicElement } from "@/labs/CircuitSchematic";
import { block, frames, label } from "../diagram";

const W = 1100;
const GRAY = "#9a9a9a";
const INK = "#ffffff";
const RED = "#d32f2f";

type Box = { id: string; x: number; y: number; w: number; h: number };
type Side = "l" | "r" | "t" | "b";

function pin(b: Box, s: Side): [number, number] {
  if (s === "l") return [b.x - b.w / 2, b.y];
  if (s === "r") return [b.x + b.w / 2, b.y];
  if (s === "t") return [b.x, b.y - b.h / 2];
  return [b.x, b.y + b.h / 2];
}

function gbox(b: Box, text: string, hot = false): SchematicElement {
  return { type: "block", id: b.id, x: b.x, y: b.y, w: b.w, h: b.h, label: text, highlight: hot, fill: GRAY, ink: INK };
}

function dia(b: Box, text: string, hot = false): SchematicElement {
  return { type: "decision", id: b.id, x: b.x, y: b.y, w: b.w, h: b.h, label: text, highlight: hot };
}

function arr(id: string, pts: [number, number][], color?: string, both = false): SchematicElement {
  return { type: "arrow", id, points: pts.map(([x, y]) => ({ x, y })), color, double: both || undefined };
}

function tag(id: string, x: number, y: number, text: string, color?: string): SchematicElement {
  return { type: "label", id, x, y, text, color };
}

const printer: Box = { id: "printer", x: 180, y: 180, w: 150, h: 46 };
const recv: Box = { id: "recv", x: 430, y: 180, w: 180, h: 46 };
const outr: Box = { id: "outr", x: 700, y: 180, w: 130, h: 46 };
const ac: Box = { id: "ac", x: 700, y: 300, w: 130, h: 46 };
const keyb: Box = { id: "keyb", x: 180, y: 420, w: 150, h: 46 };
const tx: Box = { id: "tx", x: 430, y: 420, w: 180, h: 46 };
const inpr: Box = { id: "inpr", x: 700, y: 420, w: 130, h: 46 };
const fgo: Box = { id: "fgo", x: 830, y: 108, w: 96, h: 34 };
const fgi: Box = { id: "fgi", x: 830, y: 508, w: 96, h: 34 };
const RAIL = 910;

/** Slide: keyboard and printer, serial interfaces, INPR, OUTR, AC, FGI, FGO. */
function ioSystem(show: string[], hot: string[]): SchematicElement[] {
  const on = (id: string) => show.includes(id);
  const hi = (id: string) => hot.includes(id);
  const els: SchematicElement[] = [];
  const put = (b: Box, text: string) => {
    if (on(b.id)) els.push(gbox(b, text, hi(b.id)));
  };
  if (on("printer")) els.push(tag("h_term", 180, 58, "Input-Output terminal"));
  if (on("recv")) els.push(tag("h_ser", 430, 58, "Serial communication interface"));
  if (on("outr")) els.push(tag("h_reg", 700, 58, "Computer registers and flip-flop"));

  put(printer, "Printer");
  put(recv, "Receiver\nInterface");
  put(outr, "OUTR");
  put(ac, "AC");
  put(keyb, "Keyboard");
  put(tx, "Transmitter\nInterface");
  put(inpr, "INPR");
  put(fgo, "FGO");
  put(fgi, "FGI");
  if (on("fgo")) {
    els.push(tag("fgo_1", 930, 100, "= 1"));
    els.push(tag("fgo_0", 980, 116, "= 0"));
  }
  if (on("fgi")) {
    els.push(tag("fgi_0", 930, 500, "= 0"));
    els.push(tag("fgi_1", 980, 516, "= 1"));
  }

  const link = (id: string, a: Box, b: Box) => {
    if (on(a.id) && on(b.id)) els.push(arr(id, [pin(a, "r"), pin(b, "l")], RED, true));
  };
  link("w_pr", printer, recv);
  link("w_ro", recv, outr);
  link("w_kt", keyb, tx);
  link("w_ti", tx, inpr);

  if (on("outr") && on("ac") && on("inpr")) {
    const rail = RAIL;
    const ay = ac.y;
    els.push(arr("w_outr_ac", [pin(outr, "r"), [rail, outr.y], [rail, ay]], RED));
    els.push(arr("w_inpr_ac", [pin(inpr, "r"), [rail, inpr.y], [rail, ay]], RED));
    els.push(arr("w_ac", [[rail, ay], pin(ac, "r")], RED));
    els.push({ type: "junction", id: "j_ac", x: rail, y: ay, color: RED });
  }
  return els;
}

const FX0 = 70;
const FY0 = 44;
const FX1 = 1030;
const FY1 = 690;

const rdec: Box = { id: "rdec", x: 520, y: 112, w: 110, h: 70 };
const fetch: Box = { id: "fetch", x: 280, y: 214, w: 220, h: 48 };
const exec: Box = { id: "exec", x: 280, y: 296, w: 220, h: 48 };
const ien: Box = { id: "ien", x: 280, y: 404, w: 116, h: 68 };
const fgiD: Box = { id: "fgid", x: 280, y: 504, w: 116, h: 68 };
const fgoD: Box = { id: "fgod", x: 280, y: 604, w: 116, h: 68 };
const rset: Box = { id: "rset", x: 140, y: 534, w: 108, h: 40 };
const store: Box = { id: "store", x: 800, y: 214, w: 250, h: 72 };
const branch: Box = { id: "branch", x: 800, y: 330, w: 250, h: 56 };
const clear: Box = { id: "clear", x: 800, y: 440, w: 210, h: 52 };

/** Slide: R chooses an instruction cycle or the interrupt cycle, then both return. */
function interruptFlow(full: boolean, hot: string[]): SchematicElement[] {
  const hi = (id: string) => hot.includes(id);
  const els: SchematicElement[] = [
    {
      type: "wire",
      id: "loop",
      points: [
        { x: FX0, y: FY0 },
        { x: FX1, y: FY0 },
        { x: FX1, y: FY1 },
        { x: FX0, y: FY1 },
        { x: FX0, y: FY0 },
      ],
    },
    dia(rdec, "R", hi("rdec")),
    arr("w_back", [[rdec.x, FY0], pin(rdec, "t")]),
    gbox(fetch, "Fetch & Decode\ninstruction", hi("fetch")),
    gbox(exec, "Execute\ninstruction", hi("exec")),
    dia(ien, "IEN", hi("ien")),
    dia(fgiD, "FGI", hi("fgid")),
    dia(fgoD, "FGO", hi("fgod")),
    gbox(rset, "R ← 1", hi("rset")),
  ];

  els.push(
    arr("w_fetch", [pin(rdec, "l"), [fetch.x, rdec.y], pin(fetch, "t")]),
    tag("lbl_cyc", (pin(rdec, "l")[0] + fetch.x) / 2, rdec.y - 16, "Instruction cycle = 0"),
    arr("w_exec", [pin(fetch, "b"), pin(exec, "t")]),
    arr("w_ien", [pin(exec, "b"), pin(ien, "t")]),
    arr("w_ien0", [pin(ien, "r"), [400, ien.y], [400, FY1]]),
    tag("lbl_ien0", 424, ien.y - 14, "= 0"),
    arr("w_fgi", [pin(ien, "b"), pin(fgiD, "t")]),
    tag("lbl_ien1", 312, (pin(ien, "b")[1] + pin(fgiD, "t")[1]) / 2, "= 1"),
    arr("w_fgi1", [pin(fgiD, "l"), [rset.x, fgiD.y], pin(rset, "t")]),
    tag("lbl_fgi1", (pin(fgiD, "l")[0] + rset.x) / 2, fgiD.y - 14, "= 1"),
    arr("w_fgo", [pin(fgiD, "b"), pin(fgoD, "t")]),
    tag("lbl_fgi0", 330, (pin(fgiD, "b")[1] + pin(fgoD, "t")[1]) / 2, "= 0"),
    arr("w_fgo1", [pin(fgoD, "l"), [rset.x, fgoD.y], pin(rset, "b")]),
    tag("lbl_fgo1", (pin(fgoD, "l")[0] + rset.x) / 2, fgoD.y - 14, "= 1"),
    arr("w_fgo0", [pin(fgoD, "b"), [fgoD.x, FY1]]),
    tag("lbl_fgo0", fgoD.x + 28, pin(fgoD, "b")[1] + 18, "= 0"),
    arr("w_rset", [pin(rset, "l"), [pin(rset, "l")[0] - 8, rset.y], [pin(rset, "l")[0] - 8, FY1]]),
  );

  if (full) {
    els.push(
      gbox(store, "Store return address\nin location 0\nM[0] ← PC", hi("store")),
      gbox(branch, "Branch to location 1\nPC ← 1", hi("branch")),
      gbox(clear, "IEN ← 0\nR ← 0", hi("clear")),
      arr("w_store", [pin(rdec, "r"), [store.x, rdec.y], pin(store, "t")]),
      tag("lbl_int", (pin(rdec, "r")[0] + store.x) / 2, rdec.y - 16, "= 1 Interrupt cycle"),
      arr("w_branch", [pin(store, "b"), pin(branch, "t")]),
      arr("w_clear", [pin(branch, "b"), pin(clear, "t")]),
      arr("w_clear_b", [pin(clear, "b"), [clear.x, FY1]]),
    );
  }
  return els;
}

const CW = 64;
const CH = 32;
const SPAN = CW * 3;

function triple(id: string, cx: number, y: number, texts: [string, string, string]) {
  const left = cx - SPAN / 2;
  return texts.map((text, i) => block(`${id}_${i}`, left + CW / 2 + i * CW, y, CW, CH, text));
}

function wide(id: string, cx: number, y: number, h: number, text: string, hot = false) {
  return block(id, cx, y, SPAN, h, text, hot);
}

function beside(id: string, cx: number, y: number, text: string, color?: string): SchematicElement {
  const half = (text.length * 9 * 0.56) / 2;
  return tag(id, cx - SPAN / 2 - half - 12, y, text, color);
}

/** Slide: PC is 256 before the interrupt, and location 0 holds 256 afterwards. */
function demo(after: boolean): SchematicElement[] {
  const L = 330;
  const R = 780;
  const row0 = 96;
  const row1 = 128;
  const mainY = 250;
  const mainH = 96;
  const ioY = 390;
  const ioH = 84;
  const retY = ioY + ioH / 2 + CH / 2;
  const els: SchematicElement[] = [];

  const column = (cx: number, side: "before" | "after") => {
    els.push(
      wide(`${side}_z`, cx, row0, CH, side === "after" ? "256" : "", side === "after"),
      ...triple(`${side}_b`, cx, row1, ["0", "BUN", "1120"]),
      wide(`${side}_main`, cx, mainY, mainH, "Main Program"),
      wide(`${side}_io`, cx, ioY, ioH, "I/O program"),
      ...triple(`${side}_ret`, cx, retY, ["1", "BUN", "0"]),
      beside(`${side}_a0`, cx, row0, "0"),
      beside(`${side}_a1`, cx, row1, "1"),
      beside(`${side}_a255`, cx, mainY - mainH / 2 + 10, "255"),
      beside(`${side}_a1120`, cx, ioY - ioH / 2 + 10, "1120"),
    );
    if (side === "before") {
      els.push(
        beside(`${side}_pc`, cx, mainY - mainH / 2 + 28, "PC = 256"),
        label(`${side}_cap`, cx, retY + 44, "Before Interrupt"),
      );
    } else {
      els.push(
        beside(`${side}_pc`, cx, row1 + 18, "PC = 1", "#2563eb"),
        beside(`${side}_a256`, cx, mainY - mainH / 2 + 28, "256"),
        label(`${side}_cap`, cx, retY + 44, "After Interrupt"),
      );
    }
  };

  column(L, "before");
  if (after) column(R, "after");
  return els;
}

const INS = [
  ["INP", "F800", "AC(0-7) ← INPR, FGI ← 0"],
  ["OUT", "F400", "OUTR ← AC(0-7), FGO ← 0"],
  ["SKI", "F200", "If (FGI = 1) then (PC ← PC + 1)"],
  ["SKO", "F100", "If (FGO = 1) then (PC ← PC + 1)"],
  ["ION", "F080", "IEN ← 1"],
  ["IOF", "F040", "IEN ← 0"],
] as const;

function instructions(): SchematicElement[] {
  const head = [
    label("h_n", 180, 78, "Instruction"),
    label("h_h", 300, 78, "Hex"),
    label("h_m", 620, 78, "Micro-operation"),
  ];
  const rows = INS.flatMap(([name, hex, micro], i) => {
    const y = 122 + i * 48;
    return [
      block(`n_${name}`, 180, y, 100, 36, name),
      block(`h_${name}`, 300, y, 90, 36, hex),
      block(`m_${name}`, 620, y, 460, 36, micro),
    ];
  });
  return [...head, ...rows];
}

function transfers(): SchematicElement[] {
  const lines = [
    "RT0:  AR ← 0, TR ← PC",
    "RT1:  M[AR] ← TR, PC ← 0",
    "RT2:  PC ← PC + 1, IEN ← 0, R ← 0, SC ← 0",
  ];
  return lines.map((text, i) => block(`rt${i}`, 550, 140 + i * 64, 560, 46, text, true));
}

const steps: { title: string; height: number; notes: string[]; elements: SchematicElement[] }[] = [
  {
    title: "The input-output terminal",
    height: 520,
    notes: ["A keyboard and a printer. Each character is an 8-bit code."],
    elements: ioSystem(["printer", "keyb"], []),
  },
  {
    title: "Serial communication",
    height: 520,
    notes: ["The interfaces shift a character one bit at a time."],
    elements: ioSystem(["printer", "keyb", "recv", "tx"], []),
  },
  {
    title: "INPR, OUTR, and the flags",
    height: 580,
    notes: ["INPR and OUTR talk to the interfaces serially and to AC in parallel."],
    elements: ioSystem(["printer", "keyb", "recv", "tx", "outr", "inpr", "ac", "fgo", "fgi"], []),
  },
  {
    title: "Input transfer",
    height: 580,
    notes: ["A key sets FGI. The computer copies INPR into AC and clears the flag."],
    elements: ioSystem(["printer", "keyb", "recv", "tx", "outr", "inpr", "ac", "fgo", "fgi"], ["keyb", "tx", "inpr", "fgi"]),
  },
  {
    title: "Output transfer",
    height: 580,
    notes: ["FGO starts at 1. The printer sets it again when the character is done."],
    elements: ioSystem(["printer", "keyb", "recv", "tx", "outr", "inpr", "ac", "fgo", "fgi"], ["printer", "recv", "outr", "fgo", "ac"]),
  },
  {
    title: "Input-output instructions",
    height: 460,
    notes: ["All six share D7 I T3 = p. One bit of IR(6-11) picks the operation."],
    elements: instructions(),
  },
  {
    title: "R = 0: another instruction cycle",
    height: 760,
    notes: ["IEN, FGI, and FGO are tested at the end of execute. Either flag sets R."],
    elements: interruptFlow(false, ["rdec", "fetch", "exec"]),
  },
  {
    title: "R = 1: the interrupt cycle",
    height: 760,
    notes: ["The return address is saved at 0, and the next fetch is taken from 1."],
    elements: interruptFlow(true, ["store", "branch", "clear"]),
  },
  {
    title: "The three interrupt transfers",
    height: 380,
    notes: ["RT2 leaves PC at 1, and clears IEN, R, and SC."],
    elements: transfers(),
  },
  {
    title: "Memory before the interrupt",
    height: 560,
    notes: ["PC is 256. Location 1 branches to the I/O program at 1120."],
    elements: demo(false),
  },
  {
    title: "Memory after the interrupt",
    height: 560,
    notes: ["Location 0 holds 256. The I/O program returns with indirect BUN 0."],
    elements: demo(true),
  },
];

export const ioInterruptStepSchematics = frames(
  steps.map((step) => ({
    title: step.title,
    width: W,
    height: step.height,
    notes: step.notes,
    elements: step.elements,
  })),
);

export const ioInterruptTheoryDiagram = ioInterruptStepSchematics[7];

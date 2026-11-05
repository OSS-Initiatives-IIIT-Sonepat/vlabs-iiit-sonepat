import { type SchematicElement } from "@/labs/CircuitSchematic";
import { wideOrInputs } from "@/labs/schematics/geometry";
import { frames, label, wire } from "../diagram";

/** Darshan accumulator: the statements, the AC circuit, then the LD / INR / CLR gates. */
const GRAY = "#9a9a9a";
const INK = "#ffffff";

const OR = { x: 530, y: 300, h: 454, n: 8 };
const GX = 236;
const IN_X = GX - 26;
const OUT_X = GX + 26;
const OR_IN = OR.x - 36;
const OR_OUT = OR.x + 44;

const GATES = [
  { id: "g_and", name: "AND", top: "D0", bot: "T5", share: true },
  { id: "g_add", name: "ADD", top: "D1", bot: "T5", share: true },
  { id: "g_dr", name: "DR", top: "D2", bot: "T5", share: true },
  { id: "g_inpr", name: "INPR", top: "p", bot: "B11", share: false },
  { id: "g_cma", name: "CMA", top: "r", bot: "B9", share: false },
  { id: "g_shr", name: "SHR", top: "B7", bot: "", share: false },
  { id: "g_shl", name: "SHL", top: "B6", bot: "", share: false },
  { id: "g_inc", name: "INC", top: "B5", bot: "", share: false },
].map((g, i) => ({ ...g, y: OR.y + wideOrInputs(OR.h, OR.n)[i]! }));

const AC = { x: 900, y: 196, w: 156, h: 64 };

function gbox(
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
  text: string,
  hot: boolean,
): SchematicElement {
  return { type: "block", id, x, y, w, h, label: text, highlight: hot, fill: GRAY, ink: INK };
}

function statements(): SchematicElement[] {
  const rows = [
    ["D0T5:  AC ← AC ∧ DR, SC ← 0", "AND with DR"],
    ["D1T5:  AC ← AC + DR, SC ← 0", "ADD with DR"],
    ["D2T5:  AC ← DR, SC ← 0", "Transfer from DR"],
    ["pB11:  AC(0-7) ← INPR, FGI ← 0", "Transfer from INPR"],
    ["rB9:  AC ← AC'", "Complement"],
    ["rB7:  AC ← shr AC, AC(15) ← E", "Shift right"],
    ["rB6:  AC ← shl AC, AC(0) ← E", "Shift left"],
    ["rB11:  AC ← 0", "Clear"],
    ["rB5:  AC ← AC + 1", "Increment"],
  ];
  return rows.flatMap(([rtl, what], i) => {
    const y = 72 + i * 42;
    return [
      gbox(`s${i}`, 300, y, 460, 32, rtl, false),
      label(`w${i}`, 760, y + 4, what),
    ];
  });
}

function circuit(): SchematicElement[] {
  const adder = { x: 250, y: 168, w: 200, h: 78 };
  const ac = { x: 560, y: 168, w: 220, h: 70 };
  const ctl = { x: 560, y: 330, w: 280, h: 46 };
  const els: SchematicElement[] = [
    gbox("adder", adder.x, adder.y, adder.w, adder.h, "Adder and logic\ncircuit", false),
    gbox("ac", ac.x, ac.y, ac.w, ac.h, "Accumulator\nregister (AC)", true),
    gbox("ctl", ctl.x, ctl.y, ctl.w, ctl.h, "Control gates", false),
  ];
  const addL = adder.x - adder.w / 2;
  const addR = adder.x + adder.w / 2;
  const acL = ac.x - ac.w / 2;
  const acR = ac.x + ac.w / 2;
  const acB = ac.y + ac.h / 2;
  const ctlT = ctl.y - ctl.h / 2;
  els.push(
    { type: "junction", id: "j_dr", x: 70, y: 150 },
    wire("w_dr", [[70, 150], [addL, 150]]),
    { type: "junction", id: "j_drb", x: addL, y: 150 },
    label("lbl_dr", 70, 134, "From DR"),
    label("lbl_dr16", 130, 136, "16"),
    { type: "junction", id: "j_in", x: 70, y: 186 },
    wire("w_in", [[70, 186], [addL, 186]]),
    { type: "junction", id: "j_inb", x: addL, y: 186 },
    label("lbl_in", 78, 204, "From INPR"),
    label("lbl_in8", 130, 204, "8"),
    wire("w_16", [[addR, adder.y], [acL, ac.y]]),
    label("lbl_16a", (addR + acL) / 2, adder.y - 14, "16"),
    wire("w_bus", [[acR, ac.y], [860, ac.y]]),
    { type: "junction", id: "j_bus", x: 860, y: ac.y },
    label("lbl_16b", 760, ac.y - 14, "16"),
    label("lbl_bus", 800, ac.y + 16, "To bus"),
  );
  const pins = [460, 530, 600, 670];
  const names = ["LD", "INR", "CLR", "Clock"];
  pins.forEach((x, i) => {
    els.push(
      { type: "junction", id: `j_c${i}`, x, y: ctlT },
      { type: "junction", id: `j_a${i}`, x, y: acB },
      wire(`w_c${i}`, [[x, ctlT], [x, acB]]),
      label(`lbl_c${i}`, x + 22, (ctlT + acB) / 2 + 4, names[i]!),
    );
  });
  return els;
}

function gateFig(count: number, withOr: boolean, hot: string[]): SchematicElement[] {
  const els: SchematicElement[] = [];
  const shown = GATES.slice(0, count);
  const hi = (id: string) => hot.includes(id);

  for (const g of shown) {
    els.push({
      type: "and-gate",
      id: g.id,
      x: GX,
      y: g.y,
      highlight: hi(g.id),
    });
    const topY = g.y - 8;
    els.push(
      { type: "junction", id: `j_${g.id}_t`, x: 78, y: topY },
      wire(`w_${g.id}_t`, [[78, topY], [IN_X, topY]], hi(g.id)),
      label(`lbl_${g.id}_t`, 48, topY + 3, g.top),
    );
    if (g.bot && !g.share) {
      const botY = g.y + 8;
      els.push(
        { type: "junction", id: `j_${g.id}_b`, x: 78, y: botY },
        wire(`w_${g.id}_b`, [[78, botY], [IN_X, botY]], hi(g.id)),
        label(`lbl_${g.id}_b`, 48, botY + 3, g.bot),
      );
    }
    const nameX = withOr ? 390 : 330;
    const endX = withOr ? OR_IN : 310;
    els.push(
      wire(`w_${g.id}_o`, [[OUT_X, g.y], [endX, g.y]], hi(g.id) || hi("or")),
      label(`lbl_${g.id}_n`, nameX, g.y - 12, g.name),
    );
    if (!withOr) els.push({ type: "junction", id: `j_${g.id}_o`, x: endX, y: g.y });
  }

  const shared = shown.filter((g) => g.share);
  if (shared.length > 0) {
    const ys = shared.map((g) => g.y + 8);
    const rail = 132;
    els.push(wire("w_t5", [[rail, ys[0]!], [rail, ys[ys.length - 1]!]]));
    els.push(label("lbl_t5", rail - 22, ys[ys.length - 1]! + 16, "T5"));
    for (const g of shared) {
      const y = g.y + 8;
      els.push(
        { type: "junction", id: `j_t5_${g.id}`, x: rail, y },
        wire(`w_${g.id}_b`, [[rail, y], [IN_X, y]], hi(g.id)),
      );
    }
  }

  if (!withOr) return els;

  els.push({ type: "wide-or", id: "or", x: OR.x, y: OR.y, h: OR.h, n: OR.n, highlight: hi("or") });

  const acT = AC.y - AC.h / 2;
  const acB = AC.y + AC.h / 2;
  const acL = AC.x - AC.w / 2;
  const acR = AC.x + AC.w / 2;
  els.push(gbox("ac", AC.x, AC.y, AC.w, AC.h, "AC", hi("ac")));

  els.push(
    wire("w_ld", [[OR_OUT, OR.y], [760, OR.y], [760, 128], [850, 128], [850, acT]], hi("or")),
    { type: "junction", id: "j_ld", x: 850, y: acT },
    label("lbl_ld", 824, 118, "LD"),
  );

  const inc = GATES[7]!;
  els.push(
    { type: "junction", id: "j_inc", x: 360, y: inc.y },
    wire("w_inr", [[360, inc.y], [360, 590], [1030, 590], [1030, 108], [AC.x, 108], [AC.x, acT]], hi("g_inc")),
    label("lbl_inr", AC.x + 28, 118, "INR"),
  );

  els.push(
    { type: "junction", id: "j_b11", x: 78, y: 560 },
    label("lbl_b11", 48, 563, "B11"),
    wire("w_clr", [[78, 560], [1088, 560], [1088, 92], [950, 92], [950, acT]]),
    { type: "junction", id: "j_clr", x: 950, y: acT },
    label("lbl_clr", 968, 108, "CLR"),
  );

  els.push(
    { type: "junction", id: "j_from", x: 700, y: AC.y },
    wire("w_from", [[700, AC.y], [acL, AC.y]]),
    label("lbl_from16", 748, AC.y - 14, "16"),
    label("lbl_from", 748, AC.y + 18, "From Adder & Logic"),
    wire("w_to", [[acR, AC.y], [1060, AC.y]]),
    { type: "junction", id: "j_to", x: 1060, y: AC.y },
    label("lbl_to16", 1004, AC.y - 14, "16"),
    label("lbl_to", 1004, AC.y + 18, "To bus"),
    { type: "junction", id: "j_clk", x: 1040, y: acB + 28 },
    wire("w_clk", [[1040, acB + 28], [AC.x, acB + 28], [AC.x, acB]]),
    label("lbl_clk", 1040, acB + 14, "Clock"),
  );

  return els;
}

const steps: { title: string; height: number; notes: string[]; elements: SchematicElement[] }[] = [
  {
    title: "Every statement that changes AC",
    height: 500,
    notes: ["These nine transfers are the whole specification of the accumulator logic."],
    elements: statements(),
  },
  {
    title: "Circuit associated with AC",
    height: 440,
    notes: ["The adder and logic circuit forms the next word. Control gates decide when AC takes it."],
    elements: circuit(),
  },
  {
    title: "AND, ADD, and DR",
    height: 640,
    notes: ["D0T5, D1T5, and D2T5 are the three memory-reference loads. T5 is common."],
    elements: gateFig(3, false, ["g_and", "g_add", "g_dr"]),
  },
  {
    title: "INPR and complement",
    height: 640,
    notes: ["pB11 copies the input character. rB9 complements AC."],
    elements: gateFig(5, false, ["g_inpr", "g_cma"]),
  },
  {
    title: "Shift and increment",
    height: 640,
    notes: ["rB7 shifts right, rB6 shifts left, and rB5 increments AC."],
    elements: gateFig(8, false, ["g_shr", "g_shl", "g_inc"]),
  },
  {
    title: "LD, INR, and CLR",
    height: 680,
    notes: ["LD is the OR of every load. INR is the increment. CLR is rB11. Clock writes AC."],
    elements: gateFig(8, true, ["or", "ac"]),
  },
];

export const accumulatorLogicStepSchematics = frames(
  steps.map((step) => ({
    title: step.title,
    width: 1120,
    height: step.height,
    notes: step.notes,
    elements: step.elements,
  })),
);

export const accumulatorLogicTheoryDiagram = accumulatorLogicStepSchematics[5];

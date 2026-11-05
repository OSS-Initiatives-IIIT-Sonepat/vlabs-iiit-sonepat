import { type SchematicElement } from "@/labs/CircuitSchematic";
import { arrow, block, frames, label, terminal } from "../diagram";

/** Darshan instruction-cycle flowchart. Fetch down the middle, then D7 and I. */
const W = 1120;

type Kind = "block" | "terminal" | "decision";
type Side = "t" | "b" | "l" | "r";
type Node = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  kind: Kind;
};

const start: Node = {
  id: "start",
  x: 540,
  y: 58,
  w: 120,
  h: 32,
  text: "Start",
  kind: "terminal",
};
const sc: Node = {
  id: "sc",
  x: 540,
  y: 106,
  w: 140,
  h: 34,
  text: "SC ← 0",
  kind: "block",
};
const ar: Node = {
  id: "ar",
  x: 540,
  y: 164,
  w: 170,
  h: 38,
  text: "AR ← PC",
  kind: "block",
};
const ir: Node = {
  id: "ir",
  x: 540,
  y: 230,
  w: 300,
  h: 42,
  text: "IR ← M[AR], PC ← PC + 1",
  kind: "block",
};
const dec: Node = {
  id: "dec",
  x: 540,
  y: 304,
  w: 340,
  h: 52,
  text: "Decode IR(12-14)\nAR ← IR(0-11), I ← IR(15)",
  kind: "block",
};
const d7: Node = {
  id: "d7",
  x: 540,
  y: 404,
  w: 150,
  h: 64,
  text: "D7",
  kind: "decision",
};
const iod: Node = {
  id: "iod",
  x: 230,
  y: 530,
  w: 120,
  h: 64,
  text: "I",
  kind: "decision",
};
const ind: Node = {
  id: "ind",
  x: 840,
  y: 530,
  w: 120,
  h: 64,
  text: "I",
  kind: "decision",
};
const ioex: Node = {
  id: "ioex",
  x: 110,
  y: 690,
  w: 200,
  h: 54,
  text: "Execute input-output\nSC ← 0",
  kind: "block",
};
const regex: Node = {
  id: "regex",
  x: 360,
  y: 690,
  w: 240,
  h: 54,
  text: "Execute register-reference\nSC ← 0",
  kind: "block",
};
const arm: Node = {
  id: "arm",
  x: 700,
  y: 690,
  w: 160,
  h: 42,
  text: "AR ← M[AR]",
  kind: "block",
};
const noth: Node = {
  id: "noth",
  x: 980,
  y: 690,
  w: 140,
  h: 42,
  text: "Nothing",
  kind: "block",
};
const mem: Node = {
  id: "mem",
  x: 840,
  y: 820,
  w: 280,
  h: 54,
  text: "Execute memory-reference\nSC ← 0",
  kind: "block",
};

function P(n: Node, s: Side): [number, number] {
  if (s === "t") return [n.x, n.y - n.h / 2];
  if (s === "b") return [n.x, n.y + n.h / 2];
  if (s === "l") return [n.x - n.w / 2, n.y];
  return [n.x + n.w / 2, n.y];
}

function shape(n: Node, hot: boolean): SchematicElement {
  if (n.kind === "terminal")
    return terminal(n.id, n.x, n.y, n.w, n.h, n.text, hot);
  if (n.kind === "decision") {
    return {
      type: "decision",
      id: n.id,
      x: n.x,
      y: n.y,
      w: n.w,
      h: n.h,
      label: n.text,
      highlight: hot,
    };
  }
  return block(n.id, n.x, n.y, n.w, n.h, n.text, hot);
}

/** Horizontal, then straight down into the target pin. */
function into(
  id: string,
  from: [number, number],
  to: [number, number],
  hot: boolean,
) {
  return arrow(id, [from, [to[0], from[1]], to], hot);
}

function chart(show: string[], hot: string[]): SchematicElement[] {
  const on = (id: string) => show.includes(id);
  const hi = (id: string) => hot.includes(id);
  const els: SchematicElement[] = [];
  const nodes = [
    start,
    sc,
    ar,
    ir,
    dec,
    d7,
    iod,
    ind,
    ioex,
    regex,
    arm,
    noth,
    mem,
  ];
  for (const n of nodes) if (on(n.id)) els.push(shape(n, hi(n.id)));

  const down = (id: string, a: Node, b: Node) => {
    if (on(a.id) && on(b.id))
      els.push(arrow(id, [P(a, "b"), P(b, "t")], hi(b.id)));
  };
  down("w_sc", start, sc);
  down("w_ar", sc, ar);
  down("w_ir", ar, ir);
  down("w_dec", ir, dec);
  down("w_d7", dec, d7);

  if (on("d7") && on("iod")) {
    els.push(into("w_iod", P(d7, "l"), P(iod, "t"), hi("iod")));
    els.push(
      label(
        "lbl_d7yes",
        (P(d7, "l")[0] + iod.x) / 2,
        d7.y - 18,
        "(Register or I/O) = 1",
      ),
    );
  }
  if (on("d7") && on("ind")) {
    els.push(into("w_ind", P(d7, "r"), P(ind, "t"), hi("ind")));
    els.push(
      label(
        "lbl_d7no",
        (P(d7, "r")[0] + ind.x) / 2,
        d7.y - 18,
        "= 0 (Memory-reference)",
      ),
    );
  }
  if (on("iod") && on("ioex")) {
    els.push(into("w_ioex", P(iod, "l"), P(ioex, "t"), hi("ioex")));
    els.push(label("lbl_io", ioex.x - 62, P(ioex, "t")[1] - 36, "(I/O) = 1"));
    els.push(label("lbl_t3io", ioex.x - 62, P(ioex, "t")[1] - 16, "T3"));
  }
  if (on("iod") && on("regex")) {
    els.push(into("w_regex", P(iod, "r"), P(regex, "t"), hi("regex")));
    els.push(
      label("lbl_reg", regex.x + 78, P(regex, "t")[1] - 36, "= 0 (register)"),
    );
    els.push(label("lbl_t3reg", regex.x + 78, P(regex, "t")[1] - 16, "T3"));
  }
  if (on("ind") && on("arm")) {
    els.push(into("w_arm", P(ind, "l"), P(arm, "t"), hi("arm")));
    els.push(
      label("lbl_arm", arm.x - 70, P(arm, "t")[1] - 36, "(indirect) = 1"),
    );
    els.push(label("lbl_t3arm", arm.x - 70, P(arm, "t")[1] - 16, "T3"));
  }
  if (on("ind") && on("noth")) {
    els.push(into("w_noth", P(ind, "r"), P(noth, "t"), hi("noth")));
    els.push(
      label("lbl_dir", noth.x + 52, P(noth, "t")[1] - 36, "= 0 (direct)"),
    );
    els.push(label("lbl_t3dir", noth.x + 52, P(noth, "t")[1] - 16, "T3"));
  }

  if (on("ar")) els.push(label("lbl_t0", P(ar, "r")[0] + 20, ar.y, "T0"));
  if (on("ir")) els.push(label("lbl_t1", P(ir, "r")[0] + 20, ir.y, "T1"));
  if (on("dec")) els.push(label("lbl_t2", P(dec, "r")[0] + 20, dec.y, "T2"));

  if (on("noth") && on("mem")) {
    const y = (P(noth, "b")[1] + P(mem, "t")[1]) / 2;
    const tip = P(mem, "t");
    if (on("arm")) {
      els.push(arrow("w_arm_m", [P(arm, "b"), [arm.x, y], [mem.x, y]], false));
      els.push(
        arrow("w_noth_m", [P(noth, "b"), [noth.x, y], [mem.x, y]], false),
      );
      els.push(arrow("w_mem", [[mem.x, y], tip], hi("mem")));
      els.push({ type: "junction", id: "j_mem", x: mem.x, y });
    } else {
      els.push(
        arrow("w_mem", [P(noth, "b"), [noth.x, y], [mem.x, y], tip], hi("mem")),
      );
    }
    els.push(label("lbl_t4", mem.x + 48, (y + tip[1]) / 2, "T4"));
  }

  return els;
}

const steps: {
  title: string;
  show: string[];
  hot: string[];
  notes: string[];
  height: number;
}[] = [
  {
    title: "Instruction cycle",
    show: ["start", "sc"],
    hot: ["sc"],
    notes: ["SC starts at 0, so the first timing signal is T0."],
    height: 180,
  },
  {
    title: "T0: AR ← PC",
    show: ["start", "sc", "ar"],
    hot: ["ar"],
    notes: ["PC holds the address of the instruction about to be read."],
    height: 230,
  },
  {
    title: "T1: fetch into IR",
    show: ["start", "sc", "ar", "ir"],
    hot: ["ir"],
    notes: ["The instruction is copied into IR, and PC moves on."],
    height: 310,
  },
  {
    title: "T2: decode",
    show: ["start", "sc", "ar", "ir", "dec"],
    hot: ["dec"],
    notes: ["Opcode, address, and the mode bit I are all taken from IR."],
    height: 390,
  },
  {
    title: "Type of instruction",
    show: ["start", "sc", "ar", "ir", "dec", "d7"],
    hot: ["d7"],
    notes: ["D7 = 1 is opcode 111. Anything else is a memory reference."],
    height: 500,
  },
  {
    title: "Register and input-output",
    show: ["start", "sc", "ar", "ir", "dec", "d7", "iod", "ioex", "regex"],
    hot: ["ioex", "regex"],
    notes: [
      "I = 1 executes input-output. I = 0 executes a register instruction.",
    ],
    height: 780,
  },
  {
    title: "Direct memory reference",
    show: [
      "start",
      "sc",
      "ar",
      "ir",
      "dec",
      "d7",
      "iod",
      "ioex",
      "regex",
      "ind",
      "noth",
      "mem",
    ],
    hot: ["noth", "mem"],
    notes: ["I = 0: the address in AR is already the effective address."],
    height: 910,
  },
  {
    title: "Indirect memory reference",
    show: [
      "start",
      "sc",
      "ar",
      "ir",
      "dec",
      "d7",
      "iod",
      "ioex",
      "regex",
      "ind",
      "arm",
      "noth",
      "mem",
    ],
    hot: ["arm", "mem"],
    notes: ["I = 1: T3 reads the effective address, then T4 executes."],
    height: 910,
  },
];

export const instructionCycleStepSchematics = frames(
  steps.map((step) => ({
    title: step.title,
    width: W,
    height: step.height,
    notes: step.notes,
    elements: chart(step.show, step.hot),
  })),
);

export const instructionCycleTheoryDiagram = instructionCycleStepSchematics[7];

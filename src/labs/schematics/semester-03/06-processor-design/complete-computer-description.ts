import { type SchematicElement } from "@/labs/CircuitSchematic";
import { arrow, frames, label } from "../diagram";

/**
 * Darshan "Complete Computer Description".
 * One rectangle. Start clears SC, IEN, and R. R picks the cycle.
 * The instruction cycle is the left column. The interrupt cycle is the right
 * column. Both meet at D7, and every execute path returns along the border.
 */
const W = 1100;
const GRAY = "#9a9a9a";
const INK = "#ffffff";

const L = 48;
const T = 44;
const R = 1052;
const B = 836;

type Kind = "box" | "decision";
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
  x: 550,
  y: 68,
  w: 300,
  h: 48,
  text: "Start\nSC ← 0, IEN ← 0, R ← 0",
  kind: "box",
};
const rdec: Node = {
  id: "r",
  x: 550,
  y: 164,
  w: 86,
  h: 72,
  text: "R",
  kind: "decision",
};
const ar: Node = {
  id: "ar",
  x: 290,
  y: 252,
  w: 156,
  h: 36,
  text: "AR ← PC",
  kind: "box",
};
const ir: Node = {
  id: "ir",
  x: 290,
  y: 312,
  w: 268,
  h: 36,
  text: "IR ← M[AR], PC ← PC + 1",
  kind: "box",
};
const dec: Node = {
  id: "dec",
  x: 290,
  y: 384,
  w: 330,
  h: 56,
  text: "Decode operation code in IR(12-14)\nAR ← IR(0-11), I ← IR(15)",
  kind: "box",
};
const rt0: Node = {
  id: "rt0",
  x: 830,
  y: 252,
  w: 200,
  h: 36,
  text: "AR ← 0, TR ← PC",
  kind: "box",
};
const rt1: Node = {
  id: "rt1",
  x: 830,
  y: 312,
  w: 220,
  h: 36,
  text: "M[AR] ← TR, PC ← 0",
  kind: "box",
};
const rt2: Node = {
  id: "rt2",
  x: 830,
  y: 384,
  w: 248,
  h: 56,
  text: "PC ← PC + 1, IEN ← 0,\nR ← 0, SC ← 0",
  kind: "box",
};
const d7: Node = {
  id: "d7",
  x: 550,
  y: 530,
  w: 100,
  h: 68,
  text: "D7",
  kind: "decision",
};
const iod: Node = {
  id: "iod",
  x: 260,
  y: 640,
  w: 92,
  h: 66,
  text: "I",
  kind: "decision",
};
const ind: Node = {
  id: "ind",
  x: 840,
  y: 640,
  w: 92,
  h: 66,
  text: "I",
  kind: "decision",
};
const ioex: Node = {
  id: "ioex",
  x: 175,
  y: 770,
  w: 196,
  h: 62,
  text: "Execute input-output\ninstruction\nSC ← 0",
  kind: "box",
};
const regex: Node = {
  id: "regex",
  x: 455,
  y: 770,
  w: 210,
  h: 62,
  text: "Execute register-reference\ninstruction\nSC ← 0",
  kind: "box",
};
const arm: Node = {
  id: "arm",
  x: 740,
  y: 698,
  w: 156,
  h: 36,
  text: "AR ← M[AR]",
  kind: "box",
};
const noth: Node = {
  id: "noth",
  x: 960,
  y: 698,
  w: 128,
  h: 36,
  text: "Nothing",
  kind: "box",
};
const mem: Node = {
  id: "mem",
  x: 850,
  y: 776,
  w: 270,
  h: 54,
  text: "Execute memory-reference\ninstruction\nSC ← 0",
  kind: "box",
};

function P(n: Node, s: Side): [number, number] {
  if (s === "t") return [n.x, n.y - n.h / 2];
  if (s === "b") return [n.x, n.y + n.h / 2];
  if (s === "l") return [n.x - n.w / 2, n.y];
  return [n.x + n.w / 2, n.y];
}

function shape(n: Node, hot: boolean): SchematicElement {
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
  return {
    type: "block",
    id: n.id,
    x: n.x,
    y: n.y,
    w: n.w,
    h: n.h,
    label: n.text,
    highlight: hot,
    fill: GRAY,
    ink: INK,
  };
}

function chart(show: string[], hot: string[]): SchematicElement[] {
  const on = (id: string) => show.includes(id);
  const hi = (id: string) => hot.includes(id);
  const els: SchematicElement[] = [];

  els.push({
    type: "wire",
    id: "w_loop",
    points: [
      { x: L, y: T },
      { x: R, y: T },
      { x: R, y: B },
      { x: L, y: B },
      { x: L, y: T },
    ],
  });

  const nodes = [
    start,
    rdec,
    ar,
    ir,
    dec,
    rt0,
    rt1,
    rt2,
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

  if (on("start") && on("r")) down("w_r", start, rdec);

  if (on("r") && on("ar")) {
    els.push(
      arrow("w_ar", [P(rdec, "l"), [ar.x, rdec.y], P(ar, "t")], hi("ar")),
    );
    els.push(
      label(
        "lbl_ic",
        (P(rdec, "l")[0] + ar.x) / 2,
        rdec.y - 18,
        "(Instruction cycle) = 0",
      ),
    );
  }
  down("w_ir", ar, ir);
  down("w_dec", ir, dec);
  if (on("ar"))
    els.push(label("lbl_rt0", ar.x + 108, P(ar, "t")[1] - 8, "R'T0"));
  if (on("ir"))
    els.push(label("lbl_rt1", ir.x + 168, P(ir, "t")[1] - 8, "R'T1"));
  if (on("dec"))
    els.push(label("lbl_rt2", dec.x + 196, P(dec, "t")[1] - 4, "R'T2"));

  if (on("r") && on("rt0")) {
    els.push(
      arrow("w_rt0", [P(rdec, "r"), [rt0.x, rdec.y], P(rt0, "t")], hi("rt0")),
    );
    els.push(
      label(
        "lbl_int",
        (P(rdec, "r")[0] + rt0.x) / 2,
        rdec.y - 18,
        "=1 (Interrupt cycle)",
      ),
    );
  }
  down("w_rt1", rt0, rt1);
  down("w_rt2", rt1, rt2);
  if (on("rt0"))
    els.push(label("lbl_i0", rt0.x + 128, P(rt0, "t")[1] - 8, "RT0"));
  if (on("rt1"))
    els.push(label("lbl_i1", rt1.x + 140, P(rt1, "t")[1] - 8, "RT1"));
  if (on("rt2"))
    els.push(label("lbl_i2", rt2.x + 156, P(rt2, "t")[1] - 4, "RT2"));

  const meet: [number, number] = [d7.x, 458];
  if (on("dec") && on("d7")) {
    els.push(arrow("w_dec_m", [P(dec, "b"), [dec.x, meet[1]], meet], false));
  }
  if (on("rt2") && on("d7")) {
    const side = 990;
    els.push(
      arrow(
        "w_rt_m",
        [P(rt2, "b"), [rt2.x, 492], [side, 492], [side, meet[1]], meet],
        false,
      ),
    );
  }
  if ((on("dec") || on("rt2")) && on("d7")) {
    if (on("dec") && on("rt2"))
      els.push({ type: "junction", id: "j_meet", x: meet[0], y: meet[1] });
    els.push(arrow("w_d7", [meet, P(d7, "t")], hi("d7")));
  }

  if (on("d7") && on("iod")) {
    els.push(
      arrow("w_iod", [P(d7, "l"), [iod.x, d7.y], P(iod, "t")], hi("iod")),
    );
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
    els.push(
      arrow("w_ind", [P(d7, "r"), [ind.x, d7.y], P(ind, "t")], hi("ind")),
    );
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
    els.push(
      arrow("w_ioex", [P(iod, "l"), [ioex.x, iod.y], P(ioex, "t")], hi("ioex")),
    );
    els.push(label("lbl_io", ioex.x - 70, P(ioex, "t")[1] - 36, "(I/O) = 1"));
    els.push(label("lbl_t3io", ioex.x - 70, P(ioex, "t")[1] - 18, "T3"));
  }
  if (on("iod") && on("regex")) {
    els.push(
      arrow(
        "w_regex",
        [P(iod, "r"), [regex.x, iod.y], P(regex, "t")],
        hi("regex"),
      ),
    );
    els.push(
      label("lbl_reg", regex.x + 92, P(regex, "t")[1] - 36, "= 0 (register)"),
    );
    els.push(label("lbl_t3reg", regex.x + 92, P(regex, "t")[1] - 18, "T3"));
  }
  if (on("ind") && on("arm")) {
    els.push(
      arrow("w_arm", [P(ind, "l"), [arm.x, ind.y], P(arm, "t")], hi("arm")),
    );
    els.push(
      label("lbl_arm", arm.x - 86, P(arm, "t")[1] - 28, "(indirect) = 1"),
    );
    els.push(label("lbl_t3arm", arm.x - 86, P(arm, "t")[1] - 12, "T3"));
  }
  if (on("ind") && on("noth")) {
    els.push(
      arrow("w_noth", [P(ind, "r"), [noth.x, ind.y], P(noth, "t")], hi("noth")),
    );
    els.push(
      label("lbl_dir", noth.x - 70, P(noth, "t")[1] - 28, "= 0 (direct)"),
    );
    els.push(label("lbl_t3dir", noth.x - 70, P(noth, "t")[1] - 12, "T3"));
  }

  if (on("arm") && on("noth") && on("mem")) {
    const y = (P(arm, "b")[1] + P(mem, "t")[1]) / 2;
    els.push(arrow("w_arm_m", [P(arm, "b"), [arm.x, y], [mem.x, y]], false));
    els.push(arrow("w_noth_m", [P(noth, "b"), [noth.x, y], [mem.x, y]], false));
    els.push(arrow("w_mem", [[mem.x, y], P(mem, "t")], hi("mem")));
    els.push({ type: "junction", id: "j_mem", x: mem.x, y });
  }

  if (on("back")) {
    for (const n of [ioex, regex, mem]) {
      if (!on(n.id)) continue;
      const [x, y] = P(n, "b");
      els.push(
        arrow(
          `w_back_${n.id}`,
          [
            [x, y],
            [x, B],
          ],
          false,
        ),
      );
    }
  }

  return els;
}

const steps: {
  title: string;
  show: string[];
  hot: string[];
  notes: string[];
}[] = [
  {
    title: "The computer is started",
    show: ["start"],
    hot: ["start"],
    notes: ["SC, IEN, and R are cleared before the first cycle."],
  },
  {
    title: "R chooses the cycle",
    show: ["start", "r"],
    hot: ["r"],
    notes: ["R = 0 is an instruction cycle. R = 1 is an interrupt cycle."],
  },
  {
    title: "Instruction cycle: fetch and decode",
    show: ["start", "r", "ar", "ir", "dec"],
    hot: ["ar", "ir", "dec"],
    notes: [
      "Fetch runs only while R is 0, so the clocks are R'T0, R'T1, and R'T2.",
    ],
  },
  {
    title: "Interrupt cycle",
    show: ["start", "r", "ar", "ir", "dec", "rt0", "rt1", "rt2"],
    hot: ["rt0", "rt1", "rt2"],
    notes: [
      "RT0 saves PC in TR. RT1 writes it at address 0. RT2 goes to address 1.",
    ],
  },
  {
    title: "Both paths meet at D7",
    show: ["start", "r", "ar", "ir", "dec", "rt0", "rt1", "rt2", "d7"],
    hot: ["d7"],
    notes: [
      "D7 = 1 is a register or input-output instruction. D7 = 0 is a memory reference.",
    ],
  },
  {
    title: "Register or input-output",
    show: [
      "start",
      "r",
      "ar",
      "ir",
      "dec",
      "rt0",
      "rt1",
      "rt2",
      "d7",
      "iod",
      "ioex",
      "regex",
    ],
    hot: ["ioex", "regex"],
    notes: [
      "I = 1 executes input-output at T3. I = 0 executes a register instruction at T3.",
    ],
  },
  {
    title: "Memory reference",
    show: [
      "start",
      "r",
      "ar",
      "ir",
      "dec",
      "rt0",
      "rt1",
      "rt2",
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
    notes: [
      "I = 1 reads the effective address at T3. I = 0 does nothing, then T4 executes.",
    ],
  },
  {
    title: "Back to R",
    show: [
      "start",
      "r",
      "ar",
      "ir",
      "dec",
      "rt0",
      "rt1",
      "rt2",
      "d7",
      "iod",
      "ioex",
      "regex",
      "ind",
      "arm",
      "noth",
      "mem",
      "back",
    ],
    hot: ["mem", "ioex", "regex"],
    notes: ["SC is cleared, and the border brings control back to R."],
  },
];

export const completeComputerDescriptionStepSchematics = frames(
  steps.map((step) => ({
    title: step.title,
    width: W,
    height: 900,
    notes: step.notes,
    elements: chart(step.show, step.hot),
  })),
);

export const completeComputerDescriptionTheoryDiagram =
  completeComputerDescriptionStepSchematics[7];

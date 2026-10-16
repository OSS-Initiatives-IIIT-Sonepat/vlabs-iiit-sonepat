import type { Pt, SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Geometry of every schematic symbol, in the symbol's local frame (before
 * `translate(x,y) rotate(rotation)`). Must mirror the drawing code in
 * CircuitSchematic.tsx — pins are where wires attach, `body` is the area no
 * wire may cross, and `leads` are the short stubs between pins and body.
 */

export type Box = { x0: number; y0: number; x1: number; y1: number };
export type Seg = [Pt, Pt];
export type TextSpec = {
  x: number;
  y: number;
  text: string;
  fontSize: number;
  anchor: "start" | "middle" | "end";
};

type LocalGeometry = {
  pins: Pt[];
  body: Box;
  leads: Seg[];
  texts: TextSpec[];
};

const box = (x0: number, y0: number, x1: number, y1: number): Box => ({
  x0,
  y0,
  x1,
  y1,
});
const seg = (ax: number, ay: number, bx: number, by: number): Seg => [
  { x: ax, y: ay },
  { x: bx, y: by },
];
const pt = (x: number, y: number): Pt => ({ x, y });
const txt = (
  x: number,
  y: number,
  text: string | undefined,
  fontSize: number,
  anchor: TextSpec["anchor"] = "middle",
): TextSpec[] => (text ? [{ x, y, text, fontSize, anchor }] : []);

function horizontal2(
  pinX: number,
  bodyX: number,
  body: Box,
  texts: TextSpec[],
): LocalGeometry {
  return {
    pins: [pt(-pinX, 0), pt(pinX, 0)],
    body,
    leads: [seg(-pinX, 0, -bodyX, 0), seg(bodyX, 0, pinX, 0)],
    texts,
  };
}

function gate2(
  inX: number,
  inEnd: number,
  outStart: number,
  outX: number,
  body: Box,
  label?: string,
): LocalGeometry {
  return {
    pins: [pt(inX, -8), pt(inX, 8), pt(outX, 0)],
    body,
    leads: [
      seg(inX, -8, inEnd, -8),
      seg(inX, 8, inEnd, 8),
      seg(outStart, 0, outX, 0),
    ],
    texts: txt(0, -22, label, 9),
  };
}

function localGeometry(el: SchematicElement): LocalGeometry | null {
  switch (el.type) {
    case "resistor":
      return horizontal2(30, 20, box(-20, -7, 20, 7), [
        ...txt(0, -14, el.label, 10),
        ...txt(0, 22, el.value, 9),
      ]);
    case "zener":
      return horizontal2(20, 8, box(-8, -9, 12, 9), [
        ...txt(0, -18, el.label, 10),
        ...txt(0, 24, el.value, 9),
      ]);
    case "diode":
      return horizontal2(20, 8, box(-8, -9, 8, 9), txt(0, -18, el.label, 10));
    case "capacitor":
      return horizontal2(20, 4, box(-4, -12, 4, 12), [
        ...txt(0, -16, el.label, 10),
        ...txt(0, 22, el.value, 9),
      ]);
    case "inductor":
      return horizontal2(30, 20, box(-20, -6, 20, 2), [
        ...txt(0, -12, el.label, 10),
        ...txt(0, 16, el.value, 9),
      ]);
    case "led":
      return horizontal2(20, 8, box(-8, -18, 10, 9), txt(0, 20, el.label, 9));
    case "vsource":
      return {
        pins: [pt(0, -30), pt(0, 30)],
        body: box(-16, -5, 16, 5),
        leads: [seg(0, -30, 0, -4), seg(0, 4, 0, 30)],
        texts: [
          ...txt(12, -10, "+", 10, "start"),
          ...txt(12, 16, "−", 10, "start"),
          ...txt(-18, 4, el.label, 10, "end"),
          ...txt(-18, 16, el.value, 9, "end"),
        ],
      };
    case "acsource":
      return {
        pins: [pt(0, -30), pt(0, 30)],
        body: box(-16, -16, 16, 16),
        leads: [seg(0, -30, 0, -16), seg(0, 16, 0, 30)],
        texts: [
          ...txt(-20, 4, el.label, 10, "end"),
          ...txt(-20, 16, el.value, 9, "end"),
        ],
      };
    case "ammeter":
    case "voltmeter":
      return {
        pins: [pt(0, -24), pt(0, 24)],
        body: box(-14, -14, 14, 14),
        leads: [seg(0, -24, 0, -14), seg(0, 14, 0, 24)],
        texts: txt(18, 4, el.label, 10, "start"),
      };
    case "ground":
      return {
        pins: [pt(0, 0)],
        body: box(-14, 2, 14, 19),
        leads: [],
        texts: [],
      };
    case "probe":
      return {
        pins: [pt(0, 0)],
        body: box(-6, -6, 6, 6),
        leads: [],
        texts: txt(10, 4, el.label, 9, "start"),
      };
    case "npn-bjt":
    case "pnp-bjt":
      return {
        pins: [pt(-20, 0), pt(20, -30), pt(20, 30)],
        body: box(-6, -20, 20, 20),
        leads: [seg(-20, 0, -6, 0), seg(20, -30, 20, -20), seg(20, 20, 20, 30)],
        texts: [
          ...txt(-14, -8, "B", 8, "start"),
          ...txt(24, -24, "C", 8, "start"),
          ...txt(24, 28, "E", 8, "start"),
          ...txt(0, -28, el.label, 10),
        ],
      };
    case "n-mosfet":
    case "p-mosfet":
      return {
        pins: [pt(-24, 0), pt(10, -30), pt(10, 30)],
        body: box(-10, -14, 10, 14),
        leads: [
          seg(-24, 0, -10, 0),
          seg(10, -30, 10, -14),
          seg(10, 14, 10, 30),
        ],
        texts: [
          ...txt(-18, -8, "G", 8, "start"),
          ...txt(16, -24, "D", 8, "start"),
          ...txt(16, 28, "S", 8, "start"),
          ...txt(-14, -20, el.label, 10, "end"),
        ],
      };
    case "op-amp":
      return {
        pins: [pt(-30, -12), pt(-30, 12), pt(40, 0)],
        body: box(-20, -24, 30, 24),
        leads: [
          seg(-30, -12, -20, -12),
          seg(-30, 12, -20, 12),
          seg(30, 0, 40, 0),
        ],
        texts: txt(0, -30, el.label, 10),
      };
    case "and-gate":
      return gate2(-26, -16, 16, 26, box(-16, -16, 16, 16), el.label);
    case "or-gate":
      return gate2(-26, -12, 20, 26, box(-16, -16, 20, 16), el.label);
    case "nand-gate":
      return gate2(-26, -16, 24, 32, box(-16, -16, 24, 16), el.label);
    case "nor-gate":
      return gate2(-26, -12, 28, 36, box(-16, -16, 28, 16), el.label);
    case "xor-gate":
      return gate2(-28, -12, 20, 28, box(-20, -16, 20, 16), el.label);
    case "xnor-gate":
      return gate2(-28, -12, 28, 36, box(-20, -16, 28, 16), el.label);
    case "not-gate":
      return {
        pins: [pt(-22, 0), pt(26, 0)],
        body: box(-14, -12, 18, 12),
        leads: [seg(-22, 0, -14, 0), seg(18, 0, 26, 0)],
        texts: txt(0, -18, el.label, 9),
      };
    default:
      return null;
  }
}

// ── World-space geometry ───────────────────────────────────────────────────

export type SymbolGeometry = {
  id: string;
  type: SchematicElement["type"];
  pins: Pt[];
  body: Box;
  leads: Seg[];
  texts: Box[];
  textStrings: string[];
};

function rotatePt(p: Pt, deg: number): Pt {
  const r = (deg * Math.PI) / 180;
  const c = Math.round(Math.cos(r) * 1e6) / 1e6;
  const s = Math.round(Math.sin(r) * 1e6) / 1e6;
  return { x: p.x * c - p.y * s, y: p.x * s + p.y * c };
}

function placePt(p: Pt, x: number, y: number, rot: number): Pt {
  const q = rotatePt(p, rot);
  return { x: q.x + x, y: q.y + y };
}

function placeBox(b: Box, x: number, y: number, rot: number): Box {
  const corners = [
    placePt({ x: b.x0, y: b.y0 }, x, y, rot),
    placePt({ x: b.x1, y: b.y0 }, x, y, rot),
    placePt({ x: b.x0, y: b.y1 }, x, y, rot),
    placePt({ x: b.x1, y: b.y1 }, x, y, rot),
  ];
  return {
    x0: Math.min(...corners.map((c) => c.x)),
    y0: Math.min(...corners.map((c) => c.y)),
    x1: Math.max(...corners.map((c) => c.x)),
    y1: Math.max(...corners.map((c) => c.y)),
  };
}

/** Approximate rendered box of an SVG text run (sans-serif, baseline at y). */
export function textBox(t: TextSpec): Box {
  const width = [...t.text].length * t.fontSize * 0.56;
  const x0 =
    t.anchor === "start"
      ? t.x
      : t.anchor === "end"
        ? t.x - width
        : t.x - width / 2;
  return box(x0, t.y - t.fontSize * 0.75, x0 + width, t.y + t.fontSize * 0.2);
}

/**
 * Centre of a symbol's text once the symbol is rotated, in the symbol's
 * unrotated frame. Text stays upright: it swings round with the symbol and is
 * pushed out so it keeps the same clearance from the body it had at 0°.
 * `inside` marks (op-amp ±, meter letter) just follow their anchor point.
 */
export function uprightTextCenter(
  t: TextSpec,
  rotation: number,
  inside = false,
): Pt {
  const b = textBox(t);
  const c = pt((b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2);
  const rc = rotatePt(c, rotation);
  const len = Math.hypot(c.x, c.y);
  if (inside || len < 1) return rc;
  const hw = (b.x1 - b.x0) / 2;
  const hh = (b.y1 - b.y0) / 2;
  const u = pt(c.x / len, c.y / len);
  const clearance = len - (hw * Math.abs(u.x) + hh * Math.abs(u.y));
  const ru = pt(rc.x / len, rc.y / len);
  const reach = clearance + hw * Math.abs(ru.x) + hh * Math.abs(ru.y);
  return pt(ru.x * reach, ru.y * reach);
}

/** Baseline offset that vertically centres a text run on a point. */
export const textBaselineOffset = (fontSize: number) => fontSize * 0.275;

function placeText(
  t: TextSpec,
  x: number,
  y: number,
  rot: number,
): Box {
  if (!(rot % 360)) return placeBox(textBox(t), x, y, 0);
  const c = uprightTextCenter(t, rot);
  const b = textBox(t);
  const hw = (b.x1 - b.x0) / 2;
  const hh = (b.y1 - b.y0) / 2;
  return box(x + c.x - hw, y + c.y - hh, x + c.x + hw, y + c.y + hh);
}

export function symbolGeometry(el: SchematicElement): SymbolGeometry | null {
  const local = localGeometry(el);
  if (!local || !("x" in el)) return null;
  const rot = "rotation" in el ? (el.rotation ?? 0) : 0;
  const { x, y } = el;
  return {
    id: el.id,
    type: el.type,
    pins: local.pins.map((p) => placePt(p, x, y, rot)),
    body: placeBox(local.body, x, y, rot),
    leads: local.leads.map(
      ([a, b]) => [placePt(a, x, y, rot), placePt(b, x, y, rot)] as Seg,
    ),
    texts: local.texts.map((t) => placeText(t, x, y, rot)),
    textStrings: local.texts.map((t) => t.text),
  };
}

/** World-space pins of a symbol, for authoring wires that land exactly on them. */
export function pinsOf(el: SchematicElement): Pt[] {
  return symbolGeometry(el)?.pins ?? [];
}

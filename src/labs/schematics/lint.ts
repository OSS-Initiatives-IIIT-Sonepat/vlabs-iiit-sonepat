import type {
  Pt,
  SchematicData,
  SchematicElement,
} from "@/labs/CircuitSchematic";
import {
  symbolGeometry,
  textBox,
  type Box,
  type Seg,
  type SymbolGeometry,
} from "./geometry";

/*
 * Static layout checks for 2D schematics. Catches wires drawn through
 * component bodies, wires that miss pins, T-joins without a junction dot,
 * overlapping parts/labels and anything drawn outside the canvas.
 */

export type LintSeverity = "error" | "warn" | "info";
export type LintIssue = {
  severity: LintSeverity;
  code: string;
  message: string;
  at?: Pt;
};

const EPS = 1.5;
const PROBE_RADIUS = 7;

type WireSeg = { wireId: string; outline: boolean; a: Pt; b: Pt };

const dist = (p: Pt, q: Pt) => Math.hypot(p.x - q.x, p.y - q.y);
const near = (p: Pt, q: Pt, eps = EPS) => dist(p, q) <= eps;
const fmt = (p: Pt) => `(${+p.x.toFixed(1)}, ${+p.y.toFixed(1)})`;

function shrink(b: Box, d: number): Box {
  return { x0: b.x0 + d, y0: b.y0 + d, x1: b.x1 - d, y1: b.y1 - d };
}

function boxesOverlap(a: Box, b: Box): boolean {
  return a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
}

/** Where `p` sits on segment ab: at an end, strictly inside, or not on it. */
function onSegment(p: Pt, a: Pt, b: Pt, eps = EPS): "end" | "interior" | null {
  if (near(p, a, eps) || near(p, b, eps)) return "end";
  const len = dist(a, b);
  if (len === 0) return null;
  const t =
    ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / (len * len);
  if (t <= 0 || t >= 1) return null;
  const proj = { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) };
  return near(p, proj, eps) ? "interior" : null;
}

/** Liang–Barsky clip: does segment ab enter the open box? */
function segmentHitsBox(a: Pt, b: Pt, bx: Box): boolean {
  if (bx.x1 <= bx.x0 || bx.y1 <= bx.y0) return false;
  let t0 = 0,
    t1 = 1;
  const dx = b.x - a.x,
    dy = b.y - a.y;
  const checks: [number, number][] = [
    [-dx, a.x - bx.x0],
    [dx, bx.x1 - a.x],
    [-dy, a.y - bx.y0],
    [dy, bx.y1 - a.y],
  ];
  for (const [p, q] of checks) {
    if (p === 0) {
      if (q <= 0) return false;
    } else {
      const r = q / p;
      if (p < 0) t0 = Math.max(t0, r);
      else t1 = Math.min(t1, r);
      if (t0 >= t1) return false;
    }
  }
  return t1 - t0 > 1e-6;
}

/** Length over which two collinear segments overlap (0 if not collinear). */
function collinearOverlap(a: Seg, b: Seg): number {
  const [p, q] = a;
  const len = dist(p, q);
  if (len === 0) return 0;
  const ux = (q.x - p.x) / len,
    uy = (q.y - p.y) / len;
  const off = (r: Pt) => Math.abs((r.x - p.x) * uy - (r.y - p.y) * ux);
  if (off(b[0]) > 0.5 || off(b[1]) > 0.5) return 0;
  const proj = (r: Pt) => (r.x - p.x) * ux + (r.y - p.y) * uy;
  const s0 = Math.min(proj(b[0]), proj(b[1]));
  const s1 = Math.max(proj(b[0]), proj(b[1]));
  return Math.max(0, Math.min(len, s1) - Math.max(0, s0));
}

/** Proper crossing of two segment interiors (not touching at ends). */
function segmentsCross(a: Seg, b: Seg): Pt | null {
  const [p, p2] = a;
  const [q, q2] = b;
  const r = { x: p2.x - p.x, y: p2.y - p.y };
  const s = { x: q2.x - q.x, y: q2.y - q.y };
  const den = r.x * s.y - r.y * s.x;
  if (Math.abs(den) < 1e-9) return null;
  const t = ((q.x - p.x) * s.y - (q.y - p.y) * s.x) / den;
  const u = ((q.x - p.x) * r.y - (q.y - p.y) * r.x) / den;
  const m = 0.02;
  if (t <= m || t >= 1 - m || u <= m || u >= 1 - m) return null;
  return { x: p.x + t * r.x, y: p.y + t * r.y };
}

function boxDistance(p: Pt, b: Box): number {
  const dx = Math.max(b.x0 - p.x, 0, p.x - b.x1);
  const dy = Math.max(b.y0 - p.y, 0, p.y - b.y1);
  return Math.hypot(dx, dy);
}

export function lintSchematic(schematic: SchematicData): LintIssue[] {
  const issues: LintIssue[] = [];
  const connectivityCodes = new Set([
    "DANGLING_WIRE",
    "UNCONNECTED_PIN",
    "FLOATING_JUNCTION",
  ]);
  const add = (
    severity: LintSeverity,
    code: string,
    message: string,
    at?: Pt,
  ) => {
    if (schematic.gallery && connectivityCodes.has(code)) return;
    issues.push({ severity, code, message, at });
  };

  const W = schematic.width ?? 340;
  const H = schematic.height ?? 260;
  const view: Box = { x0: -10, y0: -10, x1: W + 10, y1: H + 10 };

  const symbols: SymbolGeometry[] = [];
  const wires: Extract<SchematicElement, { type: "wire" }>[] = [];
  const junctions: Pt[] = [];
  const labels: { id: string; box: Box; text: string }[] = [];
  const seen = new Set<string>();

  for (const el of schematic.elements) {
    if (seen.has(el.id))
      add("warn", "DUPLICATE_ID", `duplicate element id "${el.id}"`);
    seen.add(el.id);
    if (el.type === "wire") wires.push(el);
    else if (el.type === "junction") junctions.push({ x: el.x, y: el.y });
    else if (el.type === "label")
      labels.push({
        id: el.id,
        text: el.text,
        box: textBox({
          x: el.x,
          y: el.y,
          text: el.text,
          fontSize: 9,
          anchor: "middle",
        }),
      });
    else {
      const g = symbolGeometry(el);
      if (g) symbols.push(g);
    }
  }

  // ── Wire segments ───────────────────────────────────────────────────
  const segs: WireSeg[] = [];
  for (const w of wires) {
    const pts = w.points;
    const outline = pts.length >= 4 && near(pts[0], pts[pts.length - 1], 0.01);
    if (pts.length < 2)
      add("error", "WIRE_TOO_SHORT", `wire ${w.id} has < 2 points`);
    for (let i = 0; i + 1 < pts.length; i++) {
      const a = pts[i],
        b = pts[i + 1];
      if (near(a, b, 0.01)) {
        add("warn", "ZERO_LENGTH", `wire ${w.id} has a zero-length segment`, a);
        continue;
      }
      if (Math.abs(a.x - b.x) > 0.01 && Math.abs(a.y - b.y) > 0.01)
        add(
          "warn",
          "DIAGONAL_WIRE",
          `wire ${w.id} has a diagonal segment ${fmt(a)}→${fmt(b)}`,
          a,
        );
      segs.push({ wireId: w.id, outline, a, b });
    }
  }
  const outlineIds = new Set(
    segs.filter((s) => s.outline).map((s) => s.wireId),
  );

  // ── Bounds ──────────────────────────────────────────────────────────
  const inView = (b: Box) =>
    b.x0 >= view.x0 - 1 &&
    b.y0 >= view.y0 - 1 &&
    b.x1 <= view.x1 + 1 &&
    b.y1 <= view.y1 + 1;
  for (const s of symbols) {
    if (!inView(s.body))
      add(
        "error",
        "OUT_OF_BOUNDS",
        `${s.id} body is outside the ${W}×${H} canvas`,
      );
    s.texts.forEach((t, i) => {
      if (!inView(t))
        add(
          "error",
          "OUT_OF_BOUNDS",
          `${s.id} text "${s.textStrings[i]}" is outside the canvas`,
        );
    });
  }
  for (const l of labels)
    if (!inView(l.box))
      add(
        "error",
        "OUT_OF_BOUNDS",
        `label ${l.id} "${l.text}" is outside the canvas`,
      );
  for (const w of wires)
    for (const p of w.points)
      if (!inView({ x0: p.x, y0: p.y, x1: p.x, y1: p.y }))
        add(
          "error",
          "OUT_OF_BOUNDS",
          `wire ${w.id} point ${fmt(p)} is outside the canvas`,
          p,
        );

  // ── Wires vs. symbol bodies and leads ───────────────────────────────
  for (const sg of segs) {
    for (const s of symbols) {
      if (segmentHitsBox(sg.a, sg.b, shrink(s.body, EPS)))
        add(
          "error",
          "WIRE_THROUGH_BODY",
          `wire ${sg.wireId} crosses the body of ${s.id}`,
          sg.a,
        );
      for (const lead of s.leads)
        if (collinearOverlap([sg.a, sg.b], lead) > EPS)
          add(
            "error",
            "WIRE_ON_LEAD",
            `wire ${sg.wireId} runs along a lead of ${s.id}`,
            lead[0],
          );
    }
  }

  // ── Overlapping wires ───────────────────────────────────────────────
  for (let i = 0; i < segs.length; i++)
    for (let j = i + 1; j < segs.length; j++) {
      const A = segs[i],
        B = segs[j];
      if (A.wireId === B.wireId && A.outline) continue;
      if (collinearOverlap([A.a, A.b], [B.a, B.b]) > EPS)
        add(
          "error",
          "OVERLAPPING_WIRES",
          `wires ${A.wireId} and ${B.wireId} overlap`,
          A.a,
        );
    }

  // ── Connectivity degree at a point ──────────────────────────────────
  const pinOwners: { pin: Pt; s: SymbolGeometry }[] = symbols.flatMap((s) =>
    s.pins.map((pin) => ({ pin, s })),
  );
  const pinTol = (s: SymbolGeometry) =>
    s.type === "probe" ? PROBE_RADIUS : EPS;

  function degreeAt(p: Pt): {
    degree: number;
    wireDegree: number;
    outline: boolean;
  } {
    let wireDegree = 0,
      outline = false;
    for (const sg of segs) {
      const on = onSegment(p, sg.a, sg.b);
      if (!on) continue;
      if (sg.outline) {
        outline = true;
        continue;
      }
      wireDegree += on === "interior" ? 2 : 1;
    }
    let degree = wireDegree;
    for (const { pin, s } of pinOwners)
      if (near(p, pin, pinTol(s))) degree += 1;
    return { degree, wireDegree, outline };
  }

  // Dangling wire ends.
  for (const w of wires) {
    if (outlineIds.has(w.id) || w.points.length < 2) continue;
    for (const end of [w.points[0], w.points[w.points.length - 1]]) {
      const onPin = pinOwners.some(({ pin, s }) => near(end, pin, pinTol(s)));
      const onWire = segs.some(
        (sg) => sg.wireId !== w.id && onSegment(end, sg.a, sg.b) !== null,
      );
      const onJunction = junctions.some((j) => near(end, j));
      const atLabel = labels.some((l) => boxDistance(end, l.box) <= 8);
      const nearPin = pinOwners.find(({ pin }) => dist(end, pin) <= 12);
      if (!onPin && !onWire && !onJunction && !atLabel)
        add(
          "error",
          "DANGLING_WIRE",
          `wire ${w.id} ends at ${fmt(end)} without touching anything` +
            (nearPin
              ? ` (nearest pin of ${nearPin.s.id} at ${fmt(nearPin.pin)})`
              : ""),
          end,
        );
    }
  }

  // Junction dots: needed where 3+ conductors meet, pointless elsewhere.
  const candidates: Pt[] = [];
  const pushCandidate = (p: Pt) => {
    if (!candidates.some((c) => near(c, p, 0.5))) candidates.push(p);
  };
  for (const sg of segs)
    if (!sg.outline) (pushCandidate(sg.a), pushCandidate(sg.b));
  for (const { pin } of pinOwners) pushCandidate(pin);

  for (const p of candidates) {
    const { degree, outline } = degreeAt(p);
    const hasJunction = junctions.some((j) => near(j, p));
    if (degree >= 3 && !hasJunction && !outline)
      add(
        "error",
        "MISSING_JUNCTION",
        `${degree} conductors meet at ${fmt(p)} without a junction dot`,
        p,
      );
  }
  for (const j of junctions) {
    const { degree, outline } = degreeAt(j);
    if (degree === 0 && !outline)
      add(
        "error",
        "FLOATING_JUNCTION",
        `junction at ${fmt(j)} is not on any wire`,
        j,
      );
    // A dot on a lone wire end is a terminal (e.g. an OUTPUT node) — fine.
    else if (degree === 2 && !outline)
      add(
        "warn",
        "UNNEEDED_JUNCTION",
        `junction at ${fmt(j)} joins only ${degree} conductor(s)`,
        j,
      );
  }

  // Pins nothing is connected to.
  for (const { pin, s } of pinOwners) {
    const { wireDegree, outline } = degreeAt(pin);
    const touchesPin = pinOwners.some(
      (o) => o.s !== s && near(o.pin, pin, pinTol(o.s)),
    );
    const wireEndsAtPin = wires.some((w) =>
      [w.points[0], w.points[w.points.length - 1]].some(
        (end) => end && near(end, pin, pinTol(s)),
      ),
    );
    if (wireDegree === 0 && !wireEndsAtPin && !outline && !touchesPin)
      add(
        "warn",
        "UNCONNECTED_PIN",
        `pin ${fmt(pin)} of ${s.id} is not connected`,
        pin,
      );
  }

  // Wire crossings without a dot (legal, but worth seeing in a review).
  for (let i = 0; i < segs.length; i++)
    for (let j = i + 1; j < segs.length; j++) {
      const A = segs[i],
        B = segs[j];
      if (A.wireId === B.wireId || A.outline || B.outline) continue;
      const x = segmentsCross([A.a, A.b], [B.a, B.b]);
      if (x && !junctions.some((jn) => near(jn, x)))
        add(
          "info",
          "WIRE_CROSSING",
          `wires ${A.wireId} and ${B.wireId} cross at ${fmt(x)}`,
          x,
        );
    }

  // ── Overlapping symbols ─────────────────────────────────────────────
  for (let i = 0; i < symbols.length; i++)
    for (let j = i + 1; j < symbols.length; j++)
      if (boxesOverlap(shrink(symbols[i].body, 1), shrink(symbols[j].body, 1)))
        add(
          "error",
          "SYMBOL_OVERLAP",
          `${symbols[i].id} overlaps ${symbols[j].id}`,
        );

  // ── Text collisions ─────────────────────────────────────────────────
  type TextItem = { owner: string; text: string; box: Box };
  const texts: TextItem[] = [
    ...symbols.flatMap((s) =>
      s.texts.map((box, i) => ({ owner: s.id, text: s.textStrings[i], box })),
    ),
    ...labels.map((l) => ({ owner: l.id, text: l.text, box: l.box })),
  ];
  for (const t of texts) {
    const b = shrink(t.box, 0.5);
    for (const s of symbols)
      if (boxesOverlap(b, s.body))
        add(
          "warn",
          "TEXT_OVER_SYMBOL",
          `text "${t.text}" (${t.owner}) overlaps the body of ${s.id}`,
        );
    const hitWires = new Set<string>();
    for (const sg of segs)
      if (segmentHitsBox(sg.a, sg.b, b)) hitWires.add(sg.wireId);
    for (const s of symbols)
      if (s.id !== t.owner)
        for (const lead of s.leads)
          if (segmentHitsBox(lead[0], lead[1], b)) hitWires.add(`${s.id} lead`);
    for (const id of hitWires)
      add(
        "warn",
        "TEXT_OVER_WIRE",
        `text "${t.text}" (${t.owner}) is crossed by ${id}`,
      );
  }
  for (let i = 0; i < texts.length; i++)
    for (let j = i + 1; j < texts.length; j++)
      if (boxesOverlap(shrink(texts[i].box, 0.5), shrink(texts[j].box, 0.5)))
        add(
          "warn",
          "TEXT_OVERLAP",
          `text "${texts[i].text}" (${texts[i].owner}) overlaps "${texts[j].text}" (${texts[j].owner})`,
        );

  return issues;
}

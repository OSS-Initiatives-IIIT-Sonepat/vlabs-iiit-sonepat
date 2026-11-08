import type {
  Pt,
  SchematicData,
  SchematicElement,
} from "@/labs/CircuitSchematic";
import {
  PACKET_COLORS,
  TESTER_MAP,
  WIRE,
  WIRING,
  type NetBench,
  type NetDevice,
  type NetDeviceKind,
  type NetFrame,
  type WiringStandard,
} from "@/labs/networks/bench";

/*
 * 2D figures for the network labs, drawn in the corner card beside the
 * room. A topology figure is drawn from the same bench and step as the 3D
 * room, so the two always agree.
 */

const NETWORK_KINDS = new Set<NetDeviceKind>([
  "pc",
  "laptop",
  "server",
  "switch",
  "hub",
  "router",
  "ap",
  "printer",
  "cloud",
  "terminator",
  "tap",
]);

const FILL: Partial<Record<NetDeviceKind, string>> = {
  switch: "#dbe5ff",
  hub: "#fdecc0",
  router: "#d3f0e0",
  ap: "#e4daf7",
  cloud: "#f4f4f5",
};

const BW = 66;
const BH = 22;

type Placed = { dev: NetDevice; x: number; y: number; w: number; h: number };

function sizeIn2d(dev: NetDevice): { w: number; h: number } {
  if (dev.kind === "tap") return { w: 10, h: 10 };
  if (dev.kind === "terminator") return { w: 8, h: 16 };
  if (dev.kind === "cloud") return { w: 78, h: 26 };
  // Wide enough for the name at 11 px.
  return {
    w: Math.max(BW, Math.round((dev.name ?? "").length * 6.4 + 14)),
    h: BH,
  };
}

/** Leaves box `b` from its centre toward `to`, on an edge. */
function edgePoint(b: Placed, to: Pt, horizontal: boolean): Pt {
  if (horizontal) {
    const s = to.x >= b.x ? 1 : -1;
    return { x: b.x + s * (b.w / 2), y: b.y };
  }
  const s = to.y >= b.y ? 1 : -1;
  return { x: b.x, y: b.y + s * (b.h / 2) };
}

/** The middle of the longest segment, and whether that segment is upright. */
function midOf(points: Pt[]): Pt & { upright: boolean } {
  let best = { a: points[0], b: points[1], len: -1 };
  for (let i = 0; i + 1 < points.length; i++) {
    const len = Math.hypot(
      points[i + 1].x - points[i].x,
      points[i + 1].y - points[i].y,
    );
    if (len > best.len) best = { a: points[i], b: points[i + 1], len };
  }
  return {
    x: (best.a.x + best.b.x) / 2,
    y: (best.a.y + best.b.y) / 2,
    upright: Math.abs(best.a.x - best.b.x) < 1,
  };
}

const CABLE_NAME: Partial<Record<string, string>> = {
  cross: "crossover",
  console: "console",
  serial: "serial",
};

/**
 * The room as a network diagram: a box per device, a line per cable, and
 * arrows for the traffic of the step. `title` is printed at the top left.
 */
export function netFigure(
  bench: NetBench,
  frame: NetFrame = {},
  title?: string,
  /** Lay out only the devices the step shows, as for one room of several. */
  fit = false,
): SchematicData {
  const all = bench.devices.filter(
    (d) =>
      NETWORK_KINDS.has(d.kind) &&
      (!fit || !frame.show || frame.show.includes(d.id)),
  );
  const xs = all.map((d) => d.x);
  const zs = all.map((d) => d.z);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minZ = Math.min(...zs);
  const maxZ = Math.max(...zs);
  const MX = 56;
  const MTOP = title ? 44 : 30;
  const MBOT = 34;
  const spanX = Math.max(1, maxX - minX);
  const spanZ = Math.max(1, maxZ - minZ);
  // Fit 430 × 270, but spread a crowded room so no two boxes or
  // addresses touch. The corner card can be expanded to read it.
  let minDx = Infinity;
  let minDz = Infinity;
  for (const p of all)
    for (const q of all) {
      if (p === q) continue;
      const dx = Math.abs(p.x - q.x);
      const dz = Math.abs(p.z - q.z);
      if (dz < 1 && dx > 0.01) minDx = Math.min(minDx, dx);
      if (dx < 1.5 && dz > 0.01) minDz = Math.min(minDz, dz);
    }
  const scale = Math.min(
    Math.max(
      Math.min((430 - 2 * MX) / spanX, (270 - MTOP - MBOT) / spanZ),
      84 / minDx,
      58 / minDz,
    ),
    (840 - 2 * MX) / spanX,
    (540 - MTOP - MBOT) / spanZ,
  );
  const width = Math.max(340, Math.round(spanX * scale + 2 * MX));
  const height = Math.max(190, Math.round(spanZ * scale + MTOP + MBOT));
  const ox = (width - spanX * scale) / 2;
  const oy = MTOP + (height - MTOP - MBOT - spanZ * scale) / 2;

  const show = frame.show ? new Set(frame.show) : null;
  const hot = new Set(frame.hot ?? []);
  const placed = new Map<string, Placed>();
  for (const dev of all) {
    const { w, h } = sizeIn2d(dev);
    placed.set(dev.id, {
      dev,
      x: Math.round(ox + (dev.x - minX) * scale),
      y: Math.round(oy + (dev.z - minZ) * scale),
      w,
      h,
    });
  }
  const visible = (id: string) => placed.has(id) && (!show || show.has(id));

  const els: SchematicElement[] = [];
  if (title)
    els.push({ type: "label", id: "title", x: width / 2, y: 18, text: title });

  // Each cable leaves the upper box from its bottom edge and enters the
  // lower box from its top, at its own port, so cables never share a line.
  const shownLinks = bench.links.filter(
    (l) => visible(l.a) && visible(l.b) && (!show || show.has(l.id)),
  );
  const ports = new Map<string, number>();
  const sameRow = (a: Placed, b: Placed) => Math.abs(a.y - b.y) < 2;
  for (const pl of placed.values()) {
    for (const side of [1, -1]) {
      const here = shownLinks
        .map((l) => {
          const other = placed.get(l.a === pl.dev.id ? l.b : l.a)!;
          if (l.a !== pl.dev.id && l.b !== pl.dev.id) return null;
          if (sameRow(pl, other) || Math.sign(other.y - pl.y) !== side)
            return null;
          return { id: l.id, x: other.x };
        })
        .filter((v): v is { id: string; x: number } => v !== null)
        .sort((p, q) => p.x - q.x);
      const span = Math.min(pl.w * 0.76, (here.length - 1) * 24);
      here.forEach((h, i) => {
        const off =
          here.length > 1 ? -span / 2 + (span * i) / (here.length - 1) : 0;
        ports.set(`${h.id}@${pl.dev.id}`, off);
      });
    }
  }
  const lanes = new Map<string, number>();
  {
    const between = shownLinks
      .map((l) => {
        const a = placed.get(l.a)!;
        const b = placed.get(l.b)!;
        if (sameRow(a, b)) return null;
        const up = a.y < b.y ? a : b;
        const lo = up === a ? b : a;
        const pu = up.x + (ports.get(`${l.id}@${up.dev.id}`) ?? 0);
        const pl = lo.x + (ports.get(`${l.id}@${lo.dev.id}`) ?? 0);
        // Cables between the same two rows share the gap, one lane each.
        return { id: l.id, up: `${up.y}|${lo.y}`, reach: Math.abs(pu - pl) };
      })
      .filter((v): v is { id: string; up: string; reach: number } => !!v);
    const byUpper = new Map<string, typeof between>();
    for (const b of between)
      byUpper.set(b.up, [...(byUpper.get(b.up) ?? []), b]);
    for (const group of byUpper.values()) {
      group
        .sort((p, q) => q.reach - p.reach)
        .forEach((b, i) => lanes.set(b.id, i));
    }
  }

  const toPx = (x: number, z: number): Pt => ({
    x: Math.round(ox + (x - minX) * scale),
    y: Math.round(oy + (z - minZ) * scale),
  });
  /**
   * A cable that follows the corner points it has in the room. Every
   * segment is level or upright, and the cable meets each box square on.
   */
  const viaRoute = (linkId: string, offset: number): Pt[] | null => {
    const link = bench.links.find((l) => l.id === linkId);
    if (!link?.via?.length) return null;
    const a = placed.get(link.a)!;
    const b = placed.get(link.b)!;
    let mid = link.via.map(([x, z]) => toPx(x, z));
    const inX = (box: Placed, x: number) => Math.abs(x - box.x) < box.w / 2 - 2;
    const inY = (box: Placed, y: number) => Math.abs(y - box.y) < box.h / 2 - 2;
    const flatEnd = (box: Placed, x: number, toward: number): Pt => ({
      x,
      y: box.y + Math.sign(toward - box.y || 1) * (box.h / 2),
    });
    const sideEnd = (box: Placed, y: number, toward: number): Pt => ({
      x: box.x + Math.sign(toward - box.x || 1) * (box.w / 2),
      y,
    });
    if (mid.length === 1) {
      // One corner: along one axis out of `a`, then the other into `b`.
      const c = mid[0];
      if (Math.abs(c.y - a.y) <= Math.abs(c.x - a.x)) {
        const x = inX(b, c.x) ? c.x : b.x;
        mid = [{ x, y: a.y }];
      } else {
        const y = inY(b, c.y) ? c.y : b.y;
        mid = [{ x: inX(a, c.x) ? c.x : a.x, y }];
      }
    }
    let start: Pt;
    let startFlat: boolean;
    const firstUp = mid.length > 1 && Math.abs(mid[1].x - mid[0].x) < 1;
    if (mid.length === 1) {
      startFlat = inX(a, mid[0].x) && Math.abs(mid[0].y - a.y) > 1;
      start = startFlat
        ? flatEnd(a, mid[0].x, mid[0].y)
        : sideEnd(a, a.y, mid[0].x);
    } else if (firstUp && inX(a, mid[0].x)) {
      startFlat = true;
      start = flatEnd(a, mid[0].x, mid[1].y);
      mid = mid.slice(1);
      mid[0] = { x: start.x, y: mid[0].y };
    } else if (firstUp) {
      startFlat = false;
      mid[0] = { x: mid[0].x, y: a.y };
      start = sideEnd(a, a.y, mid[0].x);
    } else if (inY(a, mid[0].y)) {
      startFlat = false;
      start = sideEnd(a, mid[0].y, mid[1].x);
      mid = mid.slice(1);
      mid[0] = { x: mid[0].x, y: start.y };
    } else {
      startFlat = true;
      if (!inX(a, mid[0].x)) mid[0] = { x: a.x, y: mid[0].y };
      start = flatEnd(a, mid[0].x, mid[0].y);
    }
    let end: Pt;
    let endFlat: boolean;
    const n = mid.length - 1;
    const lastUp = n > 0 ? Math.abs(mid[n].x - mid[n - 1].x) < 1 : !startFlat;
    if (n === 0) {
      endFlat = startFlat ? false : true;
      end = endFlat
        ? flatEnd(b, mid[0].x, mid[0].y)
        : sideEnd(b, mid[0].y, mid[0].x);
    } else if (lastUp && inX(b, mid[n].x)) {
      endFlat = true;
      end = flatEnd(b, mid[n].x, mid[n - 1].y);
      mid = mid.slice(0, n);
    } else if (lastUp) {
      endFlat = false;
      mid[n] = { x: mid[n].x, y: b.y };
      end = sideEnd(b, b.y, mid[n].x);
    } else if (inY(b, mid[n].y)) {
      endFlat = false;
      end = sideEnd(b, mid[n].y, mid[n - 1].x);
      mid = mid.slice(0, n);
    } else {
      endFlat = true;
      if (!inX(b, mid[n].x)) mid[n] = { x: b.x, y: mid[n].y };
      end = flatEnd(b, mid[n].x, mid[n].y);
    }
    const pts = [
      startFlat
        ? { x: start.x + offset, y: start.y }
        : { x: start.x, y: start.y + offset },
      ...mid.map((p) => ({ x: p.x + offset, y: p.y + offset })),
      endFlat
        ? { x: end.x + offset, y: end.y }
        : { x: end.x, y: end.y + offset },
    ];
    return pts.filter(
      (p, i) =>
        i === 0 || Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y) > 0.5,
    );
  };

  const routeLink = (
    linkId: string,
    from: string,
    to: string,
    offset = 0,
  ): Pt[] => {
    const via = viaRoute(linkId, offset);
    if (via) {
      const link = bench.links.find((l) => l.id === linkId)!;
      return link.a === from ? via : [...via].reverse();
    }
    const a = placed.get(from)!;
    const b = placed.get(to)!;
    if (sameRow(a, b)) {
      const y = (a.y + b.y) / 2 + offset;
      return [
        { x: edgePoint(a, b, true).x, y },
        { x: edgePoint(b, a, true).x, y },
      ];
    }
    const up = a.y < b.y ? a : b;
    const lo = up === a ? b : a;
    const xu = up.x + (ports.get(`${linkId}@${up.dev.id}`) ?? 0) + offset;
    const xl = lo.x + (ports.get(`${linkId}@${lo.dev.id}`) ?? 0) + offset;
    const yu = up.y + up.h / 2;
    const yl = lo.y - lo.h / 2;
    let pts: Pt[];
    if (Math.abs(xu - xl) < 1) {
      pts = [
        { x: xu, y: yu },
        { x: xu, y: yl },
      ];
    } else {
      const lane = lanes.get(linkId) ?? 0;
      const mid = Math.min(yl - 6, yu + 12 + lane * 8) + offset * 0.5;
      pts = [
        { x: xu, y: yu },
        { x: xu, y: mid },
        { x: xl, y: mid },
        { x: xl, y: yl },
      ];
    }
    return up === a ? pts : pts.reverse();
  };

  for (const link of shownLinks) {
    const points = routeLink(link.id, link.a, link.b);
    const state = frame.links?.[link.id];
    const down = state === "down";
    if (link.kind === "wifi") {
      els.push({
        type: "arrow",
        id: `link-${link.id}`,
        points,
        dashed: true,
        double: true,
        size: 6,
        highlight: hot.has(link.id),
        color: "#7b93df",
      });
    } else {
      els.push({
        type: "wire",
        id: `link-${link.id}`,
        points,
        highlight: hot.has(link.id),
        color: down ? "#dc2626" : undefined,
      });
    }
    const name = down
      ? "✕ down"
      : link.kind === "console"
        ? (link.label ?? "console")
        : CABLE_NAME[link.kind];
    if (name) {
      const m = midOf(points);
      els.push({
        type: "label",
        id: `link-${link.id}-name`,
        x: m.upright ? m.x + 8 + name.length * 2.6 : m.x,
        y: m.upright ? m.y + 3 : m.y - 13,
        text: name,
        color: down ? "#dc2626" : "#525252",
        size: 9,
      });
    }
  }

  // Traffic: one arrow per hop, beside the cable.
  const drawn = new Set<string>();
  (frame.packets ?? []).forEach((p, pi) => {
    for (let i = 0; i + 1 < p.path.length; i++) {
      const from = p.path[i];
      const to = p.path[i + 1];
      const key = `${from}>${to}`;
      if (drawn.has(key) || !visible(from) || !visible(to)) continue;
      const link = shownLinks.find(
        (l) => (l.a === from && l.b === to) || (l.a === to && l.b === from),
      );
      if (!link) continue;
      drawn.add(key);
      const back = drawn.has(`${to}>${from}`);
      const points = routeLink(link.id, from, to, back ? -5 : 5);
      const color =
        PACKET_COLORS[
          p.drop && i + 2 === p.path.length ? "red" : (p.color ?? "orange")
        ];
      els.push({
        type: "arrow",
        id: `pkt-${pi}-${i}`,
        points,
        size: 7,
        color,
      });
    }
  });

  for (const pl of placed.values()) {
    if (!visible(pl.dev.id)) continue;
    const { dev } = pl;
    if (dev.kind === "tap") {
      els.push({ type: "junction", id: `dev-${dev.id}`, x: pl.x, y: pl.y });
      continue;
    }
    if (dev.kind === "terminator") {
      els.push({
        type: "block",
        id: `dev-${dev.id}`,
        x: pl.x,
        y: pl.y,
        w: pl.w,
        h: pl.h,
        fill: "#3f4a5f",
      });
      continue;
    }
    els.push({
      type: dev.kind === "cloud" ? "terminal" : "block",
      id: `dev-${dev.id}`,
      x: pl.x,
      y: pl.y,
      w: pl.w,
      h: pl.h,
      label: dev.name ?? dev.kind,
      highlight: hot.has(dev.id),
      fill: FILL[dev.kind],
    });
    const addr = (frame.addr?.[dev.id] ?? dev.addresses ?? [])[0];
    if (addr) {
      // Under the box, unless cables leave from there.
      let below = false;
      let above = false;
      for (const l of shownLinks) {
        if (l.a !== dev.id && l.b !== dev.id) continue;
        const other = placed.get(l.a === dev.id ? l.b : l.a)!;
        if (sameRow(pl, other)) continue;
        if (other.y > pl.y) below = true;
        else above = true;
      }
      const side = below && above;
      els.push({
        type: "label",
        id: `addr-${dev.id}`,
        x: side ? pl.x + pl.w / 2 + 6 + addr.length * 2.6 : pl.x,
        y: side ? pl.y + 3 : below ? pl.y - pl.h / 2 - 6 : pl.y + pl.h / 2 + 11,
        text: addr,
        size: 9,
      });
    }
  }

  return { width, height, gallery: true, elements: els };
}

export type SeqMessage = {
  from: number;
  to: number;
  label: string;
  /** Lost on the way: drawn red, stopping short. */
  lost?: boolean;
  color?: string;
};

/**
 * A message sequence: one lifeline per actor, time running down, one arrow
 * per message. `upto` messages are drawn and the last one is highlighted.
 */
export function sequenceFigure(
  actors: readonly string[],
  messages: readonly SeqMessage[],
  upto = messages.length,
  notes: readonly { at: number; side: number; text: string }[] = [],
): SchematicData {
  const width = actors.length > 3 ? 520 : actors.length > 2 ? 480 : 420;
  const gap = (width - 120) / Math.max(1, actors.length - 1);
  const xOf = (i: number) => 60 + i * gap;
  const rowH = 26;
  const top = 46;
  const height = Math.max(220, top + 22 + messages.length * rowH + 16);
  const els: SchematicElement[] = [];
  actors.forEach((name, i) => {
    els.push({
      type: "wire",
      id: `life-${i}`,
      points: [
        { x: xOf(i), y: top + 12 },
        { x: xOf(i), y: height - 10 },
      ],
      color: "#a3a3a3",
    });
    els.push({
      type: "block",
      id: `actor-${i}`,
      x: xOf(i),
      y: top,
      w: Math.min(92, gap - 12),
      h: 24,
      label: name,
      fill: "#dbe5ff",
    });
  });
  messages.slice(0, upto).forEach((m, i) => {
    const y = top + 36 + i * rowH;
    const x1 = xOf(m.from);
    const x2 = xOf(m.to);
    const dir = Math.sign(x2 - x1);
    const end = m.lost ? x1 + (x2 - x1) * 0.6 : x2 - dir * 2;
    const last = i === upto - 1;
    els.push({
      type: "arrow",
      id: `msg-${i}`,
      points: [
        { x: x1 + dir * 2, y },
        { x: end, y },
      ],
      size: 7,
      highlight: last && !m.lost && !m.color,
      color: m.lost ? "#dc2626" : m.color,
    });
    // A message that passes other lifelines is labelled beside its sender.
    const text = m.lost ? `${m.label} ✕` : m.label;
    const long = Math.abs(x2 - x1) > gap * 1.2;
    els.push({
      type: "label",
      id: `msg-${i}-text`,
      x: long
        ? x1 + dir * (text.length * 2.6 + 8)
        : (x1 + (m.lost ? end : x2)) / 2,
      y: y - 6,
      text,
      size: 9,
      color: m.lost ? "#dc2626" : last ? "#2563eb" : undefined,
    });
  });
  for (const [i, n] of notes.entries()) {
    if (n.at >= upto) continue;
    const y = top + 36 + n.at * rowH;
    els.push({
      type: "label",
      id: `note-${i}`,
      x: xOf(n.side) + (n.side === 0 ? 1 : -1) * (8 + n.text.length * 2.4),
      y: y + 12,
      text: n.text,
      size: 8,
      color: "#737373",
    });
  }
  return { width, height, gallery: true, elements: els };
}

/**
 * Both ends of a cable, pin 1 to pin 8, and which pin each wire lands on.
 * `upto` wires are drawn, so a step can lay them one by one.
 */
export function pinoutFigure(
  a: WiringStandard,
  b: WiringStandard | null,
  upto = 8,
): SchematicData {
  const width = b ? 440 : 300;
  const height = 300;
  const els: SchematicElement[] = [];
  const top = 66;
  const row = 26;
  const ax = b ? 100 : 150;
  const bx = 340;
  const pinW = 100;
  els.push({
    type: "label",
    id: "a-title",
    x: ax,
    y: 24,
    text: `End A · ${a}`,
  });
  if (b) {
    els.push({
      type: "label",
      id: "b-title",
      x: bx,
      y: 24,
      text: `End B · ${b}`,
    });
    const cross = a !== b;
    els.push({
      type: "label",
      id: "kind",
      x: width / 2,
      y: 44,
      text: cross ? "Crossover: 1↔3, 2↔6" : "Straight-through: pin n to pin n",
      size: 9,
      color: "#525252",
    });
  }
  const map = b ? TESTER_MAP[a === b ? "straight" : "cross"] : null;
  for (let i = 0; i < 8; i++) {
    const code = WIRING[a][i];
    const y = top + i * row;
    els.push({
      type: "block",
      id: `a-${i}`,
      x: ax,
      y,
      w: pinW,
      h: 18,
      label: `${i + 1}  ${WIRE[code].name}`,
      fill: WIRE[code].stripe ? "#ffffff" : WIRE[code].base,
      ink: WIRE[code].stripe ? WIRE[code].stripe : "#ffffff",
      highlight: i === upto - 1,
    });
    if (!b || !map) continue;
    const j = map[i] - 1;
    const codeB = WIRING[b][j];
    const yb = top + j * row;
    els.push({
      type: "block",
      id: `b-${j}`,
      x: bx,
      y: yb,
      w: pinW,
      h: 18,
      label: `${j + 1}  ${WIRE[codeB].name}`,
      fill: WIRE[codeB].stripe ? "#ffffff" : WIRE[codeB].base,
      ink: WIRE[codeB].stripe ? WIRE[codeB].stripe : "#ffffff",
    });
    if (i >= upto) continue;
    const x1 = ax + pinW / 2;
    const x2 = bx - pinW / 2;
    const colour = WIRE[code].stripe ?? WIRE[code].base;
    if (i === j) {
      els.push({
        type: "wire",
        id: `w-${i}`,
        points: [
          { x: x1, y },
          { x: x2, y },
        ],
        color: colour,
      });
    } else {
      // Each crossing wire keeps to its own lane above or below the pin
      // centre, so the two wires of a swapped pair never share a line.
      const mx = x1 + 20 + i * 9;
      const d = i < j ? -4 : 4;
      els.push({
        type: "wire",
        id: `w-${i}`,
        points: [
          { x: x1, y: y + d },
          { x: mx, y: y + d },
          { x: mx, y: yb + d },
          { x: x2, y: yb + d },
        ],
        color: colour,
      });
    }
  }
  return { width, height, gallery: true, elements: els };
}

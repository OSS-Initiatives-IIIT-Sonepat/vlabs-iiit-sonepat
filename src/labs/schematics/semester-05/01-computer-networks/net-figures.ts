import type {
  Pt,
  PtIcon,
  PtLight,
  PtRow,
  PtWindow,
  SchematicData,
  SchematicElement,
} from "@/labs/CircuitSchematic";
import {
  PACKET_COLORS,
  TESTER_MAP,
  WIRE,
  WIRING,
  type LinkState,
  type NetBench,
  type NetDevice,
  type NetDeviceKind,
  type NetFrame,
  type WiringStandard,
} from "@/labs/networks/bench";
import {
  PT_ICON_SIZE,
  ptLinkPoints,
  ptWindowHeight,
  type Box,
} from "@/labs/schematics/geometry";

/*
 * 2D figures for the network labs, drawn in the corner card beside the
 * room. A topology figure is the Logical workspace of Cisco Packet Tracer:
 * device icons with their model and name, cables drawn straight in the
 * colour and dash of their kind, link lights at both ends, and PDU
 * envelopes running along the cables in simulation mode. It is drawn from
 * the same bench and step as the 3D room, so the two always agree.
 */

const PT_KIND: Partial<Record<NetDeviceKind, PtIcon>> = {
  pc: "pc",
  laptop: "laptop",
  server: "server",
  switch: "switch",
  hub: "hub",
  router: "router",
  ap: "ap",
  printer: "printer",
  cloud: "cloud",
  terminator: "terminator",
  tap: "tap",
};

/** The model Packet Tracer prints above a device's name. */
const PT_MODEL: Partial<Record<NetDeviceKind, string>> = {
  pc: "PC-PT",
  laptop: "Laptop-PT",
  server: "Server-PT",
  switch: "2960-24TT",
  hub: "Hub-PT",
  router: "2911",
  ap: "AccessPoint-PT",
  printer: "Printer-PT",
  cloud: "Cloud-PT",
};

/** The drawing colour of an area, one per room. */
const AREA_COLORS = ["#2563eb", "#16a34a", "#d97706", "#9333ea", "#0891b2"];

const FS = 9;
const PITCH = 11;
/** Height of the tab bar, in figure units, below the top of the canvas. */
const BAR = 14;
/** Seconds an envelope takes to cross one cable. */
const HOP = 0.8;

const INK = "#1f2937";
const SOFT = "#4b5563";

type Line = { text: string; color?: string; weight?: number };
type Anchor = "start" | "middle" | "end";
type Placed = { key: string; lines: Line[]; box: Box; anchor: Anchor };

const textWidth = (t: string, size = FS) => [...t].length * size * 0.56;

function grow(b: Box, d: number): Box {
  return { x0: b.x0 - d, y0: b.y0 - d, x1: b.x1 + d, y1: b.y1 + d };
}

function overlaps(a: Box, b: Box): boolean {
  return a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
}

/** Does segment ab pass through box `b`? */
function hits(a: Pt, b: Pt, bx: Box): boolean {
  let t0 = 0;
  let t1 = 1;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const checks: [number, number][] = [
    [-dx, a.x - bx.x0],
    [dx, bx.x1 - a.x],
    [-dy, a.y - bx.y0],
    [dy, bx.y1 - a.y],
  ];
  for (const [p, q] of checks) {
    if (p === 0) {
      if (q < 0) return false;
    } else {
      const r = q / p;
      if (p < 0) t0 = Math.max(t0, r);
      else t1 = Math.min(t1, r);
      if (t0 > t1) return false;
    }
  }
  return true;
}

/** The size of a block of lines, as the linter measures text. */
function blockSize(lines: Line[]): { w: number; h: number } {
  return {
    w: Math.max(...lines.map((l) => textWidth(l.text))),
    h: (lines.length - 1) * PITCH + FS * 0.95,
  };
}

/**
 * Places blocks of text one at a time where they cross no cable, icon or
 * text placed before them. Each block tries its spots in order and takes
 * the first clear one, or the least crowded.
 */
class TextPlacer {
  readonly placed: Placed[] = [];
  constructor(
    private readonly icons: Box[],
    private readonly segs: [Pt, Pt][],
  ) {}

  private score(b: Box): number {
    const pad = grow(b, 2);
    let n = 0;
    for (const s of this.segs) if (hits(s[0], s[1], pad)) n += 3;
    for (const i of this.icons) if (overlaps(pad, i)) n += 4;
    for (const t of this.placed) if (overlaps(pad, t.box)) n += 5;
    return n;
  }

  /** Each spot is a box for the block and the side its text hangs from. */
  place(
    key: string,
    lines: Line[],
    spots: { box: Box; anchor: Anchor }[],
  ): Placed {
    let best = spots[0];
    let bestScore = Infinity;
    for (const s of spots) {
      const sc = this.score(s.box);
      if (sc < bestScore) {
        best = s;
        bestScore = sc;
        if (sc === 0) break;
      }
    }
    const p = { key, lines, box: best.box, anchor: best.anchor };
    this.placed.push(p);
    return p;
  }
}

/** Spots around `icon` for a block of size w × h, nearest first. */
function spotsAround(
  icon: Box,
  w: number,
  h: number,
  order: readonly (
    | "below"
    | "right"
    | "left"
    | "above"
    | "rightUp"
    | "rightDown"
    | "leftUp"
    | "leftDown"
  )[],
): { box: Box; anchor: Anchor }[] {
  const cx = (icon.x0 + icon.x1) / 2;
  const cy = (icon.y0 + icon.y1) / 2;
  const g = 5;
  const at = {
    below: {
      box: {
        x0: cx - w / 2,
        y0: icon.y1 + 3,
        x1: cx + w / 2,
        y1: icon.y1 + 3 + h,
      },
      anchor: "middle" as Anchor,
    },
    above: {
      box: {
        x0: cx - w / 2,
        y0: icon.y0 - 3 - h,
        x1: cx + w / 2,
        y1: icon.y0 - 3,
      },
      anchor: "middle" as Anchor,
    },
    right: {
      box: {
        x0: icon.x1 + g,
        y0: cy - h / 2,
        x1: icon.x1 + g + w,
        y1: cy + h / 2,
      },
      anchor: "start" as Anchor,
    },
    left: {
      box: {
        x0: icon.x0 - g - w,
        y0: cy - h / 2,
        x1: icon.x0 - g,
        y1: cy + h / 2,
      },
      anchor: "end" as Anchor,
    },
    rightUp: {
      box: {
        x0: icon.x1 + g,
        y0: icon.y0 - h + 2,
        x1: icon.x1 + g + w,
        y1: icon.y0 + 2,
      },
      anchor: "start" as Anchor,
    },
    rightDown: {
      box: {
        x0: icon.x1 + g,
        y0: icon.y1 - 2,
        x1: icon.x1 + g + w,
        y1: icon.y1 - 2 + h,
      },
      anchor: "start" as Anchor,
    },
    leftUp: {
      box: {
        x0: icon.x0 - g - w,
        y0: icon.y0 - h + 2,
        x1: icon.x0 - g,
        y1: icon.y0 + 2,
      },
      anchor: "end" as Anchor,
    },
    leftDown: {
      box: {
        x0: icon.x0 - g - w,
        y0: icon.y1 - 2,
        x1: icon.x0 - g,
        y1: icon.y1 - 2 + h,
      },
      anchor: "end" as Anchor,
    },
  };
  return order.map((k) => at[k]);
}

const LIGHT: Record<LinkState, PtLight> = {
  up: "up",
  down: "down",
  amber: "amber",
  off: "none",
};

/** Ends that carry no port, and so no link light. */
const PORTLESS = new Set<NetDeviceKind>(["tap", "terminator"]);

/**
 * The room as a Packet Tracer logical workspace. Devices keep the places
 * they have in the room; `title` is printed as a note at the top left.
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
      PT_KIND[d.kind] && (!fit || !frame.show || frame.show.includes(d.id)),
  );
  const show = frame.show ? new Set(frame.show) : null;
  const hot = new Set(frame.hot ?? []);
  const visible = (id: string) =>
    all.some((d) => d.id === id) && (!show || show.has(id));

  // ── Scale: fit a card, but spread a crowded room so nothing touches ──
  const xs = all.map((d) => d.x);
  const zs = all.map((d) => d.z);
  const minX = Math.min(...xs);
  const minZ = Math.min(...zs);
  const spanX = Math.max(1, Math.max(...xs) - minX);
  const spanZ = Math.max(1, Math.max(...zs) - minZ);
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
    Math.max(Math.min(300 / spanX, 170 / spanZ), 88 / minDx, 70 / minDz),
    720 / spanX,
    460 / spanZ,
  );
  // Empty floor between rooms closes up: no gap between two columns (or
  // rows) of devices is wider than a cable needs.
  const squeeze = (values: number[], most: number) => {
    const sorted = [...new Set(values)].sort((p, q) => p - q);
    const to = new Map<number, number>();
    let at = 0;
    sorted.forEach((v, i) => {
      if (i) at += Math.min(v - sorted[i - 1], most);
      to.set(v, at);
    });
    return (v: number) => to.get(v)!;
  };
  const sx = squeeze(
    all.map((d) => (d.x - minX) * scale),
    130,
  );
  const sy = squeeze(
    all.map((d) => (d.z - minZ) * scale),
    120,
  );
  const at = (d: NetDevice): Pt => ({
    x: Math.round(sx((d.x - minX) * scale)),
    y: Math.round(sy((d.z - minZ) * scale)),
  });

  const devices = all.filter((d) => visible(d.id));
  const centre = new Map(devices.map((d) => [d.id, at(d)]));
  const kindOf = new Map(devices.map((d) => [d.id, d.kind]));
  /** The icon, and the dashed selection box round it when it is hot. */
  const iconBox = (id: string): Box => {
    const c = centre.get(id)!;
    const [hw, hh] = PT_ICON_SIZE[PT_KIND[kindOf.get(id)!]!];
    const box = { x0: c.x - hw, y0: c.y - hh, x1: c.x + hw, y1: c.y + hh };
    return hot.has(id) ? grow(box, 6) : box;
  };
  /** Where a straight cable from `id` toward `to` leaves the icon. */
  const port = (id: string, to: Pt): Pt => {
    const c = centre.get(id)!;
    const [hw, hh] = PT_ICON_SIZE[PT_KIND[kindOf.get(id)!]!];
    const dx = to.x - c.x;
    const dy = to.y - c.y;
    const len = Math.hypot(dx, dy) || 1;
    const t = Math.min(
      dx ? hw / Math.abs(dx) : Infinity,
      dy ? hh / Math.abs(dy) : Infinity,
    );
    const gap = PORTLESS.has(kindOf.get(id)!) ? 0.5 : 2;
    return {
      x: +(c.x + dx * t + (dx / len) * gap).toFixed(1),
      y: +(c.y + dy * t + (dy / len) * gap).toFixed(1),
    };
  };

  const els: SchematicElement[] = [];
  const front: SchematicElement[] = [];

  // ── Cables ──────────────────────────────────────────────────────────
  const links = bench.links.filter(
    (l) => visible(l.a) && visible(l.b) && (!show || show.has(l.id)),
  );
  const segs: [Pt, Pt][] = [];
  const cableAt = new Map<string, [Pt, Pt]>();
  for (const link of links) {
    const a = port(link.a, centre.get(link.b)!);
    const b = port(link.b, centre.get(link.a)!);
    cableAt.set(link.id, [a, b]);
    const pts = ptLinkPoints(a, b, link.kind);
    for (let i = 0; i + 1 < pts.length; i++) segs.push([pts[i], pts[i + 1]]);
    const state = LIGHT[frame.links?.[link.id] ?? "up"];
    const light = (id: string): PtLight =>
      link.kind === "wifi" || PORTLESS.has(kindOf.get(id)!) ? "none" : state;
    els.push({
      type: "pt-link",
      id: `link-${link.id}`,
      a,
      b,
      cable: link.kind,
      lights: [light(link.a), light(link.b)],
      highlight: hot.has(link.id),
    });
  }

  // ── Devices ─────────────────────────────────────────────────────────
  const icons = devices.map((d) => iconBox(d.id));
  const placer = new TextPlacer(icons, segs);
  for (const d of devices) {
    const c = centre.get(d.id)!;
    els.push({
      type: "pt-device",
      id: `dev-${d.id}`,
      x: c.x,
      y: c.y,
      kind: PT_KIND[d.kind]!,
      highlight: hot.has(d.id),
    });
  }

  // Envelopes run along their cables; keep the text off their way.
  const packets = (frame.packets ?? [])
    .map((p) => ({ ...p, path: p.path.filter((id) => centre.has(id)) }))
    .filter((p) => p.path.length > 1);
  let clock = 0;
  const runs = packets.map((p) => {
    const begin = p.at ?? clock;
    const end = begin + HOP * (p.path.length - 1);
    clock = end + 0.15;
    return { p, begin, end };
  });
  const cycle = Math.max(1, ...runs.map((r) => r.end)) + 0.9;
  runs.forEach(({ p, begin, end }, i) => {
    front.push({
      type: "pt-pdu",
      id: `pdu-${i}`,
      path: p.path.map((id) => centre.get(id)!),
      color: PACKET_COLORS[p.color ?? "orange"],
      begin,
      end,
      cycle,
      drop: p.drop,
    });
  });

  // Name and model under each device, unless a cable leaves from there.
  const nameOf = new Map<string, Placed>();
  for (const d of devices) {
    if (PORTLESS.has(d.kind)) continue;
    const lines: Line[] = [];
    const model = d.model ?? PT_MODEL[d.kind];
    if (model) lines.push({ text: model, color: SOFT });
    if (d.name) lines.push({ text: d.name, color: INK, weight: 600 });
    const tag = frame.tags?.[d.id];
    if (tag)
      lines.push({
        text: tag,
        weight: 700,
        color: tag.startsWith("✕")
          ? "#dc2626"
          : tag.startsWith("✓")
            ? "#16a34a"
            : "#b45309",
      });
    if (!lines.length) continue;
    const { w, h } = blockSize(lines);
    nameOf.set(
      d.id,
      placer.place(
        `name-${d.id}`,
        lines,
        spotsAround(iconBox(d.id), w, h, ["below", "right", "left", "above"]),
      ),
    );
  }

  // Addresses beside the device, the way they are typed on the workspace.
  const addrOf = new Map<string, Placed>();
  for (const d of devices) {
    const addr = (frame.addr?.[d.id] ?? d.addresses ?? []).slice(0, 3);
    if (!addr.length) continue;
    const lines = addr.map((text) => ({ text, color: INK }));
    const { w, h } = blockSize(lines);
    const icon = iconBox(d.id);
    const name = nameOf.get(d.id);
    const spots = spotsAround(icon, w, h, [
      "right",
      "left",
      "rightUp",
      "leftUp",
      "rightDown",
      "leftDown",
      "above",
    ]);
    if (name) {
      // Under the name, when nothing else fits.
      const cx = (icon.x0 + icon.x1) / 2;
      spots.push({
        box: {
          x0: cx - w / 2,
          y0: name.box.y1 + 2,
          x1: cx + w / 2,
          y1: name.box.y1 + 2 + h,
        },
        anchor: "middle",
      });
    }
    addrOf.set(d.id, placer.place(`addr-${d.id}`, lines, spots));
  }

  // Port names and console cables, by the middle of the cable.
  for (const link of links) {
    const text =
      link.kind === "console" ? (link.label ?? "Console") : link.label;
    if (!text) continue;
    const [a, b] = cableAt.get(link.id)!;
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const color = link.kind === "console" ? "#0369a1" : SOFT;
    // A name longer than its cable breaks at its dots.
    const parts = textWidth(text) > len - 16 ? text.split(" · ") : [text];
    const lines = parts.map((t) => ({ text: t, color }));
    const { w, h } = blockSize(lines);
    const nx = -(b.y - a.y) / len;
    const ny = (b.x - a.x) / len;
    const spots: { box: Box; anchor: Anchor }[] = [];
    for (const far of [1, 2.4])
      for (const t of [0.5, 0.36, 0.64, 0.26, 0.74])
        for (const side of [1, -1]) {
          const off =
            (Math.abs(nx) * (w / 2 + 4) + Math.abs(ny) * (h / 2 + 4)) * far;
          const cx = a.x + (b.x - a.x) * t + nx * side * off;
          const cy = a.y + (b.y - a.y) * t + ny * side * off;
          spots.push({
            box: {
              x0: cx - w / 2,
              y0: cy - h / 2,
              x1: cx + w / 2,
              y1: cy + h / 2,
            },
            anchor: "middle",
          });
        }
    placer.place(`port-${link.id}`, lines, spots);
  }

  // ── Areas: one drawn rectangle per room, when the bench has rooms ──
  const zones = bench.zones ?? [];
  const areas: {
    box: Box;
    label: string;
    color: string;
    top: boolean;
    right: boolean;
  }[] = [];
  if (zones.length > 1) {
    const within = (d: NetDevice, z: (typeof zones)[number]) =>
      Math.abs(d.x - z.x) <= z.w / 2 && Math.abs(d.z - z.z) <= z.d / 2;
    zones.forEach((z, zi) => {
      // A device on the line between two rooms, such as the router that
      // joins them, belongs to neither.
      const inside = devices.filter(
        (d) => within(d, z) && zones.filter((o) => within(d, o)).length === 1,
      );
      // A room of one device is just that device.
      if (inside.length < 2) return;
      const boxes = inside.flatMap((d) => [
        iconBox(d.id),
        ...[nameOf.get(d.id), addrOf.get(d.id)]
          .filter((p): p is Placed => !!p)
          .map((p) => p.box),
      ]);
      const box = {
        x0: Math.min(...boxes.map((b) => b.x0)) - 8,
        y0: Math.min(...boxes.map((b) => b.y0)) - 20,
        x1: Math.max(...boxes.map((b) => b.x1)) + 8,
        y1: Math.max(...boxes.map((b) => b.y1)) + 8,
      };
      const label = z.label;
      box.x1 = Math.max(box.x1, box.x0 + textWidth(label) + 14);
      // Rooms never overlap: one that would is left undrawn.
      if (areas.some((a) => overlaps(grow(a.box, 4), box))) return;
      areas.push({
        box,
        label,
        color: AREA_COLORS[zi % AREA_COLORS.length],
        top: true,
        right: false,
      });
    });
  }

  // A room's name goes in a corner of it that no other text is in. A name
  // at the bottom gets a line of its own.
  const nameBox = (a: (typeof areas)[number]): Box => {
    const w = textWidth(a.label);
    const x0 = a.right ? a.box.x1 - 6 - w : a.box.x0 + 6;
    const y0 = a.top ? a.box.y0 + 5 : a.box.y1 - 12;
    return { x0, y0, x1: x0 + w, y1: y0 + 9 };
  };
  for (const a of areas) {
    const clash = () =>
      placer.placed.some((p) => overlaps(grow(nameBox(a), 1), p.box)) ||
      icons.some((i) => overlaps(nameBox(a), i));
    if (!clash()) continue;
    a.right = true;
    if (!clash()) continue;
    a.top = false;
    a.right = false;
    a.box.y1 += 14;
    if (!clash()) continue;
    a.right = true;
  }

  // ── Fit the canvas round everything, below the tab bar ─────────────
  const boxes: Box[] = [
    ...icons.map((b) => grow(b, 6)),
    ...placer.placed.map((p) => p.box),
    ...areas.map((a) => a.box),
  ];
  for (const r of runs)
    for (const id of r.p.path) {
      const c = centre.get(id)!;
      boxes.push({ x0: c.x - 8, y0: c.y - 6, x1: c.x + 8, y1: c.y + 6 });
    }
  const bx0 = Math.min(...boxes.map((b) => b.x0));
  const by0 = Math.min(...boxes.map((b) => b.y0));
  const bx1 = Math.max(...boxes.map((b) => b.x1));
  const by1 = Math.max(...boxes.map((b) => b.y1));
  const note = !areas.length && zones.length === 1 ? zones[0].label : null;
  const head = [title, note].filter(Boolean) as string[];
  const top = BAR + 10 + head.length * 14;
  const contentW = bx1 - bx0;
  const width = Math.max(
    360,
    Math.ceil(contentW + 24),
    ...head.map((t) => Math.ceil(textWidth(t, 10) + 24)),
  );
  const height = Math.ceil(top + (by1 - by0) + 12);
  const dx = Math.round((width - contentW) / 2 - bx0);
  const dy = Math.round(top - by0);
  const move = (p: Pt): Pt => ({ x: p.x + dx, y: p.y + dy });
  const moveBox = (b: Box): Box => ({
    x0: b.x0 + dx,
    y0: b.y0 + dy,
    x1: b.x1 + dx,
    y1: b.y1 + dy,
  });

  const out: SchematicElement[] = [
    {
      type: "pt-bar",
      id: "pt-bar",
      w: width,
      mode: runs.length ? "simulation" : "realtime",
    },
  ];
  head.forEach((text, i) =>
    out.push({
      type: "label",
      id: i === 0 && title ? "title" : "note",
      x: 2,
      y: BAR + 16 + i * 14,
      text,
      anchor: "start",
      size: i === 0 && title ? 10 : 9,
      weight: i === 0 && title ? 700 : 500,
      color: i === 0 && title ? INK : SOFT,
    }),
  );
  areas.forEach((a, i) => {
    const b = moveBox(a.box);
    out.push({
      type: "pt-area",
      id: `area-${i}`,
      x: b.x0,
      y: b.y0,
      w: b.x1 - b.x0,
      h: b.y1 - b.y0,
      color: a.color,
    });
    out.push({
      type: "label",
      id: `area-${i}-name`,
      x: a.right ? b.x1 - 6 : b.x0 + 6,
      y: a.top ? b.y0 + 12 : b.y1 - 5,
      text: a.label,
      anchor: a.right ? "end" : "start",
      color: a.color,
      weight: 600,
    });
  });
  for (const el of [...els, ...front]) {
    if (el.type === "pt-link")
      out.push({ ...el, a: move(el.a), b: move(el.b) });
    else if (el.type === "pt-device") {
      const p = move(el);
      out.push({ ...el, x: p.x, y: p.y });
    } else if (el.type === "pt-pdu")
      out.push({ ...el, path: el.path.map(move) });
  }
  for (const p of placer.placed) {
    const b = moveBox(p.box);
    p.lines.forEach((l, j) => {
      out.push({
        type: "label",
        id: `${p.key}-${j}`,
        x:
          p.anchor === "start"
            ? b.x0
            : p.anchor === "end"
              ? b.x1
              : (b.x0 + b.x1) / 2,
        y: b.y0 + FS * 0.75 + j * PITCH,
        text: l.text,
        anchor: p.anchor,
        color: l.color,
        weight: l.weight,
      });
    });
  }
  // Envelopes ride above everything else.
  const pdus = out.filter((e) => e.type === "pt-pdu");
  const rest = out.filter((e) => e.type !== "pt-pdu");
  return {
    width,
    height,
    gallery: true,
    plain: true,
    elements: [...rest, ...pdus],
  };
}

export type SeqMessage = {
  from: number;
  to: number;
  label: string;
  /** Lost on the way: drawn red in the event list. */
  lost?: boolean;
  color?: string;
  /** The PDU type Packet Tracer lists, such as "ARP" or "TCP". */
  type?: string;
};

/** Width of a table cell for `text`, with its padding. */
const cellWidth = (text: string) => Math.ceil([...text].length * 5 + 10);

/** Packet Tracer's colour for a PDU of each type. */
const PDU_COLOR: Record<string, string> = {
  ARP: "#8b5cd6",
  ICMP: "#f59e0b",
  TCP: "#3b6fe0",
  UDP: "#0ea5a4",
  FTP: "#e11d48",
  DHCP: "#22a55a",
  RPC: "#3b6fe0",
};

/**
 * The Simulation Panel's event list: one row per PDU, oldest first, as
 * Packet Tracer lists them when stepping through a simulation. `upto`
 * events are listed and the last one is the one being looked at.
 */
export function sequenceFigure(
  actors: readonly string[],
  messages: readonly SeqMessage[],
  upto = messages.length,
  notes: readonly { at: number; side: number; text: string }[] = [],
  /** The type of every message that does not name its own. */
  type = "TCP",
): SchematicData {
  const rows: PtRow[] = [];
  const shown = messages.slice(0, upto);
  shown.forEach((m, i) => {
    const t = m.type ?? type;
    rows.push({
      cells: [
        "",
        (i * 0.001).toFixed(3),
        actors[m.from],
        actors[m.to],
        t,
        m.lost ? `${m.label}  ✕ lost` : m.label,
      ],
      swatch: m.lost ? "#dc2626" : (m.color ?? PDU_COLOR[t] ?? "#f59e0b"),
      current: i === shown.length - 1,
      tone: m.lost ? "lost" : undefined,
    });
    for (const n of notes)
      if (n.at === i)
        rows.push({ cells: [`${actors[n.side]}: ${n.text}`], tone: "note" });
  });
  const header = [
    "Vis.",
    "Time(sec)",
    "Last Device",
    "At Device",
    "Type",
    "Info",
  ];
  const widths = header.map((h, c) =>
    Math.max(
      cellWidth(h),
      ...rows
        .filter((r) => r.tone !== "note")
        .map((r) => cellWidth(r.cells[c] ?? "") + (c === 4 ? 13 : 0)),
    ),
  );
  widths[0] = 30;
  const types = [...new Set(shown.map((m) => m.type ?? type))];
  const w = Math.max(380, widths.reduce((a, b) => a + b, 0) + 12);
  // The Info column takes what is left.
  widths[5] += w - 12 - widths.reduce((a, b) => a + b, 0);
  const win: PtWindow = {
    w,
    title: "Simulation Panel",
    heading: "Event List",
    columns: header.map((label, i) => ({ label, w: widths[i] })),
    rows,
    swatchCol: 4,
    footer: `Event List Filters · Visible Events: ${types.join(", ")}`,
  };
  return {
    width: w,
    height: ptWindowHeight(win),
    gallery: true,
    plain: true,
    elements: [{ type: "pt-window", id: "events", x: 0, y: 0, ...win }],
  };
}

/**
 * A Packet Tracer window that lists fields: the PDU Information window,
 * with one column per PDU.
 */
export function pduFigure(
  title: string,
  tabs: readonly string[],
  tab: number,
  heading: string,
  columns: readonly string[],
  rows: readonly (readonly string[])[],
  footer?: string,
): SchematicData {
  const widths = columns.map((h, c) =>
    Math.max(cellWidth(h), ...rows.map((r) => cellWidth(r[c] ?? ""))),
  );
  const w = Math.max(360, widths.reduce((a, b) => a + b, 0) + 12);
  widths[widths.length - 1] += w - 12 - widths.reduce((a, b) => a + b, 0);
  const win: PtWindow = {
    w,
    title,
    tabs,
    tab,
    heading,
    columns: columns.map((label, i) => ({ label, w: widths[i] })),
    rows: rows.map((cells) => ({ cells })),
    footer,
  };
  return {
    width: w,
    height: ptWindowHeight(win),
    gallery: true,
    plain: true,
    elements: [{ type: "pt-window", id: "pdu", x: 0, y: 0, ...win }],
  };
}

/** A device's CLI tab in Packet Tracer, with the session typed so far. */
export function cliFigure(
  device: string,
  lines: readonly { text: string; tone?: "input" | "output" }[],
  footer?: string,
): SchematicData {
  const longest = Math.max(...lines.map((l) => l.text.length));
  const w = Math.max(380, Math.ceil(longest * 5.1 + 36));
  const win: PtWindow = {
    w,
    title: device,
    tabs: ["Physical", "Config", "CLI", "Attributes"],
    tab: 2,
    heading: "IOS Command Line Interface",
    console: lines,
    footer,
  };
  return {
    width: w,
    height: ptWindowHeight(win),
    gallery: true,
    plain: true,
    elements: [{ type: "pt-window", id: "cli", x: 0, y: 0, ...win }],
  };
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

import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

const W = 640;

type Pt = [number, number];

export function label(
  id: string,
  x: number,
  y: number,
  text: string,
): SchematicElement {
  return { type: "label", id, x, y, text };
}

export function wire(
  id: string,
  pts: Pt[],
  highlight?: boolean,
): SchematicElement {
  const el: SchematicElement = {
    type: "wire",
    id,
    points: pts.map(([x, y]) => ({ x, y })),
  };
  return highlight ? { ...el, highlight } : el;
}

/** Closed outline. The name sits in the middle. */
export function icBox(
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
  name: string,
  highlight?: boolean,
): SchematicElement[] {
  return [
    wire(
      id,
      [
        [x, y],
        [x + w, y],
        [x + w, y + h],
        [x, y + h],
        [x, y],
      ],
      highlight,
    ),
    label(`${id}_name`, x + w / 2, y + h / 2 + 3, name),
  ];
}

/** Signal name on the left, wire into the box edge at xBox. */
export function stub(
  id: string,
  text: string,
  y: number,
  xBox: number,
  highlight?: boolean,
): SchematicElement[] {
  const xWire = xBox - 28;
  const half = (text.length * 9 * 0.56) / 2;
  return [
    label(`lbl_${id}`, xWire - 4 - half, y, text),
    wire(`w_${id}`, [[xWire, y], [xBox, y]], highlight),
  ];
}

/** Wire leaving the box edge, ending on a short name. */
export function outStub(
  id: string,
  text: string,
  y: number,
  xBox: number,
  highlight?: boolean,
): SchematicElement[] {
  const xEnd = xBox + 36;
  const half = (text.length * 9 * 0.56) / 2;
  return [
    wire(`w_${id}`, [[xBox, y], [xEnd, y]], highlight),
    label(`lbl_${id}`, xEnd + 4 + half, y, text),
  ];
}

/** Horizontal wire from one box edge to the next. */
export function hop(
  id: string,
  x1: number,
  x2: number,
  y: number,
  highlight?: boolean,
): SchematicElement {
  return wire(id, [[x1, y], [x2, y]], highlight);
}

/**
 * Resistor and LED to ground.
 * Resistor pins are ±30 from centre, LED pins ±20.
 */
export function ledChain(
  id: string,
  x1: number,
  y: number,
  name: string,
  highlight?: boolean,
): SchematicElement[] {
  const rCenter = x1 + 40;
  const ledC = rCenter + 60;
  const gndX = ledC + 36;
  return [
    wire(`w_${id}`, [[x1, y], [rCenter - 30, y]], highlight),
    { type: "resistor", id: `r_${id}`, x: rCenter, y, highlight },
    wire(`w_${id}_b`, [[rCenter + 30, y], [ledC - 20, y]]),
    {
      type: "led",
      id: `led_${id}`,
      x: ledC,
      y,
      label: name,
      color: "green",
      highlight,
    },
    wire(`w_${id}_g`, [[ledC + 20, y], [gndX, y], [gndX, y + 14]]),
    { type: "ground", id: `g_${id}`, x: gndX, y: y + 14 },
  ];
}

export type Frame = {
  title: string;
  notes?: string[];
  elements?: SchematicElement[];
  height?: number;
  width?: number;
};

/** IC-style rectangle. Pins are the midpoints of the four sides. */
export function block(
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
  name: string,
  highlight?: boolean,
): SchematicElement {
  return { type: "block", id, x, y, w, h, label: name, highlight };
}

/** Rounded start or end. Pins are the midpoints of the four sides. */
export function terminal(
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
  name: string,
  highlight?: boolean,
): SchematicElement {
  return { type: "terminal", id, x, y, w, h, label: name, highlight };
}

/** Diamond. Pins are the four points. */
export function decision(
  id: string,
  x: number,
  y: number,
  name: string,
  highlight?: boolean,
): SchematicElement {
  return { type: "decision", id, x, y, w: 150, h: 64, label: name, highlight };
}

/** One memory row. `x` is the left edge. */
export function memword(
  id: string,
  x: number,
  y: number,
  address: string,
  value: string,
  bits?: string,
  highlight?: boolean,
): SchematicElement {
  return { type: "memword", id, x, y, address, bits, value, highlight };
}

/** Arrow whose head is the last point. */
export function arrow(
  id: string,
  pts: Pt[],
  highlight?: boolean,
): SchematicElement {
  return {
    type: "arrow",
    id,
    points: pts.map(([x, y]) => ({ x, y })),
    highlight,
  };
}

export function frames(list: Frame[]): SchematicData[] {
  return list.map((frame) => {
    const notes = frame.notes ?? [];
    const height = frame.height ?? 250 + notes.length * 22;
    const width = frame.width ?? W;
    const elements: SchematicElement[] = [
      label("lbl_title", width / 2, 22, frame.title),
      ...(frame.elements ?? []),
      ...notes.map((text, i) =>
        label(`lbl_note${i}`, width / 2, height - 18 - (notes.length - 1 - i) * 20, text),
      ),
    ];
    return { width, height, elements };
  });
}

/**
 * A flowchart declared once and revealed step by step, the same way a
 * breadboard lab declares parts once and reveals them with `show`.
 *
 * Each step lists the node ids that are on the page. A link is drawn when
 * both of its ends are visible, from the near pin of one box to the near
 * pin of the next. `highlight` is the box this step is about.
 */
export type FlowNode = {
  id: string;
  kind: "block" | "decision" | "terminal";
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
};

export type FlowLink = { id: string; from: string; to: string; label?: string };

export type FlowStep = {
  title: string;
  notes?: string[];
  show: string[];
  highlight?: string;
  /** Replace a box caption for this step only. */
  labels?: Record<string, string>;
  height?: number;
};

function flowSize(node: FlowNode): { w: number; h: number } {
  if (node.kind === "decision") return { w: node.w ?? 150, h: node.h ?? 64 };
  if (node.kind === "terminal") return { w: node.w ?? 168, h: node.h ?? 40 };
  return { w: node.w ?? 200, h: node.h ?? 40 };
}

function flowPin(node: FlowNode, side: "top" | "bottom" | "left" | "right"): Pt {
  const { w, h } = flowSize(node);
  if (side === "top") return [node.x, node.y - h / 2];
  if (side === "bottom") return [node.x, node.y + h / 2];
  if (side === "left") return [node.x - w / 2, node.y];
  return [node.x + w / 2, node.y];
}

function flowElement(node: FlowNode, on: boolean): SchematicElement {
  const { w, h } = flowSize(node);
  if (node.kind === "decision") {
    return decision(node.id, node.x, node.y, node.label, on);
  }
  if (node.kind === "terminal") {
    return terminal(node.id, node.x, node.y, w, h, node.label, on);
  }
  return block(node.id, node.x, node.y, w, h, node.label, on);
}

export function flow(
  nodes: FlowNode[],
  links: FlowLink[],
  steps: FlowStep[],
): SchematicData[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return frames(
    steps.map((step) => {
      const visible = new Set(step.show);
      const elements: SchematicElement[] = [];
      let lowest = 80;
      for (const node of nodes) {
        if (!visible.has(node.id)) continue;
        const drawn = { ...node, label: step.labels?.[node.id] ?? node.label };
        elements.push(flowElement(drawn, step.highlight === node.id));
        lowest = Math.max(lowest, node.y + flowSize(node).h / 2 + 48);
      }
      for (const link of links) {
        const from = byId.get(link.from);
        const to = byId.get(link.to);
        if (!from || !to || !visible.has(from.id) || !visible.has(to.id)) continue;
        const vertical = Math.abs(to.y - from.y) >= Math.abs(to.x - from.x);
        const start = vertical
          ? flowPin(from, to.y >= from.y ? "bottom" : "top")
          : flowPin(from, to.x >= from.x ? "right" : "left");
        const end = vertical
          ? flowPin(to, to.y >= from.y ? "top" : "bottom")
          : flowPin(to, to.x >= from.x ? "left" : "right");
        elements.push(
          arrow(link.id, [start, end], step.highlight === link.to),
        );
        if (link.label) {
          const mx = start[0] + (end[0] - start[0]) * 0.42;
          const my = start[1] + (end[1] - start[1]) * 0.42;
          const vertical = Math.abs(end[1] - start[1]) >= Math.abs(end[0] - start[0]);
          elements.push(
            label(
              `edge_${link.id}`,
              vertical ? mx + 28 : mx,
              vertical ? my : my - 12,
              link.label,
            ),
          );
        }
      }
      const notes = step.notes ?? [];
      const width = Math.max(
        W,
        ...nodes.map((node) => node.x + flowSize(node).w / 2 + 48),
      );
      return {
        title: step.title,
        notes,
        width,
        height: step.height ?? lowest + notes.length * 22 + 20,
        elements,
      };
    }),
  );
}

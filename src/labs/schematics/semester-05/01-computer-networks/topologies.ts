import type { SchematicData, SchematicElement } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { TOPO_BENCH } from "@/labs/networks/topologies";

import { netFigure } from "./net-figures";

/** One room's topology, laid out on its own. */
export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(TOPO_BENCH, frame, title, true);

type Node = { id: string; x: number; y: number; w?: number };

/** The five topologies side by side, small, one panel each. */
function overviewFigure(): SchematicData {
  const width = 520;
  const height = 180;
  const els: SchematicElement[] = [];
  const node = (n: Node) =>
    els.push({
      type: "block",
      id: n.id,
      x: n.x,
      y: n.y,
      w: n.w ?? 22,
      h: 14,
      fill: "#dbe5ff",
    });
  const wire = (id: string, ...pts: [number, number][]) =>
    els.push({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
  const title = (id: string, x: number, text: string) =>
    els.push({ type: "label", id, x, y: 166, text, size: 10 });

  // Bus
  wire("bus", [14, 60], [92, 60]);
  els.push({
    type: "block",
    id: "bus-t1",
    x: 10,
    y: 60,
    w: 6,
    h: 14,
    fill: "#3f4a5f",
  });
  els.push({
    type: "block",
    id: "bus-t2",
    x: 96,
    y: 60,
    w: 6,
    h: 14,
    fill: "#3f4a5f",
  });
  for (const [i, x] of [28, 53, 78].entries()) {
    node({ id: `bus-n${i}`, x, y: 110 });
    wire(`bus-d${i}`, [x, 60], [x, 103]);
    els.push({ type: "junction", id: `bus-j${i}`, x, y: 60 });
  }
  title("bus-l", 53, "Bus");

  // Star
  const sx = 155;
  node({ id: "star-c", x: sx, y: 85, w: 30 });
  for (const [i, [dx, dy]] of [
    [-34, 45],
    [34, 45],
    [-34, 125],
    [34, 125],
  ].entries()) {
    node({ id: `star-n${i}`, x: sx + dx, y: dy });
    const px = sx + (dx < 0 ? -7 : 7);
    const py = dy < 85 ? 78 : 92;
    wire(`star-w${i}`, [sx + dx + (dx < 0 ? 11 : -11), dy], [px, dy], [px, py]);
  }
  title("star-l", sx, "Star");

  // Ring
  const rx = 258;
  const ring: [number, number][] = [
    [rx - 30, 50],
    [rx + 30, 50],
    [rx + 30, 120],
    [rx - 30, 120],
  ];
  ring.forEach(([x, y], i) => node({ id: `ring-n${i}`, x, y }));
  wire("ring-a", [rx - 19, 50], [rx + 19, 50]);
  wire("ring-b", [rx + 30, 57], [rx + 30, 113]);
  wire("ring-c", [rx + 19, 120], [rx - 19, 120]);
  wire("ring-d", [rx - 30, 113], [rx - 30, 57]);
  title("ring-l", rx, "Ring");

  // Mesh: a triangle with the fourth node inside.
  const mx = 362;
  node({ id: "mesh-top", x: mx, y: 40 });
  node({ id: "mesh-mid", x: mx, y: 85 });
  node({ id: "mesh-l", x: mx - 36, y: 125 });
  node({ id: "mesh-r", x: mx + 36, y: 125 });
  wire("mesh-a", [mx - 11, 40], [mx - 36, 40], [mx - 36, 118]);
  wire("mesh-b", [mx + 11, 40], [mx + 36, 40], [mx + 36, 118]);
  wire("mesh-c", [mx, 47], [mx, 78]);
  wire("mesh-d", [mx - 25, 125], [mx + 25, 125]);
  wire("mesh-e", [mx - 11, 85], [mx - 30, 85], [mx - 30, 118]);
  wire("mesh-f", [mx + 11, 85], [mx + 30, 85], [mx + 30, 118]);
  title("mesh-l2", mx, "Mesh");

  // Tree
  const tx = 466;
  node({ id: "tree-root", x: tx, y: 40 });
  for (const [i, dx] of [-22, 22].entries()) {
    node({ id: `tree-s${i}`, x: tx + dx, y: 82 });
    wire(
      `tree-u${i}`,
      [tx + (dx < 0 ? -6 : 6), 47],
      [tx + (dx < 0 ? -6 : 6), 60],
      [tx + dx, 60],
      [tx + dx, 75],
    );
    for (const [j, ddx] of [-12, 12].entries()) {
      node({ id: `tree-l${i}${j}`, x: tx + dx + ddx, y: 125, w: 20 });
      wire(
        `tree-d${i}${j}`,
        [tx + dx + (ddx < 0 ? -5 : 5), 89],
        [tx + dx + (ddx < 0 ? -5 : 5), 104],
        [tx + dx + ddx, 104],
        [tx + dx + ddx, 118],
      );
    }
  }
  title("tree-l", tx, "Tree");
  return { width, height, gallery: true, elements: els };
}

export const overview = overviewFigure();
export const theoryDiagram = overview;

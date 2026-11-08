import type { SchematicData, SchematicElement } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { TCPIP_BENCH } from "@/labs/networks/tcpip-config";

import { netFigure } from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(TCPIP_BENCH, frame, title);

export const theoryDiagram = figure({}, "Two networks, one router");

const OCTET = (n: number) => n.toString(2).padStart(8, "0");

/**
 * An address ANDed with the mask, bit by bit, to give the network. `target`
 * is a second address checked against the same network.
 */
function andFigure(
  ip: number[],
  mask: number[],
  target: number[],
  title: string,
): SchematicData {
  const width = 460;
  const height = 236;
  const net = ip.map((o, i) => o & mask[i]);
  const tnet = target.map((o, i) => o & mask[i]);
  const same = net.every((o, i) => o === tnet[i]);
  const rows: { name: string; v: number[]; fill?: string; hot?: boolean }[] = [
    { name: "Address", v: ip },
    { name: "Mask", v: mask, fill: "#e4daf7" },
    { name: "AND → network", v: net, fill: "#d3f0e0", hot: true },
    { name: "Target network", v: tnet, fill: same ? "#d3f0e0" : "#fde2e2" },
  ];
  const els: SchematicElement[] = [
    { type: "label", id: "title", x: width / 2, y: 20, text: title },
  ];
  rows.forEach((r, i) => {
    const y = 58 + i * 42;
    els.push({
      type: "block",
      id: `name-${i}`,
      x: 62,
      y,
      w: 104,
      h: 32,
      label: r.name,
      highlight: r.hot,
    });
    r.v.forEach((o, j) => {
      els.push({
        type: "block",
        id: `o-${i}-${j}`,
        x: 160 + j * 78,
        y,
        w: 72,
        h: 32,
        label: `${o}\n${OCTET(o)}`,
        fill: r.fill,
      });
    });
  });
  els.push({
    type: "label",
    id: "verdict",
    x: width / 2,
    y: 222,
    text: same
      ? "Same network: send straight to it"
      : "Other network: send to the gateway",
    size: 9,
    color: same ? "#15803d" : "#b91c1c",
  });
  return { width, height, gallery: true, elements: els };
}

export const maskSame = andFigure(
  [192, 168, 1, 10],
  [255, 255, 255, 0],
  [192, 168, 1, 11],
  "192.168.1.10 /24 and PC 2",
);

export const maskOther = andFigure(
  [192, 168, 1, 10],
  [255, 255, 255, 0],
  [192, 168, 2, 10],
  "192.168.1.10 /24 and the server",
);

export const maskWrong = andFigure(
  [192, 168, 1, 10],
  [255, 255, 0, 0],
  [192, 168, 2, 10],
  "Wrong mask /16 and the server",
);

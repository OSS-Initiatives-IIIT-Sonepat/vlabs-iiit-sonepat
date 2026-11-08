import type { SchematicData, SchematicElement } from "@/labs/CircuitSchematic";
import { CABLE_BENCH } from "@/labs/networks/network-cables";

import { netFigure, pinoutFigure } from "./net-figures";

export type CableSample = "utp" | "stp" | "coax" | "fiber";

const SAMPLES: {
  id: CableSample;
  name: string;
  layers: { text: string; fill: string; ink?: string }[];
}[] = [
  {
    id: "utp",
    name: "UTP",
    layers: [
      { text: "PVC jacket", fill: "#5b8def", ink: "#ffffff" },
      { text: "4 twisted pairs", fill: "#fbe0c6" },
    ],
  },
  {
    id: "stp",
    name: "STP",
    layers: [
      { text: "Jacket", fill: "#3f4a5f", ink: "#ffffff" },
      { text: "Foil shield", fill: "#cbd5e1" },
      { text: "4 twisted pairs", fill: "#fbe0c6" },
    ],
  },
  {
    id: "coax",
    name: "Coaxial",
    layers: [
      { text: "Jacket", fill: "#27272a", ink: "#ffffff" },
      { text: "Braid", fill: "#e3b58a" },
      { text: "Dielectric", fill: "#ffffff" },
      { text: "Core", fill: "#d08b3e", ink: "#ffffff" },
    ],
  },
  {
    id: "fiber",
    name: "Fibre",
    layers: [
      { text: "Jacket", fill: "#f08a24", ink: "#ffffff" },
      { text: "Kevlar", fill: "#fde68a" },
      { text: "Cladding", fill: "#ffffff" },
      { text: "Glass core", fill: "#99f6e4" },
    ],
  },
];

/** Each sample cable, outside layer on the left, centre on the right. */
export function layersFigure(hot?: CableSample): SchematicData {
  const width = 440;
  const height = 236;
  const els: SchematicElement[] = [
    {
      type: "label",
      id: "title",
      x: 270,
      y: 22,
      text: "Outside → inside",
      size: 9,
      color: "#525252",
    },
  ];
  SAMPLES.forEach((s, i) => {
    const y = 56 + i * 46;
    els.push({
      type: "block",
      id: `${s.id}-name`,
      x: 52,
      y,
      w: 76,
      h: 26,
      label: s.name,
      highlight: s.id === hot,
    });
    const segW = 300 / s.layers.length;
    s.layers.forEach((l, j) => {
      els.push({
        type: "block",
        id: `${s.id}-${j}`,
        x: 120 + segW * j + segW / 2,
        y,
        w: segW - 4,
        h: 22,
        label: l.text,
        fill: l.fill,
        ink: l.ink,
      });
    });
  });
  return { width, height, gallery: true, elements: els };
}

const STEPS = [
  "Cut",
  "Strip",
  "Untwist",
  "Order",
  "Trim",
  "Insert",
  "Crimp",
  "Test",
];

/** The eight jobs of making one end, with the current one marked. */
export function crimpFlow(hot: number): SchematicData {
  const width = 420;
  const height = 210;
  const els: SchematicElement[] = [];
  STEPS.forEach((name, i) => {
    const row = i < 4 ? 0 : 1;
    const col = row === 0 ? i : 7 - i;
    const x = 60 + col * 100;
    const y = 64 + row * 92;
    els.push({
      type: i === 0 || i === 7 ? "terminal" : "block",
      id: `s-${i}`,
      x,
      y,
      w: 76,
      h: 28,
      label: `${i + 1}. ${name}`,
      highlight: i === hot,
    });
    if (i < 7) {
      if (i === 3) {
        els.push({
          type: "arrow",
          id: `a-${i}`,
          points: [
            { x, y: y + 14 },
            { x, y: y + 78 },
          ],
          size: 7,
        });
      } else {
        const dir = row === 0 ? 1 : -1;
        els.push({
          type: "arrow",
          id: `a-${i}`,
          points: [
            { x: x + dir * 38, y },
            { x: x + dir * 62, y },
          ],
          size: 7,
        });
      }
    }
  });
  els.push({
    type: "label",
    id: "note",
    x: width / 2,
    y: 196,
    text: "One end at a time. Both ends need all eight.",
    size: 9,
    color: "#525252",
  });
  return { width, height, gallery: true, elements: els };
}

export const theoryDiagram = netFigure(
  CABLE_BENCH,
  {},
  "Which cable goes where",
);

export const pinoutStraight = pinoutFigure("T568B", "T568B");
export const pinoutCross = pinoutFigure("T568B", "T568A");
export const pinoutT568B = pinoutFigure("T568B", null);

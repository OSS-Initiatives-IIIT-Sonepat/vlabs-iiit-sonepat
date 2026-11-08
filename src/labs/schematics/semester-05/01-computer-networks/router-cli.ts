import type { SchematicData, SchematicElement } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { RCLI_BENCH } from "@/labs/networks/router-cli";

import { netFigure } from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(RCLI_BENCH, frame, title);

export const theoryDiagram = figure({}, "R1 between LAN 10 and LAN 20");

export type IosMode = "user" | "priv" | "global" | "iface" | "line";

const MODES: { id: IosMode; name: string; prompt: string; y: number }[] = [
  { id: "user", name: "User EXEC", prompt: "R1>", y: 50 },
  { id: "priv", name: "Privileged EXEC", prompt: "R1#", y: 106 },
  { id: "global", name: "Global configuration", prompt: "R1(config)#", y: 162 },
  { id: "iface", name: "Interface", prompt: "R1(config-if)#", y: 222 },
  { id: "line", name: "Line", prompt: "R1(config-line)#", y: 222 },
];

/** The ladder of IOS modes, with the commands that move between them. */
export function modesFigure(hot: IosMode): SchematicData {
  const width = 440;
  const height = 262;
  const els: SchematicElement[] = [];
  for (const m of MODES) {
    const x = m.id === "line" ? 330 : m.id === "iface" ? 110 : 160;
    els.push({
      type: "block",
      id: `m-${m.id}`,
      x,
      y: m.y,
      w: 150,
      h: 34,
      label: `${m.name}\n${m.prompt}`,
      highlight: m.id === hot,
      fill: m.id === hot ? undefined : "#f4f6fb",
    });
  }
  const step = (
    id: string,
    x: number,
    y1: number,
    y2: number,
    text: string,
  ) => {
    els.push({
      type: "arrow",
      id,
      points: [
        { x, y: y1 },
        { x, y: y2 },
      ],
      size: 6,
    });
    els.push({
      type: "label",
      id: `${id}-t`,
      x: x + 8 + text.length * 2.6,
      y: (y1 + y2) / 2 + 3,
      text,
      size: 9,
    });
  };
  step("a1", 160, 67, 89, "enable");
  step("a2", 160, 123, 145, "configure terminal");
  step("a3", 110, 179, 205, "interface g0/0");
  els.push({
    type: "arrow",
    id: "a4",
    points: [
      { x: 210, y: 179 },
      { x: 210, y: 192 },
      { x: 330, y: 192 },
      { x: 330, y: 205 },
    ],
    size: 6,
  });
  els.push({
    type: "label",
    id: "a4-t",
    x: 270,
    y: 186,
    text: "line console 0",
    size: 9,
  });
  els.push({
    type: "label",
    id: "back",
    x: width / 2,
    y: 254,
    text: "exit goes up one level · end returns to R1#",
    size: 9,
    color: "#525252",
  });
  return { width, height, gallery: true, elements: els };
}

import { type SchematicData } from "@/labs/CircuitSchematic";

import {
  flow,
  type FlowLink,
  type FlowNode,
} from "@/labs/schematics/semester-03/diagram";

function figure(
  title: string,
  nodes: FlowNode[],
  links: FlowLink[],
): SchematicData {
  const drawn = flow(nodes, links, [
    {
      title,
      show: nodes.map((node) => node.id),
      height: 460,
    },
  ])[0];
  return { ...drawn, gallery: true };
}

export const gpioTheoryDiagram = figure(
  "One output, one input",
  [
    {
      id: "pin",
      kind: "terminal",
      x: 180,
      y: 78,
      w: 200,
      label: "GPIO output",
    },
    { id: "r", kind: "block", x: 180, y: 160, w: 200, label: "330 ohm" },
    { id: "led", kind: "block", x: 180, y: 242, w: 200, label: "LED" },
    { id: "gnd", kind: "terminal", x: 180, y: 324, w: 200, label: "Ground" },
    {
      id: "sw",
      kind: "terminal",
      x: 520,
      y: 78,
      w: 220,
      label: "Switch to +5 V",
    },
    { id: "in", kind: "block", x: 520, y: 200, w: 220, label: "GPIO input" },
    {
      id: "pull",
      kind: "block",
      x: 520,
      y: 324,
      w: 220,
      label: "10k to ground",
    },
  ],
  [
    { id: "a", from: "pin", to: "r" },
    { id: "b", from: "r", to: "led" },
    { id: "c", from: "led", to: "gnd" },
    { id: "d", from: "sw", to: "in", label: "pressed" },
    { id: "e", from: "pull", to: "in", label: "open" },
  ],
);

export const sevenSegmentTheoryDiagram = figure(
  "BCD digit to segments",
  [
    {
      id: "bcd",
      kind: "terminal",
      x: 360,
      y: 78,
      w: 280,
      label: "Switches D C B A",
    },
    { id: "dec", kind: "block", x: 360, y: 168, w: 280, label: "74HC4511" },
    {
      id: "seg",
      kind: "block",
      x: 360,
      y: 258,
      w: 280,
      label: "Segments a to g",
    },
    {
      id: "r",
      kind: "block",
      x: 360,
      y: 348,
      w: 280,
      label: "330 ohm on each segment",
    },
  ],
  [
    { id: "a", from: "bcd", to: "dec" },
    { id: "b", from: "dec", to: "seg" },
    { id: "c", from: "seg", to: "r" },
  ],
);

export const adcDacTheoryDiagram = figure(
  "Into digits, and back to a voltage",
  [
    {
      id: "pot",
      kind: "terminal",
      x: 190,
      y: 78,
      w: 220,
      label: "Potentiometer",
    },
    { id: "adc", kind: "block", x: 190, y: 178, w: 220, label: "ADC0804" },
    {
      id: "byte",
      kind: "terminal",
      x: 190,
      y: 278,
      w: 220,
      label: "8-bit result",
    },
    {
      id: "code",
      kind: "terminal",
      x: 530,
      y: 78,
      w: 220,
      label: "4-bit code",
    },
    {
      id: "ladder",
      kind: "block",
      x: 530,
      y: 178,
      w: 220,
      label: "R-2R ladder",
    },
    {
      id: "vout",
      kind: "terminal",
      x: 530,
      y: 278,
      w: 220,
      label: "Analog voltage",
    },
  ],
  [
    { id: "a", from: "pot", to: "adc" },
    { id: "b", from: "adc", to: "byte" },
    { id: "c", from: "code", to: "ladder" },
    { id: "d", from: "ladder", to: "vout" },
  ],
);

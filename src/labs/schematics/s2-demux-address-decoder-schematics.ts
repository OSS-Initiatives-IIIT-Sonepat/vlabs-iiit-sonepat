import { type SchematicData } from "@/labs/CircuitSchematic";

/*
 * S2 DEMUX as Address Decoder
 * 1:2 DEMUX with I=1 acts as address decoder
 */

const W = 400;
const H = 280;

/** Step 1: Build 1:2 DEMUX with I=1 */
export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 1: 1:2 DEMUX as Decoder",
    },
    {
      type: "label",
      id: "eq",
      x: 200,
      y: 55,
      text: "Y0 = I·S' = S', Y1 = I·S = S (when I=1)",
    },
    { type: "not-gate", id: "not1", x: 120, y: 120, label: "S'" },
    {
      type: "and-gate",
      id: "and0",
      x: 260,
      y: 100,
      label: "Y0",
      highlight: true,
    },
    {
      type: "and-gate",
      id: "and1",
      x: 260,
      y: 180,
      label: "Y1",
      highlight: true,
    },
    {
      type: "wire",
      id: "ws",
      points: [
        { x: 40, y: 120 },
        { x: 98, y: 120 },
      ],
    },
    { type: "junction", id: "js", x: 60, y: 120 },
    {
      type: "wire",
      id: "ws2",
      points: [
        { x: 60, y: 120 },
        { x: 60, y: 188 },
        { x: 234, y: 188 },
      ],
    },
    {
      type: "wire",
      id: "wn",
      points: [
        { x: 146, y: 120 },
        { x: 200, y: 120 },
        { x: 200, y: 92 },
        { x: 234, y: 92 },
      ],
    },
    {
      type: "wire",
      id: "wi1",
      points: [
        { x: 40, y: 108 },
        { x: 234, y: 108 },
      ],
    },
    { type: "junction", id: "ji", x: 180, y: 108 },
    {
      type: "wire",
      id: "wi2",
      points: [
        { x: 180, y: 108 },
        { x: 180, y: 172 },
        { x: 234, y: 172 },
      ],
    },
    { type: "label", id: "ls", x: 25, y: 120, text: "S" },
    { type: "label", id: "li", x: 25, y: 108, text: "I=1" },
    {
      type: "label",
      id: "desc",
      x: 200,
      y: 250,
      text: "I permanently HIGH → pure decoder",
    },
  ],
};

/** Step 2: Connect address switch and LED indicators */
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 2: Address Switch & LEDs",
    },
    { type: "not-gate", id: "not1", x: 120, y: 100, label: "S'" },
    { type: "and-gate", id: "and0", x: 240, y: 80, label: "Y0" },
    { type: "and-gate", id: "and1", x: 240, y: 160, label: "Y1" },
    {
      type: "wire",
      id: "wo0",
      points: [
        { x: 266, y: 80 },
        { x: 320, y: 80 },
      ],
      highlight: true,
    },
    {
      type: "wire",
      id: "wo1",
      points: [
        { x: 266, y: 160 },
        { x: 320, y: 160 },
      ],
      highlight: true,
    },
    { type: "led", id: "led0", x: 340, y: 80, label: "Dev0", highlight: true },
    { type: "led", id: "led1", x: 340, y: 160, label: "Dev1", highlight: true },
    { type: "label", id: "sw", x: 60, y: 100, text: "S = Address bit" },
    {
      type: "label",
      id: "desc",
      x: 200,
      y: 240,
      text: "LEDs represent chip-select for 2 devices",
    },
  ],
};

/** Step 3: Verify deselected peripheral */
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 3: Verify Deselection",
    },
    { type: "label", id: "addr", x: 200, y: 55, text: "Address S=0" },
    { type: "not-gate", id: "not1", x: 100, y: 100, label: "0'=1" },
    {
      type: "and-gate",
      id: "and0",
      x: 220,
      y: 80,
      label: "Y0=1",
      highlight: true,
    },
    { type: "and-gate", id: "and1", x: 220, y: 160, label: "Y1=0" },
    { type: "led", id: "led0", x: 320, y: 80, label: "ON" },
    { type: "led", id: "led1", x: 320, y: 160, label: "OFF" },
    {
      type: "label",
      id: "note",
      x: 200,
      y: 220,
      text: "Device 0 selected (Y0=1)",
    },
    {
      type: "label",
      id: "note2",
      x: 200,
      y: 250,
      text: "Device 1 deselected (Y1=0)",
    },
  ],
};

/** Step 4: Switch address and verify other device */
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 4: Switch Address",
    },
    { type: "label", id: "addr", x: 200, y: 55, text: "Address S=1" },
    { type: "not-gate", id: "not1", x: 100, y: 100, label: "1'=0" },
    { type: "and-gate", id: "and0", x: 220, y: 80, label: "Y0=0" },
    {
      type: "and-gate",
      id: "and1",
      x: 220,
      y: 160,
      label: "Y1=1",
      highlight: true,
    },
    { type: "led", id: "led0", x: 320, y: 80, label: "OFF" },
    { type: "led", id: "led1", x: 320, y: 160, label: "ON" },
    {
      type: "label",
      id: "note",
      x: 200,
      y: 220,
      text: "Device 1 now selected (Y1=1)",
    },
    {
      type: "label",
      id: "note2",
      x: 200,
      y: 250,
      text: "Device 0 deselected (Y0=0)",
    },
  ],
};

/** Step 5: Simulate bus conflict prevention */
export const step05: SchematicData = {
  width: W,
  height: H,
  elements: [
    {
      type: "label",
      id: "title",
      x: 200,
      y: 20,
      text: "Step 5: Bus Conflict Prevention",
    },
    {
      type: "label",
      id: "note1",
      x: 200,
      y: 70,
      text: "Decoder ensures EXACTLY ONE output HIGH",
    },
    { type: "and-gate", id: "and0", x: 120, y: 120, label: "CS0" },
    { type: "and-gate", id: "and1", x: 280, y: 120, label: "CS1" },
    { type: "label", id: "mem0", x: 120, y: 180, text: "Memory 0" },
    { type: "label", id: "mem1", x: 280, y: 180, text: "Memory 1" },
    {
      type: "wire",
      id: "w0",
      points: [
        { x: 120, y: 146 },
        { x: 120, y: 165 },
      ],
    },
    {
      type: "wire",
      id: "w1",
      points: [
        { x: 280, y: 146 },
        { x: 280, y: 165 },
      ],
    },
    {
      type: "wire",
      id: "bus",
      points: [
        { x: 80, y: 220 },
        { x: 320, y: 220 },
      ],
      highlight: true,
    },
    { type: "label", id: "lblbus", x: 200, y: 235, text: "Data Bus (shared)" },
    {
      type: "label",
      id: "desc",
      x: 200,
      y: 270,
      text: "Only selected device drives bus → no conflict",
    },
  ],
};

export const s2DemuxAddressDecoderStepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
];

export const s2DemuxAddressDecoderTheoryDiagram: SchematicData = {
  width: 420,
  height: 280,
  elements: [
    {
      type: "label",
      id: "title",
      x: 210,
      y: 20,
      text: "DEMUX as Address Decoder",
    },
    // DEMUX structure
    { type: "not-gate", id: "not1", x: 100, y: 80, label: "S'" },
    { type: "and-gate", id: "and0", x: 200, y: 60, label: "Y0" },
    { type: "and-gate", id: "and1", x: 200, y: 120, label: "Y1" },
    // Wiring
    {
      type: "wire",
      id: "ws",
      points: [
        { x: 40, y: 80 },
        { x: 78, y: 80 },
      ],
    },
    { type: "junction", id: "js", x: 60, y: 80 },
    {
      type: "wire",
      id: "ws2",
      points: [
        { x: 60, y: 80 },
        { x: 60, y: 128 },
        { x: 174, y: 128 },
      ],
    },
    {
      type: "wire",
      id: "wn",
      points: [
        { x: 126, y: 80 },
        { x: 150, y: 80 },
        { x: 150, y: 52 },
        { x: 174, y: 52 },
      ],
    },
    {
      type: "wire",
      id: "wi",
      points: [
        { x: 40, y: 68 },
        { x: 174, y: 68 },
      ],
    },
    { type: "junction", id: "ji", x: 140, y: 68 },
    {
      type: "wire",
      id: "wi2",
      points: [
        { x: 140, y: 68 },
        { x: 140, y: 112 },
        { x: 174, y: 112 },
      ],
    },
    // Labels
    { type: "label", id: "ls", x: 25, y: 80, text: "S" },
    { type: "label", id: "li", x: 25, y: 68, text: "I=1" },
    // Peripherals
    { type: "label", id: "ly0", x: 280, y: 60, text: "→ CS0 (Device 0)" },
    { type: "label", id: "ly1", x: 280, y: 120, text: "→ CS1 (Device 1)" },
    // Truth table
    { type: "label", id: "t1", x: 210, y: 180, text: "S=0: Y0=1 (Dev0), Y1=0" },
    { type: "label", id: "t2", x: 210, y: 205, text: "S=1: Y0=0, Y1=1 (Dev1)" },
    {
      type: "label",
      id: "app",
      x: 210,
      y: 250,
      text: "Application: Memory bank selection",
    },
  ],
};

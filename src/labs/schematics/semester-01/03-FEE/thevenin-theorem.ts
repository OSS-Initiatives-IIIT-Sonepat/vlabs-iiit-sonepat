import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

/*
 * Thevenin, one circuit at a time.
 * Steps 1–8 grow the original divider. Steps 9–10 are only the equivalent.
 */

const W = 360;
const H = 270;

const vs = (value = "9 V", highlight?: boolean): SchematicElement => ({
  type: "vsource",
  id: "VS",
  x: 50,
  y: 130,
  label: "Vs",
  value,
  highlight,
});
const r1 = (highlight?: boolean): SchematicElement => ({
  type: "resistor",
  id: "R1",
  x: 120,
  y: 50,
  label: "R₁",
  value: "1 kΩ",
  highlight,
});
const r2 = (highlight?: boolean): SchematicElement => ({
  type: "resistor",
  id: "R2",
  x: 190,
  y: 130,
  rotation: 90,
  label: "R₂",
  value: "2.2 kΩ",
  highlight,
});
const rl = (value: string, highlight?: boolean): SchematicElement => ({
  type: "resistor",
  id: "RL",
  x: 310,
  y: 130,
  rotation: 90,
  label: "R_L",
  value,
  highlight,
});
const gnd: SchematicElement = { type: "ground", id: "GND", x: 120, y: 210 };
const vm = (label: string): SchematicElement => ({
  type: "voltmeter",
  id: "VM",
  x: 250,
  y: 130,
  label,
  highlight: true,
});

const wVsGnd: SchematicElement = {
  type: "wire",
  id: "w_vs_gnd",
  points: [
    { x: 50, y: 160 },
    { x: 50, y: 210 },
    { x: 120, y: 210 },
  ],
};
const wShort: SchematicElement = {
  type: "wire",
  id: "w_short",
  points: [
    { x: 50, y: 100 },
    { x: 50, y: 160 },
  ],
  highlight: true,
};
const wVsR1: SchematicElement = {
  type: "wire",
  id: "w_vs_r1",
  points: [
    { x: 50, y: 100 },
    { x: 50, y: 50 },
    { x: 90, y: 50 },
  ],
};
const wR1A: SchematicElement = {
  type: "wire",
  id: "w_r1_a",
  points: [
    { x: 150, y: 50 },
    { x: 250, y: 50 },
  ],
};
const wNodeR2: SchematicElement = {
  type: "wire",
  id: "w_node_r2",
  points: [
    { x: 190, y: 50 },
    { x: 190, y: 100 },
  ],
};
const wR2Gnd: SchematicElement = {
  type: "wire",
  id: "w_r2_gnd",
  points: [
    { x: 190, y: 160 },
    { x: 190, y: 210 },
    { x: 120, y: 210 },
  ],
};
const wVmTop: SchematicElement = {
  type: "wire",
  id: "w_vm_top",
  points: [
    { x: 250, y: 50 },
    { x: 250, y: 106 },
  ],
};
const wVmBot: SchematicElement = {
  type: "wire",
  id: "w_vm_bot",
  points: [
    { x: 250, y: 154 },
    { x: 250, y: 210 },
  ],
};
const wB: SchematicElement = {
  type: "wire",
  id: "w_b",
  points: [
    { x: 190, y: 210 },
    { x: 250, y: 210 },
  ],
};
const wRlTop: SchematicElement = {
  type: "wire",
  id: "w_rl_top",
  points: [
    { x: 250, y: 50 },
    { x: 310, y: 50 },
    { x: 310, y: 100 },
  ],
};
const wRlBot: SchematicElement = {
  type: "wire",
  id: "w_rl_bot",
  points: [
    { x: 310, y: 160 },
    { x: 310, y: 210 },
    { x: 250, y: 210 },
  ],
};

const jNode: SchematicElement = { type: "junction", id: "j_node", x: 190, y: 50 };
const jGnd: SchematicElement = { type: "junction", id: "j_gnd", x: 120, y: 210 };
const jB: SchematicElement = { type: "junction", id: "j_b", x: 190, y: 210 };
const jA: SchematicElement = { type: "junction", id: "j_a", x: 250, y: 50 };
const jLoad: SchematicElement = { type: "junction", id: "j_load", x: 250, y: 210 };

const lblA: SchematicElement = { type: "label", id: "lbl_a", x: 228, y: 38, text: "A" };
const lblB: SchematicElement = { type: "label", id: "lbl_b", x: 228, y: 198, text: "B" };
const cap = (text: string): SchematicElement => ({
  type: "label",
  id: "lbl",
  x: 180,
  y: 258,
  text,
});

const divider: SchematicElement[] = [
  wVsR1,
  r1(),
  wR1A,
  jNode,
  wNodeR2,
  r2(),
  wR2Gnd,
  jGnd,
];

function original(
  source: "live" | "short",
  extra: SchematicElement[] = [],
  caption?: string,
): SchematicData {
  return {
    width: W,
    height: H,
    elements: [
      source === "live" ? vs() : wShort,
      wVsGnd,
      gnd,
      ...divider,
      ...extra,
      ...(caption ? [cap(caption)] : []),
    ],
  };
}

const meter: SchematicElement[] = [wVmTop, wVmBot, wB, jB, lblA, lblB];

export const step01: SchematicData = {
  width: W,
  height: H,
  elements: [
    { type: "label", id: "lbl", x: 180, y: 135, text: "Place the breadboard" },
  ],
};
export const step02: SchematicData = {
  width: W,
  height: H,
  elements: [vs("9 V", true), wVsGnd, gnd],
};
export const step03: SchematicData = {
  width: W,
  height: H,
  elements: [vs(), wVsGnd, gnd, wVsR1, r1(true)],
};
export const step04: SchematicData = {
  width: W,
  height: H,
  elements: [
    vs(),
    wVsGnd,
    gnd,
    wVsR1,
    r1(),
    wR1A,
    jNode,
    wNodeR2,
    r2(true),
    wR2Gnd,
    jGnd,
    jA,
    lblA,
    lblB,
  ],
};
export const step05: SchematicData = original("live", [vm("Vth"), ...meter], "Vth = 6.19 V");
export const step06: SchematicData = original(
  "short",
  [vm("Rth"), ...meter],
  "Rth = 688 Ω",
);
export const step07: SchematicData = original(
  "live",
  [vm(""), ...meter, jA, wRlTop, rl("3.3 kΩ", true), wRlBot, jLoad],
  "VL = 5.12 V, IL = 1.55 mA",
);
export const step08: SchematicData = original(
  "live",
  [vm(""), ...meter, jA, wRlTop, rl("4.7 kΩ", true), wRlBot, jLoad],
  "VL = 5.40 V, IL = 1.15 mA",
);

function equivalent(load: string, caption: string): SchematicData {
  const vth: SchematicElement = {
    type: "vsource",
    id: "VTH",
    x: 70,
    y: 120,
    label: "Vth",
    value: "6.19 V",
    highlight: true,
  };
  const rth: SchematicElement = {
    type: "resistor",
    id: "RTH",
    x: 160,
    y: 60,
    label: "Rth",
    value: "688 Ω",
    highlight: true,
  };
  const loadR: SchematicElement = {
    type: "resistor",
    id: "RL",
    x: 260,
    y: 120,
    rotation: 90,
    label: "R_L",
    value: load,
  };
  const egnd: SchematicElement = { type: "ground", id: "GND", x: 160, y: 200 };
  return {
    width: W,
    height: H,
    elements: [
      vth,
      rth,
      loadR,
      egnd,
      {
        type: "wire",
        id: "w1",
        points: [
          { x: 70, y: 90 },
          { x: 70, y: 60 },
          { x: 130, y: 60 },
        ],
      },
      {
        type: "wire",
        id: "w2",
        points: [
          { x: 190, y: 60 },
          { x: 260, y: 60 },
          { x: 260, y: 90 },
        ],
      },
      {
        type: "wire",
        id: "w3",
        points: [
          { x: 260, y: 150 },
          { x: 260, y: 200 },
          { x: 160, y: 200 },
        ],
      },
      {
        type: "wire",
        id: "w4",
        points: [
          { x: 70, y: 150 },
          { x: 70, y: 200 },
          { x: 160, y: 200 },
        ],
      },
      { type: "junction", id: "j", x: 160, y: 200 },
      { type: "label", id: "lbl", x: 180, y: 258, text: caption },
    ],
  };
}

export const step09: SchematicData = equivalent("3.3 kΩ", "Same load: 5.12 V, 1.55 mA");
export const step10: SchematicData = equivalent("4.7 kΩ", "Same load: 5.40 V, 1.15 mA");

export const theoryDiagram = step09;

export const theveninStepSchematics: SchematicData[] = [
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
  step07,
  step08,
  step09,
  step10,
];

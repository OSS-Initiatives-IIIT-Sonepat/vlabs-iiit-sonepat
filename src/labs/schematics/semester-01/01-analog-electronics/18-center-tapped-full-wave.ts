import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

const W = 420;
const H = 310;

const wire = (id: string, pts: number[][]): SchematicElement => ({
  type: "wire",
  id,
  points: pts.map(([x, y]) => ({ x, y })),
});
const junction = (id: string, x: number, y: number): SchematicElement => ({
  type: "junction",
  id,
  x,
  y,
});

const sheet = (
  title: string,
  elements: SchematicElement[],
  caption: string,
): SchematicData => ({
  width: W,
  height: H,
  elements: [
    { type: "label", id: "title", x: W / 2, y: 16, text: title },
    ...elements,
    { type: "label", id: "caption", x: W / 2, y: 296, text: caption },
  ],
});

const top: SchematicElement = {
  type: "acsource",
  id: "S1",
  x: 70,
  y: 90,
  label: "S1",
  value: "12 V",
};
const bot: SchematicElement = {
  type: "acsource",
  id: "S2",
  x: 70,
  y: 190,
  label: "S2",
  value: "12 V",
};
const d1 = (highlight?: boolean): SchematicElement => ({
  type: "diode",
  id: "D1",
  x: 180,
  y: 60,
  label: "D1",
  highlight,
});
const d2 = (highlight?: boolean): SchematicElement => ({
  type: "diode",
  id: "D2",
  x: 180,
  y: 220,
  label: "D2",
  highlight,
});
const rl = (highlight?: boolean): SchematicElement => ({
  type: "resistor",
  id: "RL",
  x: 270,
  y: 140,
  rotation: 90,
  label: "RL",
  value: "1 kΩ",
  highlight,
});
const gnd: SchematicElement = { type: "ground", id: "GND", x: 150, y: 250 };
const vm = (): SchematicElement => ({
  type: "voltmeter",
  id: "VM",
  x: 360,
  y: 140,
  label: "Vdc",
  highlight: true,
});
const cap = (highlight?: boolean): SchematicElement => ({
  type: "capacitor",
  id: "C",
  x: 320,
  y: 210,
  rotation: 90,
  label: "C",
  value: "100 µF",
  highlight,
});

const secondary: SchematicElement[] = [
  top,
  bot,
  wire("w_join", [
    [70, 120],
    [70, 160],
  ]),
  junction("j_ct", 70, 140),
  wire("w_ct", [
    [70, 140],
    [30, 140],
    [30, 250],
    [150, 250],
  ]),
  gnd,
];

const diodes: SchematicElement[] = [
  wire("w_s1_d1", [
    [70, 60],
    [160, 60],
  ]),
  d1(),
  wire("w_s2_d2", [
    [70, 220],
    [160, 220],
  ]),
  d2(),
];

const joined: SchematicElement[] = [
  wire("w_d1_pos", [
    [200, 60],
    [270, 60],
    [270, 220],
    [200, 220],
  ]),
];

const loaded: SchematicElement[] = [
  wire("w_d1_pos", [
    [200, 60],
    [270, 60],
    [270, 110],
  ]),
  wire("w_d2_pos", [
    [200, 220],
    [240, 220],
    [240, 170],
    [270, 170],
  ]),
  rl(),
  wire("w_rl_gnd", [
    [270, 170],
    [270, 250],
    [150, 250],
  ]),
  junction("j_gnd", 150, 250),
  junction("j_load", 270, 170),
];

const meter: SchematicElement[] = [
  vm(),
  wire("w_vm_top", [
    [270, 60],
    [360, 60],
    [360, 116],
  ]),
  wire("w_vm_bot", [
    [360, 164],
    [360, 250],
    [270, 250],
  ]),
  junction("j_pos", 270, 60),
  junction("j_vm", 270, 250),
];

const filter: SchematicElement[] = [
  cap(true),
  wire("w_c_top", [
    [270, 170],
    [320, 170],
    [320, 190],
  ]),
  wire("w_c_bot", [
    [320, 230],
    [320, 250],
  ]),
  junction("j_c", 320, 250),
];

export const step01 = sheet(
  "Centre-tapped full-wave rectifier",
  [],
  "Two diodes, one each half",
);
export const step02 = sheet(
  "12-0-12 V secondary",
  [...secondary],
  "CT is the load return",
);
export const step03 = sheet(
  "Diode on S1",
  [...secondary, ...diodes.slice(0, 2)],
  "D1 conducts when S1 is positive",
);
export const step04 = sheet(
  "Diode on S2",
  [...secondary, ...diodes],
  "D2 conducts on the other half",
);
export const step05 = sheet(
  "Cathodes joined",
  [...secondary, ...diodes, ...joined],
  "Both cathodes feed one node",
);
export const step06 = sheet(
  "Load returned to the centre tap",
  [...secondary, ...diodes, ...loaded],
  "RL = 1 kΩ",
);
export const step07 = sheet(
  "DC output without a filter",
  [...secondary, ...diodes, ...loaded, ...meter],
  "Vdc = 10.36 V",
);
export const step08 = sheet(
  "Two pulses each cycle",
  [...secondary, ...diodes, ...loaded, ...meter],
  "Ripple frequency is 100 Hz",
);
export const step09 = sheet(
  "Capacitor across the load",
  [...secondary, ...diodes, ...loaded, ...meter, ...filter],
  "Vdc = 15.75 V, ripple 1.04 Vpp",
);

export const theoryDiagram = step09;

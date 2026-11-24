import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

const W = 400;
const H = 250;

const vs = (highlight?: boolean): SchematicElement => ({
  type: "vsource",
  id: "VS",
  x: 50,
  y: 120,
  label: "Vs",
  value: "9 V",
  highlight,
});
const rs = (highlight?: boolean): SchematicElement => ({
  type: "resistor",
  id: "RS",
  x: 140,
  y: 60,
  label: "Rs",
  value: "100 Ω",
  highlight,
});
const rl = (value: string, highlight?: boolean): SchematicElement => ({
  type: "resistor",
  id: "RL",
  x: 280,
  y: 120,
  rotation: 90,
  label: "RL",
  value,
  highlight,
});
const gnd: SchematicElement = { type: "ground", id: "GND", x: 160, y: 210 };
const am = (): SchematicElement => ({
  type: "ammeter",
  id: "AM",
  x: 210,
  y: 60,
  rotation: 90,
  label: "IL",
  highlight: true,
});
const vm = (): SchematicElement => ({
  type: "voltmeter",
  id: "VM",
  x: 350,
  y: 120,
  label: "VL",
  highlight: true,
});

const wVsTop: SchematicElement = {
  type: "wire",
  id: "w_vs_top",
  points: [
    { x: 50, y: 90 },
    { x: 50, y: 60 },
    { x: 110, y: 60 },
  ],
};
const wVsGnd: SchematicElement = {
  type: "wire",
  id: "w_vs_gnd",
  points: [
    { x: 50, y: 150 },
    { x: 50, y: 210 },
    { x: 160, y: 210 },
  ],
};
const wAmIn: SchematicElement = {
  type: "wire",
  id: "w_am_in",
  points: [
    { x: 170, y: 60 },
    { x: 186, y: 60 },
  ],
};
const wAmNode: SchematicElement = {
  type: "wire",
  id: "w_am_node",
  points: [
    { x: 234, y: 60 },
    { x: 280, y: 60 },
  ],
};
const wNodeRl: SchematicElement = {
  type: "wire",
  id: "w_node_rl",
  points: [
    { x: 280, y: 60 },
    { x: 280, y: 90 },
  ],
};
const wRlBot: SchematicElement = {
  type: "wire",
  id: "w_rl_bot",
  points: [
    { x: 280, y: 150 },
    { x: 280, y: 180 },
  ],
};
const wBotGnd: SchematicElement = {
  type: "wire",
  id: "w_bot_gnd",
  points: [
    { x: 280, y: 180 },
    { x: 280, y: 210 },
    { x: 160, y: 210 },
  ],
};
const wVmTop: SchematicElement = {
  type: "wire",
  id: "w_vm_top",
  points: [
    { x: 280, y: 60 },
    { x: 350, y: 60 },
    { x: 350, y: 96 },
  ],
};
const wVmBot: SchematicElement = {
  type: "wire",
  id: "w_vm_bot",
  points: [
    { x: 350, y: 144 },
    { x: 350, y: 180 },
    { x: 280, y: 180 },
  ],
};
const jGnd: SchematicElement = {
  type: "junction",
  id: "j_gnd",
  x: 160,
  y: 210,
};
const jTop: SchematicElement = { type: "junction", id: "j_top", x: 280, y: 60 };
const jBot: SchematicElement = {
  type: "junction",
  id: "j_bot",
  x: 280,
  y: 180,
};

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
    { type: "label", id: "caption", x: W / 2, y: 236, text: caption },
  ],
});

export const step01 = sheet("Maximum Power Transfer", [], "Pmax when RL = Rs");
export const step02 = sheet(
  "Connect Vs = 9 V",
  [vs(true), wVsGnd, gnd],
  "The blue rail is the return",
);
export const step03 = sheet(
  "Source resistance Rs = 100 Ω",
  [vs(), wVsTop, rs(true), wVsGnd, gnd],
  "Rs stands for the source resistance",
);
export const step04 = sheet(
  "Load RL = 100 Ω, not yet joined",
  [vs(), wVsTop, rs(), rl("100 Ω", true), wRlBot, wBotGnd, wVsGnd, gnd, jGnd],
  "The ammeter will close the gap",
);
export const step05 = sheet(
  "Matched load, RL = Rs",
  [
    vs(),
    wVsTop,
    rs(),
    wAmIn,
    am(),
    wAmNode,
    jTop,
    wNodeRl,
    rl("100 Ω"),
    wRlBot,
    jBot,
    wBotGnd,
    wVsGnd,
    gnd,
    jGnd,
    wVmTop,
    vm(),
    wVmBot,
  ],
  "IL = 45.0 mA, VL = 4.50 V, PL = 202.5 mW",
);
export const step06 = sheet(
  "Load RL = 47 Ω",
  [
    vs(),
    wVsTop,
    rs(),
    wAmIn,
    am(),
    wAmNode,
    jTop,
    wNodeRl,
    rl("47 Ω", true),
    wRlBot,
    jBot,
    wBotGnd,
    wVsGnd,
    gnd,
    jGnd,
    wVmTop,
    vm(),
    wVmBot,
  ],
  "IL = 61.2 mA, VL = 2.88 V, PL = 176.3 mW",
);
export const step07 = sheet(
  "Load RL = 220 Ω",
  [
    vs(),
    wVsTop,
    rs(),
    wAmIn,
    am(),
    wAmNode,
    jTop,
    wNodeRl,
    rl("220 Ω", true),
    wRlBot,
    jBot,
    wBotGnd,
    wVsGnd,
    gnd,
    jGnd,
    wVmTop,
    vm(),
    wVmBot,
  ],
  "IL = 28.1 mA, VL = 6.19 V, PL = 174.0 mW",
);
export const step08 = sheet(
  "Greatest power at RL = Rs",
  [
    vs(),
    wVsTop,
    rs(true),
    wAmIn,
    am(),
    wAmNode,
    jTop,
    wNodeRl,
    rl("100 Ω", true),
    wRlBot,
    jBot,
    wBotGnd,
    wVsGnd,
    gnd,
    jGnd,
    wVmTop,
    vm(),
    wVmBot,
  ],
  "Pmax = Vs² / (4 Rs) = 202.5 mW",
);

export const theoryDiagram = step08;

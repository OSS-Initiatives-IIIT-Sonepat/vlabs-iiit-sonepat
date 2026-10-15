import { type TheorySection } from "@/labs/lab-content.types";
import { type SchematicSpec } from "@/labs/TheoryScene";
import { step06 as circuitDiagram } from "@/labs/schematics/zener-diode-schematics";

const FWD_BAT_X = -2.8;
const TOP_Y_F = 1.0;
const GND_Y_F = -1.0;
const FWD_AMP_X = -1.7;
const FWD_R1_X = -0.55;
const FWD_NODE = 0.3;
const FWD_ZD_X = 1.0;
const FWD_RIGHT_X = 1.6;
const FWD_VM_Y = 0.0;
const VM_CX_F = FWD_NODE;

const OFF = 4.8;
const REV_BAT_X = FWD_BAT_X + OFF;
const REV_AMP_X = FWD_AMP_X + OFF;
const REV_R1_X = FWD_R1_X + OFF;
const REV_NODE = FWD_NODE + OFF;
const REV_ZD_X = FWD_ZD_X + OFF;
const REV_RIGHT_X = FWD_RIGHT_X + OFF;
const VM_CX_R = REV_NODE;

const THEORY_SCHEMATIC: SchematicSpec = {
  elements: [
    {
      type: "label",
      x: FWD_BAT_X + 1.8,
      y: TOP_Y_F + 0.55,
      text: "FORWARD BIAS",
      size: 0.11,
      color: "#555",
    },

    { type: "battery", cx: FWD_BAT_X, cy: 0, label: "Vₛ" },
    { type: "wire", x1: FWD_BAT_X, y1: 0.9, x2: FWD_BAT_X, y2: TOP_Y_F },
    { type: "wire", x1: FWD_BAT_X, y1: -0.9, x2: FWD_BAT_X, y2: GND_Y_F },

    {
      type: "wire",
      x1: FWD_BAT_X,
      y1: TOP_Y_F,
      x2: FWD_AMP_X - 0.45,
      y2: TOP_Y_F,
      color: "red",
    },
    {
      type: "meter",
      cx: FWD_AMP_X,
      cy: TOP_Y_F,
      symbol: "A",
      orient: "h",
      label: "Iᴢ",
    },
    {
      type: "current",
      x1: FWD_BAT_X + 0.1,
      y1: TOP_Y_F,
      x2: FWD_AMP_X - 0.5,
      y2: TOP_Y_F,
    },
    {
      type: "wire",
      x1: FWD_AMP_X + 0.45,
      y1: TOP_Y_F,
      x2: FWD_R1_X - 0.5,
      y2: TOP_Y_F,
      color: "red",
    },
    { type: "resistor", cx: FWD_R1_X, cy: TOP_Y_F, label: "R₁  470Ω" },
    {
      type: "wire",
      x1: FWD_R1_X + 0.5,
      y1: TOP_Y_F,
      x2: FWD_NODE,
      y2: TOP_Y_F,
      color: "red",
    },
    { type: "node", x: FWD_NODE, y: TOP_Y_F },
    {
      type: "wire",
      x1: FWD_NODE,
      y1: TOP_Y_F,
      x2: FWD_ZD_X - 0.38,
      y2: TOP_Y_F,
    },
    { type: "zener", cx: FWD_ZD_X, cy: TOP_Y_F },
    {
      type: "wire",
      x1: FWD_ZD_X + 0.38,
      y1: TOP_Y_F,
      x2: FWD_RIGHT_X,
      y2: TOP_Y_F,
    },
    {
      type: "wire",
      x1: FWD_RIGHT_X,
      y1: TOP_Y_F,
      x2: FWD_RIGHT_X,
      y2: GND_Y_F,
    },
    { type: "wire", x1: FWD_BAT_X, y1: GND_Y_F, x2: FWD_RIGHT_X, y2: GND_Y_F },
    { type: "gnd", cx: FWD_RIGHT_X, cy: GND_Y_F },

    {
      type: "wire",
      x1: VM_CX_F,
      y1: TOP_Y_F,
      x2: VM_CX_F,
      y2: FWD_VM_Y + 0.45,
    },
    {
      type: "meter",
      cx: VM_CX_F,
      cy: FWD_VM_Y,
      symbol: "V",
      orient: "v",
      label: "Vᴢ",
    },
    {
      type: "wire",
      x1: VM_CX_F,
      y1: FWD_VM_Y - 0.45,
      x2: VM_CX_F,
      y2: GND_Y_F,
    },
    { type: "node", x: VM_CX_F, y: GND_Y_F },

    {
      type: "label",
      x: REV_BAT_X + 1.8,
      y: TOP_Y_F + 0.55,
      text: "REVERSE BIAS",
      size: 0.11,
      color: "#555",
    },

    { type: "battery", cx: REV_BAT_X, cy: 0, label: "Vₛ" },
    { type: "wire", x1: REV_BAT_X, y1: 0.9, x2: REV_BAT_X, y2: TOP_Y_F },
    { type: "wire", x1: REV_BAT_X, y1: -0.9, x2: REV_BAT_X, y2: GND_Y_F },

    {
      type: "wire",
      x1: REV_BAT_X,
      y1: TOP_Y_F,
      x2: REV_AMP_X - 0.45,
      y2: TOP_Y_F,
      color: "red",
    },
    {
      type: "meter",
      cx: REV_AMP_X,
      cy: TOP_Y_F,
      symbol: "A",
      orient: "h",
      label: "Iᴢ",
    },
    {
      type: "current",
      x1: REV_BAT_X + 0.1,
      y1: TOP_Y_F,
      x2: REV_AMP_X - 0.5,
      y2: TOP_Y_F,
    },
    {
      type: "wire",
      x1: REV_AMP_X + 0.45,
      y1: TOP_Y_F,
      x2: REV_R1_X - 0.5,
      y2: TOP_Y_F,
      color: "red",
    },
    { type: "resistor", cx: REV_R1_X, cy: TOP_Y_F, label: "R₁  470Ω" },
    {
      type: "wire",
      x1: REV_R1_X + 0.5,
      y1: TOP_Y_F,
      x2: REV_NODE,
      y2: TOP_Y_F,
      color: "red",
    },
    { type: "node", x: REV_NODE, y: TOP_Y_F },

    {
      type: "wire",
      x1: REV_NODE,
      y1: TOP_Y_F,
      x2: REV_ZD_X - 0.38,
      y2: TOP_Y_F,
    },
    { type: "zener", cx: REV_ZD_X, cy: TOP_Y_F },
    {
      type: "label",
      x: REV_ZD_X,
      y: TOP_Y_F - 0.36,
      text: "(reversed)",
      size: 0.085,
      color: "#888",
    },
    {
      type: "wire",
      x1: REV_ZD_X + 0.38,
      y1: TOP_Y_F,
      x2: REV_RIGHT_X,
      y2: TOP_Y_F,
    },

    {
      type: "wire",
      x1: REV_RIGHT_X,
      y1: TOP_Y_F,
      x2: REV_RIGHT_X,
      y2: GND_Y_F,
    },
    { type: "wire", x1: REV_BAT_X, y1: GND_Y_F, x2: REV_RIGHT_X, y2: GND_Y_F },
    { type: "gnd", cx: REV_RIGHT_X, cy: GND_Y_F },

    {
      type: "wire",
      x1: VM_CX_R,
      y1: TOP_Y_F,
      x2: VM_CX_R,
      y2: FWD_VM_Y + 0.45,
    },
    {
      type: "meter",
      cx: VM_CX_R,
      cy: FWD_VM_Y,
      symbol: "V",
      orient: "v",
      label: "Vᴢ",
    },
    {
      type: "wire",
      x1: VM_CX_R,
      y1: FWD_VM_Y - 0.45,
      x2: VM_CX_R,
      y2: GND_Y_F,
    },
    { type: "node", x: VM_CX_R, y: GND_Y_F },
  ],
};

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  schematic: THEORY_SCHEMATIC,
  circuitDiagram,
  paragraphs: [
    "A Zener diode is a heavily-doped PN junction designed to conduct reliably in **reverse breakdown**. " +
      "Two mechanisms cause breakdown: *Zener breakdown* (quantum tunnelling, $V_Z < 5\\,\\text{V}$) and " +
      "*avalanche breakdown* (impact ionisation, $V_Z > 7\\,\\text{V}$). " +
      "The 1N4733A uses both mechanisms at $V_Z = 5.1\\,\\text{V}$.",

    "In **forward bias** it behaves like a normal silicon diode — current rises exponentially above $V_f \\approx 0.65\\,\\text{V}$:" +
      "$$I_Z = I_s\\left(e^{qV/nkT} - 1\\right)$$" +
      "In **reverse pre-breakdown** only leakage $I_s < 1\\,\\mu\\text{A}$ flows. " +
      "At $V = -V_Z$, a sharp breakdown knee occurs and current increases steeply while voltage stays nearly constant.",

    "The **Zener impedance** characterises knee sharpness:" +
      "$$Z_Z = \\frac{\\Delta V_Z}{\\Delta I_Z}$$" +
      "An ideal Zener has $Z_Z = 0$. For the 1N4733A at $I_Z = 20\\,\\text{mA}$, $Z_Z \\approx 7\\,\\Omega$.",

    "The series resistor limits current. At any supply voltage $V_s$:" +
      "$$I_Z = \\frac{V_s - V_Z}{R_S} = \\frac{9 - 5.1}{470} \\approx 8.3\\,\\text{mA}$$",
  ],
};

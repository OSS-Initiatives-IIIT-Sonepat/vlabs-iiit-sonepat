import { type LabSection } from "@/labs/lab-content.types";
import { type SchematicSpec } from "@/labs/TheoryScene";

// ── Shunt-regulator schematic ──────────────────────────────────────────────
//   Vin ── Rs ──┬── Vout ──┬── RL ──┐
//               │          │        │
//               Dz         DMM      │
//               │          │        │
//   GND ────────┴──────────┴────────┘
//
// The Zener symbol is drawn anode-left / cathode-right, so the right-hand
// (top) terminal is the cathode sitting on the output node — reverse biased.

const VIN_X = -3.0;
const RS_X = -1.9;
const NODE_X = -0.6;
const DZ_X = 0.1;
const RL_X = 1.5;
const VOUT_X = 2.9;
const TOP_Y = 1.0;
const GND_Y = -1.3;
const DMM_Y = -0.2;

const THEORY_SCHEMATIC: SchematicSpec = {
  elements: [
    // ── Supply ────────────────────────────────────────────────────────────
    { type: "battery", cx: VIN_X, cy: 0, label: "Vᵢₙ" },
    { type: "wire", x1: VIN_X, y1: 0.9, x2: VIN_X, y2: TOP_Y },
    { type: "wire", x1: VIN_X, y1: -0.9, x2: VIN_X, y2: GND_Y },
    {
      type: "wire",
      x1: VIN_X,
      y1: TOP_Y,
      x2: RS_X - 0.5,
      y2: TOP_Y,
      color: "red",
    },

    // ── Series resistor Rs ────────────────────────────────────────────────
    { type: "resistor", cx: RS_X, cy: TOP_Y, label: "Rs  330 Ω" },
    {
      type: "wire",
      x1: RS_X + 0.5,
      y1: TOP_Y,
      x2: NODE_X,
      y2: TOP_Y,
      color: "red",
    },

    // ── Output / regulator node ───────────────────────────────────────────
    { type: "node", x: NODE_X, y: TOP_Y },
    { type: "wire", x1: NODE_X, y1: TOP_Y, x2: DZ_X - 0.38, y2: TOP_Y },
    { type: "zener", cx: DZ_X, cy: TOP_Y },
    {
      type: "label",
      x: DZ_X,
      y: TOP_Y + 0.42,
      text: "Dz  5.1 V",
      size: 0.1,
      color: "#555",
    },
    { type: "wire", x1: DZ_X + 0.38, y1: TOP_Y, x2: RL_X - 0.5, y2: TOP_Y },
    { type: "wire", x1: RL_X - 0.5, y1: TOP_Y, x2: VOUT_X, y2: TOP_Y },

    // ── Load ──────────────────────────────────────────────────────────────
    { type: "resistor", cx: RL_X, cy: TOP_Y, label: "RL" },
    { type: "wire", x1: VOUT_X, y1: TOP_Y, x2: VOUT_X, y2: GND_Y },
    { type: "wire", x1: VIN_X, y1: GND_Y, x2: VOUT_X, y2: GND_Y },
    { type: "gnd", cx: VOUT_X, cy: GND_Y },

    // ── Voltmeter across the load (Vout) ──────────────────────────────────
    { type: "wire", x1: NODE_X, y1: TOP_Y, x2: NODE_X, y2: DMM_Y + 0.45 },
    {
      type: "meter",
      cx: NODE_X,
      cy: DMM_Y,
      symbol: "V",
      orient: "v",
      label: "Vₒᵤₜ",
    },
    { type: "wire", x1: NODE_X, y1: DMM_Y - 0.45, x2: NODE_X, y2: GND_Y },
    { type: "node", x: NODE_X, y: GND_Y },
  ],
};

export const theory: LabSection = {
  id: "theory",
  type: "text",
  title: "Theory",
  schematic: THEORY_SCHEMATIC,
  paragraphs: [
    "A Zener diode is a heavily doped p-n junction diode designed to operate in the reverse breakdown region. When the reverse voltage reaches the Zener voltage Vz, the diode starts to conduct a large reverse current while the voltage across it stays almost constant. Breakdown below about 5 V is mainly due to the Zener (tunnelling) effect, above about 7 V it is mainly due to avalanche multiplication, and in between both effects act together.",
    "In the shunt regulator circuit a series resistor Rs connects the unregulated input Vin to the output node, and the Zener diode is connected across the load RL with its cathode towards the positive side (reverse biased). The regulated output is Vout = Vz.",
    "Applying Kirchhoff's current law at the output node: IR = IZ + IL, where IR = (Vin − Vz) / Rs is the current through Rs and IL = Vz / RL is the load current. Hence IZ = IR − IL.",
    "If Vin increases, IR increases and the extra current flows through the Zener diode, so Vout changes only slightly. If RL decreases, IL increases and IZ decreases by the same amount while IR stays almost constant, so Vout again stays almost constant. Regulation is maintained only while the Zener diode stays in breakdown, that is, while IZ stays above its minimum value IZ(min) and below its maximum value IZ(max) = Pz(max) / Vz.",
    "The Zener diode is in breakdown only when Vin > Vz (Rs + RL) / RL. For Vz = 5.1 V, Rs = 330 Ω and RL = 1 kΩ this gives Vin(min) = 5.1 × 1330 / 1000 ≈ 6.78 V. Below this input the diode is not conducting and the circuit behaves as a simple voltage divider, Vout = Vin × RL / (Rs + RL).",
    "Choice of Rs: Rs(max) = (Vin(min) − Vz) / (IZ(min) + IL(max)) and Rs(min) = (Vin(max) − Vz) / (IZ(max) + IL(min)). Taking IZ(min) = 1 mA, the worst case in this experiment is Vin = 10 V with RL = 500 Ω (IL = 10.2 mA), which gives Rs(max) = (10 − 5.1) / (1 mA + 10.2 mA) = 437.5 Ω. The chosen Rs = 330 Ω is below this value, so the Zener diode remains in breakdown.",
    "Power check at the largest input of 12 V with RL = 1 kΩ: IR = (12 − 5.1) / 330 ≈ 20.91 mA, the power in Rs is IR² × Rs ≈ 0.144 W (below the 0.25 W rating), and the Zener current is IZ = 20.91 − 5.10 = 15.81 mA, so the Zener power is Vz × IZ ≈ 81 mW (below the 500 mW rating).",
    "Line regulation = ΔVout / ΔVin × 100 % (change in output voltage for a change in input voltage at constant load). Load regulation = (Vout at light load − Vout at heavy load) / Vout at heavy load × 100 %. The smaller these values, the better the regulator. Because a real Zener diode has a small dynamic resistance rz, Vout rises slightly with Vin and falls slightly with load current, and the actual Vz can differ from 5.1 V by the device tolerance of ±5 %.",
  ],
};

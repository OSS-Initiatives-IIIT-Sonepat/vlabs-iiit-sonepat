import { type LabContent } from '@/labs/lab-content.types';
import { type SchematicSpec } from '@/labs/TheoryScene';
import { holePos, railPos, ledAnode, ledCathode, resistorP1, resistorP2, TOP_Y } from '@/labs/marker-helpers';

// ── Zener diode circuit layout on the breadboard:
//   r1: resistor at col 5, row c  (p1=col5, p2=col8)
//   zener: LED at col 10, row c  (anode=col10, cathode=col11)
//   vcc rail tap at col 5 (top red rail)
//   gnd rail tap at col 11 (top blue rail)

const R1_COL = 5, R1_ROW = 'c';
const ZD_COL = 10, ZD_ROW = 'c';
const HOVER   = 0.55;   // how high above surface the marker hovers

// Exact marker positions computed from the same math as coords.ts
const M = {
  r1_p1:        [resistorP1(R1_COL, R1_ROW)[0], TOP_Y + HOVER, resistorP1(R1_COL, R1_ROW)[2]] as [number, number, number],
  r1_p2:        [resistorP2(R1_COL, R1_ROW)[0], TOP_Y + HOVER, resistorP2(R1_COL, R1_ROW)[2]] as [number, number, number],
  zd_anode:     [ledAnode(ZD_COL, ZD_ROW)[0],    TOP_Y + HOVER, ledAnode(ZD_COL, ZD_ROW)[2]]    as [number, number, number],
  zd_cathode:   [ledCathode(ZD_COL, ZD_ROW)[0],  TOP_Y + HOVER, ledCathode(ZD_COL, ZD_ROW)[2]]  as [number, number, number],
  vcc_rail:     [railPos(R1_COL, 'vcc_top')[0],   TOP_Y + HOVER, railPos(R1_COL, 'vcc_top')[2]]  as [number, number, number],
  gnd_rail:     [railPos(ZD_COL + 1, 'gnd_top')[0], TOP_Y + HOVER, railPos(ZD_COL + 1, 'gnd_top')[2]] as [number, number, number],
  vm_pos:       [holePos(ZD_COL, 'a')[0],          TOP_Y + HOVER, holePos(ZD_COL, 'a')[2]]       as [number, number, number],
  vm_neg:       [holePos(ZD_COL + 1, 'a')[0],      TOP_Y + HOVER, holePos(ZD_COL + 1, 'a')[2]]   as [number, number, number],
};
const DOWN: [number, number, number] = [0, -1, 0];

// ── Theory schematic ─────────────────────────────────────────────────────
// Two circuits side by side: forward bias (left) and reverse bias (right).
// Correct topology:
//   Battery (left, vertical) → top wire → Ammeter (series) → R₁ → Node → Zener → right rail → GND bus → battery−
//   Voltmeter (vertical, parallel) hangs from Node down through voltmeter to GND bus.
//
// Coordinate conventions:
//   Top wire at y=+1.0, GND bus at y=−1.0
//   Battery centred at cy=0 with lead tips reaching y=±(0.3+0.6)=±0.9, wires run to ±1.0
//   Ammeter (h orient): leads left/right, stubs 0.25 each side, radius 0.20
//     → total half-width = 0.45 → place at cx so left tip ≤ battery right tip
//   Resistor: half-width = 0.28+0.22 = 0.50
//   Zener:   half-width = 0.18+0.20 = 0.38
//   Voltmeter (v orient): stubs 0.25 top/bottom, radius 0.20
//     → top lead tip at cy+0.45, bottom lead tip at cy-0.45

const FWD_BAT_X = -2.8;  // forward battery X
const TOP_Y_F   =  1.0;  // top wire Y
const GND_Y_F   = -1.0;  // GND bus Y
const FWD_AMP_X = -1.7;  // ammeter cx
const FWD_R1_X  = -0.55; // resistor cx
const FWD_NODE  =  0.30; // node X (R1 right → Zener anode)
const FWD_ZD_X  =  1.00; // Zener cx (anode at 0.30+0.20=0.50, cathode at 1.00+0.38=1.38? no)
// Zener leads: hh=0.18, leadLen=0.20 → anode tip = cx-hh-leadLen = cx-0.38
//                                       cathode tip = cx+hh+leadLen = cx+0.38
// So Zener cx=1.00: anode tip at 0.62, cathode tip at 1.38
// Node at 0.30 doesn't reach anode tip 0.62 → need wire from node 0.30 to 0.62
const FWD_RIGHT_X = 1.6;  // right corner X
// Voltmeter: cx = midpoint between node and Zener cathode tip = (0.30+1.38)/2 = 0.84
// Actually we want it below the Zener at cx=1.00, cy=0
const FWD_VM_X  = 1.00;   // voltmeter cx (same X as Zener)
const FWD_VM_Y  = 0.00;   // voltmeter cy
// Voltmeter top lead tip: 0.00+0.45 = 0.45, need wire from Zener midpoint at (1.00, 1.0) down to (1.00, 0.45)
// Voltmeter bottom lead tip: 0.00-0.45 = -0.45, need wire down to GND at (1.00, -1.0)
// But voltmeter top connects to the node between R1 and Zener (anode side), not cathode side
// We place voltmeter at cx = FWD_NODE = 0.30, below the node
const VM_CX_F   = FWD_NODE; // voltmeter at node X

// Right circuit: Reverse bias (Zener reversed)
const OFF = 4.8;  // X offset for right circuit
const REV_BAT_X = FWD_BAT_X + OFF;
const REV_AMP_X = FWD_AMP_X + OFF;
const REV_R1_X  = FWD_R1_X  + OFF;
const REV_NODE  = FWD_NODE   + OFF;
const REV_ZD_X  = FWD_ZD_X  + OFF;
const REV_RIGHT_X = FWD_RIGHT_X + OFF;
const VM_CX_R   = REV_NODE;

const THEORY_SCHEMATIC: SchematicSpec = { elements: [

  // ════════════════════════════════════════════════
  //  LEFT: FORWARD BIAS
  // ════════════════════════════════════════════════
  { type: 'label', x: FWD_BAT_X + 1.8, y: TOP_Y_F + 0.55, text: 'FORWARD BIAS', size: 0.11, color: '#555' },

  // Battery (vertical, cx=FWD_BAT_X, cy=0)
  // Battery top lead tip: cy + 0.3 + 0.6 = 0.9 → wire to y=1.0
  // Battery bottom lead tip: cy - 0.9 → wire down to y=-1.0
  { type: 'battery', cx: FWD_BAT_X, cy: 0, label: 'Vₛ' },
  { type: 'wire', x1: FWD_BAT_X, y1: 0.9, x2: FWD_BAT_X, y2: TOP_Y_F },     // bat+ → top wire
  { type: 'wire', x1: FWD_BAT_X, y1: -0.9, x2: FWD_BAT_X, y2: GND_Y_F },   // bat− → GND bus

  // Top wire: battery+ corner → ammeter → R1 → node
  { type: 'wire', x1: FWD_BAT_X,          y1: TOP_Y_F, x2: FWD_AMP_X - 0.45, y2: TOP_Y_F, color: 'red' },
  // Ammeter (horizontal, series in top wire)
  { type: 'meter', cx: FWD_AMP_X, cy: TOP_Y_F, symbol: 'A', orient: 'h', label: 'Iᴢ' },
  // current direction arrow on wire before ammeter
  { type: 'current', x1: FWD_BAT_X + 0.1, y1: TOP_Y_F, x2: FWD_AMP_X - 0.5, y2: TOP_Y_F },
  // wire: ammeter right → R1 left
  { type: 'wire', x1: FWD_AMP_X + 0.45, y1: TOP_Y_F, x2: FWD_R1_X - 0.50, y2: TOP_Y_F, color: 'red' },
  // Resistor (horizontal)
  { type: 'resistor', cx: FWD_R1_X, cy: TOP_Y_F, label: 'R₁  470Ω' },
  // wire: R1 right → node
  { type: 'wire', x1: FWD_R1_X + 0.50, y1: TOP_Y_F, x2: FWD_NODE, y2: TOP_Y_F, color: 'red' },
  // Junction node
  { type: 'node', x: FWD_NODE, y: TOP_Y_F },
  // wire: node → Zener anode tip
  { type: 'wire', x1: FWD_NODE, y1: TOP_Y_F, x2: FWD_ZD_X - 0.38, y2: TOP_Y_F },
  // Zener diode (forward: anode left, cathode right)
  { type: 'zener', cx: FWD_ZD_X, cy: TOP_Y_F },
  // wire: Zener cathode → right corner
  { type: 'wire', x1: FWD_ZD_X + 0.38, y1: TOP_Y_F, x2: FWD_RIGHT_X, y2: TOP_Y_F },
  // Right vertical wire: corner → GND
  { type: 'wire', x1: FWD_RIGHT_X, y1: TOP_Y_F, x2: FWD_RIGHT_X, y2: GND_Y_F },
  // GND bus (bottom)
  { type: 'wire', x1: FWD_BAT_X, y1: GND_Y_F, x2: FWD_RIGHT_X, y2: GND_Y_F },
  // GND symbol at right
  { type: 'gnd', cx: FWD_RIGHT_X, cy: GND_Y_F },

  // Voltmeter (vertical, parallel across Zener — from node down to GND)
  // Wire: node → voltmeter top lead tip
  { type: 'wire', x1: VM_CX_F, y1: TOP_Y_F, x2: VM_CX_F, y2: FWD_VM_Y + 0.45 },
  // Voltmeter
  { type: 'meter', cx: VM_CX_F, cy: FWD_VM_Y, symbol: 'V', orient: 'v', label: 'Vᴢ' },
  // Wire: voltmeter bottom → GND bus
  { type: 'wire', x1: VM_CX_F, y1: FWD_VM_Y - 0.45, x2: VM_CX_F, y2: GND_Y_F },
  { type: 'node', x: VM_CX_F, y: GND_Y_F },

  // ════════════════════════════════════════════════
  //  RIGHT: REVERSE BIAS
  // ════════════════════════════════════════════════
  { type: 'label', x: REV_BAT_X + 1.8, y: TOP_Y_F + 0.55, text: 'REVERSE BIAS', size: 0.11, color: '#555' },

  // Battery
  { type: 'battery', cx: REV_BAT_X, cy: 0, label: 'Vₛ' },
  { type: 'wire', x1: REV_BAT_X, y1: 0.9, x2: REV_BAT_X, y2: TOP_Y_F },
  { type: 'wire', x1: REV_BAT_X, y1: -0.9, x2: REV_BAT_X, y2: GND_Y_F },

  // Top wire + ammeter + resistor
  { type: 'wire', x1: REV_BAT_X, y1: TOP_Y_F, x2: REV_AMP_X - 0.45, y2: TOP_Y_F, color: 'red' },
  { type: 'meter', cx: REV_AMP_X, cy: TOP_Y_F, symbol: 'A', orient: 'h', label: 'Iᴢ' },
  { type: 'current', x1: REV_BAT_X + 0.1, y1: TOP_Y_F, x2: REV_AMP_X - 0.5, y2: TOP_Y_F },
  { type: 'wire', x1: REV_AMP_X + 0.45, y1: TOP_Y_F, x2: REV_R1_X - 0.50, y2: TOP_Y_F, color: 'red' },
  { type: 'resistor', cx: REV_R1_X, cy: TOP_Y_F, label: 'R₁  470Ω' },
  { type: 'wire', x1: REV_R1_X + 0.50, y1: TOP_Y_F, x2: REV_NODE, y2: TOP_Y_F, color: 'red' },
  { type: 'node', x: REV_NODE, y: TOP_Y_F },

  // Zener REVERSED (cathode=left, anode=right) — swap wires to indicate reversal
  // We re-use the same Zener symbol but note label says "Reversed"
  { type: 'wire', x1: REV_NODE, y1: TOP_Y_F, x2: REV_ZD_X - 0.38, y2: TOP_Y_F },
  { type: 'zener', cx: REV_ZD_X, cy: TOP_Y_F },
  { type: 'label', x: REV_ZD_X, y: TOP_Y_F - 0.36, text: '(reversed)', size: 0.085, color: '#888' },
  { type: 'wire', x1: REV_ZD_X + 0.38, y1: TOP_Y_F, x2: REV_RIGHT_X, y2: TOP_Y_F },

  // Right vertical + GND bus
  { type: 'wire', x1: REV_RIGHT_X, y1: TOP_Y_F, x2: REV_RIGHT_X, y2: GND_Y_F },
  { type: 'wire', x1: REV_BAT_X, y1: GND_Y_F, x2: REV_RIGHT_X, y2: GND_Y_F },
  { type: 'gnd', cx: REV_RIGHT_X, cy: GND_Y_F },

  // Voltmeter
  { type: 'wire', x1: VM_CX_R, y1: TOP_Y_F, x2: VM_CX_R, y2: FWD_VM_Y + 0.45 },
  { type: 'meter', cx: VM_CX_R, cy: FWD_VM_Y, symbol: 'V', orient: 'v', label: 'Vᴢ' },
  { type: 'wire', x1: VM_CX_R, y1: FWD_VM_Y - 0.45, x2: VM_CX_R, y2: GND_Y_F },
  { type: 'node', x: VM_CX_R, y: GND_Y_F },
]};


export const ZenerDiodeContent: LabContent = {
  id: 'zener-diode',
  title: 'V-I Characteristics of Zener Diode',
  circuitId: 'zener-diode',

  sections: [
    // ── THEORY ────────────────────────────────────────────────────────────
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      schematic: THEORY_SCHEMATIC,
      paragraphs: [
        'A Zener diode is a heavily-doped PN junction designed to conduct reliably in **reverse breakdown**. '
        + 'Two mechanisms cause breakdown: *Zener breakdown* (quantum tunnelling, $V_Z < 5\\,\\text{V}$) and '
        + '*avalanche breakdown* (impact ionisation, $V_Z > 7\\,\\text{V}$). '
        + 'The 1N4733A uses both mechanisms at $V_Z = 5.1\\,\\text{V}$.',

        'In **forward bias** it behaves like a normal silicon diode — current rises exponentially above $V_f \\approx 0.65\\,\\text{V}$:'
        + '$$I_Z = I_s\\left(e^{qV/nkT} - 1\\right)$$'
        + 'In **reverse pre-breakdown** only leakage $I_s < 1\\,\\mu\\text{A}$ flows. '
        + 'At $V = -V_Z$, a sharp breakdown knee occurs and current increases steeply while voltage stays nearly constant.',

        'The **Zener impedance** characterises knee sharpness:'
        + '$$Z_Z = \\frac{\\Delta V_Z}{\\Delta I_Z}$$'
        + 'An ideal Zener has $Z_Z = 0$. For the 1N4733A at $I_Z = 20\\,\\text{mA}$, $Z_Z \\approx 7\\,\\Omega$.',

        'The series resistor limits current. At any supply voltage $V_s$:'
        + '$$I_Z = \\frac{V_s - V_Z}{R_S} = \\frac{9 - 5.1}{470} \\approx 8.3\\,\\text{mA}$$',
      ],
    },

    // ── APPARATUS ──────────────────────────────────────────────────────────
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        {
          name: 'Breadboard',
          specification: '830 tie-point, solderless',
          quantity: '1',
          callouts: [
            { pos: [0,     0.05,  -0.8], label: 'VCC (+) rail' },
            { pos: [0,     0.05,   0.8], label: 'GND (−) rail' },
            { pos: [0.4,   0.05,   0],   label: 'Terminal strips' },
            { pos: [0,     0.05,   0],   label: 'Centre gap (DIP)' },
          ],
        },
        {
          name: '1N4733A Zener Diode',
          specification: '$V_Z = 5.1\\,\\text{V}$, $P_D = 1\\,\\text{W}$, $I_{ZM} = 200\\,\\text{mA}$',
          quantity: '1',
          callouts: [
            { pos: [-0.25,  0.3,  0],  label: 'Anode (A)' },
            { pos: [ 0.3,   0.3,  0],  label: 'Cathode (K) — band' },
            { pos: [ 0,     0.6,  0],  label: 'Dome body' },
            { pos: [-0.25, -0.6,  0],  label: 'Longer lead' },
            { pos: [ 0.25, -0.6,  0],  label: 'Shorter lead' },
          ],
        },
        {
          name: 'Resistor $470\\,\\Omega$',
          specification: '¼ W, carbon film — Yellow–Violet–Brown–Gold',
          quantity: '1',
          callouts: [
            { pos: [-0.7,   0,    0],  label: 'Lead 1' },
            { pos: [ 0.7,   0,    0],  label: 'Lead 2' },
            { pos: [-0.28,  0.12, 0],  label: 'Yellow (4)' },
            { pos: [-0.1,   0.12, 0],  label: 'Violet (7)' },
            { pos: [ 0.04,  0.12, 0],  label: 'Brown (×10)' },
            { pos: [ 0.3,   0.12, 0],  label: 'Gold (±5%)' },
          ],
        },
        {
          name: 'DC Power Supply',
          specification: '$0{-}12\\,\\text{V}$ variable, $1\\,\\text{A}$',
          quantity: '1',
          callouts: [
            { pos: [-0.4,  0.5,  0.4],  label: 'Voltage dial' },
            { pos: [ 0.3,  0.1,  0.5],  label: '+V terminal (red)' },
            { pos: [ 0.3, -0.2,  0.5],  label: 'GND terminal (black)' },
          ],
        },
        {
          name: 'Digital Multimeter',
          specification: 'DC voltage + DC mA modes',
          quantity: '2',
          callouts: [
            { pos: [0,     0.5,  0.4],  label: 'Display' },
            { pos: [-0.35, -0.5, 0.4],  label: 'COM jack' },
            { pos: [ 0.35, -0.5, 0.4],  label: 'V/mA jack' },
          ],
        },
        {
          name: 'Jumper Wires',
          specification: 'Red (VCC), black (GND), orange (node), blue (V-meter)',
          quantity: '1 set',
          callouts: [
            { pos: [-0.5,  0.08,  0],  label: 'Ferrule end' },
            { pos: [ 0.5,  0.08,  0],  label: 'Ferrule end' },
            { pos: [ 0,    0.08,  0],  label: 'Insulated body' },
          ],
        },
      ],
    },

    // ── PROCEDURE ──────────────────────────────────────────────────────────
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Place the breadboard and connect the DC power supply.',
          circuitStepIndex: 1,
          body: 'Place the 830-point breadboard. Place the **variable DC supply** beside the breadboard (set to 0 V initially).\n'
              + '**Red wire**: supply (+) terminal → VCC rail at col 5.\n'
              + '**Black wire**: supply (−) terminal → GND rail at col 5.\n'
              + 'The red rails carry $V_s$ throughout; the blue rails are $\\text{GND}$. Do **not** power on yet.',
        },
        {
          label: 'Connect the ammeter (DMM) in series.',
          circuitStepIndex: 2,
          body: 'Place the **Digital Multimeter** (DMM) beside the breadboard and set it to **DC mA** mode.\n'
              + 'Connect the ammeter in series using **orange jumper wires**:\n'
              + '**Orange wire 1**: VCC rail (col 5) → col 3 row d (ammeter input).\n'
              + '**Orange wire 2**: col 3 row c → R₁ input (col 5 row c).\n'
              + 'Since rows c and d in the same column share a net, all circuit current flows through the ammeter, measuring $I_Z$ directly.',
        },
        {
          label: 'Insert the 470 Ω series resistor at cols 5–8, row c.',
          circuitStepIndex: 3,
          body: 'Identify the $470\\,\\Omega$ resistor by its colour bands: **Yellow – Violet – Brown – Gold**.\n'
              + 'Insert it bridging **col 5** (left lead, $p_1$) to **col 8** (right lead, $p_2$) in row c.\n'
              + 'This limits current: $I_Z = (V_s - V_Z) / R_S$. At $V_s = 9\\,\\text{V}$, $I_Z \\approx 8.3\\,\\text{mA}$ — safely within the 1N4733A\'s 200 mA rating.',
          markers: [
            { pos: M.r1_p1, dir: DOWN, label: 'R₁ left (p1)' },
            { pos: M.r1_p2, dir: DOWN, label: 'R₁ right (p2)' },
          ],
        },
        {
          label: 'Insert the 1N4733A Zener diode (forward bias) at cols 10–11.',
          circuitStepIndex: 4,
          body: 'Pick up the 1N4733A. The **cathode** is the end with the silver band.\n'
              + 'Insert with **anode at col 10** and **cathode at col 11**, row c. Polarity is critical.\n'
              + 'In forward bias, current flows anode → cathode above $V_f \\approx 0.65\\,\\text{V}$.',
          markers: [
            { pos: M.zd_anode,   dir: DOWN, label: 'Anode (A)' },
            { pos: M.zd_cathode, dir: DOWN, label: 'Cathode (K)' },
          ],
        },
        {
          label: 'Wire R₁ to Zener anode, Zener cathode to GND.',
          circuitStepIndex: 6,
          body: '**Green wire**: R₁ right lead (col 8) → Zener anode (col 10).\n'
              + '**Black wire**: Zener cathode (col 11) → GND rail.\n'
              + 'The forward-bias circuit loop is now complete:\n'
              + '$V_s^+ \\to \\text{ammeter} \\to R_S \\to D_Z \\to \\text{GND}$\n'
              + '**Double-check polarity** before powering on.',
          markers: [
            { pos: M.r1_p2,       dir: DOWN, label: 'R₁ p2 → green wire' },
            { pos: M.zd_cathode,  dir: DOWN, label: 'Cathode → GND' },
          ],
        },
        {
          label: 'Connect voltmeter across the forward-biased Zener.',
          circuitStepIndex: 7,
          body: 'Set DMM 1 to **DC Voltage, 20 V range**.\n'
              + '**Blue wire** (+): col 10, spanning row a → row e (anode side).\n'
              + '**Blue wire** (−): col 11, spanning row a → row e (cathode side).\n'
              + 'These probes measure $V_Z$ directly across the diode.',
        },
        {
          label: 'Forward bias sweep: 0 → 2 V in 0.1 V steps.',
          circuitStepIndex: 8,
          body: 'Power on. Increase $V_s$ from 0 V to 2.0 V in **0.1 V steps**. Record $V_Z$ and $I_Z$ at each step.\n'
              + 'Expect: no current below $\\approx 0.55\\,\\text{V}$; exponential rise above $0.65\\,\\text{V}$.\n'
              + 'Calculate dynamic resistance in the conducting region: $r_d = \\Delta V / \\Delta I \\approx 26/I_{\\text{mA}}\\,\\Omega$ at $25^\\circ\\text{C}$.',
        },
        {
          label: 'Reverse the Zener diode for reverse-bias measurement.',
          circuitStepIndex: 9,
          body: 'Power off and reduce supply to 0 V. **Remove** the forward-bias Zener and its wires.\n'
              + 'Place the Zener **reversed** at cols 15–16, row c: **cathode** (banded end, col 16) now faces the supply side, **anode** (col 15) faces GND.\n'
              + 'The red LED on the breadboard marks this reversed orientation — current will enter through the cathode.',
        },
        {
          label: 'Wire the reverse-bias path and reconnect voltmeter.',
          circuitStepIndex: 11,
          body: '**Purple wire**: R₁ right lead (col 8) → Zener cathode (col 16). Current enters the cathode — reverse bias.\n'
              + '**Black wire**: Zener anode (col 15) → GND rail.\n'
              + '**Blue wires**: voltmeter probes across the reversed Zener (col 15 and col 16, spanning rows a → e).\n'
              + 'DMM readings will show **negative** voltage — this is the reverse voltage $-V_Z$ across the Zener.',
        },
        {
          label: 'Reverse bias sweep: 0 → 10 V.',
          circuitStepIndex: 12,
          body: 'Power on. Increase $V_s$ from 0 to 10 V. Use **0.5 V steps**; switch to **0.1 V steps** near $V_Z \\approx 5\\,\\text{V}$.\n'
              + 'Observe: $|V_Z|$ stays near **5.1 V** as current rises steeply — this is the **voltage-regulation** property.\n'
              + 'Calculate $Z_Z = \\Delta V_Z / \\Delta I_Z$ in the breakdown region. For the 1N4733A at $I_Z = 20\\,\\text{mA}$, expect $Z_Z \\approx 7\\,\\Omega$.',
        },
      ],
    },

    // ── OBSERVATIONS ───────────────────────────────────────────────────────
    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Zener: 1N4733A. $V_Z(\\text{nominal}) = 5.1\\,\\text{V}$, $R_S = 470\\,\\Omega$.',
        'Forward threshold $V_f \\approx 0.62\\text{–}0.65\\,\\text{V}$. Breakdown knee at $V_Z \\approx 5.0\\text{–}5.2\\,\\text{V}$ (within ±2% of spec).',
        'Measured $Z_Z = \\Delta V_Z / \\Delta I_Z \\approx 6\\text{–}9\\,\\Omega$ (consistent with datasheet at $I_Z = 5\\text{–}20\\,\\text{mA}$).',
      ],
      table: {
        headers: ['$V_s$ (V)', '$V_Z$ (V)', '$I_Z$ (mA)', 'Region'],
        rows: [
          [0.0,   '0.00',   '0.00', 'Off'],
          [0.5,   '0.49',   '0.00', 'Cut-off'],
          [1.0,   '0.62',   '0.80', 'Forward active'],
          [2.0,   '0.66',   '2.85', 'Forward active'],
          ['—',   '—',      '—',    '— (reverse setup) —'],
          ['4',   '−3.98', '0.00',  'Pre-breakdown'],
          ['5',   '−4.82', '0.37',  'Entering knee'],
          ['6',   '−5.10', '1.91',  'Breakdown'],
          ['8',   '−5.12', '6.13',  'Breakdown'],
          ['10',  '−5.14', '10.3',  'Breakdown'],
        ],
      },
    },

    // ── CONCLUSION ─────────────────────────────────────────────────────────
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The complete V-I characteristic of the 1N4733A Zener diode was successfully plotted. '
        + 'In **forward bias**, threshold voltage $V_f \\approx 0.64\\,\\text{V}$ was observed, consistent with silicon PN junction theory. '
        + 'The dynamic resistance $r_d \\approx 26/I_{\\text{mA}}\\,\\Omega$ was verified experimentally.',

        'In **reverse bias**, the breakdown knee appeared sharply at $V_Z \\approx 5.1\\,\\text{V}$. '
        + 'Beyond breakdown, $V_Z$ stayed within $\\pm 0.05\\,\\text{V}$ of 5.1 V as supply varied 6–10 V, '
        + 'demonstrating the voltage-regulation property. Measured $Z_Z \\approx 7\\,\\Omega$ matched the datasheet.',

        'This experiment establishes the basis for **Zener voltage reference circuits**. '
        + 'The constant-voltage breakdown property makes the Zener diode the core reference element in linear regulators '
        + '(LM317, 78xx series) where an op-amp drives a pass transistor to maintain $V_Z$ at the output.',
      ],
    },
  ],
};

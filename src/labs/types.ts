// ── Rows / columns ────────────────────────────────────────────────────────
export type Row = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j';

// ── Mount point ───────────────────────────────────────────────────────────
export type MountPoint = { board: string; col: number; row: Row };

// ── Colour types ──────────────────────────────────────────────────────────
export type LedColor  = 'red' | 'green' | 'yellow' | 'blue' | 'white';
export type WireColor = 'red' | 'black' | 'yellow' | 'green' | 'blue' | 'orange' | 'white' | 'purple';

// ── Typed pin references — no string parsing ──────────────────────────────
export type TiePin    = { board: string; col: number; row: Row };
export type RailPin   = { board: string; rail: 'vcc_top' | 'gnd_top' | 'vcc_bot' | 'gnd_bot'; col: number };
export type IcPin     = { ic: string; pin: string };   // pin is any named pin on the IC
export type PassivePin= { component: string; end: 'p1' | 'p2' };
export type LedPin    = { led: string; end: 'anode' | 'cathode' };

export type PinRef = TiePin | RailPin | IcPin | PassivePin | LedPin;

// ── Component instances ───────────────────────────────────────────────────
// Every physical component placed on the breadboard.
// Each type maps directly to a DigitalJS cell with breadboard coordinates.

export type ComponentInstance =

  // ── Board / structure ──────────────────────────────────────────────────
  | { id: string; type: 'breadboard' }
  | { id: string; type: 'wire'; from: PinRef; to: PinRef; color: WireColor }

  // ── Passives ───────────────────────────────────────────────────────────
  | { id: string; type: 'resistor';   ohms: number;        mountedAt: MountPoint }
  | { id: string; type: 'capacitor';  capacitance: number; mountedAt: MountPoint }
  | { id: string; type: 'inductor';   henrys: number;      mountedAt: MountPoint }
  | { id: string; type: 'led';        color: LedColor;     mountedAt: MountPoint }
  | { id: string; type: 'diode';      mountedAt: MountPoint }        // 1N4148, general signal diode
  | { id: string; type: 'zener';      vz: number;          mountedAt: MountPoint } // Zener diode

  // ── Active: BJT ───────────────────────────────────────────────────────
  | { id: string; type: 'npn-bjt';    mountedAt: MountPoint }  // BC547, pins: B, C, E
  | { id: string; type: 'pnp-bjt';    mountedAt: MountPoint }  // BC557, pins: B, C, E

  // ── Active: MOSFET ────────────────────────────────────────────────────
  | { id: string; type: 'n-mosfet';   mountedAt: MountPoint }  // 2N7000, pins: G, D, S
  | { id: string; type: 'p-mosfet';   mountedAt: MountPoint }

  // ── Logic gates — combinational (DigitalJS: gates.mjs) ────────────────
  // DIP-14, straddling centre gap at mountedAt.col
  | { id: string; type: 'not-gate';   mountedAt: MountPoint }  // 74HC04
  | { id: string; type: 'and-gate';   mountedAt: MountPoint }  // 74HC08
  | { id: string; type: 'or-gate';    mountedAt: MountPoint }  // 74HC32
  | { id: string; type: 'nand-gate';  mountedAt: MountPoint }  // 74HC00
  | { id: string; type: 'nor-gate';   mountedAt: MountPoint }  // 74HC02
  | { id: string; type: 'xor-gate';   mountedAt: MountPoint }  // 74HC86
  | { id: string; type: 'xnor-gate';  mountedAt: MountPoint }  // 74HC266
  | { id: string; type: 'buffer-gate';mountedAt: MountPoint }  // 74HC125 / non-inverting buffer

  // ── Reducing gates — N-bit input → 1-bit output (DigitalJS: gates.mjs) ─
  | { id: string; type: 'and-reduce';  bits: number; mountedAt: MountPoint }
  | { id: string; type: 'or-reduce';   bits: number; mountedAt: MountPoint }
  | { id: string; type: 'nand-reduce'; bits: number; mountedAt: MountPoint }
  | { id: string; type: 'nor-reduce';  bits: number; mountedAt: MountPoint }
  | { id: string; type: 'xor-reduce';  bits: number; mountedAt: MountPoint }
  | { id: string; type: 'xnor-reduce'; bits: number; mountedAt: MountPoint }

  // ── Arithmetic (DigitalJS: arith.mjs) ────────────────────────────────
  // 74HC283: 4-bit binary adder, DIP-16
  | { id: string; type: 'adder-4bit';  mountedAt: MountPoint }  // 74HC283
  // Generic multi-bit adder (virtual / ALU module)
  | { id: string; type: 'adder';       bits: number; signed?: boolean; mountedAt: MountPoint }
  | { id: string; type: 'subtractor';  bits: number; signed?: boolean; mountedAt: MountPoint }
  | { id: string; type: 'multiplier';  bits: { in1: number; in2: number; out: number }; mountedAt: MountPoint }
  | { id: string; type: 'negator';     bits: number; mountedAt: MountPoint }

  // ── Comparators (DigitalJS: arith.mjs) ──────────────────────────────
  | { id: string; type: 'compare-eq';  bits: number; signed?: boolean; mountedAt: MountPoint }
  | { id: string; type: 'compare-ne';  bits: number; signed?: boolean; mountedAt: MountPoint }
  | { id: string; type: 'compare-lt';  bits: number; signed?: boolean; mountedAt: MountPoint }
  | { id: string; type: 'compare-le';  bits: number; signed?: boolean; mountedAt: MountPoint }
  | { id: string; type: 'compare-gt';  bits: number; signed?: boolean; mountedAt: MountPoint }
  | { id: string; type: 'compare-ge';  bits: number; signed?: boolean; mountedAt: MountPoint }

  // ── Shifters (DigitalJS: arith.mjs) ─────────────────────────────────
  | { id: string; type: 'shift-left';  bits: { in: number; amount: number; out: number }; signed?: boolean; mountedAt: MountPoint }
  | { id: string; type: 'shift-right'; bits: { in: number; amount: number; out: number }; signed?: boolean; mountedAt: MountPoint }

  // ── Multiplexers (DigitalJS: mux.mjs) ────────────────────────────────
  // 74HC153: Dual 4:1 MUX, DIP-16
  | { id: string; type: 'mux-4to1';    mountedAt: MountPoint }  // 74HC153
  // 74HC157: Quad 2:1 MUX, DIP-16
  | { id: string; type: 'mux-2to1-ic'; mountedAt: MountPoint }  // 74HC157
  // Generic N:1 MUX (virtual)
  | { id: string; type: 'mux';         bits: { in: number; sel: number }; mountedAt: MountPoint }
  // 74HC139: Dual 2:4 DEMUX, DIP-16
  | { id: string; type: 'demux-1to4';  mountedAt: MountPoint }  // 74HC139
  // 74HC138: 3:8 DEMUX, DIP-16
  | { id: string; type: 'demux-1to8';  mountedAt: MountPoint }  // 74HC138

  // ── Encoders / Decoders ────────────────────────────────────────────────
  // 74HC148: Priority encoder 8:3, DIP-16
  | { id: string; type: 'encoder-8to3'; mountedAt: MountPoint }  // 74HC148
  // 74HC138 also used as decoder
  | { id: string; type: 'decoder-3to8'; mountedAt: MountPoint }  // 74HC138

  // ── Sequential: D flip-flop (DigitalJS: dff.mjs) ─────────────────────
  // 74HC74: Dual D flip-flop, DIP-14
  | { id: string; type: 'dff';   bits?: number; initial?: string; mountedAt: MountPoint }  // 74HC74
  // 74HC76: Dual JK flip-flop, DIP-16
  | { id: string; type: 'jk-ff'; mountedAt: MountPoint }   // 74HC76
  // 74HC279: SR latch quad, DIP-16
  | { id: string; type: 'sr-latch'; mountedAt: MountPoint }  // 74HC279

  // ── Counters (sequential) ─────────────────────────────────────────────
  // 74HC93: 4-bit async counter, DIP-14
  | { id: string; type: 'counter-4bit-async'; mountedAt: MountPoint }  // 74HC93
  // 74HC161: 4-bit sync counter, DIP-16
  | { id: string; type: 'counter-4bit-sync';  mountedAt: MountPoint }  // 74HC161

  // ── Registers ─────────────────────────────────────────────────────────
  // 74HC173: 4-bit register, DIP-16
  | { id: string; type: 'register-4bit'; mountedAt: MountPoint }  // 74HC173
  // 74HC273: 8-bit register, DIP-20
  | { id: string; type: 'register-8bit'; mountedAt: MountPoint }  // 74HC273
  // 74HC374: 8-bit register (3-state), DIP-20
  | { id: string; type: 'register-8bit-tri'; mountedAt: MountPoint }  // 74HC374

  // ── Bus / buffer ICs ──────────────────────────────────────────────────
  // 74HC245: 8-bit bus transceiver, DIP-20
  | { id: string; type: 'bus-transceiver'; mountedAt: MountPoint }  // 74HC245
  // 74HC373: 8-bit latch (address latch), DIP-20
  | { id: string; type: 'address-latch';   mountedAt: MountPoint }  // 74HC373

  // ── Bus operations (virtual, DigitalJS: bus.mjs) ──────────────────────
  | { id: string; type: 'zero-extend'; extend: { input: number; output: number }; mountedAt: MountPoint }
  | { id: string; type: 'sign-extend'; extend: { input: number; output: number }; mountedAt: MountPoint }
  | { id: string; type: 'bus-slice';   slice: { first: number; count: number; total: number }; mountedAt: MountPoint }
  | { id: string; type: 'bus-group';   groups: number[]; mountedAt: MountPoint }
  | { id: string; type: 'bus-ungroup'; groups: number[]; mountedAt: MountPoint }

  // ── Op-amp (DigitalJS: io.mjs analog extension) ──────────────────────
  // LM741: DIP-8
  | { id: string; type: 'op-amp';      mountedAt: MountPoint }  // LM741

  // ── Input / Output nodes (DigitalJS: io.mjs) ─────────────────────────
  | { id: string; type: 'input-node';  bits?: number; net: string; mountedAt: MountPoint }
  | { id: string; type: 'output-node'; bits?: number; net: string; mountedAt: MountPoint }
  | { id: string; type: 'constant';    value: string; mountedAt: MountPoint }  // fixed logic level
  | { id: string; type: 'clock';       period?: number; mountedAt: MountPoint }  // square wave

  // ── Display ───────────────────────────────────────────────────────────
  | { id: string; type: '7seg-display'; mountedAt: MountPoint }  // 7-segment display
  | { id: string; type: 'rgb-led';      mountedAt: MountPoint }  // RGB LED

  // ── Microprocessor / interfacing ──────────────────────────────────────
  | { id: string; type: 'cpu-8085';    mountedAt: MountPoint }   // 8085
  | { id: string; type: 'ppi-8255';    mountedAt: MountPoint }   // 8255 PPI

  // ── Power / misc ──────────────────────────────────────────────────────
  | { id: string; type: 'potentiometer'; mountedAt: MountPoint;
      /** Probe wire target holes — resolved to Vector3 by LabScene */
      probes?: [PinRef, PinRef] }
  | { id: string; type: 'push-button';   mountedAt: MountPoint }
  | { id: string; type: 'switch';        mountedAt: MountPoint }
  | { id: string; type: 'battery';       mountedAt: MountPoint;
      /** Terminal wire targets [+, −] — resolved to Vector3 by LabScene */
      terminals?: [PinRef, PinRef] }
  | { id: string; type: 'dc-jack';       mountedAt: MountPoint;
      /** Terminal wire targets [+, −] — resolved to Vector3 by LabScene */
      terminals?: [PinRef, PinRef] }
  | { id: string; type: 'dip-switch';    poles: number; mountedAt: MountPoint };

// ── Step ─────────────────────────────────────────────────────────────────
export type Step = {
  title: string;
  body: string;
  show: string[];
  highlight?: string;
  activeInputs?: Record<string, 0 | 1>;
  /** Analog: supply voltage in volts for this step */
  supplyVoltage?: number;
  /** Analog: instrument readings to display. Key = component id, value = display string */
  readings?: Record<string, string>;
  /** Analog: LED brightness 0.0–1.0. Key = LED component id */
  ledBrightness?: Record<string, number>;
};

// ── Truth table ───────────────────────────────────────────────────────────
export type TruthTableRow = {
  inputs:  Record<string, 0 | 1>;
  outputs: Record<string, 0 | 1>;
};

export type TruthTable = {
  inputs:  string[];
  outputs: string[];
  rows:    TruthTableRow[];
};

// ── Circuit ───────────────────────────────────────────────────────────────
export type Circuit = {
  id:          string;
  title:       string;
  description: string;
  components:  ComponentInstance[];
  steps:       Step[];
  truthTable?: TruthTable;
};

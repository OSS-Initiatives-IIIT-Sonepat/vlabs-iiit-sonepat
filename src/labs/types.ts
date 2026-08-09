// ── Rows / columns ────────────────────────────────────────────────────────
export type Row = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j';

// ── Typed pin reference — no string parsing ───────────────────────────────
// Every wire endpoint is a strongly-typed PinRef, not a free-form string.
export type TiePin = { board: string; col: number; row: Row };
export type RailPin = { board: string; rail: 'vcc_top' | 'gnd_top' | 'vcc_bot' | 'gnd_bot'; col: number };
export type IcPin   = { ic: string; pin: 'A' | 'B' | 'Y' | '1A' | '1B' | '1Y' | '2A' | '2B' | '2Y' };
export type PassivePin = { component: string; end: 'p1' | 'p2' };
export type LedPin  = { led: string; end: 'anode' | 'cathode' };

export type PinRef = TiePin | RailPin | IcPin | PassivePin | LedPin;

// ── Mount point ───────────────────────────────────────────────────────────
export type MountPoint = { board: string; col: number; row: Row };

// ── Colour types ──────────────────────────────────────────────────────────
export type LedColor   = 'red' | 'green' | 'yellow' | 'blue';
export type WireColor  = 'red' | 'black' | 'yellow' | 'green' | 'blue' | 'orange' | 'white';

// ── Component instances ───────────────────────────────────────────────────
// Every component used in a Circuit must be listed here.
// This is the contract between circuit authors and the renderer.

export type ComponentInstance =
  // ── Passive / structural ──────────────────────────────────────────────
  | { id: string; type: 'breadboard' }
  | { id: string; type: 'wire';        from: PinRef; to: PinRef; color: WireColor }
  // ── Through-hole passives ──────────────────────────────────────────────
  | { id: string; type: 'resistor';    ohms: number;       mountedAt: MountPoint }
  | { id: string; type: 'capacitor';   capacitance: number; mountedAt: MountPoint }
  | { id: string; type: 'led';         color: LedColor;    mountedAt: MountPoint }
  // ── ICs ───────────────────────────────────────────────────────────────
  | { id: string; type: 'xor-gate';   mountedAt: MountPoint }
  | { id: string; type: 'and-gate';   mountedAt: MountPoint }
  | { id: string; type: 'or-gate';    mountedAt: MountPoint }
  | { id: string; type: 'not-gate';   mountedAt: MountPoint }
  | { id: string; type: 'nand-gate';  mountedAt: MountPoint }
  | { id: string; type: 'nor-gate';   mountedAt: MountPoint }
  // ── Control / input ───────────────────────────────────────────────────
  | { id: string; type: 'potentiometer'; mountedAt: MountPoint }
  | { id: string; type: 'push-button';   mountedAt: MountPoint }
  | { id: string; type: 'switch';        mountedAt: MountPoint }
  // ── Power ────────────────────────────────────────────────────────────
  | { id: string; type: 'battery';     mountedAt: MountPoint }
  | { id: string; type: 'dc-jack';     mountedAt: MountPoint };

// ── Step ─────────────────────────────────────────────────────────────────
export type Step = {
  title: string;
  body: string;
  // Cumulative: all component ids visible at this step
  show: string[];
  // Optional: id to spotlight / pulse this step
  highlight?: string;
  // Optional: input state to show on the I/O panel
  activeInputs?: Record<string, 0 | 1>;
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

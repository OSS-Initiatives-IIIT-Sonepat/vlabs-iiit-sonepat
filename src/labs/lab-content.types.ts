import { type StepMarker } from '@/labs/LabScene';
import { type SchematicSpec } from '@/labs/TheoryScene';

// ── Lab content types ──────────────────────────────────────────────────────
// Sections are displayed in the sidebar in order.

export type LabSection =
  | TheorySection
  | ApparatusSection
  | ProcedureSection
  | ObservationSection
  | ConclusionSection
  | CodeLabSection
  | SimulationSection;

export type CodeLabSection = {
  id: string;
  type: 'code-lab';
  title: string;
  language: '8085';
  starterCode: string;
  description: string;
  memoryInit?: Record<string, number>;
  expectedOutputs?: string;
};

export type SimulationSection = {
  id: string;
  type: 'simulation';
  title: string;
  simType: 'alu' | 'memory' | 'cache-direct' | 'cache-assoc' | 'cpu' | 'fsm';
  description?: string;
};

// Theory: paragraphs with optional inline math ($$...$$ blocks) + 3D schematic spec
export type TheorySection = {
  id: string;
  type: 'text';
  title: string;
  /** Each paragraph may contain $$...$$ for display math and $...$ for inline math */
  paragraphs: string[];
  /** Schematic spec rendered in the Three.js TheoryScene (2D symbols, same canvas) */
  schematic?: SchematicSpec;
};

// Apparatus: list of items — rendered as 3D slider in ApparatusScene
export type ApparatusSection = {
  id: string;
  type: 'apparatus';
  title: string;
  items: ApparatusItem[];
};

// Procedure: steps that drive the 3D scene
export type ProcedureSection = {
  id: string;
  type: 'procedure';
  title: string;
  steps: ProcedureStep[];
};

// Observation: data paragraphs + optional table
export type ObservationSection = {
  id: string;
  type: 'observation';
  title: string;
  paragraphs: string[];
  table?: ObservationTable;
};

// Conclusion: summary paragraphs
export type ConclusionSection = {
  id: string;
  type: 'conclusion';
  title: string;
  paragraphs: string[];
};

export type ApparatusCallout = {
  /** 3D world-space position to point at [x, y, z] */
  pos: [number, number, number];
  /** Label text (supports MathText syntax) */
  label: string;
};

export type ApparatusItem = {
  name: string;
  specification?: string;
  quantity?: string;
  /**
   * 3D callout labels shown in ApparatusScene pointing to parts of the component.
   * World space is local to the model (centred at origin).
   */
  callouts?: ApparatusCallout[];
};

export type ProcedureStep = {
  /** Short label shown truncated in the sidebar sub-list */
  label: string;
  /** Full instruction shown in the floating card.
   *  May contain $$...$$ display math and $...$ inline math. */
  body: string;
  /**
   * Which circuit.steps[] index to show in the 3D scene for this step.
   * Defaults to the procedure step's own index (0-based).
   */
  circuitStepIndex?: number;
  /**
   * Pre-placement markers shown BEFORE this step's parts are seated.
   * Each marker shows a bobbing arrow cone pointing to the insertion point
   * — exactly like the bob-the-builder screw pointers.
   */
  markers?: StepMarker[];
};

export type ObservationTable = {
  headers: string[];
  rows: (string | number)[][];
};

export type LabContent = {
  id: string;
  title: string;
  /** Circuit id for the 3D scene */
  circuitId?: string;
  /**
   * Lab rendering mode.
   * - 'breadboard' (default): interactive 3D breadboard scene
   * - 'text': text/theory-only lab — no breadboard scene rendered
   * - 'code': code editor / programming lab
   * - 'simulation': circuit simulation without physical breadboard
   */
  labType?: 'breadboard' | 'text' | 'code' | 'simulation';
  sections: LabSection[];
};

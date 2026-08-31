// ── Circuit Builder ─────────────────────────────────────────────────────────
//
// Fluent API for defining circuits without manual column math or
// cumulative show-array management.
//
// Usage:
//   import { CB } from '@/labs/builder';
//
//   export const MyCircuit = new CB('my-id', 'My Title', 'Description')
//     .board()
//     .resistor('r1', 470, 5, 'c')
//     .led('led1', 'green', 10, 'c')
//     .wireVcc('w_vcc', 5)                        // VCC rail → col 5
//     .wireGnd('w_gnd', { led: 'led1', end: 'cathode' })
//     .wire('w_r1_led', 'green', { component: 'r1', end: 'p2' }, { led: 'led1', end: 'anode' })
//     .step('Place breadboard', 'Red rails = VCC.').show('bb')
//     .step('Place resistor', 'Insert R1.').show('r1').highlight('r1')
//     .step('Power on', 'Sweep voltage.').show('led1').power({ Vcc: 1 }).glow('led1', 0.8)
//     .build();

import {
  type Circuit,
  type ComponentInstance,
  type Step,
  type PinRef,
  type Row,
  type WireColor,
  type LedColor,
} from '@/labs/types';

// ── Step builder ─────────────────────────────────────────────────────────
class StepBuilder {
  private _title: string;
  private _body: string;
  private _show: string[];
  private _highlight?: string;
  private _activeInputs?: Record<string, 0 | 1>;
  private _supplyVoltage?: number;
  private _readings?: Record<string, string>;
  private _ledBrightness?: Record<string, number>;
  private _prev: string[];        // previous step's show (for cumulative builds)
  private _parent: CB;

  constructor(title: string, body: string, prev: string[], parent: CB) {
    this._title = title;
    this._body  = body;
    this._prev  = [...prev];
    this._show  = [...prev];
    this._parent = parent;
  }

  /** Add component IDs to show (cumulative — previous step's IDs are included). */
  show(...ids: string[]): this {
    for (const id of ids) {
      if (!this._show.includes(id)) this._show.push(id);
    }
    return this;
  }

  /** Highlight a component in this step. */
  highlight(id: string): this { this._highlight = id; return this; }

  /** Set activeInputs for simulation (digital) or to trigger analog LED glow. */
  power(inputs: Record<string, 0 | 1>): this { this._activeInputs = inputs; return this; }

  /** Set instrument readings for this step (key = instrument component id). */
  reading(id: string, value: string): this {
    this._readings = { ...(this._readings ?? {}), [id]: value };
    return this;
  }

  /** Set LED brightness for this step (0.0–1.0). */
  glow(id: string, brightness: number): this {
    this._ledBrightness = { ...(this._ledBrightness ?? {}), [id]: brightness };
    return this;
  }

  /** Supply voltage for analog steps. */
  supply(v: number): this { this._supplyVoltage = v; return this; }

  /** Chain to the next step (returns the CB so you can call .step() again). */
  then(): CB { return this._parent; }

  _toStep(): Step {
    return {
      title:          this._title,
      body:           this._body,
      show:           this._show,
      ...(this._highlight     && { highlight:     this._highlight }),
      ...(this._activeInputs  && { activeInputs:  this._activeInputs }),
      ...(this._supplyVoltage !== undefined && { supplyVoltage: this._supplyVoltage }),
      ...(this._readings      && { readings:      this._readings }),
      ...(this._ledBrightness && { ledBrightness: this._ledBrightness }),
    };
  }

  _getShow(): string[] { return this._show; }
}

// ── Circuit builder ───────────────────────────────────────────────────────
export class CB {
  private _id:          string;
  private _title:       string;
  private _description: string;
  private _components:  ComponentInstance[] = [];
  private _stepBuilders: StepBuilder[] = [];

  constructor(id: string, title: string, description: string) {
    this._id          = id;
    this._title       = title;
    this._description = description;
  }

  // ── Component helpers ─────────────────────────────────────────────────

  /** Add the breadboard (always first). */
  board(id = 'bb'): this {
    this._components.push({ id, type: 'breadboard' });
    return this;
  }

  /** Resistor at (col, row). Spans p1=col, p2=col+3. */
  resistor(id: string, ohms: number, col: number, row: Row): this {
    this._components.push({ id, type: 'resistor', ohms, mountedAt: { board: 'bb', col, row } });
    return this;
  }

  /** LED at (col, row). Anode=col, cathode=col+1. */
  led(id: string, color: LedColor, col: number, row: Row): this {
    this._components.push({ id, type: 'led', color, mountedAt: { board: 'bb', col, row } });
    return this;
  }

  /** Capacitor at (col, row). */
  capacitor(id: string, capacitance: number, col: number, row: Row): this {
    this._components.push({ id, type: 'capacitor', capacitance, mountedAt: { board: 'bb', col, row } });
    return this;
  }

  /** Gate IC at (col, row='e'). type = 'and-gate' | 'or-gate' | 'not-gate' etc. */
  gate(id: string, type: ComponentInstance['type'], col: number, row: Row = 'e'): this {
    this._components.push({ id, type, mountedAt: { board: 'bb', col, row } } as ComponentInstance);
    return this;
  }

  /**
   * DC Power Supply placed behind the board.
   * terminals: [vcc target PinRef, gnd target PinRef]
   */
  psu(id: string, terminals?: [PinRef, PinRef]): this {
    this._components.push({
      id, type: 'dc-jack', mountedAt: { board: 'bb', col: 1, row: 'a' },
      ...(terminals && { terminals }),
    } as ComponentInstance);
    return this;
  }

  /**
   * Digital Multimeter placed behind the board.
   * probes: [probe1 target PinRef, probe2 target PinRef]
   */
  dmm(id: string, probes?: [PinRef, PinRef]): this {
    this._components.push({
      id, type: 'potentiometer', mountedAt: { board: 'bb', col: 1, row: 'b' },
      ...(probes && { probes }),
    } as ComponentInstance);
    return this;
  }

  /** Generic wire between two PinRefs. */
  wire(id: string, color: WireColor, from: PinRef, to: PinRef): this {
    this._components.push({ id, type: 'wire', color, from, to });
    return this;
  }

  /** Wire from VCC rail at (col) to a target PinRef. */
  wireVcc(id: string, target: PinRef | number, color: WireColor = 'red'): this {
    const to: PinRef = typeof target === 'number'
      ? { board: 'bb', rail: 'vcc_top', col: target }
      : target;
    this._components.push({
      id, type: 'wire', color,
      from: { board: 'bb', rail: 'vcc_top', col: typeof target === 'number' ? target : 1 },
      to,
    });
    return this;
  }

  /** Wire from a PinRef to GND rail at (col). */
  wireGnd(id: string, from: PinRef, col?: number, color: WireColor = 'black'): this {
    this._components.push({
      id, type: 'wire', color, from,
      to: { board: 'bb', rail: 'gnd_top', col: col ?? 1 },
    });
    return this;
  }

  /** Wire from resistor p2 to LED anode. */
  wireResistorToLed(id: string, resistorId: string, ledId: string, color: WireColor = 'green'): this {
    return this.wire(id, color, { component: resistorId, end: 'p2' }, { led: ledId, end: 'anode' });
  }

  /** Wire from LED cathode to GND rail. */
  wireLedToGnd(id: string, ledId: string, col: number, color: WireColor = 'black'): this {
    return this.wire(id, color, { led: ledId, end: 'cathode' }, { board: 'bb', rail: 'gnd_top', col });
  }

  /** Wire from IC output to resistor p1. */
  wireIcToResistor(id: string, icId: string, pin: string, resistorId: string, color: WireColor): this {
    return this.wire(id, color, { ic: icId, pin }, { component: resistorId, end: 'p1' });
  }

  // ── Raw component push (escape hatch) ─────────────────────────────────
  /** Push any raw ComponentInstance directly. */
  add(inst: ComponentInstance): this {
    this._components.push(inst);
    return this;
  }

  // ── Step helpers ──────────────────────────────────────────────────────

  /**
   * Add a step. Returns a StepBuilder — call .show(), .highlight(), .power() etc.
   * Show arrays are cumulative: each step includes all previous IDs automatically.
   * Call .then() or chain another .step() on the parent to continue.
   *
   * @example
   * builder
   *   .step('Place board', '...').show('bb')
   *   .step('Place R1', '...').show('r1').highlight('r1')
   *   .step('Power on', '...').show('led1').power({ Vcc: 1 }).glow('led1', 0.8)
   */
  step(title: string, body: string): StepBuilderChain {
    const prev = this._stepBuilders.length > 0
      ? this._stepBuilders[this._stepBuilders.length - 1]._getShow()
      : [];
    const sb = new StepBuilder(title, body, prev, this);
    this._stepBuilders.push(sb);
    return new StepBuilderChain(sb, this);
  }

  // ── Build ─────────────────────────────────────────────────────────────

  /** Finalise and return the Circuit object. */
  build(): Circuit {
    return {
      id:          this._id,
      title:       this._title,
      description: this._description,
      components:  this._components,
      steps:       this._stepBuilders.map((sb) => sb._toStep()),
    };
  }
}

// ── Step builder chain ────────────────────────────────────────────────────
// Returned by CB.step() — exposes step methods AND lets you chain .step() again.
export class StepBuilderChain {
  private _sb: StepBuilder;
  private _cb: CB;

  constructor(sb: StepBuilder, cb: CB) {
    this._sb = sb;
    this._cb = cb;
  }

  show(...ids: string[]): this      { this._sb.show(...ids); return this; }
  highlight(id: string): this       { this._sb.highlight(id); return this; }
  power(i: Record<string, 0 | 1>): this { this._sb.power(i); return this; }
  reading(id: string, v: string): this  { this._sb.reading(id, v); return this; }
  glow(id: string, b: number): this    { this._sb.glow(id, b); return this; }
  supply(v: number): this              { this._sb.supply(v); return this; }

  /** Start the next step (cumulative from this step's show list). */
  step(title: string, body: string): StepBuilderChain {
    return this._cb.step(title, body);
  }

  /** Finalise the circuit. */
  build(): Circuit { return this._cb.build(); }
}

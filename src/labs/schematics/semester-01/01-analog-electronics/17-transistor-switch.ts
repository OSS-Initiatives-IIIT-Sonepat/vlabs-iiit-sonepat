import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * Transistor as a Switch — BC547 with an LED load in the collector.
 *
 *              ● +5 V
 *              Rc 330 Ω
 *              LED
 *              ├──────(V) VCE
 *   Vin ─[Rb]─B  Q1
 *              E
 *             GND
 */

const W = 380;
const H = 330;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);

type Opts = {
  hlQ?: boolean;
  hlLoad?: boolean;
  hlBase?: boolean;
  meter?: boolean;
  rb?: string;
  vin?: string;
};

const sw = ({ hlQ, hlLoad, hlBase, meter = true, rb = "10 kΩ", vin = "0 V" }: Opts = {}): SchematicElement[] => {
  const els: SchematicElement[] = [
    { type: "probe", id: "VCC", x: 240, y: 34, label: "+5 V" },
    hl(wire("w_vcc_rc", [240, 40], [240, 50]), hlLoad),
    { type: "resistor", id: "RC", x: 240, y: 80, rotation: 90, label: "Rc", value: "330 Ω", highlight: hlLoad },
    hl(wire("w_rc_led", [240, 110], [240, 130]), hlLoad),
    { type: "led", id: "LED", x: 240, y: 150, rotation: 90, label: "LED", highlight: hlLoad },
    hl(wire("w_led_c", [240, 170], [240, 200]), hlLoad),
    { type: "npn-bjt", id: "Q1", x: 220, y: 230, label: "BC547", highlight: hlQ },
    hl(wire("w_e_gnd", [240, 260], [240, 290]), hlQ),
    { type: "ground", id: "gnd_e", x: 240, y: 290 },
    { type: "vsource", id: "VIN", x: 70, y: 260, label: "Vin", value: vin, highlight: hlBase },
    { type: "ground", id: "gnd_in", x: 70, y: 290 },
    hl(wire("w_in_rb", [70, 230], [120, 230]), hlBase),
    { type: "resistor", id: "RB", x: 150, y: 230, label: "Rb", value: rb, highlight: hlBase },
    hl(wire("w_rb_b", [180, 230], [200, 230]), hlBase),
  ];
  if (meter) {
    els.push(
      junction("j_c", 240, 185),
      wire("w_c_vm", [240, 185], [320, 185], [320, 206]),
      { type: "voltmeter", id: "VM", x: 320, y: 230, label: "VCE" },
      wire("w_vm_gnd", [320, 254], [320, 275], [240, 275]),
      junction("j_e", 240, 275),
    );
  }
  return els;
};

const sheet = (t: string, els: SchematicElement[], c: string): SchematicData =>
  ({ width: W, height: H, elements: [label("title", W / 2, 18, t), ...els, label("caption", W / 2, 322, c)] });

export const step01 = sheet("BC547: Collector, Base, Emitter", sw({ hlQ: true, meter: false }), "Flat face towards you: C, B, E from left to right");
export const step02 = sheet("Collector Load: Rc and LED", sw({ hlLoad: true, meter: false }), "Ic(sat) ≈ (5 − 1.9 − 0.1) V / 330 Ω ≈ 9 mA");
export const step03 = sheet("Input LOW: Cut-off (switch OFF)", sw({ hlBase: true }), "Ib = 0, Ic = 0: VCE ≈ 5 V, LED off");
export const step04 = sheet("Input HIGH: Saturation (switch ON)", sw({ hlBase: true, vin: "5 V" }), "Ib ≈ 0.43 mA: VCE ≈ 0.1 V, LED on");
export const step05 = sheet("Weak Base Drive: Active Region", sw({ hlBase: true, vin: "5 V", rb: "1 MΩ" }), "Ib ≈ 4.3 µA: Ic ≈ hFE·Ib ≈ 0.9 mA, LED dim");
export const step06 = sheet("Switching Summary", sw({ vin: "0 / 5 V" }), "Rb ≤ (Vin − 0.7) · hFE / Ic(sat) for saturation");

export const transistorSwitchStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05, step06,
];

export const transistorSwitchTheoryDiagram: SchematicData = sheet(
  "NPN Transistor Switch",
  sw({ vin: "0 / 5 V" }),
  "OFF: cut-off (VCE ≈ VCC);  ON: saturation (VCE ≈ 0.1 V)",
);

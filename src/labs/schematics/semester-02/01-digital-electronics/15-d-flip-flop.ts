import { type SchematicData, type SchematicElement } from "@/labs/CircuitSchematic";

/*
 * D Flip-Flop (74HC74) — progressive 2D schematics.
 * Edge-triggered storage element
 * D input captured on rising clock edge
 * Q output holds data, Q' is complement
 * PRE and CLR are active-low asynchronous controls
 *
 * The flip-flop is a closed outline (150,80)–(250,180): D y100 / CLK y160 on the
 * left, Q y100 / Q' y160 on the right, PRE x180 / CLR x220 on top.
 */

const W = 400;
const H = 280;

const wire = (id: string, ...pts: [number, number][]): Extract<SchematicElement, { type: "wire" }> =>
  ({ type: "wire", id, points: pts.map(([x, y]) => ({ x, y })) });
const label = (id: string, x: number, y: number, text: string): SchematicElement =>
  ({ type: "label", id, x, y, text });
const junction = (id: string, x: number, y: number): SchematicElement => ({ type: "junction", id, x, y });
const hl = <T extends SchematicElement>(el: T, highlight?: boolean): T => (highlight ? { ...el, highlight } : el);

type Opts = {
  vcc?: boolean;
  hlVcc?: boolean;
  inputs?: boolean;
  hlD?: boolean;
  hlClk?: boolean;
  d?: string;
  clk?: string;
  outs?: boolean;
  hlOuts?: boolean;
  q?: string;
  qn?: string;
  hlQ?: boolean;
  hlQn?: boolean;
};

const dff = (o: Opts = {}): SchematicElement[] => {
  const els: SchematicElement[] = [
    wire("ff_box", [150, 80], [250, 80], [250, 180], [150, 180], [150, 80]),
    label("ff_name", 200, 134, "D-FF"),
    label("pin_pre", 180, 93, "PRE"), label("pin_clr", 220, 93, "CLR"),
    label("pin_d", 158, 103, "D"), label("pin_clk", 168, 163, "▷CLK"),
    label("pin_q", 242, 103, "Q"), label("pin_qn", 241, 163, "Q'"),
  ];
  if (o.vcc) {
    els.push(
      label("lbl_vcc", 88, 50, "+5V"),
      hl(wire("w_vcc", [100, 50], [220, 50], [220, 80]), o.hlVcc),
      hl(wire("w_pre", [180, 50], [180, 80]), o.hlVcc), junction("j_pre", 180, 50),
    );
  }
  if (o.inputs) {
    const d = o.d ?? "D";
    const clk = o.clk ?? "CLK";
    els.push(
      label("lbl_d", 60 - d.length * 2.52, 100, d), hl(wire("w_d", [64, 100], [150, 100]), o.hlD),
      label("lbl_clk", 60 - clk.length * 2.52, 160, clk), hl(wire("w_clk", [64, 160], [150, 160]), o.hlClk),
    );
  }
  if (o.outs) {
    for (const [id, y, text, on] of [["q", 100, o.q ?? "Q", o.hlQ], ["qn", 160, o.qn ?? "Q'", o.hlQn]] as const) {
      els.push(
        hl(wire(`w_${id}`, [250, y], [260, y]), o.hlOuts),
        { type: "resistor", id: `r_${id}`, x: 290, y, label: "330Ω", highlight: o.hlOuts },
        wire(`w_${id}_led`, [320, y], [330, y]),
        { type: "led", id: `led_${id}`, x: 350, y, label: text, color: id === "q" ? "green" : "yellow", highlight: o.hlOuts || on },
        wire(`w_${id}_gnd`, [370, y], [385, y], [385, y + 10]),
        { type: "ground", id: `gnd_${id}`, x: 385, y: y + 10 },
      );
    }
  }
  return els;
};

/** Step 1: Place breadboard - Introduction */
export const step01: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 200, 20, "D Flip-Flop (74HC74)"),
  label("lbl_desc1", 200, 60, "Edge-triggered data latch"),
  label("lbl_desc2", 200, 90, "D = Data input"),
  label("lbl_desc3", 200, 115, "CLK = Clock (rising edge trigger)"),
  label("lbl_desc4", 200, 140, "Q = Output, Q' = Complement"),
  label("lbl_truth", 200, 180, "Truth Table:"),
  label("lbl_t1", 200, 205, "CLK↑ + D=0 → Q=0"),
  label("lbl_t2", 200, 230, "CLK↑ + D=1 → Q=1"),
  label("lbl_t3", 200, 255, "No CLK edge → Q unchanged"),
]};

/** Step 2: Place 74HC74 - Show flip-flop symbol */
export const step02: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 200, 20, "74HC74 D Flip-Flop Symbol"),
  ...dff(),
  label("lbl_note", 200, 220, "PRE, CLR: Active-low async controls"),
  label("lbl_note2", 200, 245, "74HC74 has 2 D flip-flops"),
]};

/** Step 3: Tie PRE and CLR high */
export const step03: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 200, 20, "Tie PRE and CLR High"),
  ...dff({ vcc: true, hlVcc: true }),
  label("lbl_note1", 200, 215, "PRE=1, CLR=1: Normal operation"),
  label("lbl_note2", 200, 240, "Only clock edge affects output"),
]};

/** Step 4: Wire D and CLK inputs */
export const step04: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 200, 20, "Wire D and CLK Inputs"),
  ...dff({ vcc: true, inputs: true, hlD: true, hlClk: true }),
  label("lbl_note", 200, 215, "D: Connect to switch (data input)"),
  label("lbl_note2", 200, 240, "CLK: Connect to pushbutton"),
]};

/** Step 5: Add output LEDs */
export const step05: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 200, 20, "Add Output LEDs"),
  ...dff({ vcc: true, inputs: true, outs: true, hlOuts: true }),
  label("lbl_note", 200, 225, "Q and Q' are always complementary"),
]};

/** Step 6: Connect output paths - Complete circuit */
export const step06: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 200, 20, "D Flip-Flop — Complete Circuit"),
  ...dff({ vcc: true, inputs: true, outs: true }),
  label("lbl_note", 200, 225, "74HC74: Vcc = pin 14, GND = pin 7"),
]};

/** Step 7: Test D=0 on rising edge */
export const step07: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 200, 20, "Test: D=0 on Rising CLK Edge"),
  ...dff({ vcc: true, inputs: true, outs: true, d: "D=0", clk: "CLK↑", hlClk: true, q: "Q=0", qn: "Q'=1", hlQn: true }),
  label("lbl_exp1", 200, 210, "On rising clock edge:"),
  label("lbl_exp2", 200, 232, "D value (0) captured into Q"),
  label("lbl_exp3", 200, 254, "Q=0, Q'=1 ✓"),
]};

/** Step 8: Test D=1 on rising edge */
export const step08: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 200, 20, "Test: D=1 on Rising CLK Edge"),
  ...dff({ vcc: true, inputs: true, outs: true, d: "D=1", clk: "CLK↑", hlD: true, hlClk: true, q: "Q=1", qn: "Q'=0", hlQ: true }),
  label("lbl_exp1", 200, 210, "On rising clock edge:"),
  label("lbl_exp2", 200, 232, "D value (1) captured into Q"),
  label("lbl_exp3", 200, 254, "Q=1, Q'=0 ✓"),
]};

/** Step 9: Test D change with no clock - Q unchanged */
export const step09: SchematicData = { width: W, height: H, elements: [
  label("lbl_title", 200, 20, "Test: D Changes, No CLK Edge"),
  ...dff({ vcc: true, inputs: true, outs: true, d: "D=0→1", clk: "CLK=0", hlD: true }),
  label("lbl_exp1", 200, 205, "Key Property: Edge-Triggered — Q, Q' unchanged"),
  label("lbl_exp2", 200, 225, "Q only changes on CLK rising edge"),
  label("lbl_exp3", 200, 245, "D changes are ignored without CLK edge"),
  label("lbl_exp4", 200, 265, "This prevents glitches and race conditions"),
]};

/** Indexed array */
export const dFlipFlopStepSchematics: SchematicData[] = [
  step01, step02, step03, step04, step05,
  step06, step07, step08, step09,
];

/** Theory diagram */
export const dFlipFlopTheoryDiagram: SchematicData = step06;

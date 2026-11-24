import {
  type ChipPin,
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";
import { P, Sheet, at, pinOf, type Stage } from "./sheet";

// 2D schematics for the 8051 and PIC18F4550 experiments. Each one is the
// circuit on the breadboard: the chip with the pins the experiment uses, its
// minimal system (supply, clock, reset) and the parts on its ports. Stages
// match the procedure: a step takes the frame of the circuit built so far.

type Chip = Extract<SchematicElement, { type: "chip" }>;

const CX = 330; // chip centre x
const W = 120; // chip body width
const TOP = 90; // chip top edge
const ROW = (i: number) => TOP + 20 + i * 20;
const RIGHT_TIP = CX + W / 2 + 20;

/** Right-hand pin list with `pins` at their rows and RST three rows below. */
function rightPins(
  pins: Record<number, ChipPin>,
  rst?: ChipPin,
): (ChipPin | null)[] {
  const used = Object.keys(pins).map(Number);
  const last = used.length ? Math.max(...used) : 0;
  const n = rst ? Math.max(last + 6, 10) : last + 1;
  const list: (ChipPin | null)[] = Array.from({ length: n }, () => null);
  for (const [i, p] of Object.entries(pins)) list[Number(i)] = p;
  if (rst) list[n - 1] = rst;
  return list;
}

function chipFrame(rows: number) {
  const h = rows * 20 + 20;
  return { y: TOP + h / 2, bottom: TOP + h };
}

// ── 8051 minimal system ──────────────────────────────────────────────────
// VCC and EA to +5 V, the crystal and its two 22 pF capacitors on XTAL1 and
// XTAL2, GND, and a power-on reset (10 µF to +5 V, 10 kΩ to ground) on RST.

const LEFT_8051: (ChipPin | null)[] = [
  pinOf("VCC", 40),
  pinOf("EA", 31),
  null,
  pinOf("XTAL1", 19),
  null,
  null,
  pinOf("XTAL2", 18),
  null,
  null,
  pinOf("GND", 20),
];

function system8051(
  s: Sheet,
  right: Record<number, ChipPin>,
  label = "AT89S52 (8051)",
): Chip {
  const rightList = rightPins(right, pinOf("RST", 9));
  const rows = Math.max(LEFT_8051.length, rightList.length);
  const chip = s.chip("chip", {
    id: "u1",
    x: CX,
    y: chipFrame(rows).y,
    w: W,
    label,
    left: LEFT_8051,
    right: rightList,
  });

  // Supply: VCC and EA tied to +5 V, GND to ground.
  const vcc = at(chip, "VCC");
  const ea = at(chip, "EA");
  const gnd = at(chip, "GND");
  const vx = vcc.x - 20;
  s.wire("power", "w_vcc", vcc, P(vx, vcc.y));
  s.wire("power", "w_ea", ea, P(vx, ea.y), P(vx, vcc.y - 30));
  s.dot("power", "j_vcc", P(vx, vcc.y));
  s.add("power", {
    type: "supply",
    id: "vcc",
    x: vx,
    y: vcc.y - 30,
    label: "+5 V",
  });
  s.wire("power", "w_gnd", gnd, P(vx, gnd.y), P(vx, gnd.y + 20));
  s.add("power", { type: "ground", id: "gnd_chip", x: vx, y: gnd.y + 20 });

  // Clock: crystal across XTAL1 and XTAL2, a 22 pF capacitor to ground on each.
  const x1 = at(chip, "XTAL1");
  const x2 = at(chip, "XTAL2");
  const xc = x1.x - 60;
  s.wire("clock", "w_x1", x1, P(x1.x - 140, x1.y));
  s.wire("clock", "w_x2", x2, P(x2.x - 100, x2.y));
  s.add("clock", {
    type: "crystal",
    id: "x1",
    x: xc,
    y: (x1.y + x2.y) / 2,
    rotation: 90,
    label: "11.0592 MHz",
  });
  const mid = (x1.y + x2.y) / 2;
  s.wire("clock", "w_xs1", P(xc, x1.y), P(xc, mid - 24));
  s.wire("clock", "w_xs2", P(xc, mid + 24), P(xc, x2.y));
  s.dot("clock", "j_x1", P(xc, x1.y));
  s.dot("clock", "j_x2", P(xc, x2.y));
  const c1x = x1.x - 140;
  s.add("clock", {
    type: "capacitor",
    id: "c_x1",
    x: c1x,
    y: x1.y + 20,
    rotation: 90,
    label: "C1",
    value: "22 pF",
  });
  s.wire("clock", "w_c1g", P(c1x, x1.y + 40), P(c1x, x1.y + 80));
  s.add("clock", { type: "ground", id: "gnd_c1", x: c1x, y: x1.y + 80 });
  const c2x = x2.x - 100;
  s.add("clock", {
    type: "capacitor",
    id: "c_x2",
    x: c2x,
    y: x2.y + 20,
    rotation: 90,
    label: "C2 22 pF",
  });
  s.add("clock", { type: "ground", id: "gnd_c2", x: c2x, y: x2.y + 40 });

  // Reset: RST high for a moment at power-up, then held low.
  const rst = at(chip, "RST");
  const rx = rst.x + 40;
  s.wire("reset", "w_rst", rst, P(rx, rst.y));
  s.add("reset", {
    type: "capacitor",
    id: "c_rst",
    x: rx,
    y: rst.y - 20,
    rotation: 90,
    label: "C3",
    value: "10 µF",
  });
  s.add("reset", {
    type: "supply",
    id: "vcc_rst",
    x: rx,
    y: rst.y - 40,
    label: "+5 V",
  });
  s.add("reset", {
    type: "resistor",
    id: "r_rst",
    x: rx,
    y: rst.y + 30,
    rotation: 90,
    label: "R",
    value: "10 kΩ",
  });
  s.dot("reset", "j_rst", P(rx, rst.y));
  s.add("reset", { type: "ground", id: "gnd_rst", x: rx, y: rst.y + 60 });
  return chip;
}

const STAGES_8051: Stage[] = [
  { tag: "chip", title: "The 8051 across the gap", focus: "u1" },
  { tag: "power", title: "Supply: VCC, EA and GND", focus: "w_vcc" },
  { tag: "clock", title: "Crystal and its capacitors", focus: "x1" },
  { tag: "reset", title: "Power-on reset on RST", focus: "c_rst" },
];

// ── PIC18F4550 minimal system ────────────────────────────────────────────
// VDD and VSS with a 100 nF decoupling capacitor, and MCLR pulled up to
// +5 V through 10 kΩ. The internal oscillator is the clock, so there is no
// crystal.

const LEFT_PIC: (ChipPin | null)[] = [
  pinOf("VDD", 11),
  null,
  pinOf("VSS", 12),
  null,
  null,
  pinOf("MCLR", 1),
];

function systemPic(s: Sheet, right: Record<number, ChipPin>): Chip {
  const rightList = rightPins(right);
  const rows = Math.max(LEFT_PIC.length, rightList.length);
  const chip = s.chip("chip", {
    id: "u1",
    x: CX,
    y: chipFrame(rows).y,
    w: W,
    label: "PIC18F4550",
    left: LEFT_PIC,
    right: rightList,
  });
  const vdd = at(chip, "VDD");
  const vss = at(chip, "VSS");
  const bx = vdd.x - 50;
  s.wire("power", "w_vdd", vdd, P(bx, vdd.y), P(bx, vdd.y - 30));
  s.add("power", {
    type: "supply",
    id: "vdd",
    x: bx,
    y: vdd.y - 30,
    label: "+5 V",
  });
  s.wire("power", "w_vss", vss, P(bx, vss.y), P(bx, vss.y + 30));
  s.add("power", { type: "ground", id: "gnd_chip", x: bx, y: vss.y + 30 });
  s.add("power", {
    type: "capacitor",
    id: "c_dec",
    x: vdd.x - 25,
    y: (vdd.y + vss.y) / 2,
    rotation: 90,
    label: "C1",
    value: "100 nF",
  });
  s.dot("power", "j_vdd", P(vdd.x - 25, vdd.y));
  s.dot("power", "j_vss", P(vdd.x - 25, vss.y));

  const mclr = at(chip, "MCLR");
  const mx = mclr.x - 100;
  s.wire("reset", "w_mclr", mclr, P(mx, mclr.y));
  s.add("reset", {
    type: "resistor",
    id: "r_mclr",
    x: mx,
    y: mclr.y - 30,
    rotation: 90,
    label: "R1",
    value: "10 kΩ",
  });
  s.add("reset", {
    type: "supply",
    id: "vdd_mclr",
    x: mx,
    y: mclr.y - 60,
    label: "+5 V",
  });
  return chip;
}

const STAGES_PIC: Stage[] = [
  { tag: "chip", title: "The PIC18F4550 across the gap", focus: "u1" },
  { tag: "power", title: "Supply and decoupling", focus: "c_dec" },
  { tag: "reset", title: "MCLR held high", focus: "r_mclr" },
];

// ── Port circuits ────────────────────────────────────────────────────────

/** Resistor and LED from a port pin to ground. Returns the cathode end. */
function ledOn(
  s: Sheet,
  tag: string,
  chip: Chip,
  pin: string,
  n: number,
  ohms = "330 Ω",
) {
  const p = at(chip, pin);
  s.wire(tag, `w_${n}_r`, p, P(p.x + 30, p.y));
  s.add(tag, {
    type: "resistor",
    id: `r${n}`,
    x: p.x + 60,
    y: p.y,
    value: ohms,
  });
  s.wire(tag, `w_${n}_led`, P(p.x + 90, p.y), P(p.x + 110, p.y));
  s.add(tag, {
    type: "led",
    id: `led${n}`,
    x: p.x + 130,
    y: p.y,
    label: `LED${n}`,
  });
  return P(p.x + 150, p.y);
}

/** A row of LEDs whose cathodes share one ground bus on the right. */
function ledBank(s: Sheet, tag: string, chip: Chip, pins: string[]) {
  const ks = pins.map((pin, n) => ledOn(s, tag, chip, pin, n));
  const bus = ks[0].x + 30;
  ks.forEach((k, n) => s.wire(tag, `w_${n}_k`, k, P(bus, k.y)));
  const last = ks[ks.length - 1];
  s.wire(tag, "w_kbus", P(bus, ks[0].y), P(bus, last.y + 20));
  ks.slice(1).forEach((k, n) => s.dot(tag, `j_k${n + 1}`, P(bus, k.y)));
  s.add(tag, { type: "ground", id: "gnd_leds", x: bus, y: last.y + 20 });
}

/** One LED from a pin to its own ground. */
function ledToGround(
  s: Sheet,
  tag: string,
  chip: Chip,
  pin: string,
  ohms?: string,
) {
  const k = ledOn(s, tag, chip, pin, 1, ohms);
  s.wire(tag, "w_1_k", k, P(k.x + 30, k.y), P(k.x + 30, k.y + 40));
  s.add(tag, { type: "ground", id: "gnd_led", x: k.x + 30, y: k.y + 40 });
}

/**
 * LEDs the 8051 way: +5 V, resistor, LED, then into the port pin, which
 * sinks the current when it is LOW. The resistors share a +5 V bus.
 */
function ledSinkBank(s: Sheet, tag: string, chip: Chip, pins: string[]) {
  const ys = pins.map((pin, n) => {
    const p = at(chip, pin);
    s.wire(tag, `w_${n}_k`, p, P(p.x + 30, p.y));
    s.add(tag, {
      type: "led",
      id: `led${n}`,
      x: p.x + 50,
      y: p.y,
      rotation: 180,
    });
    s.add(tag, {
      type: "resistor",
      id: `r${n}`,
      x: p.x + 100,
      y: p.y,
      value: "470 Ω",
    });
    return p;
  });
  const bus = ys[0].x + 160;
  ys.forEach((p, n) => s.wire(tag, `w_${n}_v`, P(p.x + 130, p.y), P(bus, p.y)));
  const last = ys[ys.length - 1];
  s.wire(tag, "w_vbus", P(bus, last.y), P(bus, ys[0].y - 30));
  ys.slice(0, -1).forEach((p, n) => s.dot(tag, `j_v${n}`, P(bus, p.y)));
  s.add(tag, {
    type: "supply",
    id: "vcc_leds",
    x: bus,
    y: ys[0].y - 30,
    label: "+5 V",
  });
}

// ── 8051 experiments ─────────────────────────────────────────────────────

const P1 = (i: number) => pinOf(`P1.${i}`, i + 1);

/** Introduction: the minimal system, then one LED on P1.0. */
export function intro8051(): SchematicData[] {
  const s = new Sheet(620, 440);
  const chip = system8051(s, { 2: P1(0) });
  ledSinkBank(s, "led", chip, ["P1.0"]);
  return s.frames([
    ...STAGES_8051,
    { tag: "led", title: "First output: an LED on P1.0", focus: "led0" },
  ]);
}

/** Four LEDs on P1.0 to P1.3 (binary counter, PN sequence). */
export function leds8051(): SchematicData[] {
  const s = new Sheet(640, 440);
  const chip = system8051(s, { 2: P1(0), 4: P1(1), 6: P1(2), 8: P1(3) });
  ledSinkBank(s, "leds", chip, ["P1.0", "P1.1", "P1.2", "P1.3"]);
  return s.frames([
    ...STAGES_8051,
    { tag: "leds", title: "LEDs on P1.0 to P1.3", focus: "led0" },
  ]);
}

/** Four LEDs and a direction button on P3.2 (up/down counter). */
export function upDown8051(): SchematicData[] {
  const s = new Sheet(640, 540);
  const chip = system8051(s, {
    2: P1(0),
    4: P1(1),
    6: P1(2),
    8: P1(3),
    11: pinOf("P3.2", 12),
  });
  ledSinkBank(s, "leds", chip, ["P1.0", "P1.1", "P1.2", "P1.3"]);
  const b = at(chip, "P3.2");
  s.wire("button", "w_btn", b, P(b.x + 30, b.y));
  s.add("button", {
    type: "pushbutton",
    id: "btn1",
    x: b.x + 60,
    y: b.y,
    label: "S1: down",
  });
  s.wire(
    "button",
    "w_btn_g",
    P(b.x + 90, b.y),
    P(b.x + 110, b.y),
    P(b.x + 110, b.y + 20),
  );
  s.add("button", { type: "ground", id: "gnd_btn", x: b.x + 110, y: b.y + 20 });
  return s.frames([
    ...STAGES_8051,
    { tag: "leds", title: "LEDs on P1.0 to P1.3", focus: "led0" },
    { tag: "button", title: "Direction button on P3.2", focus: "btn1" },
  ]);
}

/** R-2R ladder on P1.0 to P1.3, read with a voltmeter (DAC ramp). */
export function dac8051(): SchematicData[] {
  const s = new Sheet(700, 520);
  const chip = system8051(s, { 0: P1(3), 3: P1(2), 6: P1(1), 9: P1(0) });
  const bits = ["P1.3", "P1.2", "P1.1", "P1.0"];
  const nx = RIGHT_TIP + 150; // ladder spine
  bits.forEach((pin, i) => {
    const p = at(chip, pin);
    s.wire("ladder", `w_b${i}`, p, P(p.x + 30, p.y));
    s.add("ladder", {
      type: "resistor",
      id: `r2_${i}`,
      x: p.x + 60,
      y: p.y,
      value: "20 kΩ",
    });
    s.wire("ladder", `w_n${i}`, P(p.x + 90, p.y), P(nx, p.y));
    const below = i < bits.length - 1;
    s.add("ladder", {
      type: "resistor",
      id: below ? `r_${i}` : "r2_end",
      x: nx,
      y: p.y + 30,
      rotation: 90,
      value: below ? "10 kΩ" : "20 kΩ",
    });
    if (i > 0) s.dot("ladder", `j_n${i}`, P(nx, p.y));
  });
  const lsb = at(chip, "P1.0");
  s.add("ladder", { type: "ground", id: "gnd_ladder", x: nx, y: lsb.y + 60 });
  const top = at(chip, "P1.3");
  s.wire(
    "meter",
    "w_out",
    P(nx, top.y),
    P(nx + 60, top.y),
    P(nx + 60, top.y + 6),
  );
  s.dot("meter", "j_out", P(nx, top.y));
  s.add("meter", {
    type: "voltmeter",
    id: "vm",
    x: nx + 60,
    y: top.y + 30,
    label: "V",
  });
  s.wire("meter", "w_vm_g", P(nx + 60, top.y + 54), P(nx + 60, top.y + 70));
  s.add("meter", { type: "ground", id: "gnd_vm", x: nx + 60, y: top.y + 70 });
  s.text("meter", "t_vout", nx + 6, top.y - 8, "Vout", "start");
  return s.frames([
    ...STAGES_8051,
    { tag: "ladder", title: "R-2R ladder on P1.0 to P1.3", focus: "r2_0" },
    { tag: "meter", title: "Voltmeter on Vout", focus: "vm" },
  ]);
}

/** ADC0804 converting a divider voltage; the 8051 reads its data bus. */
export function adc8051(): SchematicData[] {
  const s = new Sheet(880, 540);
  const right: Record<number, ChipPin> = {};
  for (let i = 0; i < 8; i++) right[i] = P1(i);
  right[9] = pinOf("P3.2", 12);
  right[10] = pinOf("P3.6", 16);
  right[11] = pinOf("P3.7", 17);
  const mcu = system8051(s, right);

  const adcLeft: (ChipPin | null)[] = [
    ...Array.from({ length: 8 }, (_, i) => pinOf(`DB${i}`, 18 - i)),
    null,
    pinOf("INTR", 5),
    pinOf("WR", 3),
    pinOf("RD", 2),
  ];
  const adcRight: (ChipPin | null)[] = [
    pinOf("VCC", 20),
    null,
    pinOf("CLKR", 19),
    null,
    null,
    pinOf("CLKIN", 4),
    null,
    null,
    pinOf("VIN+", 6),
    null,
    pinOf("VIN-", 7),
    pinOf("AGND", 8),
    pinOf("DGND", 10),
    pinOf("CS", 1),
  ];
  const ax = 610;
  const adc = s.chip("chip", {
    id: "u2",
    x: ax,
    y: chipFrame(adcRight.length).y,
    w: 100,
    label: "ADC0804",
    left: adcLeft,
    right: adcRight,
  });

  // Divider into VIN+.
  const vin = at(adc, "VIN+");
  const dx = vin.x + 120;
  s.wire("divider", "w_vin", vin, P(dx, vin.y));
  s.add("divider", {
    type: "resistor",
    id: "r_top",
    x: dx,
    y: vin.y - 30,
    rotation: 90,
    label: "R1",
    value: "10 kΩ",
  });
  s.add("divider", {
    type: "supply",
    id: "vcc_div",
    x: dx,
    y: vin.y - 60,
    label: "+5 V",
  });
  s.add("divider", {
    type: "resistor",
    id: "r_bot",
    x: dx,
    y: vin.y + 30,
    rotation: 90,
    label: "R2",
    value: "10 kΩ",
  });
  s.add("divider", { type: "ground", id: "gnd_div", x: dx, y: vin.y + 60 });
  s.dot("divider", "j_vin", P(dx, vin.y));

  // ADC supply, clock and grounds.
  const avcc = at(adc, "VCC");
  s.wire(
    "adcpower",
    "w_avcc",
    avcc,
    P(avcc.x + 20, avcc.y),
    P(avcc.x + 20, avcc.y - 30),
  );
  s.add("adcpower", {
    type: "supply",
    id: "vcc_adc",
    x: avcc.x + 20,
    y: avcc.y - 30,
    label: "+5 V",
  });
  const clkr = at(adc, "CLKR");
  const clkin = at(adc, "CLKIN");
  const cx = clkr.x + 30;
  s.wire("adcpower", "w_clkr", clkr, P(cx, clkr.y));
  s.add("adcpower", {
    type: "resistor",
    id: "r_clk",
    x: cx,
    y: (clkr.y + clkin.y) / 2,
    rotation: 90,
    label: "R3",
    value: "10 kΩ",
  });
  s.wire("adcpower", "w_clkin", clkin, P(cx, clkin.y), P(cx + 40, clkin.y));
  s.dot("adcpower", "j_clk", P(cx, clkin.y));
  s.add("adcpower", {
    type: "capacitor",
    id: "c_clk",
    x: cx + 40,
    y: clkin.y + 20,
    rotation: 90,
    label: "C4",
    value: "150 pF",
  });
  s.add("adcpower", {
    type: "ground",
    id: "gnd_clk",
    x: cx + 40,
    y: clkin.y + 40,
  });
  const gpins = ["VIN-", "AGND", "DGND", "CS"].map((n) => at(adc, n));
  const gx = gpins[0].x + 30;
  gpins.forEach((g, i) => s.wire("adcpower", `w_ag${i}`, g, P(gx, g.y)));
  s.wire("adcpower", "w_agbus", P(gx, gpins[0].y), P(gx, gpins[3].y + 20));
  gpins.slice(1).forEach((g, i) => s.dot("adcpower", `j_ag${i}`, P(gx, g.y)));
  s.add("adcpower", {
    type: "ground",
    id: "gnd_adc",
    x: gx,
    y: gpins[3].y + 20,
  });

  // Data bus and control lines straight across.
  for (let i = 0; i < 8; i++)
    s.wire("bus", `w_db${i}`, at(mcu, `P1.${i}`), at(adc, `DB${i}`));
  s.wire("bus", "w_intr", at(mcu, "P3.2"), at(adc, "INTR"));
  s.wire("bus", "w_wr", at(mcu, "P3.6"), at(adc, "WR"));
  s.wire("bus", "w_rd", at(mcu, "P3.7"), at(adc, "RD"));
  s.text("read", "t_read", dx + 14, vin.y + 4, "2.5 V → 128", "start");
  return s.frames([
    { tag: "chip", title: "8051 and ADC0804 on the board", focus: "u2" },
    {
      tag: ["power", "clock", "reset"],
      title: "The 8051 minimal system",
      focus: "x1",
    },
    { tag: "divider", title: "Divider into VIN+", focus: "r_top" },
    {
      tag: "adcpower",
      title: "ADC supply, clock and grounds",
      focus: "r_clk",
    },
    { tag: "bus", title: "Data bus and control lines", focus: "w_intr" },
    { tag: "read", title: "Reading the result on P1", focus: "u1" },
  ]);
}

// ── PIC18F4550 experiments ───────────────────────────────────────────────

/** Introduction: the minimal system, then one LED on RD0. */
export function introPic(): SchematicData[] {
  const s = new Sheet(620, 330);
  const chip = systemPic(s, { 0: pinOf("RD0", 19) });
  ledToGround(s, "led", chip, "RD0");
  return s.frames([
    ...STAGES_PIC,
    { tag: "led", title: "First output: an LED on RD0", focus: "led1" },
  ]);
}

/** An LED on one output pin (delay, Timer0, PWM). */
export function ledPic(pin: string, num: number): SchematicData[] {
  const s = new Sheet(620, 330);
  const chip = systemPic(s, { 0: pinOf(pin, num) });
  ledToGround(s, "led", chip, pin);
  return s.frames([
    ...STAGES_PIC,
    { tag: "led", title: `LED on ${pin}`, focus: "led1" },
  ]);
}

/** Button on RB0 with a 10 kΩ pull-down; LED on RD0 follows it. */
export function ioPic(): SchematicData[] {
  const s = new Sheet(640, 340);
  const chip = systemPic(s, { 0: pinOf("RB0", 33), 5: pinOf("RD0", 19) });
  const b = at(chip, "RB0");
  const n = P(b.x + 50, b.y);
  s.wire("input", "w_rb0", b, n);
  s.add("input", {
    type: "resistor",
    id: "r_pd",
    x: n.x,
    y: n.y + 30,
    rotation: 90,
    label: "R2",
    value: "10 kΩ",
  });
  s.add("input", { type: "ground", id: "gnd_pd", x: n.x, y: n.y + 60 });
  s.wire("input", "w_btn", n, P(n.x + 40, n.y));
  s.dot("input", "j_rb0", n);
  s.add("input", {
    type: "pushbutton",
    id: "btn1",
    x: n.x + 70,
    y: n.y,
    label: "S1",
  });
  s.wire(
    "input",
    "w_btn_v",
    P(n.x + 100, n.y),
    P(n.x + 130, n.y),
    P(n.x + 130, n.y - 30),
  );
  s.add("input", {
    type: "supply",
    id: "vdd_btn",
    x: n.x + 130,
    y: n.y - 30,
    label: "+5 V",
  });
  ledToGround(s, "led", chip, "RD0");
  return s.frames([
    ...STAGES_PIC,
    { tag: "input", title: "Button and pull-down on RB0", focus: "btn1" },
    { tag: "led", title: "LED on RD0", focus: "led1" },
  ]);
}

/** Divider into AN0 (RA0); LED on RD0 shows the comparison. */
export function adcPic(): SchematicData[] {
  const s = new Sheet(640, 340);
  const chip = systemPic(s, { 0: pinOf("RA0/AN0", 2), 5: pinOf("RD0", 19) });
  const a = at(chip, "RA0/AN0");
  const dx = a.x + 80;
  s.wire("divider", "w_an0", a, P(dx, a.y));
  s.add("divider", {
    type: "resistor",
    id: "r_top",
    x: dx,
    y: a.y - 30,
    rotation: 90,
    label: "R2",
    value: "10 kΩ",
  });
  s.add("divider", {
    type: "supply",
    id: "vdd_div",
    x: dx,
    y: a.y - 60,
    label: "+5 V",
  });
  s.add("divider", {
    type: "resistor",
    id: "r_bot",
    x: dx,
    y: a.y + 30,
    rotation: 90,
    label: "R3",
    value: "10 kΩ",
  });
  s.add("divider", { type: "ground", id: "gnd_div", x: dx, y: a.y + 60 });
  s.dot("divider", "j_an0", P(dx, a.y));
  ledToGround(s, "led", chip, "RD0");
  return s.frames([
    ...STAGES_PIC,
    { tag: "divider", title: "Divider into AN0", focus: "r_top" },
    { tag: "led", title: "LED on RD0", focus: "led1" },
  ]);
}

// ── Frames used by the experiments ───────────────────────────────────────

export const intro8051Diagrams = intro8051();
export const leds8051Diagrams = leds8051();
export const upDown8051Diagrams = upDown8051();
export const dac8051Diagrams = dac8051();
export const adc8051Diagrams = adc8051();
export const introPicDiagrams = introPic();
export const picRd0Diagrams = ledPic("RD0", 19);
export const picCcp1Diagrams = ledPic("RC2/CCP1", 17);
export const ioPicDiagrams = ioPic();
export const adcPicDiagrams = adcPic();

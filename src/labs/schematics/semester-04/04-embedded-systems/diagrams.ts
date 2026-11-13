import { type SchematicData } from "@/labs/CircuitSchematic";
import {
  flow,
  type FlowLink,
  type FlowNode,
  type FlowStep,
} from "@/labs/schematics/semester-03/diagram";
import { P, Sheet, at, pinOf } from "./sheet";

// 2D schematics for the Arduino and ESP32 experiments of the Embedded Systems
// subject. Each is the real circuit, drawn with the board as an IC symbol, and
// it builds up step by step: a procedure step takes the frame that matches the
// circuit on the 3D bench.

function frames(
  nodes: FlowNode[],
  links: FlowLink[],
  steps: FlowStep[],
): SchematicData[] {
  return flow(
    nodes,
    links,
    steps.map((step) => ({ height: 420, ...step })),
  );
}

// ── Anatomy of a sketch (intro lessons) ──────────────────────────────────
// A program structure, not a circuit, so it stays a flow diagram.

function anatomy(board: string): SchematicData[] {
  const nodes: FlowNode[] = [
    {
      id: "setup",
      kind: "terminal",
      x: 170,
      y: 70,
      w: 340,
      label: "setup(): runs once at power-up",
    },
    {
      id: "loop",
      kind: "block",
      x: 170,
      y: 170,
      w: 340,
      label: "loop(): runs again and again",
    },
    {
      id: "io",
      kind: "block",
      x: 170,
      y: 270,
      w: 340,
      label: `${board} pins: digitalWrite, analogRead`,
    },
  ];
  const links: FlowLink[] = [
    { id: "a", from: "setup", to: "loop", label: "then" },
    { id: "b", from: "loop", to: "io", label: "each pass, then repeat" },
  ];
  return frames(nodes, links, [
    {
      title: "setup() configures the pins",
      show: ["setup"],
      highlight: "setup",
    },
    {
      title: "loop() holds the behaviour",
      show: ["setup", "loop"],
      highlight: "loop",
    },
    {
      title: "Pins talk to the outside world",
      show: ["setup", "loop", "io"],
      highlight: "io",
    },
  ]);
}

export const arduinoAnatomyDiagrams = anatomy("Arduino");
export const esp32AnatomyDiagrams = anatomy("ESP32");

type Board = { name: string; w: number };
const UNO: Board = { name: "Arduino Uno", w: 80 };
const ESP: Board = { name: "ESP32-DevKitC", w: 90 };

/** The board as an IC, powered from USB: its USB input on the left. */
function boardChip(
  s: Sheet,
  board: Board,
  x: number,
  y: number,
  right: ({ name: string } | null)[],
) {
  const chip = s.chip("board", {
    id: "board",
    x,
    y,
    w: board.w,
    label: board.name,
    left: [pinOf("USB")],
    right: right.map((p) => (p ? pinOf(p.name) : null)),
  });
  const usb = at(chip, "USB");
  s.wire("board", "w_usb", usb, P(usb.x, usb.y - 30));
  s.add("board", {
    type: "supply",
    id: "usb_5v",
    x: usb.x,
    y: usb.y - 30,
    label: "USB 5 V",
  });
  return chip;
}

// ── LED with a series resistor (blink and PWM) ───────────────────────────

function ledChain(board: Board, pin: string, ohms: string): SchematicData[] {
  const s = new Sheet(420, 220);
  const chip = boardChip(s, board, 120, 130, [
    { name: pin },
    null,
    { name: "GND" },
  ]);
  const out = at(chip, pin);
  const r = s.add("r", {
    type: "resistor",
    id: "r1",
    x: out.x + 60,
    y: out.y,
    label: "R1",
    value: ohms,
  });
  s.wire("r", "w_pin_r", out, P(out.x + 30, out.y));
  const led = s.add("led", {
    type: "led",
    id: "led1",
    x: out.x + 140,
    y: out.y,
    label: "LED1",
  });
  s.wire("led", "w_r_led", P(out.x + 90, out.y), P(out.x + 120, out.y));
  const k = P(out.x + 160, out.y);
  s.wire("gnd", "w_led_gnd", k, P(k.x + 40, k.y), P(k.x + 40, k.y + 40));
  s.add("gnd", { type: "ground", id: "gnd_led", x: k.x + 40, y: k.y + 40 });
  const g = at(chip, "GND");
  s.wire("gnd", "w_board_gnd", g, P(g.x + 30, g.y), P(g.x + 30, g.y + 20));
  s.add("gnd", { type: "ground", id: "gnd_board", x: g.x + 30, y: g.y + 20 });
  void r;
  void led;
  return s.frames([
    { tag: "board", title: "Board pin", focus: "board" },
    { tag: "r", title: "Series resistor", focus: "r1" },
    { tag: "led", title: "LED", focus: "led1" },
    { tag: "gnd", title: "Common ground", focus: "w_led_gnd" },
  ]);
}

export const arduinoBlinkDiagrams = ledChain(UNO, "D13", "220 Ω");
export const esp32BlinkDiagrams = ledChain(ESP, "GPIO2", "330 Ω");
export const esp32PwmDiagrams = ledChain(ESP, "GPIO5", "330 Ω");

// ── Push-button read with the internal pull-up ───────────────────────────

function buttonChain(
  board: Board,
  pin: string,
  rail: string,
  pullUp: string,
): SchematicData[] {
  const s = new Sheet(420, 230);
  const chip = boardChip(s, board, 120, 150, [
    { name: pin },
    null,
    { name: "GND" },
  ]);
  const inp = at(chip, pin);
  const node = P(inp.x + 50, inp.y);
  s.wire("pu", "w_pin", inp, node);
  s.add("pu", {
    type: "resistor",
    id: "r_pu",
    x: node.x,
    y: node.y - 40,
    rotation: 90,
    label: "pull-up",
    value: pullUp,
  });
  s.wire("pu", "w_pu", P(node.x, node.y - 10), node);
  s.add("pu", {
    type: "supply",
    id: "rail",
    x: node.x,
    y: node.y - 70,
    label: rail,
  });
  s.wire("btn", "w_btn", node, P(node.x + 40, node.y));
  s.dot("btn", "j_node", node);
  s.add("btn", {
    type: "pushbutton",
    id: "btn1",
    x: node.x + 70,
    y: node.y,
    label: "S1",
  });
  s.text("btn", "t_pressed", node.x + 70, node.y + 36, "pressed = LOW");
  const b2 = P(node.x + 100, node.y);
  s.wire("gnd", "w_btn_gnd", b2, P(b2.x + 30, b2.y), P(b2.x + 30, b2.y + 40));
  s.add("gnd", { type: "ground", id: "gnd_btn", x: b2.x + 30, y: b2.y + 40 });
  const g = at(chip, "GND");
  s.wire("gnd", "w_board_gnd", g, P(g.x + 20, g.y), P(g.x + 20, g.y + 20));
  s.add("gnd", { type: "ground", id: "gnd_board", x: g.x + 20, y: g.y + 20 });
  return s.frames([
    { tag: "board", title: "Input pin", focus: "board" },
    { tag: "pu", title: "Pull-up keeps it HIGH", focus: "r_pu" },
    { tag: "btn", title: "Push-button", focus: "btn1" },
    { tag: "gnd", title: "Button to ground", focus: "w_btn_gnd" },
  ]);
}

export const arduinoButtonDiagrams = buttonChain(UNO, "D2", "+5 V", "20–50 kΩ");
export const esp32ButtonDiagrams = buttonChain(
  ESP,
  "GPIO4",
  "+3.3 V",
  "≈45 kΩ",
);

// ── Voltage divider read by the ADC ──────────────────────────────────────

function analogDivider(): SchematicData[] {
  const s = new Sheet(430, 260);
  const chip = boardChip(s, UNO, 120, 150, [
    { name: "5V" },
    null,
    null,
    { name: "A0" },
    null,
    null,
    { name: "GND" },
  ]);
  const v5 = at(chip, "5V");
  const a0 = at(chip, "A0");
  const gnd = at(chip, "GND");
  const x = v5.x + 90;
  s.wire("r1", "w_5v", v5, P(x, v5.y));
  s.add("r1", {
    type: "resistor",
    id: "r_top",
    x,
    y: v5.y + 30,
    rotation: 90,
    label: "R1",
    value: "10 kΩ",
  });
  s.wire("tap", "w_a0", a0, P(x, a0.y));
  s.text("tap", "t_v", x + 16, a0.y + 4, "2.5 V → analogRead = 512", "start");
  s.add("r2", {
    type: "resistor",
    id: "r_bot",
    x,
    y: a0.y + 30,
    rotation: 90,
    label: "R2",
    value: "10 kΩ",
  });
  s.dot("r2", "j_tap", P(x, a0.y));
  s.wire("gnd", "w_gnd", gnd, P(x, gnd.y));
  s.add("gnd", { type: "ground", id: "gnd", x, y: gnd.y });
  s.dot("gnd", "j_gnd", P(x, gnd.y));
  return s.frames([
    { tag: "board", title: "Supply", focus: "board" },
    { tag: "r1", title: "Top resistor", focus: "r_top" },
    { tag: "tap", title: "Tap to A0", focus: "w_a0" },
    { tag: "r2", title: "Bottom resistor", focus: "r_bot" },
    { tag: "gnd", title: "Return to GND", focus: "w_gnd" },
  ]);
}

export const arduinoAnalogDiagrams = analogDivider();

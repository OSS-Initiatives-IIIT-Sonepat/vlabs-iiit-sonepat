import { type SchematicData } from "@/labs/CircuitSchematic";
import {
  flow,
  type FlowLink,
  type FlowNode,
  type FlowStep,
} from "@/labs/schematics/semester-03/diagram";

// 2D schematics for the Embedded Systems subject. Each experiment draws one
// diagram that builds up step by step; a procedure step takes the frame that
// matches its circuit state, so the schematic always agrees with the 3D bench.

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
    { id: "b", from: "loop", to: "io", label: "each pass" },
    { id: "c", from: "io", to: "loop", label: "repeat" },
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

// ── LED with a series resistor (blink and PWM) ───────────────────────────

function ledChain(pinLabel: string, ohms: string): SchematicData[] {
  const nodes: FlowNode[] = [
    { id: "pin", kind: "terminal", x: 200, y: 70, w: 240, label: pinLabel },
    { id: "r", kind: "block", x: 200, y: 160, w: 240, label: ohms },
    {
      id: "led",
      kind: "block",
      x: 200,
      y: 250,
      w: 240,
      label: "LED: anode to cathode",
    },
    { id: "gnd", kind: "terminal", x: 200, y: 340, w: 240, label: "GND" },
  ];
  const links: FlowLink[] = [
    { id: "a", from: "pin", to: "r" },
    { id: "b", from: "r", to: "led" },
    { id: "c", from: "led", to: "gnd", label: "current" },
  ];
  return frames(nodes, links, [
    { title: "Board pin", show: ["pin"], highlight: "pin" },
    { title: "Series resistor", show: ["pin", "r"], highlight: "r" },
    { title: "LED", show: ["pin", "r", "led"], highlight: "led" },
    {
      title: "Common ground",
      show: ["pin", "r", "led", "gnd"],
      highlight: "gnd",
    },
  ]);
}

export const arduinoBlinkDiagrams = ledChain("Arduino D13", "220 ohm");
export const esp32BlinkDiagrams = ledChain("ESP32 GPIO2", "330 ohm");
export const esp32PwmDiagrams = ledChain("ESP32 GPIO5 (PWM)", "330 ohm");

// ── Push-button read with an internal pull-up ────────────────────────────

function buttonChain(pinLabel: string): SchematicData[] {
  const nodes: FlowNode[] = [
    { id: "pin", kind: "terminal", x: 170, y: 70, w: 230, label: pinLabel },
    {
      id: "pu",
      kind: "block",
      x: 430,
      y: 70,
      w: 230,
      label: "Internal pull-up to +5 V",
    },
    { id: "btn", kind: "block", x: 170, y: 190, w: 230, label: "Push-button" },
    { id: "gnd", kind: "terminal", x: 170, y: 300, w: 230, label: "GND" },
  ];
  const links: FlowLink[] = [
    { id: "a", from: "pin", to: "pu", label: "pulled HIGH" },
    { id: "b", from: "pin", to: "btn" },
    { id: "c", from: "btn", to: "gnd", label: "pressed = LOW" },
  ];
  return frames(nodes, links, [
    { title: "Input pin", show: ["pin"], highlight: "pin" },
    { title: "Pull-up keeps it HIGH", show: ["pin", "pu"], highlight: "pu" },
    { title: "Push-button", show: ["pin", "pu", "btn"], highlight: "btn" },
    {
      title: "Button to ground",
      show: ["pin", "pu", "btn", "gnd"],
      highlight: "gnd",
    },
  ]);
}

export const arduinoButtonDiagrams = buttonChain("Arduino D2");
export const esp32ButtonDiagrams = buttonChain("ESP32 GPIO4");

// ── Voltage divider read by an ADC pin ───────────────────────────────────

export const arduinoAnalogDiagrams = frames(
  [
    {
      id: "v5",
      kind: "terminal",
      x: 200,
      y: 60,
      w: 240,
      label: "+5 V (Arduino 5V pin)",
    },
    { id: "r1", kind: "block", x: 200, y: 150, w: 240, label: "10 kohm (R1)" },
    {
      id: "adc",
      kind: "block",
      x: 200,
      y: 240,
      w: 240,
      label: "A0: ADC input (reads 2.5 V)",
    },
    { id: "r2", kind: "block", x: 200, y: 330, w: 240, label: "10 kohm (R2)" },
    { id: "gnd", kind: "terminal", x: 200, y: 420, w: 240, label: "GND" },
  ],
  [
    { id: "a", from: "v5", to: "r1" },
    { id: "b", from: "r1", to: "adc", label: "middle point" },
    { id: "c", from: "adc", to: "r2" },
    { id: "d", from: "r2", to: "gnd" },
  ],
  [
    { title: "Supply", show: ["v5"], highlight: "v5" },
    { title: "Top resistor", show: ["v5", "r1"], highlight: "r1" },
    { title: "Tap to A0", show: ["v5", "r1", "adc"], highlight: "adc" },
    {
      title: "Bottom resistor",
      show: ["v5", "r1", "adc", "r2"],
      highlight: "r2",
    },
    {
      title: "Return to GND",
      show: ["v5", "r1", "adc", "r2", "gnd"],
      highlight: "gnd",
    },
  ],
);
